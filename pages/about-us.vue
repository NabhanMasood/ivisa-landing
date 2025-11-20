<!-- pages/about-us.vue -->
<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <HeaderLoggedIn />

    <!-- Main Container: width: 1200, top: 96px -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-[1200px] mx-auto flex flex-col gap-12 sm:gap-16 lg:gap-[80px]">

<!-- First Frame: width: 1200, height: 459, gap: 42px -->
<div class="flex flex-col gap-6 sm:gap-8 lg:gap-[42px]">
  
  <!-- Tag, Heading and Subheading: width: 982, height: 183, gap: 19px - LEFT ALIGNED -->
  <div class="flex flex-col gap-3 sm:gap-4 lg:gap-[19px] max-w-[982px]">
    <!-- About Us Tag - LEFT ALIGNED with corrected text color #0B3947 -->
    <div class="inline-flex items-center gap-2.5 w-fit bg-[#02D275] rounded-full px-3 sm:px-[15px] py-1 sm:py-[5px] h-7 sm:h-[34px]">
      <span class="font-manrope font-bold text-xs sm:text-base leading-5 sm:leading-6 tracking-normal text-center uppercase text-[#0B3947]">ABOUT US</span>
    </div>

        <!-- Heading - LEFT ALIGNED, single line -->
        <h1 class="font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-tight sm:leading-[1.2] lg:leading-[67.2px] tracking-normal text-left text-[#0B3947] max-w-[982px]">
        We make traveling easy for everyone
        </h1>

        <!-- Subheading - LEFT ALIGNED  -->
        <p class="font-manrope font-normal text-sm sm:text-base lg:text-[20px] leading-5 sm:leading-6 lg:leading-[34px] tracking-normal text-left text-gray-600 max-w-[982px]">
        Learn why our clients trust us
        </p>
  </div>

<!-- Cards Row: width: 1200, height: 234, gap: 32px -->
<div class="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center">
  
  <!-- Card 1: width: 379, height: 234, gap: 11px, border-radius: 24px, padding: 48px 33px -->
  <div class="w-full md:w-[379px] min-h-[200px] sm:min-h-[234px] h-auto flex flex-col items-center gap-3 sm:gap-[11px] rounded-2xl sm:rounded-[24px] bg-[#F1F9FC] px-4 sm:px-6 lg:px-[33px] py-6 sm:py-8 lg:py-[48px]">
    <!-- SVG Icon: width: 23.79, height: 22.78, top: 3.58px, left: 4.11px -->
    <div class="w-6 h-6 sm:w-8 sm:h-8 relative">
      <img src="/svg/star.svg" alt="star icon" class="absolute top-[3.58px] left-[4.11px] w-[18px] h-[18px] sm:w-[23.79px] sm:h-[22.78px]" />
    </div>
    <!-- Text: width: 313, height: 61, font-size: 20px, line-height: 34px -->
    <p class="w-full max-w-[313px] font-manrope font-extralight text-sm sm:text-base lg:text-[20px] leading-5 sm:leading-6 lg:leading-[34px] tracking-normal text-center text-[#0B3947]">
      Over 1.5M clients have trusted us to get their travel documents.
    </p>
  </div>

  <!-- Card 2 -->
  <div class="w-full md:w-[379px] min-h-[200px] sm:min-h-[234px] h-auto flex flex-col items-center gap-3 sm:gap-[11px] rounded-2xl sm:rounded-[24px] bg-[#F1F9FC] px-4 sm:px-6 lg:px-[33px] py-6 sm:py-8 lg:py-[48px]">
    <!-- SVG Icon: width: 23.79, height: 22.78, top: 3.58px, left: 4.11px -->
    <div class="w-6 h-6 sm:w-8 sm:h-8 relative">
      <img src="/svg/thumbs-up.svg" alt="thumbsup icon" class="absolute top-[3.58px] left-[4.11px] w-[18px] h-[18px] sm:w-[23.79px] sm:h-[22.78px]" />
    </div>
    <!-- Text: width: 313, height: 61, font-size: 20px, line-height: 34px -->
    <p class="w-full max-w-[313px] font-manrope font-extralight text-sm sm:text-base lg:text-[20px] leading-5 sm:leading-6 lg:leading-[34px] tracking-normal text-center text-[#0B3947]">
      10+ years in the industry, leading providers of online visa services.
    </p>
  </div>

  <!-- Card 3 -->
  <div class="w-full md:w-[379px] min-h-[200px] sm:min-h-[234px] h-auto flex flex-col items-center gap-3 sm:gap-[11px] rounded-2xl sm:rounded-[24px] bg-[#F1F9FC] px-4 sm:px-6 lg:px-[33px] py-6 sm:py-8 lg:py-[48px]">
    <!-- SVG Icon: width: 23.79, height: 22.78, top: 3.58px, left: 4.11px -->
    <div class="w-6 h-6 sm:w-8 sm:h-8 relative">
      <img src="/svg/globe.svg" alt="globe icon" class="absolute top-[3.58px] left-[4.11px] w-[18px] h-[18px] sm:w-[23.79px] sm:h-[22.78px]" />
    </div>
    <!-- Text: width: 313, height: 61, font-size: 20px, line-height: 34px -->
    <p class="w-full max-w-[313px] font-manrope font-extralight text-sm sm:text-base lg:text-[20px] leading-5 sm:leading-6 lg:leading-[34px] tracking-normal text-center text-[#0B3947]">
      Global company, with 200+ employees based all around the world.
    </p>
  </div>

</div>
</div>

<!-- Legal Information Section: width: 1200, height: 380 -->
<div class="flex flex-col items-center gap-6 sm:gap-8 lg:gap-12 mt-10 sm:mt-16 lg:mt-20">
  
  <!-- Heading Container: width: 600, height: 164, gap: 8px - CENTERED -->
  <div class="flex flex-col items-center gap-2">
    <!-- Heading: width: 600, height: 64, font-size: 48px, line-height: 64px, letter-spacing: -1.6px -->
    <h2 class="font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight sm:leading-[1.2] lg:leading-[64px] tracking-[-1.6px] text-center text-[#0B3947]">
      Legal Information
    </h2>
  </div>

  <!-- Info Cards Section: width: 1200, height: 216, gap: 20px, border-radius: 20px -->
  <div class="w-full max-w-[1200px] min-h-[200px] sm:min-h-[216px] h-auto flex flex-col md:flex-row gap-4 sm:gap-5 rounded-xl sm:rounded-[20px] bg-[#F1F9FC]">
    
    <!-- Section 1: width: 373, height: 173, gap: 16px, padding: 32px -->
    <div class="flex-1 flex flex-col items-start justify-center gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8">
      <!-- SVG Icon: 24x24 - ABOVE TEXT -->
      <div class="w-5 h-5 sm:w-6 sm:h-6">
        <img src="/svg/location-pin.svg" alt="location icon" class="w-full h-full" />
      </div>
      
      <!-- Heading and Subheading: width: 309, height: 77, gap: 9px -->
      <div class="flex flex-col gap-2 sm:gap-[9px] max-w-[309px]">
        <!-- Heading: font-size: 16px, line-height: 24px -->
        <h3 class="font-manrope font-bold text-sm sm:text-base leading-5 sm:leading-6 tracking-normal text-[#0B3947]">
          Mailing Address
        </h3>
        <!-- Subheading: font-size: 14px, line-height: 22px -->
        <p class="font-manrope font-bold text-xs sm:text-sm leading-5 sm:leading-[22px] tracking-normal text-[#0B3947]">
          Visa 123 LLC Shams Business Centre, Sharjah media City Free Zone Al Messaned Sharjah
        </p>
      </div>
    </div>

    <!-- Divider: height: 120, border-width: 0.5px -->
    <div class="hidden md:block w-[0.5px] h-[100px] sm:h-[120px] bg-[#0B3947] self-center"></div>

    <!-- Section 2: width: 373, height: 173, gap: 16px, padding: 32px -->
    <div class="flex-1 flex flex-col items-start justify-center gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8">
      <!-- SVG Icon: 24x24 - ABOVE TEXT -->
      <div class="w-5 h-5 sm:w-6 sm:h-6">
        <img src="/svg/email-icon.svg" alt="email icon" class="w-full h-full" />
      </div>
      
      <!-- Heading and Subheading: width: 309, height: 77, gap: 9px -->
      <div class="flex flex-col gap-2 sm:gap-[9px] max-w-[309px]">
        <!-- Heading: font-size: 16px, line-height: 24px -->
        <h3 class="font-manrope font-bold text-sm sm:text-base leading-5 sm:leading-6 tracking-normal text-[#0B3947]">
          Contact Email
        </h3>
        <!-- Subheading: font-size: 14px, line-height: 22px -->
        <p class="font-manrope font-bold text-xs sm:text-sm leading-5 sm:leading-[22px] tracking-normal text-[#0B3947]">
          support@visa123.com
        </p>
      </div>
    </div>

    <!-- Divider: height: 120, border-width: 0.5px -->
    <div class="hidden md:block w-[0.5px] h-[100px] sm:h-[120px] bg-[#0B3947] self-center"></div>

    <!-- Section 3: width: 373, height: 173, gap: 16px, padding: 32px -->
    <div class="flex-1 flex flex-col items-start justify-center gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8">
      <!-- SVG Icon: 24x24 - ABOVE TEXT -->
      <div class="w-5 h-5 sm:w-6 sm:h-6">
        <img src="/svg/phone-icon.svg" alt="phone icon" class="w-full h-full" />
      </div>
      
      <!-- Heading and Subheading: width: 309, height: 77, gap: 9px -->
      <div class="flex flex-col gap-2 sm:gap-[9px] max-w-[309px]">
        <!-- Heading: font-size: 16px, line-height: 24px -->
        <h3 class="font-manrope font-bold text-sm sm:text-base leading-5 sm:leading-6 tracking-normal text-[#0B3947]">
          Company Phone Number
        </h3>
        <!-- Subheading: font-size: 14px, line-height: 22px -->
        <p class="font-manrope font-bold text-xs sm:text-sm leading-5 sm:leading-[22px] tracking-normal text-[#0B3947]">
          +971 585743188
        </p>
      </div>
    </div>

  </div>
</div>

        <!-- Our Offices Around the World: width: 1200, height: 331, gap: 80px -->
        <div class="flex flex-col gap-8 sm:gap-12 lg:gap-[80px] mt-10 sm:mt-16 lg:mt-20">
          
          <!-- Heading: width: 1200, height: 56, font-size: 48px, line-height: 56px -->
          <h2 class="font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight sm:leading-[1.2] lg:leading-[56px] tracking-normal text-center text-[#0B3947]">
            Our offices around the world
          </h2>

<!-- Office Section: width: 1200, height: 195, gap: 10px -->
<div class="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-[10px] p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
  
  <!-- Image: width: 148, height: 145, border-radius: 16px -->
  <div class="w-24 h-24 sm:w-[120px] sm:h-[120px] md:w-[148px] md:h-[145px] flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden">
    <img src="/images/us-flag.png" alt="UAE office" class="w-full h-full object-cover" />
  </div>

  <!-- Details: width: 978, height: 145, gap: 5px -->
  <div class="flex-1 flex flex-col gap-2 sm:gap-[5px]">
    <!-- United Arab Emirates: width: 978, height: 45, border-bottom-width: 1px -->
    <h3 class="font-manrope font-bold text-lg sm:text-xl lg:text-[24px] leading-6 sm:leading-7 lg:leading-[32px] tracking-normal text-[#0B3947] w-full max-w-[978px] min-h-[36px] sm:min-h-[45px] border-b border-gray-300 pb-2">
      United Arab Emirates
    </h3>
    
    <!-- Address: font-size: 14px, line-height: 22px -->
    <p class="font-manrope font-bold text-xs sm:text-sm leading-5 sm:leading-[22px] tracking-normal text-[#0B3947]">
      Visa 123 LLC Shams Business Centre,<br />
      Sharjah media City Free Zone Al<br />
      Messaned Sharjah
    </p>

    <!-- Phone Number with Arrow: font-size: 16px, line-height: 28px -->
    <div class="flex items-center gap-2 mt-2">
      <span class="font-manrope font-extralight text-sm sm:text-base leading-6 sm:leading-7 tracking-normal text-[#0B3947]">
        +971 585743188
      </span>
      <!-- Arrow SVG: width: 15.81, height: 13.55, top: 5.22px, left: 4.09px -->
      <div class="w-5 h-5 sm:w-6 sm:h-6 relative">
        <img 
          src="/svg/arrow-right.svg" 
          alt="arrow" 
          class="absolute top-[5.22px] left-[4.09px] w-[12px] h-[12px] sm:w-[15.81px] sm:h-[13.55px]"
        />
      </div>
    </div>
  </div>

</div>

        </div>

      </div>
    </div>

    <!-- Spacing before footer -->
    <div class="h-16 sm:h-24 lg:h-[211px]"></div>

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