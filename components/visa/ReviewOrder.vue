<template>
  <div class="flex gap-6">
    <!-- Left Side - Order Details -->
    <div class="flex-1">
      
      <!-- Expected Delivery Date -->
      <div class="border rounded-xl p-4 mb-6" style="border-color: #1ECE84;">
        <p style="font-family: Geist; font-weight: 600; font-size: 14px; line-height: 20px; color: #0B3947;">
          Expected delivery date: {{ expectedDeliveryDate }}
        </p>
      </div>

      <!-- Visa Details Card -->
      <div class="border rounded-xl p-6" style="border-color: #E5E7EB;">
        
        <!-- Visa Title -->
        <div class="mb-6">
          <h3 style="font-family: Geist; font-weight: 600; font-size: 20px; line-height: 28px; color: #0B3947;">
            {{ destination }} Visa
          </h3>
          <p style="font-family: Manrope; font-weight: 400; font-size: 14px; line-height: 20px; color: #6B7280;">
            You can see the order details below.
          </p>
        </div>

        <!-- Visa Information -->
        <div class="space-y-4 mb-6">
          <div class="flex justify-between">
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              Valid for:
            </span>
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              {{ visaDetails.validity }}
            </span>
          </div>

          <div class="flex justify-between">
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              Max stay:
            </span>
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              {{ visaDetails.maxStay }}
            </span>
          </div>

          <div class="flex justify-between">
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              Number of entries:
            </span>
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              {{ visaDetails.entries }}
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t mb-6" style="border-color: #E5E7EB;"></div>

        <!-- Travelers Section -->
        <div class="flex justify-between items-start">
          <h4 style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
            Travelers:
          </h4>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div 
              v-for="(traveler, index) in travelers" 
              :key="index"
              class="flex items-center gap-3"
            >
              <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #E8FFF6;">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 7C8.933 7 10.5 5.433 10.5 3.5C10.5 1.567 8.933 0 7 0C5.067 0 3.5 1.567 3.5 3.5C3.5 5.433 5.067 7 7 7Z" fill="#1ECE84"/>
                  <path d="M7 8.75C4.101 8.75 1.75 11.101 1.75 14H12.25C12.25 11.101 9.899 8.75 7 8.75Z" fill="#1ECE84"/>
                </svg>
              </div>
              <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
                {{ traveler }}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Right Side - Summary Card with Payment Button -->
    <PriceSummaryCard
      :destination="destination"
      :traveler-count="travelers.length"
      :product-details="productDetails" 
      :processing-fee="processingFee"
      :processing-type="processingType"
      :show-calculated-total="true"
      :show-coupon-field="true"
      button-text="Continue to payment"
      @continue="handleContinueToPayment"
      @coupon-applied="handleCouponApplied"
      @coupon-removed="handleCouponRemoved"
    />
  </div>

  <!-- Payment Modal -->
  <PaymentModal 
    v-if="showPaymentModal"
    :is-open="showPaymentModal"
    :amount="finalTotalWithDiscount"
    :application-data="applicationDataWithDiscount"
    @close="handleClosePaymentModal"
    @success="handlePaymentSuccess"
  />
    
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PriceSummaryCard from '@/components/visa/price-card.vue'
import PaymentModal from '@/components/visa/PaymentModal.vue'

const props = defineProps<{
  destination: string
  travelers: string[]
  productDetails?: any
  processingFee: number
  processingType?: string
  visaDetails: {
    validity: string
    maxStay: string
    entries: string
  }
  applicationData: any
}>()

const emit = defineEmits<{
  next: [result: any]
  back: []
}>()

const showPaymentModal = ref(false)

// ✅ NEW: Coupon state
const couponDiscount = ref(0)
const appliedCoupon = ref('')

// Calculate base total amount
const totalAmount = computed(() => {
  if (!props.productDetails) {
    console.warn('⚠️ No productDetails provided')
    return props.processingFee
  }
  
  const govtFee = Number(props.productDetails.govtFee) * props.travelers.length
  const serviceFee = Number(props.productDetails.serviceFee) * props.travelers.length
  const processingFee = props.processingFee * props.travelers.length
  
  const total = govtFee + serviceFee + processingFee
  
  console.log('💰 Total Calculation:', {
    govtFee,
    serviceFee,
    processingFee,
    travelers: props.travelers.length,
    total
  })
  
  return total
})

// ✅ NEW: Calculate final total with discount
const finalTotalWithDiscount = computed(() => {
  return Math.max(0, totalAmount.value - couponDiscount.value)
})

// ✅ NEW: Application data with discount info
const applicationDataWithDiscount = computed(() => {
  return {
    ...props.applicationData,
    couponCode: appliedCoupon.value || undefined,
    discountAmount: couponDiscount.value || undefined,
    originalAmount: totalAmount.value,
    finalAmount: finalTotalWithDiscount.value
  }
})

const expectedDeliveryDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 3)
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
})

// ✅ NEW: Handle coupon applied
const handleCouponApplied = (discount: number, code: string) => {
  console.log('🎟️ Coupon applied in ReviewOrder:', { discount, code })
  couponDiscount.value = discount
  appliedCoupon.value = code
}

// ✅ NEW: Handle coupon removed
const handleCouponRemoved = () => {
  console.log('🗑️ Coupon removed in ReviewOrder')
  couponDiscount.value = 0
  appliedCoupon.value = ''
}

const handleContinueToPayment = () => {
  console.log('🔵 ReviewOrder: Continue to Payment clicked')
  console.log('📦 Product Details:', props.productDetails)
  console.log('👥 Travelers:', props.travelers)
  console.log('💰 Original Amount:', totalAmount.value)
  console.log('💰 Discount:', couponDiscount.value)
  console.log('💰 Final Amount:', finalTotalWithDiscount.value)
  console.log('📄 Application Data:', applicationDataWithDiscount.value)
  
  showPaymentModal.value = true
  console.log('✅ Payment modal opened:', showPaymentModal.value)
}

const handleClosePaymentModal = () => {
  console.log('🔴 Closing payment modal')
  showPaymentModal.value = false
}

const handlePaymentSuccess = (result: any) => {
  console.log('✅ ReviewOrder: Payment successful')
  console.log('📄 Payment Result:', result)
  
  console.log('⏳ Keeping modal structure alive for success modal...')
  
}
</script>