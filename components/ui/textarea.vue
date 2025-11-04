<template>
  <textarea
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :rows="rows"
    :class="[
      'w-full px-4 py-2.5 border border-gray-300 rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      'transition-colors duration-200 resize-none',
      customClass
    ]"
  ></textarea>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 5
  },
  customClass: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>