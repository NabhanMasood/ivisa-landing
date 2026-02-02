<template>
  <div class="rounded-lg sm:rounded-xl p-4 sm:p-6">
    <!-- Free Visa UI with Animated Clouds -->
    <div
      v-if="
        !isLoadingProducts &&
        availableProducts.length === 0 &&
        !productError &&
        !showInquiryForm &&
        formData.nationality &&
        destination
      "
      class="py-2 sm:py-4"
    >
      <!-- Two Column Layout: Left (Animation + Dropdown) | Right (Button + Info) -->
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
        
        <!-- LEFT SIDE: Animation + Nationality Dropdown -->
        <div class="flex-1 flex flex-col items-center lg:items-start">
          <!-- Animated Scene Container -->
          <div class="free-visa-scene relative w-full max-w-[650px] h-[280px] sm:h-[320px] lg:h-[340px] mb-5 overflow-hidden rounded-2xl sm:rounded-3xl">
            <!-- Background gradient sky -->
            <div class="absolute inset-0 bg-gradient-to-b from-[#c9e8ff] via-[#e0f4ff] to-[#f0faff]"></div>
            
            <!-- Animated Clouds Layer -->
            <!-- Cloud 1 - Large, slow moving from right -->
            <div class="cloud cloud-1 absolute top-[12%] -left-24">
              <svg viewBox="0 0 100 50" class="w-24 h-12 sm:w-32 sm:h-16 fill-white drop-shadow-md opacity-90">
                <ellipse cx="25" cy="35" rx="20" ry="12"/>
                <ellipse cx="45" cy="28" rx="25" ry="16"/>
                <ellipse cx="70" cy="35" rx="22" ry="13"/>
                <ellipse cx="50" cy="20" rx="18" ry="12"/>
              </svg>
            </div>
            
            <!-- Cloud 2 - Medium, faster from right -->
            <div class="cloud cloud-2 absolute top-[30%] -left-20">
              <svg viewBox="0 0 80 40" class="w-16 h-8 sm:w-24 sm:h-12 fill-white drop-shadow-sm opacity-85">
                <ellipse cx="20" cy="28" rx="15" ry="10"/>
                <ellipse cx="40" cy="22" rx="20" ry="14"/>
                <ellipse cx="58" cy="28" rx="16" ry="10"/>
              </svg>
            </div>
            
            <!-- Cloud 3 - Small, fast moving from right -->
            <div class="cloud cloud-3 absolute top-[50%] -left-16">
              <svg viewBox="0 0 60 30" class="w-14 h-7 sm:w-20 sm:h-10 fill-white opacity-75">
                <ellipse cx="15" cy="20" rx="12" ry="8"/>
                <ellipse cx="30" cy="15" rx="15" ry="10"/>
                <ellipse cx="45" cy="20" rx="12" ry="8"/>
              </svg>
            </div>
            
            <!-- Cloud 4 - Tiny accent cloud, very fast -->
            <div class="cloud cloud-4 absolute top-[20%] -left-12">
              <svg viewBox="0 0 40 20" class="w-10 h-5 sm:w-14 sm:h-7 fill-white opacity-65">
                <ellipse cx="12" cy="14" rx="10" ry="6"/>
                <ellipse cx="26" cy="11" rx="12" ry="8"/>
              </svg>
            </div>
            
            <!-- Cloud 5 - Background layer, slowest -->
            <div class="cloud cloud-5 absolute top-[65%] -left-24">
              <svg viewBox="0 0 90 45" class="w-20 h-10 sm:w-28 sm:h-14 fill-white opacity-55">
                <ellipse cx="22" cy="32" rx="18" ry="10"/>
                <ellipse cx="45" cy="25" rx="22" ry="14"/>
                <ellipse cx="68" cy="32" rx="18" ry="10"/>
              </svg>
            </div>
            
            <!-- Cloud 6 - Extra cloud for more depth -->
            <div class="cloud cloud-6 absolute top-[40%] -left-18">
              <svg viewBox="0 0 70 35" class="w-16 h-8 sm:w-22 sm:h-11 fill-white opacity-70">
                <ellipse cx="18" cy="24" rx="14" ry="9"/>
                <ellipse cx="35" cy="18" rx="18" ry="12"/>
                <ellipse cx="52" cy="24" rx="14" ry="9"/>
              </svg>
            </div>
            
            <!-- Cloud 7 - Additional top cloud -->
            <div class="cloud cloud-7 absolute top-[8%] -left-16">
              <svg viewBox="0 0 50 25" class="w-12 h-6 sm:w-16 sm:h-8 fill-white opacity-60">
                <ellipse cx="15" cy="17" rx="12" ry="7"/>
                <ellipse cx="32" cy="14" rx="14" ry="9"/>
              </svg>
            </div>
            
            <!-- Plane with subtle floating animation - positioned higher -->
            <div class="plane-container absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-10">
              <img
                src="/images/plane.svg"
                alt="Plane"
                class="plane-float w-[200px] h-[78px] sm:w-[260px] sm:h-[100px] lg:w-[280px] lg:h-[108px] drop-shadow-xl"
              />
            </div>
            
            <!-- Sparkle/Star effects for celebration feel -->
            <div class="sparkle sparkle-1 absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full"></div>
            <div class="sparkle sparkle-2 absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"></div>
            <div class="sparkle sparkle-3 absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"></div>
            <div class="sparkle sparkle-4 absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"></div>
            
            <!-- Contrail/Trail effects behind plane -->
            <div class="trail trail-1 absolute"></div>
            <div class="trail trail-2 absolute"></div>
            
            <!-- Message INSIDE the animated container -->
            <div class="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-0 right-0 z-20 text-center px-4">
              <h2
                class="free-visa-title text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold"
                style="
                  font-family: Geist, sans-serif;
                  font-weight: 600;
                  color: #0b3947;
                  text-shadow: 0 1px 2px rgba(255,255,255,0.8);
                "
              >
                Good news! You don't need a visa!
              </h2>
            </div>
          </div>
          
          <!-- Nationality Dropdown Section - Below animation on left -->
          <div class="w-full max-w-[650px] px-1">
            <!-- Nationality Select -->
            <div>
              <Label
                htmlFor="nationality"
                style="
                  font-family: Manrope, sans-serif;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  color: #0b3947;
                "
              >
                What's your nationality?
              </Label>

              <!-- Loading State -->
              <div
                v-if="isLoadingCountries"
                class="mt-2 flex items-center gap-2 text-sm text-gray-600"
              >
                <div
                  class="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"
                ></div>
                Loading countries...
              </div>

              <!-- Countries Dropdown -->
              <SearchableSelect
                v-if="!isLoadingCountries"
                v-model="formData.nationality"
                :countries="nationalityOptions"
                :api-base="config.public.apiBase"
                value-key="countryName"
                placeholder="Select your nationality"
                trigger-class="mt-2 h-11 !bg-white/90 !rounded-[16px]"
                class="w-full"
              />
              
              <p
                style="
                  font-family: Manrope;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 16px;
                  color: #6b7280;
                "
                class="mt-1.5"
              >
                Ensure you select the nationality of the passport you'll be traveling with.
              </p>
            </div>
            
            <!-- Trustpilot Badge -->
            <div class="mt-6 flex items-center gap-3">
              <div class="flex items-center gap-1">
                <svg class="w-5 h-5 text-[#00B67A]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-sm font-semibold text-[#0B3947]">Trustpilot</span>
              </div>
              <div class="flex gap-0.5">
                <div v-for="i in 5" :key="i" class="w-5 h-5 bg-[#00B67A] flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <span class="text-xs text-gray-500">66,000+ Reviews</span>
            </div>
          </div>
        </div>
        
        <!-- RIGHT SIDE: Check Other Destinations Button + Additional Info -->
        <div class="flex-shrink-0 flex flex-col items-center lg:items-end gap-6 lg:w-[320px]">
          <!-- Main CTA Button -->
          <Button
            @click="handleCheckOtherDestinations"
            class="free-visa-btn w-full h-[52px] sm:h-[56px] !rounded-[16px] sm:!rounded-[20px] !font-semibold !text-base sm:!text-lg shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-100"
            style="
              background: linear-gradient(90deg, #00C6A7 0%, #26D07A 100%);
              color: white;
              font-family: Geist, sans-serif;
            "
          >
            Check Other Destinations
          </Button>
          
          <!-- Info Card -->
          <div class="w-full bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 class="text-sm font-semibold text-[#0B3947] mb-4" style="font-family: Geist, sans-serif;">
              Why travelers love us
            </h3>
            
            <!-- Feature List -->
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-[#E8FBF3] flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-[#1ECE84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#0B3947]">Fast Processing</p>
                  <p class="text-xs text-gray-500">Get your visa in as little as 24 hours</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-[#E8FBF3] flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-[#1ECE84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#0B3947]">98% Approval Rate</p>
                  <p class="text-xs text-gray-500">Expert review ensures success</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-[#E8FBF3] flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-[#1ECE84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#0B3947]">24/7 Support</p>
                  <p class="text-xs text-gray-500">We're here whenever you need us</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Stats Row -->
          <div class="w-full grid grid-cols-2 gap-3">
            <div class="bg-white rounded-xl p-4 border border-gray-100 text-center shadow-sm">
              <p class="text-2xl font-bold text-[#0B3947]" style="font-family: Manrope, sans-serif;">180K+</p>
              <p class="text-xs text-gray-500">Happy Travelers</p>
            </div>
            <div class="bg-white rounded-xl p-4 border border-gray-100 text-center shadow-sm">
              <p class="text-2xl font-bold text-[#0B3947]" style="font-family: Manrope, sans-serif;">11+</p>
              <p class="text-xs text-gray-500">Years Experience</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <!-- Regular Visa Application Form -->
    <div v-else>
      <div class="mb-4 sm:mb-6">
        <p
          class="text-xs sm:text-sm leading-[18px] sm:leading-[22px]"
          style="
            font-family: Geist;
            font-weight: 600;
            color: #0b3947;
          "
        >
          The {{ destination }} Visa is mandatory for {{ formData.nationality || nationality }} passport
          holders planning to enter {{ destination }}
        </p>
      </div>

      <div class="space-y-4 sm:space-y-6">
      <!-- Nationality - Editable Select -->
      <div>
        <Label
          htmlFor="nationality"
          style="
            font-family: Manrope, sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #0b3947;
          "
        >
          What's your nationality?
        </Label>

        <!-- Loading State -->
        <div
          v-if="isLoadingCountries"
          class="mt-2 flex items-center gap-2 text-sm text-gray-600"
        >
          <div
            class="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"
          ></div>
          Loading countries...
        </div>

        <!-- Countries Dropdown -->
        <SearchableSelect
          v-if="!isLoadingCountries"
          v-model="formData.nationality"
          :countries="nationalityOptions"
          :api-base="config.public.apiBase"
          value-key="countryName"
          placeholder="Select your nationality"
          trigger-class="mt-2 h-10"
          class="w-full"
        />
      </div>

      <!-- Visa Type - Dynamic from API (Hidden when showing inquiry form) -->
      <div v-if="!showInquiryForm">
        <Label htmlFor="visaType">
          <a
            href="#"
            style="
              color: #27272b;
              font-family: Manrope, sans-serif;
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
            "
            class="hover:underline"
          >
            Applying for
          </a>
        </Label>

        <!-- Loading State -->
        <div
          v-if="isLoadingProducts"
          class="mt-2 flex items-center gap-2 text-sm text-gray-600"
        >
          <div
            class="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"
          ></div>
          Loading visa products...
        </div>

        <!-- Error State -->
        <div v-else-if="productError" class="mt-2 text-sm text-red-600">
          {{ productError }}
        </div>

        <!-- Products Dropdown -->
        <Select v-else v-model="formData.visaType">
          <SelectTrigger
            variant="form"
            class="w-full mt-2 min-h-[60px] sm:min-h-[50px] h-auto py-2"
            style="
              font-family: Manrope, sans-serif;
              font-size: 14px;
              padding-left: 0.75rem !important;
              padding-right: 1rem !important;
            "
            :disabled="availableProducts.length === 0"
          >
            <SelectValue placeholder="Select visa type" class="text-left" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="product in (Array.isArray(availableProducts) ? availableProducts : [])"
              :key="`${product.productName}-${product.entryType || product.visaType}`"
              :value="`${product.productName}|${product.visaType || constructVisaType({ validity: product.validity, entryType: product.entryType || 'single', customEntryName: product.customEntryName })}`"
            >
              {{ product.productName }} -
              {{ formatPrice(Number(product.totalAmount)) }} ({{
                getEntryTypeDisplay(product)
              }}, {{ product.duration }} days, Valid
              {{ product.validity }} days)
            </SelectItem>
          </SelectContent>
        </Select>

      </div>

      <!-- Inquiry Form - Show when no products configured (not free visa) -->
      <div
        v-if="showInquiryForm && !isLoadingProducts"
        class="col-span-full mt-6"
      >
        <!-- Form Container with Border and Shadow -->
        <div class="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <!-- Header Section -->
          <div class="bg-gradient-to-r from-[#1ece84] to-[#17b374] px-6 py-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 class="text-white font-semibold text-lg" style="font-family: Manrope, sans-serif;">
                  Submit a Visa Inquiry
                </h3>
                <p class="text-white/80 text-sm" style="font-family: Manrope, sans-serif;">
                  Our team will assist you with your visa requirements
                </p>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div
            v-if="inquirySuccess"
            class="p-8 text-center"
          >
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2" style="font-family: Manrope, sans-serif;">
              Inquiry Submitted Successfully!
            </h4>
            <p class="text-gray-600" style="font-family: Manrope, sans-serif;">
              Thank you for your inquiry. Our team will review your request and contact you within 24-48 hours.
            </p>
          </div>

          <!-- Inquiry Form -->
          <div v-else class="p-6">
       

            <!-- Row 1: Name, Email, Phone -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div>
                <Label
                  htmlFor="inquiry-name"
                  class="text-sm font-medium text-gray-700"
                  style="font-family: Manrope, sans-serif;"
                >
                  Full Name <span class="text-red-500">*</span>
                </Label>
                <Input
                  id="inquiry-name"
                  v-model="inquiryFormData.name"
                  type="text"
                  class="w-full mt-1.5 h-11 border-gray-300 focus:border-[#1ECB84] focus:ring-[#1ECB84]"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="inquiry-email"
                  class="text-sm font-medium text-gray-700"
                  style="font-family: Manrope, sans-serif;"
                >
                  Email <span class="text-red-500">*</span>
                </Label>
                <Input
                  id="inquiry-email"
                  v-model="inquiryFormData.email"
                  type="email"
                  class="w-full mt-1.5 h-11 border-gray-300 focus:border-[#1ECB84] focus:ring-[#1ECB84]"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="inquiry-phone"
                  class="text-sm font-medium text-gray-700"
                  style="font-family: Manrope, sans-serif;"
                >
                  Phone Number <span class="text-gray-400 font-normal">(Optional)</span>
                </Label>
                <Input
                  id="inquiry-phone"
                  v-model="inquiryFormData.phone"
                  type="tel"
                  class="w-full mt-1.5 h-11 border-gray-300 focus:border-[#1ECB84] focus:ring-[#1ECB84]"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <!-- Row 2: Subject -->
            <div class="mb-5">
              <Label
                htmlFor="inquiry-subject"
                class="text-sm font-medium text-gray-700"
                style="font-family: Manrope, sans-serif;"
              >
                Subject <span class="text-red-500">*</span>
              </Label>
              <Input
                id="inquiry-subject"
                v-model="inquiryFormData.subject"
                type="text"
                class="w-full mt-1.5 h-11 border-gray-300 focus:border-[#1ECB84] focus:ring-[#1ECB84]"
                placeholder="e.g., Tourist Visa Inquiry, Business Visa Requirements"
                required
              />
            </div>

            <!-- Row 3: Nationality, Travelling From, Travelling To -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <!-- Nationality Dropdown -->
              <div>
                <Label
                  class="text-sm font-medium text-gray-700"
                  style="font-family: Manrope, sans-serif;"
                >
                  Nationality <span class="text-red-500">*</span>
                </Label>
                <SearchableSelect
                  v-model="inquiryFormData.nationality"
                  :countries="nationalityOptions"
                  :api-base="config.public.apiBase"
                  value-key="countryName"
                  placeholder="Select nationality"
                  trigger-class="mt-1.5 h-11"
                  class="w-full"
                />
              </div>

              <!-- Travelling From Dropdown -->
              <div>
                <Label
                  class="text-sm font-medium text-gray-700"
                  style="font-family: Manrope, sans-serif;"
                >
                  Travelling From <span class="text-red-500">*</span>
                </Label>
                <SearchableSelect
                  v-model="inquiryFormData.travellingFrom"
                  :countries="nationalityOptions"
                  :api-base="config.public.apiBase"
                  value-key="countryName"
                  placeholder="Select country"
                  trigger-class="mt-1.5 h-11"
                  class="w-full"
                />
              </div>

              <!-- Travelling To Dropdown -->
              <div>
                <Label
                  class="text-sm font-medium text-gray-700"
                  style="font-family: Manrope, sans-serif;"
                >
                  Travelling To <span class="text-red-500">*</span>
                </Label>
                <SearchableSelect
                  v-model="inquiryFormData.destinationCountry"
                  :countries="nationalityOptions"
                  :api-base="config.public.apiBase"
                  value-key="countryName"
                  placeholder="Select destination"
                  trigger-class="mt-1.5 h-11"
                  class="w-full"
                  :priority-countries="['Egypt', 'India', 'Kenya', 'Morocco', 'Thailand', 'Turkey', 'United Kingdom', 'United States', 'Vietnam']"
                />
              </div>
            </div>

            <!-- Row 4: Message (Optional) -->
            <div class="mb-5">
              <Label
                htmlFor="inquiry-message"
                class="text-sm font-medium text-gray-700"
                style="font-family: Manrope, sans-serif;"
              >
                Message <span class="text-gray-400 font-normal">(Optional)</span>
              </Label>
              <textarea
                id="inquiry-message"
                v-model="inquiryFormData.message"
                class="w-full mt-1.5 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent min-h-[120px] resize-none"
                style="font-family: Manrope, sans-serif; font-size: 14px;"
                placeholder="Please describe your visa requirements, travel dates, purpose of visit, and any questions you have..."
              ></textarea>
            </div>

            <!-- Privacy Policy Checkbox -->
            <div class="mb-5">
              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="inquiryFormData.privacyAgreed"
                  class="mt-1 w-4 h-4 text-[#1ece84] border-gray-300 rounded focus:ring-[#1ece84] focus:ring-2 cursor-pointer"
                />
                <span class="text-sm text-gray-600" style="font-family: Manrope, sans-serif;">
                  I agree that my personal data may be processed to process my contact request. For more information, read our
                  <a href="/terms-and-conditions" target="_blank" class="text-[#1ece84] hover:underline font-medium">Privacy Policy</a>.
                </span>
              </label>
            </div>

            <!-- Error Message -->
            <div v-if="inquiryError" class="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 flex items-center gap-2">
              <svg class="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-red-700" style="font-family: Manrope, sans-serif;">{{ inquiryError }}</p>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-between pt-2">
              <p class="text-xs text-gray-500" style="font-family: Manrope, sans-serif;">
                <span class="text-red-500">*</span> Required fields
              </p>
              <Button
                @click="handleInquirySubmit"
                :disabled="inquiryLoading || !isInquiryFormValid"
                class="h-11 px-8 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style="
                  background-color: #1ece84;
                  font-family: Manrope, sans-serif;
                  font-size: 14px;
                "
              >
                <span v-if="inquiryLoading" class="flex items-center gap-2">
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit Inquiry
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Number of Applicants - Hidden when no products -->
      <div v-if="availableProducts.length > 0">
        <Label
          htmlFor="applicants"
          style="
            font-family: Manrope, sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #0b3947;
          "
        >
          Number of applicants
        </Label>
        <Input
          id="applicants"
          v-model.number="formData.applicants"
          type="number"
          min="1"
          max="10"
          class="w-full mt-2"
          placeholder="Enter number of applicants"
        />
      </div>

      <!-- Email Address - Hidden when no products -->
      <div v-if="availableProducts.length > 0">
        <Label
          htmlFor="email"
          style="
            font-family: Manrope, sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #0b3947;
          "
        >
          Email Address <span style="color: #dc2626;">*</span>
        </Label>
        <Input
          id="email"
          v-model="formData.email"
          type="email"
          class="w-full mt-2"
          placeholder="your.email@example.com"
          :readonly="!!(isAuthenticated && currentUser?.email)"
          required
        />
        <p
          v-if="emailError"
          style="
            font-family: Manrope;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #dc2626;
          "
          class="mt-1"
        >
          {{ emailError }}
        </p>
        <p
          style="
            font-family: Manrope;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #6b7280;
          "
          class="mt-1"
        >
          We'll send your visa updates to this email address.
        </p>
      </div>

      <!-- Start Application Button - Hidden when no products -->
      <Button
        v-if="availableProducts.length > 0"
        @click="handleNext"
        :disabled="
          !formData.visaType ||
          !formData.email ||
          emailError ||
          isLoadingProducts ||
          availableProducts.length === 0
        "
        class="w-full sm:w-[143px] h-9"
        style="
          background-color: #1ece84;
          color: white;
          border-radius: 6px;
          padding: 8px 16px;
          font-family: Geist, sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
        "
      >
        Start Application
      </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { useRuntimeConfig } from "#app";

import Button from "@/components/ui/button.vue";
import Label from "@/components/ui/label/Label.vue";
import Input from "@/components/ui/Input.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SearchableSelect from "@/components/ui/SearchableSelect.vue";
import { useNationalitiesApi } from "@/composables/useNationalities";
import { useCountriesApi } from "@/composables/useCountries";
import { useVisaProductsApi } from "@/composables/useVisaProducts";
import { useCurrency } from "@/composables/useCurrency";
import { useAuthApi } from "@/composables/useAuth";
import { useInquiry } from "@/composables/useInquiry";
import { parseVisaType, formatVisaTypeForDisplay, formatEntryTypeForDisplay, constructVisaType, getEntryTypeDisplay } from "@/lib/visaTypeUtils";

const props = defineProps<{
  nationality: string;
  destination: string;
  initialData?: any;
}>();

const emit = defineEmits<{
  next: [any];
  update: [any];
  freeVisa: [boolean];
}>();

// API composables
const { getNationalityDestinationProducts } = useNationalitiesApi();
const { getCountries } = useCountriesApi();
const { getVisaProductById } = useVisaProductsApi();
const { formatPrice, initializeRates, selectedCurrency, getCurrentRate } =
  useCurrency();
const { currentUser, isAuthenticated } = useAuthApi();
const router = useRouter();
const config = useRuntimeConfig();

// State
const formData = ref({
  nationality: props.nationality,
  visaType: "",
  applicants: 1,
  email: "",
});

interface Country {
  id?: number | string;
  countryName: string;
  flag?: string;
  code?: string;
  logoUrl?: string | null; // Add logoUrl for flag display (can be null from API)
}

const nationalityOptions = ref<Country[]>([]);
const isLoadingCountries = ref(false);
const nationalitySearchQuery = ref('');
const availableProducts = ref<
  Array<{
    id?: number | string;
    productName: string;
    duration: number;
    validity: number;
    entryType?: 'single' | 'multiple' | 'custom' | string;
    customEntryName?: string | null; // Custom entry name when entryType is "custom"
    visaType?: string; // Backend format: "90-Double Entry" (constructed from validity and entryType/customEntryName)
    totalAmount: number | string;
    govtFee?: number | string;
    serviceFee?: number | string;
    processingFees?: any[];
    visaProductId?: number | string;
  }>
>([]);
const isLoadingProducts = ref(false);
const productError = ref<string | null>(null);
const showInquiryForm = ref(false); // True when no products configured (not free visa)
const emailError = ref<string>("");

// Inquiry form state
const { submitInquiry, loading: inquiryLoading, error: inquiryError, success: inquirySuccess, resetInquiry } = useInquiry();
const inquiryFormData = ref({
  name: "",
  email: "",
  phone: "",
  subject: "",
  nationality: props.nationality,
  travellingFrom: "",
  destinationCountry: props.destination,
  message: "",
  privacyAgreed: false,
});

// Computed: Check if inquiry form is valid
const isInquiryFormValid = computed(() => {
  return (
    inquiryFormData.value.name.trim() !== "" &&
    inquiryFormData.value.email.trim() !== "" &&
    inquiryFormData.value.subject.trim() !== "" &&
    inquiryFormData.value.nationality.trim() !== "" &&
    inquiryFormData.value.travellingFrom.trim() !== "" &&
    inquiryFormData.value.destinationCountry.trim() !== "" &&
    inquiryFormData.value.privacyAgreed === true
  );
});

// Handle inquiry form submission
const handleInquirySubmit = async () => {
  if (!isInquiryFormValid.value) return;

  try {
    await submitInquiry({
      name: inquiryFormData.value.name,
      email: inquiryFormData.value.email,
      phone: inquiryFormData.value.phone || undefined,
      subject: inquiryFormData.value.subject,
      nationality: inquiryFormData.value.nationality,
      travellingFrom: inquiryFormData.value.travellingFrom,
      destinationCountry: inquiryFormData.value.destinationCountry,
      message: inquiryFormData.value.message,
    });
  } catch (err) {
    // Error is handled by the composable
    console.error("Failed to submit inquiry:", err);
  }
};

// ✅ Computed property to get selected country with flag
const selectedCountry = computed(() => {
  if (!Array.isArray(nationalityOptions.value)) {
    return undefined;
  }
  return nationalityOptions.value.find(
    (c) => c && c.countryName === formData.value.nationality
  );
});

// ✅ Filtered nationality options based on search query - matches from start
const filteredNationalityOptions = computed(() => {
  // Ensure nationalityOptions is an array before filtering
  if (!nationalityOptions.value || !Array.isArray(nationalityOptions.value)) {
    return [];
  }
  if (!nationalitySearchQuery.value || !nationalitySearchQuery.value.trim()) {
    return nationalityOptions.value;
  }
  const query = nationalitySearchQuery.value.toLowerCase().trim();
  return nationalityOptions.value.filter((country) =>
    country && country.countryName && country.countryName.toLowerCase().startsWith(query)
  );
});



// ✅ Handle flag loading errors
const handleFlagError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  console.error("❌ Flag failed to load:", img.src);
  img.style.display = "none";
};

// Watch for prop changes and update formData
watch(
  () => props.nationality,
  (newNationality) => {
    if (newNationality) {
      formData.value.nationality = newNationality;
    }
  },
  { immediate: true }
);

// Watch for nationality or destination changes to fetch products
watch(
  () => [formData.value.nationality, props.destination],
  async (newValues, oldValues) => {
    // Handle undefined values when immediate: true is used
    const [nationality, destination] = newValues || [undefined, undefined];
    const [oldNationality, oldDestination] = oldValues || [undefined, undefined];
    
    if (nationality && destination) {
      // Force refresh if nationality or destination changed to ensure fresh pricing
      // Handle undefined old values (when immediate: true is used)
      const shouldForceRefresh = oldNationality !== undefined && oldDestination !== undefined && 
                                 (oldNationality !== nationality || oldDestination !== destination)
      await fetchVisaProducts(nationality as string, destination as string, shouldForceRefresh);
    } else {
      availableProducts.value = [];
      formData.value.visaType = "";
    }
  },
  { immediate: true }
);

const fetchNationalityOptions = async () => {
  isLoadingCountries.value = true;
  try {
    const response = await getCountries();
    if (response.success && response.data) {
      nationalityOptions.value = response.data.sort((a, b) => a.countryName.localeCompare(b.countryName));
      console.log(
        "✅ Loaded database countries:",
        nationalityOptions.value.length
      );
    }
  } catch (error) {
    console.error("Failed to fetch nationality options:", error);
  } finally {
    isLoadingCountries.value = false;
  }
};

// ✅ NEW FUNCTION: Enrich product with processing fees
const enrichProductWithProcessingFees = async (product: any) => {
  try {
    // If product has a visaProductId, fetch the full details
    const productId = product.visaProductId || product.id;
    if (productId) {
      console.log(`🔍 Fetching full product details for ID: ${productId}`);
      const response = await getVisaProductById(productId);

      if (response.success && response.data && response.data.processingFees) {
        console.log(
          `✅ Found ${response.data.processingFees.length} processing fees for product ${productId}`
        );
        // Merge nationality product pricing with visa product details
        // ✅ Priority: Use visa product pricing (from DB) over nationality product pricing (may be cached)
        // This ensures we always use the latest prices from the visa product table
        return {
          ...product,
          processingFees: response.data.processingFees, // ✅ Add processing fees
          // ✅ Use visa product pricing as primary source (most up-to-date)
          govtFee: response.data.govtFee ?? product.govtFee,
          serviceFee: response.data.serviceFee ?? product.serviceFee,
          totalAmount: response.data.totalAmount ?? product.totalAmount,
        };
      }
    }
    console.log(`⚠️ No processing fees found for product ${productId}`);
    return product;
  } catch (error) {
    console.error("❌ Failed to enrich product with processing fees:", error);
    return product;
  }
};

const fetchVisaProducts = async (nationality: string, destination: string, forceRefresh: boolean = false) => {
  isLoadingProducts.value = true;
  productError.value = null;
  showInquiryForm.value = false;
  availableProducts.value = [];

  // ✅ Save current visaType before resetting
  const previousVisaType = formData.value.visaType;
  formData.value.visaType = "";

  try {
    console.log("🔍 Fetching products for:", { nationality, destination, forceRefresh });
    const response = await getNationalityDestinationProducts(
      nationality,
      destination,
      forceRefresh // Pass forceRefresh to bypass cache if needed
    );

    console.log("📦 Raw API Response:", response);
    console.log("📦 Response details:", { 
      success: response.success, 
      dataLength: response.data?.length, 
      message: response.message,
      nationality,
      destination
    });

    // ✅ Check if response is successful
    if (response.success && response.data) {
      console.log("📊 Products received:", response.data.length);

      // ✅ CRITICAL: Distinguish between free visa and no products configured
      // If success is true but data is empty, it means free visa (products exist but are filtered out)
      // The composable already handles this: status: true → success: true, status: false → success: false
      if (Array.isArray(response.data) && response.data.length === 0) {
        // If we reach here with success: true and empty array, it's a free visa
        // (The composable would have returned success: false if backend returned status: false)
        productError.value = null;
        console.log("ℹ️ No paid visa products available - all products are free visas");
        emit('freeVisa', true);
        availableProducts.value = [];
        return; // Exit early for free visa case
      }

      // ✅ Remove duplicates based on BOTH productName AND entryType/visaType
      const uniqueProducts = response.data.reduce((acc, product: any) => {
        const existing = acc.find(
          (p: any) =>
            p.productName === product.productName &&
            (p.visaType === product.visaType || 
             (p.entryType === product.entryType && !p.visaType && !product.visaType))
        );
        if (!existing) {
          acc.push(product);
        } else {
          console.log(
            "⚠️ Duplicate found, skipping:",
            product.productName,
            product.visaType || product.entryType
          );
        }
        return acc;
      }, [] as any[]);

      // ✅ ENRICH PRODUCTS WITH PROCESSING FEES
      console.log("🔄 Enriching products with processing fees...");
      const enrichedProducts = await Promise.all(
        uniqueProducts.map((product: any) =>
          enrichProductWithProcessingFees(product)
        )
      );

      // ✅ Construct visaType for each product if not already present
      // This ensures we have the correct format: {validity}-{entryTypeValue}
      const productsWithVisaType = enrichedProducts.map((product: any) => {
        if (!product.visaType) {
          // Construct visaType from product data
          product.visaType = constructVisaType({
            validity: product.validity,
            entryType: product.entryType || 'single',
            customEntryName: product.customEntryName
          })
        }
        return product
      })

      availableProducts.value = productsWithVisaType;

      // Reset free visa flag if products are found
      if (availableProducts.value.length > 0) {
        emit('freeVisa', false);
      }

      console.log(
        "✅ Products loaded with processing fees:",
        availableProducts.value.length
      );
      console.log(
        "📊 Product details:",
        enrichedProducts.map((p) => ({
          name: p.productName,
          entryType: p.entryType,
          duration: p.duration,
          processingFeesCount: p.processingFees?.length || 0,
        }))
      );

      // ✅ PRIORITY 1: Restore previous selection if it exists
      // Support format: "ProductName|visaType"
      if (previousVisaType) {
        const matchingProduct = enrichedProducts.find((p) => {
          // Check new format: "ProductName|visaType"
          const newFormat = `${p.productName}|${p.visaType}`;
          if (newFormat === previousVisaType) return true;
          
          // Check if previousVisaType matches the product by extracting parts
          if (previousVisaType.includes('|')) {
            const [productName, visaType] = previousVisaType.split("|");
            return p.productName === productName && (p.visaType === visaType || 
              constructVisaType({ validity: p.validity, entryType: p.entryType || 'single', customEntryName: p.customEntryName }) === visaType);
          }
          return false;
        });
        
        if (matchingProduct) {
          // Always use the new format: "ProductName|visaType"
          formData.value.visaType = `${matchingProduct.productName}|${matchingProduct.visaType}`;
          console.log("✅ Restored previous selection:", formData.value.visaType);
        }
      }
      // ✅ PRIORITY 2: Use initialData if going back
      else if (props.initialData?.visaType) {
        const matchingProduct = enrichedProducts.find((p) => {
          // Check new format: "ProductName|visaType"
          const newFormat = `${p.productName}|${p.visaType}`;
          if (newFormat === props.initialData.visaType) return true;
          
          // Check if initialData.visaType matches the product by extracting parts
          if (props.initialData.visaType.includes('|')) {
            const [productName, visaType] = props.initialData.visaType.split("|");
            return p.productName === productName && (p.visaType === visaType || 
              constructVisaType({ validity: p.validity, entryType: p.entryType || 'single', customEntryName: p.customEntryName }) === visaType);
          }
          return false;
        });
        
        if (matchingProduct) {
          // Always use the new format: "ProductName|visaType"
          formData.value.visaType = `${matchingProduct.productName}|${matchingProduct.visaType}`;
          console.log("✅ Restored from initialData:", formData.value.visaType);
        }
      }
      // ✅ PRIORITY 3: Auto-select first product only if no previous selection
      else if (availableProducts.value.length > 0) {
        const firstProduct = availableProducts.value[0];
        if (firstProduct) {
          // Always use the new format: "ProductName|visaType"
          formData.value.visaType = `${firstProduct.productName}|${firstProduct.visaType}`;
          console.log("✅ Auto-selected first product:", formData.value.visaType);
        }
      }
    } else {
      // No products configured for this nationality-destination combination
      // Show inquiry form instead of error
      console.log("ℹ️ No products configured - showing inquiry form:", response.message);
      showInquiryForm.value = true;
      emit('freeVisa', false);
      availableProducts.value = [];
    }
  } catch (error: any) {
    console.error("❌ Error fetching visa products:", error);

    // Check if it's a 404/400 error (no products configured)
    const errorStatus = error?.response?.status || error?.statusCode || error?.status
    if (errorStatus === 404 || errorStatus === 400) {
      // HTTP 404/400 means no products configured for this pair
      // Show inquiry form instead of error
      console.log("ℹ️ No products configured (HTTP error) - showing inquiry form:", errorStatus);
      showInquiryForm.value = true;
    } else {
      // Other errors (network, server error, etc.)
      productError.value = "Failed to load visa products. Please try again.";
    }

    emit('freeVisa', false);
    availableProducts.value = [];
  } finally {
    isLoadingProducts.value = false;
  }
};

// Handle check other destinations button
const handleCheckOtherDestinations = () => {
  router.push('/');
};

const getFullLogoUrl = (logoUrl: string) => {
  if (!logoUrl) return "";

  // If already full URL (Cloudinary)
  if (logoUrl.startsWith("http://") || logoUrl.startsWith("https://")) {
    return logoUrl;
  }

  // Construct local URL
  const baseUrl = config.public.apiBase.replace(/\/+$/, "");
  const path = logoUrl.startsWith("/") ? logoUrl : `/${logoUrl}`;

  return `${baseUrl}${path}`;
};

// Get selected product details
const selectedProduct = computed(() => {
  if (!formData.value.visaType) return null;
  
  // Handle format: "ProductName|visaType" (e.g., "UK Academic Visit Visa|182-multiple")
  if (formData.value.visaType.includes('|')) {
    const [productName, visaType] = formData.value.visaType.split("|");
    return availableProducts.value.find(
      (p) => p.productName === productName && (p.visaType === visaType || 
        constructVisaType({ validity: p.validity, entryType: p.entryType || 'single', customEntryName: p.customEntryName }) === visaType)
    );
  }
  
  // Fallback: try to match by visaType only (backward compatibility)
  return availableProducts.value.find(
    (p) => p.visaType === formData.value.visaType
  );
});

// Watch for changes in selected product and emit updates in real-time
watch(selectedProduct, (newProduct) => {
  console.log("🔄 Selected product changed:", newProduct);
  
  // Only emit update if we have a valid product and visaType
  // This prevents emitting incomplete data when products are being cleared
  if (newProduct && formData.value.visaType) {
    console.log("✅ Emitting update with valid product data");
    emit('update', {
      nationality: formData.value.nationality,
      visaType: formData.value.visaType,
      applicants: formData.value.applicants,
      email: formData.value.email,
      productDetails: newProduct,
    });
  } else {
    console.log("⏭️ Skipping update - no valid product selected yet");
  }
});

// Validate email
const validateEmail = () => {
  const email = formData.value.email?.trim() || "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    emailError.value = "Email is required";
    return false;
  } else if (!emailRegex.test(email)) {
    emailError.value = "Please enter a valid email address";
    return false;
  } else {
    emailError.value = "";
    return true;
  }
};

// Watch email for real-time validation
watch(() => formData.value.email, () => {
  if (formData.value.email && emailError.value) {
    validateEmail();
  }
});

const handleNext = () => {
  // Validate email before proceeding
  if (!validateEmail()) {
    return;
  }

  console.log("➡️ Moving to next step with:", {
    nationality: formData.value.nationality,
    visaType: formData.value.visaType,
    applicants: formData.value.applicants,
    email: formData.value.email,
    productDetails: selectedProduct.value
  })
  
  
  emit('next', {
    nationality: formData.value.nationality,
    visaType: formData.value.visaType,
    applicants: formData.value.applicants,
    email: formData.value.email,
    productDetails: selectedProduct.value,
  });
};

// Watch for nationality changes to reset search query
watch(() => formData.value.nationality, () => {
  nationalitySearchQuery.value = '';
});

// Watch for props changes to update inquiry form data
watch(() => [props.nationality, props.destination], () => {
  inquiryFormData.value.nationality = props.nationality;
  inquiryFormData.value.destinationCountry = props.destination;
  // Reset inquiry success state when destination changes
  resetInquiry();
}, { immediate: true });

onMounted(async () => {
  await initializeRates()
  
  // Debug: Check if rates are loaded
  const { exchangeRates, selectedCurrency } = useCurrency();
  console.log("💱 Exchange Rates:", exchangeRates.value);
  console.log("💰 Selected Currency:", selectedCurrency.value);

  fetchNationalityOptions();

  // Pre-fill email from logged-in user if available
  if (isAuthenticated.value && currentUser.value?.email && !formData.value.email) {
    formData.value.email = currentUser.value.email;
    console.log("✅ Pre-filled email from logged-in user:", currentUser.value.email);
  }

  if (props.initialData) {
    // ✅ PRIORITY 1: If we have actual travelers data, use that count
    // This ensures when user goes back, the number reflects actual travelers added
    const actualTravelersCount =
      props.initialData.travelers?.length || props.initialData.applicants || 1;

    formData.value = {
      nationality: props.initialData.nationality || props.nationality,
      visaType: props.initialData.visaType || "",
      applicants: actualTravelersCount, // ✅ Use actual travelers count, not initially selected count
      email: props.initialData.email || formData.value.email || "",
    };

    console.log("✅ Restored from initialData:", {
      nationality: formData.value.nationality,
      visaType: formData.value.visaType,
      applicants: formData.value.applicants,
      email: formData.value.email,
      actualTravelersAdded: actualTravelersCount,
      hasTravelersData: !!props.initialData.travelers,
    });
  }
});
</script>

<style scoped>
/* ===== FREE VISA ANIMATION STYLES ===== */

/* Cloud flying animation - moves from left to right across the scene */
@keyframes flyCloud {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    transform: translateX(calc(100vw + 150px));
    opacity: 0;
  }
}

/* Different cloud speeds and positions */
.cloud-1 {
  animation: flyCloud 14s linear infinite;
  animation-delay: 0s;
}

.cloud-2 {
  animation: flyCloud 11s linear infinite;
  animation-delay: 2s;
}

.cloud-3 {
  animation: flyCloud 8s linear infinite;
  animation-delay: 4s;
}

.cloud-4 {
  animation: flyCloud 6s linear infinite;
  animation-delay: 1s;
}

.cloud-5 {
  animation: flyCloud 16s linear infinite;
  animation-delay: 6s;
}

.cloud-6 {
  animation: flyCloud 12s linear infinite;
  animation-delay: 3s;
}

.cloud-7 {
  animation: flyCloud 9s linear infinite;
  animation-delay: 5s;
}

/* Plane subtle floating animation */
@keyframes planeFloat {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0) rotate(-2deg);
  }
  25% {
    transform: translate(-50%, -50%) translateY(-8px) rotate(-1deg);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-4px) rotate(-2deg);
  }
  75% {
    transform: translate(-50%, -50%) translateY(-10px) rotate(-3deg);
  }
}

.plane-float {
  animation: planeFloat 4.5s ease-in-out infinite;
}

/* Sparkle/twinkle animation */
@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.sparkle {
  background: linear-gradient(135deg, #4FACFE, #00D474);
  box-shadow: 0 0 8px rgba(79, 172, 254, 0.6), 0 0 16px rgba(0, 212, 116, 0.4);
}

.sparkle-1 {
  top: 18%;
  left: 15%;
  animation: sparkle 2.5s ease-in-out infinite;
  animation-delay: 0s;
}

.sparkle-2 {
  top: 25%;
  right: 18%;
  animation: sparkle 2.5s ease-in-out infinite;
  animation-delay: 0.6s;
}

.sparkle-3 {
  top: 45%;
  left: 22%;
  animation: sparkle 2.5s ease-in-out infinite;
  animation-delay: 1.2s;
}

.sparkle-4 {
  top: 38%;
  right: 15%;
  animation: sparkle 2.5s ease-in-out infinite;
  animation-delay: 1.8s;
}

/* Contrail/trail animation */
@keyframes trail {
  0% {
    width: 0;
    opacity: 0;
    transform: translateX(0);
  }
  20% {
    opacity: 0.5;
  }
  100% {
    width: 120px;
    opacity: 0;
    transform: translateX(-150px);
  }
}

.trail {
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(90deg, transparent, rgba(79, 172, 254, 0.3), transparent);
}

.trail-1 {
  top: 36%;
  left: 20%;
  animation: trail 2.5s ease-out infinite;
  animation-delay: 0s;
}

.trail-2 {
  top: 40%;
  left: 20%;
  animation: trail 2.5s ease-out infinite;
  animation-delay: 0.4s;
}

/* Title fade in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.free-visa-title {
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

/* Button hover effects */
.free-visa-btn {
  position: relative;
  overflow: hidden;
}

.free-visa-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.free-visa-btn:hover::before {
  left: 100%;
}

/* Scene container with enhanced shadow */
.free-visa-scene {
  box-shadow: 
    0 4px 24px rgba(79, 172, 254, 0.2), 
    0 8px 32px rgba(0, 212, 116, 0.15),
    inset 0 -20px 40px rgba(255, 255, 255, 0.3);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .cloud-1 { animation-duration: 11s; }
  .cloud-2 { animation-duration: 9s; }
  .cloud-3 { animation-duration: 6s; }
  .cloud-4 { animation-duration: 5s; }
  .cloud-5 { animation-duration: 13s; }
  .cloud-6 { animation-duration: 10s; }
  .cloud-7 { animation-duration: 7s; }
  
  .sparkle-1, .sparkle-2 {
    display: block;
  }
  
  .sparkle-3, .sparkle-4 {
    display: none;
  }
  
  .trail-1, .trail-2 {
    display: none;
  }
}

/* Extra small screens */
@media (max-width: 400px) {
  .sparkle {
    display: none;
  }
}
</style>