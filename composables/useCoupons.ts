import { useApi, handleApiError, type ApiResponse } from './useApi'



export type CouponType = 'percent' | 'amount'



export interface Coupon {

  id: number | string

  code: string

  type: CouponType

  validity: string

  value?: number

  status?: 'enable' | 'disable'

  createdAt?: string

  updatedAt?: string

}



export interface CreateCouponDto {

  code: string

  type: CouponType

  validity: string

  value?: number

  status?: 'enable' | 'disable'

}



export interface UpdateCouponDto {

  code?: string

  type?: CouponType

  validity?: string

  value?: number

  status?: 'enable' | 'disable'

}



export interface CouponsListResponse {

  status: boolean

  message: string

  count?: number

  data: Array<Coupon>

}



export interface CouponDetailResponse {

  status: boolean

  message: string

  data: Coupon

}



export interface ValidateCouponDto {

  code: string

  amount: number

}



export interface ValidateCouponResponse {

  status: boolean

  message: string

  data: {

    coupon: Coupon

    discountAmount: number

    discountPercentage: number

    originalAmount: number

    finalAmount: number

  }

}



export const useCouponsApi = () => {

  const api = useApi()



  const createCoupon = async (data: CreateCouponDto): Promise<ApiResponse<Coupon>> => {

    try {

      console.debug('[useCouponsApi] createCoupon: request payload', data)

      const response = await api.post<Coupon | { status: boolean; message: string; data: Coupon }>('/coupons', data)

      console.debug('[useCouponsApi] createCoupon: response', response.data)

      // Handle different response structures
      let couponData: Coupon
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: Coupon }
        if (wrappedResponse.status && wrappedResponse.data) {
          couponData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to create coupon')
        }
      } else {
        // Direct coupon object
        couponData = response.data as Coupon
      }

      return {

        data: couponData,

        message: 'Coupon created successfully',

        success: true,

      }

    } catch (error) {

      console.error('[useCouponsApi] createCoupon: error', error)

      throw new Error(handleApiError(error))

    }

  }



  const getAllCoupons = async (): Promise<ApiResponse<CouponsListResponse['data']>> => {

    try {

      console.debug('[useCouponsApi] getAllCoupons: request')

      const response = await api.get<CouponsListResponse | Coupon[]>('/coupons')

      console.debug('[useCouponsApi] getAllCoupons: response', response.data)

      // Handle different response structures
      if (Array.isArray(response.data)) {
        // Direct array response
        return {
          data: response.data,
          message: 'Success',
          success: true,
        }
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, count, data }
        const wrappedResponse = response.data as CouponsListResponse
        if (wrappedResponse.status && wrappedResponse.data) {
          return {
            data: wrappedResponse.data,
            message: wrappedResponse.message,
            success: true,
          }
        }
        return {
          data: [],
          message: wrappedResponse.message || 'No coupons found',
          success: false,
        }
      }

      return {

        data: [],

        message: 'No coupons found',

        success: false,

      }

    } catch (error) {

      console.error('[useCouponsApi] getAllCoupons: error', error)

      throw new Error(handleApiError(error))

    }

  }



  const getCouponById = async (id: number | string): Promise<ApiResponse<CouponDetailResponse['data']>> => {

    try {

      console.debug('[useCouponsApi] getCouponById: request', { id })

      const response = await api.get<CouponDetailResponse | Coupon>(`/coupons/${id}`)

      console.debug('[useCouponsApi] getCouponById: response', response.data)

      // Handle different response structures
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as CouponDetailResponse
        if (wrappedResponse.status && wrappedResponse.data) {
          return {
            data: wrappedResponse.data,
            message: wrappedResponse.message,
            success: true,
          }
        }
        return {
          data: null as any,
          message: wrappedResponse.message || 'Coupon not found',
          success: false,
        }
      } else {
        // Direct coupon object
        return {
          data: response.data as Coupon,
          message: 'Success',
          success: true,
        }
      }

    } catch (error) {

      console.error('[useCouponsApi] getCouponById: error', error)

      throw new Error(handleApiError(error))

    }

  }



  const updateCoupon = async (id: number | string, data: UpdateCouponDto): Promise<ApiResponse<Coupon>> => {

    try {

      console.debug('[useCouponsApi] updateCoupon: request payload', { id, data })

      const response = await api.patch<Coupon | { status: boolean; message: string; data: Coupon }>(`/coupons/${id}`, data)

      console.debug('[useCouponsApi] updateCoupon: response', response.data)

      // Handle different response structures
      let couponData: Coupon
      
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as { status: boolean; message: string; data: Coupon }
        if (wrappedResponse.status && wrappedResponse.data) {
          couponData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to update coupon')
        }
      } else {
        // Direct coupon object
        couponData = response.data as Coupon
      }

      return {

        data: couponData,

        message: 'Coupon updated successfully',

        success: true,

      }

    } catch (error) {

      console.error('[useCouponsApi] updateCoupon: error', error)

      throw new Error(handleApiError(error))

    }

  }



  const deleteCoupon = async (id: number | string): Promise<ApiResponse<void>> => {

    try {

      console.debug('[useCouponsApi] deleteCoupon: request', { id })

      await api.delete(`/coupons/${id}`)

      console.debug('[useCouponsApi] deleteCoupon: success')

      return {

        data: undefined,

        message: 'Coupon deleted successfully',

        success: true,

      }

    } catch (error) {

      console.error('[useCouponsApi] deleteCoupon: error', error)

      throw new Error(handleApiError(error))

    }

  }



  const validateCoupon = async (data: ValidateCouponDto): Promise<ApiResponse<ValidateCouponResponse['data']>> => {

    try {

      console.debug('[useCouponsApi] validateCoupon: request payload', data)

      const response = await api.post<ValidateCouponResponse | Coupon>('/coupons/validate', data)

      console.debug('[useCouponsApi] validateCoupon: response', response.data)
      console.debug('[useCouponsApi] validateCoupon: full response structure', JSON.stringify(response.data, null, 2))

      let coupon: Coupon
      let responseData: any = null
      let backendCalculatedDiscount: number | null = null
      let backendCalculatedPercentage: number | null = null

      // Handle different response structures
      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        // Response has wrapper structure { status, message, data }
        const wrappedResponse = response.data as ValidateCouponResponse
        
        // ✅ Handle error responses (expired, not found, usage limit, etc.)
        if (!wrappedResponse.status) {
          const errorMessage = wrappedResponse.message || 'Invalid coupon code'
          console.error('[useCouponsApi] validateCoupon: backend validation failed', {
            message: errorMessage,
            response: wrappedResponse
          })
          return {
            data: null as any,
            message: errorMessage,
            success: false,
          }
        }
        
        if (wrappedResponse.status && wrappedResponse.data) {
          responseData = wrappedResponse.data
          
          // Try to extract coupon - it might be nested or at the top level
          if (responseData.coupon) {
            coupon = responseData.coupon
          } else if (responseData.id && responseData.code) {
            // The responseData itself is the coupon
            coupon = responseData as Coupon
          } else {
            coupon = responseData as Coupon
          }
          
          // Ensure value is properly extracted (it might be a string from decimal column)
          if (coupon.value !== undefined && coupon.value !== null) {
            coupon = { ...coupon, value: Number(coupon.value) }
          } else if ((responseData as any).value !== undefined && (responseData as any).value !== null) {
            // Value might be at responseData level
            coupon = { ...coupon, value: Number((responseData as any).value) }
          }
          
          // Check coupon status - ensure it's enabled
          if (coupon.status && coupon.status !== 'enable') {
            console.error('[useCouponsApi] validateCoupon: coupon is disabled', {
              coupon,
              status: coupon.status
            })
            return {
              data: null as any,
              message: 'The coupon code does not exist',
              success: false,
            }
          }
          
          console.debug('[useCouponsApi] validateCoupon: extracted coupon', {
            coupon,
            couponKeys: Object.keys(coupon),
            couponValue: coupon.value,
            couponValueType: typeof coupon.value,
            couponStatus: coupon.status,
            responseDataKeys: Object.keys(responseData),
            responseDataValue: (responseData as any).value,
            fullResponseData: responseData
          })
          
          // Check if backend calculated discount - this is the primary source
          // The backend should calculate and return discountAmount and discountPercentage
          if (responseData.discountAmount !== undefined && responseData.discountAmount !== null && responseData.discountAmount > 0) {
            backendCalculatedDiscount = Number(responseData.discountAmount)
            backendCalculatedPercentage = Number(responseData.discountPercentage) || 0
            console.debug('[useCouponsApi] validateCoupon: found backend calculated discount', {
              discountAmount: backendCalculatedDiscount,
              discountPercentage: backendCalculatedPercentage
            })
          } else {
            // Backend didn't calculate discount - the coupon.value should be available now
            // since we extracted it above
            if (coupon.value === undefined || coupon.value === null) {
              console.warn('[useCouponsApi] validateCoupon: backend did not calculate discount and coupon.value is missing', {
                coupon,
                responseData
              })
            } else {
              console.debug('[useCouponsApi] validateCoupon: backend did not calculate discount, will calculate from coupon.value', {
                couponValue: coupon.value,
                couponType: coupon.type
              })
            }
          }
        } else {
          return {
            data: null as any,
            message: wrappedResponse.message || 'Invalid coupon code',
            success: false,
          }
        }
      } else {
        // Direct coupon object
        coupon = response.data as Coupon
        
        // Check coupon status - ensure it's enabled
        if (coupon.status && coupon.status !== 'enable') {
          console.error('[useCouponsApi] validateCoupon: coupon is disabled', {
            coupon,
            status: coupon.status
          })
          return {
            data: null as any,
            message: 'The coupon code does not exist',
            success: false,
          }
        }
        
        console.debug('[useCouponsApi] validateCoupon: direct coupon object', {
          coupon,
          couponKeys: Object.keys(coupon),
          couponValue: coupon.value,
          couponStatus: coupon.status
        })
      }

      const originalAmount = data.amount

      let discountAmount = 0
      let discountPercentage = 0

      console.debug('[useCouponsApi] validateCoupon: calculating discount', {
        couponType: coupon.type,
        couponValue: coupon.value,
        couponObject: coupon,
        originalAmount,
        backendCalculatedDiscount
      })

      // If backend already calculated discount, use those values (PREFERRED)
      if (backendCalculatedDiscount !== null && backendCalculatedDiscount > 0) {
        discountAmount = backendCalculatedDiscount
        discountPercentage = backendCalculatedPercentage || 0
        console.debug('[useCouponsApi] validateCoupon: using backend calculated discount', {
          discountAmount,
          discountPercentage
        })
      } else {
        // Backend didn't calculate discount - we need to calculate it ourselves
        // But we need the discount value from somewhere
        const couponValue = coupon.value
        
        console.debug('[useCouponsApi] validateCoupon: backend did not calculate discount, attempting to calculate', {
          couponType: coupon.type,
          couponValue,
          couponHasValue: 'value' in coupon,
          couponProperties: Object.keys(coupon),
          responseDataKeys: responseData ? Object.keys(responseData) : []
        })
        
        if (coupon.type === 'amount') {
          if (couponValue !== undefined && couponValue !== null && !isNaN(Number(couponValue))) {
            // Fixed amount discount
            const discountValue = Number(couponValue)
            discountAmount = Math.min(discountValue, originalAmount) // Don't exceed the original amount
            discountPercentage = originalAmount > 0 ? (discountAmount / originalAmount) * 100 : 0
            console.debug('[useCouponsApi] validateCoupon: calculated amount discount', {
              couponValue,
              discountValue,
              discountAmount,
              discountPercentage,
              originalAmount
            })
          } else {
            console.error('[useCouponsApi] validateCoupon: amount coupon missing or invalid value - cannot calculate discount', {
              coupon,
              couponValue,
              couponKeys: Object.keys(coupon),
              responseData: responseData
            })
            throw new Error('Cannot calculate discount: Coupon value is missing or invalid. Please ensure the coupon has a valid value in the database.')
          }
        } else if (coupon.type === 'percent') {
          if (couponValue !== undefined && couponValue !== null && !isNaN(Number(couponValue))) {
            // Percentage discount
            discountPercentage = Number(couponValue)
            discountAmount = (originalAmount * discountPercentage) / 100
            console.debug('[useCouponsApi] validateCoupon: calculated percent discount', {
              couponValue,
              discountPercentage,
              discountAmount,
              originalAmount
            })
          } else {
            console.error('[useCouponsApi] validateCoupon: percent coupon missing or invalid value - cannot calculate discount', {
              coupon,
              couponValue,
              couponKeys: Object.keys(coupon),
              responseData: responseData
            })
            throw new Error('Cannot calculate discount: Coupon value is missing or invalid. Please ensure the coupon has a valid value in the database.')
          }
        } else {
          console.warn('[useCouponsApi] validateCoupon: invalid coupon type', {
            type: coupon.type,
            coupon
          })
          throw new Error(`Invalid coupon type: ${coupon.type}`)
        }
      }

      

      const finalAmount = Math.max(0, originalAmount - discountAmount)

      

      return {

        data: {

          coupon,

          discountAmount,

          discountPercentage,

          originalAmount,

          finalAmount,

        },

        message: 'Coupon validated successfully',

        success: true,

      }

    } catch (error: any) {

      console.error('[useCouponsApi] validateCoupon: error', error)

      // Extract error message from API response
      let errorMessage = 'Failed to validate coupon code'
      
      if (error.response) {
        // Handle structured error response
        const errorData = error.response._data || error.response.data
        if (errorData?.message) {
          errorMessage = errorData.message
        } else if (errorData?.error) {
          errorMessage = errorData.error
        }
      } else if (error.data) {
        // Handle error data directly
        if (error.data.message) {
          errorMessage = error.data.message
        } else if (error.data.error) {
          errorMessage = error.data.error
        }
      } else if (error.message) {
        errorMessage = error.message
      }

      // Return error response instead of throwing
      return {
        data: null as any,
        message: errorMessage,
        success: false,
      }

    }

  }



  return {

    createCoupon,

    getAllCoupons,

    getCouponById,

    updateCoupon,

    deleteCoupon,

    validateCoupon,

  }

}

