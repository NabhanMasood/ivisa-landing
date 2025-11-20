<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[calc(100vh-80px)] flex items-center justify-center w-full overflow-hidden">
      <!-- Background Image - Full width -->
      <div class="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg" 
          alt=""
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <!-- Very light overlay for better text readability -->
        <div class="absolute inset-0 bg-black/5"></div>
      </div>

      <!-- Content Container - Centered both vertically and horizontally -->
      <div class="relative z-20 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-16 lg:py-20">
        <!-- Hero Text -->
        <div class="mb-8 sm:mb-12">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">
            Your Visa. Our Priority.
          </h1>
          <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 drop-shadow-lg px-2">
            Let us handle your visa any country, anywhere in the world.
          </p>
        </div>

        <!-- Search Card with enhanced transparency -->
        <Card 
          class="!rounded-[16px] sm:!rounded-[24px] shadow-2xl mx-auto backdrop-blur-md w-full max-w-[1008px]" 
          style="min-height: 204.5px; background: rgba(255, 255, 255, 0.35); border: 1px solid rgba(255, 255, 255, 0.25);"
        >
          <CardContent class="p-4 sm:p-6 lg:p-8 flex items-center min-h-[204.5px]">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex items-center justify-center w-full">
              <div class="text-gray-600">Loading countries...</div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="flex items-center justify-center w-full">
              <div class="text-red-600">{{ error }}</div>
            </div>

            <!-- Main Form -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end w-full">
              <!-- From Select (All Countries) -->
              <div class="space-y-2 text-left">
                <Label htmlFor="from" class="text-gray-700 font-medium text-sm sm:text-base">
                  Where am I from?
                </Label>
                <Select v-model="selectedFrom">
                  <SelectTrigger 
                    id="from" 
                    class="!h-[45px] !bg-white/90 !rounded-[16px] sm:!rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all w-full"
                  >
                    <SelectValue>
                      <div class="flex items-center gap-3 py-3 pl-2" v-if="selectedFrom">
                        <!-- Logo with fallback -->
                        <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                          <img 
                            v-if="getCountryLogo(selectedFrom)"
                            :src="getCountryLogo(selectedFrom)" 
                            :alt="getCountryName(selectedFrom)"
                            class="max-w-full max-h-full object-contain"
                            @error="handleLogoError"
                          />
                          <div 
                            v-else
                            class="w-8 h-8 rounded border border-gray-200 bg-gray-100 flex items-center justify-center"
                          >
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                            </svg>
                          </div>
                        </div>
                        <span class="text-base">{{ getCountryName(selectedFrom) }}</span>
                      </div>
                      <span v-else class="text-gray-500 py-3 pl-2">Select your country</span>
                    </SelectValue>
                    <img src="/svg/arrow-down.svg" alt="" class="w-3 h-3 mr-3" />
                  </SelectTrigger>
                  <SelectContent class="!rounded-[20px] !bg-white max-h-[300px] overflow-y-auto">
                    <SelectItem 
                      v-for="country in countries" 
                      :key="country.id" 
                      :value="String(country.id)"
                    >
                      <div class="flex items-center gap-3">
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
                            class="w-8 h-8 rounded border border-gray-200 bg-gray-100 flex items-center justify-center"
                          >
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              <!-- To Select (Countries with Visa Products) -->
              <div class="space-y-2 text-left">
                <Label htmlFor="to" class="text-gray-700 font-medium text-sm sm:text-base">
                  Where am I going?
                </Label>
                <Select v-model="selectedTo">
                  <SelectTrigger 
                    id="to" 
                    class="!h-[45px] !bg-white/90 !rounded-[16px] sm:!rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all w-full"
                  >
                    <SelectValue>
                      <div class="flex items-center gap-3 py-3 pl-2" v-if="selectedTo">
                        <!-- Logo with fallback -->
                        <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                          <img 
                            v-if="getCountryLogo(selectedTo)"
                            :src="getCountryLogo(selectedTo)" 
                            :alt="getCountryName(selectedTo)"
                            class="max-w-full max-h-full object-contain"
                            @error="handleLogoError"
                          />
                          <div 
                            v-else
                            class="w-8 h-8 rounded border border-gray-200 bg-gray-100 flex items-center justify-center"
                          >
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                            </svg>
                          </div>
                        </div>
                        <span class="text-base">{{ getCountryName(selectedTo) }}</span>
                      </div>
                      <span v-else class="text-gray-500 py-3 pl-2">Select destination</span>
                    </SelectValue>
                    <img src="/svg/arrow-down.svg" alt="" class="w-3 h-3 mr-3" />
                  </SelectTrigger>
                  <SelectContent class="!rounded-[20px] !bg-white max-h-[300px] overflow-y-auto">
                    <SelectItem 
                      v-for="country in destinationCountries" 
                      :key="country.id" 
                      :value="String(country.id)"
                    >
                      <div class="flex items-center gap-3">
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
                            class="w-8 h-8 rounded border border-gray-200 bg-gray-100 flex items-center justify-center"
                          >
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              <!-- Get Started Button -->
              <Button 
                size="lg"
                class="!bg-gradient-to-r !from-[#00C6A7] !to-[#26D07A] hover:!from-[#00B599] hover:!to-[#22BD6D] !text-white !h-[48px] sm:!h-[52px] !rounded-[16px] sm:!rounded-[20px] w-full !font-semibold !text-base sm:!text-lg shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                :disabled="!selectedFrom || !selectedTo || isLoading"
                @click="handleGetStarted"
              >
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-white py-8 sm:py-12 lg:py-16 border-t border-gray-100">
      <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-12 items-start">
          <!-- Happy Customers -->
          <div class="text-center">
            <div class="text-2xl sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              180K
            </div>
            <div class="text-xs sm:text-[12px] lg:text-[13px] leading-[20px] sm:leading-[28px] lg:leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Happy Customers
            </div>
          </div>

          <!-- 24/7 Support -->
          <div class="text-center">
            <div class="text-2xl sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              24/7
            </div>
            <div class="text-xs sm:text-[12px] lg:text-[13px] leading-[20px] sm:leading-[28px] lg:leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Support
            </div>
          </div>

        <!-- Trustpilot -->
        <div class="text-center col-span-2 lg:col-span-1 flex items-center justify-center">
          <div>
            <img 
              src="/logos/trust-pilot.png"
              alt="Trustpilot"
              class="w-[80px] sm:w-[104px] h-[24px] sm:h-[30px] object-contain translate-y-2"
            />
          </div>
        </div>

          <!-- Years of Experience -->
          <div class="text-center">
            <div class="text-2xl sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              11
            </div>
            <div class="text-xs sm:text-[12px] lg:text-[13px] leading-[20px] sm:leading-[28px] lg:leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Years of Experience
            </div>
          </div>

          <!-- Visa Approval Rate -->
          <div class="text-center">
            <div class="text-2xl sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              98%
            </div>
            <div class="text-xs sm:text-[12px] lg:text-[13px] leading-[20px] sm:leading-[28px] lg:leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Visa Approval Rate
            </div>
          </div>
        </div>
      </div>
      
      <!-- Sleek Divider Line -->
      <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10">
        <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import Label from '@/components/ui/label/Label.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import { useCountriesApi, type Country } from '@/composables/useCountries'
import { useVisaProductsApi } from '@/composables/useVisaProducts'

// State
const countries = ref<Country[]>([])
const destinationCountries = ref<Country[]>([]) // Countries with visa products (with logos)
const selectedFrom = ref<string>('')
const selectedTo = ref<string>('')
const isLoading = ref(false)
const error = ref<string | null>(null)

// API
const { getCountries } = useCountriesApi()
const { getGroupedVisaProductsByCountries } = useVisaProductsApi()
const config = useRuntimeConfig()

// Debug: Log config on load
console.log('🔧 Runtime Config:', config.public)
console.log('🌐 API Base URL:', config.public.apiBase)

// Error handler for logo images
const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.error('❌ Logo failed to load:', img.src)
  img.style.display = 'none'
}

// Helper functions for "From" dropdown (Countries table)
const getCountryName = (countryId: string) => {
  const country = countries.value.find(c => String(c.id) === countryId)
  return country?.countryName || ''
}

const getCountryLogo = (countryId: string) => {
  const country = countries.value.find(c => String(c.id) === countryId)
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
    console.log('✅ Full URL (Cloudinary):', logoUrl)
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
      if (countries.value.length > 0) {
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
      
      // Set default "To" value
      if (destinationCountries.value.length > 0) {
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

const handleGetStarted = () => {
  const fromCountry = getCountryName(selectedFrom.value)
  const toCountry = getCountryName(selectedTo.value)
  
  console.log('🚀 Get Started:', {
    from: fromCountry,
    fromId: selectedFrom.value,
    to: toCountry,
    toId: selectedTo.value
  })
  
  // Pass both country IDs and names as query parameters
  navigateTo(`/visa-application?fromId=${selectedFrom.value}&toId=${selectedTo.value}&from=${encodeURIComponent(fromCountry)}&to=${encodeURIComponent(toCountry)}`)
}

// Fetch data on component mount
onMounted(() => {
  fetchAllData()
})
</script>