<!-- pages/visa/[country].vue -->
<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <HeaderLoggedIn />

            <!-- Hero Section -->
            <section class="relative w-full">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Hero Container: responsive height and margin -->
                <div class="relative w-full max-w-[1200px] h-[550px] sm:h-[500px] lg:h-[554px] mx-auto rounded-xl sm:rounded-2xl overflow-hidden mt-4 sm:mt-6 lg:mt-8">

                <!-- Loading Skeleton -->
                <div v-if="!heroImageLoaded" class="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 animate-pulse">
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shimmer"></div>
                </div>

                <!-- Background Image -->
                <img
                    :src="countryData.heroImage"
                    :alt="countryData.name"
                    class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    :class="heroImageLoaded ? 'opacity-100' : 'opacity-0'"
                    @load="heroImageLoaded = true"
                    fetchpriority="high"
                />

                <!-- Overlay -->
                <div class="absolute inset-0 bg-black/30" :class="heroImageLoaded ? 'opacity-100' : 'opacity-0'"></div>
                
                <!-- Container Content: responsive positioning and layout -->
                <div class="absolute top-4 left-4 sm:top-8 sm:left-6 md:top-12 md:left-8 lg:top-[99px] lg:left-[89px] flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-[54px] w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[1012px]">
                    
                    <!-- Left Section: responsive width and padding -->
                    <div class="w-full lg:w-[585px] flex flex-col gap-4 sm:gap-6 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-[25px] bg-[#68919C80] backdrop-blur-[20px]">
                    <!-- Start your application text: responsive font size -->
                    <h2 class="w-full font-manrope font-bold text-xl sm:text-2xl lg:text-[28px] leading-tight sm:leading-[32px] text-white">
                        Start your application
                    </h2>
                    
                    <!-- Form -->
                    <!-- Error State -->
                    <div v-if="error && !countries.length && !destinationCountries.length" class="flex items-center justify-center py-8">
                      <div class="text-red-200 text-center">
                        <p class="font-medium">{{ error }}</p>
                        <button 
                          @click="fetchAllData" 
                          class="mt-2 text-sm text-white/80 hover:text-white underline"
                        >
                          Try again
                        </button>
                      </div>
                    </div>

                    <!-- Form Fields (shows even while loading if we have cached data) -->
                    <div v-else class="flex flex-col gap-4">
                      <!-- Where are you from (All Countries) -->
                      <div>
                        <label class="font-manrope text-sm font-medium text-white/90 mb-2 block">
                          Where are you from?
                        </label>
                        <Select v-model="selectedFrom" :disabled="isLoading && !countries.length">
                          <SelectTrigger class="!h-12 sm:!h-[50px] !bg-white !rounded-lg !border !border-gray-300">
                            <SelectValue placeholder="Select country">
                              <div class="flex items-center gap-2 pl-4" v-if="selectedFrom">
                                <!-- Logo with fallback -->
                                <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                  <img 
                                    v-if="getCountryLogo(selectedFrom)"
                                    :src="getCountryLogo(selectedFrom)" 
                                    :alt="getCountryName(selectedFrom)"
                                    class="max-w-full max-h-full object-contain"
                                    @error="handleLogoError"
                                  />
                                  <div 
                                    v-else
                                    class="w-6 h-6 rounded border border-gray-200 bg-gray-100 flex items-center justify-center"
                                  >
                                    <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                                    </svg>
                                  </div>
                                </div>
                                <span class="text-gray-700">{{ getCountryName(selectedFrom) }}</span>
                              </div>
                              <span v-else class="text-gray-500 pl-4">Select your country</span>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent class="!rounded-lg !bg-white max-h-[300px] overflow-y-auto">
                            <SelectItem 
                              v-for="country in countries" 
                              :key="country.id" 
                              :value="String(country.id)"
                              class="pl-4"
                            >
                              <div class="flex items-center gap-2">
                                <!-- Logo with fallback -->
                                <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                  <img 
                                    v-if="country.logoUrl"
                                    :src="getFullLogoUrl(country.logoUrl)" 
                                    :alt="country.countryName"
                                    class="max-w-full max-h-full object-contain"
                                    @error="handleLogoError"
                                  />
                                  <div 
                                    v-else
                                    class="w-6 h-6 rounded border border-gray-200 bg-gray-100 flex items-center justify-center"
                                  >
                                    <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                                    </svg>
                                  </div>
                                </div>
                                <span>{{ country.countryName }}</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <!-- Where are you going (Countries with Visa Products) -->
                      <div>
                        <label class="font-manrope text-sm font-medium text-white/90 mb-2 block">
                          Where are you going?
                        </label>
                        <Select v-model="selectedTo" :disabled="isLoading && !destinationCountries.length">
                          <SelectTrigger class="!h-12 sm:!h-[50px] !bg-white !rounded-lg !border !border-gray-300">
                            <SelectValue placeholder="Select destination">
                              <div class="flex items-center gap-2 pl-4" v-if="selectedTo">
                                <!-- Logo with fallback -->
                                <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                  <img 
                                    v-if="getCountryLogo(selectedTo)"
                                    :src="getCountryLogo(selectedTo)" 
                                    :alt="getCountryName(selectedTo)"
                                    class="max-w-full max-h-full object-contain"
                                    @error="handleLogoError"
                                  />
                                  <div 
                                    v-else
                                    class="w-6 h-6 rounded border border-gray-200 bg-gray-100 flex items-center justify-center"
                                  >
                                    <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                                    </svg>
                                  </div>
                                </div>
                                <span class="text-gray-700">{{ getCountryName(selectedTo) }}</span>
                              </div>
                              <span v-else class="text-gray-500 pl-4">Select destination</span>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent class="!rounded-lg !bg-white max-h-[300px] overflow-y-auto">
                            <SelectItem 
                              v-for="country in destinationCountries" 
                              :key="country.id" 
                              :value="String(country.id)"
                              class="pl-4"
                            >
                              <div class="flex items-center gap-2">
                                <!-- Logo with fallback -->
                                <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                  <img 
                                    v-if="country.logoUrl"
                                    :src="getFullLogoUrl(country.logoUrl)" 
                                    :alt="country.countryName"
                                    class="max-w-full max-h-full object-contain"
                                    @error="handleLogoError"
                                  />
                                  <div 
                                    v-else
                                    class="w-6 h-6 rounded border border-gray-200 bg-gray-100 flex items-center justify-center"
                                  >
                                    <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                                    </svg>
                                  </div>
                                </div>
                                <span>{{ country.countryName }}</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <!-- Apply Now Button - responsive -->
                      <button
                        @click="handleApplyNowHero"
                        :disabled="!selectedFrom || !selectedTo || isLoading"
                        class="w-full h-12 sm:h-[50px] bg-[#08D07A] hover:bg-[#06B869] active:scale-98 text-white font-manrope font-semibold text-sm sm:text-base rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>Apply Now!</span>
                      </button>
                    </div>
                    </div>

                    <!-- Right Section: responsive width and spacing -->
                <div class="w-full lg:w-[373px] flex flex-col gap-3 sm:gap-4 lg:gap-5">
                    <!-- Heading -->
                    <div class="w-full">
                        <h1 class="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            Apply now for your {{ countryData.name }}
                        </h1>
                    </div>
                    
                    <!-- Text under heading -->
                    <p class="w-full font-manrope font-medium text-sm sm:text-base lg:text-[20px] leading-relaxed sm:leading-[24px] lg:leading-[26px] text-white">
                        Plan your trip to {{ countryData.name === 'UK ETA' ? 'the UK' : countryData.name === 'US ESTA' ? 'the USA' : countryData.name === 'Turkey e-Visa' ? 'Turkey' : countryData.name === 'Morocco eVisa' ? 'Morocco' : countryData.name }} confidently, easy, online, and optimised for travellers just like you.
                    </p>
                </div>

                </div>
                </div>
            </div>
            </section>


<!-- Streamlined Application Process - Same for all countries -->
<section class="py-8 sm:py-12 lg:py-16 bg-gray-50">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Container: responsive gap -->
    <div class="max-w-[1002px] mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-10">
      
      <!-- Heading: responsive font size -->
      <h2 class="font-manrope font-bold text-2xl sm:text-3xl lg:text-[32px] leading-tight sm:leading-[36px] lg:leading-[40px] tracking-normal text-center text-[#0A3D3F]">
        Streamlined Application Process
      </h2>

      <!-- Frame with steps and cards: responsive gap -->
      <div class="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        
        <!-- Steps Row with Icons and Separators - responsive layout -->
        <div class="flex items-center justify-center flex-wrap gap-2 sm:gap-4 lg:gap-8">
          <!-- Step 1 Icon -->
          <div class="flex flex-col items-center">
            <!-- Numeric Icon: responsive size -->
            <div class="w-10 h-10 sm:w-11 sm:h-11 lg:w-[44px] lg:h-[44px] bg-[#00D474] rounded-full flex items-center justify-center relative shadow-[0_0.93px_1.4px_rgba(26,25,37,0.12),0_1.87px_3.73px_rgba(26,25,37,0.12)]">
              <!-- Number: responsive font size -->
              <span class="font-manrope font-medium text-base sm:text-lg lg:text-[20px] leading-tight lg:leading-[28px] tracking-[-0.02em] text-white text-center">1</span>
            </div>
          </div>

          <!-- Separator: responsive width -->
          <div class="w-12 sm:w-24 md:w-32 lg:w-[182px] h-0 border-t-2 border-[#1ECE84]"></div>

          <!-- Gap after separator - responsive -->
          <div class="w-2 sm:w-4 lg:w-8"></div>

          <!-- Step 2 Icon -->
          <div class="flex flex-col items-center">
            <!-- Numeric Icon: responsive size -->
            <div class="w-10 h-10 sm:w-11 sm:h-11 lg:w-[44px] lg:h-[44px] bg-[#00D474] rounded-full flex items-center justify-center relative shadow-[0_0.93px_1.4px_rgba(26,25,37,0.12),0_1.87px_3.73px_rgba(26,25,37,0.12)]">
              <!-- Number: responsive font size -->
              <span class="font-manrope font-medium text-base sm:text-lg lg:text-[20px] leading-tight lg:leading-[28px] tracking-[-0.02em] text-white text-center">2</span>
            </div>
          </div>

          <!-- Gap before separator - responsive -->
          <div class="w-2 sm:w-4 lg:w-8"></div>

          <!-- Separator: responsive width -->
          <div class="w-12 sm:w-24 md:w-32 lg:w-[182px] h-0 border-t-2 border-[#1ECE84]"></div>

          <!-- Step 3 Icon -->
          <div class="flex flex-col items-center">
            <!-- Numeric Icon: responsive size -->
            <div class="w-10 h-10 sm:w-11 sm:h-11 lg:w-[44px] lg:h-[44px] bg-[#00D474] rounded-full flex items-center justify-center relative shadow-[0_0.93px_1.4px_rgba(26,25,37,0.12),0_1.87px_3.73px_rgba(26,25,37,0.12)]">
              <!-- Number: responsive font size -->
              <span class="font-manrope font-medium text-base sm:text-lg lg:text-[20px] leading-tight lg:leading-[28px] tracking-[-0.02em] text-white text-center">3</span>
            </div>
          </div>
        </div>

        <!-- Cards Container: responsive layout -->
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-[45px] justify-center">
          
          <!-- Card 1: responsive width and height -->
          <div class="w-full sm:w-[280px] lg:w-[304px] min-h-[160px] sm:h-[180px] flex flex-col items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-[#F1F9FC] px-4 sm:px-5 py-5 sm:py-6 lg:py-7 shadow-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)]">
            <!-- Heading: responsive width and font size -->
            <h3 class="w-full sm:w-[264px] font-manrope font-bold text-lg sm:text-xl lg:text-[22px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-[-0.02em] text-center text-[#0B3947]">
              Travel information
            </h3>
            <!-- Subtext: responsive width and font size -->
            <p class="w-full sm:w-[264px] font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-5 tracking-[-0.006em] text-center text-[#0B3947] opacity-70">
              Enter travel dates, purpose, and destination.</p>
          </div>

          <!-- Card 2: responsive width and height -->
          <div class="w-full sm:w-[280px] lg:w-[304px] min-h-[160px] sm:h-[180px] flex flex-col items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-[#F1F9FC] px-4 sm:px-5 py-5 sm:py-6 lg:py-7 shadow-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)]">
            <!-- Heading: responsive width and font size -->
            <h3 class="w-full sm:w-[264px] font-manrope font-bold text-lg sm:text-xl lg:text-[22px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-[-0.02em] text-center text-[#0B3947]">
              Payment process
            </h3>
            <!-- Subtext: responsive width and font size -->
            <p class="w-full sm:w-[264px] font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-5 tracking-[-0.006em] text-center text-[#0B3947] opacity-70">
              Pay the visa fee and government fee through our secure system.</p>
          </div>

          <!-- Card 3: responsive width and height -->
          <div class="w-full sm:w-[280px] lg:w-[304px] min-h-[160px] sm:h-[180px] flex flex-col items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-[#F1F9FC] px-4 sm:px-5 py-5 sm:py-6 lg:py-7 shadow-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)]">
            <!-- Heading: responsive width and font size -->
            <h3 class="w-full sm:w-[264px] font-manrope font-bold text-lg sm:text-xl lg:text-[22px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-[-0.02em] text-center text-[#0B3947]">
              Your details
            </h3>
            <!-- Subtext: responsive width and font size -->
            <p class="w-full sm:w-[264px] font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-5 tracking-[-0.006em] text-center text-[#0B3947] opacity-70">
              Upload your documents and fill visa application form.</p>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

<!-- Features Grid - Same for all countries -->
<section class="py-8 sm:py-12 lg:py-16 bg-white">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Main Container -->
    <div class="max-w-[1200px] mx-auto flex flex-col gap-4 sm:gap-6">
      
      <!-- First Row - responsive layout -->
      <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <!-- Feature 1 Card - responsive sizing -->
        <div class="flex-1 flex flex-col bg-[#F1F9FC] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-[35px] gap-3 sm:gap-4">
          <!-- Icon: responsive size -->
          <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-[61.875px] lg:h-[60px]">
            <img src="/svg/protect.svg" alt="visa alerts" class="w-full h-full" />
          </div>
          
          <!-- Text Container -->
          <div class="flex flex-col gap-2">
            <!-- Heading - responsive font size -->
            <h3 class="font-manrope font-semibold text-base sm:text-lg leading-tight sm:leading-6 tracking-[-0.24px] text-[#0A3D3F]">
              Risk-Free Applications
            </h3>
            <!-- Subheading - responsive font size -->
            <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 tracking-[-0.08px] text-[#40444C]">
              If your visa isn't approved, you don't lose a thing. With Visa123's Application Protection, you can apply with total confidence and zero financial risk.
            </p>
          </div>
        </div>

        <!-- Feature 2 Card - responsive sizing -->
        <div class="flex-1 flex flex-col bg-[#F1F9FC] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-[35px] gap-3 sm:gap-4">
          <!-- Icon: responsive size -->
          <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-[61.875px] lg:h-[60px]">
            <img src="/svg/check-2.svg" alt="travel guidance" class="w-full h-full" />
          </div>
          
          <!-- Text Container -->
          <div class="flex flex-col gap-2">
            <!-- Heading - responsive font size -->
            <h3 class="font-manrope font-semibold text-base sm:text-lg leading-tight sm:leading-6 tracking-[-0.24px] text-[#0A3D3F]">
              17+ Years of Experience
            </h3>
            <!-- Subheading - responsive font size -->
            <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 tracking-[-0.08px] text-[#40444C]">
             Our visa experts have been helping travelers navigate global visa processes for over 17 years. Every application is carefully reviewed by our experienced team to ensure accuracy and approval readiness
            </p>
          </div>
        </div>
      </div>

      <!-- Second Row - responsive layout -->
      <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <!-- Feature 3 Card - responsive sizing -->
        <div class="flex-1 flex flex-col bg-[#F1F9FC] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-[35px] gap-3 sm:gap-4">
          <!-- Icon: responsive size -->
          <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-[61.875px] lg:h-[60px]">
            <img src="/svg/doc.svg" alt="visa alerts" class="w-full h-full" />
          </div>
          
          <!-- Text Container -->
          <div class="flex flex-col gap-2">
            <!-- Heading - responsive font size -->
            <h3 class="font-manrope font-semibold text-base sm:text-lg leading-tight sm:leading-6 tracking-[-0.24px] text-[#0A3D3F]">
            60+ Global Destinations
            </h3>
            <!-- Subheading - responsive font size -->
            <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 tracking-[-0.08px] text-[#40444C]">
             Visa123 supports visa processing for more than 60 countries worldwide. Wherever you're headed, our team provides the right guidance to make your travel plans simple and stress-free.
            </p>
          </div>
        </div>

        <!-- Feature 4 Card - responsive sizing -->
        <div class="flex-1 flex flex-col bg-[#F1F9FC] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-[35px] gap-3 sm:gap-4">
          <!-- Icon: responsive size -->
          <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-[61.875px] lg:h-[60px]">
            <img src="/svg/audience.svg" alt="travel guidance" class="w-full h-full" />
          </div>
          
          <!-- Text Container -->
          <div class="flex flex-col gap-2">
            <!-- Heading - responsive font size -->
            <h3 class="font-manrope font-semibold text-base sm:text-lg leading-tight sm:leading-6 tracking-[-0.24px] text-[#0A3D3F]">
             10K+ Successful Consultations
            </h3>
            <!-- Subheading - responsive font size -->
            <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 tracking-[-0.08px] text-[#40444C]">
              Over 10,000 travelers have trusted Visa123 to guide their applications. We tailor each consultation to your unique travel goals and personal circumstances, ensuring the best possible outcome.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
        <!-- Application Form Section -->
        <section class="py-8 sm:py-12 lg:py-16 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Article page wrapper: responsive height and border radius -->
            <div class="max-w-[1200px] min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] mx-auto rounded-2xl sm:rounded-[30px] overflow-hidden">
            <ApplicationForm :country-slug="countrySlug || ''" />
            </div>
            
        </div>
        </section>

<!-- Country-Specific Content Section -->
<section class="py-8 sm:py-12 lg:py-16 bg-white">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- Main Container: responsive gap -->
    <div class="max-w-[1200px] mx-auto flex flex-col gap-8 sm:gap-12 lg:gap-[60px]">
      
      <!-- Country Title - NO GRADIENT LINE -->
      <div class="mb-0">
        <!-- Title: responsive font size -->
        <h1 class="font-manrope font-bold text-xl sm:text-2xl lg:text-[24px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-normal text-[#0B3947]">
          {{ countryData.title }}
        </h1>
      </div>

      <!-- Introduction Section: responsive gap -->
      <div class="flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <!-- Subtext: responsive font size -->
        <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947] w-full">
          {{ countryData.introduction }}
        </p>
      </div>

      <!-- What is the Visa Section: responsive gap -->
      <div class="flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <!-- Heading: responsive font size -->
        <h2 class="font-manrope font-bold text-xl sm:text-2xl lg:text-[24px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-normal text-[#0B3947]">
          {{ countryData.sections.whatIs.title }}
        </h2>
        <!-- Content: responsive font size -->
        <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947] w-full">
          {{ countryData.sections.whatIs.content }}
        </p>
      </div>

      <!-- Who Needs Section (conditional): responsive gap -->
      <div v-if="countryData.sections.whoNeeds" class="flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <!-- Heading: responsive font size -->
        <h2 class="font-manrope font-bold text-xl sm:text-2xl lg:text-[24px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-normal text-[#0B3947]">
          {{ countryData.sections.whoNeeds.title }}
        </h2>
        <!-- Content: responsive font size -->
        <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947] w-full">
          {{ countryData.sections.whoNeeds.content }}
        </p>
      </div>

      <!-- Good to Know Section (conditional): responsive gap -->
      <div v-if="countryData.sections.goodToKnow && countryData.sections.goodToKnow.length > 0" class="flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <!-- Heading: responsive font size -->
        <h2 class="font-manrope font-bold text-xl sm:text-2xl lg:text-[24px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-normal text-[#0B3947]">
          Good to Know
        </h2>
        <!-- Bullets List -->
        <ul class="space-y-2 sm:space-y-3">
          <li
            v-for="(item, index) in countryData.sections.goodToKnow"
            :key="index"
            class="flex items-start gap-2 sm:gap-3"
          >
            <span class="text-[#0B3947] mt-1">•</span>
            <span class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947]">
              {{ item }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Documents Needed Section: responsive gap -->
      <div class="flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <!-- Heading: responsive font size -->
        <h2 class="font-manrope font-bold text-xl sm:text-2xl lg:text-[24px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-normal text-[#0B3947]">
          Documents You'll Need
        </h2>
        <!-- Content: responsive font size -->
        <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947] w-full mb-3 sm:mb-4">
          When applying for a {{ countryData.name }} visa, prepare the following:
        </p>
        <!-- Bullets List -->
        <ul class="space-y-2 sm:space-y-3">
          <li 
            v-for="(doc, index) in countryData.sections.documents" 
            :key="index" 
            class="flex items-start gap-2 sm:gap-3"
          >
            <span class="text-[#0B3947] mt-1">•</span>
            <span class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947]">
              {{ doc }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Types of Visas Section: responsive gap -->
      <div class="flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <!-- Heading: responsive font size -->
        <h2 class="font-manrope font-bold text-xl sm:text-2xl lg:text-[24px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-normal text-[#0B3947]">
          Types of {{ countryData.name }} Visas
        </h2>
        <!-- Content: responsive font size -->
        <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947] w-full mb-3 sm:mb-4">
          Choose the visa that best fits your travel purpose:
        </p>
        <!-- Visa Types List with Bold Names -->
        <ul class="space-y-2 sm:space-y-3">
          <li 
            v-for="(visa, index) in countryData.sections.visaTypes" 
            :key="index" 
            class="flex items-start gap-2 sm:gap-3"
          >
            <span class="text-[#0B3947] mt-1">•</span>
            <span class="font-manrope text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947]">
              <strong class="font-bold">{{ visa.name }}</strong>
              <span class="font-normal"> – {{ visa.description }}</span>
            </span>
          </li>
        </ul>
      </div>

      <!-- How to Apply Section: responsive gap -->
      <div class="flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <!-- Heading: responsive font size -->
        <h2 class="font-manrope font-bold text-xl sm:text-2xl lg:text-[24px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-normal text-[#0B3947]">
          How to Apply for a {{ countryData.name }} Visa
        </h2>
        <!-- Content: responsive font size -->
        <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947] w-full mb-3 sm:mb-4">
          Here's how to start your application through Visa123:
        </p>
        <!-- Numbered List -->
        <ol class="space-y-2 sm:space-y-3">
          <li 
            v-for="(step, index) in countryData.sections.howToApply" 
            :key="index" 
            class="flex items-start gap-2 sm:gap-3"
          >
            <span class="font-manrope font-bold text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 text-[#0B3947]">{{ index + 1 }}.</span>
            <span class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947]">
              {{ step }}
            </span>
          </li>
        </ol>
      </div>

      <!-- Why Apply with Visa123 Section: responsive gap -->
      <div class="flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <!-- Heading: responsive font size -->
        <h2 class="font-manrope font-bold text-xl sm:text-2xl lg:text-[24px] leading-tight sm:leading-[28px] lg:leading-[32px] tracking-normal text-[#0B3947]">
          Why Apply with Visa123
        </h2>
        <!-- Content: responsive font size -->
        <p class="font-manrope font-normal text-sm sm:text-base leading-relaxed sm:leading-6 lg:leading-7 tracking-normal text-[#0B3947] w-full">
          {{ countryData.sections.whyVisa123 }}
        </p>
      </div>

    </div>
  </div>
</section>

    <!-- Spacing before footer - responsive -->
    <div class="h-16 sm:h-24 lg:h-16"></div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCountryData } from '~/data/visaCountries'

// Import components
import HeaderLoggedIn from '@/components/HeaderLoggedIn.vue'
import Footer from '@/components/Footer.vue'
import Button from '@/components/ui/button.vue'
import ApplicationForm from '@/components/ApplicationForm.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import { useCountriesApi, type Country } from '@/composables/useCountries'
import { useVisaProductsApi } from '@/composables/useVisaProducts'
import { getCachedData, CACHE_KEYS } from '@/composables/useCache'

const route = useRoute()

// Get country from route parameter
const countrySlug = computed(() => route.params.country as string || 'turkey')
const countryData = computed(() => getCountryData(countrySlug.value))

// Map route slugs to possible API country names
const getCountryNameFromSlug = (slug: string): string[] => {
  const slugLower = slug.toLowerCase()
  const mappings: Record<string, string[]> = {
    'uk': ['United Kingdom', 'UK', 'U.K.', 'United Kingdom (UK)'],
    'schengen': ['Schengen', 'Europe', 'Schengen Area', 'Schengen Zone'],
    'usa': ['United States', 'USA', 'U.S.A.', 'United States of America', 'US'],
    'turkey': ['Turkey', 'Türkiye', 'Turkiye'],
    'morocco': ['Morocco', 'Moroccan', 'Kingdom of Morocco']
  }
  return mappings[slugLower] || [slug]
}

// State
const countries = ref<Country[]>([])
const destinationCountries = ref<Country[]>([]) // Countries with visa products (with logos)
const selectedFrom = ref<string>('')
const selectedTo = ref<string>('')
const isLoading = ref(false)
const error = ref<string | null>(null)
const heroImageLoaded = ref(false)

// Preload hero image
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: countryData.value.heroImage,
      fetchpriority: 'high'
    }
  ]
})

// API
const { getCountries } = useCountriesApi()
const { getGroupedVisaProductsByCountries } = useVisaProductsApi()
const config = useRuntimeConfig()

// Error handler for logo images
const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.error('❌ Logo failed to load:', img.src)
  img.style.display = 'none'
}

// Helper functions for "From" dropdown (Countries table)
const getCountryName = (countryId: string) => {
  const country = countries.value.find(c => String(c.id) === countryId)
  return country?.countryName || ''
}

const getCountryLogo = (countryId: string): string | undefined => {
  const country = countries.value.find(c => String(c.id) === countryId)
  if (!country?.logoUrl) {
    return undefined
  }
  // logoUrl is defined, but could still be null per the type definition
  // Filter out null explicitly
  const logoUrl = country.logoUrl
  if (logoUrl === null || logoUrl === '') {
    return undefined
  }
  // Now logoUrl is definitely a non-empty string
  return getFullLogoUrl(logoUrl)
}

const getFullLogoUrl = (logoUrl: string): string => {
  if (!logoUrl) {
    console.warn('⚠️ Empty logo URL')
    return ''
  }
  
  // Check if it's already a full URL (Cloudinary)
  if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
    return logoUrl
  }
  
  // Otherwise, construct local URL
  const baseUrl = config.public.apiBase.replace(/\/+$/, '')
  const path = logoUrl.startsWith('/') ? logoUrl : `/${logoUrl}`
  
  const fullUrl = `${baseUrl}${path}`
  console.log('🔗 Constructed URL:', {
    baseUrl,
    logoPath: path,
    fullUrl
  })
  
  return fullUrl
}

// Fetch countries for "From" dropdown - uses cached data from plugin
const fetchCountries = async () => {
  try {
    const response = await getCountries() // Will use cache (populated by plugin)
    
    if (response.success && response.data) {
      return response
    } else {
      throw new Error(response.message || 'Failed to load countries')
    }
  } catch (err) {
    console.error('❌ Error fetching countries:', err)
    throw err
  }
}

// Fetch destination countries for "To" dropdown - uses cached data from plugin
const fetchDestinationCountries = async () => {
  try {
    const response = await getGroupedVisaProductsByCountries() // Will use cache (populated by plugin)
    
    if (response.success && response.data) {
      return response
    } else {
      throw new Error(response.message || 'Failed to load destination countries')
    }
  } catch (err) {
    console.error('❌ Error fetching destination countries:', err)
    throw err
  }
}

// Fetch all data on mount - uses cached data from plugin
const fetchAllData = async () => {
  // Only show loading if we don't have cached data
  const hasCachedCountries = countries.value.length > 0
  const hasCachedDestinations = destinationCountries.value.length > 0
  
  if (!hasCachedCountries || !hasCachedDestinations) {
    isLoading.value = true
  }
  
  error.value = null
  
  try {
    // Fetch countries (will use cache if available, populated by plugin)
    const countriesResponse = await fetchCountries()
    if (countriesResponse.success && countriesResponse.data) {
      countries.value = countriesResponse.data
      console.log('✅ Loaded countries:', countries.value.length)
      
      // Set default "From" value
      const firstCountry = countries.value[0]
      if (firstCountry && !selectedFrom.value) {
        selectedFrom.value = String(firstCountry.id)
      }
    }
    
    // Fetch destination countries (will use cache if available, populated by plugin)
    const destinationsResponse = await fetchDestinationCountries()
    if (destinationsResponse.success && destinationsResponse.data) {
      // Match destination countries with countries table
      const visaProductCountryNames = destinationsResponse.data.map(item => item.country)
      destinationCountries.value = countries.value
        .filter(country => visaProductCountryNames.includes(country.countryName))
        .sort((a, b) => a.countryName.localeCompare(b.countryName))
      
      console.log('✅ Loaded destination countries with logos:', destinationCountries.value.length)
      console.log('📍 Available destinations:', destinationCountries.value.map(c => c.countryName))
      
      // Try to pre-select the country based on route parameter
      const possibleNames = getCountryNameFromSlug(countrySlug.value)
      const matchedCountry = destinationCountries.value.find(country => 
        possibleNames.some(name => 
          country.countryName.toLowerCase() === name.toLowerCase() ||
          country.countryName.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(country.countryName.toLowerCase())
        )
      )
      
      if (matchedCountry) {
        selectedTo.value = String(matchedCountry.id)
        console.log('✅ Pre-selected destination country:', matchedCountry.countryName)
      } else {
        // Set default "To" value
        const firstDestination = destinationCountries.value[0]
        if (firstDestination && !selectedTo.value) {
          selectedTo.value = String(firstDestination.id)
        }
      }
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data'
  } finally {
    isLoading.value = false
  }
}

// Handle Hero form submission
const handleApplyNowHero = () => {
  const fromCountry = getCountryName(selectedFrom.value)
  const toCountry = getCountryName(selectedTo.value)
  
  console.log('🚀 Apply Now Hero:', {
    from: fromCountry,
    fromId: selectedFrom.value,
    to: toCountry,
    toId: selectedTo.value
  })
  
  // Pass both country IDs and names as query parameters
  navigateTo(`/visa-application?fromId=${selectedFrom.value}&toId=${selectedTo.value}&from=${encodeURIComponent(fromCountry)}&to=${encodeURIComponent(toCountry)}`)
}

// Load cached data synchronously on mount to avoid showing skeleton loaders
const loadCachedData = () => {
  // Load countries from cache
  const cachedCountries = getCachedData<Country[]>(CACHE_KEYS.COUNTRIES)
  if (cachedCountries && cachedCountries.length > 0) {
    countries.value = cachedCountries
    console.log('✅ Loaded countries from cache:', countries.value.length)
    
    // Set default "From" value
    const firstCountry = countries.value[0]
    if (firstCountry && !selectedFrom.value) {
      selectedFrom.value = String(firstCountry.id)
    }
  }
  
  // Load destination countries from cache
  const cachedDestinations = getCachedData<any[]>(CACHE_KEYS.DESTINATION_COUNTRIES)
  if (cachedDestinations && cachedDestinations.length > 0 && countries.value.length > 0) {
    // Get country names from visa products
    const visaProductCountryNames = cachedDestinations.map(item => item.country)
    
    // Match with countries table to get logos
    destinationCountries.value = countries.value
      .filter(country => visaProductCountryNames.includes(country.countryName))
      .sort((a, b) => a.countryName.localeCompare(b.countryName))
    
    console.log('✅ Loaded destination countries from cache:', destinationCountries.value.length)
    
    // Try to pre-select the country based on route parameter
    const possibleNames = getCountryNameFromSlug(countrySlug.value)
    const matchedCountry = destinationCountries.value.find(country => 
      possibleNames.some(name => 
        country.countryName.toLowerCase() === name.toLowerCase() ||
        country.countryName.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(country.countryName.toLowerCase())
      )
    )
    
    if (matchedCountry) {
      selectedTo.value = String(matchedCountry.id)
      console.log('✅ Pre-selected destination country from cache:', matchedCountry.countryName)
    } else {
      // Set default "To" value
      const firstDestination = destinationCountries.value[0]
      if (firstDestination && !selectedTo.value) {
        selectedTo.value = String(firstDestination.id)
      }
    }
  }
}

// Fetch data on component mount
onMounted(() => {
  // Load cached data first (synchronously) to avoid showing skeleton loaders
  loadCachedData()
  
  // Then fetch fresh data in background (will update cache)
  fetchAllData()
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

.font-manrope {
  font-family: 'Manrope', sans-serif;
}

/* Skeleton shimmer animation */
.skeleton-shimmer {
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>