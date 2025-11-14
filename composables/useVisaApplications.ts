import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Visa Application interface
 */
export interface VisaApplication {
  id: number
  applicationNumber: string
  status: 'pending' | 'processing' | 'approved' | 'rejected' | 'submitted'
  totalAmount: number
  submittedAt: string
  createdAt: string
  updatedAt: string
  customerId: number
  visaProductId: number
  nationality: string
  destinationCountry: string
  visaType: string
  numberOfTravelers: number
  processingType: string
  processingFee: number
  notes?: string
  
  // Relations
  travelers?: Traveler[]
  payment?: Payment
}

/**
 * Traveler interface
 */
export interface Traveler {
  id: number
  applicationId: number
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  passportNationality: string
  passportNumber: string
  passportExpiryDate: string
  residenceCountry: string
  hasSchengenVisa: boolean
  createdAt: string
}

/**
 * Payment interface
 */
export interface Payment {
  id: number
  applicationId: number
  amount: number
  status: 'pending' | 'completed' | 'failed'
  transactionId: string
  createdAt: string
}

/**
 * Applications list response
 */
export interface ApplicationsListResponse {
  status: boolean
  message: string
  count: number
  data: VisaApplication[]
}

/**
 * Single application response
 */
export interface ApplicationDetailsResponse {
  status: boolean
  message: string
  data: VisaApplication
}

/**
 * Visa Applications API Service
 */
export const useVisaApplications = () => {
  const api = useApi()
  const { currentUser } = useAuthApi()
  
  /**
   * Get all applications for current user
   */
 /**
 * Get all applications for current user
 */
const getMyApplications = async (): Promise<ApiResponse<ApplicationsListResponse>> => {
    console.log('🔵 useVisaApplications.getMyApplications called')
    
    try {
      // Get customer ID from admin_info cookie
      const adminCookie = useCookie('admin_info')
      
      if (!adminCookie.value) {
        throw new Error('User not authenticated')
      }
      
      let customerId: number
      try {
        const adminData = typeof adminCookie.value === 'string' 
          ? JSON.parse(adminCookie.value) 
          : adminCookie.value
        customerId = adminData.id
      } catch (e) {
        throw new Error('Invalid user data')
      }
      
      if (!customerId) {
        throw new Error('Customer ID not found')
      }
      
      console.log('🌐 Fetching applications for customer:', customerId)
      
      const response = await api.get<ApplicationsListResponse>(
        `/visa-applications/customer/${customerId}`
      )
      
      console.log('✅ Applications fetched:', response.data)
      
      return {
        data: response.data,
        message: response.data.message || 'Applications retrieved successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Get applications error:', error)
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
   * Get single application details by ID
   */
  const getApplicationById = async (id: number): Promise<ApiResponse<ApplicationDetailsResponse>> => {
    console.log('🔵 useVisaApplications.getApplicationById called for:', id)
    
    try {
      const response = await api.get<ApplicationDetailsResponse>(
        `/visa-applications/${id}`
      )
      
      console.log('✅ Application details fetched:', response.data)
      
      return {
        data: response.data,
        message: response.data.message || 'Application retrieved successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Get application error:', error)
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
   * Get application by application number
   */
  const getApplicationByNumber = async (applicationNumber: string): Promise<ApiResponse<ApplicationDetailsResponse>> => {
    console.log('🔵 useVisaApplications.getApplicationByNumber called for:', applicationNumber)
    
    try {
      const response = await api.get<ApplicationDetailsResponse>(
        `/visa-applications/number/${applicationNumber}`
      )
      
      console.log('✅ Application fetched by number:', response.data)
      
      return {
        data: response.data,
        message: response.data.message || 'Application retrieved successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Get application by number error:', error)
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
   * Format status for display
   */
  const formatStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'Pending',
      'processing': 'Processing',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'submitted': 'Submitted'
    }
    return statusMap[status] || status
  }
  
  /**
   * Get status color class
   */
  const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'submitted': 'bg-purple-100 text-purple-800'
    }
    return colorMap[status] || 'bg-gray-100 text-gray-800'
  }
  
  return {
    getMyApplications,
    getApplicationById,
    getApplicationByNumber,
    formatStatus,
    getStatusColor,
  }
}