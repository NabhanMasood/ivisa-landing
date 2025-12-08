<template>
  <div class="min-h-screen flex flex-col">
    <Header v-if="!hideHeader" :showAuthButtons="showAuthButtons" />
    <main class="flex-1 overflow-x-clip">
      <slot />
    </main>
    <Footer v-if="!hideFooter" />
    <WhatsAppButton />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Hide header on specific routes
const hideHeader = computed(() => {
  return route.path === '/sign-up' || route.path === '/login'
})

// Show/hide auth buttons based on route
const showAuthButtons = computed(() => {
  // Hide auth buttons on additional-info page (or any logged-in pages)
  return route.path !== '/additional-info'
})

// Hide footer on specific routes
const hideFooter = computed(() => {
  return route.path === '/visa-application' || 
         route.path.includes('/visa-') || 
         route.path === '/login' || 
         route.path === '/sign-up' || 
         route.path === '/signup' ||
         route.path === '/additional-info' ||
         route.path.startsWith('/my-account')


})
</script>