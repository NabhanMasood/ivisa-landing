<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="overflow-x-hidden">
      <slot />
    </main>
    <Footer v-if="!hideFooter" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Hide footer on specific routes
const hideFooter = computed(() => {
  return route.path === '/visa-application' || route.path.includes('/visa-')
})
</script>