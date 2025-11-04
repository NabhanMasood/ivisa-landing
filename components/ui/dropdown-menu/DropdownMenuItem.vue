<template>
  <DropdownMenuItem
    v-bind="forwarded"
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
      'focus:bg-slate-100 focus:text-slate-900',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      props.class
    )"
  >
    <slot />
  </DropdownMenuItem>
</template>

<script setup lang="ts">
import {
  DropdownMenuItem,
  useForwardPropsEmits,
  type DropdownMenuItemEmits,
  type DropdownMenuItemProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<
  DropdownMenuItemProps & {
    class?: string
    inset?: boolean
  }
>()

const emits = defineEmits<DropdownMenuItemEmits>()

const forwarded = useForwardPropsEmits(
  (() => {
    const { class: _, inset: __, ...rest } = props
    return rest
  })(),
  emits
)
</script>