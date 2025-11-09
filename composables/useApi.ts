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
          }
        }
      },
  
      onResponseError({ response }) {
        if (process.client) {
          console.error('API Error:', response.status, response._data)
          
          // Handle 401 Unauthorized
          if (response.status === 401) {
            const tokenCookie = useCookie('auth_token')
            const adminCookie = useCookie('admin_info')
            tokenCookie.value = null
            adminCookie.value = null
            navigateTo('/login')
          }
        }
      }
    })
  
    /**
     * GET request
     */
    const get = async <T = any>(url: string, options?: any): Promise<ApiResponse<T>> => {
      console.log('🔵 useApi.get called')
      console.log('📍 URL:', url)
      console.log('🌐 Full URL:', `${baseURL}${url}`)
      
      try {
        const data = await apiFetch<T>(url, {
          method: 'GET',
          ...options
        })
        
        console.log('✅ GET response:', data)
        
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
      console.log('🔵 useApi.post called')
      console.log('📍 URL:', url)
      console.log('📦 Body:', body)
      console.log('🌐 Full URL:', `${baseURL}${url}`)
      
      try {
        const data = await apiFetch<T>(url, {
          method: 'POST',
          body,
          ...options
        })
        
        console.log('✅ POST response:', data)
        
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
      try {
        const data = await apiFetch<T>(url, {
          method: 'PATCH',
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
