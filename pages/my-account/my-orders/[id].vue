<template>
  <div class="min-h-screen bg-white">
    <div class="mx-auto px-4 sm:px-6 lg:px-[200px] pt-10 pb-20 lg:pb-[113px] max-w-[1400px]">
      <div class="flex flex-col gap-6 w-full lg:w-[952px]">
        
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ECE84]"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-600">{{ error }}</p>
          <Button @click="goBack" class="mt-4">Go Back</Button>
        </div>

        <!-- Application Content -->
        <template v-else-if="application">
          <!-- Header -->
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="flex items-center gap-4">
              <Button 
                @click="goBack"
                variant="ghost" 
                size="icon" 
                class="rounded-md w-[42px] h-[36px] border border-[#E4E4E8]"
              >
                <ChevronLeft class="h-5 w-5" />
              </Button>
              <div>
                <h1 class="text-2xl font-semibold tracking-tight font-geist text-[#27272B]">
                  {{ application.applicationNumber }}
                </h1>
                <span 
                  :class="getStatusColor(effectiveStatus)"
                  class="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {{ formatStatus(effectiveStatus) }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Button 
                v-if="effectiveStatus === 'Additional Info required' && !allAdditionalInfoSubmitted"
                @click="navigateToAdditionalInfo"
                class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white font-geist"
              >
                Fill Additional Information
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
              placeholder="Search Travelers"
              class="h-9 px-3 py-1 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 font-geist bg-white w-full sm:w-[384px]"
              style="box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);"
            />
          </div>

          <!-- Travelers Table -->
          <div class="border border-[#E5E7EB] rounded-lg bg-white overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow class="bg-white hover:bg-white border-b">
                  <TableHead class="w-[50px]">
                    <Checkbox 
                      :checked="selectedRows.length === filteredTravelers.length"
                      @update:checked="toggleAllRows"
                    />
                  </TableHead>
                  <TableHead class="font-geist font-medium text-[#64748B]">Name</TableHead>
                  <TableHead class="font-geist font-medium text-[#64748B]">Email</TableHead>
                  <TableHead class="font-geist font-medium text-[#64748B]">Passport</TableHead>
                  <TableHead class="font-geist font-medium text-[#64748B]">Date of Birth</TableHead>
                  <TableHead class="font-geist font-medium text-[#64748B]">Expiry Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow 
                  v-for="traveler in filteredTravelers" 
                  :key="traveler.id || `traveler-${traveler.firstName}-${traveler.lastName}-${traveler.email}`" 
                  class="hover:bg-gray-50 border-b last:border-0"
                >
                  <TableCell>
                    <Checkbox 
                      :checked="selectedRows.includes(traveler.id)"
                      @update:checked="toggleRowSelection(traveler.id)"
                    />
                  </TableCell>
                  <TableCell class="font-geist text-[#27272B]">
                    {{ getTravelerDisplayName(traveler) }}
                  </TableCell>
                  <TableCell class="font-geist text-[#27272B]">{{ traveler.email }}</TableCell>
                  <TableCell class="font-geist text-[#27272B]">{{ traveler.passportNumber }}</TableCell>
                  <TableCell class="font-geist text-[#27272B]">{{ formatDate(traveler.dateOfBirth) }}</TableCell>
                  <TableCell class="font-geist text-[#27272B]">{{ formatDate(traveler.passportExpiryDate) }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between flex-wrap gap-4 w-full">
            <div class="text-sm text-[#64748B] font-geist">
              {{ selectedRows.length }} of {{ filteredTravelers.length }} row(s) selected.
            </div>
          </div>

          <!-- Estimated Delivery Date Card -->
          <div v-if="application && (application.processingType || application.processingTime || application.processingFeeId || application.draftData?.step4?.processingFeeId || application.draftData?.step4?.processingTime) && expectedDeliveryDate" class="border-2 rounded-xl p-4 sm:p-6 mt-6" style="border-color: #1ECE84;">
            <div class="flex justify-between items-center">
              <span style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
                Estimated Delivery Date
              </span>
              <div class="flex flex-col items-end">
                <span style="font-family: Geist; font-weight: 400; font-size: 14px; line-height: 20px; color: #27272B;">
                  {{ expectedDeliveryDate }}
                </span>
                <span v-if="formattedProcessingTime" style="font-family: Manrope; font-weight: 400; font-size: 12px; line-height: 16px; color: #6B7280; margin-top: 2px;">
                  {{ formattedProcessingTime }} Processing
                </span>
                <span v-else-if="application.processingType" style="font-family: Manrope; font-weight: 400; font-size: 12px; line-height: 16px; color: #6B7280; margin-top: 2px;">
                  {{ application.processingType }} Processing
                </span>
              </div>
            </div>
          </div>

          <!-- Application Details Section -->
          <div class="border rounded-lg bg-white p-6">
            <div class="flex flex-col gap-4">
              <h2 class="text-xl font-semibold font-geist text-[#27272B]">
                Application Details
              </h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div class="min-w-0">
                  <p class="text-sm text-[#64748B] font-geist mb-1">Destination Country</p>
                  <p class="font-medium text-[#27272B]">{{ application.destinationCountry }}</p>
                </div>
                <div class="min-w-0">
                  <p class="text-sm text-[#64748B] font-geist mb-1">Nationality</p>
                  <p class="font-medium text-[#27272B]">{{ application.nationality }}</p>
                </div>
                <div class="min-w-0">
                  <p class="text-sm text-[#64748B] font-geist mb-1">Visa Type</p>
                  <p class="font-medium text-[#27272B]">{{ application.visaType }}</p>
                </div>
                <div class="min-w-0">
                  <p class="text-sm text-[#64748B] font-geist mb-1">Processing Type</p>
                  <p class="font-medium text-[#27272B] capitalize">{{ application.processingType }}</p>
                </div>
                <div class="min-w-0">
                  <p class="text-sm text-[#64748B] font-geist mb-1">Number of Travelers</p>
                  <p class="font-medium text-[#27272B]">{{ application.numberOfTravelers }}</p>
                </div>
                <div class="min-w-0">
                  <p class="text-sm text-[#64748B] font-geist mb-1">Total Amount</p>
                  <p class="font-medium text-[#27272B]">{{ formatPrice(Number(application.totalAmount)) }}</p>
                </div>
                <div class="min-w-0">
                  <p class="text-sm text-[#64748B] font-geist mb-1">Submitted On</p>
                  <p class="font-medium text-[#27272B]">{{ formatDate(application.submittedAt || application.createdAt) }}</p>
                </div>
                <div class="min-w-0">
                  <p class="text-sm text-[#64748B] font-geist mb-1">Status</p>
                  <span 
                    :class="getStatusColor(effectiveStatus)"
                    class="inline-block px-3 py-1 rounded-full text-xs font-medium capitalize"
                  >
                    {{ formatStatus(effectiveStatus) }}
                  </span>
                </div>
              </div>

              <!-- Payment Details (if available) -->
              <div v-if="application.payment" class="mt-6 pt-6 border-t">
                <h3 class="text-lg font-semibold font-geist text-[#27272B] mb-4">
                  Payment Information
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div class="min-w-0">
                    <p class="text-sm text-[#64748B] font-geist mb-1">Transaction ID</p>
                    <p class="font-medium text-[#27272B] break-words">{{ application.payment.transactionId }}</p>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm text-[#64748B] font-geist mb-1">Amount Paid</p>
                    <p class="font-medium text-[#27272B] whitespace-nowrap">{{ formatPrice(Number(application.payment.amount)) }}</p>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm text-[#64748B] font-geist mb-1">Payment Status</p>
                    <span 
                      :class="application.payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                      class="inline-block px-3 py-1 rounded-full text-xs font-medium capitalize"
                    >
                      {{ application.payment.status }}
                    </span>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm text-[#64748B] font-geist mb-1">Payment Date</p>
                    <p class="font-medium text-[#27272B]">{{ formatDate(application.payment.createdAt) }}</p>
                  </div>
                </div>
              </div>

              <!-- Currency Info -->
              <div class="mt-4 pt-4 border-t">
                <p class="text-xs text-[#64748B] font-geist">
                  * All amounts are displayed in {{ selectedCurrency.code }}. Original amounts were charged in USD.
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Table from '@/components/ui/table/Table.vue'
import TableBody from '@/components/ui/table/TableBody.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import { useVisaProductFieldsApi } from '@/composables/useVisaProductFields'
import { useVisaProductsApi } from '@/composables/useVisaProducts'

const router = useRouter()
const route = useRoute()

const { getApplicationById, formatStatus, getStatusColor } = useVisaApplications()
const { checkAllAdditionalInfoSubmitted } = useVisaProductFieldsApi()
const { getVisaProductById } = useVisaProductsApi()

// Currency conversion
const { formatPrice, selectedCurrency } = useCurrency()

const application = ref<any>(null)
const productDetails = ref<any>(null)
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const selectedRows = ref<number[]>([])
const allAdditionalInfoSubmitted = ref(false)
const hasAdditionalInfoFields = ref(false) // Track if there are any additional info fields

const applicationId = computed(() => parseInt(route.params.id as string))

const travelers = computed(() => {
  // ✅ CRITICAL: Show ALL travelers, even if they don't have IDs
  // Travelers without IDs are still valid travelers (they just haven't been assigned IDs yet)
  // Only filter out entries that look like customer data (have fullname but no firstName/lastName)
  const allTravelers = application.value?.travelers || []
  const validTravelers = allTravelers.filter((t: any) => {
    // ✅ CRITICAL: Filter out entries that look like customer data
    // Travelers should have firstName/lastName, not fullname (which is customer field)
    // If it has fullname but no firstName/lastName, it might be customer data mixed in
    if (t.fullname && (!t.firstName && !t.lastName)) {
      console.warn('⚠️ Filtering out potential customer data in travelers array:', t.fullname, 'ID:', t.id)
      return false
    }
    
    // ✅ CRITICAL: Include travelers even if they don't have IDs
    // They're still valid travelers, just may not have been assigned IDs yet
    return true
  })
  
  if (validTravelers.length !== allTravelers.length) {
    console.log(`✅ Filtered ${allTravelers.length - validTravelers.length} invalid entries. Showing ${validTravelers.length} travelers.`)
  }
  
  // ✅ CRITICAL: Log traveler names to verify they're correct
  console.log('👥 All travelers in details page:', validTravelers.map((t: any) => ({
    id: t.id || 'no ID',
    name: getTravelerDisplayName(t),
    firstName: t.firstName,
    lastName: t.lastName,
    email: t.email
  })))
  
  return validTravelers
})

// Computed property to determine the effective status for display
// This overrides backend status if additional info is required but not submitted
const effectiveStatus = computed(() => {
  if (!application.value) return 'pending'
  
  const backendStatus = application.value.status
  
  // If all additional info is submitted and status is 'Additional Info required', show 'processing'
  if (allAdditionalInfoSubmitted.value && backendStatus === 'Additional Info required') {
    return 'processing'
  }
  
// Only override to 'Additional Info required' when backend also says so
if (backendStatus === 'Additional Info required' && hasAdditionalInfoFields.value && !allAdditionalInfoSubmitted.value) {
    return 'Additional Info required'
  }
  
  // Otherwise, show the backend status
  return backendStatus
})

const filteredTravelers = computed(() => {
  if (!searchQuery.value) return travelers.value
  
  const query = searchQuery.value.toLowerCase()
  return travelers.value.filter((traveler: any) => 
    `${traveler.firstName} ${traveler.lastName}`.toLowerCase().includes(query) ||
    traveler.email.toLowerCase().includes(query) ||
    traveler.passportNumber.toLowerCase().includes(query)
  )
})

onMounted(async () => {
  await fetchApplicationDetails()
})

// Refresh when route changes (e.g., navigating back from additional info page)
watch(() => route.path, async (newPath) => {
  if (newPath === `/my-account/my-orders/${applicationId.value}`) {
    console.log('🔄 Route changed to order details, refreshing application...')
    await fetchApplicationDetails()
  }
}, { immediate: false })

const fetchApplicationDetails = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await getApplicationById(applicationId.value)
    
    if (response.success && response.data) {
      application.value = response.data.data
      console.log('✅ Application details loaded:', {
        applicationId: application.value.id,
        applicationNumber: application.value.applicationNumber,
        travelersCount: application.value.travelers?.length || 0,
        processingType: application.value.processingType,
        processingTime: application.value.processingTime,
        processingFee: application.value.processingFee,
        processingFeeId: application.value.processingFeeId,
        draftDataStep4: application.value.draftData?.step4,
        visaProductId: application.value.visaProductId,
        hasVisaProduct: !!application.value.visaProduct,
        hasProcessingFees: !!application.value.visaProduct?.processingFees
      })
      
      // Check if visaProduct with processingFees is already included in the response
      if (application.value.visaProduct?.processingFees) {
        // Use the visaProduct data from the application response
        productDetails.value = application.value.visaProduct
        console.log('✅ Using visaProduct from application response:', {
          productId: productDetails.value.id,
          processingFees: productDetails.value.processingFees
        })
      } else if (application.value.visaProductId) {
        // Fallback: Fetch product details separately if not included in response
        try {
          const productResponse = await getVisaProductById(application.value.visaProductId)
          if (productResponse.success && productResponse.data) {
            productDetails.value = productResponse.data
            console.log('✅ Product details fetched separately:', {
              productId: productDetails.value.id,
              processingFees: productDetails.value.processingFees
            })
          }
        } catch (err) {
          console.error('❌ Error fetching product details:', err)
        }
      }
      
      // ✅ CRITICAL: Verify travelers belong to this application
      const travelers = application.value.travelers || []
      console.log('👥 Travelers for this application:', travelers.map((t: any, idx: number) => ({
        index: idx,
        id: t.id,
        name: `${t.firstName || ''} ${t.lastName || ''}`.trim(),
        email: t.email,
        applicationId: t.applicationId // Check if traveler has applicationId field
      })))
      
      // Always check if additional info has been submitted, regardless of current status
      // This ensures we show the correct status even if backend status is incorrect
      
      // Check if there are any additional info fields
      const { getFieldsByApplication } = useVisaProductFieldsApi()
      try {
        // Check application-level fields
        const appFieldsResponse = await getFieldsByApplication(applicationId.value)
        const hasAppFields = appFieldsResponse.success && appFieldsResponse.data && appFieldsResponse.data.length > 0
        
        // Check if any traveler has fields
        let hasTravelerFields = false
        for (const traveler of travelers) {
          if (traveler.id) {
            const travelerFieldsResponse = await getFieldsByApplication(applicationId.value, traveler.id)
            if (travelerFieldsResponse.success && travelerFieldsResponse.data && travelerFieldsResponse.data.length > 0) {
              hasTravelerFields = true
              break
            }
          }
        }
        
        hasAdditionalInfoFields.value = hasAppFields || hasTravelerFields
        console.log('🔍 Has additional info fields:', hasAdditionalInfoFields.value)
      } catch (err) {
        console.error('Error checking for additional info fields:', err)
        hasAdditionalInfoFields.value = false
      }
      
      // Check if all additional info has been submitted
      // Pass the total number of travelers to ensure we check all of them
      allAdditionalInfoSubmitted.value = await checkAllAdditionalInfoSubmitted(
        applicationId.value,
        travelers,
        application.value.numberOfTravelers
      )
      console.log('✅ All additional info submitted:', allAdditionalInfoSubmitted.value)
    } else {
      error.value = response.message || 'Failed to load application details'
    }
  } catch (err: any) {
    console.error('❌ Error fetching application:', err)
    error.value = err.message || 'Failed to load application details'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}

const navigateToAdditionalInfo = () => {
  router.push(`/my-account/additional-info?applicationId=${applicationId.value}`)
}

// Resubmission page is deprecated; all flows use Additional Info page

const toggleRowSelection = (id: number) => {
  if (selectedRows.value.includes(id)) {
    selectedRows.value = selectedRows.value.filter(rowId => rowId !== id)
  } else {
    selectedRows.value = [...selectedRows.value, id]
  }
}

const toggleAllRows = () => {
  if (selectedRows.value.length === filteredTravelers.value.length) {
    selectedRows.value = []
  } else {
    selectedRows.value = filteredTravelers.value.map((t: any) => t.id)
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Get the selected processing fee from product details
const selectedProcessingFee = computed(() => {
  // Check both top-level and draftData.step4 for processingFeeId
  const processingFeeId = application.value?.processingFeeId || 
                          application.value?.draftData?.step4?.processingFeeId
  
  if (!processingFeeId || !productDetails.value?.processingFees) {
    console.log('⚠️ selectedProcessingFee: Missing data', {
      hasProcessingFeeId: !!processingFeeId,
      processingFeeId: processingFeeId,
      topLevel: application.value?.processingFeeId,
      draftData: application.value?.draftData?.step4?.processingFeeId,
      hasProductDetails: !!productDetails.value,
      hasProcessingFees: !!productDetails.value?.processingFees,
      processingFees: productDetails.value?.processingFees
    })
    return null
  }
  
  const feeId = Number(processingFeeId)
  const found = productDetails.value.processingFees.find((fee: any) => Number(fee.id) === feeId)
  
  console.log('🔍 selectedProcessingFee lookup:', {
    lookingFor: feeId,
    availableIds: productDetails.value.processingFees.map((f: any) => ({ id: f.id, type: typeof f.id, numId: Number(f.id) })),
    found: found
  })
  
  return found
})

// Calculate estimated delivery date based on processing time
const expectedDeliveryDate = computed(() => {
  if (!application.value) {
    console.log('⚠️ expectedDeliveryDate: No application')
    return null
  }
  
  // Use submission date if available, otherwise use current date
  const submissionDate = application.value.submittedAt || application.value.createdAt
  const date = submissionDate ? new Date(submissionDate) : new Date()
  
  console.log('📅 expectedDeliveryDate calculation:', {
    submissionDate,
    startDate: date.toISOString(),
    selectedProcessingFee: selectedProcessingFee.value
  })
  
  // First, try to get timeValue and timeUnit from the selected processing fee
  if (selectedProcessingFee.value?.timeValue && selectedProcessingFee.value?.timeUnit) {
    const timeValue = Number(selectedProcessingFee.value.timeValue)
    const timeUnit = selectedProcessingFee.value.timeUnit
    
    console.log('✅ Using selectedProcessingFee:', { timeValue, timeUnit })
    
    if (timeUnit === 'hours' || timeUnit === 'hour') {
      date.setHours(date.getHours() + timeValue)
    } else if (timeUnit === 'days' || timeUnit === 'day') {
      date.setDate(date.getDate() + timeValue)
    }
    
    const formatted = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
    console.log('✅ Calculated delivery date:', formatted)
    return formatted
  }
  
  // Fallback: Try to use processingTime string if available (check both top-level and draftData)
  const processingTime = application.value.processingTime || 
                         application.value.draftData?.step4?.processingTime
  
  if (processingTime) {
    const processingTimeStr = String(processingTime)
    
    console.log('⚠️ Using processingTime fallback:', processingTimeStr)
    
    // Parse processing time (e.g., "3 days", "24 hours", "1 day")
    const timeMatch = processingTimeStr.match(/(\d+)\s*(day|days|hour|hours)/i)
    if (timeMatch && timeMatch[1] && timeMatch[2]) {
      const value = parseInt(timeMatch[1])
      const unit = timeMatch[2].toLowerCase()
      
      if (unit.includes('hour')) {
        date.setHours(date.getHours() + value)
      } else if (unit.includes('day')) {
        date.setDate(date.getDate() + value)
      }
      
      const formatted = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
      console.log('✅ Calculated delivery date from processingTime:', formatted)
      return formatted
    }
  }
  
  // If no processing info at all, return null
  console.log('❌ expectedDeliveryDate: No processing info available')
  return null
})

// Format processing time for display
const formattedProcessingTime = computed(() => {
  // First, try to get timeValue and timeUnit from the selected processing fee
  if (selectedProcessingFee.value?.timeValue && selectedProcessingFee.value?.timeUnit) {
    const timeValue = selectedProcessingFee.value.timeValue
    const timeUnit = selectedProcessingFee.value.timeUnit
    
    if (timeUnit === 'hours' || timeUnit === 'hour') {
      return `${timeValue} ${timeValue === 1 ? 'Hour' : 'Hours'}`
    } else if (timeUnit === 'days' || timeUnit === 'day') {
      return `${timeValue} ${timeValue === 1 ? 'Day' : 'Days'}`
    }
  }
  
  // Fallback: Try to use processingTime string if available (check both top-level and draftData)
  const processingTime = application.value?.processingTime || 
                         application.value?.draftData?.step4?.processingTime
  
  if (processingTime) {
    const processingTimeStr = String(processingTime)
    
    // Parse and format (e.g., "3 days" -> "3 Days", "24 hours" -> "24 Hours")
    const timeMatch = processingTimeStr.match(/(\d+)\s*(day|days|hour|hours)/i)
    if (timeMatch && timeMatch[1] && timeMatch[2]) {
      const value = timeMatch[1]
      const unit = timeMatch[2].toLowerCase()
      
      if (unit.includes('hour')) {
        return `${value} ${value === '1' ? 'Hour' : 'Hours'}`
      } else if (unit.includes('day')) {
        return `${value} ${value === '1' ? 'Day' : 'Days'}`
      }
    }
    
    return processingTimeStr
  }
  
  return null
})

// Helper function to get traveler display name
// ✅ CRITICAL: Always use traveler's firstName/lastName, never customer name
const getTravelerDisplayName = (traveler: any): string => {
  // ✅ CRITICAL: Only use traveler's own name fields
  // Never fall back to customer name - if traveler name is missing, show a placeholder
  const firstName = traveler?.firstName || ''
  const lastName = traveler?.lastName || ''
  const fullName = `${firstName} ${lastName}`.trim()
  
  // If no name is available, show a placeholder instead of customer name
  if (!fullName) {
    return `Traveler ${traveler?.id || 'Unknown'}`
  }
  
  return fullName
}
</script>