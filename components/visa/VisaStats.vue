<template>
  <div class="w-full border rounded-lg sm:rounded-xl mb-4 sm:mb-6 px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6" style="border-color: #BDBDBD; border-width: 1px;">
    <div class="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
      <h2 class="text-base sm:text-lg md:text-xl leading-[24px] sm:leading-[26px] md:leading-[28px]" style="font-family: Manrope, sans-serif; font-weight: 700; color: #0B3947;">
        {{ destination }} Visa
      </h2>

      <div class="flex flex-wrap gap-3 sm:gap-4 md:gap-5">
        <!-- Valid for -->
        <div class="flex gap-1.5 sm:gap-2 items-center">
          <div class="w-8 h-9 sm:w-9 sm:h-10 md:w-10 md:h-11 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: #383838;">
            <img src="/svg/gray-calendar.svg" alt="Valid for" class="w-4 h-4 sm:w-[16px] sm:h-[16px] md:w-[19.2px] md:h-[19.2px]" />
          </div>
          <div class="min-w-0">
            <div class="text-[10px] sm:text-xs leading-[16px] sm:leading-[20px]" style="font-family: Manrope, sans-serif; font-weight: 400; color: #6B7280;">Valid for</div>
            <div class="text-xs sm:text-sm leading-[18px] sm:leading-[22px] md:leading-[24px]" style="font-family: Manrope, sans-serif; font-weight: 400; color: #0B3947;">
              {{ validityText }}
            </div>
          </div>
        </div>

        <!-- Number of entries -->
        <div class="flex gap-1.5 sm:gap-2 items-center">
          <div class="w-8 h-9 sm:w-9 sm:h-10 md:w-10 md:h-11 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: #383838;">
            <img src="/svg/land-plane.svg" alt="Entries" class="w-4 h-4 sm:w-[16px] sm:h-[16px] md:w-[19.2px] md:h-[19.2px]" />
          </div>
          <div class="min-w-0">
            <div class="text-[10px] sm:text-xs leading-[16px] sm:leading-[20px]" style="font-family: Manrope, sans-serif; font-weight: 400; color: #6B7280;">Number of entries</div>
            <div class="text-xs sm:text-sm leading-[18px] sm:leading-[22px] md:leading-[24px]" style="font-family: Manrope, sans-serif; font-weight: 400; color: #0B3947;">
              {{ entryTypeText }}
            </div>
          </div>
        </div>

        <!-- Max stay -->
        <div class="flex gap-1.5 sm:gap-2 items-center">
          <div class="w-8 h-9 sm:w-9 sm:h-10 md:w-10 md:h-11 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: #383838;">
            <img src="/svg/calendar-check.svg" alt="Max stay" class="w-4 h-4 sm:w-[16px] sm:h-[16px] md:w-[19.2px] md:h-[19.2px]" />
          </div>
          <div class="min-w-0">
            <div class="text-[10px] sm:text-xs leading-[16px] sm:leading-[20px]" style="font-family: Manrope, sans-serif; font-weight: 400; color: #6B7280;">Max stay</div>
            <div class="text-xs sm:text-sm leading-[18px] sm:leading-[22px] md:leading-[24px]" style="font-family: Manrope, sans-serif; font-weight: 400; color: #0B3947;">
              {{ durationText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface VisaProduct {
  duration?: number
  validity?: number
  entryType?: string
  [key: string]: any
}

const props = defineProps<{
  destination: string
  productDetails?: VisaProduct | null
}>()

// Computed property for validity text
const validityText = computed(() => {
  if (!props.productDetails?.validity) {
    return '180 days after issued' // Default fallback
  }
  
  const validity = props.productDetails.validity
  
  if (validity >= 365) {
    const years = Math.floor(validity / 365)
    return years === 1 ? '1 year after issued' : `${years} years after issued`
  } else if (validity >= 30) {
    const months = Math.floor(validity / 30)
    return months === 1 ? '1 month after issued' : `${months} months after issued`
  } else {
    return `${validity} days after issued`
  }
})

// Computed property for entry type text
const entryTypeText = computed(() => {
  if (!props.productDetails?.entryType) {
    return 'Single entry' // Default fallback
  }
  
  // Capitalize and format the entry type
  const entryType = props.productDetails.entryType.toLowerCase()
  
  if (entryType.includes('single')) {
    return 'Single entry'
  } else if (entryType.includes('multiple')) {
    return 'Multiple entry'
  } else if (entryType.includes('double')) {
    return 'Double entry'
  } else {
    // Return as-is with proper capitalization
    return entryType.charAt(0).toUpperCase() + entryType.slice(1)
  }
})

// Computed property for duration text
const durationText = computed(() => {
  if (!props.productDetails?.duration) {
    return '30 days per entry' // Default fallback
  }
  
  const duration = props.productDetails.duration
  
  if (duration >= 365) {
    const years = Math.floor(duration / 365)
    return years === 1 ? '1 year per entry' : `${years} years per entry`
  } else if (duration >= 30) {
    const months = Math.floor(duration / 30)
    return months === 1 ? '1 month per entry' : `${months} months per entry`
  } else {
    return duration === 1 ? '1 day per entry' : `${duration} days per entry`
  }
})
</script>