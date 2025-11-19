<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto max-w-4xl px-6">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ECE84]"></div>
        <p class="mt-4 text-gray-600">Loading application details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
          <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Application Not Found</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <NuxtLink
            to="/"
            class="inline-block bg-[#1ECE84] text-white px-6 py-3 rounded-lg hover:bg-[#17b872] transition-colors"
          >
            Return to Home
          </NuxtLink>
        </div>
      </div>

      <!-- Application Details -->
      <div v-else-if="application" class="space-y-6">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Track Your Application</h1>
              <p class="text-gray-600">Application Number: <span class="font-semibold text-[#1ECE84]">{{ application.applicationNumber }}</span></p>
            </div>
            <div :class="getStatusBadgeClass(application.status)">
              {{ application.status }}
            </div>
          </div>
        </div>

        <!-- Status Timeline -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 class="text-xl font-semibold mb-4">Application Status</h2>
          <div class="space-y-4">
            <div v-for="(step, index) in statusSteps" :key="index" class="flex items-start gap-4">
              <div class="flex flex-col items-center">
                <div 
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    step.completed ? 'bg-[#1ECE84] text-white' : 'bg-gray-200 text-gray-500'
                  ]"
                >
                  <svg v-if="step.completed" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div v-if="index < statusSteps.length - 1" :class="['w-0.5 h-16', step.completed ? 'bg-[#1ECE84]' : 'bg-gray-200']"></div>
              </div>
              <div class="flex-1 pb-8">
                <h3 :class="['font-semibold', step.completed ? 'text-gray-900' : 'text-gray-500']">
                  {{ step.title }}
                </h3>
                <p :class="['text-sm mt-1', step.completed ? 'text-gray-600' : 'text-gray-400']">
                  {{ step.description }}
                </p>
                <p v-if="step.date" class="text-xs text-gray-500 mt-1">
                  {{ formatDate(step.date) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Details -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 class="text-xl font-semibold mb-4">Application Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Visa Type</p>
              <p class="font-semibold text-gray-900">{{ formatVisaType(application.visaType) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Processing Type</p>
              <p class="font-semibold text-gray-900">{{ formatProcessingType(application.processingType) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Destination</p>
              <p class="font-semibold text-gray-900">{{ application.destinationCountry }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Number of Travelers</p>
              <p class="font-semibold text-gray-900">{{ application.numberOfTravelers }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Submitted On</p>
              <p class="font-semibold text-gray-900">{{ formatDate(application.createdAt) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Payment Status</p>
              <p class="font-semibold" :class="application.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'">
                {{ application.paymentStatus }}
              </p>
            </div>
          </div>
        </div>

        <!-- Admin Notes (if any) -->
        <div v-if="application.adminNotes" class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="font-semibold text-blue-900 mb-2">📝 Notes from Admin</h3>
          <p class="text-blue-800">{{ application.adminNotes }}</p>
        </div>

        <!-- Call to Action -->
        <div v-if="!isAuthenticated" class="bg-gradient-to-r from-[#00C6A7] to-[#26D07A] rounded-lg p-6 text-white text-center">
          <h3 class="text-xl font-semibold mb-2">Want to Track Your Application Easily?</h3>
          <p class="mb-4 opacity-90">Create an account to get instant updates and manage your applications</p>
          <NuxtLink
            :to="`/sign-up?applicationNumber=${application.applicationNumber}&email=${application.customer?.email || ''}&fullName=${application.customer?.fullname || ''}`"
            class="inline-block bg-white text-[#1ECE84] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Create Account
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRuntimeConfig } from '#app'

const route = useRoute()
const config = useRuntimeConfig()

const application = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Check if user is authenticated
const { isAuthenticated } = useAuthApi()

// Fetch application details
const fetchApplication = async () => {
  try {
    const applicationNumber = route.params.applicationNumber as string
    const baseUrl = config.public.apiBase.replace(/\/+$/, '')
    
    const response = await fetch(`${baseUrl}/visa-applications/track/${applicationNumber}`)
    const result = await response.json()

    if (!response.ok || !result.status) {
      throw new Error(result.message || 'Application not found')
    }

    application.value = result.data
    console.log('✅ Application loaded:', application.value)
  } catch (err: any) {
    error.value = err.message || 'Failed to load application'
    console.error('❌ Error loading application:', err)
  } finally {
    loading.value = false
  }
}

// Status steps for timeline
const statusSteps = computed(() => {
  if (!application.value) return []

  const currentStatus = application.value.status?.toLowerCase() || ''
  
  const steps = [
    {
      title: 'Application Submitted',
      description: 'Your application has been received',
      completed: true,
      date: application.value.createdAt
    },
    {
      title: 'Under Review',
      description: 'Our team is reviewing your application',
      completed: ['under review', 'additional info required', 'resubmission', 'in progress', 'completed'].includes(currentStatus),
      date: application.value.updatedAt
    },
    {
      title: 'Processing',
      description: 'Your application is being processed',
      completed: ['in progress', 'completed'].includes(currentStatus),
      date: null
    },
    {
      title: 'Completed',
      description: 'Your visa application is ready',
      completed: currentStatus === 'completed',
      date: currentStatus === 'completed' ? application.value.updatedAt : null
    }
  ]

  // Handle special statuses
  if (currentStatus === 'additional info required') {
    steps[1].title = 'Additional Information Required'
    steps[1].description = 'Please provide additional information'
  } else if (currentStatus === 'resubmission') {
    steps[1].title = 'Resubmission Required'
    steps[1].description = 'Please resubmit your application with corrections'
  }

  return steps
})

// Helper functions
const getStatusBadgeClass = (status: string) => {
  const statusLower = status?.toLowerCase() || ''
  const baseClasses = 'px-4 py-2 rounded-full text-sm font-semibold'
  
  if (statusLower === 'completed') return `${baseClasses} bg-green-100 text-green-800`
  if (statusLower === 'in progress') return `${baseClasses} bg-blue-100 text-blue-800`
  if (statusLower === 'under review') return `${baseClasses} bg-yellow-100 text-yellow-800`
  if (statusLower === 'additional info required') return `${baseClasses} bg-orange-100 text-orange-800`
  if (statusLower === 'resubmission') return `${baseClasses} bg-red-100 text-red-800`
  
  return `${baseClasses} bg-gray-100 text-gray-800`
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatVisaType = (visaType: string) => {
  if (!visaType) return 'N/A'
  const [days, type] = visaType.split('-')
  return `${days} Days - ${type.charAt(0).toUpperCase() + type.slice(1)} Entry`
}

const formatProcessingType = (type: string) => {
  if (!type) return 'N/A'
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

// Fetch on mount
onMounted(() => {
  fetchApplication()
})

// SEO
useHead({
  title: `Track Application ${route.params.applicationNumber}`,
  meta: [
    { name: 'description', content: 'Track your visa application status' }
  ]
})
</script>

