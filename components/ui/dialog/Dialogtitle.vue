<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <h2
    :class="[$props.class]"
    style="font-family: Inter; font-weight: 500; font-size: 16px; line-height: 100%; letter-spacing: -0.006em; color: #0B3947; margin-bottom: 4px;"
  >
    <slot />
  </h2>
</template>

<script lang="ts">
export default {
  name: 'DialogTitle'
}
</script>