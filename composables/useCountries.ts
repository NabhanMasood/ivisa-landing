import { useApi, handleApiError, type ApiResponse } from './useApi'
import { getCachedData, setCachedData, CACHE_KEYS } from './useCache'

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
   * Always tries to use cached data first (populated by plugin on app startup)
   */
  const getVisaCountries = async (forceRefresh: boolean = false): Promise<ApiResponse<Country[]>> => {
    try {
      // Always try to get from cache first (unless forcing refresh)
      if (!forceRefresh) {
        const cached = getCachedData<Country[]>(CACHE_KEYS.COUNTRIES)
        if (cached) {
          return {
            data: cached,
            message: 'Countries loaded from cache',
            success: true,
          }
        }
      }

      // If no cache or forcing refresh, fetch from API
      const response = await api.get<CountriesListResponse>('/countries')

      // Handle the API response structure with status, message, count, and data
      if (response.data.status && response.data.data) {
        // Cache the data for 2 minutes (reduced from 10 to ensure fresh data)
        setCachedData(CACHE_KEYS.COUNTRIES, response.data.data, 2 * 60 * 1000)

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
      // If API fails, try to return cached data as fallback
      const cached = getCachedData<Country[]>(CACHE_KEYS.COUNTRIES)
      if (cached) {
        console.warn('⚠️ API failed, using cached countries data')
        return {
          data: cached,
          message: 'Countries loaded from cache (API unavailable)',
          success: true,
        }
      }
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

