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
              <div v-if="isLoading" class="flex items-center justify-center py-8">
                <div class="text-gray-600">Loading countries...</div>
              </div>

              <!-- Error State -->
              <div v-else-if="error" class="flex items-center justify-center py-8">
                <div class="text-red-600">{{ error }}</div>
              </div>

              <!-- Form Content -->
              <div v-else>
                <!-- Country Selectors Row -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <!-- From Country Dropdown -->
                  <div class="space-y-2">
                    <Select v-model="fromCountryId">
                      <SelectTrigger 
                        class="!h-[48px] !bg-white !rounded-[10px] !border !border-gray-200 hover:!border-gray-300 transition-all"
                      >
                        <SelectValue placeholder="Select country">
                          <span v-if="fromCountryId" class="text-[15px] text-gray-700 pl-4">{{ getCountryName(fromCountryId) }}</span>
                        </SelectValue>
                        <svg class="w-3 h-2 mr-3" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </SelectTrigger>
                      <SelectContent class="!rounded-[10px] !bg-white max-h-[300px] overflow-y-auto">
                        <SelectItem 
                          v-for="country in countries" 
                          :key="country.id" 
                          :value="String(country.id)"
                          class="pl-4"
                        >
                          <span>{{ country.countryName }}</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <!-- To Country Dropdown -->
                  <div class="space-y-2">
                    <Select v-model="toCountryId">
                      <SelectTrigger 
                        class="!h-[48px] !bg-white !rounded-[10px] !border !border-gray-200 hover:!border-gray-300 transition-all"
                      >
                        <SelectValue placeholder="Select country">
                          <span v-if="toCountryId" class="text-[15px] text-gray-700 pl-4">{{ getCountryName(toCountryId) }}</span>
                        </SelectValue>
                        <svg class="w-3 h-2 mr-3" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </SelectTrigger>
                      <SelectContent class="!rounded-[10px] !bg-white max-h-[300px] overflow-y-auto">
                        <SelectItem 
                          v-for="country in countries" 
                          :key="country.id" 
                          :value="String(country.id)"
                          class="pl-4"
                        >
                          <span>{{ country.countryName }}</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <!-- Apply Now Button -->
                <button
                  @click="handleApply"
                  :disabled="!fromCountryId || !toCountryId || isLoading"
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
import { useCountriesApi, type Country } from '@/composables/useCountries'

// State
const countries = ref<Country[]>([])
const fromCountryId = ref<string>('')
const toCountryId = ref<string>('')
const isLoading = ref(false)
const error = ref<string | null>(null)

// API
const { getCountries } = useCountriesApi()

const getCountryName = (countryId: string) => {
  const country = countries.value.find(c => String(c.id) === countryId)
  return country?.countryName || ''
}

const fetchCountries = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await getCountries()
    
    if (response.success && response.data) {
      countries.value = response.data
      
      // Set default values to the first two countries if available
      if (countries.value.length >= 2) {
        fromCountryId.value = String(countries.value[0].id)
        toCountryId.value = String(countries.value[1].id)
      } else if (countries.value.length === 1) {
        fromCountryId.value = String(countries.value[0].id)
      }
    } else {
      error.value = response.message || 'Failed to load countries'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load countries'
    console.error('Error fetching countries:', err)
  } finally {
    isLoading.value = false
  }
}

// Handle apply button click
const handleApply = () => {
  const fromCountry = getCountryName(fromCountryId.value)
  const toCountry = getCountryName(toCountryId.value)
  
  console.log('From:', fromCountry, '(ID:', fromCountryId.value, ')')
  console.log('To:', toCountry, '(ID:', toCountryId.value, ')')
  
  // Pass both country IDs and names as query parameters
  navigateTo(`/visa-application?fromId=${fromCountryId.value}&toId=${toCountryId.value}&nationality=${encodeURIComponent(fromCountry)}&destination=${encodeURIComponent(toCountry)}`)
}

// Fetch countries on component mount
onMounted(() => {
  fetchCountries()
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