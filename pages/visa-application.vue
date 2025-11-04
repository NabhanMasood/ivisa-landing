<template>
  <div class="min-h-screen bg-[#FAFAFA]">
    <div class="flex items-start justify-center px-4 py-8">
      <div class="w-full max-w-[1200px] rounded-xl shadow-sm bg-white p-8">
        
        <h1 style="font-family: Geist, sans-serif; font-weight: 600; font-size: 24px; line-height: 32px; letter-spacing: -0.6px; color: #0B3947;" class="mb-6">
          Apply now for your {{ destinationCountry }} e VISA
        </h1>

        <VisaStepper :current-step="currentStep" />
        
        <VisaStats v-if="currentStep === 1" :destination="destinationCountry" />
        
        <!-- Step 1: Trip Info -->
        <TripInfoForm 
          v-if="currentStep === 1"
          :nationality="nationalityCountry"
          :destination="destinationCountry"
          @next="handleStepOne"
        />
        
        <!-- Step 2: Personal Details (Your Info) -->
        <YourInfoForm
          v-if="currentStep === 2"
          :destination="destinationCountry"
          :initial-traveler-count="tripData.applicants"
          :initial-travelers-data="travelersData.travelers"
          @next="handleStepTwo"
          @back="currentStep = 1"
        />

        <!-- Step 3: Passport Details -->
        <PassportDetailsForm
          v-if="currentStep === 3"
          :destination="destinationCountry"
          :traveler-count="travelersData.travelers?.length || 0"
          :initial-passport-data="passportData.passportDetails"
          @next="handleStepThree"
          @back="currentStep = 2"
        />

        <!-- Step 4: Processing Time (Checkout) -->
        <CheckoutForm
          v-if="currentStep === 4"
          :destination="destinationCountry"
          :traveler-count="travelersData.travelers?.length || 0"
          :government-fee="(travelersData.travelers?.length || 0) * 3667.16"
          @next="handleStepFour"
          @back="currentStep = 3"
        />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import VisaStepper from '@/components/visa/VisaStepper.vue'
import VisaStats from '@/components/visa/VisaStats.vue'
import TripInfoForm from '@/components/visa/TripInfoForm.vue'
import YourInfoForm from '@/components/visa/YourInfoForm.vue'
import PassportDetailsForm from '@/components/visa/PassportDetailsForm.vue'
import CheckoutForm from '@/components/visa/CheckoutForm.vue'

const route = useRoute()
const currentStep = ref(1)
const nationalityCountry = ref('')
const destinationCountry = ref('')
const tripData = ref<any>({})
const travelersData = ref<any>({})
const passportData = ref<any>({}) // ✅ New state for passport details

const STORAGE_KEY = 'visa_application_data'

// Helper function to save data
const saveToLocalStorage = () => {
  const dataToSave = {
    step: currentStep.value,
    tripData: tripData.value,
    travelersData: travelersData.value,
    passportData: passportData.value, // ✅ Save passport data
    nationalityCountry: nationalityCountry.value,
    destinationCountry: destinationCountry.value
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  console.log('Saved to localStorage:', dataToSave)
}

onMounted(() => {
  nationalityCountry.value = (route.query.from as string) || 'Pakistan'
  destinationCountry.value = (route.query.to as string) || 'Morocco'
  
  // Restore from localStorage
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const data = JSON.parse(saved)
      currentStep.value = data.step || 1
      tripData.value = data.tripData || {}
      travelersData.value = data.travelersData || {}
      passportData.value = data.passportData || {} // ✅ Restore passport data
      
      if (data.nationalityCountry) nationalityCountry.value = data.nationalityCountry
      if (data.destinationCountry) destinationCountry.value = data.destinationCountry
      
      console.log('Restored data from localStorage:', data)
    } catch (e) {
      console.error('Failed to restore data from localStorage:', e)
    }
  }
})

// Step 1: Trip Info
const handleStepOne = (data: any) => {
  tripData.value = {
    ...data,
    applicants: parseInt(data.applicants)
  }
  currentStep.value = 2
  saveToLocalStorage()
  console.log('Step 1 data (Trip Info):', data)
}

// Step 2: Personal Details
const handleStepTwo = (data: any) => {
  travelersData.value = data
  currentStep.value = 3
  saveToLocalStorage()
  console.log('Step 2 data (Personal Details):', data)
}

// Step 3: Passport Details
const handleStepThree = (data: any) => {
  passportData.value = data
  currentStep.value = 4 
  saveToLocalStorage()
  console.log('Step 3 data (Passport Details):', data)
}

// Step 4: Processing Time/Checkout
const handleStepFour = (data: any) => {
  console.log('Step 4 data (Processing Time):', data)
  console.log('Processing type:', data.processingType)
  console.log('Processing fee:', data.processingFee)
  
  // Compile all data for final submission
  const completeApplication = {
    tripInfo: tripData.value,
    personalDetails: travelersData.value,
    passportDetails: passportData.value,
    processingInfo: data
  }
  
  console.log('Complete Application Data:', completeApplication)
  
  // Here you would send to backend or redirect to payment
  alert(`Application complete!\nProcessing: ${data.processingType}\nFee: Rs ${data.processingFee}`)
  
  // Clear saved data after successful completion
  clearSavedData()
  
 
}

const clearSavedData = () => {
  localStorage.removeItem(STORAGE_KEY)
  console.log('Cleared saved data')
}

defineExpose({ clearSavedData })
</script>