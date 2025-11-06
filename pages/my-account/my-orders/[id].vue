<template>
  <div class="min-h-screen bg-white">
    <div class="mx-auto px-4 sm:px-6 lg:px-[200px] pt-10 pb-20 lg:pb-[113px] max-w-[1400px]">
      <div class="flex flex-col gap-6 w-full lg:w-[952px]">
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
            <h1 class="text-2xl font-semibold tracking-tight font-geist text-[#27272B]">
              {{ orderId }}
            </h1>
          </div>
          <Button class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white font-geist">
            Create New Order
          </Button>
        </div>

        <!-- Tabs -->
        <div class="inline-flex h-10 items-center justify-start rounded-md bg-[#F1F5F9] p-1 w-full lg:w-[425px] overflow-x-auto">
          <button
            @click="activeTab = 'application'"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-geist flex-shrink-0',
              activeTab === 'application'
                ? 'bg-white text-[#27272B] shadow-sm'
                : 'text-[#64748B] hover:text-[#27272B]'
            ]"
          >
            Application Details
          </button>
          <button
            @click="activeTab = 'travelers'"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-geist flex-shrink-0',
              activeTab === 'travelers'
                ? 'bg-white text-[#27272B] shadow-sm'
                : 'text-[#64748B] hover:text-[#27272B]'
            ]"
          >
            Travelers
          </button>
          <button
            @click="activeTab = 'documents'"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-geist flex-shrink-0',
              activeTab === 'documents'
                ? 'bg-white text-[#27272B] shadow-sm'
                : 'text-[#64748B] hover:text-[#27272B]'
            ]"
          >
            Documents
          </button>
          <button
            @click="activeTab = 'payment'"
            :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-geist flex-shrink-0',
              activeTab === 'payment'
                ? 'bg-white text-[#27272B] shadow-sm'
                : 'text-[#64748B] hover:text-[#27272B]'
            ]"
          >
            Payment
          </button>
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

        <!-- Table -->
        <div class="border rounded-lg bg-white overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow class="bg-white hover:bg-white border-b">
                <TableHead class="w-[50px]">
                  <Checkbox 
                    :checked="selectedRows.length === travelers.length"
                    @update:checked="toggleAllRows"
                  />
                </TableHead>
                <TableHead class="font-geist font-medium text-[#64748B]">Name</TableHead>
                <TableHead class="font-geist font-medium text-[#64748B]">Email</TableHead>
                <TableHead class="font-geist font-medium text-[#64748B]">Passport</TableHead>
                <TableHead class="font-geist font-medium text-[#64748B]">Issue Date</TableHead>
                <TableHead class="font-geist font-medium text-[#64748B]">Expiry Date</TableHead>
                <TableHead class="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow 
                v-for="traveler in travelers" 
                :key="traveler.id" 
                class="hover:bg-gray-50 border-b last:border-0"
              >
                <TableCell>
                  <Checkbox 
                    :checked="selectedRows.includes(traveler.id)"
                    @update:checked="toggleRowSelection(traveler.id)"
                  />
                </TableCell>
                <TableCell class="font-geist text-[#27272B]">{{ traveler.name }}</TableCell>
                <TableCell class="font-geist text-[#27272B]">{{ traveler.email }}</TableCell>
                <TableCell class="font-geist text-[#27272B]">{{ traveler.passport }}</TableCell>
                <TableCell class="font-geist text-[#27272B]">{{ traveler.issueDate }}</TableCell>
                <TableCell class="font-geist text-[#27272B]">{{ traveler.expiryDate }}</TableCell>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      class="h-8 w-8 rounded-md hover:bg-gray-100"
                    >
                      <Trash2 class="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      class="h-8 w-8 rounded-md hover:bg-gray-100"
                    >
                      <Pencil class="h-4 w-4 text-gray-600" />
                    </Button>
                    <Lock v-if="traveler.hasLock" class="h-4 w-4 text-purple-600" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- Footer (Outside table border) -->
        <div class="flex items-center justify-between flex-wrap gap-4 w-full">
          <div class="text-sm text-[#64748B] font-geist">
            {{ selectedRows.length }} of {{ travelers.length }} row(s) selected.
          </div>
          <div class="flex gap-2">
            <Button 
              variant="outline"
              class="rounded-md border-[#E5E5E5] font-geist text-[#27272B] hover:bg-gray-50"
            >
              Previous
            </Button>
            <Button 
              variant="outline"
              class="rounded-md border-[#E5E5E5] font-geist text-[#27272B] hover:bg-gray-50"
            >
              Next
            </Button>
          </div>
        </div>

        <!-- Application Details Section -->
        <div class="border rounded-lg bg-white p-6">
          <div class="flex flex-col gap-2">
            <h2 class="text-xl font-semibold font-geist text-[#27272B]">
              Application Details
            </h2>
            <p class="text-sm text-[#64748B] font-geist">
              Here you can see the application details
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ChevronLeft, Trash2, Pencil, Lock } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Table from '@/components/ui/table/Table.vue'
import TableBody from '@/components/ui/table/TableBody.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableRow from '@/components/ui/table/TableRow.vue'

const router = useRouter()
const route = useRoute()

// Get the order ID from the route parameter
const orderId = computed(() => route.params.id)

const activeTab = ref('documents')
const searchQuery = ref('')
const selectedRows = ref([])

const travelers = ref([
  {
    id: 1,
    name: 'Ali Raza',
    email: 'ali@gmail.com',
    passport: 'AB1234567',
    issueDate: '01/01/2025',
    expiryDate: '01/01/26',
    hasLock: false
  },
  {
    id: 2,
    name: 'Ali Raza',
    email: 'ali@gmail.com',
    passport: 'AB1234567',
    issueDate: '01/01/2025',
    expiryDate: '01/01/26',
    hasLock: false
  },
  {
    id: 3,
    name: 'Ali Raza',
    email: 'ali@gmail.com',
    passport: 'AB1234567',
    issueDate: '01/01/2025',
    expiryDate: '01/01/26',
    hasLock: false
  },
  {
    id: 4,
    name: 'Ali Raza',
    email: 'ali@gmail.com',
    passport: 'AB1234567',
    issueDate: '01/01/2025',
    expiryDate: '01/01/26',
    hasLock: false
  },
  {
    id: 5,
    name: 'Ali Raza',
    email: 'ali@gmail.com',
    passport: 'AB1234567',
    issueDate: '01/01/2025',
    expiryDate: '01/01/26',
    hasLock: false
  }
])

const goBack = () => {
  router.back()
}

const toggleRowSelection = (id) => {
  if (selectedRows.value.includes(id)) {
    selectedRows.value = selectedRows.value.filter(rowId => rowId !== id)
  } else {
    selectedRows.value = [...selectedRows.value, id]
  }
}

const toggleAllRows = () => {
  if (selectedRows.value.length === travelers.value.length) {
    selectedRows.value = []
  } else {
    selectedRows.value = travelers.value.map(t => t.id)
  }
}
</script>