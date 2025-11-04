<template>
  <label
    :for="htmlFor"
    :class="[
      'text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      customClass
    ]"
  >
    <slot />
  </label>
</template>

<script setup>
defineProps({
  htmlFor: {
    type: String,
    default: undefined
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>