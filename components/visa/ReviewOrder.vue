<template>
<div class="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start overflow-visible">    <!-- Left Side - Order Details -->
    <div class="flex-1 min-h-0">

      
 

      <!-- Visa Details Card -->
      <div class="border rounded-lg sm:rounded-xl p-4 sm:p-6" style="border-color: #E5E7EB;">
        
        <!-- Visa Title -->
        <div class="mb-4 sm:mb-6">
          <h3 class="text-lg sm:text-xl leading-[24px] sm:leading-[28px]" style="font-family: Geist; font-weight: 600; color: #0B3947;">
            {{ destination }} Visa
          </h3>
          <p class="text-xs sm:text-sm leading-[18px] sm:leading-[20px] mt-1" style="font-family: Manrope; font-weight: 400; color: #6B7280;">
            You can see the order details below.
          </p>
        </div>

        <!-- Visa Information -->
        <div class="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div class="flex justify-between items-start gap-2">
            <span class="text-xs sm:text-sm leading-[18px] sm:leading-[20px] flex-shrink-0" style="font-family: Manrope; font-weight: 500; color: #0B3947;">
              Valid for:
            </span>
            <span class="text-xs sm:text-sm leading-[18px] sm:leading-[20px] text-right" style="font-family: Manrope; font-weight: 500; color: #0B3947;">
              {{ visaDetails.validity }}
            </span>
          </div>

          <div class="flex justify-between items-start gap-2">
            <span class="text-xs sm:text-sm leading-[18px] sm:leading-[20px] flex-shrink-0" style="font-family: Manrope; font-weight: 500; color: #0B3947;">
              Max stay:
            </span>
            <span class="text-xs sm:text-sm leading-[18px] sm:leading-[20px] text-right" style="font-family: Manrope; font-weight: 500; color: #0B3947;">
              {{ visaDetails.maxStay }}
            </span>
          </div>

          <div class="flex justify-between items-start gap-2">
            <span class="text-xs sm:text-sm leading-[18px] sm:leading-[20px] flex-shrink-0" style="font-family: Manrope; font-weight: 500; color: #0B3947;">
              Number of entries:
            </span>
            <span class="text-xs sm:text-sm leading-[18px] sm:leading-[20px] text-right" style="font-family: Manrope; font-weight: 500; color: #0B3947;">
              {{ visaDetails.entries }}
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t mb-6" style="border-color: #E5E7EB;"></div>

        <!-- Embassy Section (if selected) -->
        <div v-if="embassy" class="mb-4 sm:mb-6">
          <h4 class="text-sm sm:text-base leading-[20px] sm:leading-[24px] mb-2 sm:mb-3" style="font-family: Geist; font-weight: 600; color: #0B3947;">
            Selected Embassy:
          </h4>
          <div class="flex flex-col gap-1">
            <span class="text-xs sm:text-sm leading-[18px] sm:leading-[20px]" style="font-family: Manrope; font-weight: 500; color: #0B3947;">
              {{ embassy.embassyName || embassy.name }}
            </span>
            <span v-if="embassy.destinationCountry" class="text-xs sm:text-sm leading-[18px] sm:leading-[20px]" style="font-family: Manrope; font-weight: 400; color: #6B7280;">
              {{ embassy.destinationCountry || embassy.country }}
            </span>
            <span v-if="embassy.address" class="text-xs leading-[16px] sm:leading-[18px]" style="font-family: Manrope; font-weight: 400; color: #9CA3AF;">
              {{ embassy.address }}
            </span>
          </div>
        </div>

        <!-- Divider (if embassy selected) -->
        <div v-if="embassy" class="border-t mb-4 sm:mb-6" style="border-color: #E5E7EB;"></div>

        <!-- Travelers Section -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
          <h4 class="text-sm sm:text-base leading-[20px] sm:leading-[24px] flex-shrink-0" style="font-family: Geist; font-weight: 600; color: #0B3947;">
            Travelers:
          </h4>
          <div class="flex flex-col gap-3 sm:gap-5">
            <div 
              v-for="(traveler, index) in travelers" 
              :key="index"
              class="flex items-center gap-2 sm:gap-3"
            >
              <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #E8FFF6;">
                <svg class="w-3 h-3 sm:w-[14px] sm:h-[14px]" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 7C8.933 7 10.5 5.433 10.5 3.5C10.5 1.567 8.933 0 7 0C5.067 0 3.5 1.567 3.5 3.5C3.5 5.433 5.067 7 7 7Z" fill="#1ECE84"/>
                  <path d="M7 8.75C4.101 8.75 1.75 11.101 1.75 14H12.25C12.25 11.101 9.899 8.75 7 8.75Z" fill="#1ECE84"/>
                </svg>
              </div>
              <span class="text-xs sm:text-sm leading-[18px] sm:leading-[20px]" style="font-family: Manrope; font-weight: 500; color: #0B3947;">
                {{ traveler }}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>

<!-- Right Side - Summary Card with Payment Button -->
<div class="w-full lg:w-auto lg:flex-shrink-0 lg:sticky lg:top-24 h-fit">
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
  embassy?: {
    id: number
    embassyName: string
    destinationCountry: string
    originCountry?: string
    address: string
  } | null
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