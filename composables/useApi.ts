/**
 * API Response wrapper
 */
export interface ApiResponse<T = any> {
    data: T
    message: string
    success: boolean
    error?: string
  }
  
  /**
   * API Error Response
   */
  interface ApiErrorResponse {
    message?: string
    statusCode?: number
    error?: string
  }
  
  /**
   * Handle API errors
   */
  export const handleApiError = (error: any): string => {
    if (error.response) {
      const data = error.response._data as ApiErrorResponse
      return data.message || data.error || 'An error occurred'
    }
    if (error.data) {
      const data = error.data as ApiErrorResponse
      return data.message || data.error || 'An error occurred'
    }
    return error.message || 'Network error occurred'
  }
  
  /**
   * Main API composable
   */
  export const useApi = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase as string
  
    /**
     * Get auth token from cookie
     */
    const getAuthToken = (): string | null => {
      if (process.server) return null // Don't access cookies on server
      const tokenCookie = useCookie('auth_token')
      return tokenCookie.value || null
    }
  
    /**
     * Create fetch instance with defaults
     */
    const apiFetch = $fetch.create({
      baseURL,
      
      onRequest({ options }) {
        // Only add headers on client side
        if (process.client) {
          const token = getAuthToken()
          if (token) {
            options.headers = {
              ...options.headers as any,
              'Authorization': `Bearer ${token}`
            } as any
            console.log('🔑 Adding Authorization header to request')
          } else {
            console.warn('⚠️ No token found, request will be unauthenticated')
          }
        }
      },
  
      onResponseError({ response }) {
        if (process.client) {
          console.error('❌ API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            data: response._data,
            url: response.url
          })
          
          // Handle 401 Unauthorized - but don't auto-redirect
          // Let the calling component handle the error appropriately
          if (response.status === 401) {
            console.error('❌ 401 Unauthorized - Token may be invalid or expired')
            // Don't clear cookies or redirect here - let the component decide
            // This allows password change page to show proper error messages
          }
        }
      }
    })
  
    /**
     * GET request
     */
    const get = async <T = any>(url: string, options?: any): Promise<ApiResponse<T>> => {
      
      try {
        const data = await apiFetch<T>(url, {
          method: 'GET',
          ...options
        })

        
        return {
          data,
          message: 'Success',
          success: true
        }
      } catch (error) {
        console.error('❌ GET error:', error)
        throw error
      }
    }
  
    /**
     * POST request
     */
    const post = async <T = any>(url: string, body?: any, options?: any): Promise<ApiResponse<T>> => {
      
      try {
        const data = await apiFetch<T>(url, {
          method: 'POST',
          body,
          ...options
        })
        
        
        return {
          data,
          message: 'Success',
          success: true
        }
      } catch (error) {
        console.error('❌ POST error:', error)
        throw error
      }
    }
  
    /**
     * PUT request
     */
    const put = async <T = any>(url: string, body?: any, options?: any): Promise<ApiResponse<T>> => {
      try {
        const data = await apiFetch<T>(url, {
          method: 'PUT',
          body,
          ...options
        })
        
        return {
          data,
          message: 'Success',
          success: true
        }
      } catch (error) {
        throw error
      }
    }
  
    /**
     * PATCH request
     */
    const patch = async <T = any>(url: string, body?: any, options?: any): Promise<ApiResponse<T>> => {
      
      // Log token status
      if (process.client) {
        const token = getAuthToken()
        console.log('🔑 Token exists:', !!token)
        console.log('🔑 Token preview:', token ? `${token.substring(0, 20)}...` : 'No token')
      }
      
      try {
        const data = await apiFetch<T>(url, {
          method: 'PATCH',
          body,
          ...options
        })
        
        console.log('✅ PATCH response:', data)
        
        return {
          data,
          message: 'Success',
          success: true
        }
      } catch (error) {
        console.error('❌ PATCH error:', error)
        throw error
      }
    }
  
    /**
     * DELETE request
     */
    const del = async <T = any>(url: string, options?: any): Promise<ApiResponse<T>> => {
      try {
        const data = await apiFetch<T>(url, {
          method: 'DELETE',
          ...options
        })
        
        return {
          data,
          message: 'Success',
          success: true
        }
      } catch (error) {
        throw error
      }
    }
  
    return {
      get,
      post,
      put,
      patch,
      delete: del,
      apiFetch
    }
  }
