<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <p
    :class="[$props.class]"
    style="font-family: Inter; font-weight: 400; font-size: 14px; line-height: 20px; letter-spacing: 0; color: #64748B;"
  >
    <slot />
  </p>
</template>

<script lang="ts">
export default {
  name: 'DialogDescription'
}
</script>