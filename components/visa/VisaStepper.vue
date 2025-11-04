<template>
  <div class="w-full flex items-center justify-center mb-8">
    <div class="flex items-start justify-center" style="width: 600px; height: 64px;">
      
      <!-- Step 1 -->
      <div class="flex flex-col items-center gap-1" style="width: 162px; height: 64px;">
        <div 
          class="w-8 h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center" 
          :style="{
            borderColor: currentStep >= 1 ? '#1ECE84' : '#E5E7EB',
            backgroundColor: currentStep > 1 ? '#1ECE84' : 'transparent'
          }"
        >
          <svg v-if="currentStep > 1" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <div v-else class="w-3 h-3 rounded-full" :style="{ backgroundColor: currentStep === 1 ? '#1ECE84' : '#E5E7EB' }"></div>
        </div>
        <span style="font-family: Manrope, sans-serif; font-weight: 700; font-size: 20px; line-height: 28px; text-align: center; color: #0B3947;">
          Trip info
        </span>
      </div>

      <!-- Connector 1 -->
      <div class="flex items-center" style="width: 144.75px; margin-top: 16px;">
        <div style="width: 144.75px; height: 1.35px; border-radius: 2px;" :style="{ background: currentStep >= 2 ? '#1ECE84' : '#E5E7EB' }"></div>
      </div>

      <!-- Step 2 -->
      <div class="flex flex-col items-center gap-1" style="width: 162px; height: 64px;">
        <div 
          class="w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center" 
          :style="{ borderColor: currentStep >= 2 ? '#1ECE84' : '#E5E7EB' }"
        >
          <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: currentStep >= 2 ? '#1ECE84' : '#E5E7EB' }"></div>
        </div>
        <span style="font-family: Manrope, sans-serif; font-weight: 700; font-size: 20px; line-height: 28px; text-align: center; color: #0B3947;">
          Your info
        </span>
      </div>

      <!-- Connector 2 -->
      <div class="flex items-center" style="width: 144.75px; margin-top: 16px;">
        <div style="width: 144.75px; height: 1.35px; background: #E5E7EB; border-radius: 2px;"></div>
      </div>

      <!-- Step 3 -->
      <div class="flex flex-col items-center gap-1" style="width: 162px; height: 64px;">
        <div class="w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center" style="border-color: #E5E7EB;">
          <div class="w-3 h-3 rounded-full" style="background-color: #E5E7EB;"></div>
        </div>
        <span style="font-family: Manrope, sans-serif; font-weight: 700; font-size: 20px; line-height: 28px; text-align: center; color: #0B3947;">
          Checkout
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