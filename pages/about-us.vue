<!-- pages/about-us.vue -->
<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <HeaderLoggedIn />

    <!-- Main Container: width: 1200, top: 96px -->
    <div class="container mx-auto px-6 lg:px-8 ">
      <div class="max-w-[1200px] mx-auto flex flex-col gap-[80px]">

<!-- First Frame: width: 1200, height: 459, gap: 42px -->
<div class="flex flex-col gap-[42px]">
  
  <!-- Tag, Heading and Subheading: width: 982, height: 183, gap: 19px - LEFT ALIGNED -->
  <div class="flex flex-col gap-[19px] max-w-[982px]">
    <!-- About Us Tag - LEFT ALIGNED with corrected text color #0B3947 -->
    <div class="inline-flex items-center gap-2.5 w-fit bg-[#02D275] rounded-full px-[15px] py-[5px] h-[34px]">
      <span class="font-manrope font-bold text-base leading-6 tracking-normal text-center uppercase text-[#0B3947]">ABOUT US</span>
    </div>

        <!-- Heading - LEFT ALIGNED, single line -->
        <h1 class="font-manrope font-bold text-[56px] leading-[67.2px] tracking-normal text-left text-[#0B3947] max-w-[982px] whitespace-nowrap">
        We make traveling easy for everyone
        </h1>

        <!-- Subheading - LEFT ALIGNED  -->
        <p class="font-manrope font-normal text-[20px] leading-[34px] tracking-normal text-left text-gray-600 max-w-[982px]">
        Learn why our clients trust us
        </p>
  </div>

<!-- Cards Row: width: 1200, height: 234, gap: 32px -->
<div class="flex flex-col md:flex-row gap-8 justify-center">
  
  <!-- Card 1: width: 379, height: 234, gap: 11px, border-radius: 24px, padding: 48px 33px -->
  <div class="w-full md:w-[379px] h-[234px] flex flex-col items-center gap-[11px] rounded-[24px] bg-[#F1F9FC] px-[33px] py-[48px]">
    <!-- SVG Icon: width: 23.79, height: 22.78, top: 3.58px, left: 4.11px -->
    <div class="w-8 h-8 relative">
      <img src="/svg/star.svg" alt="star icon" class="absolute top-[3.58px] left-[4.11px] w-[23.79px] h-[22.78px]" />
    </div>
    <!-- Text: width: 313, height: 61, font-size: 20px, line-height: 34px -->
    <p class="w-full max-w-[313px] font-manrope font-extralight text-[20px] leading-[34px] tracking-normal text-center text-[#0B3947]">
      Over 1.5M clients have trusted us to get their travel documents.
    </p>
  </div>

  <!-- Card 2 -->
  <div class="w-full md:w-[379px] h-[234px] flex flex-col items-center gap-[11px] rounded-[24px] bg-[#F1F9FC] px-[33px] py-[48px]">
    <!-- SVG Icon: width: 23.79, height: 22.78, top: 3.58px, left: 4.11px -->
    <div class="w-8 h-8 relative">
      <img src="/svg/thumbs-up.svg" alt="thumbsup icon" class="absolute top-[3.58px] left-[4.11px] w-[23.79px] h-[22.78px]" />
    </div>
    <!-- Text: width: 313, height: 61, font-size: 20px, line-height: 34px -->
    <p class="w-full max-w-[313px] font-manrope font-extralight text-[20px] leading-[34px] tracking-normal text-center text-[#0B3947]">
      10+ years in the industry, leading providers of online visa services.
    </p>
  </div>

  <!-- Card 3 -->
  <div class="w-full md:w-[379px] h-[234px] flex flex-col items-center gap-[11px] rounded-[24px] bg-[#F1F9FC] px-[33px] py-[48px]">
    <!-- SVG Icon: width: 23.79, height: 22.78, top: 3.58px, left: 4.11px -->
    <div class="w-8 h-8 relative">
      <img src="/svg/globe.svg" alt="globe icon" class="absolute top-[3.58px] left-[4.11px] w-[23.79px] h-[22.78px]" />
    </div>
    <!-- Text: width: 313, height: 61, font-size: 20px, line-height: 34px -->
    <p class="w-full max-w-[313px] font-manrope font-extralight text-[20px] leading-[34px] tracking-normal text-center text-[#0B3947]">
      Global company, with 200+ employees based all around the world.
    </p>
  </div>

</div>
</div>

<!-- Legal Information Section: width: 1200, height: 380 -->
<div class="flex flex-col items-center gap-12 mt-20">
  
  <!-- Heading Container: width: 600, height: 164, gap: 8px - CENTERED -->
  <div class="flex flex-col items-center gap-2">
    <!-- Heading: width: 600, height: 64, font-size: 48px, line-height: 64px, letter-spacing: -1.6px -->
    <h2 class="font-manrope font-bold text-[48px] leading-[64px] tracking-[-1.6px] text-center text-[#0B3947]">
      Legal Information
    </h2>
  </div>

  <!-- Info Cards Section: width: 1200, height: 216, gap: 20px, border-radius: 20px -->
  <div class="w-full max-w-[1200px] h-[216px] flex flex-col md:flex-row gap-5 rounded-[20px] bg-[#F1F9FC]">
    
    <!-- Section 1: width: 373, height: 173, gap: 16px, padding: 32px -->
    <div class="flex-1 flex flex-col items-start justify-center gap-4 p-8">
      <!-- SVG Icon: 24x24 - ABOVE TEXT -->
      <div class="w-6 h-6">
        <img src="/svg/location-pin.svg" alt="location icon" class="w-full h-full" />
      </div>
      
      <!-- Heading and Subheading: width: 309, height: 77, gap: 9px -->
      <div class="flex flex-col gap-[9px] max-w-[309px]">
        <!-- Heading: font-size: 16px, line-height: 24px -->
        <h3 class="font-manrope font-bold text-base leading-6 tracking-normal text-[#0B3947]">
          Mailing Address
        </h3>
        <!-- Subheading: font-size: 14px, line-height: 22px -->
        <p class="font-manrope font-bold text-sm leading-[22px] tracking-normal text-[#0B3947]">
          Visa 123 LLC Shams Business Centre, Sharjah media City Free Zone Al Messaned Sharjah
        </p>
      </div>
    </div>

    <!-- Divider: height: 120, border-width: 0.5px -->
    <div class="hidden md:block w-[0.5px] h-[120px] bg-[#0B3947] self-center"></div>

    <!-- Section 2: width: 373, height: 173, gap: 16px, padding: 32px -->
    <div class="flex-1 flex flex-col items-start justify-center gap-4 p-8">
      <!-- SVG Icon: 24x24 - ABOVE TEXT -->
      <div class="w-6 h-6">
        <img src="/svg/email-icon.svg" alt="email icon" class="w-full h-full" />
      </div>
      
      <!-- Heading and Subheading: width: 309, height: 77, gap: 9px -->
      <div class="flex flex-col gap-[9px] max-w-[309px]">
        <!-- Heading: font-size: 16px, line-height: 24px -->
        <h3 class="font-manrope font-bold text-base leading-6 tracking-normal text-[#0B3947]">
          Contact Email
        </h3>
        <!-- Subheading: font-size: 14px, line-height: 22px -->
        <p class="font-manrope font-bold text-sm leading-[22px] tracking-normal text-[#0B3947]">
          support@visa123.com
        </p>
      </div>
    </div>

    <!-- Divider: height: 120, border-width: 0.5px -->
    <div class="hidden md:block w-[0.5px] h-[120px] bg-[#0B3947] self-center"></div>

    <!-- Section 3: width: 373, height: 173, gap: 16px, padding: 32px -->
    <div class="flex-1 flex flex-col items-start justify-center gap-4 p-8">
      <!-- SVG Icon: 24x24 - ABOVE TEXT -->
      <div class="w-6 h-6">
        <img src="/svg/phone-icon.svg" alt="phone icon" class="w-full h-full" />
      </div>
      
      <!-- Heading and Subheading: width: 309, height: 77, gap: 9px -->
      <div class="flex flex-col gap-[9px] max-w-[309px]">
        <!-- Heading: font-size: 16px, line-height: 24px -->
        <h3 class="font-manrope font-bold text-base leading-6 tracking-normal text-[#0B3947]">
          Company Phone Number
        </h3>
        <!-- Subheading: font-size: 14px, line-height: 22px -->
        <p class="font-manrope font-bold text-sm leading-[22px] tracking-normal text-[#0B3947]">
          +971 585743188
        </p>
      </div>
    </div>

  </div>
</div>

        <!-- Our Offices Around the World: width: 1200, height: 331, gap: 80px -->
        <div class="flex flex-col gap-[80px] mt-20">
          
          <!-- Heading: width: 1200, height: 56, font-size: 48px, line-height: 56px -->
          <h2 class="font-manrope font-bold text-[48px] leading-[56px] tracking-normal text-center text-[#0B3947]">
            Our offices around the world
          </h2>

<!-- Office Section: width: 1200, height: 195, gap: 10px -->
<div class="flex flex-col md:flex-row items-center gap-[10px] p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
  
  <!-- Image: width: 148, height: 145, border-radius: 16px -->
  <div class="w-[148px] h-[145px] flex-shrink-0 rounded-2xl overflow-hidden">
    <img src="/images/us-flag.png" alt="UAE office" class="w-full h-full object-cover" />
  </div>

  <!-- Details: width: 978, height: 145, gap: 5px -->
  <div class="flex-1 flex flex-col gap-[5px]">
    <!-- United Arab Emirates: width: 978, height: 45, border-bottom-width: 1px -->
    <h3 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947] w-full max-w-[978px] h-[45px] border-b border-gray-300 pb-2">
      United Arab Emirates
    </h3>
    
    <!-- Address: font-size: 14px, line-height: 22px -->
    <p class="font-manrope font-bold text-sm leading-[22px] tracking-normal text-[#0B3947]">
      Visa 123 LLC Shams Business Centre,<br />
      Sharjah media City Free Zone Al<br />
      Messaned Sharjah
    </p>

    <!-- Phone Number with Arrow: font-size: 16px, line-height: 28px -->
    <div class="flex items-center gap-2 mt-2">
      <span class="font-manrope font-extralight text-base leading-7 tracking-normal text-[#0B3947]">
        +971 585743188
      </span>
      <!-- Arrow SVG: width: 15.81, height: 13.55, top: 5.22px, left: 4.09px -->
      <div class="w-6 h-6 relative">
        <img 
          src="/svg/arrow-right.svg" 
          alt="arrow" 
          class="absolute top-[5.22px] left-[4.09px] w-[15.81px] h-[13.55px]"
        />
      </div>
    </div>
  </div>

</div>

        </div>

      </div>
    </div>

    <!-- Spacing before footer -->
    <div class="h-[211px]"></div>

  </div>
</template>

<script setup lang="ts">
// Import components
import HeaderLoggedIn from '@/components/HeaderLoggedIn.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;500;600;700;800&display=swap');

.font-manrope {
  font-family: 'Manrope', sans-serif;
}
</style>