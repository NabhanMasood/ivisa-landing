<template>
  <div class="w-[400px] space-y-4">
    
    <!-- Price Summary Card -->
    <div class="border-2 rounded-xl p-6" style="border-color: #1ECE84;">
      <div class="space-y-4">
        <!-- Visa Info -->
        <div class="flex justify-between items-center">
          <span style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
            {{ destination }} Visa
          </span>
          <div class="flex justify-end">
            <span style="font-family: Geist; font-weight: 400; font-size: 14px; line-height: 20px; color: #27272B;">
              {{ travelerCount }} traveler{{ travelerCount > 1 ? 's' : '' }}
            </span>
          </div>
        </div>

        <!-- Product Name (if available) -->
        <div v-if="productDetails?.productName" class="flex justify-between items-center">
          <span style="font-family: Geist; font-weight: 500; font-size: 14px; line-height: 20px; color: #6B7280;">
            {{ productDetails.productName }}
          </span>
        </div>

        <!-- Government Fee -->
        <div class="flex justify-between items-center">
          <span style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 20px; color: #0B3947;">
            Government Fee
          </span>
          <div class="flex justify-end">
            <span style="font-family: Geist; font-weight: 400; font-size: 14px; line-height: 20px; color: #27272B;">
              {{ formatPrice(calculatedGovernmentFee) }}
            </span>
          </div>
        </div>

        <!-- Service Fee (Platform Fee) -->
        <div class="flex justify-between items-center">
          <span style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 20px; color: #0B3947;">
            Service Fee
          </span>
          <div class="flex justify-end">
            <span style="font-family: Geist; font-weight: 400; font-size: 14px; line-height: 20px; color: #27272B;">
              {{ formatPrice(calculatedServiceFee) }}
            </span>
          </div>
        </div>

        <!-- Processing Fee (if selected) -->
        <div v-if="processingFee && processingFee > 0" class="flex justify-between items-center">
          <span style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 20px; color: #0B3947;">
            {{ processingType || 'Processing Fee' }}
          </span>
          <div class="flex justify-end">
            <span style="font-family: Geist; font-weight: 400; font-size: 14px; line-height: 20px; color: #27272B;">
              {{ formatPrice(calculatedProcessingFee) }}
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t" style="border-color: #E5E7EB;"></div>

        <!-- Subtotal -->
        <div class="flex justify-between items-center">
          <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #6B7280;">
            Subtotal
          </span>
          <div class="flex justify-end">
            <span style="font-family: Geist; font-weight: 400; font-size: 14px; line-height: 20px; color: #27272B;">
              {{ formatPrice(subtotalAmount) }}
            </span>
          </div>
        </div>

        <!-- Discount (if applied) -->
        <div v-if="discountAmount > 0" class="flex justify-between items-center">
          <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #10B981;">
            Discount ({{ appliedCouponCode }})
          </span>
          <div class="flex justify-end">
            <span style="font-family: Geist; font-weight: 500; font-size: 14px; line-height: 20px; color: #10B981;">
              -{{ formatPrice(discountAmount) }}
            </span>
          </div>
        </div>

        <!-- Total -->
        <div class="flex justify-between items-center">
          <span style="font-family: Manrope; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
            Total
          </span>
          <div class="flex justify-end">
            <span 
              v-if="showCalculatedTotal"
              style="font-family: geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #27272B;"
            >
              {{ formatPrice(totalAmount) }}
            </span>
            <span 
              v-else
              style="font-family: geist; font-weight: 500; font-size: 14px; line-height: 20px; color: #27272B;"
            >
              Calculated at checkout
            </span>
          </div>
        </div>

        <!-- Currency Info -->
        <div class="flex justify-end">
          <span style="font-family: Geist; font-weight: 400; font-size: 12px; line-height: 16px; color: #6B7280;">
            Prices in {{ selectedCurrency.code }}
          </span>
        </div>
      </div>
    </div>

    <!-- ✅ NEW: Coupon Code Field (only show on review page) -->
    <div v-if="showCouponField" class="border rounded-xl p-4" style="border-color: #E5E7EB;">
      <label 
        for="coupon-code" 
        style="font-family: Geist; font-weight: 600; font-size: 14px; line-height: 20px; color: #0B3947;"
        class="block mb-3"
      >
        Have a coupon code?
      </label>
      
      <div class="flex gap-2">
        <input
          id="coupon-code"
          v-model="couponCode"
          type="text"
          placeholder="Enter code"
          :disabled="isApplyingCoupon || !!appliedCouponCode"
          class="flex-1 h-10 px-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1ECE84] focus:border-transparent"
          style="border-color: #E5E7EB; font-family: Manrope;"
          @keyup.enter="applyCoupon"
        />
        
        <button
          v-if="!appliedCouponCode"
          @click="applyCoupon"
          :disabled="!couponCode.trim() || isApplyingCoupon"
          class="px-4 h-10 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style="background-color: #1ECE84; color: white; font-family: Geist;"
        >
          {{ isApplyingCoupon ? 'Applying...' : 'Apply' }}
        </button>
        
        <button
          v-else
          @click="removeCoupon"
          class="px-4 h-10 text-sm font-medium rounded-md transition-colors hover:bg-red-600"
          style="background-color: #EF4444; color: white; font-family: Geist;"
        >
          Remove
        </button>
      </div>
      
      <!-- Coupon Error Message -->
      <p v-if="couponError" class="text-xs mt-2" style="color: #EF4444; font-family: Manrope;">
        {{ couponError }}
      </p>
      
      <!-- Coupon Success Message -->
      <p v-if="appliedCouponCode && !couponError" class="text-xs mt-2" style="color: #10B981; font-family: Manrope;">
         Coupon applied successfully!
      </p>
    </div>

    <!-- Save & Continue Button -->
    <button
      @click="handleContinue"
      class="w-full h-12 rounded-md transition-colors hover:opacity-90"
      style="background-color: #1ECE84; color: white; border-radius: 6px; font-family: Geist; font-weight: 500; font-size: 14px; line-height: 24px;"
    >
      {{ buttonText }}
    </button>

    <!-- Security Message -->
    <div class="border rounded-xl p-4" style="border-color: #E5E7EB;">
      <div class="flex items-start gap-3">
        <img src="/svg/Union.svg" alt="Security" style="width: 19.2px; height: 19.2px;" />
        <p style="font-family: Geist; font-weight: 500; font-size: 16px; line-height: 20px; color: #3E3E3E;">
          We take strong measures to protect your information
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface ProductDetails {
  productName: string
  duration: number
  validity: number
  govtFee: number | string
  serviceFee: number | string
  totalAmount: number | string
}

const props = defineProps<{
  destination: string
  travelerCount: number
  productDetails?: ProductDetails | null
  processingFee?: number
  processingType?: string
  showCalculatedTotal?: boolean
  buttonText?: string
  showCouponField?: boolean  // ✅ NEW: Control coupon field visibility
}>()

const emit = defineEmits<{
  continue: []
  couponApplied: [discount: number, code: string]  // ✅ NEW
  couponRemoved: []  // ✅ NEW
}>()

// Currency conversion
const { formatPrice, selectedCurrency } = useCurrency()

// Coupon API
const { validateCoupon } = useCouponsApi()

// ✅ NEW: Coupon state
const couponCode = ref('')
const appliedCouponCode = ref('')
const discountAmount = ref(0)
const discountPercentage = ref(0)
const isApplyingCoupon = ref(false)
const couponError = ref('')

// Calculate government fee from product details
const calculatedGovernmentFee = computed(() => {
  if (props.productDetails?.govtFee) {
    const feePerTraveler = Number(props.productDetails.govtFee)
    return feePerTraveler * props.travelerCount
  }
  return 0
})

// Calculate service fee from product details
const calculatedServiceFee = computed(() => {
  if (props.productDetails?.serviceFee) {
    const feePerTraveler = Number(props.productDetails.serviceFee)
    return feePerTraveler * props.travelerCount
  }
  return 0
})

// Calculate processing fee (multiply by traveler count)
const calculatedProcessingFee = computed(() => {
  if (props.processingFee && props.processingFee > 0) {
    return props.processingFee * props.travelerCount
  }
  return 0
})

// ✅ NEW: Calculate subtotal (before discount)
const subtotalAmount = computed(() => {
  return calculatedGovernmentFee.value + calculatedServiceFee.value + calculatedProcessingFee.value
})

// ✅ NEW: Calculate total amount (after discount)
const totalAmount = computed(() => {
  const subtotal = subtotalAmount.value
  const discount = discountAmount.value
  const total = Math.max(0, subtotal - discount)
  
  console.log('🔄 totalAmount computed recalculated:', {
    subtotal,
    discount,
    total
  })
  
  return total
})

// Watch discountAmount to ensure reactivity
watch(discountAmount, (newValue, oldValue) => {
  console.log('👀 discountAmount changed:', { oldValue, newValue, totalAmount: totalAmount.value })
}, { immediate: true })

// ✅ NEW: Apply coupon code
const applyCoupon = async () => {
  if (!couponCode.value.trim()) return
  
  isApplyingCoupon.value = true
  couponError.value = ''
  
  try {
    console.log('🎟️ Applying coupon:', couponCode.value)
    console.log('💰 Subtotal amount:', subtotalAmount.value)
    
    // Call backend API to validate coupon using composable
    const result = await validateCoupon({
      code: couponCode.value.trim().toUpperCase(),
      amount: subtotalAmount.value
    })
    
    // ✅ Handle validation errors (expired, not found, usage limit, etc.)
    if (!result.success || !result.data) {
      const errorMessage = result.message || 'Invalid coupon code'
      console.error('❌ Coupon validation failed:', errorMessage)
      couponError.value = errorMessage
      
      // Reset coupon state on error
      appliedCouponCode.value = ''
      discountAmount.value = 0
      discountPercentage.value = 0
      isApplyingCoupon.value = false
      return // Exit early, don't throw
    }
    
    console.log('✅ Coupon validated:', result.data)
    
    // Apply discount from the validated result
    const calculatedDiscount = Number(result.data.discountAmount) || 0
    
    console.log('💾 Setting discount values:', {
      calculatedDiscount,
      originalAmount: result.data.originalAmount,
      finalAmount: result.data.finalAmount,
      resultData: result.data
    })
    
    // Set values
    appliedCouponCode.value = couponCode.value.trim().toUpperCase()
    discountAmount.value = calculatedDiscount
    discountPercentage.value = Number(result.data.discountPercentage) || 0
    
    // Wait for next tick to ensure reactivity
    await nextTick()
    
    // Force reactivity check
    console.log('✅ After setting discountAmount.value:', discountAmount.value)
    console.log('✅ totalAmount.value after setting:', totalAmount.value)
    console.log('✅ subtotalAmount.value:', subtotalAmount.value)
    
    // Verify the calculation
    const expectedTotal = Math.max(0, subtotalAmount.value - discountAmount.value)
    console.log('✅ Expected total calculation:', {
      subtotal: subtotalAmount.value,
      discount: discountAmount.value,
      expected: expectedTotal,
      actual: totalAmount.value,
      match: expectedTotal === totalAmount.value
    })
    
    // Emit event to parent with discount amount and coupon code
    emit('couponApplied', discountAmount.value, appliedCouponCode.value)
    
    console.log('💰 Discount applied:', {
      code: appliedCouponCode.value,
      couponType: result.data.coupon.type,
      couponValue: result.data.coupon.value,
      percentage: discountPercentage.value,
      amount: discountAmount.value,
      originalAmount: result.data.originalAmount,
      finalAmount: result.data.finalAmount,
      subtotal: subtotalAmount.value,
      newTotal: totalAmount.value
    })
    
  } catch (error: any) {
    console.error('❌ Coupon validation error:', error)
    
    // Extract user-friendly error message
    let errorMessage = 'Failed to apply coupon code'
    if (error.message) {
      errorMessage = error.message
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.data?.message) {
      errorMessage = error.data.message
    }
    
    couponError.value = errorMessage
    
    // Reset on error
    appliedCouponCode.value = ''
    discountAmount.value = 0
    discountPercentage.value = 0
  } finally {
    isApplyingCoupon.value = false
  }
}

// ✅ NEW: Remove coupon
const removeCoupon = () => {
  console.log('🗑️ Removing coupon:', appliedCouponCode.value)
  
  couponCode.value = ''
  appliedCouponCode.value = ''
  discountAmount.value = 0
  discountPercentage.value = 0
  couponError.value = ''
  
  // Emit event to parent
  emit('couponRemoved')
}

const handleContinue = () => {
  console.log('🟢 PriceSummaryCard: Continue button clicked')
  console.log('💰 Subtotal:', subtotalAmount.value)
  console.log('💰 Discount:', discountAmount.value)
  console.log('💰 Total Amount:', totalAmount.value)
  console.log('💱 Selected Currency:', selectedCurrency.value.code)
  console.log('📦 Product Details:', props.productDetails)
  console.log('👥 Traveler Count:', props.travelerCount)
  console.log('💵 Processing Fee:', props.processingFee)
  console.log('🎟️ Applied Coupon:', appliedCouponCode.value)
  
  emit('continue')
  console.log('✅ PriceSummaryCard: Emitted continue event')
}
</script>