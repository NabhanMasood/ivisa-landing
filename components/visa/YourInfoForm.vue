<template>
  <div class="flex" style="gap: 14px;">
    <!-- Left Side - Form -->
    <div class="flex-1 rounded-xl" style="border-color: #E5E7EB; padding: 24px;">
      <!-- Header -->
      <div class="mb-6">
        <h2 style="font-family: Geist; font-weight: 600; font-size: 18px; line-height: 24px; color: #0B3947;">
          Your Personal Details
        </h2>
        <p style="font-family: Manrope; font-weight: 400; font-size: 14px; line-height: 20px; color: #6B7280;">
          Enter the details as they appear on your passport.
        </p>
      </div>

      <!-- Travelers List -->
      <div class="space-y-4">
        <div 
          v-for="(traveler, index) in travelers" 
          :key="index"
          :class="travelers.length > 1 ? 'border' : ''"
          style=" border-color: #E5E7EB; border-radius: 12px;"
        >
          <!-- Traveler Header - Only show if multiple travelers -->
          <button
            v-if="travelers.length > 1"
            @click="toggleTraveler(index)"
            class="w-full flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            style="padding: 24px;"
            type="button"
          >
            <h3 style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
              Traveler {{ index + 1 }}
            </h3>
            <svg 
              class="w-5 h-5 transition-transform"
              :class="{ 'rotate-180': expandedTravelers[index] }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Single Traveler Header (No Dropdown) -->
          <h3 
            v-else
            class="mb-5" 
            style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;"
          >
            Traveler 1
          </h3>

          <!-- Traveler Form - Collapsible for multiple, always visible for single -->
          <div 
            v-show="travelers.length === 1 || expandedTravelers[index]"
            :style="travelers.length > 1 ? 'padding: 0 24px 24px 24px;' : ''"
          >
            <div class="space-y-5">
              
              <!-- First and Middle Name -->
              <div>
                <Label 
                  :htmlFor="`firstName-${index}`"
                  style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
                >
                  First and Middle Name
                </Label>
                <Input
                  :id="`firstName-${index}`"
                  v-model="traveler.firstName"
                  placeholder="John"
                  class="mt-2"
                />
              </div>

              <!-- Last Name -->
              <div>
                <Label 
                  :htmlFor="`lastName-${index}`"
                  style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
                >
                  Last Name
                </Label>
                <Input
                  :id="`lastName-${index}`"
                  v-model="traveler.lastName"
                  placeholder="Doe"
                  class="mt-2"
                />
              </div>

              <!-- Date of Birth -->
              <div>
                <Label style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
                  Date of Birth
                </Label>
                <div class="grid grid-cols-3 gap-4 mt-2">
                  <Select v-model="traveler.birthDate">
                    <SelectTrigger class="!h-[45px] !bg-white w-full px-4">
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[180px]" :side-offset="5">
                      <SelectItem v-for="day in 31" :key="day" :value="day.toString()">
                        {{ day }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select v-model="traveler.birthMonth">
                    <SelectTrigger class="!h-[45px] !bg-white w-full px-4">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[250px]" :side-offset="5">
                      <SelectItem v-for="(month, idx) in months" :key="idx" :value="(idx + 1).toString()">
                        {{ month }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select v-model="traveler.birthYear">
                    <SelectTrigger class="!h-[45px] !bg-white w-full px-4">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[300px]" :side-offset="5">
                      <SelectItem v-for="year in years" :key="year" :value="year.toString()">
                        {{ year }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <!-- Email Address - Only for first traveler -->
              <div v-if="index === 0">
                <Label 
                  :htmlFor="`email-${index}`"
                  style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
                >
                  Email Address
                </Label>
                <Input
                  :id="`email-${index}`"
                  v-model="traveler.email"
                  type="email"
                  placeholder="johnd@gmail.com"
                  class="mt-2"
                />
                <p style="font-family: Manrope; font-weight: 400; font-size: 12px; line-height: 16px; color: #6B7280;" class="mt-1">
                  Your approved {{ destination }} Visa will be sent to this email address.
                </p>
              </div>

              <!-- Newsletter Checkbox - Only for first traveler -->
              <div v-if="index === 0" class="flex items-start gap-2">
                <Checkbox 
                  :id="`newsletter-${index}`"
                  v-model:checked="traveler.receiveUpdates"
                  class="mt-1"
                />
                <Label 
                  :htmlFor="`newsletter-${index}`"
                  style="font-family: Inter; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
                  class="cursor-pointer"
                >
                  I want to receive VISA123'S updates, product launches and personalized offers. I can opt out anytime. Terms and Privacy Policy apply.
                </Label>
              </div>

              <!-- Remove Traveler Button - Only show if multiple travelers and not the first one -->
              <div v-if="travelers.length > 1 && index > 0">
                <Button 
                  @click="removeTraveler(index)"
                  class="w-auto"
                  style="background-color: #DC2626; color: white; border-radius: 6px; padding: 8px 16px; font-family: Geist; font-weight: 500; font-size: 14px; line-height: 20px;"
                >
                  Remove Traveler
                </Button>
              </div>

            </div>
          </div>

        </div>

        <!-- Add Another Traveler Button -->
        <div class="mt-6">
          <Button 
            @click="addTraveler"
            class="w-auto"
            style="background-color: #1ECE84; color: white; border-radius: 6px; padding: 8px 16px; font-family: Geist; font-weight: 500; font-size: 14px; line-height: 20px;"
          >
            Add Another traveler
          </Button>
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
              <span style="font-family: geist; font-weight: 500; font-size: 14px; line-height: 20px; color: #27272B;">
                Calculated at checkout
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Save & Continue Button -->
      <Button 
        @click="handleSaveAndContinue"
        class="w-full h-12"
        style="background-color: #1ECE84; color: white; border-radius: 6px; font-family: Geist; font-weight: 500; font-size: 14px; line-height: 24px;"
      >
        Save & Continue
      </Button>

      <!-- Security Message -->
      <div class="border rounded-xl p-4" style="border-color: #E5E7EB;">
        <div class="flex items-start gap-3">
          <img src="/svg/union.svg" alt="Max stay" style="width: 19.2px; height: 19.2px;" />
          <p style="font-family: Geist; font-weight: 500; font-size: 16px; line-height: 20px; color: #3E3E3E;">
            We take strong measures to protect your information
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label/Label.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import Checkbox from '@/components/ui/Checkbox.vue'

const props = defineProps<{
  destination: string
  initialTravelerCount?: number
  initialTravelersData?: Traveler[]
}>()

const emit = defineEmits<{
  next: [data: any]
  back: []
}>()

interface Traveler {
  firstName: string
  lastName: string
  birthDate: string
  birthMonth: string
  birthYear: string
  email: string
  receiveUpdates: boolean
}

const travelers = ref<Traveler[]>([])
const expandedTravelers = ref<Record<number, boolean>>({})

// Constants
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
const GOVERNMENT_FEE_PER_TRAVELER = 3667.16

// Initialize travelers
const initializeTravelers = () => {
  if (props.initialTravelersData?.length) {
    travelers.value = props.initialTravelersData
  } else {
    const count = props.initialTravelerCount || 1
    travelers.value = Array.from({ length: count }, createEmptyTraveler)
  }
  
  // Expand first traveler by default
  expandedTravelers.value = { 0: true }
}

const createEmptyTraveler = (): Traveler => ({
  firstName: '',
  lastName: '',
  birthDate: '',
  birthMonth: '',
  birthYear: '',
  email: '',
  receiveUpdates: false
})

initializeTravelers()

const governmentFee = computed(() => travelers.value.length * GOVERNMENT_FEE_PER_TRAVELER)

const toggleTraveler = (index: number) => {
  expandedTravelers.value[index] = !expandedTravelers.value[index]
}

const addTraveler = () => {
  const newIndex = travelers.value.length
  travelers.value.push(createEmptyTraveler())
  expandedTravelers.value[newIndex] = true
}

const removeTraveler = (index: number) => {
  travelers.value.splice(index, 1)
  
  // Rebuild expanded state
  const newExpanded: Record<number, boolean> = {}
  Object.keys(expandedTravelers.value).forEach(key => {
    const keyNum = parseInt(key)
    if (keyNum < index) {
      newExpanded[keyNum] = expandedTravelers.value[keyNum]
    } else if (keyNum > index) {
      newExpanded[keyNum - 1] = expandedTravelers.value[keyNum]
    }
  })
  expandedTravelers.value = newExpanded
}

const isFormValid = () => {
  return travelers.value.every(t => 
    t.firstName.trim() && 
    t.lastName.trim() && 
    t.birthDate && 
    t.birthMonth && 
    t.birthYear && 
    t.email.trim()
  )
}

const handleSaveAndContinue = () => {
  if (!isFormValid()) {
    alert('Please fill in all required fields for all travelers')
    return
  }

  emit('next', { travelers: travelers.value })
}
</script>