<template>
  <!-- Why Choose Us Section -->
  <section class="bg-white py-8 lg:py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
        <!-- Left Content -->
        <div class="space-y-6 sm:space-y-8">
          <!-- Heading -->
          <div class="space-y-4 sm:space-y-6">
            <h2
              class="text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] leading-[36px] sm:leading-[44px] md:leading-[48px] lg:leading-[50px] font-bold text-black tracking-[1px]"
              style="font-family: 'Manrope', sans-serif; font-weight: 700;"
            >
              Why choose us?
            </h2>
            <p
              class="text-sm sm:text-base leading-[24px] sm:leading-[28px] lg:leading-[34px] text-[#0B3947]"
              style="font-family: 'Manrope', sans-serif; font-weight: 500;"
            >
              Our Journey, Simplified. No more visa confusion. No more endless paperwork. Whether it's a Thailand ETA, Morocco eVisa, Turkish Visa, or Egypt Standard Visa — we're here to make your travel dreams stress-free.
            </p>
          </div>

          <!-- CTA Button -->
          <div>
            <Button
              size="lg"
              class="!bg-[#08D07A] hover:!bg-[#06B869] !text-white !h-[48px] sm:!h-[50.8px] !rounded-[10px] !px-6 sm:!px-8 !font-semibold !text-sm sm:!text-base shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
              style="font-family: 'Manrope', sans-serif;"
              @click="handleApplyNow"
            >
              Apply Now
              <svg
                class="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </div>
        </div>

        <!-- Right Image -->
        <div class="relative">
          <Card class="!rounded-[16px] sm:!rounded-[24px] overflow-hidden shadow-2xl border-0">
            <img
              src="/png/choose-us.png"
              alt="Traveler exploring historic architecture"
              class="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            />
          </Card>
        </div>
      </div> <!-- ✅ closes the grid -->
    </div> <!-- ✅ closes the container -->

   <!-- Feature Cards (2 per row, centered, with increased width) -->
<div class="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 lg:mt-16 px-4 sm:px-6 lg:px-8">
  <!-- Card 1 -->
  <Card
    class="!rounded-[12px] sm:!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 w-full sm:w-[calc(50%-12px)] lg:w-[580px] min-h-[160px] sm:h-[190px]"
  >
    <div class="flex flex-col items-center space-y-2">
      <div class="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        <img src="/svg/clock.svg" alt="Clock" class="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
      </div>
      <h3
        class="text-lg sm:text-[20.8px] leading-[24px] sm:leading-[24.96px] font-bold text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Fast and hassle-free
      </h3>
      <p
        class="text-sm sm:text-[16px] leading-[20px] sm:leading-[25px] text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Enjoy a far simpler process than dealing with foreign governments.
      </p>
    </div>
  </Card>

  <!-- Card 2 -->
  <Card
    class="!rounded-[12px] sm:!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 w-full sm:w-[calc(50%-12px)] lg:w-[580px] min-h-[160px] sm:h-[190px]"
  >
    <div class="flex flex-col items-center space-y-2">
      <div class="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        <img src="/svg/check.svg" alt="Check" class="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
      </div>
      <h3
        class="text-lg sm:text-[20.8px] leading-[24px] sm:leading-[24.96px] font-bold text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Get approved
      </h3>
      <p
        class="text-sm sm:text-[16px] leading-[20px] sm:leading-[25px] text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        We have a 98% visa approval rate. Our team is committed to your success!
      </p>
    </div>
  </Card>

  <!-- Card 3 -->
  <Card
    class="!rounded-[12px] sm:!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 w-full sm:w-[calc(50%-12px)] lg:w-[580px] min-h-[160px] sm:h-[190px]"
  >
    <div class="flex flex-col items-center space-y-2">
      <div class="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        <img src="/svg/spy.svg" alt="Security" class="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
      </div>
      <h3
        class="text-lg sm:text-[20.8px] leading-[24px] sm:leading-[24.96px] font-bold text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Secure and safe
      </h3>
      <p
        class="text-sm sm:text-[16px] leading-[20px] sm:leading-[25px] text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Your security is our priority.
      </p>
    </div>
  </Card>

  <!-- Card 4 -->
  <Card
    class="!rounded-[12px] sm:!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 w-full sm:w-[calc(50%-12px)] lg:w-[580px] min-h-[160px] sm:h-[190px]"
  >
    <div class="flex flex-col items-center space-y-2">
      <div class="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        <img src="/svg/question.svg" alt="Support" class="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
      </div>
      <h3
        class="text-lg sm:text-[20.8px] leading-[24px] sm:leading-[24.96px] font-bold text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Awesome support
      </h3>
      <p
        class="text-sm sm:text-[16px] leading-[20px] sm:leading-[25px] text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Don't worry! Our customer support is ready to help you 24/7.
      </p>
    </div>
  </Card>
</div>

  </section> <!-- ✅ properly closes everything -->
</template>

<script setup lang="ts">
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card/Card.vue'

const handleApplyNow = () => {
  navigateTo('/visa-application')
}
</script>