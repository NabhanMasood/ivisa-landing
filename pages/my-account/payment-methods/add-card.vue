<template>
  <div class="flex justify-center pt-10 pb-20 min-h-screen px-4">
    <div class="flex flex-col w-full max-w-[776px] gap-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <Button 
            @click="goBack"
            variant="ghost" 
            size="icon" 
            class="rounded-md w-[42px] h-[36px] border border-[#E4E4E8]"
          >
            <ChevronLeft class="h-5 w-5" />
          </Button>
          <h1 class="text-2xl font-semibold tracking-tight text-foreground font-geist">
            Credit / debit card
          </h1>
        </div>
        <div class="flex gap-3 w-full sm:w-auto">
          <Button 
            @click="goBack"
            variant="outline" 
            class="rounded-lg flex-1 sm:flex-none !bg-[#EFEFEF] hover:!bg-[#E5E5E5] border-0"
            :disabled="isSaving"
          >
            Discard
          </Button>
          <Button 
            @click="handleSave"
            class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white flex-1 sm:flex-none"
            :disabled="isSaving || !isFormValid"
          >
            {{ isSaving ? 'Saving...' : 'Save Card' }}
          </Button>
        </div>
      </div>

      <!-- Security Notice -->
      <div class="flex items-center gap-2">
        <Lock class="h-4 w-4" />
        <p class="text-sm text-foreground font-inter">
          All card information is fully encrypted and secure.
        </p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600 text-sm">{{ error }}</p>
      </div>

      <!-- Card Details Form -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-white">
        <form @submit.prevent="handleSave" class="flex flex-col gap-6">
          <!-- Header with Payment Icons -->
          <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-foreground font-geist">Card Details</h2>
              <p class="text-sm text-muted-foreground font-inter">Add the card details below</p>
            </div>
            <!-- Single SVG Strip with border and rounded corners -->
            <div class="rounded-md p-1">
              <img src="/svg/payment-strip.svg" alt="Payment Methods" class="h-[32px]" />
            </div>
          </div>

          <!-- Name Field -->
          <div class="flex flex-col gap-2">
            <Label for="name" class="text-sm font-medium text-foreground font-inter">
              Cardholder Name *
            </Label>
            <Input
              id="name"
              v-model="formData.cardholderName"
              type="text"
              placeholder="John Doe"
              required
              class="rounded-lg h-11 font-inter"
            />
          </div>

          <!-- Card Number Field -->
          <div class="flex flex-col gap-2">
            <Label for="cardNumber" class="text-sm font-medium text-foreground font-inter">
              Card Number *
            </Label>
            <Input
              id="cardNumber"
              type="text"
              v-model="formattedCardNumber"
              @input="formatCardNumber"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              required
              class="rounded-lg h-11 font-inter"
            />
          </div>

          <!-- Expires, Year, and CVC Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Expires -->
            <div class="flex flex-col gap-2">
              <Label for="expires" class="text-sm font-medium text-foreground font-inter">
                Expiry Month *
              </Label>
              <div class="relative">
                <Select v-model="formData.expiryMonth" required>
                  <SelectTrigger id="expires" class="rounded-lg h-11 px-3 font-inter [&>svg]:hidden">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="08">08</SelectItem>
                    <SelectItem value="09">09</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
                <img 
                  src="/svg/arrow-down.svg" 
                  alt="" 
                  class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" 
                  style="width: 9.33px; height: 5.33px;"
                />
              </div>
            </div>

            <!-- Year -->
            <div class="flex flex-col gap-2">
              <Label for="year" class="text-sm font-medium text-foreground font-inter">
                Expiry Year *
              </Label>
              <div class="relative">
                <Select v-model="formData.expiryYear" required>
                  <SelectTrigger id="year" class="rounded-lg h-11 px-3 font-inter [&>svg]:hidden">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem 
                      v-for="year in availableYears" 
                      :key="year" 
                      :value="year.toString()"
                    >
                      {{ year }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <img 
                  src="/svg/arrow-down.svg" 
                  alt="" 
                  class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" 
                  style="width: 9.33px; height: 5.33px;"
                />
              </div>
            </div>

            <!-- CVC -->
            <div class="flex flex-col gap-2">
              <Label for="cvc" class="text-sm font-medium text-foreground font-inter">
                CVC *
              </Label>
              <Input
                id="cvc"
                v-model="formData.cvc"
                type="text"
                placeholder="123"
                maxlength="4"
                required
                @input="formatCVC"
                class="rounded-lg h-11 font-inter"
              />
            </div>
          </div>

          <!-- Set as Default -->
          <div class="flex items-center gap-2">
            <input
              id="isDefault"
              v-model="formData.isDefault"
              type="checkbox"
              class="rounded border-gray-300"
            />
            <Label for="isDefault" class="text-sm font-medium text-foreground font-inter cursor-pointer">
              Set as default payment method
            </Label>
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, Lock } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card/Card.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import { useCardInfo } from '@/composables/useCardInfo'

const router = useRouter()
const { addCard } = useCardInfo()

const formattedCardNumber = ref('')
const isSaving = ref(false)
const error = ref('')

const formData = ref({
  cardholderName: '',
  expiryMonth: '',
  expiryYear: '',
  cvc: '',
  isDefault: false
})

// Generate years from current year to 20 years ahead
const currentYear = new Date().getFullYear()
const availableYears = Array.from({ length: 20 }, (_, i) => currentYear + i)

// Detect card brand from card number
const detectCardBrand = (cardNumber: string): string => {
  const number = cardNumber.replace(/\s/g, '')
  
  if (/^4/.test(number)) return 'visa'
  if (/^5[1-5]/.test(number)) return 'mastercard'
  if (/^3[47]/.test(number)) return 'amex'
  if (/^6(?:011|5)/.test(number)) return 'discover'
  if (/^3[068]/.test(number)) return 'diners'
  if (/^35/.test(number)) return 'jcb'
  if (/^62/.test(number)) return 'unionpay'
  
  return 'visa' // default
}

// Get last 4 digits from card number
const getLast4 = (cardNumber: string): string => {
  const number = cardNumber.replace(/\s/g, '')
  return number.slice(-4)
}

// Validate form
const isFormValid = computed(() => {
  return (
    formData.value.cardholderName.trim() !== '' &&
    formattedCardNumber.value.replace(/\s/g, '').length >= 13 &&
    formData.value.expiryMonth !== '' &&
    formData.value.expiryYear !== '' &&
    formData.value.cvc.trim().length >= 3
  )
})

const formatCardNumber = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\s/g, '') // Remove all spaces
  value = value.replace(/\D/g, '') // Remove non-digits
  value = value.substring(0, 16) // Limit to 16 digits
  
  // Add space every 4 digits
  const formatted = value.match(/.{1,4}/g)?.join(' ') || value
  formattedCardNumber.value = formatted
}

const formatCVC = (event: Event) => {
  const input = event.target as HTMLInputElement
  formData.value.cvc = input.value.replace(/\D/g, '').substring(0, 4)
}

const handleSave = async () => {
  if (!isFormValid.value) {
    error.value = 'Please fill in all required fields'
    return
  }

  error.value = ''
  isSaving.value = true

  try {
    const cardNumber = formattedCardNumber.value.replace(/\s/g, '')
    
    if (cardNumber.length < 13) {
      throw new Error('Invalid card number')
    }

    const cardData = {
      cardholderName: formData.value.cardholderName.trim(),
      cardLast4: getLast4(formattedCardNumber.value),
      cardBrand: detectCardBrand(formattedCardNumber.value),
      expiryMonth: formData.value.expiryMonth,
      expiryYear: formData.value.expiryYear,
      isDefault: formData.value.isDefault
    }

    const response = await addCard(cardData)

    if (response.success) {
      // Navigate back to payment methods list
      router.push('/my-account/payment-methods')
    } else {
      error.value = response.message || 'Failed to save card'
    }
  } catch (err: any) {
    console.error('Error saving card:', err)
    error.value = err.message || 'Failed to save card. Please try again.'
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>