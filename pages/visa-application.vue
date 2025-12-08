<template>
<div class="min-h-screen overflow-visible">
  <div class="flex items-start justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 overflow-visible">
    <div class="w-full max-w-[1200px] rounded-lg sm:rounded-xl shadow-sm bg-white p-4 sm:p-6 md:p-8 overflow-visible">        <!-- Header with Back Button -->
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
import { ref, computed, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useApplication } from '@/composables/useApplication'
import { useFormPersistence } from '@/composables/useFormPersistence'
import { useAuthApi } from '@/composables/useAuth'
import { useVisaApplications } from '@/composables/useVisaApplications'
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
const { getApplicationById, updateDraftApplication } = useVisaApplications()

// Store application ID from draft creation (declare before getStorageKey)
const applicationId = ref<number | null>(null)

// ✅ Get storage key based on route AND applicationId to prevent collisions
const getStorageKey = () => {
  const from = route.query.from || route.query.nationality || 'Pakistan'
  const to = route.query.to || route.query.destination || 'Morocco'
  // Include applicationId in key if available to make each application unique
  const appId = applicationId.value || (process.client ? localStorage.getItem('currentApplicationId') : null)
  if (appId) {
    return `visa_application_${from}_${to}_${appId}`
  }
  // For new applications, use a timestamp-based key to prevent collisions
  const timestamp = Date.now()
  return `visa_application_${from}_${to}_new_${timestamp}`
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
  
  // ✅ Ensure applicationId is included if we have a draft
  const draftId = applicationId.value || (process.client ? parseInt(localStorage.getItem('currentApplicationId') || '0') || undefined : undefined)
  
  console.log('🔑 completeApplicationData - applicationId:', draftId || 'NOT SET')
  
  // ✅ Ensure visaType is in the correct format for PaymentModal
  // PaymentModal expects format: "ProductName|entryType" (e.g., "Morocco e-Visa|single")
  // Check if visaType is in backend format (e.g., "90-single") or PaymentModal format (e.g., "Morocco e-Visa|single")
  let visaTypeForPayment = tripData.value.visaType
  
  // If visaType is in backend format (digits-dash-word like "90-single"), reconstruct PaymentModal format
  if (visaTypeForPayment && visaTypeForPayment.match(/^\d+-\w+$/)) {
    // It's in backend format, reconstruct from product
    const entryType = product.entryType || 'single'
    visaTypeForPayment = `${product.productName || 'Visa'}|${entryType}`
    console.log('🔄 Reconstructed visaType for PaymentModal from backend format:', {
      original: tripData.value.visaType,
      reconstructed: visaTypeForPayment,
      productName: product.productName,
      entryType: entryType
    })
  } else if (!visaTypeForPayment || !visaTypeForPayment.includes('|')) {
    // Construct from product details if missing or invalid
    const entryType = product.entryType || 'single'
    const productName = product.productName || product.name || 'Visa'
    visaTypeForPayment = `${productName}|${entryType}`
    console.log('⚠️ visaType missing or invalid, constructing from product:', {
      visaTypeForPayment,
      productName,
      entryType,
      product: product
    })
  }
  
  // ✅ Final validation - ensure visaType is never empty
  if (!visaTypeForPayment || !visaTypeForPayment.includes('|')) {
    console.error('❌ CRITICAL: visaType is still invalid after reconstruction:', visaTypeForPayment)
    console.error('❌ Product details:', product)
    // Last resort fallback
    visaTypeForPayment = `${product.name || product.productName || 'Visa'}|${product.entryType || 'single'}`
    console.error('❌ Using fallback visaType:', visaTypeForPayment)
  }
  
  console.log('✅ Using visaType for PaymentModal:', visaTypeForPayment)
  
  return {
    applicationId: draftId || undefined,
    visaProductId: product.id || null,
    nationality: tripData.value.nationality,
    destinationCountry: destinationCountry.value,
    visaType: visaTypeForPayment,
    numberOfTravelers: numberOfTravelers,
    govtFee: govtFeePerTraveler,
    serviceFee: serviceFeePerTraveler,
    processingFee: processingFeePerTraveler,
    productDetails: product, // ✅ Include full product details for PaymentModal
    travelers: travelersData.value.travelers.map((traveler: any, index: number) => {
      const passport = passportData.value.passportDetails[index]
      const addPassportDetailsLater = passport?.addPassportDetailsLater || false
      
      const travelerData: any = {
        firstName: traveler.firstName,
        lastName: traveler.lastName,
        dateOfBirth: `${traveler.birthYear}-${traveler.birthMonth.padStart(2, '0')}-${traveler.birthDate.padStart(2, '0')}`,
        passportNationality: passport?.nationality || '',
        addPassportDetailsLater: addPassportDetailsLater
      }
      
      // Only include passport fields if addPassportDetailsLater is false
      if (!addPassportDetailsLater) {
        // Construct passport expiry date only if all date parts are present
        let passportExpiryDate = null
        if (passport?.expiryYear && passport?.expiryMonth && passport?.expiryDate) {
          passportExpiryDate = `${passport.expiryYear}-${passport.expiryMonth.padStart(2, '0')}-${passport.expiryDate.padStart(2, '0')}`
        }
        
        travelerData.passportNumber = passport?.passportNumber || null
        travelerData.passportExpiryDate = passportExpiryDate
        travelerData.residenceCountry = passport?.residenceCountry || null
        travelerData.hasSchengenVisa = passport?.hasSchengenVisa === 'yes' ? true : (passport?.hasSchengenVisa === 'no' ? false : null)
      } else {
        // When addPassportDetailsLater is true, set passport fields to null or omit them
        travelerData.passportNumber = null
        travelerData.passportExpiryDate = null
        travelerData.residenceCountry = null
        travelerData.hasSchengenVisa = null
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

onMounted(async () => {
  // Clear old application data if starting a fresh application (no draftId in URL)
  const draftId = route.query.draftId as string | undefined
  const urlApplicationId = route.query.applicationId || route.params.id
  
  // If no draftId and no applicationId in URL, this is a new application
  // Clear any old application data to prevent collisions
  if (!draftId && !urlApplicationId) {
    const oldAppId = localStorage.getItem('currentApplicationId')
    if (oldAppId) {
      console.log('🆕 Starting new application, clearing old application data:', oldAppId)
      // Clear old application-specific storage
      const from = route.query.from || route.query.nationality || 'Pakistan'
      const to = route.query.to || route.query.destination || 'Morocco'
      localStorage.removeItem(`visa_application_${from}_${to}_${oldAppId}`)
      localStorage.removeItem(`currentApplicationId_${oldAppId}`)
      // Don't clear 'currentApplicationId' yet - it will be set when new draft is created
    }
    // Clear any old form state for this route combination
    clearState()
  }
  
  if (draftId) {
    // Load draft application from API
    try {
      console.log('📋 Loading draft application:', draftId)
      const response = await getApplicationById(parseInt(draftId))
      
      if (response.success && response.data) {
        const draft: any = response.data.data || response.data
        const draftData = draft.draftData || {}
        
        // Set application ID
        applicationId.value = draft.id
        // Store with unique key per application to prevent collisions
        localStorage.setItem(`currentApplicationId_${draft.id}`, String(draft.id))
        // Also store the latest for backward compatibility
        const oldAppId = localStorage.getItem('currentApplicationId')
        if (oldAppId && oldAppId !== String(draft.id)) {
          // Clear old application's localStorage data if switching to a new application
          const oldFrom = route.query.from || route.query.nationality || 'Pakistan'
          const oldTo = route.query.to || route.query.destination || 'Morocco'
          localStorage.removeItem(`visa_application_${oldFrom}_${oldTo}_${oldAppId}`)
        }
        localStorage.setItem('currentApplicationId', String(draft.id))
        
        // ✅ Restore from draftData if available, otherwise fall back to main fields
        if (draftData.step1) {
          // Restore Step 1 data
          const step1 = draftData.step1
          nationalityCountry.value = step1.nationality || draft.nationality || 'Pakistan'
          destinationCountry.value = step1.destination || draft.destinationCountry || 'Morocco'
          tripData.value = {
            nationality: step1.nationality || draft.nationality || '',
            destination: step1.destination || draft.destinationCountry || '',
            // ✅ Restore visaType - use original format if available, otherwise construct from product
            visaType: step1.visaTypeOriginal || step1.visaType || draft.visaType || '',
            applicants: step1.applicants || draft.numberOfTravelers || 1,
            email: step1.email || draft.email || '',
            productDetails: step1.productDetails || (draft as any).visaProduct || null,
            phoneNumber: step1.phoneNumber || ''
          }
          
          // ✅ If visaType is in backend format (e.g., "90-single"), reconstruct original format for PaymentModal
          if (tripData.value.visaType && tripData.value.visaType.match(/^\d+-\w+$/)) {
            // It's in backend format, reconstruct from product
            const product = tripData.value.productDetails
            if (product) {
              const entryType = product.entryType || 'single'
              tripData.value.visaType = `${product.productName || 'Visa'}|${entryType}`
              console.log('🔄 Reconstructed visaType for PaymentModal:', tripData.value.visaType)
            }
          }
        } else {
          // Fallback to main fields
          nationalityCountry.value = draft.nationality || 'Pakistan'
          destinationCountry.value = draft.destinationCountry || 'Morocco'
          tripData.value = {
            nationality: draft.nationality || '',
            destination: draft.destinationCountry || '',
            visaType: draft.visaType || '',
            applicants: draft.numberOfTravelers || 1,
            email: draft.email || '',
            productDetails: (draft as any).visaProduct || null
          }
        }
        
        // ✅ Restore Step 2 data (travelers)
        if (draftData.step2 && draftData.step2.travelers) {
          travelersData.value = {
            travelers: draftData.step2.travelers
          }
        } else if (draft.travelers && Array.isArray(draft.travelers) && draft.travelers.length > 0) {
          // Fallback to travelers from relations
          travelersData.value = {
            travelers: draft.travelers.map((t: any) => ({
              firstName: t.firstName || '',
              lastName: t.lastName || '',
              email: t.email || '',
              phone: t.phone || '',
              birthYear: t.dateOfBirth ? new Date(t.dateOfBirth).getFullYear().toString() : '',
              birthMonth: t.dateOfBirth ? String(new Date(t.dateOfBirth).getMonth() + 1).padStart(2, '0') : '',
              birthDate: t.dateOfBirth ? String(new Date(t.dateOfBirth).getDate()).padStart(2, '0') : '',
              receiveUpdates: t.receiveUpdates || false
            }))
          }
        }
        
        // ✅ Restore Step 3 data (passport details)
        if (draftData.step3 && draftData.step3.passportDetails) {
          passportData.value = {
            passportDetails: draftData.step3.passportDetails
          }
        } else if (draft.travelers && Array.isArray(draft.travelers) && draft.travelers.length > 0) {
          // Fallback to passport data from travelers
          passportData.value = {
            passportDetails: draft.travelers.map((t: any) => ({
              nationality: t.passportNationality || '',
              passportNumber: t.passportNumber || '',
              expiryYear: t.passportExpiryDate ? new Date(t.passportExpiryDate).getFullYear().toString() : '',
              expiryMonth: t.passportExpiryDate ? String(new Date(t.passportExpiryDate).getMonth() + 1).padStart(2, '0') : '',
              expiryDate: t.passportExpiryDate ? String(new Date(t.passportExpiryDate).getDate()).padStart(2, '0') : '',
              residenceCountry: t.residenceCountry || '',
              hasSchengenVisa: t.hasSchengenVisa ? 'yes' : 'no'
            }))
          }
        }
        
        // ✅ Restore Step 4 data (embassy)
        if (draftData.step4) {
          embassyData.value = {
            embassyId: draftData.step4.embassyId || (draft as any).embassyId || null
          }
          selectedEmbassy.value = draftData.step4.embassy || null
        } else if ((draft as any).embassyId) {
          embassyData.value = {
            embassyId: (draft as any).embassyId
          }
        }
        
        // ✅ Restore Step 5 data (processing options)
        if (draftData.step5) {
          processingData.value = {
            processingType: draftData.step5.processingType || draft.processingType || 'standard',
            processingFee: Number(draftData.step5.processingFee) || Number(draft.processingFee) || 0,
            processingTime: draftData.step5.processingTime || (draft as any).processingTime || '',
            processingFeeId: draftData.step5.processingFeeId || (draft as any).processingFeeId || null
          }
        } else if (draft.processingType || draft.processingFee) {
          processingData.value = {
            processingType: draft.processingType || 'standard',
            processingFee: Number(draft.processingFee) || 0,
            processingTime: (draft as any).processingTime || '',
            processingFeeId: (draft as any).processingFeeId || null
          }
        }
        
        // ✅ Set current step from draftData or determine from available data
        if (draftData.currentStep) {
          currentStep.value = draftData.currentStep
        } else if (draft.currentStep) {
          currentStep.value = draft.currentStep
        } else {
          // Determine step from available data
          if (draftData.step5 || (draft.processingType && draft.processingFee)) {
            currentStep.value = 6 // Review step
          } else if (draftData.step4 || (draft as any).embassyId) {
            currentStep.value = 5 // Processing options
          } else if (draftData.step3 || (draft.travelers && draft.travelers[0]?.passportNumber)) {
            currentStep.value = 4 // Embassy selection
          } else if (draftData.step2 || (draft.travelers && draft.travelers.length > 0)) {
            currentStep.value = 3 // Passport details
          } else {
            currentStep.value = 2 // Travelers info
          }
        }
        
        console.log('✅ Draft application loaded successfully from draftData')
      } else {
        console.error('❌ Failed to load draft application')
        // Fall back to normal initialization
        initializeForm()
      }
    } catch (err) {
      console.error('❌ Error loading draft application:', err)
      // Fall back to normal initialization
      initializeForm()
    }
  } else {
    // Normal initialization
    initializeForm()
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
})

// Helper function to initialize form normally
const initializeForm = () => {
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
  
  // Restore application ID from localStorage if available
  // Check if we're continuing an existing application from URL params
  const urlApplicationId = route.query.applicationId || route.params.id
  if (urlApplicationId) {
    applicationId.value = parseInt(String(urlApplicationId))
    console.log('✅ Using application ID from URL:', applicationId.value)
  } else {
    // Only restore from localStorage if no URL param (for backward compatibility)
    const savedApplicationId = localStorage.getItem('currentApplicationId')
    if (savedApplicationId) {
      applicationId.value = parseInt(savedApplicationId)
      console.log('✅ Restored application ID from localStorage:', applicationId.value)
    }
  }
  
  // If we have an applicationId, update storage key to include it
  if (applicationId.value) {
    // Storage key will be updated on next save
    console.log('🔑 Application ID set, storage will be application-specific')
  }
}

// Function to save draft before leaving
const saveDraftBeforeLeaving = async () => {
  // Only save if we have minimum required data (email and product)
  if (!tripData.value.email || !tripData.value.productDetails) {
    console.log('⚠️ Not enough data to save draft - missing email or product')
    return
  }

  try {
    const product = tripData.value.productDetails
    const productId = product.id || product.visaProductId
    
    if (!productId) {
      console.log('⚠️ No product ID available for draft')
      return
    }

    // Get customer ID if user is authenticated
    let customerId: number | undefined
    if (isAuthenticated.value && currentUser.value?.id) {
      customerId = currentUser.value.id
    }

    // Parse visa type
    const visaTypeParts = tripData.value.visaType?.split('|') || []
    const entryType = (product.entryType || visaTypeParts[1] || 'single').toLowerCase().trim()
    const duration = Number(product.duration) || Number(product.validity) || 180
    const visaType = `${duration}-${entryType}`

    // Build complete draftData object with all step data
    const completeDraftData: any = {
      step1: tripData.value.email && tripData.value.productDetails ? {
        nationality: tripData.value.nationality || nationalityCountry.value,
        destination: destinationCountry.value,
        visaType: visaType,
        email: tripData.value.email,
        applicants: travelersData.value.travelers?.length || tripData.value.applicants || 1,
        productDetails: tripData.value.productDetails,
        phoneNumber: tripData.value.phoneNumber || ''
      } : null,
      step2: travelersData.value.travelers && travelersData.value.travelers.length > 0 ? {
        travelers: travelersData.value.travelers
      } : null,
      step3: passportData.value.passportDetails && passportData.value.passportDetails.length > 0 ? {
        passportDetails: passportData.value.passportDetails
      } : null,
      step4: embassyData.value.embassyId ? {
        embassyId: embassyData.value.embassyId,
        embassy: selectedEmbassy.value
      } : null,
      step5: processingData.value.processingType ? {
        processingType: processingData.value.processingType,
        processingFee: processingData.value.processingFee,
        processingFeeId: processingData.value.processingFeeId,
        processingTime: processingData.value.processingTime
      } : null,
      currentStep: currentStep.value
    }

    // Remove null steps
    Object.keys(completeDraftData).forEach(key => {
      if (completeDraftData[key] === null) {
        delete completeDraftData[key]
      }
    })

    // If we already have a draft, update it; otherwise create a new one
    if (applicationId.value) {
      console.log('💾 Updating existing draft before leaving:', applicationId.value)
      await updateDraftApplication(applicationId.value, {
        visaProductId: productId,
        nationality: tripData.value.nationality || nationalityCountry.value,
        destinationCountry: destinationCountry.value,
        visaType: visaType,
        numberOfTravelers: travelersData.value.travelers?.length || tripData.value.applicants || 1,
        email: tripData.value.email,
        embassyId: embassyData.value.embassyId || null,
        processingType: processingData.value.processingType || undefined,
        processingFee: processingData.value.processingFee || undefined,
        draftData: completeDraftData,
        currentStep: currentStep.value
      })
      console.log('✅ Draft updated successfully with all step data')
    } else {
      console.log('💾 Creating new draft before leaving')
      const createData: any = {
        visaProductId: productId,
        nationality: tripData.value.nationality || nationalityCountry.value,
        destinationCountry: destinationCountry.value,
        visaType: visaType,
        numberOfTravelers: travelersData.value.travelers?.length || tripData.value.applicants || 1,
        email: tripData.value.email,
        draftData: completeDraftData,
        currentStep: currentStep.value
      }
      
      if (customerId) {
        createData.customerId = customerId
      }
      
      const result = await createDraftApplication(createData)
      if (result && result.id) {
        applicationId.value = result.id
        // Store with unique key per application
        localStorage.setItem(`currentApplicationId_${result.id}`, result.id.toString())
        localStorage.setItem('currentApplicationId', result.id.toString())
        console.log('✅ Draft created successfully with ID:', result.id)
        // Clear old storage and use new application-specific key
        clearState()
      }
    }
  } catch (err: any) {
    console.error('❌ Failed to save draft before leaving:', err)
    // Don't block navigation - just log the error
  }
}

// Save draft when user navigates away (route change)
onBeforeRouteLeave(async (to, from, next) => {
  console.log('🚪 User navigating away from visa application')
  await saveDraftBeforeLeaving()
  next() // Allow navigation to proceed
})

// Save draft when user closes/refreshes page
// Note: beforeunload has limited async support, so we use navigator.sendBeacon as fallback
if (process.client) {
  const handleBeforeUnload = () => {
    console.log('🚪 Page unloading, attempting to save draft')
    // Try to save synchronously - if we have enough data
    if (tripData.value.email && tripData.value.productDetails && applicationId.value) {
      // For beforeunload, we can't use async, so we'll rely on periodic saves
      // But we can at least ensure localStorage is up to date
      if (applicationId.value) {
        localStorage.setItem('currentApplicationId', applicationId.value.toString())
      }
    }
  }
  
  window.addEventListener('beforeunload', handleBeforeUnload)
  
  // Cleanup on unmount
  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  })
}

// Cleanup watchers on unmount
onUnmounted(() => {
  if (cleanupAutoSave) {
    cleanupAutoSave()
  }
  
  // Save draft one more time on unmount
  if (process.client) {
    saveDraftBeforeLeaving()
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
const handleStepOneUpdate = async (data: any) => {
  console.log('🔄 Step 1 update received:', data)
  tripData.value = {
    ...tripData.value,
    ...data,
    applicants: parseInt(data.applicants),
    email: data.email || tripData.value.email,
    productDetails: data.productDetails
  }
  
  // ✅ Auto-create draft when email and product are available (even before completing step 1)
  if (data.email && data.productDetails && !applicationId.value) {
    console.log('💾 Auto-creating draft from step 1 update (email + product available)')
    try {
      const product = data.productDetails
      const productId = product.id || product.visaProductId
      
      if (productId) {
        let customerId: number | undefined
        if (isAuthenticated.value && currentUser.value?.id) {
          customerId = currentUser.value.id
        }

        const visaTypeParts = data.visaType?.split('|') || []
        const entryType = (product.entryType || visaTypeParts[1] || 'single').toLowerCase().trim()
        const duration = Number(product.duration) || Number(product.validity) || 180
        
        // ✅ Map visa type to backend-accepted format
        // Backend only accepts: 180-single, 180-multiple, or 90-single
        // Map based on duration and entry type
        let visaType: string
        if (duration <= 90) {
          visaType = '90-single' // For durations <= 90, use 90-single
        } else {
          // For durations > 90, use 180-single or 180-multiple based on entry type
          visaType = entryType === 'multiple' ? '180-multiple' : '180-single'
        }
        
        console.log('🎫 Mapped visaType:', {
          originalDuration: duration,
          entryType: entryType,
          mappedVisaType: visaType
        })

        const draftData: any = {
          visaProductId: productId,
          nationality: data.nationality || nationalityCountry.value,
          destinationCountry: destinationCountry.value,
          visaType: visaType,
          numberOfTravelers: parseInt(data.applicants) || 1,
          email: data.email,
          // ✅ Save Step 1 data in draftData
        draftData: {
          step1: {
            nationality: data.nationality || nationalityCountry.value,
            destination: destinationCountry.value,
            visaType: visaType, // Backend format (90-single, 180-single, etc.)
            visaTypeOriginal: data.visaType, // Original format for PaymentModal (ProductName|entryType)
            email: data.email,
            applicants: parseInt(data.applicants) || 1,
            productDetails: data.productDetails,
            phoneNumber: data.phoneNumber || ''
          },
          currentStep: 1
        },
          currentStep: 1
        }

        if (customerId) {
          draftData.customerId = customerId
        }

        console.log('📧 Auto-creating draft with Step 1 data:', draftData)

        const result = await createDraftApplication(draftData)
        if (result && result.id) {
          applicationId.value = result.id
          // Store with unique key per application
          localStorage.setItem(`currentApplicationId_${result.id}`, result.id.toString())
          localStorage.setItem('currentApplicationId', result.id.toString())
          console.log('✅ Auto-created draft with ID:', result.id)
          // Update storage key to include applicationId
          // Note: This will create a new storage key, old data will be preserved but not used
        }
      }
    } catch (err: any) {
      console.error('❌ Failed to auto-create draft:', err)
      // Don't block user - just log error
    }
  }
  
  // Don't change step, just update the data
}

const handleStepOne = async (data: any) => {
  console.log('✅ Step 1 data received:', data)
  console.log('📋 Step 1 data check:', {
    hasProductDetails: !!data.productDetails,
    hasEmail: !!data.email,
    productDetails: data.productDetails,
    email: data.email,
    nationality: data.nationality,
    visaType: data.visaType
  })
  
  tripData.value = {
    ...data,
    applicants: parseInt(data.applicants),
    email: data.email || '',
    productDetails: data.productDetails,
    // ✅ Ensure visaType is preserved in PaymentModal format (ProductName|entryType)
    visaType: data.visaType || (data.productDetails ? `${data.productDetails.productName || data.productDetails.name || 'Visa'}|${data.productDetails.entryType || 'single'}` : '')
  }
  
  console.log('✅ Step 1 - tripData.value.visaType set to:', tripData.value.visaType)

  // ✅ Create draft application with email capture
  // Check if we have minimum required data (email is critical, product can be added later)
  if (data.email) {
    isCreatingDraft.value = true
    try {
      // Handle case where productDetails might not be available yet
      const product = data.productDetails
      let productId = product?.id || product?.visaProductId
      
      if (!productId) {
        console.warn('⚠️ No product ID available yet, but creating draft with email')
        // Still create draft, product can be added later
        // Use a placeholder or skip product-related fields
      }

      // Get customer ID if user is authenticated
      let customerId: number | undefined
      if (isAuthenticated.value && currentUser.value?.id) {
        customerId = currentUser.value.id
        console.log('✅ Using authenticated customer ID:', customerId)
      } else {
        console.log('⚠️ User not authenticated - customer will be created from email')
      }

      // ✅ Use the SAME visaType mapping logic as PaymentModal to ensure consistency
      // Parse visa type from the format "productName|entryType"
      const visaTypeParts = data.visaType?.split('|') || []
      const entryType = (product.entryType || visaTypeParts[1] || 'single').toLowerCase().trim()
      
      // ✅ Get duration from productDetails (same as PaymentModal)
      const duration = Number(product.duration) || Number(product.validity) || 180
      
      // ✅ Map visa type to backend-accepted format
      // Backend only accepts: 180-single, 180-multiple, or 90-single
      // Map based on duration and entry type
      let visaType: string
      if (duration <= 90) {
        visaType = '90-single' // For durations <= 90, use 90-single
      } else {
        // For durations > 90, use 180-single or 180-multiple based on entry type
        visaType = entryType === 'multiple' ? '180-multiple' : '180-single'
      }
      
      console.log('🎫 Mapped visaType for DRAFT:', { 
        original: data.visaType, 
        originalDuration: duration,
        entryType: entryType,
        mapped: visaType,
        productDuration: product?.duration,
        productValidity: product?.validity,
        productEntryType: product?.entryType
      })
      console.log('✅ Draft will be created with visaType:', visaType, '(backend-accepted format)')

      const draftData: any = {
        email: data.email,
        nationality: data.nationality || nationalityCountry.value,
        destinationCountry: destinationCountry.value,
        numberOfTravelers: parseInt(data.applicants) || 1,
        // ✅ Save Step 1 data in draftData
        draftData: {
          step1: {
            nationality: data.nationality || nationalityCountry.value,
            destination: destinationCountry.value,
            email: data.email,
            applicants: parseInt(data.applicants) || 1,
            phoneNumber: data.phoneNumber || '',
            ...(data.productDetails && { productDetails: data.productDetails }),
            ...(data.visaType && { visaType: visaType })
          },
          currentStep: 1
        },
        currentStep: 1
      }
      
      // Only add product-related fields if product is available
      if (productId) {
        draftData.visaProductId = productId
        draftData.visaType = visaType
        if (draftData.draftData.step1) {
          draftData.draftData.step1.visaType = visaType
        }
      } else {
        // If no product selected, we still need visaProductId for backend
        // Use a default or skip creating draft until product is selected
        console.warn('⚠️ No product selected - draft will be created without visaProductId')
        // Backend might require visaProductId, so we'll try without it first
        // If it fails, we'll catch the error
      }
      
      // Only include customerId if user is authenticated
      if (customerId) {
        draftData.customerId = customerId
      }

      console.log('📧 Creating draft application with Step 1 data:', draftData)
      console.log('📦 Draft payload:', JSON.stringify(draftData, null, 2))
      console.log('🔄 Calling createDraftApplication...')

      const result = await createDraftApplication(draftData)
      
      console.log('📥 createDraftApplication response:', result)
      
      if (result && result.id) {
        applicationId.value = result.id
        console.log('✅ Draft application created with ID:', result.id)
        console.log('📧 Email captured:', data.email)
        
        // Store application ID in localStorage for persistence with unique key
        localStorage.setItem(`currentApplicationId_${result.id}`, result.id.toString())
        localStorage.setItem('currentApplicationId', result.id.toString())
      } else {
        console.error('❌ Draft creation succeeded but no ID returned')
        console.error('❌ Result object:', result)
        console.error('❌ Result type:', typeof result)
        console.error('❌ Result keys:', result ? Object.keys(result) : 'result is null/undefined')
      }
    } catch (err: any) {
      console.error('❌ Failed to create draft application:', err)
      console.error('❌ Error type:', typeof err)
      console.error('❌ Error details:', {
        message: err?.message,
        stack: err?.stack,
        response: err?.response,
        data: err?.data,
        status: err?.status,
        statusText: err?.statusText
      })
      
      // Log the full error object
      console.error('❌ Full error object:', err)
      
      // Don't block user from proceeding - email capture is the main goal
      // If draft creation fails, the email will still be captured in final submission
      console.warn('⚠️ Draft creation failed, but continuing - email will be captured on final submission')
    } finally {
      isCreatingDraft.value = false
      console.log('🏁 handleStepOne finished, isCreatingDraft set to false')
    }
  } else {
    console.warn('⚠️ Skipping draft creation - missing email')
    console.warn('📋 Available data:', {
      hasEmail: !!data.email,
      hasProductDetails: !!data.productDetails,
      email: data.email,
      productDetails: data.productDetails
    })
  }

  currentStep.value = 2
}

const handleStepTwo = async (data: any) => {
  console.log('✅ Step 2 data saved:', data)
  travelersData.value = { ...data }
  
  // ✅ Update draft with Step 2 data (travelers info)
  if (applicationId.value) {
    try {
      await updateDraftApplication(applicationId.value, {
        numberOfTravelers: data.travelers?.length || tripData.value.applicants || 1,
        // ✅ Save Step 2 data in draftData
        draftData: {
          step2: {
            travelers: data.travelers || []
          },
          currentStep: 2
        },
        currentStep: 2
      })
      console.log('✅ Draft updated with Step 2 data (travelers)')
    } catch (err) {
      console.error('❌ Failed to update draft with Step 2 data:', err)
      // Don't block user from proceeding
    }
  }
  
  currentStep.value = 3
}

const handleStepThree = async (data: any) => {
  console.log('✅ Step 3 data saved:', data)
  passportData.value = { ...data }
  
  // ✅ Update draft with Step 3 data (passport details)
  if (applicationId.value) {
    try {
      await updateDraftApplication(applicationId.value, {
        // ✅ Save Step 3 data in draftData
        draftData: {
          step3: {
            passportDetails: data.passportDetails || []
          },
          currentStep: 3
        },
        currentStep: 3
      })
      console.log('✅ Draft updated with Step 3 data (passport details)')
    } catch (err) {
      console.error('❌ Failed to update draft with Step 3 data:', err)
      // Don't block user from proceeding
    }
  }
  
  currentStep.value = 4
}

const handleStepFour = async (data: any) => {
  console.log('✅ Step 4 (Embassy) data received:', data)
  embassyData.value = { embassyId: data.embassyId }
  
  // Store embassy info if available (for display in review)
  selectedEmbassy.value = data.embassy || null
  
  // ✅ Update draft with Step 4 data (embassy selection)
  if (applicationId.value) {
    try {
      await updateDraftApplication(applicationId.value, {
        embassyId: data.embassyId || null,
        // ✅ Save Step 4 data in draftData
        draftData: {
          step4: {
            embassyId: data.embassyId || null,
            embassy: data.embassy || null
          },
          currentStep: 4
        },
        currentStep: 4
      })
      console.log('✅ Draft updated with Step 4 data (embassy selection)')
    } catch (err) {
      console.error('❌ Failed to update draft with Step 4 data:', err)
      // Don't block user from proceeding
    }
  }
  
  currentStep.value = 5
}

const handleStepFive = async (data: any) => {
  console.log('✅ Step 5 (Processing Time) data received:', data)
  processingData.value = { 
    processingFeeId: data.processingFeeId,
    processingType: data.processingType,
    processingTime: data.processingTime,
    processingFee: data.processingFee
  }
  
  // ✅ Update draft with Step 5 data (processing options)
  if (applicationId.value) {
    try {
      await updateDraftApplication(applicationId.value, {
        processingType: data.processingType,
        processingFee: Number(data.processingFee) || 0,
        processingFeeId: data.processingFeeId || null,
        processingTime: data.processingTime || '',
        // ✅ Save Step 5 data in draftData
        draftData: {
          step5: {
            processingType: data.processingType,
            processingFee: Number(data.processingFee) || 0,
            processingFeeId: data.processingFeeId || null,
            processingTime: data.processingTime || ''
          },
          currentStep: 5
        },
        currentStep: 5
      })
      console.log('✅ Draft updated with Step 5 data (processing options)')
    } catch (err) {
      console.error('❌ Failed to update draft with Step 5 data:', err)
      // Don't block user from proceeding
    }
  }
  
  currentStep.value = 6
}

const handleStepSix = async (result: any) => {
  console.log('✅ Payment completed, application submitted:', result)
  console.log('🔑 Final applicationId that was submitted:', applicationId.value)
  
  // Clear saved data after successful submission
  clearState()
  
  // ✅ Clear application ID from localStorage AFTER successful submission
  // This ensures the draft is finalized and won't be reused
  if (applicationId.value) {
    const appId = applicationId.value.toString()
    console.log('🗑️ Clearing draft applicationId:', appId)
    // Clear both the unique key and the global key
    localStorage.removeItem(`currentApplicationId_${appId}`)
    localStorage.removeItem('currentApplicationId')
    
    // Also clear the application-specific storage
    const from = route.query.from || route.query.nationality || 'Pakistan'
    const to = route.query.to || route.query.destination || 'Morocco'
    localStorage.removeItem(`visa_application_${from}_${to}_${appId}`)
    
    applicationId.value = null
  }
}
</script>