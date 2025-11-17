import { ref, computed, onMounted } from 'vue'
import { useVisaApplications, type VisaApplication, type ResubmissionRequest } from './useVisaApplications'

export interface NotificationItem {
  id: string
  applicationId: number
  applicationNumber: string
  message: string
  requestedAt: Date | string
  type: 'resubmission'
}

/**
 * Notifications composable
 */
export const useNotifications = () => {
  const { getMyApplications } = useVisaApplications()
  
  const notifications = ref<NotificationItem[]>([])
  const loading = ref(false)
  const lastFetchTime = ref<Date | null>(null)

  /**
   * Check if an application has active resubmission requests
   */
  const hasActiveResubmission = (app: VisaApplication): boolean => {
    // Check if status indicates resubmission
    if (app.status === 'resubmission' || app.status === 'Additional Info required') {
      return true
    }
    
    // Check for active resubmission requests
    if (app.resubmissionRequests && Array.isArray(app.resubmissionRequests)) {
      return app.resubmissionRequests.some((req: ResubmissionRequest) => !req.fulfilledAt)
    }
    
    return false
  }

  /**
   * Convert application to notification items
   */
  const applicationToNotifications = (app: VisaApplication): NotificationItem[] => {
    const items: NotificationItem[] = []
    
    if (hasActiveResubmission(app)) {
      // Check for resubmission requests
      if (app.resubmissionRequests && Array.isArray(app.resubmissionRequests)) {
        const activeRequests = app.resubmissionRequests.filter((req: ResubmissionRequest) => !req.fulfilledAt)
        
        if (activeRequests.length > 0) {
          activeRequests.forEach((req: ResubmissionRequest) => {
            const targetText = req.target === 'traveler' 
              ? `Traveler #${req.travelerId || 'N/A'}` 
              : 'Application'
            
            items.push({
              id: `resubmission-${app.id}-${req.id}`,
              applicationId: app.id,
              applicationNumber: app.applicationNumber,
              message: req.note || `Resubmission requested for ${targetText}`,
              requestedAt: req.requestedAt,
              type: 'resubmission'
            })
          })
        }
      } else {
        // Fallback for legacy resubmission status
        items.push({
          id: `resubmission-${app.id}`,
          applicationId: app.id,
          applicationNumber: app.applicationNumber,
          message: 'Additional information required for your application',
          requestedAt: app.updatedAt,
          type: 'resubmission'
        })
      }
    }
    
    return items
  }

  /**
   * Fetch notifications from applications
   */
  const fetchNotifications = async (force = false) => {
    // Don't fetch too frequently (throttle to once per 30 seconds)
    if (!force && lastFetchTime.value) {
      const timeSinceLastFetch = Date.now() - lastFetchTime.value.getTime()
      if (timeSinceLastFetch < 30000) {
        console.log('⏱️ Skipping notification fetch (throttled)')
        return
      }
    }

    loading.value = true
    try {
      console.log('🔔 Fetching notifications...')
      const response = await getMyApplications()
      
      if (response.success && response.data?.data) {
        const applications: VisaApplication[] = response.data.data
        
        // Convert applications to notifications
        const allNotifications: NotificationItem[] = []
        applications.forEach(app => {
          const appNotifications = applicationToNotifications(app)
          allNotifications.push(...appNotifications)
        })
        
        // Sort by requestedAt (newest first)
        allNotifications.sort((a, b) => {
          const dateA = new Date(a.requestedAt).getTime()
          const dateB = new Date(b.requestedAt).getTime()
          return dateB - dateA
        })
        
        notifications.value = allNotifications
        lastFetchTime.value = new Date()
        
        console.log(`✅ Fetched ${allNotifications.length} notifications`)
      } else {
        notifications.value = []
      }
    } catch (error) {
      console.error('❌ Error fetching notifications:', error)
      notifications.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Get unread notification count
   */
  const unreadCount = computed(() => {
    return notifications.value.length
  })

  /**
   * Check if there are any notifications
   */
  const hasNotifications = computed(() => {
    return notifications.value.length > 0
  })

  /**
   * Initialize notifications (fetch on mount)
   */
  const initialize = (): (() => void) | null => {
    if (process.client) {
      fetchNotifications(true)
      
      // Set up periodic refresh (every 2 minutes)
      const interval = setInterval(() => {
        fetchNotifications()
      }, 120000)
      
      // Cleanup on unmount
      return () => clearInterval(interval)
    }
    return null
  }

  return {
    notifications,
    loading,
    unreadCount,
    hasNotifications,
    fetchNotifications,
    initialize
  }
}

