

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
 * Change Password DTO
 */
export interface ChangePasswordDto {
  currentPassword: string
  newPassword: string
}

/**
 * Change Password Response
 */
export interface ChangePasswordResponse {
  status: boolean
  message: string
}

/**
 * Change Email DTO
 */
export interface ChangeEmailDto {
  newEmail: string
  password: string
}

/**
 * Change Email Response
 */
export interface ChangeEmailResponse {
  status: boolean
  message: string
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
  
  // Reactive state for current user
  // Initialize as null, we'll sync from cookie on client side
  const currentUser = useState<Admin | null>('currentUser', () => null)
  
  // Sync currentUser from cookie on client side
  // This runs every time the composable is used on the client
  if (process.client) {
    const adminCookie = useCookie('admin_info')
    if (adminCookie.value) {
      try {
        // Handle both string and object cases (Nuxt might auto-deserialize)
        let parsed: Admin
        if (typeof adminCookie.value === 'string') {
          // If it's a string, parse it
          parsed = JSON.parse(adminCookie.value) as Admin
        } else if (typeof adminCookie.value === 'object' && adminCookie.value !== null) {
          // If it's already an object, use it directly
          parsed = adminCookie.value as Admin
        } else {
          throw new Error('Invalid cookie format')
        }
        // Always sync from cookie to ensure it's up to date
        const needsUpdate = !currentUser.value || currentUser.value.id !== parsed.id
        currentUser.value = parsed
        if (needsUpdate) {
          console.log('✅ currentUser synced from cookie:', { id: parsed.id, email: parsed.email })
        }
      } catch (error) {
        console.error('❌ Failed to parse admin_info cookie:', error)
        console.error('❌ Cookie value:', adminCookie.value, 'Type:', typeof adminCookie.value)
        currentUser.value = null
      }
    } else {
      // Cookie doesn't exist - clear state
      if (currentUser.value) {
        console.warn('⚠️ admin_info cookie missing, clearing currentUser state')
        currentUser.value = null
      }
    }
  }

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
      // Note: Nuxt's useCookie may auto-serialize, so we handle both string and object when reading
      const adminCookie = useCookie('admin_info', {
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      })
      // Always stringify to ensure it's stored as a string
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
    
    console.log('🔄 Refreshing user data...')
    const adminCookie = useCookie('admin_info')
    const tokenCookie = useCookie('auth_token')
    
    console.log('🔑 Token exists:', !!tokenCookie.value)
    console.log('👤 Admin cookie exists:', !!adminCookie.value)
    
    if (adminCookie.value) {
      try {
        // Handle both string and object cases (Nuxt might auto-deserialize)
        let parsed: Admin
        if (typeof adminCookie.value === 'string') {
          // If it's a string, parse it
          parsed = JSON.parse(adminCookie.value) as Admin
        } else if (typeof adminCookie.value === 'object' && adminCookie.value !== null) {
          // If it's already an object, use it directly
          parsed = adminCookie.value as Admin
        } else {
          throw new Error('Invalid cookie format')
        }
        currentUser.value = parsed
        console.log('✅ User data refreshed:', { id: parsed.id, email: parsed.email, fullName: parsed.fullName })
      } catch (error) {
        console.error('❌ Failed to parse admin_info cookie:', error)
        console.error('❌ Cookie value:', adminCookie.value, 'Type:', typeof adminCookie.value)
        currentUser.value = null
      }
    } else {
      console.warn('⚠️ No admin_info cookie found during refresh')
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

  /**
   * Change password
   */
  const changePassword = async (data: ChangePasswordDto): Promise<ApiResponse<ChangePasswordResponse>> => {
    console.log('🔵 useAuthApi.changePassword called')
    console.log('📦 Data to send:', { ...data, currentPassword: '***', newPassword: '***' })
    
    try {
      // Refresh user data first to ensure it's up to date
      refreshUser()
      
      // Get customerId from currentUser
      if (!currentUser.value || !currentUser.value.id) {
        console.error('❌ User not authenticated - currentUser:', currentUser.value)
        throw new Error('User not authenticated. Please refresh the page and try again.')
      }

      const customerId = currentUser.value.id
      console.log('👤 Changing password for customer:', customerId)
      
      // Verify token exists
      const token = getToken()
      if (!token) {
        console.error('❌ No auth token found')
        throw new Error('Authentication token not found. Please log in again.')
      }
      console.log('🔑 Token verified, making API call...')

      const response = await api.patch<ChangePasswordResponse>(
        `/auth/customer/${customerId}/change-password`,
        data
      )

      console.log('✅ Password changed successfully:', response)

      return {
        data: response.data,
        message: response.data.message || 'Password changed successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Change password error:', error)
      console.error('❌ Error details:', {
        message: error?.message,
        response: error?.response,
        data: error?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText
      })
      
      // Extract more detailed error message
      let errorMessage = 'Failed to change password'
      
      // Check for backend error message first (even for 401, as it might be password validation)
      if (error?.response?._data?.message) {
        errorMessage = error.response._data.message
      } else if (error?.data?.message) {
        errorMessage = error.data.message
      } else if (error?.response?.status === 401) {
        // Only use generic session expired message if no specific error message was provided
        errorMessage = 'Your session has expired. Please log in again.'
      } else if (error?.message) {
        errorMessage = error.message
      } else {
        errorMessage = handleApiError(error)
      }
      
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Change email
   */
  const changeEmail = async (data: ChangeEmailDto): Promise<ApiResponse<ChangeEmailResponse>> => {
    console.log('🔵 useAuthApi.changeEmail called')
    console.log('📦 Data to send:', { ...data, password: '***' })
    
    try {
      // Refresh user data first to ensure it's up to date
      refreshUser()
      
      // Get customerId from currentUser
      if (!currentUser.value || !currentUser.value.id) {
        console.error('❌ User not authenticated - currentUser:', currentUser.value)
        throw new Error('User not authenticated. Please refresh the page and try again.')
      }

      const customerId = currentUser.value.id
      console.log('👤 Changing email for customer:', customerId)
      
      // Verify token exists
      const token = getToken()
      if (!token) {
        console.error('❌ No auth token found')
        throw new Error('Authentication token not found. Please log in again.')
      }
      console.log('🔑 Token verified, making API call...')

      const response = await api.patch<ChangeEmailResponse>(
        `/auth/customer/${customerId}/change-email`,
        data
      )

      console.log('✅ Email changed successfully:', response)

      // Update the current user's email in state and cookie
      if (currentUser.value) {
        currentUser.value.email = data.newEmail.toLowerCase()
        
        // Update cookie
        const adminCookie = useCookie('admin_info', {
          maxAge: 60 * 60 * 24 * 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/'
        })
        adminCookie.value = JSON.stringify(currentUser.value)
      }

      return {
        data: response.data,
        message: response.data.message || 'Email changed successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Change email error:', error)
      console.error('❌ Error details:', {
        message: error?.message,
        response: error?.response,
        data: error?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText
      })
      
      // Extract more detailed error message
      let errorMessage = 'Failed to change email'
      
      // Check for backend error message first (even for 401, as it might be password validation)
      if (error?.response?._data?.message) {
        errorMessage = error.response._data.message
      } else if (error?.data?.message) {
        errorMessage = error.data.message
      } else if (error?.response?.status === 401) {
        // Only use generic session expired message if no specific error message was provided
        errorMessage = 'Your session has expired. Please log in again.'
      } else if (error?.message) {
        errorMessage = error.message
      } else {
        errorMessage = handleApiError(error)
      }
      
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  return {
    register,
    login,
    logout,
    refreshUser,
    getToken,
    changePassword,
    changeEmail,
    currentUser,
    isAuthenticated,
  }
}