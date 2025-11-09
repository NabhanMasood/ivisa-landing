<template>
  <div class="flex gap-6">
    <!-- Left Side - Order Details -->
    <div class="flex-1">
      
      <!-- Expected Delivery Date -->
      <div class="border rounded-xl p-4 mb-6" style="border-color: #1ECE84; ">
        <p style="font-family: Geist; font-weight: 600; font-size: 14px; line-height: 20px; color: #0B3947;">
          Expected delivery date: {{ expectedDeliveryDate }}
        </p>
      </div>

      <!-- Visa Details Card -->
      <div class="border rounded-xl p-6" style="border-color: #E5E7EB;">
        
        <!-- Visa Title -->
        <div class="mb-6">
          <h3 style="font-family: Geist; font-weight: 600; font-size: 20px; line-height: 28px; color: #0B3947;">
            {{ destination }} Visa
          </h3>
          <p style="font-family: Manrope; font-weight: 400; font-size: 14px; line-height: 20px; color: #6B7280;">
            You can see the order details below.
          </p>
        </div>

        <!-- Visa Information -->
        <div class="space-y-4 mb-6">
          <div class="flex justify-between">
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              Valid for:
            </span>
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              {{ visaDetails.validity }}
            </span>
          </div>

          <div class="flex justify-between">
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              Max stay:
            </span>
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              {{ visaDetails.maxStay }}
            </span>
          </div>

          <div class="flex justify-between">
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              Number of entries:
            </span>
            <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              {{ visaDetails.entries }}
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t mb-6" style="border-color: #E5E7EB;"></div>

        <!-- Travelers Section -->
<div class="flex justify-between items-start">
  <h4 style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
    Travelers:
  </h4>
  <div style="display: flex; flex-direction: column; gap: 20px;">
            <div 
              v-for="(traveler, index) in travelers" 
              :key="index"
              class="flex items-center gap-3"
            >
              <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #E8FFF6;">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 7C8.933 7 10.5 5.433 10.5 3.5C10.5 1.567 8.933 0 7 0C5.067 0 3.5 1.567 3.5 3.5C3.5 5.433 5.067 7 7 7Z" fill="#1ECE84"/>
                  <path d="M7 8.75C4.101 8.75 1.75 11.101 1.75 14H12.25C12.25 11.101 9.899 8.75 7 8.75Z" fill="#1ECE84"/>
                </svg>
              </div>
              <span style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
                {{ traveler }}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Right Side - Summary Card -->
    <div class="w-[400px] space-y-4">
      
      <!-- Price Summary Card -->
      <div class="border-2 rounded-xl p-6" style="border-color: #1ECE84;">
        <div class="space-y-4">
          <!-- Visa Info -->
          <div class="flex justify-between items-center">
            <span style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
              {{ destination }} Visa
            </span>
            <div class="flex justify-end">
              <span style="font-family: Geist; font-weight: 400; font-size: 14px; line-height: 20px; color: #27272B;">
                {{ travelers.length }} traveler{{ travelers.length > 1 ? 's' : '' }}
              </span>
            </div>
          </div>

          <!-- Government Fee -->
          <div class="flex justify-between items-center">
            <span style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 20px; color: #0B3947;">
              Government Fee
            </span>
            <div class="flex justify-end">
              <span style="font-family: Geist; font-weight: 400; font-size: 14px; line-height: 20px; color: #27272B;">
                Rs {{ governmentFee.toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t" style="border-color: #E5E7EB;"></div>

          <!-- Total -->
          <div class="flex justify-between items-center">
            <span style="font-family: Manrope; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
              Total
            </span>
            <div class="flex justify-end">
              <span style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
                PKR {{ totalAmount.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Continue to Payment Button -->
      <Button 
        @click="handleContinueToPayment"
        class="w-full h-12"
        style="background-color: #1ECE84; color: white; border-radius: 6px; font-family: Geist; font-weight: 500; font-size: 14px; line-height: 24px;"
      >
        Continue to payment
      </Button>

    </div>
  </div>

  <!-- Payment Modal -->
    <PaymentModal 
      :is-open="showPaymentModal"
      :amount="totalAmount"
      :application-data="applicationData"
      @close="showPaymentModal = false"
      @success="handlePaymentSuccess"
    />
    
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/ui/button.vue'
import PaymentModal from '@/components/visa/PaymentModal.vue'

const props = defineProps<{
  destination: string
  travelers: string[]
  governmentFee: number
  processingFee: number
  visaDetails: {
    validity: string
    maxStay: string
    entries: string
  }
  applicationData: any  
}>()

const emit = defineEmits<{
  next: [result: any]
  back: []
}>()

const showPaymentModal = ref(false)

const totalAmount = computed(() => {
  return props.governmentFee + props.processingFee
})

const expectedDeliveryDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 3)
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
})

const handleContinueToPayment = () => {
  console.log('🔵 ReviewOrder: Opening payment modal')
  console.log('🔵 Application Data:', props.applicationData)
  showPaymentModal.value = true
}

const handlePaymentSuccess = (result: any) => {
  console.log('✅ ReviewOrder: Received success from PaymentModal:', result)
  showPaymentModal.value = false
  
  // Emit to parent (apply page) - optional, just for cleanup
  emit('next', result)
}
</script>
