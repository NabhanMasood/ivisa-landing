<template>
  <div class="flex gap-6">
    <!-- Left Side - Processing Time Selection -->
    <div class="flex-1">
      
      <!-- Passport Details Header -->
      <div class="mb-6">
        <h2 style="font-family: Geist; font-weight: 600; font-size: 18px; line-height: 24px; color: #0B3947;">
          Choose Your Processing Time
        </h2>
        <p style="font-family: Manrope; font-weight: 400; font-size: 14px; line-height: 20px; color: #6B7280;">
          Enter the details as they appear on your passport.
        </p>
      </div>

      <!-- Processing Options Card -->
      <div class="border rounded-xl p-6" style="border-color: #E5E7EB;">

        <!-- Processing Time Header -->
        <div class="mb-6">
          <h2 style="font-family: Geist; font-weight: 600; font-size: 18px; line-height: 24px; color: #0B3947;">
            Processing Time
          </h2>
          <p style="font-family: Manrope; font-weight: 400; font-size: 14px; line-height: 20px; color: #6B7280;">
            Select how quickly you need your visa processed.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center py-12">
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            <p class="text-sm text-gray-600">Loading processing options...</p>
          </div>
        </div>

        <!-- No Processing Fees Available -->
        <div v-else-if="!processingOptions || processingOptions.length === 0" class="py-12 text-center">
          <p class="text-sm text-gray-600">No processing options available for this visa product.</p>
          <button
            @click="handleContinueWithoutProcessing"
            class="mt-4 px-4 py-2 text-sm font-medium rounded-[6px] text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Continue Without Processing Fee
          </button>
        </div>

        <!-- Processing Time Options -->
        <div v-else class="space-y-4">
          <button
            v-for="(option, index) in processingOptions"
            :key="index"
            @click="selectedProcessing = option"
            class="text-left transition-all"
            :style="{
              width: '100%',
              height: '70px',
              borderWidth: '1px',
              gap: '10px',
              borderRadius: '10px',
              paddingTop: '14px',
              paddingRight: '15px',
              paddingBottom: '14px',
              paddingLeft: '15px',
              border: selectedProcessing?.id === option.id ? '1px solid #1ECE84' : '1px solid #D4D4DA',
              backgroundColor: selectedProcessing?.id === option.id ? '#E8FFF6' : '#FFFFFF'
            }"
            type="button"
          >
            <div class="flex justify-between items-center">
              <div>
                <h4 style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
                  {{ option.feeType }}
                </h4>
                <p style="font-family: Manrope; font-weight: 400; font-size: 14px; line-height: 20px; color: #6B7280;">
                  {{ option.timeValue }} {{ option.timeUnit === 'hours' ? (option.timeValue === 1 ? 'Hour' : 'Hours') : (option.timeValue === 1 ? 'Day' : 'Days') }} Processing
                </p>
              </div>
              <span style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
                +{{ formatPrice(Number(option.amount)) }}
              </span>
            </div>
          </button>
        </div>

      </div>

    </div>

    <!-- Right Side - Summary Card -->
    <PriceSummaryCard
      :destination="destination"
      :traveler-count="travelerCount"
      :product-details="productDetails" 
      :processing-fee="selectedProcessing?.amount || 0"
      :processing-type="selectedProcessing?.feeType"
      :show-calculated-total="!!selectedProcessing"
      button-text="Save & Continue"
      @continue="handleContinue"
    />
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PriceSummaryCard from '@/components/visa/price-card.vue'
import type { ProcessingFee } from '@/composables/useVisaProductsApi'

const props = defineProps<{
  destination: string
  travelerCount: number
  productDetails?: any  
  initialData?: any
}>()

const emit = defineEmits<{
  next: [data: any]
  back: []
}>()

// Currency conversion
const { formatPrice } = useCurrency()

const isLoading = ref(false)
const selectedProcessing = ref<ProcessingFee | null>(null)

// Extract processing options from productDetails
const processingOptions = computed<ProcessingFee[]>(() => {
  console.log('🔍 CheckoutForm - Product Details:', props.productDetails)
  console.log('💰 Available Processing Fees:', props.productDetails?.processingFees)
  
  if (!props.productDetails?.processingFees || props.productDetails.processingFees.length === 0) {
    return []
  }
  return props.productDetails.processingFees
})

const handleContinue = () => {
  if (!selectedProcessing.value) {
    alert('Please select a processing time')
    return
  }

  emit('next', {
    processingFeeId: selectedProcessing.value.id,
    processingType: selectedProcessing.value.feeType,
    processingTime: `${selectedProcessing.value.timeValue} ${selectedProcessing.value.timeUnit}`,
    processingFee: selectedProcessing.value.amount
  })
}

const handleContinueWithoutProcessing = () => {
  emit('next', {
    processingFeeId: null,
    processingType: null,
    processingTime: null,
    processingFee: 0
  })
}

// Initialize on mount
onMounted(() => {
  console.log('🔄 CheckoutForm mounted')
  console.log('📦 Product Details:', props.productDetails)
  console.log('💰 Processing Options:', processingOptions.value)
  
  // Auto-select from initialData if available
  if (props.initialData?.processingFeeId && processingOptions.value.length > 0) {
    const savedOption = processingOptions.value.find(
      option => option.id === props.initialData.processingFeeId
    )
    if (savedOption) {
      selectedProcessing.value = savedOption
    }
  } 
  // Auto-select first option if only one available
  else if (processingOptions.value.length === 1) {
    selectedProcessing.value = processingOptions.value[0]
  }
})
</script>