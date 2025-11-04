<template>
  <div :class="badgeVariants({ variant, class: customClass })">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  customClass: ''
})

const badgeVariants = computed(() => {
  return ({ variant, class: customClass }: { variant?: string; class?: string }) => {
    const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
    
    const variants: Record<string, string> = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80'
    }
    
    return `${base} ${variants[variant || 'default']} ${customClass || ''}`
  }
})
</script>