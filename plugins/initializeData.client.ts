/**
 * Client-side plugin to initialize and cache countries and visa products data
 * Runs once when the app starts
 */

export default defineNuxtPlugin(async () => {
    const { getCachedData, setCachedData, CACHE_KEYS } = await import('~/composables/useCache')
    const { useCountriesApi } = await import('~/composables/useCountries')
    const { useVisaProductsApi } = await import('~/composables/useVisaProducts')

    // Helper function to fetch fresh data
    async function fetchFreshDataInBackground() {
        console.log('🔄 Fetching countries and visa products data...')

        try {
            const { getCountries } = useCountriesApi()
            const { getGroupedVisaProductsByCountries } = useVisaProductsApi()

            // Fetch countries
            const countriesResponse = await getCountries(true) // Force fresh fetch
            if (countriesResponse.success && countriesResponse.data) {
                setCachedData(CACHE_KEYS.COUNTRIES, countriesResponse.data, 2 * 60 * 1000) // 2 minutes
                console.log('✅ Countries cached:', countriesResponse.data.length)
            }

            // Fetch destination countries (visa products grouped by countries)
            const destinationsResponse = await getGroupedVisaProductsByCountries(true) // Force fresh fetch
            if (destinationsResponse.success && destinationsResponse.data) {
                setCachedData(CACHE_KEYS.DESTINATION_COUNTRIES, destinationsResponse.data, 2 * 60 * 1000) // 2 minutes
                console.log('✅ Destination countries cached:', destinationsResponse.data.length)
            }
        } catch (error) {
            console.error('❌ Error initializing data:', error)
            // Don't throw - app should still work with cached data if available
        }
    }

    // Check if we already have fresh cached data (less than 2 minutes old)
    // Use shorter maxAge to ensure we check for updates more frequently
    const cachedCountries = getCachedData<any[]>(CACHE_KEYS.COUNTRIES, 2 * 60 * 1000)
    const cachedDestinations = getCachedData<any[]>(CACHE_KEYS.DESTINATION_COUNTRIES, 2 * 60 * 1000)

    // If we have cached data, use it but still fetch in background to update cache
    if (cachedCountries && cachedDestinations) {
        console.log('✅ Using cached countries and visa products data')
        // Still fetch in background to update cache if needed
        fetchFreshDataInBackground()
        return
    }

    // Fetch fresh data immediately if cache is missing or expired
    await fetchFreshDataInBackground()
})

