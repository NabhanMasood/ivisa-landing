<template>
  <label
    :for="htmlFor"
    :class="computedClasses"
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  htmlFor: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  // Support legacy customClass prop for backward compatibility
  customClass: {
    type: String,
    default: ''
  }
})

// Merge both class and customClass for backward compatibility
const computedClasses = computed(() => {
  return cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    props.class,
    props.customClass
  )
})
</script>
