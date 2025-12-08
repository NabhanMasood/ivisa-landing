/**
 * Cache utility composable
 * Provides localStorage-based caching with expiration and versioning
 */

interface CacheItem<T> {
    data: T
    timestamp: number
    expiresIn: number // milliseconds
    version?: string // Cache version for invalidation
}

const DEFAULT_CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const CACHE_VERSION_KEY = 'cache_version' // Global cache version key

/**
 * Get cached data if it exists and hasn't expired
 */
export const getCachedData = <T>(key: string, maxAge?: number): T | null => {
    if (typeof window === 'undefined') return null

    try {
        const cached = localStorage.getItem(key)
        if (!cached) return null

        const item: CacheItem<T> = JSON.parse(cached)
        const now = Date.now()

        // Check cache version - if global version changed, invalidate all caches
        const globalVersion = localStorage.getItem(CACHE_VERSION_KEY)
        if (item.version && globalVersion && item.version !== globalVersion) {
            console.log(`🔄 Cache version mismatch for "${key}", invalidating...`)
            localStorage.removeItem(key)
            return null
        }

        // Check if expired (use maxAge if provided, otherwise use item.expiresIn)
        const expirationTime = maxAge !== undefined ? maxAge : item.expiresIn
        if (now - item.timestamp > expirationTime) {
            console.log(`⏰ Cache expired for "${key}"`)
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
    expiresIn: number = DEFAULT_CACHE_DURATION,
    version?: string
): void => {
    if (typeof window === 'undefined') return

    try {
        // Get current global cache version or create one
        let cacheVersion = localStorage.getItem(CACHE_VERSION_KEY)
        if (!cacheVersion) {
            cacheVersion = Date.now().toString()
            localStorage.setItem(CACHE_VERSION_KEY, cacheVersion)
        }

        const item: CacheItem<T> = {
            data,
            timestamp: Date.now(),
            expiresIn,
            version: version || cacheVersion, // Use provided version or current global version
        }
        localStorage.setItem(key, JSON.stringify(item))
    } catch (error) {
        console.error(`Error setting cache for key "${key}":`, error)
        // Handle quota exceeded error
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            // Clear old cache entries
            clearOldCache()
            try {
                let cacheVersion = localStorage.getItem(CACHE_VERSION_KEY)
                if (!cacheVersion) {
                    cacheVersion = Date.now().toString()
                    localStorage.setItem(CACHE_VERSION_KEY, cacheVersion)
                }
                const item: CacheItem<T> = {
                    data,
                    timestamp: Date.now(),
                    expiresIn,
                    version: version || cacheVersion,
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

/**
 * Invalidate all caches by updating the global cache version
 * Call this when admin makes changes to force cache refresh
 */
export const invalidateAllCache = (): void => {
    if (typeof window === 'undefined') return

    const newVersion = Date.now().toString()
    localStorage.setItem(CACHE_VERSION_KEY, newVersion)
    console.log('🔄 All caches invalidated with new version:', newVersion)
}

/**
 * Invalidate specific cache keys
 */
export const invalidateCacheKeys = (keys: string[]): void => {
    if (typeof window === 'undefined') return

    keys.forEach(key => {
        localStorage.removeItem(key)
        console.log(`🗑️ Cache invalidated: ${key}`)
    })

    // Also update global version to invalidate related caches
    invalidateAllCache()
}

/**
 * Invalidate all visa product caches (for all nationality-destination combinations)
 */
export const invalidateVisaProductCaches = (): void => {
    if (typeof window === 'undefined') return

    const keys = Object.keys(localStorage)
    const visaProductKeys = keys.filter(key => key.startsWith('cache_visa_products_'))

    visaProductKeys.forEach(key => {
        localStorage.removeItem(key)
        console.log(`🗑️ Visa product cache invalidated: ${key}`)
    })

    // Also update global version
    invalidateAllCache()
}

/**
 * Get current cache version
 */
export const getCacheVersion = (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(CACHE_VERSION_KEY)
}

/**
 * Expose cache utilities to window for debugging/manual cache clearing
 * Usage in browser console: window.clearAllCache() or window.invalidateCache()
 */
if (typeof window !== 'undefined') {
    (window as any).clearAllCache = () => {
        clearAllCache()
        invalidateAllCache()
        console.log('✅ All caches cleared! Refresh the page to see updated data.')
    }

    (window as any).invalidateCache = () => {
        invalidateAllCache()
        console.log('✅ Cache invalidated! Data will be refreshed on next request.')
    }

    (window as any).clearCacheKeys = (keys: string[]) => {
        invalidateCacheKeys(keys)
        console.log('✅ Specified cache keys cleared!')
    }

    (window as any).clearVisaProductCaches = () => {
        invalidateVisaProductCaches()
        console.log('✅ All visa product caches cleared! Refresh the page to see updated prices.')
    }
}

