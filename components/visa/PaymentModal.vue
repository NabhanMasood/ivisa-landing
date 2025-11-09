<template>
  <div>
    <Dialog :open="isOpen && !showSuccessModal" @update:open="handleOpenChange">
      <DialogContent class="w-[440px]">
        <DialogHeader>
          <DialogTitle>Card Details</DialogTitle>
          <DialogDescription>
            Add the card details below
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="handlePayment" class="space-y-4">
        
        <!-- Cardholder Name with Payment Icons -->
        <div class="relative">
          <Input
            v-model="cardDetails.cardholderName"
            type="text"
            placeholder="Cardholder name"
            required
            class="pr-20 h-12"
            style="border: 1px solid #1ECE84;"
          />
          <!-- Stripe Logo -->
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
            <img src="/svg/payment-strip.svg" alt="Stripe" class="h-6" style="width: auto;" />
          </div>
        </div>

        <!-- MM/YY and CVV Row -->
        <div class="flex gap-4">
          <Input
            v-model="cardDetails.expiryDate"
            type="text"
            placeholder="MM/YY"
            required
            maxlength="5"
            @input="formatExpiryDate"
            class="flex-1 h-12"
            style="border: 1px solid #1ECE84;"
          />
          
          <Input
            v-model="cardDetails.cvv"
            type="text"
            placeholder="CVV"
            required
            maxlength="4"
            @input="formatCVV"
            class="flex-1 h-12"
            style="border: 1px solid #1ECE84;"
          />
        </div>

        <!-- Card Number -->
        <Input
          v-model="cardDetails.cardNumber"
          type="text"
          placeholder="Card number"
          required
          maxlength="19"
          @input="formatCardNumber"
          class="h-12"
          style="border: 1px solid #1ECE84;"
        />

        <!-- Pay Button -->
        <Button
          type="submit"
          class="w-full"
          style="height: 36px; border-radius: 6px; padding: 8px 24px; background-color: #1ECE84;"
          :disabled="isProcessing"
        >
          {{ isProcessing ? 'Processing...' : `Pay PKR ${amount.toFixed(2)}` }}
        </Button>

      </form>
    </DialogContent>
  </Dialog>

  <!-- Success Modal -->
  <SuccessModal 
    :is-open="showSuccessModal"
    :application-number="applicationNumber"
    :customer-id="customerId"
    :user-email="userEmail"
    :user-full-name="userFullName"
    @close="handleSuccessClose"
  />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue'
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import SuccessModal from '@/components/visa/SuccessModal.vue'

const props = defineProps<{
  isOpen: boolean
  amount: number
  applicationData: any  // ← Receives all form data from parent
}>()

const emit = defineEmits<{
  close: []
  success: [result: any]
}>()

const isProcessing = ref(false)
const showSuccessModal = ref(false)
const applicationNumber = ref('')
const customerId = ref<number>(0)
const userEmail = ref('')
const userFullName = ref('')

const cardDetails = reactive({
  cardholderName: '',
  expiryDate: '',
  cvv: '',
  cardNumber: ''
})

// Format card number with spaces (XXXX XXXX XXXX XXXX)
const formatCardNumber = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\s/g, '').replace(/\D/g, '')
  
  // Add space every 4 digits
  const formatted = value.match(/.{1,4}/g)?.join(' ') || value
  cardDetails.cardNumber = formatted
}

// Format expiry date (MM/YY)
const formatExpiryDate = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4)
  }
  
  cardDetails.expiryDate = value
}

// Format CVV (numbers only)
const formatCVV = (event: Event) => {
  const input = event.target as HTMLInputElement
  cardDetails.cvv = input.value.replace(/\D/g, '')
}

const handleOpenChange = (value: boolean) => {
  if (!value && !isProcessing.value) {
    emit('close')
  }
}

const handlePayment = async () => {
  console.log('💳 PaymentModal: Starting payment...')
  console.log('💳 Application Data received:', props.applicationData)
  
  isProcessing.value = true
  
  try {
    // Validate applicationData exists
    if (!props.applicationData) {
      throw new Error('Application data is missing')
    }
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Prepare payment data
    const paymentData = {
      cardholderName: cardDetails.cardholderName,
      cardLast4: cardDetails.cardNumber.replace(/\s/g, '').slice(-4),
      cardBrand: 'visa',
      transactionId: `txn_${Date.now()}`
    }
    
    console.log('💳 Payment successful:', paymentData)
    
    // Combine application data with payment data
    const completeData = {
      visaProductId: props.applicationData.visaProductId || 1,
      nationality: props.applicationData.nationality,
      destinationCountry: props.applicationData.destinationCountry,
      visaType: props.applicationData.visaType,
      numberOfTravelers: props.applicationData.numberOfTravelers,
      travelers: props.applicationData.travelers,
      processingType: props.applicationData.processingType,
      processingFee: props.applicationData.processingFee,
      payment: paymentData,
      notes: props.applicationData.notes || ''
    }
    
    console.log('📤 Complete data being sent:', completeData)
    console.log('🌐 Making API call to submit application...')
    
    // Call API to submit application
    const response = await fetch('http://localhost:5001/visa-applications/submit-complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completeData)
    })
    
    console.log('📥 API Response status:', response.status)
    console.log('📥 API Response ok:', response.ok)
    
    const result = await response.json()
    console.log('📥 API Response data:', result)
    
    if (!response.ok || !result.status) {
      throw new Error(result.message || 'Failed to submit application')
    }
    
    console.log('✅ Application submitted successfully:', result)
    
    // Store application details for success modal
    applicationNumber.value = result.data.application.applicationNumber
    customerId.value = result.data.customerId
    
    console.log('📋 Application Number:', applicationNumber.value)
    console.log('👤 Customer ID:', customerId.value)
    
    // Extract user info from first traveler
    if (props.applicationData.travelers && props.applicationData.travelers.length > 0) {
      const firstTraveler = props.applicationData.travelers[0]
      userEmail.value = firstTraveler.email
      userFullName.value = `${firstTraveler.firstName} ${firstTraveler.lastName}`
      console.log('👤 User info extracted:', { email: userEmail.value, name: userFullName.value })
    }
    
    // Reset form
    cardDetails.cardholderName = ''
    cardDetails.expiryDate = ''
    cardDetails.cvv = ''
    cardDetails.cardNumber = ''
    
    console.log('✅ About to show success modal...')
    
    // Emit success to parent (optional - for any cleanup)
    emit('success', result.data)
    
    // Show success modal with all data
    showSuccessModal.value = true
    
    console.log('✅ Success modal should be visible now:', showSuccessModal.value)
    
  } catch (error: any) {
    console.error('❌ Submission failed:', error)
    console.error('❌ Error details:', error.message, error.stack)
    alert(`Failed to submit application: ${error.message}`)
  } finally {
    isProcessing.value = false
    console.log('🏁 Payment processing finished')
  }
}

const handleSuccessClose = () => {
  console.log('✅ Success modal closed')
  showSuccessModal.value = false
  emit('close')
}
</script>