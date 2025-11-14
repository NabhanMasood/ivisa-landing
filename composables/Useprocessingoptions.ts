// composables/useProcessingOptions.ts
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

export interface ProcessingOption {
  id: number
  type: 'standard' | 'rush' | 'super-rush'
  name: string
  processingTime: string
  fee: number
  description?: string
  displayOrder: number
  estimatedDays?: number
  estimatedHours?: number
}

export const useProcessingOptions = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Get active processing options (for frontend display)
   */
  const getActiveOptions = async () => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')
      
      const response = await fetch(`${baseUrl}/processing-options/active`)
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch processing options')
      }

      return result.data as ProcessingOption[]
    } catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get processing option by type
   */
  const getOptionByType = async (type: 'standard' | 'rush' | 'super-rush') => {
    loading.value = true
    error.value = null

    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBase.replace(/\/+$/, '')
      
      const response = await fetch(`${baseUrl}/processing-options/type/${type}`)
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch processing option')
      }

      return result.data as ProcessingOption
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
    getActiveOptions,
    getOptionByType,
  }
}