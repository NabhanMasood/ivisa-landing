/**
 * Cache utility composable
 * Provides localStorage-based caching with expiration
 */

interface CacheItem<T> {
    data: T
    timestamp: number
    expiresIn: number // milliseconds
}

const DEFAULT_CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Get cached data if it exists and hasn't expired
 */
export const getCachedData = <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null

    try {
        const cached = localStorage.getItem(key)
        if (!cached) return null

        const item: CacheItem<T> = JSON.parse(cached)
        const now = Date.now()

        // Check if expired
        if (now - item.timestamp > item.expiresIn) {
            localStorage.removeItem(key)
            return null
        }

        return item.data
    } catch (error) {
        console.error(`Error reading cache for key "${key}":`, error)
        return null
    }
}

/**
 * Set data in cache with expiration
 */
export const setCachedData = <T>(
    key: string,
    data: T,
    expiresIn: number = DEFAULT_CACHE_DURATION
): void => {
    if (typeof window === 'undefined') return

    try {
        const item: CacheItem<T> = {
            data,
            timestamp: Date.now(),
            expiresIn,
        }
        localStorage.setItem(key, JSON.stringify(item))
    } catch (error) {
        console.error(`Error setting cache for key "${key}":`, error)
        // Handle quota exceeded error
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            // Clear old cache entries
            clearOldCache()
            try {
                const item: CacheItem<T> = {
                    data,
                    timestamp: Date.now(),
                    expiresIn,
                }
                localStorage.setItem(key, JSON.stringify(item))
            } catch (retryError) {
                console.error('Failed to cache after cleanup:', retryError)
            }
        }
    }
}

/**
 * Clear a specific cache key
 */
export const clearCache = (key: string): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
}

/**
 * Clear all cache entries
 */
export const clearAllCache = (): void => {
    if (typeof window === 'undefined') return

    const keys = Object.keys(localStorage)
    keys.forEach(key => {
        if (key.startsWith('cache_')) {
            localStorage.removeItem(key)
        }
    })
}

/**
 * Clear expired cache entries
 */
export const clearOldCache = (): void => {
    if (typeof window === 'undefined') return

    const keys = Object.keys(localStorage)
    const now = Date.now()

    keys.forEach(key => {
        if (key.startsWith('cache_')) {
            try {
                const cached = localStorage.getItem(key)
                if (cached) {
                    const item: CacheItem<unknown> = JSON.parse(cached)
                    if (now - item.timestamp > item.expiresIn) {
                        localStorage.removeItem(key)
                    }
                }
            } catch (error) {
                // Remove invalid cache entries
                localStorage.removeItem(key)
            }
        }
    })
}

/**
 * Cache keys
 */
export const CACHE_KEYS = {
    COUNTRIES: 'cache_countries',
    DESTINATION_COUNTRIES: 'cache_destination_countries',
    VISA_PRODUCTS: 'cache_visa_products',
    EXCHANGE_RATES: 'cache_exchange_rates',
} as const

