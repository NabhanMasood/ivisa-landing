<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="checked"
    :class="[
      'peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-white',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      checked ? 'bg-[#1ECE84] border-[#1ECE84] text-white' : 'bg-white',
      className
    ]"
    :disabled="disabled"
    @click="toggle"
  >
    <svg
      v-if="checked"
      class="h-4 w-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="3"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  checked?: boolean
  disabled?: boolean
  class?: string
}>()

const emit = defineEmits<{
  'update:checked': [value: boolean]
}>()

const className = computed(() => props.class || '')

const toggle = () => {
  if (!props.disabled) {
    emit('update:checked', !props.checked)
  }
}
</script>