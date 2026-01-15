<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-4">
    <div class="text-center">
      <!-- Success Icon -->
      <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <h1 class="text-xl font-semibold text-gray-700 mb-2">Payment Complete</h1>
      <p class="text-gray-400">You can close this window.</p>
    </div>
  </div>
</template>

<script setup>
// Disable default layout - show just the simple message
definePageMeta({
  layout: false
});
</script>
