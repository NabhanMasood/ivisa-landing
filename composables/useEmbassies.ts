import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Embassy interface - matches backend Entity structure and API response
 * Note: API response may use 'location' field, but entity uses 'address'
 */
export interface Embassy {
  id: number
  embassyName: string
  destinationCountry: string
  originCountry: string
  address?: string  // From entity
  location?: string  // From API response (may be used instead of address)
  createdAt?: string | Date
  updatedAt?: string | Date
}

/**
 * Embassies list response
 */
interface EmbassiesListResponse {
  status: boolean
  message: string
  count?: number
  data: Embassy[]
}

/**
 * Single embassy response
 */
interface EmbassyResponse {
  status: boolean
  message: string
  data: Embassy
}

/**
 * Embassies API Service
 */
export const useEmbassiesApi = () => {
  const api = useApi()

  /**
   * Get all embassies
   * GET /embassies
   */
  const getEmbassies = async (): Promise<ApiResponse<Embassy[]>> => {
    try {
      const response = await api.get<EmbassiesListResponse>('/embassies')
      
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      
      return {
        data: [],
        message: response.data.message || 'No embassies found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get embassies filtered by destination country and origin country (nationality)
   * GET /embassies/destination/:destinationCountry/origin/:originCountry
   * 
   * This shows embassies where:
   * - destinationCountry: The country they're applying for a visa to (e.g., Morocco)
   * - originCountry: The country the applicant is from (e.g., Pakistan)
   * 
   * Matches the backend API endpoint format from the integration guide
   */
  const getEmbassiesByCountries = async (
    nationality?: string,
    destination?: string
  ): Promise<ApiResponse<Embassy[]>> => {
    try {
      if (!destination || !nationality) {
        return {
          data: [],
          message: 'Both destination and nationality are required',
          success: false,
        }
      }
      
      // Use the path-based endpoint format from the integration guide
      const url = `/embassies/destination/${encodeURIComponent(destination)}/origin/${encodeURIComponent(nationality)}`
      
      console.log('🔍 Fetching embassies with URL:', url)
      console.log('🔍 Parameters:', { destination, origin: nationality })
      
      const response = await api.get<EmbassiesListResponse>(url)
      
      console.log('🔍 Raw API response:', response)
      console.log('🔍 Response.data:', response.data)
      
      // Handle different response structures
      let embassyData: Embassy[] = []
      
      if (response.data) {
        // Check if response.data has status and data properties (wrapped response)
        if (typeof response.data === 'object' && 'status' in response.data && 'data' in response.data) {
          const wrappedResponse = response.data as EmbassiesListResponse
          if (wrappedResponse.status && wrappedResponse.data) {
            embassyData = Array.isArray(wrappedResponse.data) ? wrappedResponse.data : []
            console.log('✅ Extracted embassies from wrapped response:', embassyData.length)
          }
        } 
        // Check if response.data is directly an array
        else if (Array.isArray(response.data)) {
          embassyData = response.data
          console.log('✅ Response.data is directly an array:', embassyData.length)
        }
        // Check if response.data.data exists
        else if (response.data.data && Array.isArray(response.data.data)) {
          embassyData = response.data.data
          console.log('✅ Extracted embassies from response.data.data:', embassyData.length)
        }
      }
      
      if (embassyData.length > 0) {
        console.log('📦 First embassy sample:', embassyData[0])
        console.log('📦 Embassy keys:', Object.keys(embassyData[0]))
      }
      
      return {
        data: embassyData,
        message: (response.data as any)?.message || 'Embassies retrieved successfully',
        success: embassyData.length > 0 || (response.data as any)?.status === true,
      }
    } catch (error) {
      console.error('❌ Error in getEmbassiesByCountries:', error)
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get a single embassy by ID
   * GET /embassies/:id
   */
  const getEmbassyById = async (id: number | string): Promise<ApiResponse<Embassy>> => {
    try {
      const response = await api.get<EmbassyResponse>(`/embassies/${id}`)
      
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      
      throw new Error(response.data.message || 'Embassy not found')
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  return {
    getEmbassies,
    getEmbassiesByCountries,
    getEmbassyById,
  }
}

