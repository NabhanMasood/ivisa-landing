<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :type="type"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :readonly="readonly"
    :class="[
      'w-full px-4 py-2.5 border border-gray-300 rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      'readonly:bg-gray-50 readonly:cursor-not-allowed',
      'transition-colors duration-200',
      customClass
    ]"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
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
  readonly: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>