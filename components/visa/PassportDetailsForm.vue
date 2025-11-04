<template>
  <div class="flex" style="gap: 14px;">
    <!-- Left Side - Form -->
    <div class="flex-1 border rounded-xl" style="border-color: #E5E7EB; padding: 24px;">
      <!-- Header -->
      <div class="mb-6">
        <h2 style="font-family: Geist; font-weight: 600; font-size: 18px; line-height: 24px; color: #0B3947;">
          Passport Details
        </h2>
        <p style="font-family: Manrope; font-weight: 400; font-size: 14px; line-height: 20px; color: #6B7280;">
          Enter the details as they appear on your passport.
        </p>
      </div>

      <!-- Single Traveler (No Dropdown) -->
      <div v-if="passportDetails.length === 1">
        <h3 class="mb-5" style="font-family: Geist; font-weight: 600; font-size: 16px; line-height: 24px; color: #0B3947;">
          Traveler 1
        </h3>

        <div class="space-y-5">
          
          <!-- Nationality on Passport -->
          <div>
            <Label 
              htmlFor="nationality-0"
              style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
            >
              Nationality on Passport
            </Label>
            <div class="relative mt-2">
              <Select v-model="passportDetails[0].nationality">
                <SelectTrigger>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent class="max-h-[300px] overflow-y-auto" position="popper">
                  <SelectItem value="Pakistan">
                    <div class="flex items-center gap-2">
                      <img src="/svg/flags/pakistan.svg" alt="Pakistan" class="w-6 h-4" />
                      Pakistan
                    </div>
                  </SelectItem>
                  <!-- Add more countries -->
                </SelectContent>
              </Select>
            </div>
          </div>

          <!-- Passport Number -->
          <div>
            <Label 
              htmlFor="passportNumber-0"
              style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
            >
              Passport Number
            </Label>
            <Input
              id="passportNumber-0"
              v-model="passportDetails[0].passportNumber"
              placeholder="382764527389429843"
              class="mt-2"
            />
          </div>

          <!-- Passport Expiration Date -->
          <div>
            <Label style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
              Passport expiration date
            </Label>
            <div class="grid grid-cols-3 gap-4 mt-2">
              <Select v-model="passportDetails[0].expiryDate">
                <SelectTrigger>
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent class="max-h-[180px] overflow-y-auto" position="popper">
                  <SelectItem v-for="day in 31" :key="day" :value="day.toString()">
                    {{ day }}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select v-model="passportDetails[0].expiryMonth">
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent class="max-h-[250px] overflow-y-auto" position="popper">
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>

              <Select v-model="passportDetails[0].expiryYear">
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent class="max-h-[300px] overflow-y-auto" position="popper">
                  <SelectItem v-for="year in futureYears" :key="year" :value="year.toString()">
                    {{ year }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <!-- Residence Country -->
          <div>
            <Label 
              htmlFor="residenceCountry-0"
              style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
            >
              Residence Country
            </Label>
            <div class="relative mt-2">
              <Select v-model="passportDetails[0].residenceCountry">
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent class="max-h-[300px] overflow-y-auto" position="popper">
                  <SelectItem value="Pakistan">
                    <div class="flex items-center gap-2">
                      <img src="/svg/flags/pakistan.svg" alt="Pakistan" class="w-6 h-4" />
                      Pakistan
                    </div>
                  </SelectItem>
                  <!-- Add more countries -->
                </SelectContent>
              </Select>
            </div>
          </div>

          <!-- Schengen Visa Question -->
          <div style="gap: 8px; display: flex; flex-direction: column;">
            <Label 
              style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
            >
              Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland?
            </Label>
            <Select v-model="passportDetails[0].hasSchengenVisa">
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      </div>

      <!-- Multiple Travelers (With Dropdown) -->
      <div v-else class="space-y-4">
        <div 
          v-for="(traveler, index) in passportDetails" 
          :key="index"
          class="border"
          style="height: auto; border-width: 1px; border-color: #E5E7EB; border-radius: 12px;"
        >
          <!-- Traveler Header - Clickable -->
          <button
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

          <!-- Passport Form - Collapsible -->
          <div 
            v-show="expandedTravelers[index]"
            style="padding: 0 24px 24px 24px;"
          >
            <div class="space-y-5">
              
              <!-- Nationality on Passport -->
              <div>
                <Label 
                  :htmlFor="`nationality-${index}`"
                  style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
                >
                  Nationality on Passport
                </Label>
                <div class="relative mt-2">
                  <Select v-model="traveler.nationality">
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[300px] overflow-y-auto" position="popper">
                      <SelectItem value="Pakistan">
                        <div class="flex items-center gap-2">
                          <img src="/svg/flags/pakistan.svg" alt="Pakistan" class="w-6 h-4" />
                          Pakistan
                        </div>
                      </SelectItem>
                      <!-- Add more countries -->
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <!-- Passport Number -->
              <div>
                <Label 
                  :htmlFor="`passportNumber-${index}`"
                  style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
                >
                  Passport Number
                </Label>
                <Input
                  :id="`passportNumber-${index}`"
                  v-model="traveler.passportNumber"
                  placeholder="382764527389429843"
                  class="mt-2"
                />
              </div>

              <!-- Passport Expiration Date -->
              <div>
                <Label style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
                  Passport expiration date
                </Label>
                <div class="grid grid-cols-3 gap-4 mt-2">
                  <Select v-model="traveler.expiryDate">
                    <SelectTrigger>
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[180px] overflow-y-auto" position="popper">
                      <SelectItem v-for="day in 31" :key="day" :value="day.toString()">
                        {{ day }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select v-model="traveler.expiryMonth">
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[250px] overflow-y-auto" position="popper">
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select v-model="traveler.expiryYear">
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[300px] overflow-y-auto" position="popper">
                      <SelectItem v-for="year in futureYears" :key="year" :value="year.toString()">
                        {{ year }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <!-- Residence Country -->
              <div>
                <Label 
                  :htmlFor="`residenceCountry-${index}`"
                  style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
                >
                  Residence Country
                </Label>
                <div class="relative mt-2">
                  <Select v-model="traveler.residenceCountry">
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[300px] overflow-y-auto" position="popper">
                      <SelectItem value="Pakistan">
                        <div class="flex items-center gap-2">
                          <img src="/svg/flags/pakistan.svg" alt="Pakistan" class="w-6 h-4" />
                          Pakistan
                        </div>
                      </SelectItem>
                      <!-- Add more countries -->
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <!-- Schengen Visa Question -->
              <div style="gap: 8px; display: flex; flex-direction: column;">
                <Label 
                  style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;"
                >
                  Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland?
                </Label>
                <Select v-model="traveler.hasSchengenVisa">
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                {{ passportDetails.length }} traveler{{ passportDetails.length > 1 ? 's' : '' }}
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
          <img src="/svg/union.svg" alt="Security" style="width: 19.2px; height: 19.2px;" />
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
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label/Label.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'

const props = defineProps<{
  destination: string
  travelerCount: number
  initialPassportData?: PassportDetail[]
}>()

const emit = defineEmits<{
  next: [data: any]
  back: []
}>()

interface PassportDetail {
  nationality: string
  passportNumber: string
  expiryDate: string
  expiryMonth: string
  expiryYear: string
  residenceCountry: string
  hasSchengenVisa: string
}

const passportDetails = ref<PassportDetail[]>([])
const expandedTravelers = ref<Record<number, boolean>>({})

// Initialize passport details
const initializePassportDetails = () => {
  if (props.initialPassportData && props.initialPassportData.length > 0) {
    passportDetails.value = props.initialPassportData
    expandedTravelers.value = { 0: true }
    return
  }
  
  passportDetails.value = Array.from({ length: props.travelerCount }, () => ({
    nationality: '',
    passportNumber: '',
    expiryDate: '',
    expiryMonth: '',
    expiryYear: '',
    residenceCountry: '',
    hasSchengenVisa: ''
  }))
  
  expandedTravelers.value = { 0: true }
}

initializePassportDetails()

// Generate future years for passport expiry (next 20 years)
const currentYear = new Date().getFullYear()
const futureYears = Array.from({ length: 20 }, (_, i) => currentYear + i)

const governmentFee = computed(() => {
  return passportDetails.value.length * 3667.16
})

const toggleTraveler = (index: number) => {
  expandedTravelers.value[index] = !expandedTravelers.value[index]
}

const handleSaveAndContinue = () => {
  // Validate all passport details
  const isValid = passportDetails.value.every(p => 
    p.nationality && 
    p.passportNumber && 
    p.expiryDate && 
    p.expiryMonth && 
    p.expiryYear && 
    p.residenceCountry && 
    p.hasSchengenVisa
  )
  
  if (!isValid) {
    alert('Please fill in all required passport details for all travelers')
    return
  }

  emit('next', { passportDetails: passportDetails.value })
}
</script>