<!-- pages/terms-conditions.vue -->
<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <HeaderLoggedIn />

    <!-- Main Container: width: 1200, gap: 121px -->
    <div class="container mx-auto px-6 lg:px-8 pt-8 sm:pt-12">
      <div class="max-w-[1200px] mx-auto flex flex-col gap-[121px]">

        <!-- Tag and Heading: width: 558, height: 110, gap: 12px -->
        <div class="flex flex-col gap-3 max-w-[558px]">
          <!-- Tag: width: 201, height: 34, border-radius: 100px, padding: 5px 15px -->
          <div class="inline-flex items-center gap-2.5 w-fit bg-[#F1F9FC] rounded-full px-[15px] py-[5px] h-[34px]">
            <span class="font-manrope font-bold text-base leading-6 tracking-normal uppercase text-[#374151]">
              TERMS & CONDITIONS
            </span>
          </div>

          <!-- Heading: font-size: 48px, line-height: 64px, letter-spacing: -1.8px -->
          <h1 class="font-manrope font-bold text-[48px] leading-[64px] tracking-[-1.8px] text-[#0B3947]">
            Terms & Conditions
          </h1>
        </div>

        <!-- Content Sections -->
        <div class="flex flex-col gap-12">
          <div 
            v-for="(section, index) in termsData" 
            :key="index"
            class="flex flex-col gap-6"
          >
            <!-- Section Title: font-size: 24px, line-height: 32px -->
            <h2 class="font-manrope font-bold text-[24px] leading-8 tracking-normal text-[#0B3947]">
              {{ section.title }}
            </h2>

            <!-- Section Content: font-size: 16px, line-height: 28px -->
            <p 
              v-if="section.content" 
              class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947]"
            >
              {{ section.content }}
            </p>

            <!-- Subsections (A, B, C points): width: 1200, height: 224, gap: 10px, padding: 0 30px -->
            <div 
            v-if="section.subsections && section.subsections.length > 0"
            class="flex flex-col gap-[10px]"
            >
            <div
                v-for="(subsection, subIndex) in section.subsections"
                :key="subIndex"
                class="flex gap-2 px-[30px]"
            >
                <!-- Label (A, B, C) - ExtraBold 800, positioned to the left -->
                <span class="font-manrope font-extrabold text-base leading-7 tracking-normal text-[#0B3947] flex-shrink-0 w-[20px]">
                {{ subsection.label }}
                </span>
                
                <!-- Content container with title and text -->
                <div class="flex-1">
                <span class="font-manrope text-base leading-7 tracking-normal text-[#0B3947]">
                    <!-- Title - Bold 700 -->
                    <span class="font-bold">{{ subsection.title }}</span>
                    <!-- Content - Regular 400 -->
                    <span class="font-normal"> {{ subsection.content.split('\n\n')[0] }}</span>
                </span>

                <!-- Additional paragraphs if content has multiple paragraphs -->
                <p 
                    v-for="(paragraph, pIndex) in subsection.content.split('\n\n').slice(1)"
                    :key="pIndex"
                    class="font-manrope font-normal text-base leading-7 tracking-normal text-[#0B3947] mt-4"
                >
                    {{ paragraph }}
                </p>
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
import { ref } from 'vue'
import { termsConditionsData } from '@/data/termsConditions'

// Import components
import HeaderLoggedIn from '@/components/HeaderLoggedIn.vue'
import Footer from '@/components/Footer.vue'

// Terms data
const termsData = ref(termsConditionsData)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

.font-manrope {
  font-family: 'Manrope', sans-serif;
}
</style>