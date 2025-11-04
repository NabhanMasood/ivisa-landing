<template>
  <!-- Your Visa Our Priority Section -->
  <section 
    class="relative overflow-hidden w-full min-h-[553px]"
    style="background: linear-gradient(90deg, #31B560 0%, #0582A2 33.14%, #2567BE 51.18%, #5051DA 69.41%, #2C229B 100%);"
  >
    <div class="w-full h-full relative">
      <!-- Logo in top right corner -->
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

              <!-- Country Selectors Row -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <!-- From Country Dropdown -->
                <div class="relative">
                  <select 
                    v-model="fromCountry"
                    class="w-full h-[48px] px-4 py-2 pr-8 bg-white border border-gray-200 rounded-[10px] text-gray-700 text-[15px] font-manrope appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  >
                    <option value="United States">🇺🇸 United States</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="France">🇫🇷 France</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Japan">🇯🇵 Japan</option>
                    <option value="India">🇮🇳 India</option>
                    <option value="Pakistan">🇵🇰 Pakistan</option>
                    <option value="China">🇨🇳 China</option>
                  </select>
                  <!-- Custom Dropdown Arrow -->
                  <svg class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

                <!-- To Country Dropdown -->
                <div class="relative">
                  <select 
                    v-model="toCountry"
                    class="w-full h-[48px] px-4 py-2 pr-8 bg-white border border-gray-200 rounded-[10px] text-gray-700 text-[15px] font-manrope appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  >
                    <option value="Turkey">🇹🇷 Turkey</option>
                    <option value="Thailand">🇹🇭 Thailand</option>
                    <option value="Morocco">🇲🇦 Morocco</option>
                    <option value="Egypt">🇪🇬 Egypt</option>
                    <option value="United Arab Emirates">🇦🇪 UAE</option>
                    <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                    <option value="Indonesia">🇮🇩 Indonesia</option>
                    <option value="Malaysia">🇲🇾 Malaysia</option>
                    <option value="Singapore">🇸🇬 Singapore</option>
                    <option value="Vietnam">🇻🇳 Vietnam</option>
                  </select>
                  <!-- Custom Dropdown Arrow -->
                  <svg class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>

              <!-- Apply Now Button -->
              <button
                @click="handleApply"
                class="w-full h-[50px] bg-[#08D07A] hover:bg-[#06B869] active:scale-98 text-white font-manrope font-semibold text-base rounded-[10px] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <span class="text-lg">→</span>
                <span>Apply Now!</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Initialize router
const router = useRouter()

// Default selected countries
const fromCountry = ref('United States')
const toCountry = ref('Turkey')

// Handle apply button click
const handleApply = () => {
  // Navigate to application with selected countries
  router.push({
    path: '/apply',
    query: {
      from: fromCountry.value,
      to: toCountry.value
    }
  })
}
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