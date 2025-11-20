<template>
  <div class="flex flex-col lg:flex-row gap-4 sm:gap-6">
    <!-- Left Side - Embassy Selection -->
    <div class="flex-1">
      
      <!-- Embassy Selection Header -->
      <div class="mb-4 sm:mb-6 pl-4 sm:pl-6">
        <h2 class="text-base sm:text-lg leading-[22px] sm:leading-[24px]" style="font-family: Geist; font-weight: 600; color: #0B3947;">
          Select Embassy
        </h2>
        <p class="text-xs sm:text-sm leading-[18px] sm:leading-[20px] mt-1" style="font-family: Manrope; font-weight: 400; color: #6B7280;">
          Choose the embassy where you would like to process your visa application. This step is optional.
        </p>
      </div>

      <!-- Embassy Selection Card -->
      <div class="border rounded-lg sm:rounded-xl p-4 sm:p-6" style="border-color: #E5E7EB;">

        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center py-8 sm:py-12">
          <div class="flex flex-col items-center gap-3">
            <div class="w-6 h-6 sm:w-8 sm:h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            <p class="text-xs sm:text-sm text-gray-600">Loading embassies...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="py-8 sm:py-12 text-center">
          <p class="text-xs sm:text-sm text-red-600 mb-3 sm:mb-4 px-2">{{ error }}</p>
          <button
            @click="fetchEmbassies"
            class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-[6px] text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>

        <!-- No Embassies Available -->
        <div v-else-if="!embassies || embassies.length === 0" class="py-8 sm:py-12 text-center">
          <p class="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 px-2">No embassies available for the selected countries.</p>
          <button
            @click="handleContinueWithoutEmbassy"
            class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-[6px] text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Continue Without Embassy
          </button>
        </div>

        <!-- Embassy Options -->
        <div v-else class="space-y-3 sm:space-y-4">
          <button
            v-for="embassy in embassies"
            :key="embassy.id"
            @click="selectedEmbassy = embassy"
            class="text-left transition-all w-full"
            :style="{
              minHeight: '60px',
              gap: '8px',
              borderRadius: '8px',
              paddingTop: '12px',
              paddingRight: '12px',
              paddingBottom: '12px',
              paddingLeft: '12px',
              border: selectedEmbassy?.id === embassy.id ? '1px solid #1ECE84' : '1px solid #D4D4DA',
              backgroundColor: selectedEmbassy?.id === embassy.id ? '#E8FFF6' : '#FFFFFF'
            }"
            type="button"
          >
            <div class="flex flex-col gap-1">
              <h4 class="text-sm sm:text-base leading-[20px] sm:leading-[24px]" style="font-family: Geist; font-weight: 600; color: #0B3947;">
                {{ getEmbassyName(embassy) }}
              </h4>
              <p v-if="getEmbassyCountry(embassy)" class="text-xs sm:text-sm leading-[18px] sm:leading-[20px]" style="font-family: Manrope; font-weight: 400; color: #6B7280;">
                {{ getEmbassyCountry(embassy) }}
              </p>
              <p v-if="getEmbassyAddress(embassy)" class="text-xs leading-[16px] sm:leading-[18px]" style="font-family: Manrope; font-weight: 400; color: #9CA3AF;">
                {{ getEmbassyAddress(embassy) }}
              </p>
            </div>
          </button>
        </div>

        <!-- Optional Notice -->
        <div v-if="embassies && embassies.length > 0" class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t" style="border-color: #E5E7EB;">
          <p class="text-xs leading-[16px] sm:leading-[18px]" style="font-family: Manrope; font-weight: 400; color: #6B7280;">
            <strong>Note:</strong> Embassy selection is optional. You can proceed without selecting an embassy.
          </p>
        </div>

      </div>

    </div>

    <!-- Right Side - Summary Card -->
    <PriceSummaryCard
      :destination="destination"
      :traveler-count="travelerCount"
      :product-details="productDetails" 
      :processing-fee="0"
      :show-calculated-total="false"
      button-text="Continue"
      @continue="handleContinue"
    />
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import PriceSummaryCard from '@/components/visa/price-card.vue'
import { useEmbassiesApi, type Embassy } from '@/composables/useEmbassies'

const props = defineProps<{
  destination: string
  nationality: string
  travelerCount: number
  productDetails?: any  
  initialData?: {
    embassyId?: number | null
  }
}>()

const emit = defineEmits<{
  next: [data: { embassyId: number | null }]
  back: []
}>()

const { getEmbassiesByCountries } = useEmbassiesApi()

const isLoading = ref(false)
const error = ref<string | null>(null)
const embassies = ref<Embassy[]>([])
const selectedEmbassy = ref<Embassy | null>(null)

// Helper functions to get embassy properties (matching backend Entity structure)
const getEmbassyName = (embassy: any): string => {
  return embassy?.embassyName || embassy?.name || 'Embassy'
}

const getEmbassyCountry = (embassy: any): string => {
  return embassy?.destinationCountry || embassy?.country || ''
}

const getEmbassyAddress = (embassy: any): string => {
  // API response may use 'location' field, entity uses 'address'
  return embassy?.address || embassy?.location || ''
}

// Fetch embassies based on nationality and destination
const fetchEmbassies = async () => {
  if (!props.nationality || !props.destination) {
    console.warn('⚠️ Missing nationality or destination for embassy fetch')
    return
  }

  isLoading.value = true
  error.value = null

  try {
    console.log('🔍 Fetching embassies for:', { 
      nationality: props.nationality, 
      destination: props.destination,
      explanation: `Showing embassies where originCountry=${props.nationality} and destinationCountry=${props.destination}`
    })
    const response = await getEmbassiesByCountries(props.nationality, props.destination)
    
    if (response.success && response.data) {
      embassies.value = response.data
      console.log('✅ Loaded embassies:', embassies.value.length)
      console.log('📦 Embassy data structure:', embassies.value)
      if (embassies.value.length > 0) {
        console.log('📦 First embassy object:', embassies.value[0])
        console.log('📦 First embassy keys:', Object.keys(embassies.value[0]))
      }
      
      // Auto-select from initialData if available
      if (props.initialData?.embassyId && embassies.value.length > 0) {
        const savedEmbassy = embassies.value.find(
          embassy => embassy.id === props.initialData.embassyId
        )
        if (savedEmbassy) {
          selectedEmbassy.value = savedEmbassy
          console.log('✅ Restored selected embassy:', getEmbassyName(savedEmbassy))
        }
      }
    } else {
      embassies.value = []
      error.value = response.message || 'Failed to load embassies'
    }
  } catch (err: any) {
    console.error('❌ Error fetching embassies:', err)
    error.value = err.message || 'Failed to load embassies'
    embassies.value = []
  } finally {
    isLoading.value = false
  }
}

const handleContinue = () => {
  // Embassy selection is optional, so we can continue with or without selection
  emit('next', {
    embassyId: selectedEmbassy.value?.id || null,
    embassy: selectedEmbassy.value || null
  })
}

const handleContinueWithoutEmbassy = () => {
  emit('next', {
    embassyId: null
  })
}

// Watch for nationality/destination changes
watch(
  () => [props.nationality, props.destination],
  () => {
    if (props.nationality && props.destination) {
      fetchEmbassies()
    }
  },
  { immediate: false }
)

// Initialize on mount
onMounted(() => {
  console.log('🔄 EmbassySelectionForm mounted')
  console.log('📍 Nationality:', props.nationality)
  console.log('📍 Destination:', props.destination)
  
  if (props.nationality && props.destination) {
    fetchEmbassies()
  } else {
    console.warn('⚠️ Missing nationality or destination, cannot fetch embassies')
  }
})
</script>

