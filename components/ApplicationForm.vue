<template>
  <!-- Your Visa Our Priority Section -->
  <section 
    class="relative overflow-hidden w-full min-h-[553px]"
    style="background: linear-gradient(90deg, #31B560 0%, #0582A2 33.14%, #2567BE 51.18%, #5051DA 69.41%, #2C229B 100%);"
  >
    <div class="w-full h-full relative">
      <!-- Logo in top right corner with high z-index, moved more right -->
      <div class="absolute top-0 -right-2 lg:-right-4 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] z-50">
        <img
          src="/svg/half-logo.svg"
          alt="Visa123 Logo"
          class="w-full h-full object-contain"
        />
      </div>

      <div class="max-w-[1440px] mx-auto h-full flex items-center min-h-[553px]">
        <!-- Content - Full Width -->
        <div class="w-full px-6 lg:pl-[144px] lg:pr-[120px]">
          
          <!-- Left Content -->
          <div class="text-white z-10 relative max-w-[676px] py-12 lg:py-16">
            <!-- Heading and Subtext Container -->
            <div class="mb-8">
              <!-- Main Heading - Single Line -->
              <h1 class="font-manrope font-extrabold text-[40px] md:text-[47px] leading-[48px] md:leading-[56px] mb-4 uppercase whitespace-nowrap">
                Your Visa. Our Priority
              </h1>
              
              <!-- Subtext -->
              <p class="font-manrope font-semibold text-[18px] md:text-[20px] leading-[26px] md:leading-[30px] max-w-[500px]">
                Thailand ETA, Morocco eVisa, or Egypt Standard Visa<br>
                - we're here to make your travel dreams stress-free.
              </p>
            </div>

            <!-- Application Form Card -->
            <div class="w-full max-w-[585px] lg:w-[585px] lg:h-[248px] rounded-2xl p-[25px] bg-[#F1F9FC] shadow-lg">
              <h2 class="font-manrope font-bold text-[22px] leading-[30px] text-[#1a1a1a] mb-6">
                Start your application
              </h2>

              <!-- Loading State -->
              <div v-if="isLoadingWorld || isLoadingVisa" class="flex items-center justify-center py-8">
                <div class="text-gray-600">Loading countries...</div>
              </div>

              <!-- Error State -->
              <div v-else-if="errorWorld || errorVisa" class="flex items-center justify-center py-8">
                <div class="text-red-600">{{ errorWorld || errorVisa }}</div>
              </div>

              <!-- Form Content -->
              <div v-else>
                <!-- Country Selectors Row -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <!-- From Country Dropdown (World Countries) -->
                  <div class="space-y-2">
                    <Select v-model="selectedFrom">
                      <SelectTrigger 
                        class="!h-[48px] !bg-white !rounded-[10px] !border !border-gray-200 hover:!border-gray-300 transition-all"
                      >
                        <SelectValue placeholder="Select country">
                          <div class="flex items-center gap-2 pl-4" v-if="selectedFrom">
                            <img 
                              :src="getWorldCountryFlag(selectedFrom)" 
                              :alt="getWorldCountryName(selectedFrom)"
                              class="w-5 h-4 object-cover rounded-sm"
                              @error="handleFlagError"
                            />
                            <span class="text-[15px] text-gray-700">{{ getWorldCountryName(selectedFrom) }}</span>
                          </div>
                        </SelectValue>
                        <svg class="w-3 h-2 mr-3" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </SelectTrigger>
                      <SelectContent class="!rounded-[10px] !bg-white max-h-[300px] overflow-y-auto">
                        <SelectItem 
                          v-for="country in worldCountries" 
                          :key="country.id" 
                          :value="country.id"
                          class="pl-4"
                        >
                          <div class="flex items-center gap-2">
                            <img 
                              :src="country.flag" 
                              :alt="country.name"
                              class="w-5 h-4 object-cover rounded-sm"
                              @error="handleFlagError"
                            />
                            <span>{{ country.name }}</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <!-- To Country Dropdown (Visa Countries) -->
                  <div class="space-y-2">
                    <Select v-model="selectedTo">
                      <SelectTrigger 
                        class="!h-[48px] !bg-white !rounded-[10px] !border !border-gray-200 hover:!border-gray-300 transition-all"
                      >
                        <SelectValue placeholder="Select country">
                          <div class="flex items-center gap-2 pl-4" v-if="selectedTo">
                            <!-- Logo with fallback -->
                            <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                              <img 
                                v-if="getVisaCountryLogo(selectedTo)"
                                :src="getVisaCountryLogo(selectedTo)" 
                                :alt="getVisaCountryName(selectedTo)"
                                class="max-w-full max-h-full object-contain"
                                @error="handleLogoError"
                              />
                              <div 
                                v-else
                                class="w-6 h-6 rounded border border-gray-200 bg-gray-100 flex items-center justify-center"
                              >
                                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                                </svg>
                              </div>
                            </div>
                            <span class="text-[15px] text-gray-700">{{ getVisaCountryName(selectedTo) }}</span>
                          </div>
                        </SelectValue>
                        <svg class="w-3 h-2 mr-3" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </SelectTrigger>
                      <SelectContent class="!rounded-[10px] !bg-white max-h-[300px] overflow-y-auto">
                        <SelectItem 
                          v-for="country in visaCountries" 
                          :key="country.id" 
                          :value="String(country.id)"
                          class="pl-4"
                        >
                          <div class="flex items-center gap-2">
                            <!-- Logo with fallback -->
                            <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                              <img 
                                v-if="country.logoUrl"
                                :src="getFullLogoUrl(country.logoUrl)" 
                                :alt="country.countryName"
                                class="max-w-full max-h-full object-contain"
                                @error="handleLogoError"
                              />
                              <div 
                                v-else
                                class="w-6 h-6 rounded border border-gray-200 bg-gray-100 flex items-center justify-center"
                              >
                                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                                </svg>
                              </div>
                            </div>
                            <span>{{ country.countryName }}</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <!-- Apply Now Button -->
                <button
                  @click="handleApply"
                  :disabled="!selectedFrom || !selectedTo || isLoadingWorld || isLoadingVisa"
                  class="w-full h-[50px] bg-[#08D07A] hover:bg-[#06B869] active:scale-98 text-white font-manrope font-semibold text-base rounded-[10px] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="text-lg">→</span>
                  <span>Apply Now!</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import { useCountriesApi, type Country, type SimpleWorldCountry } from '@/composables/useCountries'

// State for world countries (all countries with flags)
const worldCountries = ref<SimpleWorldCountry[]>([])
const selectedFrom = ref<string>('')
const isLoadingWorld = ref(false)
const errorWorld = ref<string | null>(null)

// State for visa service countries (backend countries with logos)
const visaCountries = ref<Country[]>([])
const selectedTo = ref<string>('')
const isLoadingVisa = ref(false)
const errorVisa = ref<string | null>(null)

// API
const { getWorldCountries, getVisaCountries } = useCountriesApi()
const config = useRuntimeConfig()

// Error handlers for images
const handleFlagError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.error('❌ Flag failed to load:', img.src)
  img.style.display = 'none'
}

const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.error('❌ Logo failed to load:', img.src)
  img.style.display = 'none'
}

// Helper functions for world countries
const getWorldCountryName = (countryId: string) => {
  const country = worldCountries.value.find(c => c.id === countryId)
  return country?.name || ''
}

const getWorldCountryFlag = (countryId: string) => {
  const country = worldCountries.value.find(c => c.id === countryId)
  return country?.flag || ''
}

// Helper functions for visa countries
const getVisaCountryName = (countryId: string) => {
  const country = visaCountries.value.find(c => String(c.id) === countryId)
  return country?.countryName || ''
}

const getVisaCountryLogo = (countryId: string) => {
  const country = visaCountries.value.find(c => String(c.id) === countryId)
  if (!country?.logoUrl) return null
  return getFullLogoUrl(country.logoUrl)
}

const getFullLogoUrl = (logoUrl: string) => {
  if (!logoUrl) {
    console.warn('⚠️ Empty logo URL')
    return ''
  }
  
  // Check if it's already a full URL (Cloudinary)
  if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
    return logoUrl
  }
  
  // Otherwise, construct local URL
  const baseUrl = config.public.apiBase.replace(/\/+$/, '')
  const path = logoUrl.startsWith('/') ? logoUrl : `/${logoUrl}`
  
  return `${baseUrl}${path}`
}

// Fetch world countries for "Where am I from?"
const fetchWorldCountries = async () => {
  isLoadingWorld.value = true
  errorWorld.value = null
  
  try {
    const response = await getWorldCountries()
    
    if (response.success && response.data) {
      worldCountries.value = response.data
      console.log('✅ Loaded world countries:', worldCountries.value.length)
      
      // Set default value to the first country
      if (worldCountries.value.length > 0) {
        selectedFrom.value = worldCountries.value[0].id
      }
    } else {
      errorWorld.value = response.message || 'Failed to load world countries'
    }
  } catch (err) {
    errorWorld.value = err instanceof Error ? err.message : 'Failed to load world countries'
    console.error('❌ Error fetching world countries:', err)
  } finally {
    isLoadingWorld.value = false
  }
}

// Fetch visa countries for "Where am I going?"
const fetchVisaCountries = async () => {
  isLoadingVisa.value = true
  errorVisa.value = null
  
  try {
    const response = await getVisaCountries()
    
    if (response.success && response.data) {
      visaCountries.value = response.data
      console.log('✅ Loaded visa countries:', visaCountries.value.length)
      
      // Set default value to the first country
      if (visaCountries.value.length > 0) {
        selectedTo.value = String(visaCountries.value[0].id)
      }
    } else {
      errorVisa.value = response.message || 'Failed to load visa countries'
    }
  } catch (err) {
    errorVisa.value = err instanceof Error ? err.message : 'Failed to load visa countries'
    console.error('❌ Error fetching visa countries:', err)
  } finally {
    isLoadingVisa.value = false
  }
}

// Handle apply button click
const handleApply = () => {
  const fromCountry = getWorldCountryName(selectedFrom.value)
  const toCountry = getVisaCountryName(selectedTo.value)
  
  console.log('🚀 Apply Now:', {
    from: fromCountry,
    fromCode: selectedFrom.value,
    to: toCountry,
    toId: selectedTo.value
  })
  
  // Navigate with the same parameters as hero section
  navigateTo(`/visa-application?fromCode=${selectedFrom.value}&toId=${selectedTo.value}&from=${encodeURIComponent(fromCountry)}&to=${encodeURIComponent(toCountry)}`)
}

// Fetch both types of countries on component mount
onMounted(() => {
  fetchWorldCountries()
  fetchVisaCountries()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

.font-manrope {
  font-family: 'Manrope', sans-serif;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  h1 {
    white-space: normal !important;
  }
}
</style>