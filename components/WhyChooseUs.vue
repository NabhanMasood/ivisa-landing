<template>
  <!-- Why Choose Us Section -->
  <section class="bg-white py-8 lg:py-12">
    <div class="container mx-auto px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
        <!-- Left Content -->
        <div class="space-y-8">
          <!-- Heading -->
          <div class="space-y-6">
            <h2
              class="text-[48px] leading-[50px] font-bold text-black tracking-[1px]"
              style="font-family: 'Manrope', sans-serif; font-weight: 700;"
            >
              Why choose us?
            </h2>
            <p
              class="text-[16px] leading-[34px] text-[#0B3947]"
              style="font-family: 'Manrope', sans-serif; font-weight: 500;"
            >
              Our Journey, Simplified. No more visa confusion. No more endless paperwork. Whether it's a Thailand ETA, Morocco eVisa, Turkish Visa, or Egypt Standard Visa — we're here to make your travel dreams stress-free.
            </p>
          </div>

          <!-- CTA Button -->
          <div>
            <Button
              size="lg"
              class="!bg-[#08D07A] hover:!bg-[#06B869] !text-white !h-[50.8px] !rounded-[10px] !px-8 !font-semibold !text-base shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
              style="font-family: 'Manrope', sans-serif;"
              @click="handleApplyNow"
            >
              Apply Now
              <svg
                class="ml-2 w-5 h-5"
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
          <Card class="!rounded-[24px] overflow-hidden shadow-2xl border-0">
            <img
              src="/images/choose-us.png"
              alt="Traveler exploring historic architecture"
              class="w-full h-[500px] lg:h-[600px] object-cover"
            />
          </Card>
        </div>
      </div> <!-- ✅ closes the grid -->
    </div> <!-- ✅ closes the container -->

   <!-- Feature Cards (2 per row, centered, with increased width) -->
<div class="flex flex-wrap justify-center gap-8 mt-12 lg:mt-16">
  <!-- Card 1 -->
  <Card
    class="!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-10 w-[580px] h-[190px]"
  >
    <div class="flex flex-col items-center space-y-2">
      <div class="w-14 h-14  flex items-center justify-center">
        <img src="/svg/clock.svg" alt="Clock" class="w-[25px] h-[25px]" />
      </div>
      <h3
        class="text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Fast and hassle-free
      </h3>
      <p
        class="text-[16px] leading-[25px] text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Enjoy a far simpler process than dealing with foreign governments.
      </p>
    </div>
  </Card>

  <!-- Card 2 -->
  <Card
    class="!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-10 w-[580px] h-[190px]"
  >
    <div class="flex flex-col items-center space-y-2">
      <div class="w-14 h-14  flex items-center justify-center">
        <img src="/svg/check.svg" alt="Check" class="w-[25px] h-[25px]" />
      </div>
      <h3
        class="text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Get approved
      </h3>
      <p
        class="text-[16px] leading-[25px] text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        We have a 98% visa approval rate. Our team is committed to your success!
      </p>
    </div>
  </Card>

  <!-- Card 3 -->
  <Card
    class="!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-10 w-[580px] h-[190px]"
  >
    <div class="flex flex-col items-center space-y-2">
      <div class="w-14 h-14  flex items-center justify-center">
        <img src="/svg/spy.svg" alt="Security" class="w-[25px] h-[25px]" />
      </div>
      <h3
        class="text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Secure and safe
      </h3>
      <p
        class="text-[16px] leading-[25px] text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Your security is our priority.
      </p>
    </div>
  </Card>

  <!-- Card 4 -->
  <Card
    class="!rounded-[16px] !bg-[#F1F9FC] !border-0 text-center flex flex-col items-center justify-center p-10 w-[580px] h-[190px]"
  >
    <div class="flex flex-col items-center space-y-2">
      <div class="w-14 h-14  flex items-center justify-center">
        <img src="/svg/question.svg" alt="Support" class="w-[25px] h-[25px]" />
      </div>
      <h3
        class="text-[20.8px] leading-[24.96px] font-bold text-[#0B3947]"
        style="font-family: 'Manrope', sans-serif;"
      >
        Awesome support
      </h3>
      <p
        class="text-[16px] leading-[25px] text-[#0B3947]"
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