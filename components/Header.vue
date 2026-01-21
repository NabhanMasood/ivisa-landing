<!-- components/Header.vue -->
<template>
  <header v-if="isMyAccountRoute" class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200" style="cursor: url('/cursor/cursor-diagonal.png') 2 2, auto !important;">
    <div class="px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- Left Section - Logo and Search Bar -->
        <div class="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
          <!-- Logo Section -->
          <div class="flex items-center flex-shrink-0">
            <NuxtLink to="/" class="inline-flex items-center">
            <img 
              src="/logos/logo.png" 
              alt="VISA123" 
              class="w-[100px] sm:w-[130px] md:w-[161.05px] h-auto max-h-[40px] sm:max-h-[50px]"
            />
            </NuxtLink>
          </div>

          <!-- Vertical Divider -->
          <div class="bg-gray-300 hidden sm:block" style="width: 1px; height: 16px;"></div>

          <!-- Search Bar -->
          <div class="relative hidden md:block flex-1 max-w-[384px]">
            <input
              type="text"
              placeholder="Search..."
              class="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1ECE84] focus:border-transparent text-sm pl-3 sm:pl-4 pr-10 sm:pr-12"
              style="height: 36px;"
              v-model="searchQuery"
            />
            <div class="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-gray-50 rounded" style="width: 28px; height: 24px; border-radius: 4px; padding: 4px;">
              <img 
                src="/svg/my-account/search-bar.svg" 
                alt="Search" 
                class="w-full h-full"
              />
            </div>
          </div>
        </div>

        <!-- Right Section - Currency, Notifications & Avatar -->
        <div class="flex items-center flex-shrink-0 gap-1 sm:gap-2">
          <!-- Continue Application Button (if draft exists and not on visa-application page) -->
          <Button
            v-if="isAuthenticated && latestDraftApplication && !route.path.includes('/visa-application')"
            @click="continueDraftApplication(latestDraftApplication.id)"
            class="h-[32px] sm:h-[34px] px-3 sm:px-4 text-xs sm:text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity"
            style="background-color: #1ECE84;"
          >
            <span class="hidden sm:inline">Continue Application</span>
            <span class="sm:hidden">Continue</span>
          </Button>

          <!-- Vertical Divider (if Continue button is shown) -->
          <div v-if="isAuthenticated && latestDraftApplication && !route.path.includes('/visa-application')" class="bg-gray-300 hidden sm:block" style="width: 1px; height: 16px;"></div>

          <!-- Currency Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" class="h-[32px] sm:h-[34px] px-2 sm:px-3 font-normal text-xs sm:text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent">
                <span class="hidden sm:inline">{{ selectedCurrency.code }}</span>
                <span class="sm:hidden">{{ selectedCurrency.code }}</span>
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
                    <span>{{ currency.name }}</span>
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
          <div class="bg-gray-300 hidden sm:block" style="width: 1px; height: 16px;"></div>

          <!-- Notification Bell with Dropdown -->
          <DropdownMenu v-if="isAuthenticated" v-model:open="notificationDropdownOpen">
            <DropdownMenuTrigger asChild>
              <button class="relative rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
                <img 
                  src="/svg/my-account/bell.svg" 
                  alt="Notifications" 
                  class="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span 
                  v-if="notificationCount > 0"
                  class="absolute -top-0.5 -right-0.5 flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 min-w-[16px] sm:min-w-[20px] bg-red-500 text-white text-[9px] sm:text-[10px] font-semibold rounded-full border-2 border-white px-0.5"
                >
                  {{ notificationCount > 9 ? '9+' : notificationCount }}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-[calc(100vw-2rem)] sm:w-80 z-[110] max-h-[400px] overflow-y-auto">
              <div class="px-3 py-2 border-b">
                <h3 class="font-semibold text-sm text-gray-900">Notifications</h3>
              </div>
              
              <!-- Loading State -->
              <div v-if="notificationsLoading" class="px-3 py-4 text-center text-sm text-gray-500">
                Loading notifications...
              </div>
              
              <!-- Empty State -->
              <div v-else-if="notificationCount === 0" class="px-3 py-8 text-center">
                <p class="text-sm text-gray-500">No new notifications</p>
              </div>
              
              <!-- Notifications List -->
              <div v-else class="divide-y divide-gray-100">
                <DropdownMenuItem
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="cursor-pointer px-3 py-3 hover:bg-gray-50 focus:bg-gray-50"
                  @click="handleNotificationClick(notification)"
                >
                  <div class="flex flex-col gap-1 w-full">
                    <div class="flex items-start justify-between gap-2">
                      <span class="text-sm font-medium text-gray-900 flex-1">
                        Application #{{ notification.applicationNumber }}
                      </span>
                      <span class="text-xs text-gray-500 whitespace-nowrap">
                        {{ formatNotificationDate(notification.requestedAt) }}
                      </span>
                    </div>
                    <p class="text-xs text-gray-600 line-clamp-2">
                      {{ notification.message }}
                    </p>
                    <span 
                      v-if="notification.type === 'completed'"
                      class="text-xs text-green-600 font-medium mt-1"
                    >
                      Completed
                    </span>
                    <span 
                      v-else
                      class="text-xs text-orange-600 font-medium mt-1"
                    >
                      Action Required
                    </span>
                  </div>
                </DropdownMenuItem>
              </div>
              
              <!-- View All Link -->
              <div v-if="notificationCount > 0" class="px-3 py-2 border-t">
                <DropdownMenuItem 
                  class="cursor-pointer text-center justify-center text-sm text-[#1ECE84] hover:text-[#1AB876]"
                  @click="navigateTo('/my-account/my-orders')"
                >
                  View All Applications
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- Notification Bell (Static for non-authenticated) -->
          <button v-else class="relative rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
            <img 
              src="/svg/my-account/bell.svg" 
              alt="Notifications" 
              class="w-4 h-4 sm:w-5 sm:h-5"
            />
          </button>

          <!-- Vertical Divider -->
          <div class="bg-gray-300 hidden sm:block" style="width: 1px; height: 16px;"></div>

          <!-- User Avatar -->
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button class="rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
                <img 
                  src="/svg/my-account/user.svg" 
                  alt="User" 
                  class="w-7 h-7 sm:w-9 sm:h-9 rounded-full"
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

  <!-- Original Header (for other routes) - UPDATED COMPACT LAYOUT -->
  <header v-else class="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200" style="cursor: url('/cursor/cursor-diagonal.png') 2 2, auto !important;">
    <div class="container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        <!-- Logo Section - Left aligned -->
        <div class="flex items-center flex-shrink-0">
          <NuxtLink to="/" class="inline-flex items-center">
            <img 
              src="/logos/logo.png" 
              alt="VISA123" 
              class="w-[100px] sm:w-[130px] md:w-[161px] lg:w-[180px] h-auto max-h-[40px] sm:max-h-[50px] md:max-h-[60px]"
            />
          </NuxtLink>
        </div>

        <!-- Right Section - Compact grouped items -->
        <div class="flex items-center gap-1 sm:gap-2 lg:gap-3">
          <!-- Navigation Links - Grouped by type -->
          <nav class="hidden lg:flex items-center gap-1">
            <!-- Dropdowns Group -->
            <div class="flex items-center gap-1">
              <!-- Get my visa Dropdown -->
              <DropdownMenu v-model:open="getMyVisaDropdownOpen">
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    class="h-9 px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    Get my visa
                    <ChevronDown class="ml-1 h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" class="w-[600px] p-6 z-[110] bg-white shadow-lg">
                  <!-- Visa Options Grid - Two Columns -->
                  <div class="grid grid-cols-2 gap-4">
                    <!-- Left Column -->
                    <div class="flex flex-col gap-4">
                      <!-- UK Visit Visa / UK ETA -->
                      <div 
                        @click="handleVisaSelect('UK')"
                        class="cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                      >
                        <div class="flex items-start justify-between mb-2">
                          <h3 class="font-semibold text-base text-gray-900">UK ETA</h3>
                          <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Popular</span>
                        </div>
                        <p class="text-sm text-gray-600">Electronic travel authorization</p>
                      </div>

                      <!-- Turkey e-Visa -->
                      <div 
                        @click="handleVisaSelect('Turkey')"
                        class="cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                      >
                        <div class="flex items-start justify-between mb-2">
                          <h3 class="font-semibold text-base text-gray-900">Turkey e-Visa</h3>
                        </div>
                        <p class="text-sm text-gray-600">Fast online visa for Turkey</p>
                      </div>

                      <!-- USA ESTA -->
                      <div 
                        @click="handleVisaSelect('USA')"
                        class="cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                      >
                        <div class="flex items-start justify-between mb-2">
                          <h3 class="font-semibold text-base text-gray-900">USA ESTA</h3>
                        </div>
                        <p class="text-sm text-gray-600">Visa-free travel to USA</p>
                      </div>
                    </div>

                    <!-- Right Column -->
                    <div class="flex flex-col gap-4">
                      <!-- Schengen Visa -->
                      <div 
                        @click="handleVisaSelect('Schengen')"
                        class="cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                      >
                        <div class="flex items-start justify-between mb-2">
                          <h3 class="font-semibold text-base text-gray-900">Schengen Visa</h3>
                          <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Popular</span>
                        </div>
                        <p class="text-sm text-gray-600">Travel to 27 European countries</p>
                      </div>

                      <!-- Morocco eVisa -->
                      <div 
                        @click="handleVisaSelect('Morocco')"
                        class="cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                      >
                        <div class="flex items-start justify-between mb-2">
                          <h3 class="font-semibold text-base text-gray-900">Morocco eVisa</h3>
                        </div>
                        <p class="text-sm text-gray-600">Fast online visa for Morocco</p>
                      </div>

                      <!-- See All Visas -->
                  
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <!-- Resources Dropdown -->
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    class="h-9 px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    Resources
                    <ChevronDown class="ml-1 h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" class="w-56 z-[110]">
                  <DropdownMenuItem 
                    class="cursor-pointer"
                    @click="navigateTo('/guides')"
                  >
                    <span>Guides</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    class="cursor-pointer"
                    @click="navigateTo('/get-visa-updates')"
                  >
                    Get visa updates
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <!-- Solo Links Group -->
            <div class="flex items-center gap-1">
              <!-- Immigration services -->
              <Button 
                variant="ghost" 
                size="sm"
                class="h-9 px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                @click="navigateTo('/contact-us')"
              >
                Immigration services
              </Button>

              <!-- Who we are Link -->
              <Button 
                variant="ghost" 
                size="sm"
                class="h-9 px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                @click="navigateTo('/about-us')"
              >
                Who we are
              </Button>
            </div>
          </nav>

          <!-- Divider between nav and currency (desktop only) -->
          <div class="hidden lg:block h-5 w-px bg-gray-200 mx-1"></div>

          <!-- Currency Dropdown - Compact -->
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                class="h-9 px-3 font-normal text-sm text-gray-700 hover:text-gray-900 border-gray-300 rounded-full"
              >
                <svg class="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke-width="1.5"/>
                  <path stroke-width="1.5" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span>{{ selectedCurrency.code }}</span>
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
                    <span>{{ currency.name }}</span>
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

          <!-- Continue Application Button (if authenticated and draft exists, and not on visa-application page) -->
          <Button
            v-if="isAuthenticated && latestDraftApplication && !route.path.includes('/visa-application')"
            @click="continueDraftApplication(latestDraftApplication.id)"
            class="h-[32px] sm:h-[34px] px-3 sm:px-4 text-xs sm:text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity"
            style="background-color: #1ECE84;"
          >
            <span class="hidden sm:inline">Continue Application</span>
            <span class="sm:hidden">Continue</span>
          </Button>

          <!-- Auth Buttons - Show Login/SignUp if NOT authenticated -->
          <div v-if="!isAuthenticated" class="flex items-center gap-2">
            <!-- Login Button -->
            <Button 
              variant="ghost" 
              size="sm"
              class="h-[32px] sm:h-[34px] px-3 sm:px-4 font-medium text-xs sm:text-sm text-gray-700 hover:text-gray-900 hover:bg-transparent whitespace-nowrap"
              @click="handleLogin"
            >
              Login
            </Button>

            <!-- Sign Up Button -->
            <Button 
              size="sm"
              class="!bg-[#1ECE84] hover:!bg-[#1AB876] !text-white !rounded-full !h-[32px] sm:!h-[34px] !px-3 sm:!px-5 !min-w-[80px] sm:!min-w-[95px] !font-medium !border-0 !text-xs sm:!text-sm whitespace-nowrap"
              @click="handleSignUp"
            >
              Sign Up
            </Button>
          </div>

          <!-- Show User Menu if authenticated -->
          <div v-else class="flex items-center gap-2">
            <!-- My Account Button -->
            <Button 
              variant="ghost" 
              size="sm"
              class="h-9 px-3 font-medium text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md hidden sm:inline-flex"
              @click="navigateTo('/my-account')"
            >
              My Account
            </Button>

            <!-- User Dropdown -->
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button class="rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center w-9 h-9">
                  <img 
                    src="/svg/my-account/user.svg" 
                    alt="User" 
                    class="w-8 h-8 rounded-full"
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

          <!-- Mobile Menu Button -->
          <button 
            class="lg:hidden flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 transition-colors"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="mobileMenuOpen" 
        class="lg:hidden border-t border-gray-200 py-4"
      >
        <nav class="flex flex-col gap-1">
          <!-- Get my visa -->
          <DropdownMenu v-model:open="getMyVisaMobileDropdownOpen">
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                class="w-full justify-start h-10 px-3 font-normal text-sm text-gray-700"
              >
                <span>Get my visa</span>
                <ChevronDown class="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" class="w-[calc(100vw-2rem)] max-w-[600px] p-4 z-[110] bg-white shadow-lg">
              <!-- Visa Options Grid - Two Columns on mobile too -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <!-- UK ETA -->
                <div 
                  @click="handleVisaSelect('UK'); mobileMenuOpen = false"
                  class="cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div class="flex items-start justify-between mb-1">
                    <h3 class="font-semibold text-sm text-gray-900">UK ETA</h3>
                    <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Popular</span>
                  </div>
                  <p class="text-xs text-gray-600">Electronic travel authorization</p>
                </div>

                <!-- Schengen Visa -->
                <div 
                  @click="handleVisaSelect('Schengen'); mobileMenuOpen = false"
                  class="cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div class="flex items-start justify-between mb-1">
                    <h3 class="font-semibold text-sm text-gray-900">Schengen Visa</h3>
                    <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Popular</span>
                  </div>
                  <p class="text-xs text-gray-600">Travel to 27 European countries</p>
                </div>

                <!-- Turkey e-Visa -->
                <div 
                  @click="handleVisaSelect('Turkey'); mobileMenuOpen = false"
                  class="cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div class="flex items-start justify-between mb-1">
                    <h3 class="font-semibold text-sm text-gray-900">Turkey e-Visa</h3>
                  </div>
                  <p class="text-xs text-gray-600">Fast online visa for Turkey</p>
                </div>

                <!-- USA ESTA -->
                <div 
                  @click="handleVisaSelect('USA'); mobileMenuOpen = false"
                  class="cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div class="flex items-start justify-between mb-1">
                    <h3 class="font-semibold text-sm text-gray-900">USA ESTA</h3>
                  </div>
                  <p class="text-xs text-gray-600">Visa-free travel to USA</p>
                </div>

                <!-- Morocco eVisa -->
                <div 
                  @click="handleVisaSelect('Morocco'); mobileMenuOpen = false"
                  class="cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div class="flex items-start justify-between mb-1">
                    <h3 class="font-semibold text-sm text-gray-900">Morocco eVisa</h3>
                  </div>
                  <p class="text-xs text-gray-600">Fast online visa for Morocco</p>
                </div>

                <!-- See All Visas -->
                <div 
                  @click="navigateTo('/visa-application'); mobileMenuOpen = false"
                  class="cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div class="flex items-start justify-between mb-1">
                    <h3 class="font-semibold text-sm text-gray-900">See All Visas</h3>
                  </div>
                  <p class="text-xs text-gray-600">View all available visas</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            class="w-full justify-start h-10 px-3 font-normal text-sm text-gray-700"
            @click="navigateTo('/contact-us'); mobileMenuOpen = false"
          >
            Immigration services
          </Button>

          <Button 
            variant="ghost" 
            class="w-full justify-start h-10 px-3 font-normal text-sm text-gray-700"
            @click="navigateTo('/guides'); mobileMenuOpen = false"
          >
            Guides
          </Button>

          <Button 
            variant="ghost" 
            class="w-full justify-start h-10 px-3 font-normal text-sm text-gray-700"
            @click="navigateTo('/get-visa-updates'); mobileMenuOpen = false"
          >
            Get visa updates
          </Button>

          <Button 
            variant="ghost" 
            class="w-full justify-start h-10 px-3 font-normal text-sm text-gray-700"
            @click="navigateTo('/about-us'); mobileMenuOpen = false"
          >
            Who we are
          </Button>
        </nav>
      </div>
    </div>
  </header>
  
  <!-- Spacer to prevent content from going under fixed header -->
  <div :class="isMyAccountRoute ? 'h-14 sm:h-16' : 'h-16 sm:h-20'"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue'
import { useNotifications } from '@/composables/useNotifications'
import { useCountriesApi, type Country } from '@/composables/useCountries'
import { useVisaProductsApi } from '@/composables/useVisaProducts'
import { useVisaApplications } from '@/composables/useVisaApplications'

// Get current route
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Get My Visa dropdown state
const getMyVisaDropdownOpen = ref(false)
const getMyVisaMobileDropdownOpen = ref(false)

// Destination countries for "Get my visa" dropdown
const destinationCountries = ref<Country[]>([])
const destinationCountriesLoading = ref(false)

// API
const { getCountries } = useCountriesApi()
const { getGroupedVisaProductsByCountries } = useVisaProductsApi()
const { getMyApplications } = useVisaApplications()

// Fetch destination countries (uses cached data from plugin)
const fetchDestinationCountries = async () => {
  destinationCountriesLoading.value = true
  try {
    // First get all countries (uses cache from plugin)
    const countriesResponse = await getCountries()
    if (!countriesResponse.success || !countriesResponse.data) {
      return
    }
    
    const allCountries = countriesResponse.data
    
    // Then get countries with visa products (uses cache from plugin)
    const visaProductsResponse = await getGroupedVisaProductsByCountries()
    if (!visaProductsResponse.success || !visaProductsResponse.data) {
      return
    }
    
    // Get country names from visa products
    const visaProductCountryNames = visaProductsResponse.data.map(item => item.country)
    
    // Match with countries table to get logos
    destinationCountries.value = allCountries
      .filter(country => visaProductCountryNames.includes(country.countryName))
      .sort((a, b) => a.countryName.localeCompare(b.countryName))
  } catch (error) {
    console.error('Error fetching destination countries:', error)
  } finally {
    destinationCountriesLoading.value = false
  }
}

// Helper function to get full logo URL
const getFullLogoUrl = (logoUrl: string): string => {
  if (!logoUrl) return ''
  
  // Check if it's already a full URL (Cloudinary)
  if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
    return logoUrl
  }
  
  // Otherwise, construct local URL
  const baseUrl = config.public.apiBase.replace(/\/+$/, '')
  const path = logoUrl.startsWith('/') ? logoUrl : `/${logoUrl}`
  
  return `${baseUrl}${path}`
}

// Handle logo error
const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

// Handle country selection from "Get my visa" dropdown
const handleCountrySelect = (country: Country) => {
  // Navigate to home page with query params to pre-select the country
  navigateTo(`/?toId=${country.id}&to=${encodeURIComponent(country.countryName)}`)
}

// Handle visa selection from "Get my visa" dropdown (new card-based design)
const handleVisaSelect = (visaSlug: string) => {
  // Close the dropdown
  getMyVisaDropdownOpen.value = false
  getMyVisaMobileDropdownOpen.value = false
  mobileMenuOpen.value = false
  
  // Navigate to the travel article page for the selected visa
  navigateTo(`/travel-article/${visaSlug}`)
}

// Fetch destination countries on mount
onMounted(() => {
  if (!isMyAccountRoute.value) {
    fetchDestinationCountries()
  }
})

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

// Notifications
const { 
  notifications, 
  loading: notificationsLoading, 
  unreadCount: notificationCount,
  fetchNotifications,
  initialize: initializeNotifications
} = useNotifications()

// Track notification dropdown open state
const notificationDropdownOpen = ref(false)

// Initialize notifications when authenticated
let notificationCleanup: (() => void) | null = null

const setupNotifications = () => {
  // Cleanup existing interval if any
  if (notificationCleanup) {
    notificationCleanup()
    notificationCleanup = null
  }
  
  if (isAuthenticated.value) {
    const cleanup = initializeNotifications()
    if (cleanup) {
      notificationCleanup = cleanup
    }
  }
}

onMounted(() => {
  setupNotifications()
})

onUnmounted(() => {
  if (notificationCleanup) {
    notificationCleanup()
  }
})

// Watch for authentication changes
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    setupNotifications()
  } else {
    if (notificationCleanup) {
      notificationCleanup()
      notificationCleanup = null
    }
  }
})

// Format notification date
const formatNotificationDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Handle notification click
const handleNotificationClick = (notification: any) => {
  // For completed applications, navigate to order details page
  // For resubmission notifications, navigate to additional info page
  if (notification.type === 'completed') {
    navigateTo(`/my-account/my-orders/${notification.applicationId}`)
  } else {
    navigateTo(`/my-account/additional-info?applicationId=${notification.applicationId}`)
  }
}

// Watch notification dropdown open state to refresh when opened
watch(notificationDropdownOpen, (isOpen) => {
  if (isOpen && isAuthenticated.value) {
    // Refresh notifications when dropdown opens
    fetchNotifications(true)
  }
})

// Watch route changes to refresh notifications when navigating to my-account pages
watch(() => route.path, (newPath) => {
  if (newPath.startsWith('/my-account') && isAuthenticated.value) {
    // Refresh notifications when navigating to my-account pages
    fetchNotifications()
  }
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

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

// Draft application tracking
const draftApplications = ref<any[]>([])
const draftsLoading = ref(false)
const latestDraftApplication = computed(() => {
  if (draftApplications.value.length === 0) return null
  // Return the most recent draft (by ID or createdAt)
  return draftApplications.value.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : a.id
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : b.id
    return dateB - dateA
  })[0]
})

// Fetch draft applications
const fetchDraftApplications = async () => {
  if (!isAuthenticated.value) {
    draftApplications.value = []
    return
  }

  draftsLoading.value = true
  try {
    const response = await getMyApplications()
    if (response.success && response.data?.data) {
      // Filter for draft applications that have progressed past step 1
      // Step 1 is visa product selection - we only show Continue button for step 2+
      draftApplications.value = response.data.data.filter((app: any) => {
        const status = app.status?.toLowerCase()
        if (status !== 'draft') return false

        // Parse draftData if it's a string (JSON)
        let draftData = app.draftData
        if (typeof draftData === 'string') {
          try {
            draftData = JSON.parse(draftData)
          } catch (e) {
            console.warn('Failed to parse draftData:', e)
            draftData = {}
          }
        }

        // Check currentStep from multiple sources
        // Priority: draftData.currentStep > app.currentStep > check for travelers data
        let currentStep = draftData?.currentStep || app.currentStep || 0

        // If currentStep not available, check if travelers have real data (indicates step 2 completed)
        if (!currentStep && app.travelers && Array.isArray(app.travelers) && app.travelers.length > 0) {
          const hasRealTravelerData = app.travelers.some((t: any) =>
            t.firstName || t.lastName || t.email
          )
          if (hasRealTravelerData) {
            currentStep = 2 // At least step 2 was completed
          }
        }

        // Default to 1 if no indicators found
        if (!currentStep) currentStep = 1

        console.log(`📋 Draft ${app.id} - currentStep: ${currentStep}, hasTravelers: ${app.travelers?.length || 0}, draftData:`, draftData)
        return currentStep > 1
      })
      console.log('📋 Draft applications found (step 2+):', draftApplications.value.length)
      if (draftApplications.value.length > 0) {
        console.log('✅ Latest draft:', latestDraftApplication.value)
      }
    } else {
      console.warn('⚠️ No applications data in response:', response)
      draftApplications.value = []
    }
  } catch (error) {
    console.error('❌ Error fetching draft applications:', error)
    draftApplications.value = []
  } finally {
    draftsLoading.value = false
  }
}

// Continue draft application
const continueDraftApplication = (applicationId: number) => {
  router.push(`/visa-application?draftId=${applicationId}`)
}

// Fetch drafts on mount and when authentication changes
onMounted(() => {
  if (isAuthenticated.value) {
    fetchDraftApplications()
  }
})

// Watch for authentication changes
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    fetchDraftApplications()
  } else {
    draftApplications.value = []
  }
})

// Refresh drafts when navigating away from visa-application page
watch(() => route.path, (newPath, oldPath) => {
  // Refresh when navigating TO home page or my-account pages (not visa-application)
  if (isAuthenticated.value && !newPath.includes('/visa-application')) {
    // Only refresh if coming from visa-application or if navigating to relevant pages
    if (oldPath?.includes('/visa-application') || newPath === '/' || newPath.startsWith('/my-account')) {
      console.log('🔄 Refreshing draft applications after route change:', { from: oldPath, to: newPath })
      fetchDraftApplications()
    }
  }
})
</script>

<style scoped>
/* Force custom cursor on all header elements */
header,
header *,
header *::before,
header *::after {
  cursor: url('/cursor/cursor-diagonal.png') 2 2, auto !important;
}

/* Deep selector to target child components */
header :deep(*),
header :deep(*::before),
header :deep(*::after),
header :deep(*:hover),
header :deep(*:focus) {
  cursor: url('/cursor/cursor-diagonal.png') 2 2, auto !important;
}
</style>