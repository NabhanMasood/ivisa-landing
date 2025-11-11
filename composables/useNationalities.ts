import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Nationality interface
 */
export interface Nationality {
  id?: number | string
  nationality: string // Passport Country
  destinationCountry: string
  visaProducts?: Array<{
    productId: number | string
    productName: string
    customPricing?: boolean
    govtFee?: number | string
    serviceFee?: number | string
    totalAmount?: number | string
  }>
  createdAt?: string
  updatedAt?: string
}

/**
 * Create Nationality DTO (one product per call)
 */
export interface CreateNationalityDto {
  nationality: string // Passport Country
  destination: string // Note: "destination" not "destinationCountry"
  productName: string
  govtFee: number
  serviceFee: number
  totalAmount: number
}

/**
 * Update Nationality DTO
 */
export interface UpdateNationalityDto {
  nationality?: string
  destination?: string // Note: "destination" not "destinationCountry"
  productName?: string
  govtFee?: number
  serviceFee?: number
  totalAmount?: number
}

/**
 * API Response structure for getNationalities
 */
export interface NationalitiesListResponse {
  status: boolean
  message: string
  count: number
  data: Nationality[]
}

/**
 * Nationalities API Service
 * Provides all CRUD operations for nationalities
 */
export const useNationalitiesApi = () => {
  const api = useApi()

  /**
   * Create a new nationality
   * POST http://localhost:5000/nationalities
   */
  const createNationality = async (data: CreateNationalityDto): Promise<ApiResponse<Nationality>> => {
    try {
      const response = await api.post<Nationality | { status: boolean; message: string; data: Nationality }>('/nationalities', data)
      
      // Handle different response structures
      let nationalityData: Nationality
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: Nationality }
        if (wrappedResponse.status && wrappedResponse.data) {
          nationalityData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to create nationality')
        }
      } else {
        // Direct nationality object
        nationalityData = response.data as Nationality
      }
      
      return {
        data: nationalityData,
        message: 'Nationality created successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get all nationalities
   * GET http://localhost:5000/nationalities
   */
  const getNationalities = async (): Promise<ApiResponse<Nationality[]>> => {
    try {
      const response = await api.get<NationalitiesListResponse | Nationality[]>('/nationalities')
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        // Direct array response
        return {
          data: response.data,
          success: true,
        }
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, count, data }
        const wrappedResponse = response.data as NationalitiesListResponse
        if (wrappedResponse.status && wrappedResponse.data) {
          return {
            data: wrappedResponse.data,
            message: wrappedResponse.message,
            success: true,
          }
        }
        return {
          data: [],
          message: wrappedResponse.message || 'No nationalities found',
          success: false,
        }
      }
      
      return {
        data: [],
        message: 'No nationalities found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get a single nationality by ID
   * GET http://localhost:5000/nationalities/:id
   */
  const getNationalityById = async (id: number | string): Promise<ApiResponse<Nationality>> => {
    try {
      const response = await api.get<Nationality | { status: boolean; message: string; data: Nationality }>(`/nationalities/${id}`)
      
      // Handle different response structures
      let nationalityData: Nationality
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: Nationality }
        if (wrappedResponse.status && wrappedResponse.data) {
          nationalityData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Nationality not found')
        }
      } else {
        // Direct nationality object
        nationalityData = response.data as Nationality
      }
      
      return {
        data: nationalityData,
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Update a nationality by ID using PATCH
   * PATCH http://localhost:5000/nationalities/:id
   */
  const updateNationality = async (
    id: number | string,
    data: UpdateNationalityDto
  ): Promise<ApiResponse<Nationality>> => {
    try {
      const response = await api.patch<Nationality | { status: boolean; message: string; data: Nationality }>(`/nationalities/${id}`, data)
      
      // Handle different response structures
      let nationalityData: Nationality
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: Nationality }
        if (wrappedResponse.status && wrappedResponse.data) {
          nationalityData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to update nationality')
        }
      } else {
        // Direct nationality object
        nationalityData = response.data as Nationality
      }
      
      return {
        data: nationalityData,
        message: 'Nationality updated successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Delete a nationality by ID
   */
  const deleteNationality = async (id: number | string): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/nationalities/${id}`)
      
      return {
        data: undefined,
        message: 'Nationality deleted successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get nationalities list (grouped by nationality)
   * GET http://localhost:5000/nationalities/list
   * GET http://localhost:5000/nationalities/list?q=pak
   */
  const getNationalitiesList = async (searchQuery?: string): Promise<ApiResponse<Array<{ nationality: string; destinations: number }>>> => {
    try {
      const url = searchQuery ? `/nationalities/list?q=${encodeURIComponent(searchQuery)}` : '/nationalities/list'
      const response = await api.get<{ status: boolean; message: string; data: Array<{ nationality: string; destinations: number }> }>(url)
      
      // Handle the response structure
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      
      return {
        data: [],
        message: response.data.message || 'No nationalities found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get destinations for a nationality
   * GET http://localhost:5000/nationalities/destinations?nationality=Pakistan
   */
  const getNationalityDestinations = async (nationality: string): Promise<ApiResponse<Array<{ destination: string; products: number }>>> => {
    try {
      const url = `/nationalities/destinations?nationality=${encodeURIComponent(nationality)}`
      const response = await api.get<{ status: boolean; message: string; data: Array<{ destination: string; products: number }> }>(url)
      
      // Handle the response structure
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      
      return {
        data: [],
        message: response.data.message || 'No destinations found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get products for a nationality-destination
   * GET http://localhost:5000/nationalities/Pakistan/germany/products
   */
  const getNationalityDestinationProducts = async (nationality: string, destination: string): Promise<ApiResponse<Array<{
    id?: number | string;
    productName: string;
    duration: number;
    validity: number;
    totalAmount: number | string;
    govtFee?: number | string;
    serviceFee?: number | string;
  }>>> => {
    try {
      const url = `/nationalities/${encodeURIComponent(nationality)}/${encodeURIComponent(destination)}/products`
      const response = await api.get<{ status: boolean; message: string; data: Array<any> }>(url)
      
      // Handle the response structure
      if (response.data.status && response.data.data) {
        return {
          data: response.data.data,
          message: response.data.message,
          success: true,
        }
      }
      
      return {
        data: [],
        message: response.data.message || 'No products found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  return {
    createNationality,
    getNationalities,
    getNationalityById,
    updateNationality,
    deleteNationality,
    getNationalitiesList,
    getNationalityDestinations,
    getNationalityDestinationProducts,
  }
}

