<template>
  <div class="min-h-screen bg-white">
    <Header />

    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div class="animate-pulse">
        <div class="bg-gray-200 h-8 w-3/4 mb-4 rounded"></div>
        <div class="bg-gray-200 h-4 w-1/2 mb-8 rounded"></div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1">
            <div class="bg-gray-200 h-96 rounded"></div>
          </div>
          <div class="lg:col-span-2">
            <div class="bg-gray-200 h-64 rounded mb-4"></div>
            <div class="bg-gray-200 h-4 w-full rounded mb-2"></div>
            <div class="bg-gray-200 h-4 w-full rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div class="text-center py-12">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="fetchGuide"
          class="px-6 py-2 bg-[#1ECE84] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Guide Content -->
    <div v-else-if="guide" class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        <!-- Left Sidebar - Fixed on desktop -->
        <aside class="w-full lg:w-[350px] xl:w-[380px] flex-shrink-0 order-2 lg:order-1">
          <div class="lg:fixed lg:top-32 lg:w-[350px] xl:w-[380px] lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-4">
            <!-- Application Form Card -->
            <div class="w-full rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-[25px] bg-[#F1F9FC] shadow-lg mb-6">
              <h2 class="font-manrope font-bold text-lg sm:text-xl lg:text-[22px] leading-[26px] sm:leading-[28px] lg:leading-[30px] text-[#1a1a1a] mb-4 sm:mb-6">
                Start your application
              </h2>

              <!-- Country Selectors Row -->
              <div class="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <!-- From Country Dropdown (All Countries) -->
                <div class="space-y-2">
                  <Select v-model="selectedNationality">
                    <SelectTrigger 
                      class="!h-[48px] !bg-white !rounded-[10px] !border !border-gray-200 hover:!border-gray-300 transition-all"
                    >
                      <SelectValue placeholder="Select country">
                        <div class="flex items-center gap-2 pl-4" v-if="selectedNationality">
                          <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            <img 
                              v-if="getCountryLogo(selectedNationality)"
                              :src="getCountryLogo(selectedNationality)" 
                              :alt="getCountryName(selectedNationality)"
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
                          <span class="text-[15px] text-gray-700">{{ getCountryName(selectedNationality) }}</span>
                        </div>
                        <span v-else class="text-gray-500 pl-4">Select your country</span>
                      </SelectValue>
                      <svg class="w-3 h-2 mr-3" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </SelectTrigger>
                    <SelectContent class="!rounded-[10px] !bg-white max-h-[300px] overflow-y-auto">
                      <SelectItem 
                        v-for="country in countries" 
                        :key="country.id" 
                        :value="String(country.id)"
                        class="pl-4"
                      >
                        <div class="flex items-center gap-2">
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

                <!-- To Country Dropdown (Countries with Visa Products) -->
                <div class="space-y-2">
                  <Select v-model="selectedDestination">
                    <SelectTrigger 
                      class="!h-[48px] !bg-white !rounded-[10px] !border !border-gray-200 hover:!border-gray-300 transition-all"
                    >
                      <SelectValue placeholder="Select country">
                        <div class="flex items-center gap-2 pl-4" v-if="selectedDestination">
                          <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            <img 
                              v-if="getCountryLogo(selectedDestination)"
                              :src="getCountryLogo(selectedDestination)" 
                              :alt="getCountryName(selectedDestination)"
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
                          <span class="text-[15px] text-gray-700">{{ getCountryName(selectedDestination) }}</span>
                        </div>
                        <span v-else class="text-gray-500 pl-4">Select destination</span>
                      </SelectValue>
                      <svg class="w-3 h-2 mr-3" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </SelectTrigger>
                    <SelectContent class="!rounded-[10px] !bg-white max-h-[300px] overflow-y-auto">
                      <SelectItem 
                        v-for="country in destinationCountries" 
                        :key="country.id" 
                        :value="String(country.id)"
                        class="pl-4"
                      >
                        <div class="flex items-center gap-2">
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
              </div>

              <!-- Apply Now Button -->
              <button
                @click="handleApplyNow"
                :disabled="!selectedNationality || !selectedDestination"
                class="w-full h-[44px] sm:h-[50px] bg-[#08D07A] hover:bg-[#06B869] active:scale-98 text-white font-manrope font-semibold text-sm sm:text-base rounded-[8px] sm:rounded-[10px] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="text-base sm:text-lg">→</span>
                <span>Apply Now!</span>
              </button>
            </div>

           <!-- Contents Card -->
<div class="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Contents</h3>
  <nav class="space-y-1">
    <button
      v-for="(heading, index) in contentHeadings"
      :key="index"
      @click="scrollToHeading(index)"
      :class="[
        'block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200',
        activeHeading === index 
          ? 'bg-[#E8FBF3] text-[#1ECE84] font-medium border-l-2 border-[#1ECE84]' 
          : 'text-gray-600 hover:text-[#1ECE84] hover:bg-gray-50'
      ]"
    >
      {{ heading.text }}
    </button>
  </nav>
</div>

          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 order-1 lg:order-2">

          <!-- Article Header -->
          <div class="mb-6">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-sm text-gray-500">
                {{ formatDate(guide.publishedAt || guide.createdAt) }}
              </span>
              <span
                v-if="guide.category || guide.categoryTag"
                class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
              >
                {{ guide.category || guide.categoryTag }}
              </span>
            </div>

            <!-- Social Share Icons -->
            <div class="flex items-center gap-3 mb-6">
              <a
                href="#"
                class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Share on X"
              >
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
                <a href="#"
                class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Share on Facebook"
              >
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
                <a href="#"
                class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            <!-- Article Title -->
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {{ guide.title }}
            </h1>
          </div>

          <!-- Article Content -->
          <div class="prose prose-lg max-w-none">
            <div
              v-html="processedContent"
              class="article-content font-manrope"
              @error="handleImageError"
            ></div>
          </div>

          <!-- Need More Help Section -->
          <div class="mt-12 bg-blue-50 rounded-lg p-6 sm:p-8 text-center">
            <h2 class="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
              Need more help?
            </h2>
            <p class="text-blue-700 mb-6">
              Contact us now for expert guidance and support through your visa process.
            </p>
            <NuxtLink
              to="/contact-us"
              class="inline-block bg-[#1ECE84] hover:bg-[#1AB876] text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Contact us today
              <svg class="w-4 h-4 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Author Section -->
          <div v-if="guide.author" class="mt-12 flex items-start gap-4">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                v-if="guide.author.avatar"
                :src="guide.author.avatar"
                :alt="guide.author.name"
                class="w-full h-full object-cover"
              />
              <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Author</p>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ guide.author.name }}</h3>
              <p v-if="guide.author.bio" class="text-gray-600 text-sm">
                {{ guide.author.bio }}
              </p>
            </div>
          </div>

          <!-- Related Guides -->
          <div v-if="relatedGuides.length > 0" class="mt-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Related guides</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NuxtLink
                v-for="relatedGuide in relatedGuides"
                :key="relatedGuide.id"
                :to="`/guides/${relatedGuide.slug || relatedGuide.id}`"
                class="group"
              >
                <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#1ECE84] transition-colors">
                    {{ relatedGuide.title }}
                  </h3>
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {{ relatedGuide.excerpt || relatedGuide.content?.substring(0, 120) }}
                  </p>
                  <div class="flex items-center gap-2 mt-3">
                    <span class="text-xs text-gray-500">
                      {{ formatDate(relatedGuide.publishedAt || relatedGuide.createdAt) }}
                    </span>
                    <span v-if="relatedGuide.category" class="text-xs text-blue-600">
                      {{ relatedGuide.category }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted,onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGuidesApi, type Guide } from '@/composables/useGuides'
import { useCountriesApi } from '@/composables/useCountries'
import { useVisaProductsApi } from '@/composables/useVisaProducts'
import Header from '@/components/Header.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'

const route = useRoute()
const router = useRouter()
const { getGuideBySlug, getGuides } = useGuidesApi()
const { getCountries } = useCountriesApi()
const { getGroupedVisaProductsByCountries } = useVisaProductsApi()
const config = useRuntimeConfig()

const guide = ref<Guide | null>(null)
const relatedGuides = ref<Guide[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const countries = ref<any[]>([])
const destinationCountries = ref<any[]>([])
const selectedNationality = ref<string>('')
const selectedDestination = ref<string>('')
  const activeHeading = ref<number>(0)

const contentHeadings = computed(() => {
  if (!guide.value?.content || typeof window === 'undefined') return []
  
  try {
    const headings: { text: string; id: string }[] = []
    const parser = new DOMParser()
    const doc = parser.parseFromString(guide.value.content, 'text/html')
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    headingElements.forEach((heading, index) => {
      headings.push({
        text: heading.textContent || '',
        id: `heading-${index}`
      })
    })
    
    return headings
  } catch (error) {
    console.error('Error parsing content headings:', error)
    return []
  }
})

const getFullLogoUrl = (logoUrl: string): string => {
  if (!logoUrl) return ''
  if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
    return logoUrl
  }
  const baseUrl = config.public.apiBase.replace(/\/+$/, '')
  const path = logoUrl.startsWith('/') ? logoUrl : `/${logoUrl}`
  return `${baseUrl}${path}`
}

const getCountryName = (countryId: string) => {
  const country = countries.value.find(c => String(c.id) === countryId)
  return country?.countryName || ''
}

const getCountryLogo = (countryId: string): string | undefined => {
  const country = countries.value.find(c => String(c.id) === countryId)
  if (!country?.logoUrl) {
    return undefined
  }
  const logoUrl = country.logoUrl
  if (logoUrl === null || logoUrl === '') {
    return undefined
  }
  return getFullLogoUrl(logoUrl)
}

const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.error('❌ Logo failed to load:', img.src)
  img.style.display = 'none'
}

const destinationCountry = computed(() => {
  if (!selectedDestination.value) return null
  return destinationCountries.value.find(c => String(c.id) === selectedDestination.value)
})

const processedContent = computed(() => {
  if (!guide.value?.content) {
    return ''
  }

  if (typeof window === 'undefined') {
    return guide.value.content
  }

  try {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = guide.value.content

    // Add IDs to headings for navigation
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading, index) => {
      heading.setAttribute('id', `heading-${index}`)
    })

    const images = tempDiv.querySelectorAll('img')

    images.forEach((img, index) => {
      const originalSrc = img.getAttribute('src')

      if (originalSrc) {
        const fileExtension = originalSrc.split('.').pop()?.toLowerCase()
        
        if (fileExtension === 'heic' || fileExtension === 'heif') {
          if (originalSrc.includes('cloudinary.com')) {
            if (!originalSrc.includes('/f_')) {
              const convertedUrl = originalSrc.replace(
                /\/upload\/(v\d+\/)?/,
                '/upload/$1f_jpg/'
              )
              img.setAttribute('src', convertedUrl)
            }
          }
        }
        
        if (originalSrc.startsWith('http://') || originalSrc.startsWith('https://')) {
          return
        }

        const baseUrl = config.public.apiBase.replace(/\/+$/, '')
        const imagePath = originalSrc.startsWith('/') ? originalSrc : `/${originalSrc}`
        const fullImageUrl = `${baseUrl}${imagePath}`

        img.setAttribute('src', fullImageUrl)
      }
    })

    return tempDiv.innerHTML
  } catch (error) {
    console.error('❌ Error processing content:', error)
    return guide.value.content
  }
})

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.error('❌ Image error in article content:', {
    src: img.src,
    alt: img.alt,
  })
}

const fetchGuide = async () => {
  loading.value = true
  error.value = null

  try {
    const slug = route.params.slug as string
    
    const response = await getGuideBySlug(slug)
    
    if (response.success && response.data) {
      guide.value = response.data
      
      if (guide.value.category) {
        const relatedResponse = await getGuides({ 
          category: guide.value.category,
          limit: 3 
        })
        if (relatedResponse.success && relatedResponse.data?.data) {
          relatedGuides.value = relatedResponse.data.data
            .filter(g => g.id !== guide.value?.id)
            .slice(0, 3)
        }
      }
    } else {
      error.value = response.message || 'Guide not found'
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred while loading the guide'
  } finally {
    loading.value = false
  }
}

const fetchCountries = async () => {
  try {
    const countriesResponse = await getCountries()
    if (countriesResponse.success && countriesResponse.data) {
      countries.value = countriesResponse.data
      
      if (countries.value.length > 0 && countries.value[0]) {
        selectedNationality.value = String(countries.value[0].id)
      }
    }
    
    const visaProductsResponse = await getGroupedVisaProductsByCountries()
    if (visaProductsResponse.success && visaProductsResponse.data) {
      const visaProductCountryNames = visaProductsResponse.data.map(item => item.country)
      
      destinationCountries.value = countries.value
        .filter(country => visaProductCountryNames.includes(country.countryName))
        .sort((a, b) => a.countryName.localeCompare(b.countryName))
      
      if (destinationCountries.value.length > 0 && destinationCountries.value[0]) {
        selectedDestination.value = String(destinationCountries.value[0].id)
      }
    } else {
      destinationCountries.value = countries.value
      
      if (destinationCountries.value.length > 0 && destinationCountries.value[0]) {
        selectedDestination.value = String(destinationCountries.value[0].id)
      }
    }
  } catch (err) {
    console.error('Error fetching countries:', err)
    if (countries.value.length > 0) {
      destinationCountries.value = countries.value
      
      if (countries.value.length > 0) {
        selectedNationality.value = String(countries.value[0].id)
        selectedDestination.value = String(countries.value[0].id)
      }
    }
  }
}

const handleApplyNow = () => {
  if (selectedNationality.value && selectedDestination.value) {
    const fromCountry = countries.value.find(c => String(c.id) === selectedNationality.value)
    const toCountry = destinationCountries.value.find(c => String(c.id) === selectedDestination.value)
    
    router.push({
      path: '/visa-application',
      query: {
        fromId: selectedNationality.value,
        toId: selectedDestination.value,
        from: fromCountry?.countryName || '',
        to: toCountry?.countryName || ''
      }
    })
  } else {
    router.push('/visa-application')
  }
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  } catch {
    return dateString
  }
}

watch(() => guide.value?.content, () => {
  if (process.client && guide.value?.content) {
    nextTick(() => {
      processImagesInContent()
    })
  }
}, { immediate: false })



const processImagesInContent = () => {
  if (typeof window === 'undefined') return
  
  const articleContent = document.querySelector('.article-content')
  if (!articleContent) {
    return
  }

  const images = articleContent.querySelectorAll('img')

  images.forEach((img, index) => {
    const originalSrc = img.getAttribute('src')
    const fileExtension = originalSrc?.split('.').pop()?.toLowerCase()

    if (fileExtension === 'heic' || fileExtension === 'heif') {
      if (originalSrc && originalSrc.includes('cloudinary.com')) {
        if (!originalSrc.includes('/f_')) {
          const convertedUrl = originalSrc.replace(
            /\/upload\/(v\d+\/)?/,
            '/upload/$1f_jpg/'
          )
          img.src = convertedUrl
        }
      }
    }

    img.addEventListener('error', () => {
      img.style.border = '2px dashed #ef4444'
      img.alt = img.alt || 'Image failed to load'
    }, { once: true })
  })
}

const scrollToHeading = (index: number) => {
  const element = document.getElementById(`heading-${index}`)
  if (element) {
    const headerOffset = 100 // Account for fixed header
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const updateActiveHeading = () => {
  const headings = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6')
  
  if (headings.length === 0) return

  const headerOffset = 120

  for (let i = headings.length - 1; i >= 0; i--) {
    const heading = headings[i] as HTMLElement
    const rect = heading.getBoundingClientRect()
    
    if (rect.top <= headerOffset) {
      activeHeading.value = i
      return
    }
  }
  
  // If no heading is above the threshold, set the first one as active
  activeHeading.value = 0
}

onMounted(async () => {
  await Promise.all([fetchGuide(), fetchCountries()])
  
  if (process.client) {
    nextTick(() => {
      processImagesInContent()
    })
    
    // Add scroll listener for active heading tracking
    window.addEventListener('scroll', updateActiveHeading)
    // Initial check
    updateActiveHeading()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', updateActiveHeading)
  }
})

useHead(() => ({
  title: guide.value?.metaTitle || guide.value?.title || 'Guide',
  meta: [
    {
      name: 'description',
      content: guide.value?.metaDescription || guide.value?.excerpt || guide.value?.content?.substring(0, 160) || ''
    }
  ]
}))
</script>

<style scoped>
.prose {
  color: #0B3947;
  font-family: 'Manrope', sans-serif;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
  color: #0B3947;
  line-height: 1.3;
}

.prose :deep(h1) {
  font-size: 1.25rem;
}

@media (min-width: 640px) {
  .prose :deep(h1) {
    font-size: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .prose :deep(h1) {
    font-size: 1.75rem;
  }
}

.prose :deep(h2) {
  font-size: 1.125rem;
}

@media (min-width: 640px) {
  .prose :deep(h2) {
    font-size: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .prose :deep(h2) {
    font-size: 1.5rem;
  }
}

.prose :deep(h3) {
  font-size: 1rem;
}

@media (min-width: 640px) {
  .prose :deep(h3) {
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .prose :deep(h3) {
    font-size: 1.25rem;
  }
}

.prose :deep(p) {
  font-family: 'Manrope', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.625;
  color: #0B3947;
  margin-bottom: 0.75rem;
}

@media (min-width: 640px) {
  .prose :deep(p) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
}

@media (min-width: 1024px) {
  .prose :deep(p) {
    line-height: 1.75;
  }
}

.prose :deep(ul),
.prose :deep(ol) {
  margin-bottom: 1.25em;
  padding-left: 1.625em;
  font-family: 'Manrope', sans-serif;
  color: #0B3947;
}

.prose :deep(li) {
  margin-bottom: 0.5em;
  font-family: 'Manrope', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.75;
  color: #0B3947;
}

@media (min-width: 640px) {
  .prose :deep(li) {
    font-size: 1rem;
    line-height: 1.5;
  }
}

@media (min-width: 1024px) {
  .prose :deep(li) {
    line-height: 1.75;
  }
}

.prose :deep(strong) {
  font-weight: 700;
  color: #0B3947;
}

.prose :deep(a) {
  color: #1ECE84;
  text-decoration: underline;
}

.prose :deep(a:hover) {
  color: #1AB876;
}

.prose :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.5em 0;
}

.prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
}

.prose :deep(th),
.prose :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 0.75em;
  text-align: left;
}

.prose :deep(th) {
  background-color: #f9fafb;
  font-weight: 600;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>