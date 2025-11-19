/**
 * Email Notifications Composable
 * Handles sending email notifications for various application events
 */

import { useApi, type ApiResponse } from './useApi'

export interface SendEmailRequest {
  to: string
  subject: string
  template: 'resubmission' | 'completed' | 'approved' | 'rejected'
  data: {
    applicationNumber: string
    customerName?: string
    [key: string]: any
  }
}

export interface SendResubmissionEmailRequest {
  applicationId: number
  applicationNumber: string
  customerEmail: string
  customerName?: string
  resubmissionNote?: string
  requestedFields?: string[]
}

export const useEmailNotifications = () => {
  const api = useApi()

  /**
   * Send a generic email notification
   * POST /notifications/send-email
   */
  const sendEmail = async (
    emailData: SendEmailRequest
  ): Promise<ApiResponse<{ sent: boolean }>> => {
    try {
      console.log('📧 Sending email:', emailData)

      const response = await api.post<{ sent: boolean }>(
        '/notifications/send-email',
        emailData
      )

      console.log('✅ Email sent successfully:', response.data)

      return {
        data: response.data,
        message: 'Email sent successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Send email error:', error)
      
      // Don't throw error - email failure shouldn't block the main flow
      return {
        data: { sent: false },
        message: error.message || 'Failed to send email',
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Send resubmission email notification
   * This is called when an application status changes to "resubmission"
   * POST /notifications/send-resubmission-email
   */
  const sendResubmissionEmail = async (
    data: SendResubmissionEmailRequest
  ): Promise<ApiResponse<{ sent: boolean }>> => {
    try {
      console.log('📧 Sending resubmission email:', {
        applicationId: data.applicationId,
        email: data.customerEmail
      })

      const response = await api.post<{ sent: boolean }>(
        '/notifications/send-resubmission-email',
        {
          applicationId: data.applicationId,
          applicationNumber: data.applicationNumber,
          customerEmail: data.customerEmail,
          customerName: data.customerName,
          resubmissionNote: data.resubmissionNote,
          requestedFields: data.requestedFields
        }
      )

      console.log('✅ Resubmission email sent:', response.data)

      return {
        data: response.data,
        message: 'Resubmission email sent successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Send resubmission email error:', error)
      
      // Don't throw error - email failure shouldn't block the main flow
      return {
        data: { sent: false },
        message: error.message || 'Failed to send resubmission email',
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Send application status update email
   * POST /notifications/send-status-update-email
   */
  const sendStatusUpdateEmail = async (
    applicationId: number,
    status: string,
    customerEmail: string,
    customerName?: string
  ): Promise<ApiResponse<{ sent: boolean }>> => {
    try {
      console.log('📧 Sending status update email:', {
        applicationId,
        status,
        email: customerEmail
      })

      const response = await api.post<{ sent: boolean }>(
        '/notifications/send-status-update-email',
        {
          applicationId,
          status,
          customerEmail,
          customerName
        }
      )

      console.log('✅ Status update email sent:', response.data)

      return {
        data: response.data,
        message: 'Status update email sent successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Send status update email error:', error)
      
      return {
        data: { sent: false },
        message: error.message || 'Failed to send status update email',
        success: false,
        error: error.message
      }
    }
  }

  return {
    sendEmail,
    sendResubmissionEmail,
    sendStatusUpdateEmail,
  }
}

