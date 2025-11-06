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
        <Button class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white font-geist">
          Create New Order
        </Button>
      </div>

      <!-- Orders Table -->
      <div class="rounded-lg border-b bg-white">
        <Table>
          <TableHeader>
            <TableRow class="bg-white hover:bg-white">
              <TableHead class="w-[50px]">
            <Checkbox 
            :checked="selectedOrders.length === orders.length"
            @update:checked="toggleAllOrders"
          />
              </TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Application #</TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Customer Name</TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Destination</TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Visa Product</TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Price</TableHead>
              <TableHead class="font-geist font-medium text-[#6B7280]">Status</TableHead>
              <TableHead class="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
              <TableCell>
                <Checkbox 
                  :checked="selectedOrders.includes(order.id)"
                  @update:checked="() => toggleOrderSelection(order.id)"
                />
              </TableCell>
              <TableCell class="font-geist text-[#27272B]">{{ order.applicationId }}</TableCell>
              <TableCell class="font-geist text-[#27272B]">{{ order.customerName }}</TableCell>
              <TableCell class="font-geist text-[#27272B]">{{ order.destination }}</TableCell>
              <TableCell class="font-geist text-[#27272B]">{{ order.visaProduct }}</TableCell>
              <TableCell class="font-geist text-[#27272B]">{{ order.price }}</TableCell>
              <TableCell>
                <span 
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-geist"
                  :class="getStatusClass(order.status)"
                >
                  {{ order.status }}
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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    class="h-8 w-8 rounded-md hover:bg-gray-100"
                  >
                    <Pencil class="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, Eye, Pencil } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Table from '@/components/ui/table/Table.vue'
import TableBody from '@/components/ui/table/TableBody.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableRow from '@/components/ui/table/TableRow.vue'

const router = useRouter()
const selectedOrders = ref([])

const orders = ref([
  {
    id: 1,
    applicationId: 'APP-01245',
    customerName: 'Ali Raza',
    destination: 'UAE',
    visaProduct: '30-Day Visa',
    price: 'USD 100',
    status: 'Awaiting Response'
  },
  {
    id: 2,
    applicationId: 'APP-01245',
    customerName: 'Ali Raza',
    destination: 'UAE',
    visaProduct: '30-Day Visa',
    price: 'USD 100',
    status: 'Approved'
  },
  {
    id: 3,
    applicationId: 'APP-01245',
    customerName: 'Ali Raza',
    destination: 'UAE',
    visaProduct: '30-Day Visa',
    price: 'USD 100',
    status: 'Documents Pending'
  }
])

const goBack = () => {
  router.back()
}

const viewOrder = (order) => {
  router.push(`my-orders/${order.applicationId}`)
}

const toggleOrderSelection = (id) => {
  if (selectedOrders.value.includes(id)) {
    selectedOrders.value = selectedOrders.value.filter(orderId => orderId !== id)
  } else {
    selectedOrders.value = [...selectedOrders.value, id]
  }
}

const toggleAllOrders = () => {
  if (selectedOrders.value.length === orders.value.length) {
    selectedOrders.value = []
  } else {
    selectedOrders.value = orders.value.map(o => o.id)
  }
}

const getStatusClass = (status) => {
  const classes = {
    'Awaiting Response': 'bg-[#F1FDF4] text-[#0673DF] border border-[#0673DF]',
    'Approved': 'bg-[#F1FDF4] text-[#08CA69] border border-[#06DF73]',
    'Documents Pending': 'bg-[#FFF6E1] text-[#E2B72C] border border-[#B0A999]'
  }
  return classes[status] || ''
}
</script>