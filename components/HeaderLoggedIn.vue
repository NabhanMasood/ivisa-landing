<!-- components/HeaderLoggedIn.vue -->
<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
    <div class="container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        <!-- Logo Section -->
        <div class="flex items-center flex-shrink-0">
          <NuxtLink to="/" class="inline-flex items-center">
            <img 
              src="/logos/logo.png" 
              alt="VISA123" 
              class="w-[100px] sm:w-[130px] md:w-[161px] lg:w-[180px] h-auto max-h-[40px] sm:max-h-[50px] md:max-h-[60px]"
            />
          </NuxtLink>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-2 sm:gap-4 md:gap-6">
          <!-- Language/Currency Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" class="h-[32px] sm:h-[34px] px-2 sm:px-3 font-normal text-xs sm:text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent">
                <span class="hidden sm:inline">{{ currentLanguage }}</span>
                <span class="sm:hidden">EN</span>
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

       
        </div>
      </div>
    </div>
  </header>
  
  <!-- Spacer to prevent content from going under fixed header -->
  <div class="h-16 sm:h-20"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, User, UserCircle, LayoutDashboard, FileText, LogOut } from 'lucide-vue-next'

// Import Button component
import Button from '@/components/ui/button.vue'

// Import dropdown components
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue'
import DropdownMenuSeparator from '@/components/ui/dropdown-menu/DropdownMenuSeparator.vue'

// Props for user information
interface Props {
  userName?: string
}



const currentLanguage = ref('EN | د.إ AED')

const setLanguage = (lang: string) => {
  if (lang === 'EN') {
    currentLanguage.value = 'EN | د.إ AED'
  } else if (lang === 'AR') {
    currentLanguage.value = 'العربية | د.إ AED'
  }
}

const handleLogout = () => {
  // Add your logout logic here
  console.log('Logging out...')
  navigateTo('/login')
}
</script>