<template>
  <!-- Application Process Section -->
  <section class="bg-[#F5F7FA] py-12 sm:py-16 lg:py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Heading Section -->
      <div class="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[32px] sm:leading-[40px] md:leading-[48px] lg:leading-[50px] font-bold text-[#0B3947] mb-3 sm:mb-4"
          style="font-family: 'Manrope', sans-serif; font-weight: 700;"
        >
          Our application process
        </h2>
        <p
          class="text-sm sm:text-base md:text-lg leading-[20px] sm:leading-[24px] md:leading-[28px] text-[#0B3947] max-w-2xl mx-auto"
          style="font-family: 'Manrope', sans-serif; font-weight: 400;"
        >
          Complete your application quickly and effortlessly.
        </p>
      </div>

      <!-- Process Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        <!-- Card 1: Travel information -->
        <Card
          class="!rounded-[16px] sm:!rounded-[20px] !bg-white !border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8"
        >
          <div class="flex flex-col items-center text-center space-y-4">
            <!-- Icon Circle -->
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#00C6A7] to-[#26D07A] flex items-center justify-center flex-shrink-0"
            >
              <span
                class="text-white text-xl sm:text-2xl font-bold"
                style="font-family: 'Manrope', sans-serif;"
              >
                1
              </span>
            </div>
            <!-- Title -->
            <h3
              class="text-lg sm:text-xl md:text-[22px] leading-[24px] sm:leading-[28px] font-bold text-[#0B3947]"
              style="font-family: 'Manrope', sans-serif;"
            >
              Travel information
            </h3>
            <!-- Description -->
            <p
              class="text-sm sm:text-base leading-[20px] sm:leading-[24px] text-[#0B3947]"
              style="font-family: 'Manrope', sans-serif; font-weight: 400;"
            >
              Enter travel dates, purpose, and destination.
            </p>
          </div>
        </Card>

        <!-- Card 2: Payment process -->
        <Card
          class="!rounded-[16px] sm:!rounded-[20px] !bg-white !border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8"
        >
          <div class="flex flex-col items-center text-center space-y-4">
            <!-- Icon Circle -->
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#00C6A7] to-[#26D07A] flex items-center justify-center flex-shrink-0"
            >
              <span
                class="text-white text-xl sm:text-2xl font-bold"
                style="font-family: 'Manrope', sans-serif;"
              >
                2
              </span>
            </div>
            <!-- Title -->
            <h3
              class="text-lg sm:text-xl md:text-[22px] leading-[24px] sm:leading-[28px] font-bold text-[#0B3947]"
              style="font-family: 'Manrope', sans-serif;"
            >
              Payment process
            </h3>
            <!-- Description -->
            <p
              class="text-sm sm:text-base leading-[20px] sm:leading-[24px] text-[#0B3947]"
              style="font-family: 'Manrope', sans-serif; font-weight: 400;"
            >
              Pay the visa fee and government fee through our secure system.
            </p>
          </div>
        </Card>

        <!-- Card 3: Your details -->
        <Card
          class="!rounded-[16px] sm:!rounded-[20px] !bg-white !border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8"
        >
          <div class="flex flex-col items-center text-center space-y-4">
            <!-- Icon Circle -->
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#00C6A7] to-[#26D07A] flex items-center justify-center flex-shrink-0"
            >
              <span
                class="text-white text-xl sm:text-2xl font-bold"
                style="font-family: 'Manrope', sans-serif;"
              >
                3
              </span>
            </div>
            <!-- Title -->
            <h3
              class="text-lg sm:text-xl md:text-[22px] leading-[24px] sm:leading-[28px] font-bold text-[#0B3947]"
              style="font-family: 'Manrope', sans-serif;"
            >
              Your details
            </h3>
            <!-- Description -->
            <p
              class="text-sm sm:text-base leading-[20px] sm:leading-[24px] text-[#0B3947]"
              style="font-family: 'Manrope', sans-serif; font-weight: 400;"
            >
              Upload your documents and fill visa application form.
            </p>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
</script>

