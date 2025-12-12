import { ref, computed, onMounted } from 'vue'
import { useVisaApplications, type VisaApplication, type ResubmissionRequest } from './useVisaApplications'

export interface NotificationItem {
  id: string
  applicationId: number
  applicationNumber: string
  message: string
  requestedAt: Date | string
  type: 'resubmission' | 'completed'
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
    // Only show resubmission notifications if the status indicates it
    // Don't rely on resubmissionRequests array alone as it may have stale data
    if (app.status !== 'resubmission' && app.status !== 'Additional Info required') {
      return false
    }

    console.log(`🔔 App ${app.id} (${app.applicationNumber}) has resubmission status: ${app.status}`)
    return true
  }

  /**
   * Get completed application completion times from localStorage
   * Returns a map of applicationId -> completion timestamp
   */
  const getCompletedAppTimes = (): Map<number, number> => {
    if (process.client) {
      try {
        const stored = localStorage.getItem('completed-app-times')
        if (stored) {
          const data = JSON.parse(stored) as Record<string, number>
          return new Map(Object.entries(data).map(([id, time]) => [Number(id), time]))
        }
      } catch (error) {
        console.error('❌ Error reading completed app times:', error)
      }
    }
    return new Map()
  }

  /**
   * Save completed application completion time
   */
  const saveCompletedAppTime = (applicationId: number, completionTime: number) => {
    if (process.client) {
      try {
        const times = getCompletedAppTimes()
        times.set(applicationId, completionTime)
        const data = Object.fromEntries(times)
        localStorage.setItem('completed-app-times', JSON.stringify(data))
      } catch (error) {
        console.error('❌ Error saving completed app time:', error)
      }
    }
  }

  /**
   * Check if completed notification should be shown
   * Show notifications for 7 days after completion
   */
  const shouldShowCompletedNotification = (app: VisaApplication): boolean => {
    if (app.status !== 'completed') return false

    const completedTimes = getCompletedAppTimes()
    const completionTime = completedTimes.get(app.id)
    const appUpdatedTime = app.updatedAt ? new Date(app.updatedAt).getTime() : Date.now()

    // If we haven't tracked this completion yet, save it and show notification
    if (!completionTime) {
      saveCompletedAppTime(app.id, appUpdatedTime)
      return true
    }

    // Show notification for 7 days (604800000 ms) after completion
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000
    const timeSinceCompletion = Date.now() - completionTime

    // If the app was updated more recently, update the completion time
    if (appUpdatedTime > completionTime) {
      saveCompletedAppTime(app.id, appUpdatedTime)
      return true
    }

    return timeSinceCompletion < sevenDaysInMs
  }

  /**
   * Convert application to notification items
   */
  const applicationToNotifications = (app: VisaApplication): NotificationItem[] => {
    const items: NotificationItem[] = []

    // Check for completed status
    if (shouldShowCompletedNotification(app)) {
      items.push({
        id: `completed-${app.id}`,
        applicationId: app.id,
        applicationNumber: app.applicationNumber,
        message: `Your application process has been completed. Application #${app.applicationNumber}`,
        requestedAt: app.updatedAt || app.submittedAt || app.createdAt,
        type: 'completed'
      })
    }

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

        console.log(`✅ Fetched ${allNotifications.length} notifications:`, allNotifications.map(n => ({ id: n.id, type: n.type, appNumber: n.applicationNumber })))
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

