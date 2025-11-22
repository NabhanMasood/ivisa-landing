<template>
  <div class="min-h-screen">
    <div class="flex items-start justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div class="w-full max-w-[1200px] rounded-lg sm:rounded-xl shadow-sm bg-white p-4 sm:p-6 md:p-8">
        
        <!-- Header with Back Button -->
        <div class="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <button
            v-if="currentStep > 1"
            @click="handleBack"
            class="rounded-md w-[36px] h-[32px] sm:w-[42px] sm:h-[36px] border border-[#E4E4E8] flex items-center justify-center flex-shrink-0"
            style="border-color: #E5E7EB;"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#0B3947" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <h1 class="text-lg sm:text-xl md:text-2xl font-semibold leading-tight" style="font-family: Geist, sans-serif; font-weight: 600; letter-spacing: -0.6px; color: #0B3947;">
            {{ currentStep === 6 ? 'Review your order' : `Apply now for your ${destinationCountry} e VISA` }}
          </h1>
        </div>

        <VisaStepper :current-step="currentStep" />
        
        <VisaStats 
          v-if="currentStep === 1" 
          :destination="destinationCountry" 
          :product-details="tripData.productDetails"
        />
        
        <!-- Step 1: Trip Info -->
        <TripInfoForm 
          v-if="currentStep === 1"
          :nationality="nationalityCountry"
          :destination="destinationCountry"
          :initial-data="{
            ...tripData,
            travelers: travelersData.travelers  
          }"
          @next="handleStepOne"
          @update="handleStepOneUpdate"
        />
        
        <!-- Step 2: Personal Details (Your Info) -->
        <YourInfoForm
          v-if="currentStep === 2"
          :destination="destinationCountry"
          :initial-traveler-count="tripData.applicants"
          :initial-travelers-data="travelersData.travelers"
          :product-details="tripData.productDetails" 
          @next="handleStepTwo"
          @update="handleStepTwoUpdate" 
          @back="currentStep = 1"
        />

        <!-- Step 3: Passport Details -->
        <PassportDetailsForm
          v-if="currentStep === 3"
          :key="`passport-${travelersData.travelers?.length || 0}`"  
          :destination="destinationCountry"
          :traveler-count="travelersData.travelers?.length || 0"
          :initial-passport-data="passportData.passportDetails"
          :product-details="tripData.productDetails"  
          @next="handleStepThree"
          @update="handleStepThreeUpdate" 
          @back="currentStep = 2"
        />

        <!-- Step 4: Embassy Selection -->
        <EmbassySelectionForm
          v-if="currentStep === 4"
          :destination="destinationCountry"
          :nationality="tripData.nationality"
          :traveler-count="travelersData.travelers?.length || 0"
          :product-details="tripData.productDetails"
          :initial-data="embassyData"
          @next="handleStepFour"
          @back="currentStep = 3"
        />

        <!-- Step 5: Processing Time (Checkout) -->
        <CheckoutForm
          v-if="currentStep === 5"
          :destination="destinationCountry"
          :traveler-count="travelersData.travelers?.length || 0"
          :product-details="tripData.productDetails"
          :initial-data="processingData"
          @next="handleStepFive"
          @back="currentStep = 4"
        />

        <!-- Step 6: Review Order -->
        <ReviewOrder
          v-if="currentStep === 6"
          :destination="destinationCountry"
          :travelers="getTravelerNames()"
          :processing-fee="processingData.processingFee || 0"
          :processing-type="processingData.processingType"
          :visa-details="getVisaDetails()"
          :product-details="tripData.productDetails"
          :application-data="completeApplicationData"
          :embassy="selectedEmbassy"
          @next="handleStepSix"
          @back="currentStep = 5"
        />

        <!-- Loading Overlay -->
        <div v-if="loading || isCreatingDraft" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-lg p-4 sm:p-6 text-center max-w-[90vw] sm:max-w-md">
            <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#1ECE84] mx-auto mb-3 sm:mb-4"></div>
            <p class="text-base sm:text-lg font-semibold">
              {{ isCreatingDraft ? 'Saving your application...' : 'Submitting your application...' }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApplication } from '@/composables/useApplication'
import { useFormPersistence } from '@/composables/useFormPersistence'
import { useAuthApi } from '@/composables/useAuth'
import VisaStepper from '@/components/visa/VisaStepper.vue'
import VisaStats from '@/components/visa/VisaStats.vue'
import TripInfoForm from '@/components/visa/TripInfoForm.vue'
import YourInfoForm from '@/components/visa/YourInfoForm.vue'
import PassportDetailsForm from '@/components/visa/PassportDetailsForm.vue'
import EmbassySelectionForm from '@/components/visa/EmbassySelectionForm.vue'
import CheckoutForm from '@/components/visa/CheckoutForm.vue'
import ReviewOrder from '@/components/visa/ReviewOrder.vue'

const route = useRoute()
const router = useRouter()
const { submitCompleteApplication, createDraftApplication, loading, error } = useApplication()
const { currentUser, isAuthenticated } = useAuthApi()

// ✅ Get storage key based on route
const getStorageKey = () => {
  const from = route.query.from || route.query.nationality || 'Pakistan'
  const to = route.query.to || route.query.destination || 'Morocco'
  return `visa_application_${from}_${to}`
}

// ✅ Initialize form persistence
const { saveState, loadState, clearState, setupAutoSave } = useFormPersistence(getStorageKey(), 24)

const currentStep = ref(1)
const nationalityCountry = ref('')
const destinationCountry = ref('')

// Store all form data
const tripData = ref<any>({
  nationality: '',
  visaType: '',
  applicants: 1,
  email: '',
  productDetails: null
})

// Store application ID from draft creation
const applicationId = ref<number | null>(null)
const isCreatingDraft = ref(false)

const travelersData = ref<any>({
  travelers: []
})

const passportData = ref<any>({
  passportDetails: []
})

const embassyData = ref<any>({
  embassyId: null
})

const selectedEmbassy = ref<any>(null)

const processingData = ref<any>({
  processingType: '',
  processingFee: 0,
  processingFeeId: null,
  processingTime: ''
})

const handleStepTwoUpdate = (data: any) => {
  console.log('💾 Auto-saving Step 2 data:', data)
  console.log('👥 New travelers count:', data.travelers?.length)
  
  travelersData.value = { ...data }
  
  // ✅ Trim passportData if travelers were removed
  if (passportData.value.passportDetails?.length > data.travelers?.length) {
    console.log('✂️ Trimming passport data from', passportData.value.passportDetails.length, 'to', data.travelers.length)
    passportData.value.passportDetails = passportData.value.passportDetails.slice(0, data.travelers.length)
  }
}

const handleStepThreeUpdate = (data: any) => {
  console.log('💾 Auto-saving Step 3 data:', data)
  passportData.value = { ...data }
}

// Get traveler names for review page
const getTravelerNames = () => {
  if (!travelersData.value.travelers || travelersData.value.travelers.length === 0) return []
  return travelersData.value.travelers.map((t: any) => 
    `${t.firstName} ${t.lastName}`.trim() || 'Traveler'
  )
}

// Get visa details for review page
const getVisaDetails = () => {
  const product = tripData.value.productDetails
  
  if (!product) {
    return {
      validity: 'N/A',
      maxStay: 'N/A',
      entries: 'N/A'
    }
  }
  
  return {
    validity: `${product.validity} days after issued`,
    maxStay: `${product.duration} days per entry`,
    entries: product.entryType === 'single' ? 'Single entry' : 'Multiple entry'
  }
}

// Complete application data
const completeApplicationData = computed(() => {
  if (!travelersData.value.travelers || !passportData.value.passportDetails) {
    return null
  }
  
  const product = tripData.value.productDetails
  
  if (!product) {
    console.error('❌ No product details available')
    return null
  }
  
  const numberOfTravelers = travelersData.value.travelers.length
  const govtFeePerTraveler = Number(product.govtFee) || 0
  const serviceFeePerTraveler = Number(product.serviceFee) || 0
  const processingFeePerTraveler = Number(processingData.value.processingFee) || 0
  
  return {
    visaProductId: product.id || null,
    nationality: tripData.value.nationality,
    destinationCountry: destinationCountry.value,
    visaType: tripData.value.visaType,
    numberOfTravelers: numberOfTravelers,
    govtFee: govtFeePerTraveler,
    serviceFee: serviceFeePerTraveler,
    processingFee: processingFeePerTraveler,
    productDetails: product, // ✅ Include full product details for PaymentModal
    travelers: travelersData.value.travelers.map((traveler: any, index: number) => {
      const passport = passportData.value.passportDetails[index]
      const travelerData: any = {
        firstName: traveler.firstName,
        lastName: traveler.lastName,
        dateOfBirth: `${traveler.birthYear}-${traveler.birthMonth.padStart(2, '0')}-${traveler.birthDate.padStart(2, '0')}`,
        passportNationality: passport.nationality,
        passportNumber: passport.passportNumber,
        passportExpiryDate: `${passport.expiryYear}-${passport.expiryMonth.padStart(2, '0')}-${passport.expiryDate.padStart(2, '0')}`,
        residenceCountry: passport.residenceCountry,
        hasSchengenVisa: passport.hasSchengenVisa === 'yes'
      }
      
      if (index === 0) {
        travelerData.email = traveler.email || ''
        travelerData.phone = traveler.phone || ''
        travelerData.receiveUpdates = traveler.receiveUpdates || false
        console.log('📞 First traveler phone:', travelerData.phone)
        console.log('📧 First traveler receiveUpdates:', travelerData.receiveUpdates)
      } else {
        // For additional travelers, use empty string or first traveler's phone
        travelerData.phone = ''
        travelerData.receiveUpdates = false
      }
      
      return travelerData
    }),
    processingFeeId: processingData.value.processingFeeId,
    processingType: processingData.value.processingType,
    processingTime: processingData.value.processingTime,
    embassyId: embassyData.value.embassyId || null,
    notes: 'Application submitted via web form'
  }
})

// ✅ Setup auto-save when component mounts
let cleanupAutoSave: (() => void) | null = null

onMounted(() => {
  // Try to restore from localStorage first
  const savedState = loadState()
  
  if (savedState) {
    // Restore all saved data
    currentStep.value = savedState.currentStep || 1
    nationalityCountry.value = savedState.nationalityCountry
    destinationCountry.value = savedState.destinationCountry
    tripData.value = savedState.tripData
    travelersData.value = savedState.travelersData
    passportData.value = savedState.passportData
    embassyData.value = savedState.embassyData || { embassyId: null }
    processingData.value = savedState.processingData
    
    console.log('✅ Application state restored from localStorage')
  } else {
    // Initialize from URL
    const fromQuery = (route.query.from || route.query.nationality) as string
    const toQuery = (route.query.to || route.query.destination) as string
    
    if (fromQuery && toQuery) {
      nationalityCountry.value = fromQuery
      destinationCountry.value = toQuery
    } else {
      nationalityCountry.value = 'Pakistan'
      destinationCountry.value = 'Morocco'
    }
  }
  
  // Setup auto-save watchers
  cleanupAutoSave = setupAutoSave({
    currentStep,
    nationalityCountry,
    destinationCountry,
    tripData,
    travelersData,
    passportData,
    embassyData,
    processingData
  })

  // Restore application ID from localStorage if available
  const savedApplicationId = localStorage.getItem('currentApplicationId')
  if (savedApplicationId) {
    applicationId.value = parseInt(savedApplicationId)
    console.log('✅ Restored application ID from localStorage:', applicationId.value)
  }
})

// Cleanup watchers on unmount
onUnmounted(() => {
  if (cleanupAutoSave) {
    cleanupAutoSave()
  }
})

// Handle back button
const handleBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Step handlers
// Handle real-time updates from Step 1 (for VisaStats)
const handleStepOneUpdate = (data: any) => {
  console.log('🔄 Step 1 update received:', data)
  tripData.value = {
    ...tripData.value,
    ...data,
    applicants: parseInt(data.applicants),
    email: data.email || tripData.value.email,
    productDetails: data.productDetails
  }
  // Don't change step, just update the data
}

const handleStepOne = async (data: any) => {
  console.log('✅ Step 1 data received:', data)
  
  tripData.value = {
    ...data,
    applicants: parseInt(data.applicants),
    email: data.email || '',
    productDetails: data.productDetails
  }

  // ✅ Create draft application with email capture
  if (data.productDetails && data.email) {
    isCreatingDraft.value = true
    try {
      const product = data.productDetails
      const productId = product.id || product.visaProductId
      
      if (!productId) {
        console.error('❌ No product ID available')
        throw new Error('Product ID is required')
      }

      // Get customer ID if user is authenticated
      let customerId: number | undefined
      if (isAuthenticated.value && currentUser.value?.id) {
        customerId = currentUser.value.id
        console.log('✅ Using authenticated customer ID:', customerId)
      }

      // Parse visa type from the format "productName|entryType"
      // Backend only accepts: "180-single", "180-multiple", or "90-single"
      // Map based on entryType (single vs multiple)
      const visaTypeParts = data.visaType?.split('|') || []
      const entryType = (product.entryType || visaTypeParts[1] || 'single').toLowerCase().trim()
      
      // Map to backend's accepted visa types based on entryType
      // Default to 180-single, use 180-multiple for multiple entry, 90-single for 90-day visas
      let visaType = '180-single' // Default fallback
      
      if (product) {
        const duration = Number(product.duration) || Number(product.validity) || 180
        
        // Check if it's a 90-day visa
        if (duration === 90) {
          visaType = '90-single'
        } 
        // Check if it's multiple entry (case-insensitive)
        else if (entryType === 'multiple') {
          visaType = '180-multiple'
        } 
        // Default to single entry for all other cases
        else {
          visaType = '180-single'
        }
      }
      
      console.log('🎫 Mapped visaType:', { 
        original: data.visaType, 
        mapped: visaType, 
        productDuration: product?.duration,
        productEntryType: product?.entryType,
        entryType
      })

      const draftData: any = {
        visaProductId: productId,
        nationality: data.nationality,
        destinationCountry: destinationCountry.value,
        visaType: visaType,
        numberOfTravelers: parseInt(data.applicants) || 1,
        email: data.email,
      }
      
      // Only include customerId if user is authenticated
      if (customerId) {
        draftData.customerId = customerId
      }

      console.log('📧 Creating draft application with email:', draftData)

      const result = await createDraftApplication(draftData)
      
      if (result && result.id) {
        applicationId.value = result.id
        console.log('✅ Draft application created with ID:', result.id)
        console.log('📧 Email captured:', data.email)
        
        // Store application ID in localStorage for persistence
        localStorage.setItem('currentApplicationId', result.id.toString())
      } else {
        console.warn('⚠️ Draft creation succeeded but no ID returned')
      }
    } catch (err: any) {
      console.error('❌ Failed to create draft application:', err)
      // Don't block user from proceeding - email capture is the main goal
      // If draft creation fails, the email will still be captured in final submission
      console.warn('⚠️ Draft creation failed, but continuing - email will be captured on final submission')
    } finally {
      isCreatingDraft.value = false
    }
  } else {
    console.warn('⚠️ Skipping draft creation - missing product details or email')
  }

  currentStep.value = 2
}

const handleStepTwo = (data: any) => {
  console.log('✅ Step 2 data saved:', data)
  travelersData.value = { ...data }
  currentStep.value = 3
}

const handleStepThree = (data: any) => {
  console.log('✅ Step 3 data saved:', data)
  passportData.value = { ...data }
  currentStep.value = 4
}

const handleStepFour = (data: any) => {
  console.log('✅ Step 4 (Embassy) data received:', data)
  embassyData.value = { embassyId: data.embassyId }
  
  // Store embassy info if available (for display in review)
  selectedEmbassy.value = data.embassy || null
  
  currentStep.value = 5
}

const handleStepFive = (data: any) => {
  console.log('✅ Step 5 (Processing Time) data received:', data)
  processingData.value = { 
    processingFeeId: data.processingFeeId,
    processingType: data.processingType,
    processingTime: data.processingTime,
    processingFee: data.processingFee
  }
  currentStep.value = 6
}

const handleStepSix = async (result: any) => {
  console.log('✅ Payment completed, application submitted:', result)
  // Clear saved data after successful submission
  clearState()
  // Clear application ID from localStorage
  localStorage.removeItem('currentApplicationId')
  applicationId.value = null
}
</script>