<template>
  <div class="flex justify-center pt-10 pb-20 min-h-screen px-4">
    <div class="flex flex-col w-full max-w-[1400px] gap-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Button 
            @click="goBack"
            variant="ghost" 
            size="icon" 
            class="rounded-md w-[42px] h-[36px] border border-[#E4E4E8]"
          >
            <ChevronLeft class="h-5 w-5" />
          </Button>
          <h1 class="text-2xl font-semibold tracking-tight font-geist text-[#27272B]">
            My Orders
          </h1>
        </div>
        <div class="flex gap-2">
          <Button 
            @click="fetchApplications"
            variant="outline"
            class="rounded-lg font-geist"
          >
            Refresh
          </Button>
          <Button 
            @click="navigateTo('/')"
            class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white font-geist"
          >
            Create New Order
          </Button>
        </div>
      </div>

      <!-- Search Bar -->
      <div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search Applications"
          class="h-9 px-3 py-1 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 font-geist bg-white w-full sm:w-[384px]"
          style="box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);"
        />
      </div>

      <!-- Alerts for Applications Requiring Additional Info -->
<div v-if="applicationsNeedingInfo.length > 0" class="rounded-lg border border-orange-200 bg-orange-50 p-4 text-orange-900">
  <div class="flex items-start gap-3">
    <svg class="w-5 h-5 mt-0.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5.07 19h13.86A2.07 2.07 0 0021 16.93L13.93 4.14a2.07 2.07 0 00-3.86 0L3 16.93A2.07 2.07 0 005.07 19z" />
    </svg>
    <div class="flex-1">
      <p class="font-medium font-geist">
        {{ applicationsNeedingInfo.length }} application{{ applicationsNeedingInfo.length > 1 ? 's' : '' }} need additional information
      </p>
      <div class="mt-2 flex flex-wrap gap-2">
        <Button 
          v-for="app in applicationsNeedingInfo.slice(0, 3)" 
          :key="app.id"
          @click="navigateToAdditionalInfo(app.id)"
          class="h-8 px-3 rounded-md text-white text-xs font-medium"
          style="background-color: #1ECE84;"
        >
          Fill Info • #{{ app.applicationNumber }}
        </Button>
        <span v-if="applicationsNeedingInfo.length > 3" class="text-xs text-orange-800 self-center">
          +{{ applicationsNeedingInfo.length - 3 }} more
        </span>
      </div>
    </div>
  </div>
</div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ECE84]"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredOrders || filteredOrders.length === 0" class="bg-white rounded-xl shadow-sm p-12 text-center border">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
          <p class="text-gray-600 mb-6">You haven't placed any visa applications yet. Start your journey today!</p>
          <Button 
            @click="navigateTo('/')"
            class="!bg-[#1ECE84] hover:!bg-[#1AB876] !text-white"
          >
            Apply for Visa
          </Button>
        </div>
      </div>

      <!-- Orders Table -->
      <div v-else class="border border-[#E5E7EB] rounded-lg bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow class="bg-white hover:bg-white">
              <TableHead class="w-[50px]">
                <Checkbox 
                  :checked="selectedOrders.length === filteredOrders.length"
                  @update:checked="toggleAllOrders"
                />
              </TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Application #</TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Customer Name</TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Destination</TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Travelers</TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Price</TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Status</TableHead>
              <TableHead class="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow 
              v-for="order in filteredOrders" 
              :key="order.id" 
              class="hover:bg-gray-50"
            >
              <TableCell>
                <Checkbox 
                  :checked="selectedOrders.includes(order.id)"
                  @update:checked="() => toggleOrderSelection(order.id)"
                />
              </TableCell>
              <TableCell class="font-geist text-[#27272B]">{{ order.applicationNumber }}</TableCell>
              <TableCell class="font-geist text-[#27272B]">{{ getCustomerName(order) }}</TableCell>
              <TableCell class="font-geist text-[#27272B]">{{ order.destinationCountry }}</TableCell>
              <TableCell class="font-geist text-[#27272B]">{{ order.numberOfTravelers }}</TableCell>
              <TableCell class="font-geist text-[#27272B]">{{ formatPrice(order.totalAmount) }}</TableCell>
              <TableCell>
                <span 
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-geist"
                  :class="getStatusClass(getEffectiveStatus(order))"
                >
                  {{ formatStatus(getEffectiveStatus(order)) }}
                </span>
              </TableCell>
              <TableCell>
                <div class="flex items-center gap-2">
                  <Button 
                  v-if="(getEffectiveStatus(order) === 'resubmission' || getEffectiveStatus(order) === 'Additional Info required') && !isAdditionalInfoSubmitted(order.id)"
                  @click="navigateToAdditionalInfo(order.id)"
                  class="h-8 px-3 rounded-md text-white text-xs font-medium"
                  style="background-color: #1ECE84;"
                >
                  Fill Info
                </Button>
                  <Button 
                    @click="viewOrder(order)"
                    variant="ghost" 
                    size="icon"
                    class="h-8 w-8 rounded-md hover:bg-gray-100"
                  >
                    <Eye class="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <!-- Footer -->
        <div class="flex items-center justify-between px-6 py-4 border-t">
          <div class="text-sm text-[#64748B] font-geist">
            {{ selectedOrders.length }} of {{ filteredOrders.length }} row(s) selected.
          </div>
          <div class="text-xs text-[#64748B] font-geist">
            Prices shown in {{ selectedCurrency.code }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ChevronLeft, Eye } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Table from '@/components/ui/table/Table.vue'
import TableBody from '@/components/ui/table/Tablebody.vue'
import TableCell from '@/components/ui/table/Tablecell.vue'
import TableHead from '@/components/ui/table/Tablehead.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableRow from '@/components/ui/table/Tablerow.vue'

const router = useRouter()
const route = useRoute()
const { getMyApplications, formatStatus } = useVisaApplications()
const { currentUser } = useAuthApi()
const { checkAllAdditionalInfoSubmitted, getFieldsByApplication } = useVisaProductFieldsApi()

// Currency conversion
const { formatPrice, selectedCurrency } = useCurrency()

const selectedOrders = ref<number[]>([])
const searchQuery = ref('')
const applications = ref<any[]>([])
const loading = ref(true)
const error = ref('')
const additionalInfoSubmittedMap = ref<Record<number, boolean>>({})
const hasAdditionalInfoFieldsMap = ref<Record<number, boolean>>({}) // Track which applications have additional info fields

// Computed filtered orders based on search
const filteredOrders = computed(() => {
  if (!searchQuery.value) return applications.value
  
  const query = searchQuery.value.toLowerCase()
  return applications.value.filter(order => 
    order.applicationNumber.toLowerCase().includes(query) ||
    order.destinationCountry.toLowerCase().includes(query) ||
    getCustomerName(order).toLowerCase().includes(query)
  )
})

// Applications that currently require additional info
const applicationsNeedingInfo = computed(() => {
  return applications.value.filter(app => {
    const status = getEffectiveStatus(app)
    return status === 'Additional Info required' || status === 'resubmission'
  })
})

onMounted(async () => {
  await fetchApplications()
})

// Refresh when route changes (e.g., navigating back to this page)
watch(() => route.path, async (newPath) => {
  if (newPath === '/my-account/my-orders') {
    console.log('🔄 Route changed to my-orders, refreshing applications...')
    await fetchApplications()
  }
}, { immediate: false })

const fetchApplications = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await getMyApplications()
    
    
    if (response.success && response.data) {
      
      // Check if data is an array or if it's nested differently
      let applicationsArray = response.data.data
      
      // Handle different response structures
      if (!Array.isArray(applicationsArray)) {
        // Maybe the data is directly in response.data?
        if (Array.isArray(response.data)) {
          applicationsArray = response.data
        } else if (response.data && Array.isArray(response.data.applications)) {
          applicationsArray = response.data.applications
        } else {
          console.error('❌ Applications data is not an array:', applicationsArray)
          applicationsArray = []
        }
      }
      
      // Convert string amounts to numbers
      applications.value = applicationsArray.map((app: any) => ({
        ...app,
        totalAmount: Number(app.totalAmount || 0),
        processingFee: Number(app.processingFee || 0),
        governmentFee: Number(app.governmentFee || 0),
        serviceFee: Number(app.serviceFee || 0)
      }))
      
      console.log('✅ Applications loaded:', applications.value)
      console.log('✅ Number of applications:', applications.value.length)
      
      // Check additional info submission status for applications that require it
      await checkAdditionalInfoStatus()
    } else {
      console.error('❌ Response not successful:', response)
      error.value = response.message || 'Failed to load applications'
    }
  } catch (err: any) {
    console.error('❌ Error fetching applications:', err)
    error.value = err.message || 'Failed to load applications'
  } finally {
    loading.value = false
  }
}

const getCustomerName = (order: any) => {
  // First, try to get the customer name from the order's customer object
  if (order.customer && order.customer.fullname) {
    return order.customer.fullname
  }
  
  // Fallback: use first traveler's name
  if (order.travelers && order.travelers.length > 0) {
    const firstTraveler = order.travelers[0]
    return `${firstTraveler.firstName} ${firstTraveler.lastName}`
  }
  
  // Last resort: use current user's name
  if (currentUser.value?.fullName) {
    return currentUser.value.fullName
  }
  
  return 'N/A'
}

const goBack = () => {
  router.back()
}

const viewOrder = (order: any) => {
  router.push(`/my-account/my-orders/${order.id}`)
}

const navigateToAdditionalInfo = (applicationId: number) => {
  router.push(`/my-account/additional-info?applicationId=${applicationId}`)
}

const toggleOrderSelection = (id: number) => {
  if (selectedOrders.value.includes(id)) {
    selectedOrders.value = selectedOrders.value.filter(orderId => orderId !== id)
  } else {
    selectedOrders.value = [...selectedOrders.value, id]
  }
}

const toggleAllOrders = () => {
  if (selectedOrders.value.length === filteredOrders.value.length) {
    selectedOrders.value = []
  } else {
    selectedOrders.value = filteredOrders.value.map(o => o.id)
  }
}

// Check additional info submission status for all applications
// This checks ALL applications, not just those with 'Additional Info required' status
// to ensure we show the correct status even if backend status is incorrect
const checkAdditionalInfoStatus = async () => {
  for (const app of applications.value) {
    try {
      const travelers = app.travelers || []
      
      // First, check if there are any additional info fields
      let hasFields = false
      try {
        // Check application-level fields
        const appFieldsResponse = await getFieldsByApplication(app.id)
        const hasAppFields = appFieldsResponse.success && appFieldsResponse.data && appFieldsResponse.data.length > 0
        
        // Check if any traveler has fields
        let hasTravelerFields = false
        for (const traveler of travelers) {
          if (traveler.id) {
            const travelerFieldsResponse = await getFieldsByApplication(app.id, traveler.id)
            if (travelerFieldsResponse.success && travelerFieldsResponse.data && travelerFieldsResponse.data.length > 0) {
              hasTravelerFields = true
              break
            }
          }
        }
        
        hasFields = hasAppFields || hasTravelerFields
        hasAdditionalInfoFieldsMap.value[app.id] = hasFields
      } catch (err) {
        console.error(`Error checking fields for application ${app.id}:`, err)
        hasAdditionalInfoFieldsMap.value[app.id] = false
      }
      
      // Then check if all additional info has been submitted
      const allSubmitted = await checkAllAdditionalInfoSubmitted(
        app.id,
        travelers,
        app.numberOfTravelers
      )
      additionalInfoSubmittedMap.value[app.id] = allSubmitted
    } catch (err) {
      console.error(`Error checking additional info for application ${app.id}:`, err)
      additionalInfoSubmittedMap.value[app.id] = false
      hasAdditionalInfoFieldsMap.value[app.id] = false
    }
  }
}

const getEffectiveStatus = (order: any): string => {
  const backendStatus = order.status
  const hasFields = hasAdditionalInfoFieldsMap.value[order.id] || false
  const allSubmitted = additionalInfoSubmittedMap.value[order.id] || false
  
  // Debug logging
  console.log(`🔍 getEffectiveStatus for app ${order.id}:`, {
    backendStatus,
    hasFields,
    allSubmitted,
    applicationNumber: order.applicationNumber
  })
  
  // ✅ CRITICAL FIX: Always trust backend status for 'resubmission'
  // Don't override it even if all fields are submitted
  if (backendStatus === 'resubmission') {
    console.log(`  ⚠️ Returning 'resubmission' (backend status)`)
    return 'resubmission'
  }
  
  // For legacy 'Additional Info required' status, apply the old logic
  if (allSubmitted && backendStatus === 'Additional Info required') {
    console.log(`  ✅ Returning 'processing' (all submitted)`)
    return 'processing'
  }
  
  // Show 'Additional Info required' when needed
  if (backendStatus === 'Additional Info required' && hasFields && !allSubmitted) {
    console.log(`  ⚠️ Returning 'Additional Info required' (needs info)`)
    return 'Additional Info required'
  }
  
  // Otherwise, show the backend status
  console.log(`  ℹ️ Returning backend status: ${backendStatus}`)
  return backendStatus
}


// Check if additional info is submitted for an order
const isAdditionalInfoSubmitted = (orderId: number): boolean => {
  return additionalInfoSubmittedMap.value[orderId] === true
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'draft': 'bg-gray-50 text-gray-600 border border-gray-200',
    'pending': 'bg-[#FFF6E1] text-[#E2B72C] border border-[#B0A999]',
    'processing': 'bg-[#F1FDF4] text-[#0673DF] border border-[#0673DF]',
    'under_review': 'bg-indigo-50 text-indigo-700 border border-indigo-300',
    'approved': 'bg-[#F1FDF4] text-[#08CA69] border border-[#06DF73]',
    'completed': 'bg-[#F1FDF4] text-[#08CA69] border border-[#06DF73]', // Same green styling as approved
    'rejected': 'bg-red-50 text-red-600 border border-red-200',
    'cancelled': 'bg-gray-50 text-gray-600 border border-gray-200',
    'submitted': 'bg-blue-50 text-blue-600 border border-blue-200',
    'Additional Info required': 'bg-orange-50 text-orange-700 border border-orange-300',
    'resubmission': 'bg-orange-50 text-orange-700 border border-orange-300' // Same styling as Additional Info required
  }
  return classes[status] || 'bg-gray-50 text-gray-600 border border-gray-200'
}

</script>