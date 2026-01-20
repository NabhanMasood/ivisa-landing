// composables/useGeolocation.ts

interface GeolocationData {
  countryCode: string
  countryName: string
}

const CACHE_KEY = 'user-geolocation'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Geolocation composable for detecting user's country based on IP
 * Uses ipapi.co as primary API and ipwho.is as fallback
 */
export const useGeolocation = () => {
  /**
   * Get cached geolocation data from localStorage
   */
  const getCachedGeolocation = (): GeolocationData | null => {
    if (!process.client) return null

    try {
      const cached = localStorage.getItem(CACHE_KEY)
      const timestamp = localStorage.getItem(`${CACHE_KEY}-timestamp`)

      if (cached && timestamp) {
        const cacheAge = Date.now() - new Date(timestamp).getTime()
        if (cacheAge < CACHE_DURATION) {
          return JSON.parse(cached)
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to read geolocation cache:', error)
    }

    return null
  }

  /**
   * Cache geolocation data to localStorage
   */
  const setCachedGeolocation = (data: GeolocationData): void => {
    if (!process.client) return

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data))
      localStorage.setItem(`${CACHE_KEY}-timestamp`, new Date().toISOString())
    } catch (error) {
      console.warn('⚠️ Failed to cache geolocation:', error)
    }
  }

  /**
   * Detect user's country based on IP address
   * Returns country code (e.g., "IN" for India, "PK" for Pakistan)
   */
  const detectCountry = async (): Promise<GeolocationData | null> => {
    // Check cache first
    const cached = getCachedGeolocation()
    if (cached) {
      console.log('🌍 Using cached geolocation:', cached)
      return cached
    }

    try {
      let data: any = null

      // Try primary API: ipapi.co
      try {
        const response = await fetch('https://ipapi.co/json/', {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        })

        if (response.ok) {
          data = await response.json()
          console.log('🌍 Primary API (ipapi.co) response:', {
            country_code: data.country_code,
            country_name: data.country_name
          })
        } else {
          throw new Error(`ipapi.co returned ${response.status}`)
        }
      } catch (primaryError) {
        console.warn('⚠️ Primary geolocation API failed, trying fallback...', primaryError)

        // Fallback API: ipwho.is
        try {
          const fallbackResponse = await fetch('https://ipwho.is/', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          })

          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json()
            if (fallbackData.success !== false) {
              data = {
                country_code: fallbackData.country_code,
                country_name: fallbackData.country
              }
              console.log('🌍 Fallback API (ipwho.is) response:', data)
            } else {
              throw new Error('ipwho.is returned unsuccessful response')
            }
          } else {
            throw new Error(`ipwho.is returned ${fallbackResponse.status}`)
          }
        } catch (fallbackError) {
          console.warn('⚠️ Fallback geolocation API also failed:', fallbackError)
          throw new Error('All geolocation APIs failed')
        }
      }

      if (!data) {
        throw new Error('No data received from geolocation APIs')
      }

      const result: GeolocationData = {
        countryCode: (data.country_code || '').toUpperCase(),
        countryName: data.country_name || ''
      }

      console.log('🌍 Detected user country:', result)

      // Cache the result
      setCachedGeolocation(result)

      return result
    } catch (error) {
      console.warn('⚠️ Failed to detect country from IP:', error)
      return null
    }
  }

  /**
   * Clear cached geolocation data
   */
  const clearCache = (): void => {
    if (!process.client) return

    try {
      localStorage.removeItem(CACHE_KEY)
      localStorage.removeItem(`${CACHE_KEY}-timestamp`)
    } catch (error) {
      console.warn('⚠️ Failed to clear geolocation cache:', error)
    }
  }

  return {
    detectCountry,
    getCachedGeolocation,
    clearCache
  }
}
