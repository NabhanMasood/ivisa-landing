<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="['p-8', $props.class]">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'DialogContent'
}
</script>