<!-- pages/visa/[country].vue -->
<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <HeaderLoggedIn />

            <!-- Hero Section -->
            <section class="relative w-full">
            <div class="container mx-auto px-6 lg:px-8">
                <!-- Hero Container: width: 1200, height: 554, border-radius: 16px, reduced top margin -->
                <div class="relative w-full max-w-[1200px] h-[554px] mx-auto rounded-2xl overflow-hidden mt-8">
                <!-- Background Image -->
                <img 
                    :src="countryData.heroImage" 
                    :alt="countryData.name"
                    class="absolute inset-0 w-full h-full object-cover"
                />
                
                <!-- Overlay -->
                <div class="absolute inset-0 bg-black/30"></div>
                
                <!-- Container Content: width: 1012, height: 336, top: 99px, left: 89px, gap: 54px -->
                <div class="absolute top-[99px] left-[89px] flex gap-[54px] w-[1012px] h-[336px]">
                    
                    <!-- Left Section: width: 585, height: 336, gap: 24px, border-radius: 16px, padding: 25px, bg: #68919C80 with blur -->
                    <div class="w-[585px] h-[336px] flex flex-col gap-6 rounded-2xl p-[25px] bg-[#68919C80] backdrop-blur-[20px]">
                    <!-- Start your application text: width: 535, height: 32, font-size: 28px, line-height: 32px -->
                    <h2 class="w-[535px] h-[32px] font-manrope font-bold text-[28px] leading-[32px] text-white">
                        Start your application
                    </h2>
                    
                    <!-- Form -->
                    <form @submit.prevent="handleApplyNow" class="flex flex-col gap-4">
                        <!-- Where are you from -->
                        <div>
                        <label class="font-manrope text-sm font-medium text-white/90 mb-2 block">
                            Where are you from?
                        </label>
                        <div class="relative">
                            <select 
                            v-model="formData.from"
                            class="w-full h-[50px] pl-12 pr-12 border border-white/20 rounded-lg font-manrope font-normal text-sm leading-6 bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#02D275] focus:border-transparent appearance-none"
                            >
                            <option value="" class="text-gray-400" disabled>Select country</option>
                            <option value="United States" class="text-gray-900">United States</option>
                            <option value="United Kingdom" class="text-gray-900">United Kingdom</option>
                            <option value="Canada" class="text-gray-900">Canada</option>
                            <option value="Australia" class="text-gray-900">Australia</option>
                            </select>
                            <!-- Flag Icon: 20x20 - Default USA flag -->
                            <img 
                            v-if="formData.from === 'United States' || formData.from === ''" 
                            src="/svg/flags/US.svg" 
                            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full object-cover"
                            alt="USA flag"
                            />
                            <!-- Dropdown Icon: width: 20, height: 20 -->
                            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                        </div>

                        <!-- Where are you going -->
                        <div>
                        <label class="font-manrope text-sm font-medium text-white/90 mb-2 block">
                            Where are you going?
                        </label>
                        <div class="relative">
                            <select 
                            v-model="formData.to"
                            class="w-full h-[50px] pl-12 pr-12 border border-white/20 rounded-lg font-manrope font-normal text-sm leading-6 bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#02D275] focus:border-transparent appearance-none"
                            >
                            <option value="" class="text-gray-400" disabled>Select destination</option>
                            <option :value="countryData.name" class="text-gray-900">{{ countryData.name }}</option>
                            </select>
                            <!-- Flag Icon: 20x20 - Default Turkey flag -->
                            <img 
                            v-if="formData.to === 'Turkey' || (formData.to === '' && countryData.name === 'Turkey')" 
                            src="/svg/flags/TR.svg" 
                            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full object-cover"
                            alt="Turkey flag"
                            />
                            <!-- Dropdown Icon: width: 20, height: 20 -->
                            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                        </div>

                        <!-- Apply Button: width: 535, height: 46, border-radius: 10px, bg: #00D474 -->
                        <button
                        type="submit"
                        class="w-[535px] h-[46px] rounded-[10px] bg-[#00D474] hover:bg-[#00D474]/90 font-manrope font-bold text-lg leading-6 text-white text-center flex items-center justify-center gap-2"
                        >
                        <span>➜</span>
                        <span>Apply Now!</span>
                        </button>
                    </form>
                    </div>

                    <!-- Right Section: width: 373, height: 154, gap: 20px -->
                    <div class="w-[373px] h-[154px] flex flex-col gap-5">
                    <!-- Heading: width: 373, height: 56 -->
                    <div class="w-[373px] h-[56px]">
                        <h1 class="text-white text-5xl font-bold">CC</h1>
                    </div>
                    
                    <!-- Text under heading: width: 373, height: 78, font-size: 20px, line-height: 26px -->
                    <p class="w-[373px] h-[78px] font-manrope font-medium text-[20px] leading-[26px] text-white">
                        Plan your trip to {{ countryData.name }} confidently, easy, online, and optimised for travellers just like you.
                    </p>
                    </div>

                </div>
                </div>
            </div>
            </section>


<!-- Streamlined Application Process - Same for all countries -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-6 lg:px-8">
    <!-- Container: width: 1002, height: 404, gap: 40px -->
    <div class="max-w-[1002px] mx-auto flex flex-col gap-10">
      
      <!-- Heading: font-size: 32px, line-height: 40px, letter-spacing: 0% -->
      <h2 class="font-manrope font-bold text-[32px] leading-[40px] tracking-normal text-center text-[#0A3D3F]">
        Streamlined Application Process
      </h2>

      <!-- Frame with steps and cards: width: 1002, height: 324, gap: 40px -->
      <div class="flex flex-col gap-10">
        
        <!-- Steps Row with Icons and Separators -->
        <div class="flex items-center justify-center">
          <!-- Step 1 Icon -->
          <div class="flex flex-col items-center">
            <!-- Numeric Icon: width: 44px, height: 44px with drop shadow -->
            <div class="w-[44px] h-[44px] bg-[#00D474] rounded-full flex items-center justify-center relative shadow-[0_0.93px_1.4px_rgba(26,25,37,0.12),0_1.87px_3.73px_rgba(26,25,37,0.12)]">
              <!-- Number: width: 32px, height: 28px, font-size: 20px, line-height: 28px, letter-spacing: -2% -->
              <span class="font-manrope font-medium text-[20px] leading-[28px] tracking-[-0.02em] text-white text-center">1</span>
            </div>
          </div>

          <!-- Gap before separator - increased -->
          <div class="w-8"></div>

          <!-- Separator: width: 182, border: 1px, color: #EEEEF0 -->
          <div class="w-[182px] h-0 border-t border-[#EEEEF0]"></div>

          <!-- Gap after separator - increased -->
          <div class="w-8"></div>

          <!-- Step 2 Icon -->
          <div class="flex flex-col items-center">
            <!-- Numeric Icon: width: 44px, height: 44px with drop shadow -->
            <div class="w-[44px] h-[44px] bg-[#00D474] rounded-full flex items-center justify-center relative shadow-[0_0.93px_1.4px_rgba(26,25,37,0.12),0_1.87px_3.73px_rgba(26,25,37,0.12)]">
              <!-- Number: width: 32px, height: 28px, font-size: 20px, line-height: 28px, letter-spacing: -2% -->
              <span class="font-manrope font-medium text-[20px] leading-[28px] tracking-[-0.02em] text-white text-center">2</span>
            </div>
          </div>

          <!-- Gap before separator - increased -->
          <div class="w-8"></div>

          <!-- Separator: width: 182, border: 1px, color: #EEEEF0 -->
          <div class="w-[182px] h-0 border-t border-[#EEEEF0]"></div>

          <!-- Gap after separator - increased -->
          <div class="w-8"></div>

          <!-- Step 3 Icon -->
          <div class="flex flex-col items-center">
            <!-- Numeric Icon: width: 44px, height: 44px with drop shadow -->
            <div class="w-[44px] h-[44px] bg-[#00D474] rounded-full flex items-center justify-center relative shadow-[0_0.93px_1.4px_rgba(26,25,37,0.12),0_1.87px_3.73px_rgba(26,25,37,0.12)]">
              <!-- Number: width: 32px, height: 28px, font-size: 20px, line-height: 28px, letter-spacing: -2% -->
              <span class="font-manrope font-medium text-[20px] leading-[28px] tracking-[-0.02em] text-white text-center">3</span>
            </div>
          </div>
        </div>

        <!-- Cards Container: width: 1002, height: 220, gap: 45px -->
        <div class="flex gap-[45px] justify-center">
          
          <!-- Card 1: width: 304, height: 220, gap: 16px, border-radius: 16px, padding: 40px 20px, bg: #F1F9FC -->
          <div class="w-[304px] h-[220px] flex flex-col items-center gap-4 rounded-2xl bg-[#F1F9FC] px-5 py-10">
            <!-- Heading: width: 264, height: 64, font-size: 22px, line-height: 32px, letter-spacing: -2% -->
            <h3 class="w-[264px] h-[64px] font-manrope font-bold text-[22px] leading-[32px] tracking-[-0.02em] text-center text-[#0B3947]">
              Smarter Task Management Flow
            </h3>
            <!-- Subtext: width: 264, height: 60, opacity: 0.7, font-size: 16px, line-height: 20px, letter-spacing: -0.6% -->
            <p class="w-[264px] h-[60px] font-manrope font-normal text-base leading-5 tracking-[-0.006em] text-center text-[#0B3947] opacity-70">
              Minimal, organized structure to help you manage, sort, and access every task.
            </p>
          </div>

          <!-- Card 2: width: 304, height: 220 -->
          <div class="w-[304px] h-[220px] flex flex-col items-center gap-4 rounded-2xl bg-[#F1F9FC] px-5 py-10">
            <!-- Heading: width: 264, height: 64 -->
            <h3 class="w-[264px] h-[64px] font-manrope font-bold text-[22px] leading-[32px] tracking-[-0.02em] text-center text-[#0B3947]">
              All-in-One Project Beam Control
            </h3>
            <!-- Subtext: width: 264, height: 60 -->
            <p class="w-[264px] h-[60px] font-manrope font-normal text-base leading-5 tracking-[-0.006em] text-center text-[#0B3947] opacity-70">
              Design, edit, publish, and manage projects without leaving your workspace.
            </p>
          </div>

          <!-- Card 3: width: 304, height: 220 -->
          <div class="w-[304px] h-[220px] flex flex-col items-center gap-4 rounded-2xl bg-[#F1F9FC] px-5 py-10">
            <!-- Heading: width: 264, height: 64 -->
            <h3 class="w-[264px] h-[64px] font-manrope font-bold text-[22px] leading-[32px] tracking-[-0.02em] text-center text-[#0B3947]">
              Real-Time Usage Analytics
            </h3>
            <!-- Subtext: width: 264, height: 60 -->
            <p class="w-[264px] h-[60px] font-manrope font-normal text-base leading-5 tracking-[-0.006em] text-center text-[#0B3947] opacity-70">
              Compare free and premium user activity at a glance — track growth.
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

<!-- Features Grid - Same for all countries -->
<section class="py-16 bg-white">
  <div class="container mx-auto px-6 lg:px-8">
    <!-- Main Container: width: 1200, height: 476, gap: 24px -->
    <div class="max-w-[1200px] mx-auto flex flex-col gap-6">
      
      <!-- First Row: width: 1200, height: 226, gap: 24px -->
      <div class="flex gap-6 h-[226px]">
        <!-- Feature 1 Card -->
        <div class="flex-1 flex flex-col p-[35px] bg-[#F1F9FC] rounded-lg">
          <!-- Icon: width: 61.875, height: 60 -->
          <div class="w-[61.875px] h-[60px] mb-4">
            <img src="/svg/clock.svg" alt="visa alerts" class="w-full h-full" />
          </div>
          
          <!-- Text Container: width: 518, height: 80, gap: 8px -->
          <div class="flex flex-col gap-2 max-w-[518px]">
            <!-- Heading: width: 518, height: 24, font-size: 18px, line-height: 24px, letter-spacing: -0.24px -->
            <h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-[#0A3D3F]">
              Fresh visa alerts
            </h3>
            <!-- Subheading: width: 518, height: 48, font-size: 16px, line-height: 24px, letter-spacing: -0.08px -->
            <p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-[#40444C]">
              Be notified instantly of important visa changes that could impact your journey.
            </p>
          </div>
        </div>

        <!-- Feature 2 Card -->
        <div class="flex-1 flex flex-col p-[35px] bg-[#F1F9FC] rounded-lg">
          <!-- Icon: width: 61.875, height: 60 -->
          <div class="w-[61.875px] h-[60px] mb-4">
            <img src="/svg/clock.svg" alt="travel guidance" class="w-full h-full" />
          </div>
          
          <!-- Text Container: width: 518, height: 80, gap: 8px -->
          <div class="flex flex-col gap-2 max-w-[518px]">
            <!-- Heading: width: 518, height: 24, font-size: 18px, line-height: 24px, letter-spacing: -0.24px -->
            <h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-[#0A3D3F]">
              Smart travel guidance
            </h3>
            <!-- Subheading: width: 518, height: 48, font-size: 16px, line-height: 24px, letter-spacing: -0.08px -->
            <p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-[#40444C]">
              Get insider tips that make your trips simpler, safer, and more enjoyable.
            </p>
          </div>
        </div>
      </div>

      <!-- Second Row: width: 1200, height: 226, gap: 24px -->
      <div class="flex gap-6 h-[226px]">
        <!-- Feature 3 Card -->
        <div class="flex-1 flex flex-col p-[35px] bg-[#F1F9FC] rounded-lg">
          <!-- Icon: width: 61.875, height: 60 -->
          <div class="w-[61.875px] h-[60px] mb-4">
            <img src="/svg/clock.svg" alt="visa alerts" class="w-full h-full" />
          </div>
          
          <!-- Text Container: width: 518, height: 80, gap: 8px -->
          <div class="flex flex-col gap-2 max-w-[518px]">
            <!-- Heading: width: 518, height: 24, font-size: 18px, line-height: 24px, letter-spacing: -0.24px -->
            <h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-[#0A3D3F]">
              Fresh visa alerts
            </h3>
            <!-- Subheading: width: 518, height: 48, font-size: 16px, line-height: 24px, letter-spacing: -0.08px -->
            <p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-[#40444C]">
              Be notified instantly of important visa changes that could impact your journey.
            </p>
          </div>
        </div>

        <!-- Feature 4 Card -->
        <div class="flex-1 flex flex-col p-[35px] bg-[#F1F9FC] rounded-lg">
          <!-- Icon: width: 61.875, height: 60 -->
          <div class="w-[61.875px] h-[60px] mb-4">
            <img src="/svg/clock.svg" alt="travel guidance" class="w-full h-full" />
          </div>
          
          <!-- Text Container: width: 518, height: 80, gap: 8px -->
          <div class="flex flex-col gap-2 max-w-[518px]">
            <!-- Heading: width: 518, height: 24, font-size: 18px, line-height: 24px, letter-spacing: -0.24px -->
            <h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-[#0A3D3F]">
              Smart travel guidance
            </h3>
            <!-- Subheading: width: 518, height: 48, font-size: 16px, line-height: 24px, letter-spacing: -0.08px -->
            <p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-[#40444C]">
              Get insider tips that make your trips simpler, safer, and more enjoyable.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


        <!-- Application Form Section -->
        <section class="py-16 bg-white">
        <div class="container mx-auto px-6 lg:px-8">
            <!-- Article page wrapper: width: 1200px, height: 540px, border-radius: 30px -->
            <div class="max-w-[1200px] h-[540px] mx-auto rounded-[30px] overflow-hidden">
            <ApplicationForm />
            </div>
            
        </div>
        </section>

<!-- Country-Specific Content Section -->
<section class="py-16 bg-white">
  <div class="container mx-auto px-6 lg:px-8">
    
    <!-- Main Container: width: 1200, height: 1384, gap: 60px -->
    <div class="max-w-[1200px] mx-auto flex flex-col gap-[60px]">
      
      <!-- Country Title - NO GRADIENT LINE -->
      <div class="mb-0">
        <!-- Title: font-size: 24px, line-height: 32px -->
        <h1 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]">
          {{ countryData.title }}
        </h1>
      </div>

      <!-- Introduction Section: gap: 20px -->
      <div class="flex flex-col gap-5">
        <!-- Subtext: width: 1200, height: 56, font-size: 16px, line-height: 28px -->
        <p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full">
          {{ countryData.introduction }}
        </p>
      </div>

      <!-- What is the Visa Section: gap: 20px -->
      <div class="flex flex-col gap-5">
        <!-- Heading: font-size: 24px, line-height: 32px -->
        <h2 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]">
          {{ countryData.sections.whatIs.title }}
        </h2>
        <!-- Content: width: 1200, height: 56 -->
        <p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full">
          {{ countryData.sections.whatIs.content }}
        </p>
      </div>

      <!-- Documents Needed Section: gap: 20px -->
      <div class="flex flex-col gap-5">
        <!-- Heading: font-size: 24px, line-height: 32px -->
        <h2 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]">
          Documents You'll Need
        </h2>
        <!-- Content -->
        <p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full mb-4">
          When applying for a {{ countryData.name }} visa, prepare the following:
        </p>
        <!-- Bullets List -->
        <ul class="space-y-2">
          <li 
            v-for="(doc, index) in countryData.sections.documents" 
            :key="index" 
            class="flex items-start gap-3"
          >
            <span class="text-[#0B3947] mt-1">•</span>
            <span class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947]">
              {{ doc }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Types of Visas Section: gap: 20px -->
      <div class="flex flex-col gap-5">
        <!-- Heading: font-size: 24px, line-height: 32px -->
        <h2 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]">
          Types of {{ countryData.name }} Visas
        </h2>
        <!-- Content -->
        <p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full mb-4">
          Choose the visa that best fits your travel purpose:
        </p>
        <!-- Visa Types List with Bold Names -->
        <ul class="space-y-2">
          <li 
            v-for="(visa, index) in countryData.sections.visaTypes" 
            :key="index" 
            class="flex items-start gap-3"
          >
            <span class="text-[#0B3947] mt-1">•</span>
            <span class="font-manrope text-base leading-7 tracking-normal text-[#0B3947]">
              <strong class="font-bold">{{ visa.name }}</strong>
              <span class="font-normal"> – {{ visa.description }}</span>
            </span>
          </li>
        </ul>
      </div>

      <!-- How to Apply Section: gap: 20px -->
      <div class="flex flex-col gap-5">
        <!-- Heading: font-size: 24px, line-height: 32px -->
        <h2 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]">
          How to Apply for a {{ countryData.name }} Visa
        </h2>
        <!-- Content -->
        <p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full mb-4">
          Here's how to start your application through Visa123:
        </p>
        <!-- Numbered List -->
        <ol class="space-y-2">
          <li 
            v-for="(step, index) in countryData.sections.howToApply" 
            :key="index" 
            class="flex items-start gap-3"
          >
            <span class="font-manrope font-bold text-base leading-7 text-[#0B3947]">{{ index + 1 }}.</span>
            <span class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947]">
              {{ step }}
            </span>
          </li>
        </ol>
      </div>

      <!-- Why Apply with Visa123 Section: gap: 20px -->
      <div class="flex flex-col gap-5">
        <!-- Heading: font-size: 24px, line-height: 32px -->
        <h2 class="font-manrope font-bold text-[24px] leading-[32px] tracking-normal text-[#0B3947]">
          Why Apply with Visa123
        </h2>
        <!-- Content: width: 1200, height: 56 -->
        <p class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] w-full">
          {{ countryData.sections.whyVisa123 }}
        </p>
      </div>

    </div>
  </div>
</section>

    <!-- Spacing before footer -->
    <div class="h-[211px]"></div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getCountryData } from '@/data/visaCountries'

// Import components
import HeaderLoggedIn from '@/components/HeaderLoggedIn.vue'
import Footer from '@/components/Footer.vue'
import Button from '@/components/ui/button.vue'
import ApplicationForm from '@/components/ApplicationForm.vue'

const route = useRoute()

// Form data
const formData = ref({
  from: 'United States',
  to: ''
})

// Get country from route parameter
const countrySlug = computed(() => route.params.country as string || 'turkey')
const countryData = computed(() => getCountryData(countrySlug.value))

// Watch for route changes and update form
watchEffect(() => {
  if (countryData.value) {
    formData.value.to = countryData.value.name
  }
})

// Handle form submission
const handleApplyNow = () => {
  if (formData.value.from && formData.value.to) {
    console.log('Application submitted:', formData.value)
    alert(`Applying for visa from ${formData.value.from} to ${formData.value.to}`)
  } else {
    alert('Please select both countries')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

.font-manrope {
  font-family: 'Manrope', sans-serif;
}
</style>