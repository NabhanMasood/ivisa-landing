<template>
  <div
    :class="separatorClasses"
    :data-orientation="orientation"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  class: {
    type: String,
    default: ''
  }
})

const separatorClasses = computed(() => {
  const base = 'shrink-0 bg-gray-200'
  const orientationClasses = {
    horizontal: 'h-px w-full',
    vertical: 'h-full w-px'
  }
  
  return `${base} ${orientationClasses[props.orientation]} ${props.class}`
})
</script>