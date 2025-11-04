<template>
  <SelectRoot v-model="modelValue" v-bind="$attrs">
    <slot />
  </SelectRoot>
</template>

<script setup lang="ts">
import { SelectRoot } from 'radix-vue'

const modelValue = defineModel()
</script>
