import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Processing Fee interface
 */
export interface ProcessingFee {
  id?: number
  feeType: string
  timeValue: number
  timeUnit: 'hours' | 'days'
  amount: number
}

/**
 * Visa Product interface
 */
export interface VisaProduct {
  id?: number | string
  country: string
  productName: string
  duration: number
  validity: number
  entryType: string
  govtFee: number
  serviceFee: number
  totalAmount: number
  processingFees?: ProcessingFee[]
  createdAt?: string
  updatedAt?: string
}

/**
 * Create Visa Product DTO
 */
export interface CreateVisaProductDto {
  country: string
  productName: string
  duration: number
  validity: number
  entryType: string
  govtFee: number
  serviceFee: number
  totalAmount: number
  processingFees?: ProcessingFee[]
}

/**
 * Update Visa Product DTO
 */
export interface UpdateVisaProductDto {
  country?: string
  productName?: string
  duration?: number
  validity?: number
  entryType?: string
  govtFee?: number
  serviceFee?: number
  totalAmount?: number
  processingFees?: ProcessingFee[]
}

/**
 * API Response structure for getVisaProducts
 */
export interface VisaProductsListResponse {
  status: boolean
  message: string
  count: number
  data: VisaProduct[]
}

/**
 * Grouped Visa Product by Country
 */
export interface GroupedVisaProductByCountry {
  country: string
  productCount: string | number
}

/**
 * API Response structure for getGroupedVisaProductsByCountries
 */
export interface GroupedVisaProductsResponse {
  status: boolean
  message: string
  count: number
  data: GroupedVisaProductByCountry[]
}

/**
 * Visa Products API Service
 * Provides all CRUD operations for visa products
 */
export const useVisaProductsApi = () => {
  const api = useApi()

  /**
   * Create a new visa product
   * POST http://localhost:5000/visa-product
   */
  const createVisaProduct = async (data: CreateVisaProductDto): Promise<ApiResponse<VisaProduct>> => {
    try {
      const response = await api.post<VisaProduct | { status: boolean; message: string; data: VisaProduct }>('/visa-product', data)
      
      // Handle different response structures
      let productData: VisaProduct
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaProduct }
        if (wrappedResponse.status && wrappedResponse.data) {
          productData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to create visa product')
        }
      } else {
        // Direct product object
        productData = response.data as VisaProduct
      }
      
      return {
        data: productData,
        message: 'Visa product created successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get all visa products
   * GET http://localhost:5000/visa-product
   */
  const getVisaProducts = async (): Promise<ApiResponse<VisaProduct[]>> => {
    try {
      const response = await api.get<VisaProductsListResponse | VisaProduct[]>('/visa-product')
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        // Direct array response
        return {
          data: response.data,
          success: true,
        }
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, count, data }
        const wrappedResponse = response.data as VisaProductsListResponse
        if (wrappedResponse.status && wrappedResponse.data) {
          return {
            data: wrappedResponse.data,
            message: wrappedResponse.message,
            success: true,
          }
        }
        return {
          data: [],
          message: wrappedResponse.message || 'No visa products found',
          success: false,
        }
      }
      
      return {
        data: [],
        message: 'No visa products found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get a single visa product by ID
   * GET http://localhost:5000/visa-product/:id
   */
  const getVisaProductById = async (id: number | string): Promise<ApiResponse<VisaProduct>> => {
    try {
      const response = await api.get<VisaProduct | { status: boolean; message: string; data: VisaProduct }>(`/visa-product/${id}`)
      
      // Handle different response structures
      let productData: VisaProduct
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaProduct }
        if (wrappedResponse.status && wrappedResponse.data) {
          productData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Visa product not found')
        }
      } else {
        // Direct product object
        productData = response.data as VisaProduct
      }
      
      return {
        data: productData,
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Update a visa product by ID using PATCH
   * PATCH http://localhost:5000/visa-product/:id
   */
  const updateVisaProduct = async (
    id: number | string,
    data: UpdateVisaProductDto
  ): Promise<ApiResponse<VisaProduct>> => {
    try {
      const response = await api.patch<VisaProduct | { status: boolean; message: string; data: VisaProduct }>(`/visa-product/${id}`, data)
      
      // Handle different response structures
      let productData: VisaProduct
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaProduct }
        if (wrappedResponse.status && wrappedResponse.data) {
          productData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to update visa product')
        }
      } else {
        // Direct product object
        productData = response.data as VisaProduct
      }
      
      return {
        data: productData,
        message: 'Visa product updated successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Delete a visa product by ID
   */
  const deleteVisaProduct = async (id: number | string): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/visa-product/${id}`)
      
      return {
        data: undefined,
        message: 'Visa product deleted successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get unique countries from visa products
   * Returns array of unique country names from all visa products
   */
  const getUniqueCountriesFromVisaProducts = async (): Promise<string[]> => {
    try {
      const response = await getVisaProducts()
      
      if (response.success && response.data) {
        // Extract unique countries from visa products
        const uniqueCountries = [...new Set(response.data.map(product => product.country))]
        return uniqueCountries.sort()
      }
      
      return []
    } catch (error) {
      console.error('Failed to get unique countries from visa products:', error)
      return []
    }
  }

  /**
   * Get visa products grouped by countries
   * GET http://localhost:5000/visa-product/grouped/countries
   */
  const getGroupedVisaProductsByCountries = async (): Promise<ApiResponse<GroupedVisaProductByCountry[]>> => {
    try {
      const response = await api.get<GroupedVisaProductsResponse>('/visa-product/grouped/countries')
      
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
        message: response.data.message || 'No visa products found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get visa products by country name
   * GET http://localhost:5000/visa-product/by-country?country=name
   */
  const getVisaProductsByCountry = async (country: string): Promise<ApiResponse<VisaProduct[]>> => {
    try {
      const response = await api.get<VisaProductsListResponse>(`/visa-product/by-country?country=${encodeURIComponent(country)}`)
      
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
        message: response.data.message || 'No visa products found for this country',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  return {
    createVisaProduct,
    getVisaProducts,
    getVisaProductById,
    updateVisaProduct,
    deleteVisaProduct,
    getUniqueCountriesFromVisaProducts,
    getGroupedVisaProductsByCountries,
    getVisaProductsByCountry,
  }
}