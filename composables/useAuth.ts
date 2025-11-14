

import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Admin/User interface
 */
export interface Admin {
  id: number
  fullName: string
  email: string
  password?: string
  createdAt?: string
  updatedAt?: string
}

/**
 * Register DTO
 */
export interface RegisterDto {
  fullName: string
  email: string
  password: string
}

/**
 * Login DTO
 */
export interface LoginDto {
  email: string
  password: string
}

/**
 * Login Response
 */
export interface LoginResponse {
  message: string
  token: string
  admin: Admin
}

/**
 * Register Response
 */
export interface RegisterResponse {
  message: string
  admin: Admin
}

/**
 * Auth API Service
 */
export const useAuthApi = () => {
  const api = useApi()
  
  // Reactive state for current user - only initialize on client
  const currentUser = useState<Admin | null>('currentUser', () => {
    if (process.server) return null
    
    const adminCookie = useCookie('admin_info')
    if (adminCookie.value) {
      try {
        return JSON.parse(adminCookie.value as string) as Admin
      } catch {
        return null
      }
    }
    return null
  })

  // Computed property for auth status
  const isAuthenticated = computed(() => {
    if (process.server) return false
    const tokenCookie = useCookie('auth_token')
    return !!tokenCookie.value
  })

  /**
   * Register a new user
   */
  const register = async (data: RegisterDto): Promise<ApiResponse<RegisterResponse>> => {
    console.log('🔵 useAuthApi.register called')
    console.log('📦 Data to send:', data)
    
    try {
      
      const response = await api.post('/auth/customer/register', data)

      console.log('✅ Response received:', response)
      
      return {
        data: response.data,
        message: response.data.message || 'Registration successful',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Register error:', error)
      const errorMessage = handleApiError(error)
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Login user
   */
  const login = async (data: LoginDto): Promise<ApiResponse<LoginResponse>> => {
    console.log('🔵 useAuthApi.login called')
    console.log('📦 Data to send:', data)
    
    try {
      const response = await api.post('/auth/customer/login', data) 

      
      if (!response.data.token) {
        throw new Error('No token received from server')
      }

      // Store token in cookie
      const tokenCookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      })
      tokenCookie.value = response.data.token
      
      // Store admin info
      const adminCookie = useCookie('admin_info', {
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      })
      adminCookie.value = JSON.stringify(response.data.admin)
      
      // Update reactive state
      currentUser.value = response.data.admin
      
      return {
        data: response.data,
        message: response.data.message || 'Login successful',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Login error:', error)
      const errorMessage = handleApiError(error)
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Logout user
   */
  const logout = async () => {
    const tokenCookie = useCookie('auth_token')
    const adminCookie = useCookie('admin_info')
    
    tokenCookie.value = null
    adminCookie.value = null
    currentUser.value = null
    
    await navigateTo('/login')
  }

  /**
   * Refresh user data
   */
  const refreshUser = () => {
    if (process.server) return
    
    const adminCookie = useCookie('admin_info')
    if (adminCookie.value) {
      try {
        currentUser.value = JSON.parse(adminCookie.value as string) as Admin
      } catch {
        currentUser.value = null
      }
    } else {
      currentUser.value = null
    }
  }

  /**
   * Get auth token
   */
  const getToken = (): string | null => {
    if (process.server) return null
    const tokenCookie = useCookie('auth_token')
    return tokenCookie.value || null
  }

  return {
    register,
    login,
    logout,
    refreshUser,
    getToken,
    currentUser,
    isAuthenticated,
  }
}