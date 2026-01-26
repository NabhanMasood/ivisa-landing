<template>
  <!-- Your Visa Our Priority Section -->
  <section
    class="relative w-full"
  >
      <!-- Banner Image Container -->
      <div class="overflow-hidden rounded-2xl sm:rounded-[30px]">
        <img
          :key="imageKey"
          :src="`/images/banners/visa-banner.png?v=${imageKey}`"
          alt="Visa Banner"
          class="w-full h-auto block"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <!-- Content Overlay -->
      <div class="absolute inset-0 w-full h-full">
        <div class="max-w-[1440px] mx-auto h-full">
          <!-- Content - positioned in colored banner area, vertically balanced -->
          <div class="w-full h-full px-3 sm:px-6 lg:pl-[60px] flex flex-col justify-end pb-[2%] sm:pb-[3%] md:pb-[4%] lg:pb-[4%]">

            <!-- Left content wrapper - keeps text and form on left side of banner -->
            <div class="w-[65%] sm:w-[55%] md:w-[50%] lg:w-[45%]">
              <!-- Heading and Subtext (on banner) -->
              <div class="text-white mb-1 sm:mb-2 lg:mb-4">
                <h1 class="inline-block px-2 py-0.5 sm:px-3 sm:py-1 font-manrope font-extrabold text-[10px] sm:text-sm md:text-lg lg:text-[26px] leading-tight sm:leading-snug md:leading-[24px] lg:leading-[32px] mb-0.5 sm:mb-1 lg:mb-1.5 uppercase">
                  Your Visa. Our Priority
                </h1>
                <p class="font-manrope font-medium text-[7px] sm:text-[10px] md:text-xs lg:text-sm leading-tight sm:leading-normal">
                  Thailand ETA, Morocco eVisa, or Egypt Standard Visa - we're here to make your travel dreams stress-free.
                </p>
              </div>

              <!-- Application Form Card -->
              <div class="w-full max-w-[480px] rounded-lg sm:rounded-xl lg:rounded-2xl p-2.5 sm:p-3 md:p-3.5 lg:p-4 bg-[#F1F9FC] shadow-lg relative z-50">
              <h2 class="font-manrope font-bold text-sm sm:text-base lg:text-lg leading-tight sm:leading-[22px] lg:leading-[24px] text-[#1a1a1a] mb-2 sm:mb-2.5 lg:mb-3">
                Start your application
              </h2>

              <!-- Loading State -->
              <div v-if="isLoading" class="flex items-center justify-center py-3 sm:py-6">
                <div class="text-gray-600 text-xs sm:text-sm">Loading countries...</div>
              </div>

              <!-- Error State -->
              <div v-else-if="error" class="flex items-center justify-center py-3 sm:py-6">
                <div class="text-red-600 text-xs sm:text-sm">{{ error }}</div>
              </div>

              <!-- Form Content -->
              <div v-else>
                <!-- Country Selectors Row -->
                <div class="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3">
                  <!-- From Country Dropdown (All Countries) -->
                  <div>
                    <SearchableSelect
                      v-model="selectedFrom"
                      :countries="countries"
                      :api-base="config.public.apiBase"
                      value-key="id"
                      placeholder="Your country"
                      trigger-class="h-[32px] sm:h-[36px] md:h-[40px] lg:h-[42px]"
                    />
                  </div>

                  <!-- To Country Dropdown (Countries with Visa Products) - Locked when countrySlug is provided -->
                  <div>
                    <SearchableSelect
                      v-model="selectedTo"
                      :countries="countries"
                      :api-base="config.public.apiBase"
                      value-key="id"
                      placeholder="Traveling to"
                      :disabled="!!props.countrySlug && !isDestinationChangeable"
                      :priority-countries="['United Kingdom', 'Kenya', 'United States', 'India', 'Thailand', 'Morocco', 'Turkey', 'Egypt', 'Vietnam']"
                      trigger-class="h-[32px] sm:h-[36px] md:h-[40px] lg:h-[42px]"
                    />
                  </div>
                </div>

                <!-- Apply Now Button -->
                <button
                  @click="handleApply"
                  :disabled="!selectedFrom || !selectedTo || isLoading"
                  class="w-full h-[32px] sm:h-[36px] md:h-[40px] lg:h-[44px] bg-[#08D07A] hover:bg-[#06B869] active:scale-98 text-white font-manrope font-semibold text-xs sm:text-sm rounded-md sm:rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
import SearchableSelect from '@/components/ui/SearchableSelect.vue'
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
    'uk': ['United Kingdom'],  // Exact match only to avoid matching "Ukraine"
    'schengen': ['Germany'],   // Schengen defaults to Germany but user can change
    'usa': ['United States', 'United States of America'],
    'us': ['United States', 'United States of America'],
    'turkey': ['Turkey', 'Türkiye', 'Turkiye'],
    'morocco': ['Morocco']
  }
  return mappings[slugLower] || [slug]
}

// Check if destination should be changeable (Schengen covers multiple countries)
const isDestinationChangeable = computed(() => {
  const slug = getCountrySlug()
  return slug?.toLowerCase() === 'schengen'
})

// State
const countries = ref<Country[]>([])
const destinationCountries = ref<Country[]>([]) // Countries with visa products (with logos)
const selectedFrom = ref<string>('')
const selectedTo = ref<string>('')
const isLoading = ref(false)
const error = ref<string | null>(null)
const fromSearchQuery = ref('')
const toSearchQuery = ref('')
const imageKey = ref(Date.now()) // Force image reload on navigation

// Refs for search inputs (auto-focus when dropdown opens)
const fromSearchInput = ref<HTMLInputElement | null>(null)
const toSearchInput = ref<HTMLInputElement | null>(null)

// Focus functions for search inputs
const focusFromSearch = () => {
  setTimeout(() => {
    fromSearchInput.value?.focus()
  }, 50)
}

const focusToSearch = () => {
  setTimeout(() => {
    toSearchInput.value?.focus()
  }, 50)
}

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

const filteredFromCountries = computed(() => {
  if (!fromSearchQuery.value || !fromSearchQuery.value.trim()) {
    return countries.value
  }
  const query = fromSearchQuery.value.toLowerCase().trim()
  return countries.value.filter((country) =>
    country.countryName.toLowerCase().startsWith(query)
  )
})

const filteredToCountries = computed(() => {
  if (!toSearchQuery.value || !toSearchQuery.value.trim()) {
    return countries.value
  }
  const query = toSearchQuery.value.toLowerCase().trim()
  return countries.value.filter((country) =>
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
        // Use exact matching to avoid partial matches (e.g., "UK" matching "Ukraine")
        const matchedCountry = countries.value.find(country =>
          possibleNames.some(name =>
            country.countryName.toLowerCase() === name.toLowerCase()
          )
        )

        if (matchedCountry) {
          selectedTo.value = String(matchedCountry.id)
          console.log('✅ Pre-selected destination country in ApplicationForm:', matchedCountry.countryName)
        }
        // Don't auto-select if no match found - let user choose
      }
      // Don't auto-select a destination - let user choose (shows "Traveling to" placeholder)
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
  imageKey.value = Date.now() // Force image reload on navigation
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