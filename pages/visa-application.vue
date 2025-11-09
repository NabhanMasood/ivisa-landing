<template>
  <div class="min-h-screen">
    <div class="flex items-start justify-center px-4 py-8">
      <div class="w-full max-w-[1200px] rounded-xl shadow-sm bg-white p-8">
        
        <!-- Header with Back Button -->
        <div class="flex items-center gap-4 mb-6">
          <button
            v-if="currentStep > 1"
            @click="handleBack"
            class="rounded-md w-[42px] h-[36px] border border-[#E4E4E8] flex items-center justify-center"
            style="border-color: #E5E7EB;"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#0B3947" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <h1 style="font-family: Geist, sans-serif; font-weight: 600; font-size: 24px; line-height: 32px; letter-spacing: -0.6px; color: #0B3947;">
            {{ currentStep === 5 ? 'Review your order' : `Apply now for your ${destinationCountry} e VISA` }}
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
          @next="handleStepTwo"
          @back="currentStep = 1"
        />

        <!-- Step 3: Passport Details -->
        <PassportDetailsForm
          v-if="currentStep === 3"
          :destination="destinationCountry"
          :traveler-count="travelersData.travelers?.length || 0"
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
          :application-data="completeApplicationData"
          @next="handleStepFive"
          @back="currentStep = 4"
        />

        <!-- Loading Overlay -->
        <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ECE84] mx-auto mb-4"></div>
            <p class="text-lg font-semibold">Submitting your application...</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApplication } from '@/composables/useApplication'
import VisaStepper from '@/components/visa/VisaStepper.vue'
import VisaStats from '@/components/visa/VisaStats.vue'
import TripInfoForm from '@/components/visa/TripInfoForm.vue'
import YourInfoForm from '@/components/visa/YourInfoForm.vue'
import PassportDetailsForm from '@/components/visa/PassportDetailsForm.vue'
import CheckoutForm from '@/components/visa/CheckoutForm.vue'
import ReviewOrder from '@/components/visa/ReviewOrder.vue'

const route = useRoute()
const router = useRouter()
const { submitCompleteApplication, loading, error } = useApplication()

const currentStep = ref(1)
const nationalityCountry = ref('')
const destinationCountry = ref('')
const tripData = ref<any>({})
const travelersData = ref<any>({})
const passportData = ref<any>({})
const processingData = ref<any>({})

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
  // Get country values from URL query parameters
  const fromQuery = (route.query.from || route.query.nationality) as string
  const toQuery = (route.query.to || route.query.destination) as string
  
  if (fromQuery && toQuery) {
    nationalityCountry.value = fromQuery
    destinationCountry.value = toQuery
  } else {
    // Use defaults if no query params
    nationalityCountry.value = 'Pakistan'
    destinationCountry.value = 'Morocco'
  }
})

// Handle back button
const handleBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const completeApplicationData = computed(() => {
  if (!travelersData.value.travelers || !passportData.value.passportDetails) {
    return null
  }
  
  return {
    visaProductId: 1,
    nationality: tripData.value.nationality,
    destinationCountry: destinationCountry.value,
    visaType: tripData.value.visaType,
    numberOfTravelers: travelersData.value.travelers.length,
    
    travelers: travelersData.value.travelers.map((traveler: any, index: number) => {
      const passport = passportData.value.passportDetails[index]
      return {
        firstName: traveler.firstName,
        lastName: traveler.lastName,
        email: traveler.email,
        dateOfBirth: `${traveler.birthYear}-${traveler.birthMonth.padStart(2, '0')}-${traveler.birthDate.padStart(2, '0')}`,
        passportNationality: passport.nationality,
        passportNumber: passport.passportNumber,
        passportExpiryDate: `${passport.expiryYear}-${passport.expiryMonth.padStart(2, '0')}-${passport.expiryDate.padStart(2, '0')}`,
        residenceCountry: passport.residenceCountry,
        hasSchengenVisa: passport.hasSchengenVisa === 'yes'
      }
    }),
    
    processingType: processingData.value.processingType,
    processingFee: processingData.value.processingFee,
    notes: 'Application submitted via web form'
  }
})

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

// Step 5: Review Order & Submit Application
const handleStepFive = async (paymentData: any) => {
  try {
    console.log('Payment completed:', paymentData)
    
    // Transform data to match backend API format
    const applicationData = {
      // No customerId - will be auto-created from first traveler
      visaProductId: 1, // You can make this dynamic based on destination/visa type
      nationality: tripData.value.nationality,
      destinationCountry: destinationCountry.value,
      visaType: tripData.value.visaType as '180-single' | '180-multiple' | '90-single',
      numberOfTravelers: travelersData.value.travelers.length,
      
      // Transform travelers data
      travelers: travelersData.value.travelers.map((traveler: any, index: number) => {
        const passport = passportData.value.passportDetails[index]
        return {
          firstName: traveler.firstName,
          lastName: traveler.lastName,
          email: traveler.email,
          dateOfBirth: `${traveler.birthYear}-${traveler.birthMonth.padStart(2, '0')}-${traveler.birthDate.padStart(2, '0')}`,
          passportNationality: passport.nationality,
          passportNumber: passport.passportNumber,
          passportExpiryDate: `${passport.expiryYear}-${passport.expiryMonth.padStart(2, '0')}-${passport.expiryDate.padStart(2, '0')}`,
          residenceCountry: passport.residenceCountry,
          hasSchengenVisa: passport.hasSchengenVisa === 'yes'
        }
      }),
      
      processingType: processingData.value.processingType as 'standard' | 'rush' | 'super-rush',
      processingFee: processingData.value.processingFee,
      
      payment: {
        cardholderName: paymentData.cardholderName,
        cardLast4: paymentData.cardNumberLast4,
        transactionId: `txn_${Date.now()}`,
        paymentGateway: 'stripe'
      },
      
      notes: 'Application submitted via web form'
    }
    
    console.log('Submitting application:', applicationData)
    
    // Submit to backend
    const result = await submitCompleteApplication(applicationData)
    
    console.log('Application submitted successfully:', result)
        
    // Redirect to success page with application details
    router.push({
      name: 'application-success',
      params: {
        applicationNumber: result.application.applicationNumber
      },
      query: {
        customerId: result.customerId
      }
    })
    
  } catch (err) {
    console.error('Application submission failed:', err)
  }
}
</script>