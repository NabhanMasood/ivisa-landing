<!-- components/Header.vue -->
<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
    <div class="container mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo Section -->
        <div class="flex items-center">
          <NuxtLink to="/" class="inline-flex items-center">
            <img 
              src="/logos/logo.png" 
              alt="VISA123" 
              style="width: 161px; height: 50px;"

            />
          </NuxtLink>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-20">
          <!-- Language/Currency Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" class="h-[34px] px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent">
                {{ currentLanguage }}
                <ChevronDown class="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-48">
              <DropdownMenuItem @click="setLanguage('EN')" class="cursor-pointer">
                <span class="flex w-full justify-between">
                  <span>English</span>
                  <span class="text-gray-500">AED</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem @click="setLanguage('AR')" class="cursor-pointer">
                <span class="flex w-full justify-between">
                  <span>العربية</span>
                  <span class="text-gray-500">AED</span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- Group Login and Sign Up together -->
          <div class="flex items-center gap-4">
            <!-- Login Button using shadcn Button -->
            <Button 
              variant="ghost" 
              size="sm"
              class="h-[34px] px-4 font-medium text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent"
              @click="handleLogin"
            >
              Login
            </Button>

            <!-- Sign Up Button using shadcn Button with custom styling -->
            <Button 
              size="sm"
              class="!bg-[#1ECE84] hover:!bg-[#1AB876] !text-white !rounded-full !h-[34px] !px-5 !min-w-[95px] !font-medium !border-0"
              @click="handleSignUp"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  </header>
  
  <!-- Spacer to prevent content from going under fixed header -->
  <div class="h-20"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

// Import Button component
import Button from '@/components/ui/button.vue'

// Import dropdown components
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue'

const currentLanguage = ref('EN | د.إ AED')

const setLanguage = (lang: string) => {
  if (lang === 'EN') {
    currentLanguage.value = 'EN | د.إ AED'
  } else if (lang === 'AR') {
    currentLanguage.value = 'العربية | د.إ AED'
  }
}

const handleLogin = () => {
  navigateTo('/login')
}

const handleSignUp = () => {
  navigateTo('/signup')
}
</script>