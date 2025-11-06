<template>
  <SelectTrigger
    :class="[
      'flex items-center justify-between w-full border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50',
      variant === 'form' ? 'h-9 px-3 py-2 text-sm' : ''
    ]"
    :style="variant === 'form' ? 'border-color: #E2E8F0; font-family: Inter; font-weight: 400; font-size: 14px; line-height: 20px; letter-spacing: 0; color: #6B7280;' : ''"
    v-bind="$attrs"
  >
    <slot />
    <svg v-if="variant === 'form'" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-2">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </SelectTrigger>
</template>

<script setup lang="ts">
import { SelectTrigger } from 'radix-vue'

defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})
</script>