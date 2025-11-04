<!-- components/ui/dropdown-menu/DropdownMenuSeparator.vue -->
<template>
  <DropdownMenuPrimitive.Separator
    :class="cn('my-1 h-px bg-gray-200', props.class)"
    v-bind="props"
  />
</template>

<script setup lang="ts">
import { DropdownMenuSeparator as DropdownMenuPrimitive } from 'radix-vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>