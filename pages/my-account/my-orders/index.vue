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
        <Button 
          @click="navigateTo('/')"
          class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white font-geist"
        >
          Create New Order
        </Button>
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
              <TableHead class="w-[100px]"></TableHead>
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
                  :class="getStatusClass(order.status)"
                >
                  {{ formatStatus(order.status) }}
                </span>
              </TableCell>
              <TableCell>
                <div class="flex items-center gap-2">
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
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
const { getMyApplications, formatStatus } = useVisaApplications()
const { currentUser } = useAuthApi()

// Currency conversion
const { formatPrice, selectedCurrency } = useCurrency()

const selectedOrders = ref<number[]>([])
const searchQuery = ref('')
const applications = ref<any[]>([])
const loading = ref(true)
const error = ref('')

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

onMounted(async () => {
  await fetchApplications()
})

const fetchApplications = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await getMyApplications()
    
    if (response.success && response.data) {
      // Convert string amounts to numbers
      applications.value = response.data.data.map((app: any) => ({
        ...app,
        totalAmount: Number(app.totalAmount),
        processingFee: Number(app.processingFee),
        governmentFee: Number(app.governmentFee),
        serviceFee: Number(app.serviceFee)
      }))
      
      console.log('✅ Applications loaded:', applications.value)
    } else {
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
  // Use current user's name or first traveler's name
  if (currentUser.value?.fullName) {
    return currentUser.value.fullName
  }
  if (order.travelers && order.travelers.length > 0) {
    const firstTraveler = order.travelers[0]
    return `${firstTraveler.firstName} ${firstTraveler.lastName}`
  }
  return 'N/A'
}

const goBack = () => {
  router.back()
}

const viewOrder = (order: any) => {
  router.push(`/my-account/my-orders/${order.id}`)
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

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'pending': 'bg-[#FFF6E1] text-[#E2B72C] border border-[#B0A999]',
    'processing': 'bg-[#F1FDF4] text-[#0673DF] border border-[#0673DF]',
    'approved': 'bg-[#F1FDF4] text-[#08CA69] border border-[#06DF73]',
    'rejected': 'bg-red-50 text-red-600 border border-red-200',
    'submitted': 'bg-blue-50 text-blue-600 border border-blue-200'
  }
  return classes[status] || 'bg-gray-50 text-gray-600 border border-gray-200'
}
</script>