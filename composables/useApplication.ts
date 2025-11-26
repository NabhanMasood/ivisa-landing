// composables/useApplication.ts
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

export interface TravelerData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'Male' | 'Female' | 'Other'
  passportNationality: string
  passportNumber: string
  passportExpiryDate: string
  residenceCountry: string
  hasSchengenVisa: boolean
  receiveUpdates?: boolean
  placeOfBirth?: string
}

export interface PaymentData {
  cardholderName: string
  cardLast4?: string
  cardBrand?: string
  transactionId?: string
  paymentIntentId?: string
  paymentGateway?: string
}

export interface CompleteApplicationData {
  applicationId?: number
  customerId?: number
  visaProductId: number
  nationality: string
  destinationCountry: string
  visaType: '180-single' | '180-multiple' | '90-single'
  numberOfTravelers: number
  travelers: TravelerData[]
  processingType: 'standard' | 'rush' | 'super-rush'
  processingFee: number
  payment: PaymentData
  notes?: string
}

export interface DraftApplicationData {
  customerId?: number
  visaProductId: number
  nationality: string
  destinationCountry: string
  visaType: string
  numberOfTravelers: number
  phoneNumber?: string
  embassyId?: number
  email?: string
  // ✅ NEW: Support for step-by-step saving
  draftData?: {
    step1?: any
    step2?: any
    step3?: any
    step4?: any
    step5?: any
    currentStep?: number
  }
  currentStep?: number
}

export const useApplication = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createCustomerFromTraveler = async (traveler: TravelerData) => {
    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')

      const response = await fetch(`${baseUrl}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: `${traveler.firstName} ${traveler.lastName}`,
          email: traveler.email,
          phone: traveler.phone,
          residenceCountry: traveler.residenceCountry,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to create customer')
      }

      return result.data
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create customer')
    }
  }

  const submitCompleteApplication = async (data: CompleteApplicationData) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')

      let customerId = data.customerId

      if (!customerId && data.travelers.length > 0) {
        const firstTraveler = data.travelers[0]
        if (!firstTraveler) {
          throw new Error('At least one traveler is required')
        }
        const customer = await createCustomerFromTraveler(firstTraveler)
        customerId = customer.id
      }

      if (!customerId) {
        throw new Error('Unable to create or find customer')
      }

      const response = await fetch(`${baseUrl}/visa-applications/submit-complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          customerId,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to submit application')
      }

      return {
        ...result.data,
        customerId,
      }
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getAllApplications = async (search?: string) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')

      const url = new URL(`${baseUrl}/visa-applications`)
      if (search) {
        url.searchParams.append('search', search)
      }

      const response = await fetch(url.toString())
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch applications')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getApplication = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')

      const response = await fetch(`${baseUrl}/visa-applications/${id}`)
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch application')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getCustomerApplications = async (customerId: number, search?: string) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')

      const url = new URL(`${baseUrl}/visa-applications/customer/${customerId}`)
      if (search) {
        url.searchParams.append('search', search)
      }

      const response = await fetch(url.toString())
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch customer applications')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getApplicationSummary = async () => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')

      const response = await fetch(`${baseUrl}/visa-applications/summary`)
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch summary')
      }

      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get customer by email using search
   */
  const getCustomerByEmail = async (email: string) => {
    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')

      // Use search parameter to find customer by email
      const url = new URL(`${baseUrl}/customers`)
      url.searchParams.append('search', email)

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()

      if (response.ok && result.status && result.data) {
        // Find exact email match from search results
        const customers = Array.isArray(result.data) ? result.data : [result.data]
        const customer = customers.find((c: any) => c.email && c.email.toLowerCase() === email.toLowerCase())
        if (customer && customer.id) {
          return customer
        }
      }

      return null
    } catch (err: any) {
      console.warn('Failed to fetch customer by email:', err.message)
      return null
    }
  }

  /**
   * Create or get customer with just email (for draft applications)
   */
  const createOrGetCustomer = async (email: string, nationality?: string) => {
    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')

      // First, try to get existing customer by email
      const existingCustomer = await getCustomerByEmail(email)
      if (existingCustomer && existingCustomer.id) {
        console.log('✅ Found existing customer with ID:', existingCustomer.id)
        return existingCustomer
      }

      // If not found, create new customer
      console.log('📧 Creating new customer with email:', email)
      const response = await fetch(`${baseUrl}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: 'Guest User',
          email: email,
          phone: '',
          residenceCountry: nationality || '',
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.status) {
        // If email already exists error, try to fetch again
        if (result.message && result.message.toLowerCase().includes('email already exists')) {
          console.log('📧 Email exists, fetching customer...')
          const customer = await getCustomerByEmail(email)
          if (customer && customer.id) {
            return customer
          }
        }
        throw new Error(result.message || 'Failed to create customer')
      }

      return result.data
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create or get customer')
    }
  }

  /**
   * Create a draft visa application (Step 1)
   * Called when user completes first step and moves to next step
   * Creates minimal customer if needed, just to capture email
   */
  const createDraftApplication = async (data: DraftApplicationData) => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')

      // ✅ Handle customerId - create minimal customer if not provided but email is available
      let customerId = data.customerId

      if (!customerId && data.email) {
        try {
          console.log('📧 Getting or creating customer from email:', data.email)
          const customer = await createOrGetCustomer(data.email, data.nationality)
          customerId = customer.id
          console.log('✅ Got customer with ID:', customerId)
        } catch (err: any) {
          console.error('❌ Failed to get or create customer:', err.message)
          // If we can't get/create a customer, we can't create the draft
          throw new Error(`Unable to get or create customer: ${err.message}`)
        }
      }

      // If still no customerId, throw error as backend requires it
      if (!customerId) {
        throw new Error('Customer ID is required')
      }

      const payload: any = {
        customerId: customerId,
        nationality: data.nationality,
        destinationCountry: data.destinationCountry,
        numberOfTravelers: data.numberOfTravelers,
      }

      // Add visaProductId only if provided (might not be selected yet)
      if (data.visaProductId) {
        payload.visaProductId = data.visaProductId
      }

      // Add visaType only if provided
      if (data.visaType) {
        payload.visaType = data.visaType
      }

      // Add optional fields if provided
      if (data.phoneNumber) {
        payload.phoneNumber = data.phoneNumber
      }
      if (data.embassyId) {
        payload.embassyId = data.embassyId
      }

      // ✅ Add email field for email capture - this is the main requirement
      if (data.email) {
        payload.email = data.email
      }

      // ✅ Add draftData and currentStep if provided
      if (data.draftData) {
        payload.draftData = data.draftData
      }
      if (data.currentStep) {
        payload.currentStep = data.currentStep
      }

      console.log('📤 Sending draft creation request to:', `${baseUrl}/visa-applications/draft`)
      console.log('📦 Payload being sent:', JSON.stringify(payload, null, 2))

      const response = await fetch(`${baseUrl}/visa-applications/draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for auth
        body: JSON.stringify(payload),
      })

      console.log('📥 Draft creation response status:', response.status, response.statusText)

      const result = await response.json()

      console.log('📥 Draft creation response data:', result)

      if (!response.ok || !result.status) {
        console.error('❌ Draft creation failed:', {
          status: response.status,
          statusText: response.statusText,
          result: result,
          message: result.message
        })

        // Extract error message from response
        let errorMessage = 'Failed to create draft application'
        if (Array.isArray(result.message)) {
          errorMessage = result.message.join(', ')
        } else if (result.message) {
          errorMessage = result.message
        }

        throw new Error(errorMessage)
      }

      console.log('✅ Draft creation successful, returning:', result.data)
      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    submitCompleteApplication,
    getAllApplications,
    getApplication,
    getCustomerApplications,
    getApplicationSummary,
    createDraftApplication,
  }
}