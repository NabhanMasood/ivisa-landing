import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Referral Status
 */
export type ReferralStatus = 'pending' | 'signed_up' | 'expired'

/**
 * Referral Interface
 */
export interface Referral {
    id: number | string
    referrerId: number
    email: string // Backend may return as 'referredEmail' or 'email'
    referredEmail?: string // Alternative field name from backend
    status: ReferralStatus
    couponCode?: string
    couponId?: number
    createdAt?: string
    updatedAt?: string
    signedUpAt?: string
    expiresAt?: string
}

/**
 * Create Referral DTO
 */
export interface CreateReferralDto {
    email?: string // For backward compatibility
    referredEmail: string // Backend expects this field name
}

/**
 * Referrals List Response
 */
export interface ReferralsListResponse {
    status: boolean
    message: string
    count?: number
    data: Array<Referral>
}

/**
 * Referral Detail Response
 */
export interface ReferralDetailResponse {
    status: boolean
    message: string
    data: Referral
}

/**
 * Referrals API Service
 */
export const useReferralsApi = () => {
    const api = useApi()

    /**
     * Send a referral invitation
     */
    const sendReferral = async (data: CreateReferralDto): Promise<ApiResponse<Referral>> => {
        try {
            console.debug('[useReferralsApi] sendReferral: request payload', data)
            console.log('📤 Sending referral request:', JSON.stringify(data, null, 2))

            const response = await api.post<Referral | { status: boolean; message: string; data: Referral }>('/referrals', data)

            console.log('✅ Referral response received:', response)

            console.debug('[useReferralsApi] sendReferral: response', response.data)

            // Handle different response structures
            let referralData: Referral

            if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
                // Response has wrapper structure { status, message, data }
                const wrappedResponse = response.data as { status: boolean; message: string; data: Referral }
                if (wrappedResponse.status && wrappedResponse.data) {
                    referralData = wrappedResponse.data
                } else {
                    throw new Error(wrappedResponse.message || 'Failed to send referral')
                }
            } else {
                // Direct referral object
                referralData = response.data as Referral
            }

            return {
                data: referralData,
                message: 'Referral invitation sent successfully',
                success: true,
            }
        } catch (error: any) {
            console.error('[useReferralsApi] sendReferral: error', error)
            console.error('[useReferralsApi] sendReferral: error.response', error?.response)
            console.error('[useReferralsApi] sendReferral: error.response._data', error?.response?._data)
            console.error('[useReferralsApi] sendReferral: error.data', error?.data)

            // Extract detailed error message from response
            let errorMessage = 'Failed to send referral invitation'

            if (error?.response?._data) {
                const errorData = error.response._data
                console.log('📋 Error data structure:', JSON.stringify(errorData, null, 2))

                if (Array.isArray(errorData.message)) {
                    // Handle validation errors array (NestJS format)
                    errorMessage = errorData.message.join(', ')
                } else if (errorData.message) {
                    errorMessage = errorData.message
                } else if (errorData.error) {
                    errorMessage = errorData.error
                }
            } else if (error?.data) {
                const errorData = error.data
                if (Array.isArray(errorData.message)) {
                    errorMessage = errorData.message.join(', ')
                } else if (errorData.message) {
                    errorMessage = errorData.message
                } else if (errorData.error) {
                    errorMessage = errorData.error
                }
            } else if (error?.message) {
                errorMessage = handleApiError(error)
            }

            console.error('[useReferralsApi] sendReferral: extracted error message', errorMessage)

            return {
                data: null as any,
                message: errorMessage,
                success: false,
                error: errorMessage,
            }
        }
    }

    /**
     * Get all referrals for the current user
     */
    const getMyReferrals = async (): Promise<ApiResponse<ReferralsListResponse['data']>> => {
        try {
            console.debug('[useReferralsApi] getMyReferrals: request')

            const response = await api.get<ReferralsListResponse | Referral[]>('/referrals/my')

            console.debug('[useReferralsApi] getMyReferrals: response', response.data)

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
                const wrappedResponse = response.data as ReferralsListResponse
                if (wrappedResponse.status && wrappedResponse.data) {
                    return {
                        data: wrappedResponse.data,
                        message: wrappedResponse.message,
                        success: true,
                    }
                }
                return {
                    data: [],
                    message: wrappedResponse.message || 'No referrals found',
                    success: false,
                }
            }

            return {
                data: [],
                message: 'No referrals found',
                success: false,
            }
        } catch (error) {
            console.error('[useReferralsApi] getMyReferrals: error', error)
            throw new Error(handleApiError(error))
        }
    }

    /**
     * Get a single referral by ID
     */
    const getReferralById = async (id: number | string): Promise<ApiResponse<ReferralDetailResponse['data']>> => {
        try {
            console.debug('[useReferralsApi] getReferralById: request', { id })

            const response = await api.get<ReferralDetailResponse | Referral>(`/referrals/${id}`)

            console.debug('[useReferralsApi] getReferralById: response', response.data)

            // Handle different response structures
            if (typeof response.data === 'object' && response.data !== null && 'status' in response.data) {
                // Response has wrapper structure { status, message, data }
                const wrappedResponse = response.data as ReferralDetailResponse
                if (wrappedResponse.status && wrappedResponse.data) {
                    return {
                        data: wrappedResponse.data,
                        message: wrappedResponse.message,
                        success: true,
                    }
                }
                return {
                    data: null as any,
                    message: wrappedResponse.message || 'Referral not found',
                    success: false,
                }
            } else {
                // Direct referral object
                return {
                    data: response.data as Referral,
                    message: 'Success',
                    success: true,
                }
            }
        } catch (error) {
            console.error('[useReferralsApi] getReferralById: error', error)
            throw new Error(handleApiError(error))
        }
    }

    return {
        sendReferral,
        getMyReferrals,
        getReferralById,
    }
}

