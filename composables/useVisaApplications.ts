import { useApi, handleApiError, type ApiResponse } from './useApi'
import { useEmailNotifications } from './useEmailNotifications'

/**
 * Admin Custom Field interface for new fields created during resubmission
 */
export interface AdminCustomField {
  question: string
  fieldType: 'text' | 'number' | 'date' | 'textarea' | 'dropdown' | 'upload'
  isRequired: boolean
  options?: string[] // For dropdown fields
  allowedFileTypes?: string[] | string // For upload fields (comma-separated string or array)
  minLength?: number
  maxLength?: number
  maxFileSize?: number
}

/**
 * Resubmission Request interface (Option B)
 */
export interface ResubmissionRequest {
  id: string
  target: 'application' | 'traveler'
  travelerId?: number | null
  fieldIds?: number[] // Optional existing field IDs (can be empty if only newFields are present)
  newFields?: AdminCustomField[] // Optional new custom fields created by admin
  note?: string | null
  requestedAt: Date | string
  fulfilledAt?: Date | string | null
}

/**
 * Visa Application interface
 */
export interface VisaApplication {
  id: number
  applicationNumber: string
  status: 'pending' | 'processing' | 'approved' | 'rejected' | 'submitted' | 'resubmission' | 'Additional Info required' | 'completed'
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

  // ✅ NEW: Array of resubmission requests (Option B)
  resubmissionRequests?: ResubmissionRequest[] | null

  // ⚠️ DEPRECATED: Backward compatibility (Option A)
  resubmissionTarget?: 'application' | 'traveler' | null
  resubmissionTravelerId?: number | null
  requestedFieldIds?: number[] | null

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
  receiveUpdates?: boolean
  createdAt: string
  notes?: string
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

      console.log('✅ Raw API response:', response)
      console.log('✅ Response data:', response.data)
      console.log('✅ Response data type:', typeof response.data)
      if (response.data) {
        console.log('✅ Response.data.data:', response.data.data)
        console.log('✅ Response.data.data is array?', Array.isArray(response.data.data))
        if (Array.isArray(response.data.data)) {
          console.log('✅ Number of applications in response:', response.data.data.length)
          console.log('✅ Application IDs:', response.data.data.map((app: any) => app.id))
        }
      }

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
   * Update application status
   * PATCH /visa-applications/:id/status
   * 
   * When status is changed to 'resubmission', the backend will automatically
   * send an email notification to the customer.
   */
  const updateApplicationStatus = async (
    id: number | string,
    status: string,
    options?: {
      sendEmail?: boolean // Whether to send email notification (default: true for 'resubmission' status)
    }
  ): Promise<ApiResponse<VisaApplication>> => {
    try {
      // Determine if we should send email (default true for resubmission status)
      const shouldSendEmail = options?.sendEmail !== false &&
        (status === 'resubmission' || status === 'Additional Info required')

      console.log('🔵 Updating application status:', { id, status, sendEmail: shouldSendEmail })

      const response = await api.patch<VisaApplication | { status: boolean; message: string; data: VisaApplication }>(
        `/visa-applications/${id}/status`,
        {
          status,
          sendEmail: shouldSendEmail
        }
      )

      let applicationData: VisaApplication

      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaApplication }
        if (wrappedResponse.status && wrappedResponse.data) {
          applicationData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to update application status')
        }
      } else {
        applicationData = response.data as VisaApplication
      }

      // Log email notification
      if (shouldSendEmail) {
        console.log('📧 Backend will send status update email notification')
      }

      return {
        data: applicationData,
        message: 'Application status updated successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Update application status error:', error)
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
   * ✅ NEW: Request resubmission (supports both single and multiple requests)
   * POST /visa-applications/:id/request-resubmission
   * 
   * This function will:
   * 1. Send resubmission request to backend
   * 2. Backend changes status to 'resubmission'
   * 3. Backend triggers email notification to customer
   * 
   * Supports both existing fields (via fieldIds) and new custom fields (via newFields)
   */
  const requestResubmission = async (
    applicationId: number,
    requests: Array<{
      target?: 'application' | 'traveler'
      travelerId?: number
      fieldIds?: number[] // Existing field IDs
      newFields?: AdminCustomField[] // New custom fields to create
      note?: string
    }>,
    options?: {
      sendEmail?: boolean // Whether to send email notification (default: true)
    }
  ): Promise<ApiResponse<any>> => {
    try {
      // Format requests and validate newFields
      const formattedRequests = requests.map(req => {
        const formatted: any = {
          target: req.target || (req.travelerId ? 'traveler' : 'application'),
          travelerId: req.travelerId,
          note: req.note
        }

        // Include fieldIds if provided
        if (req.fieldIds && req.fieldIds.length > 0) {
          formatted.fieldIds = Array.isArray(req.fieldIds) ? req.fieldIds : [req.fieldIds]
        }

        // Include newFields if provided (validate and format)
        if (req.newFields && req.newFields.length > 0) {
          formatted.newFields = req.newFields.map(field => {
            const formattedField: any = {
              question: field.question,
              fieldType: field.fieldType,
              isRequired: field.isRequired || false
            }

            // Add optional properties
            if (field.options && field.options.length > 0) {
              formattedField.options = field.options
            }
            if (field.allowedFileTypes) {
              // Handle both array and comma-separated string
              if (Array.isArray(field.allowedFileTypes)) {
                formattedField.allowedFileTypes = field.allowedFileTypes
              } else if (typeof field.allowedFileTypes === 'string' && field.allowedFileTypes.length > 0) {
                formattedField.allowedFileTypes = field.allowedFileTypes.split(',').map((t: string) => t.trim())
              }
            }
            if (field.minLength !== undefined) {
              formattedField.minLength = field.minLength
            }
            if (field.maxLength !== undefined) {
              formattedField.maxLength = field.maxLength
            }
            if (field.maxFileSize !== undefined) {
              formattedField.maxFileSize = field.maxFileSize
            }

            return formattedField
          })
        }

        return formatted
      })

      console.log('🔵 Requesting resubmission:', { applicationId, requests: formattedRequests })

      const response = await api.post(
        `/visa-applications/${applicationId}/request-resubmission`,
        {
          requests: formattedRequests,
          sendEmail: options?.sendEmail !== false // Default to true
        }
      )

      console.log('✅ Resubmission requested:', response.data)

      // Note: Email is sent by the backend API automatically
      // The backend has access to customer email and application details
      if (options?.sendEmail !== false) {
        console.log('📧 Backend will send resubmission email notification')
      }

      return {
        data: response.data,
        message: response.message || 'Resubmission requested successfully',
        success: true
      }
    } catch (error: any) {
      console.error('❌ Request resubmission error:', error)
      const errorMessage = handleApiError(error)
      return {
        data: null,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * ✅ NEW: Get active resubmission requests
   * GET /visa-applications/:id/resubmission-requests
   */
  const getResubmissionRequests = async (
    applicationId: number
  ): Promise<ApiResponse<ResubmissionRequest[]>> => {
    try {
      const response = await api.get(
        `/visa-applications/${applicationId}/resubmission-requests`
      )

      console.log('✅ Resubmission requests fetched:', response.data)

      return {
        data: response.data || [],
        message: 'Resubmission requests retrieved successfully',
        success: true
      }
    } catch (error: any) {
      console.error('❌ Get resubmission requests error:', error)
      return {
        data: [],
        message: handleApiError(error),
        success: false
      }
    }
  }

  /**
   * Format status for display
   */
  const formatStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'draft': 'Draft',
      'pending': 'Pending',
      'processing': 'Processing',
      'under_review': 'Under Review',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'cancelled': 'Cancelled',
      'submitted': 'Submitted',
      'completed': 'Completed',
      'Additional Info required': 'Additional Info Required',
      'resubmission': 'Resubmission'
    }
    return statusMap[status] || status
  }

  /**
   * Get status color class
   */
  const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
      'draft': 'bg-gray-100 text-gray-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'under_review': 'bg-indigo-100 text-indigo-800',
      'approved': 'bg-green-100 text-green-800',
      'completed': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'cancelled': 'bg-gray-100 text-gray-800',
      'submitted': 'bg-purple-100 text-purple-800',
      'Additional Info required': 'bg-orange-100 text-orange-800',
      'resubmission': 'bg-orange-100 text-orange-800'
    }
    return colorMap[status] || 'bg-gray-100 text-gray-800'
  }

  return {
    getMyApplications,
    getApplicationById,
    getApplicationByNumber,
    updateApplicationStatus,
    requestResubmission,
    getResubmissionRequests,
    formatStatus,
    getStatusColor,
  }
}