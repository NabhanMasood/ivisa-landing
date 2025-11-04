<!-- pages/faq.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <HeaderLoggedIn />

    <!-- FAQ Section -->
    <div class="container mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <!-- Main Container: width: 1200, gap: 100px -->
      <div class="max-w-[1200px] mx-auto flex flex-col gap-[100px]">
        
        <!-- First Row: width: 1200, height: 174, gap: 40px -->
        <div class="w-full max-w-[1200px] min-h-[174px] flex flex-col lg:flex-row justify-between items-start gap-10">
          
          <!-- Left Section -->
          <div class="flex flex-col gap-6 flex-1">
            <!-- FAQ Badge -->
            <div class="inline-flex items-center bg-[#F1F9FC] rounded-full px-[15px] py-[5px] h-[34px] w-fit">
              <span class="font-manrope font-bold text-base leading-6 tracking-normal uppercase text-[#374151]">
                FAQ
              </span>
            </div>
            
            <!-- Title -->
            <h1 class="font-manrope font-bold text-[48px] leading-[64px] tracking-[-0.015em] text-[#111827] max-w-[550px]">
              Find the Right Answer<br />Before You Pack.
            </h1>
          </div>

          <!-- Right Section -->
          <div class="flex flex-col gap-4 max-w-[500px] flex-shrink-0 lg:mt-[58px]">
            <!-- Icon -->
            <div class="flex items-center justify-start">
              <img 
                src="/svg/click.svg" 
                alt="chat icon"
                class="w-[23.33px] h-[20.71px] mt-[4.67px] ml-[2.33px]"
              />
            </div>
            
            <!-- Paragraph -->
            <p class="font-manrope font-normal text-base leading-7 tracking-[-0.006em] text-[#71717A]">
              Have a question or need clarification? Don't hesitate to reach out. Our team is here to help and we're ready to provide all the answers you need.
            </p>
          </div>
        </div>

        <!-- Questions Container: width: 1200, gap: 32px -->
        <div class="w-full max-w-[1200px] flex flex-col gap-8">
          
          <!-- Question Items -->
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="flex flex-col w-full"
          >
            <!-- Question Row -->
            <div 
              class="flex items-center gap-8 cursor-pointer py-2 transition-opacity hover:opacity-80"
              @click="toggleFaq(index)"
            >
              <!-- Number: width: 72 -->
              <span class="w-[72px] font-manrope font-bold text-sm leading-5 tracking-[-0.006em] text-[#00D474] flex-shrink-0">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              
              <!-- Question Text -->
              <h3 class="flex-1 font-manrope font-medium text-[20px] leading-6 tracking-[-0.015em] text-[#111827]">
                {{ faq.question }}
              </h3>
              
              <!-- Plus/Cross Icon: width: 24, height: 24 -->
              <img 
                :src="openIndex === index ? '/svg/cross.svg' : '/svg/plus.svg'"
                alt="toggle icon"
                class="w-6 h-6 flex-shrink-0 transition-transform"
              />
            </div>

            <!-- Answer (conditionally rendered) -->
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              leave-active-class="transition-all duration-300 ease-in"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div v-if="openIndex === index" class="mt-10 ml-[104px] max-w-[995px]">
                <p class="font-manrope font-normal text-base leading-7 tracking-[-0.006em] text-[#51515E]">
                  {{ faq.answer }}
                </p>
              </div>
            </transition>

            <!-- Divider (except for last item) -->
            <div v-if="index < faqs.length - 1" class="w-full h-px bg-[#E5E7EB] mt-8"></div>
          </div>
        </div>

      </div>
    </div>

    <!-- Spacing before footer: height 211px -->
    <div class="h-[211px]"></div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Import components
import HeaderLoggedIn from '@/components/HeaderLoggedIn.vue'
import Footer from '@/components/Footer.vue'

// FAQ Data
const faqs = ref([
  {
    question: 'Does Beam fully support popular integrations?',
    answer: 'Yes, Beam integrates seamlessly with a variety of popular tools and platforms, including CRM systems, marketing software, and payment gateways. Our flexible options let you connect Beam with your existing tools.'
  },
  {
    question: 'Is Beam completely optimized for mobile and desktop?',
    answer: 'Absolutely! Beam is fully responsive and optimized for both mobile and desktop experiences, ensuring smooth performance across all devices.'
  },
  {
    question: 'How effectively does Beam protect my data?',
    answer: 'Beam uses industry-standard encryption and security protocols to protect your data. We implement regular security audits and comply with international data protection regulations.'
  },
  {
    question: 'What flexible pricing options does Beam offer?',
    answer: 'Beam offers various pricing plans to suit different needs, from individual users to enterprise solutions. Contact our sales team for custom pricing options tailored to your requirements.'
  }
])

// Track which FAQ is open
const openIndex = ref<number | null>(0) // First item open by default

// Toggle FAQ
const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

.font-manrope {
  font-family: 'Manrope', sans-serif;
}
</style>