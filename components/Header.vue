<!-- components/Header.vue -->
<template>
  <header v-if="isMyAccountRoute" class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
    <div class="px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left Section - Logo and Search Bar -->
        <div class="flex items-center gap-4">
          <!-- Logo Section -->
          <div class="flex items-center flex-shrink-0">
            <NuxtLink to="/my-account" class="inline-flex items-center">
              <img 
                src="/logos/logo.png" 
                alt="VISA123" 
                style="width: 161.05px; height: 50px;"
              />
            </NuxtLink>
          </div>

          <!-- Vertical Divider -->
          <div class="bg-gray-300" style="width: 1px; height: 16px;"></div>

          <!-- Search Bar -->
          <div class="relative" style="width: 384px;">
            <input
              type="text"
              placeholder="Search..."
              class="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1ECE84] focus:border-transparent text-sm pl-4 pr-12"
              style="height: 36px;"
              v-model="searchQuery"
            />
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-gray-50 rounded" style="width: 30px; height: 24px; border-radius: 4px; padding: 4px;">
              <img 
                src="/svg/my-account/search-bar.svg" 
                alt="Search" 
                style="width: 100%; height: 100%;"
              />
            </div>
          </div>
        </div>

        <!-- Right Section - Currency, Notifications & Avatar -->
        <div class="flex items-center flex-shrink-0" style="gap: 10px;">
          <!-- Currency Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" class="h-[34px] px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent">
                {{ selectedCurrency.code }}
                <ChevronDown class="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56 z-[110]">
              <!-- Search Input -->
              <div class="px-2 py-2 border-b">
                <input
                  v-model="currencySearch"
                  type="text"
                  placeholder="Search currency..."
                  class="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1ECE84] focus:border-transparent"
                  @click.stop
                />
              </div>
              
              <!-- Currency List -->
              <div class="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem 
                  v-for="currency in filteredCurrencies" 
                  :key="currency.code"
                  @click="handleCurrencyChange(currency)"
                  class="cursor-pointer"
                >
                  <span class="flex w-full justify-between items-center">
                    <span class="flex items-center gap-2">
                      <span v-if="currency.symbol" class="font-medium min-w-[24px]">{{ currency.symbol }}</span>
                      <span>{{ currency.name }}</span>
                    </span>
                    <span class="text-gray-500 text-sm font-medium">{{ currency.code }}</span>
                  </span>
                </DropdownMenuItem>
                
                <!-- No results message -->
                <div v-if="filteredCurrencies.length === 0" class="px-3 py-2 text-sm text-gray-500 text-center">
                  No currencies found
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- Vertical Divider -->
          <div class="bg-gray-300" style="width: 1px; height: 16px;"></div>

          <!-- Notification Bell -->
          <button class="relative rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center" style="width: 36px; height: 36px;">
            <img 
              src="/svg/my-account/bell.svg" 
              alt="Notifications" 
              class="w-5 h-5"
            />
            <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- Vertical Divider -->
          <div class="bg-gray-300" style="width: 1px; height: 16px;"></div>

          <!-- User Avatar -->
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button class="rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center" style="width: 36px; height: 36px;">
                <img 
                  src="/svg/my-account/user.svg" 
                  alt="User" 
                  class="w-9 h-9 rounded-full"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56">
              <DropdownMenuItem class="cursor-default">
                <div class="flex flex-col">
                  <span class="font-medium">{{ userName }}</span>
                  <span class="text-xs text-gray-500">{{ userEmail }}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem class="cursor-pointer" @click="navigateTo('/my-account')">
                <span>My Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem class="cursor-pointer text-red-600" @click="handleLogout">
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </header>

  <!-- Original Header (for other routes) -->
  <header v-else class="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200">
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
        <div class="flex items-center" :class="isAuthenticated ? 'gap-6' : 'gap-20'">
          <!-- Currency & Language Dropdown -->
          <div class="flex items-center gap-4">
            <!-- Currency Dropdown -->
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" class="h-[34px] px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent">
                  {{ selectedCurrency.code }}
                  <ChevronDown class="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-56 z-[110]">
                <!-- Search Input -->
                <div class="px-2 py-2 border-b">
                  <input
                    v-model="currencySearch"
                    type="text"
                    placeholder="Search currency..."
                    class="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1ECE84] focus:border-transparent"
                    @click.stop
                  />
                </div>
                
                <!-- Currency List -->
                <div class="max-h-[300px] overflow-y-auto">
                  <DropdownMenuItem 
                    v-for="currency in filteredCurrencies" 
                    :key="currency.code"
                    @click="handleCurrencyChange(currency)"
                    class="cursor-pointer"
                  >
                    <span class="flex w-full justify-between items-center">
                      <span class="flex items-center gap-2">
                        <span v-if="currency.symbol" class="font-medium min-w-[24px]">{{ currency.symbol }}</span>
                        <span>{{ currency.name }}</span>
                      </span>
                      <span class="text-gray-500 text-sm font-medium">{{ currency.code }}</span>
                    </span>
                  </DropdownMenuItem>
                  
                  <!-- No results message -->
                  <div v-if="filteredCurrencies.length === 0" class="px-3 py-2 text-sm text-gray-500 text-center">
                    No currencies found
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

   
          </div>

          <!-- Show Login/SignUp if NOT authenticated -->
          <div v-if="!isAuthenticated" class="flex items-center gap-4">
            <!-- Login Button -->
            <Button 
              variant="ghost" 
              size="sm"
              class="h-[34px] px-4 font-medium text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent"
              @click="handleLogin"
            >
              Login
            </Button>

            <!-- Sign Up Button -->
            <Button 
              size="sm"
              class="!bg-[#1ECE84] hover:!bg-[#1AB876] !text-white !rounded-full !h-[34px] !px-5 !min-w-[95px] !font-medium !border-0"
              @click="handleSignUp"
            >
              Sign Up
            </Button>
          </div>

          <!-- Show User Menu if authenticated -->
          <div v-else class="flex items-center gap-4">
            <!-- My Account Button -->
            <Button 
              variant="ghost" 
              size="sm"
              class="h-[34px] px-4 font-medium text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent"
              @click="navigateTo('/my-account')"
            >
              My Account
            </Button>

            <!-- User Dropdown -->
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button class="rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center" style="width: 36px; height: 36px;">
                  <img 
                    src="/svg/my-account/user.svg" 
                    alt="User" 
                    class="w-9 h-9 rounded-full"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-56 z-[110]">
                <DropdownMenuItem class="cursor-default">
                  <div class="flex flex-col">
                    <span class="font-medium">{{ userName }}</span>
                    <span class="text-xs text-gray-500">{{ userEmail }}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer" @click="navigateTo('/my-account/my-orders')">
                  <span>My Orders</span>
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer text-red-600" @click="handleLogout">
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  </header>
  
  <!-- Spacer to prevent content from going under fixed header -->
  <div :class="isMyAccountRoute ? 'h-16' : 'h-20'"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue'

// Get current route
const route = useRoute()
const router = useRouter()

// Currency management
const { 
  selectedCurrency, 
  availableCurrencies, 
  setCurrency,
  initializeRates 
} = useCurrency()

// Initialize currency rates on component mount
onMounted(async () => {
  await initializeRates()
})

// Currency search
const currencySearch = ref('')

// Filtered currencies based on search
const filteredCurrencies = computed(() => {
  if (!currencySearch.value) {
    return availableCurrencies.value
  }
  
  const search = currencySearch.value.toLowerCase()
  return availableCurrencies.value.filter(currency => 
    currency.code.toLowerCase().includes(search) ||
    currency.name.toLowerCase().includes(search)
  )
})

const handleCurrencyChange = (currency: any) => {
  setCurrency(currency)
  currencySearch.value = '' // Clear search after selection
}

// Check authentication
const authToken = useCookie('auth_token')
const adminInfo = useCookie('admin_info')

const isAuthenticated = computed(() => {
  return !!(authToken.value && adminInfo.value)
})

const userName = computed(() => {
  if (!adminInfo.value) return ''
  try {
    const info = typeof adminInfo.value === 'string' 
      ? JSON.parse(adminInfo.value) 
      : adminInfo.value
    return info.fullName || 'User'
  } catch {
    return 'User'
  }
})

const userEmail = computed(() => {
  if (!adminInfo.value) return ''
  try {
    const info = typeof adminInfo.value === 'string' 
      ? JSON.parse(adminInfo.value) 
      : adminInfo.value
    return info.email || ''
  } catch {
    return ''
  }
})

// Check if current route is a my-account route
const isMyAccountRoute = computed(() => {
  return route.path.startsWith('/my-account')
})

// Search query for my-account header
const searchQuery = ref('')

// Language for original header
const currentLanguage = ref('EN')

const setLanguage = (lang: string) => {
  if (lang === 'EN') {
    currentLanguage.value = 'EN'
  } else if (lang === 'AR') {
    currentLanguage.value = 'العربية'
  }
}

const handleLogin = () => {
  navigateTo('/login')
}

const handleSignUp = () => {
  navigateTo('/sign-up')
}

const handleLogout = () => {
  // Clear cookies
  authToken.value = null
  adminInfo.value = null
  
  // Redirect to home
  router.push('/')
}
</script>