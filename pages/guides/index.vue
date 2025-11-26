<template>
  <div class="min-h-screen bg-white">
    <Header />

    <!-- Main Content -->
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-0 pb-16">
      <!-- Page Title -->
      <h1 class="font-manrope font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight sm:leading-[32px] lg:leading-[40px] tracking-normal text-[#0B3947] mb-8 sm:mb-12">
        Guides
      </h1>

      <!-- Hero Section with Featured Guide -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <!-- Main Featured Guide (Left - 2 columns) -->
        <div class="lg:col-span-2 relative">
          <div v-if="loading" class="animate-pulse">
            <div class="bg-gray-200 rounded-lg h-[400px] sm:h-[500px]"></div>
          </div>
          
          <div v-else-if="featuredGuide" class="relative rounded-lg overflow-hidden h-[400px] sm:h-[500px]">
            <!-- Full Background Image -->
            <img
              v-if="featuredGuide.featuredImage"
              :src="featuredGuide.featuredImage"
              :alt="featuredGuide.title"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-gradient-to-br from-[#1ECE84] to-[#1AB876] flex items-center justify-center">
              <svg class="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <!-- Overlay Card (Bottom Left - Small) -->
            <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-md bg-white rounded-lg p-4 sm:p-6 shadow-lg">
              <div class="flex flex-col">
                <!-- New Article Badge -->
                <span class="inline-block w-fit px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full mb-3">
                  New article
                </span>
                
                <!-- Title -->
                <NuxtLink :to="`/guides/${featuredGuide.slug || featuredGuide.id}`">
                  <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 hover:text-[#1ECE84] transition-colors line-clamp-2">
                    {{ featuredGuide.title }}
                  </h2>
                </NuxtLink>
                
                <!-- Description -->
                <p class="text-sm sm:text-base text-gray-600 mb-3 line-clamp-2">
                  {{ featuredGuide.excerpt || featuredGuide.content?.substring(0, 120) || 'Read more about this guide...' }}
                </p>
                
                <!-- Date -->
                <p class="text-xs sm:text-sm text-gray-500">
                  {{ formatDate(featuredGuide.publishedAt || featuredGuide.createdAt) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Fallback if no featured guide -->
          <div v-else class="relative rounded-lg overflow-hidden h-[400px] sm:h-[500px] bg-gray-200 flex items-center justify-center">
            <p class="text-gray-500">No featured guide available</p>
          </div>
        </div>

        <!-- Featured Guides Sidebar (Right - 1 column) -->
        <aside class="lg:col-span-1">
          <div class="bg-white rounded-lg">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6">The featured</h2>
            
            <!-- Loading State -->
            <div v-if="loading" class="space-y-4">
              <div v-for="i in 3" :key="i" class="animate-pulse">
                <div class="bg-gray-200 h-24 rounded"></div>
              </div>
            </div>

            <!-- Featured Guides List -->
            <div v-else-if="featuredGuides.length > 0" class="space-y-4">
              <NuxtLink
                v-for="guide in featuredGuides"
                :key="guide.id"
                :to="`/guides/${guide.slug || guide.id}`"
                class="block group"
              >
                <div class="bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <!-- Title -->
                  <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#1ECE84] transition-colors line-clamp-2">
                    {{ guide.title }}
                  </h3>
                  
                  <!-- Description -->
                  <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                    {{ guide.excerpt || guide.content?.substring(0, 100) || 'Read more...' }}
                  </p>
                  
                  <!-- Date and Read Time -->
                  <div class="flex items-center gap-2 text-xs text-gray-500">
                    <span>{{ formatDate(guide.publishedAt || guide.createdAt) }}</span>
                    <span>•</span>
                    <span>min read</span>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-8">
              <p class="text-gray-500 text-sm">No featured guides available</p>
            </div>
          </div>
        </aside>
      </div>

      <!-- Explore Visa Guides Heading -->
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">
        Explore Visa Guides
      </h2>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors whitespace-nowrap',
            selectedCategory === category
              ? 'bg-[#1ECE84] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Error State -->
      <div v-if="error && !loading" class="text-center py-12">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="fetchGuides"
          class="px-6 py-2 bg-[#1ECE84] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>

      <!-- Guides Grid -->
      <div v-else-if="filteredGuides.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <NuxtLink
          v-for="guide in filteredGuides"
          :key="guide.id"
          :to="`/guides/${guide.slug || guide.id}`"
          class="group cursor-pointer"
        >
          <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
            <!-- Guide Image -->
            <div class="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-200">
              <img
                v-if="guide.featuredImage"
                :src="guide.featuredImage"
                :alt="guide.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1ECE84] to-[#1AB876]">
                <svg class="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

            <!-- Guide Content -->
            <div class="p-4 sm:p-6">
              <!-- Date and Category -->
              <div class="flex items-center gap-3 mb-3">
                <span class="text-xs sm:text-sm text-gray-500">
                  {{ formatDate(guide.publishedAt || guide.createdAt) }}
                </span>
                <span
                  v-if="guide.category || guide.categoryTag"
                  class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                >
                  {{ guide.category || guide.categoryTag }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#1ECE84] transition-colors line-clamp-2">
                {{ guide.title }}
              </h3>

              <!-- Description -->
              <p class="text-sm sm:text-base text-gray-600 line-clamp-2">
                {{ guide.excerpt || guide.content?.substring(0, 120) || 'Read more about this guide...' }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-gray-600 text-lg">No guides found</p>
        <p class="text-gray-500 text-sm mt-2">Check back later for new guides</p>
      </div>

      <!-- Application Form Section -->
      <div class="mt-16 sm:mt-20">
        <ApplicationForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useGuidesApi, type Guide } from '@/composables/useGuides'
import Header from '@/components/Header.vue'
import ApplicationForm from '@/components/ApplicationForm.vue'

const { getGuides, getGuideCategories } = useGuidesApi()

const guides = ref<Guide[]>([])
const categories = ref<string[]>(['All Guides'])
const selectedCategory = ref<string>('All Guides')
const loading = ref(true)
const error = ref<string | null>(null)

// Get featured guide (the one with isFeatured: true)
const featuredGuide = computed(() => {
  const featured = guides.value.find(guide => guide.isFeatured === true)
  if (featured) {
    console.log('⭐ Featured guide found:', {
      id: featured.id,
      title: featured.title,
      isFeatured: featured.isFeatured
    })
  } else {
    console.log('⚠️ No featured guide found, falling back to latest')
  }
  return featured || null
})

// Get other featured guides for sidebar (excluding the main featured one)
const featuredGuides = computed(() => {
  const featuredGuidesList = guides.value
    .filter(guide => guide.isFeatured === true && guide.id !== featuredGuide.value?.id)
    .sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt || ''
      const dateB = b.publishedAt || b.createdAt || ''
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })
    .slice(0, 3)
  
  console.log(`⭐ Found ${featuredGuidesList.length} additional featured guides for sidebar`)
  return featuredGuidesList
})

// Filter guides (exclude featured guides from main grid)
const filteredGuides = computed(() => {
  let filtered = guides.value
  
  // Filter by category
  if (selectedCategory.value !== 'All Guides') {
    filtered = filtered.filter(guide => 
      guide.category === selectedCategory.value || 
      guide.categoryTag === selectedCategory.value
    )
  }
  
  // Exclude all featured guides from the grid (main featured + sidebar featured)
  const featuredGuideId = featuredGuide.value?.id
  const featuredIds = featuredGuides.value.map(g => g.id)
  const excludeIds = [featuredGuideId, ...featuredIds].filter(Boolean)
  
  return filtered.filter(guide => !excludeIds.includes(guide.id))
})

const fetchGuides = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await getGuides()
    if (response.success && response.data?.data) {
      guides.value = response.data.data
      
      // Extract unique categories
      const uniqueCategories = new Set<string>(['All Guides'])
      guides.value.forEach(guide => {
        if (guide.category) uniqueCategories.add(guide.category)
        if (guide.categoryTag) uniqueCategories.add(guide.categoryTag)
      })
      categories.value = Array.from(uniqueCategories)
    } else {
      error.value = response.message || 'Failed to load guides'
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred while loading guides'
    console.error('Error fetching guides:', err)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const response = await getGuideCategories()
    if (response.success && response.data) {
      categories.value = ['All Guides', ...response.data]
    }
  } catch (err) {
    console.error('Error fetching categories:', err)
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

// Watch for category changes
watch(selectedCategory, () => {
  // Category filtering is handled by computed property
})

onMounted(async () => {
  await Promise.all([fetchGuides(), fetchCategories()])
})

// SEO Meta
useHead({
  title: 'Visa Guides - Expert Travel Guides & Tips',
  meta: [
    {
      name: 'description',
      content: 'Explore our comprehensive visa guides and travel tips to help you navigate visa applications and travel requirements.'
    }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
