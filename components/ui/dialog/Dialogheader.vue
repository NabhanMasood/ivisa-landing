<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="['mb-6', $props.class]">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'DialogHeader'
}
</script>