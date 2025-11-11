import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Country interface for backend (database countries with flags)
 */
export interface Country {
  id?: number | string
  countryName: string
  logoUrl?: string | null
  logoPublicId?: string | null
  code?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

/**
 * API Response structure for backend countries
 */
export interface CountriesListResponse {
  status: boolean
  message: string
  count: number
  data: Country[]
}

/**
 * Backend API response wrapper
 */
interface BackendApiResponse<T> {
  status: boolean
  message: string
  data: T
}

/**
 * Countries API Service
 * Provides access to countries from the database (all have flags stored as logoUrl)
 */
export const useCountriesApi = () => {
  const api = useApi()
  const config = useRuntimeConfig()



  
  /**
   * Get all countries from database
   * These countries have flags stored in the logoUrl field
   * Use this for both "Where am I from?" and "Where am I going?" fields
   */
  const getVisaCountries = async (): Promise<ApiResponse<Country[]>> => {
    try {
      const response = await api.get<CountriesListResponse>('/countries')
      
      // Handle the API response structure with status, message, count, and data
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      
      return {
        data: [],
        message: response.data.message || 'No countries found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Alias for getVisaCountries - for backward compatibility
   */
  const getCountries = getVisaCountries



  
  /**
   * Get a single country by ID
   * GET http://localhost:5000/countries/:id
   */
  const getCountryById = async (id: number | string): Promise<ApiResponse<Country>> => {
    try {
      const response = await api.get<BackendApiResponse<Country>>(`/countries/${id}`)
      
      // response.data contains { status, message, data }
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      
      throw new Error(response.data.message || 'Country not found')
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  return {
    getVisaCountries,
    getCountries,
    getCountryById,
  }
}

