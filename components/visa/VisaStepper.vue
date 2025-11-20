<template>
  <div class="w-full flex items-center justify-center mb-6 sm:mb-8 px-2 sm:px-4">
    <div class="flex items-start justify-center w-full max-w-[1000px] min-h-[48px] sm:min-h-[64px] overflow-x-auto">
      
      <!-- Step 1: Trip Info -->
      <div class="flex flex-col items-center gap-0.5 sm:gap-1 flex-shrink-0 w-[60px] h-12 sm:w-[120px] sm:h-16">
        <div 
          class="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center" 
          :style="{
            borderColor: currentStep >= 1 ? '#1ECE84' : '#E5E7EB',
            backgroundColor: currentStep > 1 ? '#1ECE84' : 'transparent'
          }"
        >
          <svg v-if="currentStep > 1" class="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <div v-else class="w-2 h-2 sm:w-3 sm:h-3 rounded-full" :style="{ backgroundColor: currentStep === 1 ? '#1ECE84' : '#E5E7EB' }"></div>
        </div>
        <span class="font-bold text-[10px] sm:text-base leading-tight sm:leading-5 text-center text-[#0B3947]" style="font-family: Manrope, sans-serif;">
          <span class="hidden sm:inline">Trip info</span>
          <span class="sm:hidden">Trip</span>
        </span>
      </div>

      <!-- Connector 1 -->
      <div class="flex items-center flex-shrink-0 w-5 mt-3 sm:w-20 sm:mt-4">
        <div class="w-full h-[1.35px] rounded-sm" :style="{ background: currentStep >= 2 ? '#1ECE84' : '#E5E7EB' }"></div>
      </div>

      <!-- Step 2: Your Info (includes personal details and passport) -->
      <div class="flex flex-col items-center gap-0.5 sm:gap-1 flex-shrink-0 w-[60px] h-12 sm:w-[120px] sm:h-16">
        <div 
          class="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center" 
          :style="{
            borderColor: currentStep >= 2 ? '#1ECE84' : '#E5E7EB',
            backgroundColor: currentStep > 3 ? '#1ECE84' : 'transparent'
          }"
        >
          <svg v-if="currentStep > 3" class="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <div v-else class="w-2 h-2 sm:w-3 sm:h-3 rounded-full" :style="{ backgroundColor: currentStep >= 2 && currentStep <= 3 ? '#1ECE84' : '#E5E7EB' }"></div>
        </div>
        <span class="font-bold text-[10px] sm:text-base leading-tight sm:leading-5 text-center text-[#0B3947]" style="font-family: Manrope, sans-serif;">
          <span class="hidden sm:inline">Your info</span>
          <span class="sm:hidden">Info</span>
        </span>
      </div>

      <!-- Connector 2 -->
      <div class="flex items-center flex-shrink-0 w-5 mt-3 sm:w-20 sm:mt-4">
        <div class="w-full h-[1.35px] rounded-sm" :style="{ background: currentStep >= 4 ? '#1ECE84' : '#E5E7EB' }"></div>
      </div>

      <!-- Step 3: Embassy -->
      <div class="flex flex-col items-center gap-0.5 sm:gap-1 flex-shrink-0 w-[60px] h-12 sm:w-[120px] sm:h-16">
        <div 
          class="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center" 
          :style="{
            borderColor: currentStep >= 4 ? '#1ECE84' : '#E5E7EB',
            backgroundColor: currentStep > 4 ? '#1ECE84' : 'transparent'
          }"
        >
          <svg v-if="currentStep > 4" class="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <div v-else class="w-2 h-2 sm:w-3 sm:h-3 rounded-full" :style="{ backgroundColor: currentStep === 4 ? '#1ECE84' : '#E5E7EB' }"></div>
        </div>
        <span class="font-bold text-[10px] sm:text-base leading-tight sm:leading-5 text-center text-[#0B3947]" style="font-family: Manrope, sans-serif;">
          Embassy
        </span>
      </div>

      <!-- Connector 3 -->
      <div class="flex items-center flex-shrink-0 w-5 mt-3 sm:w-20 sm:mt-4">
        <div class="w-full h-[1.35px] rounded-sm" :style="{ background: currentStep >= 5 ? '#1ECE84' : '#E5E7EB' }"></div>
      </div>

      <!-- Step 4: Checkout -->
      <div class="flex flex-col items-center gap-0.5 sm:gap-1 flex-shrink-0 w-[60px] h-12 sm:w-[120px] sm:h-16">
        <div 
          class="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center" 
          :style="{
            borderColor: currentStep >= 5 ? '#1ECE84' : '#E5E7EB',
            backgroundColor: currentStep > 5 ? '#1ECE84' : 'transparent'
          }"
        >
          <svg v-if="currentStep > 5" class="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <div v-else class="w-2 h-2 sm:w-3 sm:h-3 rounded-full" :style="{ backgroundColor: currentStep === 5 ? '#1ECE84' : '#E5E7EB' }"></div>
        </div>
        <span class="font-bold text-[10px] sm:text-base leading-tight sm:leading-5 text-center text-[#0B3947]" style="font-family: Manrope, sans-serif;">
          Checkout
        </span>
      </div>

      <!-- Connector 4 -->
      <div class="flex items-center flex-shrink-0 w-5 mt-3 sm:w-20 sm:mt-4">
        <div class="w-full h-[1.35px] rounded-sm" :style="{ background: currentStep >= 6 ? '#1ECE84' : '#E5E7EB' }"></div>
      </div>

      <!-- Step 5: Review -->
      <div class="flex flex-col items-center gap-0.5 sm:gap-1 flex-shrink-0 w-[60px] h-12 sm:w-[120px] sm:h-16">
        <div 
          class="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center" 
          :style="{
            borderColor: currentStep >= 6 ? '#1ECE84' : '#E5E7EB',
            backgroundColor: 'transparent'
          }"
        >
          <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full" :style="{ backgroundColor: currentStep >= 6 ? '#1ECE84' : '#E5E7EB' }"></div>
        </div>
        <span class="font-bold text-[10px] sm:text-base leading-tight sm:leading-5 text-center text-[#0B3947]" style="font-family: Manrope, sans-serif;">
          Review
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentStep: number
}>()
</script>