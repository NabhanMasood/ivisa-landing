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
            <h1 class="font-manrope font-bold text-3xl leading-9 lg:text-[48px] lg:leading-[64px] tracking-[-0.015em] text-[#111827] max-w-[550px]">
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
            <p class="font-manrope font-normal text-sm leading-6 lg:text-base lg:leading-7 tracking-[-0.006em] text-[#71717A]">
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
    question: 'Is it safe to enter my passport and personal data on your website?',
    answer: 'Yes, it is completely secure. We use bank-level 256-bit SSL encryption for all data transmission. Your passport details are only used for government application submission and are never stored on our servers after the process is complete. We are fully compliant with global data protection laws (including GDPR)'
  },
  {
    question: 'Are you affiliated with the government?',
    answer: 'No, we are a private, independent visa processing agency. We expedite and simplify the application process on your behalf. We charge a service fee for our expert review, 24/7 support, and error protection, a service not provided by government sites.'
  },
  {
    question: 'How can I verify the status of my application?',
    answer: "Once submitted, you'll receive a unique tracking ID and a link to your personal dashboard. You can check the real-time status (e.g., Under Expert Review, Submitted to Government, Approved) 24/7 on your account."
  },
  {
    question: "Why is the total cost higher than the government's fee?",
    answer: 'The price shown includes two parts: the non-negotiable Government Fee and our Service Fee. Our fee covers the convenience, 24/7 support, mobile-friendly forms, and, most importantly, our Error Protection Guarantee, ensuring your time and money aren\'t wasted on unnecessary rejections.'
  },
  {
    question: 'What is your refund policy for rejected applications?',
    answer: "We are committed to fairness. If your application is rejected due to a demonstrable mistake made by our review team in processing correct data, we will issue a full refund of our service fee. Rejections based on the applicant's ineligibility (e.g., criminal history, insufficient funds) are non-refundable, as our work was successfully performed."
  },
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