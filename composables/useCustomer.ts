// composables/useCustomer.ts
import { ref } from 'vue'

const API_BASE_URL = 'http://localhost:5001'

export interface CreateCustomerData {
  fullname: string
  email: string
  phone: string
  residenceCountry: string
}

export const useCustomer = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Create a new customer
   */
  const createCustomer = async (data: CreateCustomerData) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to create customer')
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
   * Get all customers
   */
  const getAllCustomers = async (search?: string) => {
    loading.value = true
    error.value = null

    try {
      const url = new URL(`${API_BASE_URL}/customers`)
      if (search) {
        url.searchParams.append('search', search)
      }

      const response = await fetch(url.toString())
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch customers')
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
   * Get single customer by ID
   */
  const getCustomer = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`)
      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to fetch customer')
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
    createCustomer,
    getAllCustomers,
    getCustomer,
  }
}