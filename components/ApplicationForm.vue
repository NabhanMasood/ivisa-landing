<template>
  <!-- Your Visa Our Priority Section -->
  <section 
    class="relative overflow-hidden w-full min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] rounded-2xl sm:rounded-[30px]"
    style="background: linear-gradient(90deg, #31B560 0%, #0582A2 33.14%, #2567BE 51.18%, #5051DA 69.41%, #2C229B 100%);"
  >
      <div class="w-full h-full relative">
      <!-- Logo in top right corner - moved to background -->
      <div class="absolute top-0 -right-2 lg:-right-4 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] z-0 opacity-30 sm:opacity-40 lg:opacity-50">
        <img
          src="/svg/half-logo.svg"
          alt="Visa123 Logo"
          class="w-full h-full object-contain"
        />
      </div>

      <div class="max-w-[1440px] mx-auto h-full flex items-center min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
        <!-- Content - Full Width -->
        <div class="w-full px-4 sm:px-6 lg:pl-[60px] lg:pr-[80px]">
          
          <!-- Left Content -->
          <div class="text-white z-10 relative max-w-[676px] py-6 sm:py-8 lg:py-12">
            <!-- Heading and Subtext Container -->
            <div class="mb-6 sm:mb-8">
              <!-- Main Heading - Single Line -->
              <h1 class="font-manrope font-extrabold text-2xl sm:text-3xl md:text-[40px] lg:text-[47px] leading-[32px] sm:leading-[40px] md:leading-[48px] lg:leading-[56px] mb-3 sm:mb-4 uppercase">
                Your Visa. Our Priority
              </h1>
              
              <!-- Subtext -->
              <p class="font-manrope font-semibold text-sm sm:text-base md:text-[18px] lg:text-[20px] leading-[20px] sm:leading-[24px] md:leading-[26px] lg:leading-[30px] max-w-[500px]">
                Thailand ETA, Morocco eVisa, or Egypt Standard Visa<br class="hidden sm:block">
                - we're here to make your travel dreams stress-free.
              </p>
            </div>

            <!-- Application Form Card -->
            <div class="w-full max-w-[585px] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-[25px] bg-[#F1F9FC] shadow-lg">
              <h2 class="font-manrope font-bold text-lg sm:text-xl lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px] text-[#1a1a1a] mb-4 sm:mb-6">
                Start your application
              </h2>

              <!-- Loading State -->
              <div v-if="isLoading" class="flex items-center justify-center py-6 sm:py-8">
                <div class="text-gray-600 text-sm sm:text-base">Loading countries...</div>
              </div>

              <!-- Error State -->
              <div v-else-if="error" class="flex items-center justify-center py-6 sm:py-8">
                <div class="text-red-600 text-sm sm:text-base">{{ error }}</div>
              </div>

              <!-- Form Content -->
              <div v-else>
                <!-- Country Selectors Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <!-- From Country Dropdown (All Countries) -->
                  <div class="space-y-2">
                    <Select v-model="selectedFrom">
                      <SelectTrigger 
                        class="!h-[48px] !bg-white !rounded-[10px] !border !border-gray-200 hover:!border-gray-300 transition-all"
                      >
                        <SelectValue placeholder="Select your country">
                          <div class="flex items-center gap-2 pl-4" v-if="selectedFrom">
                            <!-- Logo with fallback -->
                            <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                              <img 
                                v-if="getCountryLogo(selectedFrom)"
                                :src="getCountryLogo(selectedFrom)" 
                                :alt="getCountryName(selectedFrom)"
                                class="w-6 h-6 object-cover rounded-full border border-gray-200"
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
                            <span class="text-[15px] text-gray-700">{{ getCountryName(selectedFrom) }}</span>
                          </div>
                          <span v-else class="text-gray-400 pl-4">Select your country</span>
                        </SelectValue>
                        <svg class="w-3 h-2 mr-3" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </SelectTrigger>
                      <SelectContent class="!rounded-[10px] !bg-white max-h-[300px] overflow-y-auto">
                        <!-- Search Input -->
                        <div class="p-2 border-b sticky top-0 bg-white z-10">
                          <input
                            v-model="fromSearchQuery"
                            type="text"
                            placeholder="Search countries..."
                            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent"
                            @click.stop
                            @keydown.stop
                          />
                        </div>
                        <SelectItem 
                          v-for="country in filteredFromCountries" 
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
                                class="w-6 h-6 object-cover rounded-full border border-gray-200"
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

                  <!-- To Country Dropdown (Countries with Visa Products) -->
                  <div class="space-y-2">
                    <Select v-model="selectedTo">
                      <SelectTrigger 
                        class="!h-[48px] !bg-white !rounded-[10px] !border !border-gray-200 hover:!border-gray-300 transition-all"
                      >
                        <!-- Custom content instead of SelectValue -->
                        <div class="flex-1 text-left">
                          <div v-if="selectedTo" class="flex items-center gap-2 pl-4">
                            <!-- Logo with fallback -->
                            <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                              <img 
                                v-if="getCountryLogo(selectedTo)"
                                :src="getCountryLogo(selectedTo)" 
                                :alt="getCountryName(selectedTo)"
                                class="w-6 h-6 object-cover rounded-full border border-gray-200"
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
                            <span class="text-[15px] text-gray-700">{{ getCountryName(selectedTo) }}</span>
                          </div>
                          <span v-else class="text-gray-400 py-2 pl-4">Traveling to</span>
                        </div>
                        <svg class="w-3 h-2 mr-3" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </SelectTrigger>
                      <SelectContent class="!rounded-[10px] !bg-white max-h-[300px] overflow-y-auto">
                        <!-- Search Input -->
                        <div class="p-2 border-b sticky top-0 bg-white z-10">
                          <input
                            v-model="toSearchQuery"
                            type="text"
                            placeholder="Search countries..."
                            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent"
                            @click.stop
                            @keydown.stop
                          />
                        </div>
                        <SelectItem 
                          v-for="country in filteredToCountries" 
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
                                class="w-6 h-6 object-cover rounded-full border border-gray-200"
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
                  :disabled="!selectedFrom || !selectedTo || isLoading"
                  class="w-full h-[44px] sm:h-[50px] bg-[#08D07A] hover:bg-[#06B869] active:scale-98 text-white font-manrope font-semibold text-sm sm:text-base rounded-[8px] sm:rounded-[10px] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                 
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
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import { useCountriesApi, type Country } from '@/composables/useCountries'
import { useVisaProductsApi } from '@/composables/useVisaProducts'

// Props - optional country slug for pre-selection
interface Props {
  countrySlug?: string
}

const props = withDefaults(defineProps<Props>(), {
  countrySlug: ''
})

const route = useRoute()

// Get country slug from props or route
const getCountrySlug = () => {
  if (props.countrySlug) return props.countrySlug
  if (route.params.country) return route.params.country as string
  return ''
}

// Map route slugs to possible API country names
const getCountryNameFromSlug = (slug: string): string[] => {
  if (!slug) return []
  const slugLower = slug.toLowerCase()
  const mappings: Record<string, string[]> = {
    'uk': ['United Kingdom', 'UK', 'U.K.', 'United Kingdom (UK)'],
    'schengen': ['Schengen', 'Europe', 'Schengen Area', 'Schengen Zone'],
    'usa': ['United States', 'USA', 'U.S.A.', 'United States of America', 'US'],
    'us': ['United States', 'USA', 'U.S.A.', 'United States of America', 'US'],
    'turkey': ['Turkey', 'Türkiye', 'Turkiye'],
    'morocco': ['Morocco', 'Moroccan', 'Kingdom of Morocco']
  }
  return mappings[slugLower] || [slug]
}

// State
const countries = ref<Country[]>([])
const destinationCountries = ref<Country[]>([]) // Countries with visa products (with logos)
const selectedFrom = ref<string>('')
const selectedTo = ref<string>('')
const isLoading = ref(false)
const error = ref<string | null>(null)
const fromSearchQuery = ref('')
const toSearchQuery = ref('')

// API
const { getCountries } = useCountriesApi()
const { getGroupedVisaProductsByCountries } = useVisaProductsApi()
const config = useRuntimeConfig()

// Error handler for logo images
const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.error('❌ Logo failed to load:', img.src)
  img.style.display = 'none'
}

// Filtered countries for "From" dropdown - matches from start
const filteredFromCountries = computed(() => {
  if (!fromSearchQuery.value || !fromSearchQuery.value.trim()) {
    return countries.value
  }
  const query = fromSearchQuery.value.toLowerCase().trim()
  return countries.value.filter((country) =>
    country.countryName.toLowerCase().startsWith(query)
  )
})

// Filtered countries for "To" dropdown - matches from start
const filteredToCountries = computed(() => {
  if (!toSearchQuery.value || !toSearchQuery.value.trim()) {
    return destinationCountries.value
  }
  const query = toSearchQuery.value.toLowerCase().trim()
  return destinationCountries.value.filter((country) =>
    country.countryName.toLowerCase().startsWith(query)
  )
})

// Helper functions for "From" dropdown (Countries table)
const getCountryName = (countryId: string) => {
  const country = countries.value.find(c => String(c.id) === countryId)
  return country?.countryName || ''
}

const getCountryLogo = (countryId: string): string | undefined => {
  const country = countries.value.find(c => String(c.id) === countryId)
  if (!country?.logoUrl) {
    return undefined
  }
  // logoUrl is defined, but could still be null per the type definition
  // Filter out null explicitly
  const logoUrl = country.logoUrl
  if (logoUrl === null || logoUrl === '') {
    return undefined
  }
  // Now logoUrl is definitely a non-empty string
  return getFullLogoUrl(logoUrl)
}

const getFullLogoUrl = (logoUrl: string): string => {
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
  
  const fullUrl = `${baseUrl}${path}`
 
  
  return fullUrl
}

// Fetch countries for "From" dropdown
const fetchCountries = async () => {
  try {
    const response = await getCountries()
    
    if (response.success && response.data) {
      countries.value = response.data
      console.log('✅ Loaded countries:', countries.value.length)
      
      // Set default "From" value
      if (countries.value.length > 0 && countries.value[0]) {
        selectedFrom.value = String(countries.value[0].id)
      }
    } else {
      throw new Error(response.message || 'Failed to load countries')
    }
  } catch (err) {
    console.error('❌ Error fetching countries:', err)
    throw err
  }
}

// Fetch destination countries for "To" dropdown (from visa products, matched with countries table for logos)
const fetchDestinationCountries = async () => {
  try {
    const response = await getGroupedVisaProductsByCountries()
    
    if (response.success && response.data) {
      // Get country names from visa products
      const visaProductCountryNames = response.data.map(item => item.country)
      
      // Match with countries table to get logos
      destinationCountries.value = countries.value
        .filter(country => visaProductCountryNames.includes(country.countryName))
        .sort((a, b) => a.countryName.localeCompare(b.countryName))
      
      console.log('✅ Loaded destination countries with logos:', destinationCountries.value.length)
      console.log('📍 Available destinations:', destinationCountries.value.map(c => c.countryName))
      
      // Try to pre-select the country based on route parameter or prop
      const countrySlug = getCountrySlug()
      if (countrySlug) {
        const possibleNames = getCountryNameFromSlug(countrySlug)
        const matchedCountry = destinationCountries.value.find(country => 
          possibleNames.some(name => 
            country.countryName.toLowerCase() === name.toLowerCase() ||
            country.countryName.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(country.countryName.toLowerCase())
          )
        )
        
        if (matchedCountry) {
          selectedTo.value = String(matchedCountry.id)
          console.log('✅ Pre-selected destination country in ApplicationForm:', matchedCountry.countryName)
        } else if (destinationCountries.value.length > 0 && destinationCountries.value[0]) {
          // Fallback to first country if no match found
          selectedTo.value = String(destinationCountries.value[0].id)
        }
      } else if (destinationCountries.value.length > 0 && destinationCountries.value[0]) {
        // Set default "To" value if no country slug provided
        selectedTo.value = String(destinationCountries.value[0].id)
      }
    } else {
      throw new Error(response.message || 'Failed to load destination countries')
    }
  } catch (err) {
    console.error('❌ Error fetching destination countries:', err)
    throw err
  }
}

// Fetch all data on mount
const fetchAllData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // First fetch all countries (needed for both dropdowns)
    await fetchCountries()
    
    // Then fetch destination countries and match with countries table
    await fetchDestinationCountries()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data'
  } finally {
    isLoading.value = false
  }
}

// Handle apply button click
const handleApply = () => {
  const fromCountry = getCountryName(selectedFrom.value)
  const toCountry = getCountryName(selectedTo.value)
  
  console.log('🚀 Apply Now:', {
    from: fromCountry,
    fromId: selectedFrom.value,
    to: toCountry,
    toId: selectedTo.value
  })
  
  // Pass both country IDs and names as query parameters
  navigateTo(`/visa-application?fromId=${selectedFrom.value}&toId=${selectedTo.value}&from=${encodeURIComponent(fromCountry)}&to=${encodeURIComponent(toCountry)}`)
}

// Watch for selection changes to reset search queries
watch(() => selectedFrom.value, () => {
  fromSearchQuery.value = ''
})

watch(() => selectedTo.value, () => {
  toSearchQuery.value = ''
})

// Fetch data on component mount
onMounted(() => {
  fetchAllData()
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