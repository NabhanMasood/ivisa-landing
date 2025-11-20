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

  return {
    loading,
    error,
    submitCompleteApplication,
    getAllApplications,
    getApplication,
    getCustomerApplications,
    getApplicationSummary,
  }
}