<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { DropdownMenuRoot, type DropdownMenuRootProps, type DropdownMenuRootEmits } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'

const props = withDefaults(defineProps<DropdownMenuRootProps>(), {
  modal: false, // Disable scroll lock by default
})

const emits = defineEmits<DropdownMenuRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>