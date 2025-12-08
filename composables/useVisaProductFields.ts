import { useApi, handleApiError, type ApiResponse } from './useApi'
import { useVisaApplications } from './useVisaApplications'

/**
 * Visa Product Field interface
 */
export interface VisaProductField {
  id?: number
  visaProductId: number
  fieldType: 'text' | 'number' | 'date' | 'upload' | 'dropdown' | 'textarea'
  question: string
  isRequired: boolean
  displayOrder: number
  isActive: boolean
  options?: string[] // For dropdown fields
  minLength?: number // For text/number fields
  maxLength?: number // For text/number fields
  allowedFileTypes?: string[] // For upload fields
  maxFileSize?: number // For upload fields (in bytes)
  createdAt?: string
  updatedAt?: string
  editable?: boolean

}

/**
 * Create Visa Product Field DTO
 */
export interface CreateVisaProductFieldDto {
  visaProductId: number
  fieldType: 'text' | 'number' | 'date' | 'upload' | 'dropdown' | 'textarea'
  question: string
  isRequired?: boolean
  displayOrder?: number
  isActive?: boolean
  options?: string[]
  minLength?: number
  maxLength?: number
  allowedFileTypes?: string[]
  maxFileSize?: number
}

/**
 * Update Visa Product Field DTO
 */
export interface UpdateVisaProductFieldDto {
  visaProductId?: number
  fieldType?: 'text' | 'number' | 'date' | 'upload' | 'dropdown' | 'textarea'
  question?: string
  isRequired?: boolean
  displayOrder?: number
  isActive?: boolean
  options?: string[]
  minLength?: number
  maxLength?: number
  allowedFileTypes?: string[]
  maxFileSize?: number
}

/**
 * API Response structure for getVisaProductFields
 */
export interface VisaProductFieldsListResponse {
  status: boolean
  message: string
  count?: number
  data: VisaProductField[]
}

/**
 * Field Response interface (existing response data)
 */
export interface FieldResponse {
  id: number
  value: string | null
  filePath: string | null
  fileName: string | null
  fileSize?: number | null
}

/**
 * Field with Response interface (for getFieldsByApplication)
 */
export interface VisaProductFieldWithResponse extends VisaProductField {
  response: FieldResponse | null
}

/**
 * Submit Field Response DTO
 */
export interface SubmitFieldResponseDto {
  fieldId: number | string // Can be number (positive or negative) or string (for passport fields)
  value?: string | null
  filePath?: string | null
  fileName?: string | null
  fileSize?: number | null
  question?: string // Optional: question text for negative field IDs (admin-requested fields)
}

/**
 * Submit Field Responses Request
 */
export interface SubmitFieldResponsesRequest {
  applicationId: number
  travelerId?: number // Optional traveler ID for traveler-specific responses
  responses: SubmitFieldResponseDto[]
}

/**
 * API Response structure for getFieldsByApplication
 */
export interface FieldsWithResponsesResponse {
  status: boolean
  message: string
  count?: number
  data: VisaProductFieldWithResponse[]
}

/**
 * Visa Product Fields API Service
 * Provides all CRUD operations for visa product fields
 */
export const useVisaProductFieldsApi = () => {
  const api = useApi()

  /**
   * Create a new visa product field
   * POST /visa-product-fields
   */
  const createVisaProductField = async (
    data: CreateVisaProductFieldDto
  ): Promise<ApiResponse<VisaProductField>> => {
    try {
      const response = await api.post<VisaProductField | { status: boolean; message: string; data: VisaProductField }>(
        '/visa-product-fields',
        data
      )

      let fieldData: VisaProductField

      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaProductField }
        if (wrappedResponse.status && wrappedResponse.data) {
          fieldData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to create visa product field')
        }
      } else {
        fieldData = response.data as VisaProductField
      }

      return {
        data: fieldData,
        message: 'Visa product field created successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get all fields for a visa product
   * GET /visa-product-fields/by-visa-product/:visaProductId
   */
  const getVisaProductFieldsByVisaProduct = async (
    visaProductId: number | string
  ): Promise<ApiResponse<VisaProductField[]>> => {
    try {
      const response = await api.get<VisaProductFieldsListResponse | VisaProductField[]>(
        `/visa-product-fields/by-visa-product/${visaProductId}`
      )

      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          message: 'Success',
          success: true,
        }
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as VisaProductFieldsListResponse
        if (wrappedResponse.status && wrappedResponse.data) {
          return {
            data: wrappedResponse.data,
            message: wrappedResponse.message,
            success: true,
          }
        }
        return {
          data: [],
          message: wrappedResponse.message || 'No fields found',
          success: false,
        }
      }

      return {
        data: [],
        message: 'No fields found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get a single field by ID
   * GET /visa-product-fields/:id
   */
  const getVisaProductFieldById = async (
    id: number | string
  ): Promise<ApiResponse<VisaProductField>> => {
    try {
      const response = await api.get<VisaProductField | { status: boolean; message: string; data: VisaProductField }>(
        `/visa-product-fields/${id}`
      )

      let fieldData: VisaProductField

      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaProductField }
        if (wrappedResponse.status && wrappedResponse.data) {
          fieldData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Visa product field not found')
        }
      } else {
        fieldData = response.data as VisaProductField
      }

      return {
        data: fieldData,
        message: 'Success',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Update a visa product field by ID
   * PATCH /visa-product-fields/:id
   */
  const updateVisaProductField = async (
    id: number | string,
    data: UpdateVisaProductFieldDto
  ): Promise<ApiResponse<VisaProductField>> => {
    try {
      const response = await api.patch<VisaProductField | { status: boolean; message: string; data: VisaProductField }>(
        `/visa-product-fields/${id}`,
        data
      )

      let fieldData: VisaProductField

      if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as { status: boolean; message: string; data: VisaProductField }
        if (wrappedResponse.status && wrappedResponse.data) {
          fieldData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to update visa product field')
        }
      } else {
        fieldData = response.data as VisaProductField
      }

      return {
        data: fieldData,
        message: 'Visa product field updated successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Delete a visa product field by ID
   * DELETE /visa-product-fields/:id
   */
  const deleteVisaProductField = async (
    id: number | string
  ): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/visa-product-fields/${id}`)

      return {
        data: undefined,
        message: 'Visa product field deleted successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get all fields (if backend supports it)
   * This might need to be implemented by getting all visa products and their fields
   */
  const getAllVisaProductFields = async (): Promise<ApiResponse<VisaProductField[]>> => {
    try {
      // Try to get all fields directly (if backend supports it)
      // Otherwise, we'll need to get all visa products and fetch their fields
      const response = await api.get<VisaProductFieldsListResponse | VisaProductField[]>(
        '/visa-product-fields'
      )

      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          message: 'Success',
          success: true,
        }
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as VisaProductFieldsListResponse
        if (wrappedResponse.status && wrappedResponse.data) {
          return {
            data: wrappedResponse.data,
            message: wrappedResponse.message || 'Success',
            success: true,
          }
        }
        return {
          data: [],
          message: wrappedResponse.message || 'No fields found',
          success: false,
        }
      }

      return {
        data: [],
        message: 'No fields found',
        success: false,
      }
    } catch (error) {
      // If endpoint doesn't exist, return empty array
      // The list page will handle fetching fields per visa product
      return {
        data: [],
        message: 'Endpoint not available. Use getVisaProductFieldsByVisaProduct instead.',
        success: false,
      }
    }
  }

  /**
   * Get fields with existing responses for an application
   * GET /visa-product-fields/by-application/:applicationId?travelerId=xxx
   */
  const getFieldsByApplication = async (
    applicationId: number | string,
    travelerId?: number | string
  ): Promise<ApiResponse<VisaProductFieldWithResponse[]>> => {
    try {
      let url = `/visa-product-fields/by-application/${applicationId}`
      if (travelerId) {
        url += `?travelerId=${travelerId}`
      }

      const response = await api.get<FieldsWithResponsesResponse | VisaProductFieldWithResponse[]>(
        url
      )

      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          message: 'Success',
          success: true,
        }
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as FieldsWithResponsesResponse
        if (wrappedResponse.status && wrappedResponse.data) {
          return {
            data: wrappedResponse.data,
            message: wrappedResponse.message || 'Success',
            success: true,
          }
        }
        return {
          data: [],
          message: wrappedResponse.message || 'No fields found',
          success: false,
        }
      }

      return {
        data: [],
        message: 'No fields found',
        success: false,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Submit field responses for an application
   * POST /visa-product-fields/responses
   * 
   * After successful submission, checks if all additional info is complete
   * and automatically updates application status from "resubmission" to "processing"
   */
  const submitFieldResponses = async (
    data: SubmitFieldResponsesRequest,
    travelers?: Array<{ id?: number }>
  ): Promise<ApiResponse<FieldResponse[]>> => {
    try {
      const response = await api.post<{ status: boolean; message: string; count?: number; data: FieldResponse[] } | FieldResponse[]>(
        '/visa-product-fields/responses',
        data
      )

      let responsesData: FieldResponse[]

      if (Array.isArray(response.data)) {
        responsesData = response.data
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as { status: boolean; message: string; count?: number; data: FieldResponse[] }
        if (wrappedResponse.status && wrappedResponse.data) {
          responsesData = wrappedResponse.data
        } else {
          throw new Error(wrappedResponse.message || 'Failed to submit field responses')
        }
      } else {
        throw new Error('Invalid response format')
      }

      // ✅ UPDATED: Check application status and update if needed
      if (travelers) {
        try {
          // First, get the current application to check its status
          const { getApplicationById } = useVisaApplications()
          const appResponse = await getApplicationById(data.applicationId)

          if (appResponse.success && appResponse.data) {
            const appData = appResponse.data.data || appResponse.data

            console.log('🔵 Current application status after submission:', {
              status: appData.status,
              resubmissionTarget: appData.resubmissionTarget,
              resubmissionTravelerId: appData.resubmissionTravelerId
            })

            // Only proceed if status is still 'resubmission'
            if (appData.status === 'resubmission') {
              const allSubmitted = await checkAllAdditionalInfoSubmitted(
                data.applicationId,
                travelers
              )

              console.log('🔍 All additional info submitted?', allSubmitted)

              if (allSubmitted) {
                console.log('✅ All additional info submitted, updating application status to "processing"')

                const { updateApplicationStatus } = useVisaApplications()
                try {
                  const statusUpdateResult = await updateApplicationStatus(
                    data.applicationId,
                    'processing'
                  )

                  if (statusUpdateResult.success) {
                    console.log('✅ Application status updated to "processing"')
                  } else {
                    console.warn('⚠️ Failed to update application status:', statusUpdateResult.message)
                  }
                } catch (statusError: any) {
                  // If it fails because status is already correct, that's fine
                  if (statusError.message?.includes('already set to')) {
                    console.log('ℹ️ Status already correct')
                  } else {
                    console.warn('⚠️ Failed to update application status:', statusError.message)
                  }
                }
              } else {
                console.log('ℹ️ Not all additional info submitted yet')
              }
            } else {
              console.log('ℹ️ Application status is already:', appData.status)
            }
          }
        } catch (statusError) {
          // Don't fail the submission if status update fails
          console.error('❌ Error checking/updating application status:', statusError)
        }
      }

      return {
        data: responsesData,
        message: 'Field responses submitted successfully',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Get field responses for an application (without field details)
   * GET /visa-product-fields/responses/:applicationId?travelerId=xxx
   */
  const getFieldResponses = async (
    applicationId: number | string,
    travelerId?: number | string
  ): Promise<ApiResponse<FieldResponse[]>> => {
    try {
      let url = `/visa-product-fields/responses/${applicationId}`
      if (travelerId) {
        url += `?travelerId=${travelerId}`
      }

      const response = await api.get<{ status: boolean; message: string; count?: number; data: FieldResponse[] } | FieldResponse[]>(
        url
      )

      let responsesData: FieldResponse[]

      if (Array.isArray(response.data)) {
        responsesData = response.data
      } else if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
        const wrappedResponse = response.data as { status: boolean; message: string; count?: number; data: FieldResponse[] }
        if (wrappedResponse.status && wrappedResponse.data) {
          responsesData = wrappedResponse.data
        } else {
          return {
            data: [],
            message: wrappedResponse.message || 'No responses found',
            success: false,
          }
        }
      } else {
        responsesData = []
      }

      return {
        data: responsesData,
        message: 'Success',
        success: true,
      }
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  }

  /**
   * Check if all additional info has been submitted for an application
   * This checks both application-level and all traveler-level fields
   * Returns true only if we can definitively verify all required fields are filled
   * AND at least some fields have responses (user has actually submitted something)
   * 
   * IMPORTANT: During resubmission, only editable fields need to be filled
   */
  const checkAllAdditionalInfoSubmitted = async (
    applicationId: number | string,
    travelers: Array<{ id?: number }> = [],
    totalTravelersCount?: number
  ): Promise<boolean> => {
    try {
      let hasAnyFields = false
      let hasAnyResponses = false
      let allRequiredFieldsFilled = true

      // Check application-level fields
      let applicationHasResponses = false
      let applicationAllFilled = true

      const appFieldsResponse = await getFieldsByApplication(applicationId)
      if (appFieldsResponse.success && appFieldsResponse.data) {
        const appFields = appFieldsResponse.data
        if (appFields.length > 0) {
          hasAnyFields = true

          // Check if any field has a response
          applicationHasResponses = appFields.some(field => {
            if (field.response === null || field.response === undefined) return false
            const hasValue = field.response.value !== null &&
              field.response.value !== '' &&
              field.response.value !== undefined
            const hasFile = field.response.filePath !== null &&
              field.response.filePath !== '' &&
              field.response.filePath !== undefined
            return hasValue || hasFile
          })

          if (applicationHasResponses) {
            hasAnyResponses = true
          }

          // ⭐ KEY CHANGE: Only check editable fields during resubmission
          // If field.editable is false, it means admin didn't request it, so skip validation
          applicationAllFilled = appFields.every(field => {
            // Skip non-editable fields (not requested by admin)
            if (field.editable === false) return true

            // Skip non-required fields
            if (!field.isRequired) return true

            // Field is required AND editable, check if it has a valid response
            if (field.response === null || field.response === undefined) {
              return false
            }

            const hasValue = field.response.value !== null &&
              field.response.value !== '' &&
              field.response.value !== undefined
            const hasFile = field.response.filePath !== null &&
              field.response.filePath !== '' &&
              field.response.filePath !== undefined
            return hasValue || hasFile
          })

          if (!applicationAllFilled) {
            allRequiredFieldsFilled = false
          }
        }
      } else if (!appFieldsResponse.success) {
        console.warn('Failed to fetch application-level fields, assuming not all info submitted')
        return false
      }

      // Check traveler-level fields for each traveler
      const travelersWithIds: number[] = []
      let allTravelersComplete = true

      for (const traveler of travelers) {
        if (traveler.id) {
          travelersWithIds.push(traveler.id)
          const travelerFieldsResponse = await getFieldsByApplication(applicationId, traveler.id)
          if (travelerFieldsResponse.success && travelerFieldsResponse.data) {
            const travelerFields = travelerFieldsResponse.data
            if (travelerFields.length > 0) {
              hasAnyFields = true

              // Check if any field has a response
              const travelerHasResponses = travelerFields.some(field => {
                if (field.response === null || field.response === undefined) return false
                const hasValue = field.response.value !== null &&
                  field.response.value !== '' &&
                  field.response.value !== undefined
                const hasFile = field.response.filePath !== null &&
                  field.response.filePath !== '' &&
                  field.response.filePath !== undefined
                return hasValue || hasFile
              })

              if (travelerHasResponses) {
                hasAnyResponses = true
              }

              // ⭐ KEY CHANGE: Only check editable fields during resubmission
              const travelerAllRequiredFilled = travelerFields.every(field => {
                // Skip non-editable fields (not requested by admin)
                if (field.editable === false) return true

                // Skip non-required fields
                if (!field.isRequired) return true

                // Field is required AND editable, check if it has a valid response
                if (field.response === null || field.response === undefined) {
                  return false
                }

                const hasValue = field.response.value !== null &&
                  field.response.value !== '' &&
                  field.response.value !== undefined
                const hasFile = field.response.filePath !== null &&
                  field.response.filePath !== '' &&
                  field.response.filePath !== undefined
                return hasValue || hasFile
              })

              if (!travelerAllRequiredFilled || !travelerHasResponses) {
                allRequiredFieldsFilled = false
                allTravelersComplete = false
              }
            }
          } else if (!travelerFieldsResponse.success) {
            console.warn(`Failed to fetch fields for traveler ${traveler.id}, assuming not all info submitted`)
            return false
          }
        }
      }


      // If there are no fields at all, then there's nothing to submit, so return true
      if (!hasAnyFields) {
        return true
      }

      // IMPORTANT: If there are fields but NO responses at all, return false
      if (!hasAnyResponses) {
        return false
      }

      const applicationComplete = applicationAllFilled && applicationHasResponses
      const result = hasAnyResponses && applicationComplete && allTravelersComplete && allRequiredFieldsFilled



      return result
    } catch (error) {
      console.error('Error checking additional info submission status:', error)
      return false
    }
  }

  return {
    createVisaProductField,
    getVisaProductFieldsByVisaProduct,
    getVisaProductFieldById,
    updateVisaProductField,
    deleteVisaProductField,
    getAllVisaProductFields,
    getFieldsByApplication,
    submitFieldResponses,
    getFieldResponses,
    checkAllAdditionalInfoSubmitted,
  }
}

