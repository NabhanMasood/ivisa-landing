// composables/useInquiry.ts
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

export interface InquiryData {
  name: string
  email: string
  phone?: string
  subject: string
  nationality: string
  travellingFrom: string
  destinationCountry: string
  message: string
}

export interface InquiryResponse {
  id: number
  applicationNumber: string
  email: string
  name: string
}

export const useInquiry = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  /**
   * Submit a visa inquiry
   */
  const submitInquiry = async (data: InquiryData): Promise<InquiryResponse> => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const config = useRuntimeConfig()
      const baseUrl = (config.public.apiBase as string).replace(/\/+$/, '')

      const response = await fetch(`${baseUrl}/visa-applications/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to submit inquiry')
      }

      success.value = true
      return result.data
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Reset the inquiry state
   */
  const resetInquiry = () => {
    loading.value = false
    error.value = null
    success.value = false
  }

  return {
    loading,
    error,
    success,
    submitInquiry,
    resetInquiry,
  }
}
