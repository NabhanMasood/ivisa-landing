<template>
  <!-- Worldwide Destinations Section -->
  <section class="bg-white py-8 sm:py-12 lg:py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
        <h2
          class="text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] leading-[36px] sm:leading-[44px] md:leading-[48px] lg:leading-[50px] font-bold text-black tracking-[1px] mb-4 sm:mb-6"
          style="font-family: 'Manrope', sans-serif; font-weight: 700;"
        >
          Worldwide Destinations
        </h2>
        <p
          class="text-sm sm:text-base leading-[24px] sm:leading-[28px] lg:leading-[34px] text-[#0B3947] px-4"
          style="font-family: 'Manrope', sans-serif; font-weight: 500;"
        >
          Check out our customers' most frequented travel destinations
        </p>
      </div>

      <!-- Destination Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">

        <!-- Schengen Card -->
        <Card class="group relative overflow-hidden rounded-[12px] sm:rounded-[16px] border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div class="relative h-[300px] sm:h-[380px] lg:h-[450px] w-full rounded-[12px] sm:rounded-[16px] overflow-hidden">
            <img
              src="/svg/countries/Schengen.svg"
              alt="Schengen destination with autumn scenery"
              class="absolute inset-0 w-full h-full object-cover rounded-[16px]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[16px]"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white rounded-b-[12px] sm:rounded-b-[16px]">
              <h3 class="text-2xl sm:text-[28px] lg:text-[32px] leading-[28px] sm:leading-[36px] lg:leading-[40px] font-bold mb-2" style="font-family: 'Manrope', sans-serif; font-weight: 700;">
                Schengen
              </h3>
              <div class="flex items-center gap-2">
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd" />
                </svg>
                <span class="text-xs sm:text-[12px] lg:text-[13px] leading-[20px] sm:leading-[28px] lg:leading-[34px] font-normal text-white" style="font-family: 'Helvetica', sans-serif; font-weight: 400;">
                  +46,750 processed Visas
                </span>
              </div>
            </div>
          </div>
        </Card>

        <!-- United States Card -->
        <Card class="group relative overflow-hidden rounded-[12px] sm:rounded-[16px] border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div class="relative h-[300px] sm:h-[380px] lg:h-[450px] w-full rounded-[12px] sm:rounded-[16px] overflow-hidden">
            <img
              src="/svg/countries/lasVegas.svg"
              alt="United States destination"
              class="absolute inset-0 w-full h-full object-cover rounded-[16px]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[16px]"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white rounded-b-[12px] sm:rounded-b-[16px]">
              <h3 class="text-2xl sm:text-[28px] lg:text-[32px] leading-[28px] sm:leading-[36px] lg:leading-[40px] font-bold mb-2" style="font-family: 'Manrope', sans-serif; font-weight: 700;">
                United States
              </h3>
              <div class="flex items-center gap-2">
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd" />
                </svg>
                <span class="text-xs sm:text-[12px] lg:text-[13px] leading-[20px] sm:leading-[28px] lg:leading-[34px] font-normal text-white" style="font-family: 'Helvetica', sans-serif; font-weight: 400;">
                  +89,500 processed Visas
                </span>
              </div>
            </div>
          </div>
        </Card>

        <!-- England Card -->
        <Card class="group relative overflow-hidden rounded-[12px] sm:rounded-[16px] border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div class="relative h-[300px] sm:h-[380px] lg:h-[450px] w-full rounded-[12px] sm:rounded-[16px] overflow-hidden">
            <img
              src="/svg/countries/England.svg"
              alt="England destination"
              class="absolute inset-0 w-full h-full object-cover rounded-[16px]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[16px]"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white rounded-b-[12px] sm:rounded-b-[16px]">
              <h3 class="text-2xl sm:text-[28px] lg:text-[32px] leading-[28px] sm:leading-[36px] lg:leading-[40px] font-bold mb-2" style="font-family: 'Manrope', sans-serif; font-weight: 700;">
                England
              </h3>
              <div class="flex items-center gap-2">
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd" />
                </svg>
                <span class="text-xs sm:text-[12px] lg:text-[13px] leading-[20px] sm:leading-[28px] lg:leading-[34px] font-normal text-white" style="font-family: 'Helvetica', sans-serif; font-weight: 400;">
                  +42,000 processed Visas
                </span>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
</script>

<style scoped>
.group:hover img {
  transform: scale(1.1);
  transition: transform 0.6s ease;
}
</style>
