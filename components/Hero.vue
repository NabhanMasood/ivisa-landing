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
      <div class="relative z-20 container mx-auto max-w-6xl px-6 lg:px-8 text-center py-20">
        <!-- Hero Text -->
        <div class="mb-12">
          <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Your Visa. Our Priority.
          </h1>
          <p class="text-xl lg:text-2xl text-white/95 drop-shadow-lg">
            Let us handle your visa any country, anywhere in the world.
          </p>
        </div>

        <!-- Search Card with enhanced transparency -->
        <Card 
          class="!rounded-[24px] shadow-2xl mx-auto backdrop-blur-md" 
          style="width: 1008px; height: 204.5px; background: rgba(255, 255, 255, 0.35); border: 1px solid rgba(255, 255, 255, 0.25);"
        >
          <CardContent class="p-6 lg:p-8 flex items-center h-full">
            <!-- Loading State -->
            <div v-if="isLoadingWorld || isLoadingVisa" class="flex items-center justify-center w-full">
              <div class="text-gray-600">Loading countries...</div>
            </div>

            <!-- Error State -->
            <div v-else-if="errorWorld || errorVisa" class="flex items-center justify-center w-full">
              <div class="text-red-600">{{ errorWorld || errorVisa }}</div>
            </div>

            <!-- Main Form -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end w-full">
              <!-- From Select (World Countries) -->
              <div class="space-y-2 text-left">
                <Label htmlFor="from" class="text-gray-700 font-medium text-base">
                  Where am I from?
                </Label>
                <Select v-model="selectedFrom">
                  <SelectTrigger 
                    id="from" 
                    class="!h-[45px] !bg-white/90 !rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all"
                    style="width: 299.33px;"
                  >
                    <SelectValue>
                      <div class="flex items-center gap-3 py-3 pl-2" v-if="selectedFrom">
                        <img 
                          :src="getWorldCountryFlag(selectedFrom)" 
                          :alt="getWorldCountryName(selectedFrom)"
                          class="w-5 h-4 object-cover rounded-sm"
                          @error="handleFlagError"
                        />
                        <span class="text-base">{{ getWorldCountryName(selectedFrom) }}</span>
                      </div>
                      <span v-else class="text-gray-500 py-3 pl-2">Select your country</span>
                    </SelectValue>
                    <img src="/svg/arrow-down.svg" alt="" class="w-3 h-3 mr-3" />
                  </SelectTrigger>
                  <SelectContent class="!rounded-[20px] !bg-white max-h-[300px] overflow-y-auto">
                    <SelectItem 
                      v-for="country in worldCountries" 
                      :key="country.id" 
                      :value="country.id"
                    >
                      <div class="flex items-center gap-3">
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

              <!-- To Select (Visa Service Countries) -->
              <div class="space-y-2 text-left">
                <Label htmlFor="to" class="text-gray-700 font-medium text-base">
                  Where am I going?
                </Label>
                <Select v-model="selectedTo">
                  <SelectTrigger 
                    id="to" 
                    class="!h-[45px] !bg-white/90 !rounded-[20px] !border !border-gray-200 hover:!border-gray-300 transition-all"
                    style="width: 299.33px;"
                  >
                    <SelectValue>
                      <div class="flex items-center gap-3 py-3 pl-2" v-if="selectedTo">
                        <!-- Logo with fallback -->
                        <div class="w-8 h-8 flex items-center justify-center flex-shrink-0">
                          <img 
                            v-if="getVisaCountryLogo(selectedTo)"
                            :src="getVisaCountryLogo(selectedTo)" 
                            :alt="getVisaCountryName(selectedTo)"
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
                        <span class="text-base">{{ getVisaCountryName(selectedTo) }}</span>
                      </div>
                      <span v-else class="text-gray-500 py-3 pl-2">Select destination</span>
                    </SelectValue>
                    <img src="/svg/arrow-down.svg" alt="" class="w-3 h-3 mr-3" />
                  </SelectTrigger>
                  <SelectContent class="!rounded-[20px] !bg-white max-h-[300px] overflow-y-auto">
                    <SelectItem 
                      v-for="country in visaCountries" 
                      :key="country.id" 
                      :value="String(country.id)"
                    >
                      <div class="flex items-center gap-3">
                        <!-- Logo with fallback -->
                        <div class="w-8 h-8 flex items-center justify-center flex-shrink-0">
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
                class="!bg-gradient-to-r !from-[#00C6A7] !to-[#26D07A] hover:!from-[#00B599] hover:!to-[#22BD6D] !text-white !h-[52px] !rounded-[20px] w-full !font-semibold !text-lg shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                :disabled="!selectedFrom || !selectedTo || isLoadingWorld || isLoadingVisa"
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
    <section class="bg-white py-12 lg:py-16 border-t border-gray-100">
      <div class="container mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <!-- Happy Customers -->
          <div class="text-center">
            <div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              180K
            </div>
            <div class="text-[13px] leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Happy Customers
            </div>
          </div>

          <!-- 24/7 Support -->
          <div class="text-center">
            <div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              24/7
            </div>
            <div class="text-[13px] leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Support
            </div>
          </div>

        <!-- Trustpilot -->
        <div class="text-center col-span-2 lg:col-span-1 flex items-center justify-center">
          <div>
            <img 
              src="/logos/trust-pilot.png"
              alt="Trustpilot"
              class="w-[104px] h-[30px] object-contain translate-y-2"
            />
          </div>
        </div>

          <!-- Years of Experience -->
          <div class="text-center">
            <div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              11
            </div>
            <div class="text-[13px] leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Years of Experience
            </div>
          </div>

          <!-- Visa Approval Rate -->
          <div class="text-center">
            <div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              98%
            </div>
            <div class="text-[13px] leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Visa Approval Rate
            </div>
          </div>
        </div>
      </div>
      
      <!-- Sleek Divider Line -->
      <div class="container mx-auto max-w-7xl px-6 lg:px-8 mt-8 lg:mt-10">
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
import { useCountriesApi, type Country, type SimpleWorldCountry } from '@/composables/useCountries'

// State for world countries (all countries)
const worldCountries = ref<SimpleWorldCountry[]>([])
const selectedFrom = ref<string>('')
const isLoadingWorld = ref(false)
const errorWorld = ref<string | null>(null)

// State for visa service countries (backend)
const visaCountries = ref<Country[]>([])
const selectedTo = ref<string>('')
const isLoadingVisa = ref(false)
const errorVisa = ref<string | null>(null)

// API
const { getWorldCountries, getVisaCountries } = useCountriesApi()
const config = useRuntimeConfig()

// Debug: Log config on load
console.log('🔧 Runtime Config:', config.public)
console.log('🌐 API Base URL:', config.public.apiBase)

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
  
  // Debug info
  const countryId = selectedTo.value
  const country = visaCountries.value.find(c => String(c.id) === countryId)
  if (country) {
    console.log('🏳️ Country:', country.countryName)
    console.log('📁 Logo URL (from DB):', country.logoUrl)
    console.log('🔗 Constructed full URL:', getFullLogoUrl(country.logoUrl || ''))
  }
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
    console.log('✅ Full URL (Cloudinary):', logoUrl)
    return logoUrl
  }
  
  // Otherwise, construct local URL
  // Remove trailing slash from apiBase and ensure logoUrl starts with /
  const baseUrl = (config.public.apiBase || 'http://localhost:5001').replace(/\/+$/, '')
  const path = logoUrl.startsWith('/') ? logoUrl : `/${logoUrl}`
  
  const fullUrl = `${baseUrl}${path}`
  console.log('🔗 Constructed URL:', {
    baseUrl,
    logoPath: path,
    fullUrl
  })
  
  return fullUrl
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
      
      // Debug each country
      visaCountries.value.forEach(c => {
        console.log(`📍 ${c.countryName}:`, {
          id: c.id,
          logoUrl: c.logoUrl,
          fullUrl: c.logoUrl ? getFullLogoUrl(c.logoUrl) : 'No logo'
        })
      })
      
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

const handleGetStarted = () => {
  const fromCountry = getWorldCountryName(selectedFrom.value)
  const toCountry = getVisaCountryName(selectedTo.value)
  
  console.log('🚀 Get Started:', {
    from: fromCountry,
    fromCode: selectedFrom.value,
    to: toCountry,
    toId: selectedTo.value
  })
  
  navigateTo(`/visa-application?fromCode=${selectedFrom.value}&toId=${selectedTo.value}&from=${encodeURIComponent(fromCountry)}&to=${encodeURIComponent(toCountry)}`)
}

// Fetch both types of countries on component mount
onMounted(() => {
  fetchWorldCountries()
  fetchVisaCountries()
})
</script>