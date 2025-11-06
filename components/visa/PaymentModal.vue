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
}>()

const emit = defineEmits<{
  close: []
  success: [paymentData: any]
}>()

const isProcessing = ref(false)
const showSuccessModal = ref(false)

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
  isProcessing.value = true
  
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Prepare payment data
    const paymentData = {
      cardholderName: cardDetails.cardholderName,
      cardNumberLast4: cardDetails.cardNumber.slice(-4),
      amount: props.amount,
      timestamp: new Date().toISOString()
    }
    
    // Reset form
    cardDetails.cardholderName = ''
    cardDetails.expiryDate = ''
    cardDetails.cvv = ''
    cardDetails.cardNumber = ''
    
    // Show success modal
    showSuccessModal.value = true
    
  } catch (error) {
    console.error('Payment failed:', error)
    alert('Payment failed. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

const handleSuccessClose = () => {
  showSuccessModal.value = false
  emit('close')
  // Emit success after user closes the success modal
  emit('success', {
    cardholderName: cardDetails.cardholderName,
    amount: props.amount,
    timestamp: new Date().toISOString()
  })
}
</script>