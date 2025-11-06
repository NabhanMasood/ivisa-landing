<template>
  <div class="min-h-screen ">
    <div class="flex items-start justify-center px-4 py-8">
      <div class="w-full max-w-[1200px] rounded-xl shadow-sm bg-white p-8">
        
        <!-- Header with Back Button -->
        <div class="flex items-center gap-4 mb-6">
          <button
            v-if="currentStep > 1"
            @click="handleBack"
            class="flex items-center justify-center w-8 h-8 rounded-full border transition-colors hover:bg-gray-50"
            style="border-color: #E5E7EB;"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#0B3947" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <h1 style="font-family: Geist, sans-serif; font-weight: 600; font-size: 24px; line-height: 32px; letter-spacing: -0.6px; color: #0B3947;">
            {{ currentStep === 5 ? 'Review you order' : `Apply now for your ${destinationCountry} e VISA` }}
          </h1>
        </div>

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

        <!-- Step 5: Review Order -->
        <ReviewOrder
          v-if="currentStep === 5"
          :destination="destinationCountry"
          :travelers="getTravelerNames()"
          :government-fee="(travelersData.travelers?.length || 0) * 3667.16"
          :processing-fee="processingData.processingFee || 0"
          :visa-details="getVisaDetails()"
          @next="handleStepFive"
          @back="currentStep = 4"
        />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VisaStepper from '@/components/visa/VisaStepper.vue'
import VisaStats from '@/components/visa/VisaStats.vue'
import TripInfoForm from '@/components/visa/TripInfoForm.vue'
import YourInfoForm from '@/components/visa/YourInfoForm.vue'
import PassportDetailsForm from '@/components/visa/PassportDetailsForm.vue'
import CheckoutForm from '@/components/visa/CheckoutForm.vue'
import ReviewOrder from '@/components/visa/ReviewOrder.vue'

const route = useRoute()
const router = useRouter()
const currentStep = ref(1)
const nationalityCountry = ref('')
const destinationCountry = ref('')
const tripData = ref<any>({})
const travelersData = ref<any>({})
const passportData = ref<any>({})
const processingData = ref<any>({})

const STORAGE_KEY = 'visa_application_data'

// Update URL based on current step
const updateURL = () => {
  const stepParam = currentStep.value <= 1 ? 'step-1' : 
                    currentStep.value <= 3 ? 'step-2' : 
                    'step-3'
  
  router.push({
    query: {
      ...route.query,
      step: stepParam
    }
  })
}

// Helper function to save data
const saveToLocalStorage = () => {
  const dataToSave = {
    step: currentStep.value,
    tripData: tripData.value,
    travelersData: travelersData.value,
    passportData: passportData.value,
    processingData: processingData.value,
    nationalityCountry: nationalityCountry.value,
    destinationCountry: destinationCountry.value
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  console.log('Saved to localStorage:', dataToSave)
}

// Get traveler names for review page
const getTravelerNames = () => {
  if (!travelersData.value.travelers) return []
  return travelersData.value.travelers.map((t: any) => 
    `${t.firstName} ${t.lastName}`.trim() || 'John Doe'
  )
}

// Get visa details for review page
const getVisaDetails = () => {
  const visaTypeMap: Record<string, { validity: string, maxStay: string, entries: string }> = {
    '180-single': {
      validity: '180 days after issued',
      maxStay: '30 days per entry',
      entries: 'Single entry'
    },
    '180-multiple': {
      validity: '180 days after issued',
      maxStay: '30 days per entry',
      entries: 'Multiple entry'
    },
    '90-single': {
      validity: '90 days after issued',
      maxStay: '30 days per entry',
      entries: 'Single entry'
    }
  }
  
  return visaTypeMap[tripData.value.visaType] || visaTypeMap['180-single']
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
      passportData.value = data.passportData || {}
      processingData.value = data.processingData || {}
      
      if (data.nationalityCountry) nationalityCountry.value = data.nationalityCountry
      if (data.destinationCountry) destinationCountry.value = data.destinationCountry
      
      console.log('Restored data from localStorage:', data)
    } catch (e) {
      console.error('Failed to restore data from localStorage:', e)
    }
  }
  
  // Set initial URL
  updateURL()
})

// Watch for step changes to update URL
watch(currentStep, () => {
  updateURL()
  saveToLocalStorage()
})

// Handle back button
const handleBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Step 1: Trip Info
const handleStepOne = (data: any) => {
  tripData.value = {
    ...data,
    applicants: parseInt(data.applicants)
  }
  currentStep.value = 2
  console.log('Step 1 data (Trip Info):', data)
}

// Step 2: Personal Details
const handleStepTwo = (data: any) => {
  travelersData.value = data
  currentStep.value = 3
  console.log('Step 2 data (Personal Details):', data)
}

// Step 3: Passport Details
const handleStepThree = (data: any) => {
  passportData.value = data
  currentStep.value = 4
  console.log('Step 3 data (Passport Details):', data)
}

// Step 4: Processing Time/Checkout
const handleStepFour = (data: any) => {
  processingData.value = data
  currentStep.value = 5
  console.log('Step 4 data (Processing Time):', data)
}

// Step 5: Review Order
const handleStepFive = (paymentData: any) => {
  console.log('Payment completed:', paymentData)
  
  // Compile all data for final submission
  const completeApplication = {
    tripInfo: tripData.value,
    personalDetails: travelersData.value,
    passportDetails: passportData.value,
    processingInfo: processingData.value,
    paymentInfo: paymentData
  }
  
  console.log('Complete Application Data:', completeApplication)
  
  
  alert('Payment successful! Your visa application has been submitted.')
  
  // Clear saved data after successful completion
  clearSavedData()
  
  // Redirect to success page or dashboard
  // router.push('/application-success')
}

const clearSavedData = () => {
  localStorage.removeItem(STORAGE_KEY)
  console.log('Cleared saved data')
}

defineExpose({ clearSavedData })
</script>