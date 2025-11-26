<template>
  <div
    :class="[
      'animate-pulse rounded-md bg-gray-200',
      {
        'h-4': size === 'sm',
        'h-6': size === 'md',
        'h-8': size === 'lg',
        'h-12': size === 'xl',
        'w-full': !width,
      },
      width,
      className
    ]"
  />
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  width?: string
  className?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  width: undefined,
  className: '',
})
</script>

