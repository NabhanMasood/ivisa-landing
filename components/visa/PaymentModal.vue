<template>
  <div>
    <!-- Payment Dialog - only show when NOT showing success -->
    <Dialog v-if="!showSuccessModal" :open="isOpen && !showSuccessModal" @update:open="handleOpenChange">
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
          {{ isProcessing ? 'Processing...' : `Pay ${formatPrice(amount)}` }}
        </Button>

      </form>
    </DialogContent>
  </Dialog>

  <!-- Success Modal - Render independently -->
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
import { ref, reactive, nextTick } from 'vue'
import { useRuntimeConfig } from '#app'
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
  applicationData: any
}>()

const emit = defineEmits<{
  close: []
  success: [result: any]
}>()

// Currency conversion
const { formatPrice } = useCurrency()

const config = useRuntimeConfig()
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
  console.log('🔄 PaymentModal: handleOpenChange called with:', value)
  
  // Only allow closing if not processing and not showing success modal
  if (!value && !isProcessing.value && !showSuccessModal.value) {
    console.log('✅ Allowing payment modal to close')
    emit('close')
  } else {
    console.log('⛔ Preventing payment modal close - processing:', isProcessing.value, 'showingSuccess:', showSuccessModal.value)
  }
}

// Transform application data to match backend DTO
const transformApplicationData = (applicationData: any) => {
  console.log('🔄 Transforming application data...')
  console.log('📥 Raw data received:', applicationData)

  // Transform visa type: "30 Days|single" -> "30-single"
  let visaType = ''
  if (applicationData.visaType && applicationData.visaType.includes('|')) {
    const [productName, entryType] = applicationData.visaType.split('|')
    const duration = productName.match(/\d+/)?.[0] || ''
    visaType = `${duration}-${entryType}`
  }

  console.log('✅ Visa type:', visaType)

  // Use processing type as-is from backend (no transformation)
  const processingType = applicationData.processingType || 'standard'
  
  console.log('✅ Processing type (from backend):', processingType)

  // Get travelers count
  const travelers = applicationData.travelers || []
  const numberOfTravelers = travelers.length

  console.log('👥 Number of travelers:', numberOfTravelers)

  // ✅✅✅ CRITICAL: Extract PER-TRAVELER fees and multiply by number of travelers
  const govtFeePerTraveler = Number(applicationData.govtFee) || 0
  const serviceFeePerTraveler = Number(applicationData.serviceFee) || 0
  const processingFeePerTraveler = Number(applicationData.processingFee) || 0

  // Calculate TOTALS by multiplying by number of travelers
  const totalGovtFee = govtFeePerTraveler * numberOfTravelers
  const totalServiceFee = serviceFeePerTraveler * numberOfTravelers
  const totalProcessingFee = processingFeePerTraveler * numberOfTravelers
  const calculatedTotalAmount = totalGovtFee + totalServiceFee + totalProcessingFee

  // ✅ Check if there's a discount applied
  const discountAmount = applicationData.discountAmount || 0
  const couponCode = applicationData.couponCode || null
  const originalAmount = applicationData.originalAmount || calculatedTotalAmount
  const finalAmount = props.amount // This is the discounted amount from ReviewOrder

  console.log('💰 Fee Calculation:', {
    numberOfTravelers,
    perTraveler: {
      govtFee: govtFeePerTraveler,
      serviceFee: serviceFeePerTraveler,
      processingFee: processingFeePerTraveler
    },
    totals: {
      govtFee: totalGovtFee,
      serviceFee: totalServiceFee,
      processingFee: totalProcessingFee,
      calculatedTotal: calculatedTotalAmount
    },
    discount: {
      discountAmount,
      couponCode,
      originalAmount,
      finalAmount: finalAmount
    }
  })

  console.log('💰 Expected payment amount from props:', props.amount)
  console.log('💰 Calculated total (before discount):', calculatedTotalAmount)
  console.log('💰 Discount amount:', discountAmount)
  console.log('💰 Final amount (after discount):', finalAmount)
  
  // Use the discounted amount from props (which is the final amount after discount)
  const totalAmountToUse = finalAmount

  if (Math.abs(calculatedTotalAmount - originalAmount) > 0.01 && originalAmount !== calculatedTotalAmount) {
    console.warn('⚠️ Original amount mismatch, using calculated total as base')
  }

  // Build the final payload with TOTAL amounts
  const payload = {
    visaProductId: applicationData.visaProductId || null,
    nationality: applicationData.nationality || '',
    destinationCountry: applicationData.destinationCountry || '',
    visaType: visaType,
    numberOfTravelers: numberOfTravelers,
    processingType: processingType, // ✅ Use as-is from backend
    processingTime: applicationData.processingTime || '',
    processingFee: totalProcessingFee,        // ✅ TOTAL
    processingFeeId: applicationData.processingFeeId || null,
    govtFee: totalGovtFee,                    // ✅ TOTAL
    serviceFee: totalServiceFee,              // ✅ TOTAL
    totalAmount: totalAmountToUse,            // ✅ USE DISCOUNTED AMOUNT
    couponCode: couponCode,                   // ✅ Include coupon code if applied
    discountAmount: discountAmount > 0 ? discountAmount : undefined, // ✅ Include discount if applied
    travelers: travelers,
    paymentMethod: 'stripe',
    paymentStatus: 'pending',
    notes: applicationData.notes || ''
  }

  console.log('✅ Final payload:', payload)

  // Validate only the essential fields
  if (!payload.visaType || !payload.visaType.match(/^\d+-\w+$/)) {
    throw new Error(`Invalid visa type: "${payload.visaType}". Expected format: "30-single"`)
  }

  if (!payload.processingType || !payload.processingType.trim()) {
    throw new Error('Processing type is required')
  }

  if (payload.processingFee < 0 || isNaN(payload.processingFee)) {
    throw new Error(`Invalid processing fee: ${payload.processingFee}`)
  }

  if (payload.travelers.length === 0) {
    throw new Error('No travelers found')
  }

  return payload
}

const handlePayment = async () => {
  console.log('💳 PaymentModal: Starting payment...')
  console.log('💳 Expected amount prop:', props.amount)
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
      transactionId: `txn_${Date.now()}`,
      paymentGateway: 'stripe',
      paymentIntentId: `pi_${Date.now()}`
    }
    
    console.log('💳 Payment successful:', paymentData)
    
    // Transform the data
    const transformedData = transformApplicationData(props.applicationData)
    
    // Add payment data to the payload - CRITICAL: Use the discounted amount
    transformedData.payment = {
      ...paymentData,
      amount: transformedData.totalAmount // ✅ Use discounted totalAmount for payment
    }
    
    console.log('🌐 Making API call to submit application...')
    console.log('📤 Payload being sent to backend:', JSON.stringify(transformedData, null, 2))
    console.log('💰 totalAmount in payload:', transformedData.totalAmount)
    console.log('💰 payment.amount in payload:', transformedData.payment.amount)
    console.log('💰 discountAmount in payload:', transformedData.discountAmount)
    console.log('💰 couponCode in payload:', transformedData.couponCode)
    
    // Use runtime config for API base URL
    const baseUrl = (config.public.apiBase as string).replace(/\/$/, '')
    const response = await fetch(`${baseUrl}/visa-applications/submit-complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData)
    })
    
    console.log('📥 API Response status:', response.status)
    console.log('📥 API Response ok:', response.ok)
    
    const result = await response.json()
    console.log('📥 API Response data:', result)
    
    if (!response.ok || !result.status) {
      const errorMessages = Array.isArray(result.message) 
        ? result.message.join(', ') 
        : result.message || 'Failed to submit application'
      throw new Error(errorMessages)
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
    
    // Show success modal and emit success
    await nextTick()
    showSuccessModal.value = true
    
    console.log('✅ Success modal state set to:', showSuccessModal.value)
    
    // Wait another tick for modal to render
    await nextTick()
    
    // Emit success to parent (but don't close anything)
    emit('success', result.data)
    console.log('✅ Emitted success event')
    
  } catch (error: any) {
    console.error('❌ Submission failed:', error)
    console.error('❌ Error details:', error.message, error)
    alert(`Failed to submit application: ${error.message}`)
  } finally {
    isProcessing.value = false
    console.log('🏁 Payment processing finished')
  }
}

const handleSuccessClose = () => {
  console.log('✅ SuccessModal close triggered')
  console.log('🔄 Resetting modal states...')
  
  // Reset all states
  showSuccessModal.value = false
  
  // Close the payment modal
  emit('close')
  
  console.log('✅ PaymentModal closed, navigation should happen from SuccessModal')
}
</script>