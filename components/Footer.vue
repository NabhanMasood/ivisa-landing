<!-- components/Footer.vue -->
<template>
  <footer class="w-full bg-gray-50 border-t border-gray-200 mt-auto">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="py-6 sm:py-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <!-- Left Section - Navigation Links using shadcn Buttons -->
          <div class="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
            <Button 
              variant="link" 
              class="!p-0 !h-auto !font-medium !text-gray-900 hover:!text-gray-700 !text-sm sm:!text-base"
              @click="() => navigateTo('/')"
            >
              Home
            </Button>
          
            <Button 
              variant="link"
              class="!p-0 !h-auto !font-normal !text-gray-700 hover:!text-gray-900 !text-sm sm:!text-base"
              @click="() => navigateTo('/about-us')"
            >
              About us
            </Button>
            <Button 
              variant="link"
              class="!p-0 !h-auto !font-normal !text-gray-700 hover:!text-gray-900 !text-sm sm:!text-base"
              @click="() => navigateTo('/contact-us')"
            >
              Contact us
            </Button>
            
            <!-- Email button moved here for mobile to stay on same line -->
            <Button 
              variant="link"
              class="!p-0 !h-auto !font-normal !text-gray-700 hover:!text-gray-900 !text-sm sm:!text-base whitespace-nowrap sm:hidden"
              @click="handleEmailClick"
            >
              Email us
            </Button>
          </div>

          <!-- Right Section - Email using shadcn Button (desktop only) -->
          <Button 
            variant="link"
            class="!p-0 !h-auto !font-normal !text-gray-700 hover:!text-gray-900 !text-sm sm:!text-base whitespace-nowrap hidden sm:inline-flex"
            @click="handleEmailClick"
          >
            opportunity@visa123.co.uk
          </Button>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-200 py-3 sm:py-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <!-- Copyright -->
          <div class="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            © 2025 All rights Reserved.
          </div>

          <!-- Social Links using shadcn Buttons with Custom SVGs -->
          <div class="flex items-center gap-3 sm:gap-4">
            <!-- LinkedIn -->
            <Button
              variant="ghost"
              size="icon"
              class="!h-8 !w-8 !text-gray-500 hover:!text-gray-700"
              @click="handleLinkedInClick"
            >
              <!-- Option 1: Using img tag (simplest) -->
              <img 
                src="/svg/linkedin.svg" 
                alt="LinkedIn"
                class="h-4 w-4"
              />
            </Button>

            <!-- Messages/Email -->
            <Button
              variant="ghost"
              size="icon"
              class="!h-8 !w-8 !text-gray-500 hover:!text-gray-700"
              @click="handleEmailClick"
            >
              <!-- Option 1: Using img tag (simplest) -->
              <img 
                src="/svg/messages.svg" 
                alt="Email"
                class="h-4 w-4"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button.vue'

// navigateTo is auto-imported in Nuxt, no need to declare it

// Handle email click
const handleEmailClick = () => {
  if (process.client) {
    window.location.href = 'mailto:opportunity@visa123.co.uk'
  }
}

// Handle LinkedIn click
const handleLinkedInClick = () => {
  if (process.client) {
    window.open('https://linkedin.com', '_blank')
  }
}
</script>

<style scoped>
/* Optional: Add styles to ensure SVGs inherit colors properly */
.social-icon-button img {
  filter: brightness(0) saturate(100%) invert(44%) sepia(0%) saturate(0%) hue-rotate(189deg) brightness(95%) contrast(95%);
  transition: filter 0.2s ease;
}

.social-icon-button:hover img {
  filter: brightness(0) saturate(100%) invert(28%) sepia(0%) saturate(0%) hue-rotate(189deg) brightness(95%) contrast(95%);
}
</style>