import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Country interface for backend (visa service countries)
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
 * World Country interface from REST Countries API
 * Used for "Where am I from?" field
 */
export interface WorldCountry {
  name: {
    common: string
    official: string
  }
  cca2: string // 2-letter country code
  cca3: string // 3-letter country code
  flags: {
    png: string
    svg: string
  }
}

/**
 * Simplified World Country for UI
 */
export interface SimpleWorldCountry {
  id: string // Using cca2 as ID
  name: string
  code: string
  flag: string
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
 * Provides access to both world countries (REST Countries API) and visa service countries (backend)
 */
export const useCountriesApi = () => {
  const api = useApi()
  const config = useRuntimeConfig()

  /**
   * Get all world countries from REST Countries API
   * Use this for "Where am I from?" field
   */
  const getWorldCountries = async (): Promise<ApiResponse<SimpleWorldCountry[]>> => {
    try {
      const response = await $fetch<WorldCountry[]>(
        'https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flags'
      )
      
      // Transform and sort the data
      const countries: SimpleWorldCountry[] = response
        .map(country => ({
          id: country.cca2,
          name: country.name.common,
          code: country.cca2,
          flag: country.flags.svg || country.flags.png,
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
      
      return {
        data: countries,
        message: 'World countries retrieved successfully',
        success: true,
      }
    } catch (error) {
      console.error('Error fetching world countries:', error)
      return {
        data: [],
        message: error instanceof Error ? error.message : 'Failed to fetch world countries',
        success: false,
      }
    }
  }

  /**
   * Get visa service countries from backend
   * Use this for "Where am I going?" field (countries admin provides visa services for)
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
   * Legacy method - now points to visa countries
   * @deprecated Use getVisaCountries() instead
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
    getWorldCountries,
    getVisaCountries,
    getCountries, // Legacy support
    getCountryById,
  }
}