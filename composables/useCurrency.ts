// composables/useCurrency.ts
import { ref, computed } from 'vue'

export interface Currency {
  code: string
  symbol: string
  name: string
}

// Currency symbols mapping (add more as needed)
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  INR: '₹',
  PKR: 'Rs',
  AED: 'د.إ',
  SAR: 'ر.س',
  QAR: 'ر.ق',
  OMR: 'ر.ع.',
  KWD: 'د.ك',
  BHD: 'د.ب',
  CAD: 'C$',
  AUD: 'A$',
  NZD: 'NZ$',
  CHF: 'CHF',
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr',
  RUB: '₽',
  TRY: '₺',
  BRL: 'R$',
  MXN: 'Mex$',
  ZAR: 'R',
  KRW: '₩',
  THB: '฿',
  SGD: 'S$',
  MYR: 'RM',
  IDR: 'Rp',
  PHP: '₱',
  VND: '₫',
  // Add default for others
}

// Currency names (expanded list)
const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  CNY: 'Chinese Yuan',
  INR: 'Indian Rupee',
  PKR: 'Pakistani Rupee',
  AED: 'UAE Dirham',
  SAR: 'Saudi Riyal',
  QAR: 'Qatari Riyal',
  OMR: 'Omani Rial',
  KWD: 'Kuwaiti Dinar',
  BHD: 'Bahraini Dinar',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  NZD: 'New Zealand Dollar',
  CHF: 'Swiss Franc',
  SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone',
  DKK: 'Danish Krone',
  RUB: 'Russian Ruble',
  TRY: 'Turkish Lira',
  BRL: 'Brazilian Real',
  MXN: 'Mexican Peso',
  ZAR: 'South African Rand',
  KRW: 'South Korean Won',
  THB: 'Thai Baht',
  SGD: 'Singapore Dollar',
  MYR: 'Malaysian Ringgit',
  IDR: 'Indonesian Rupiah',
  PHP: 'Philippine Peso',
  VND: 'Vietnamese Dong',
  EGP: 'Egyptian Pound',
  NGN: 'Nigerian Naira',
  KES: 'Kenyan Shilling',
  GHS: 'Ghanaian Cedi',
  // Add more as needed
}

// Allowed currencies - only these will be shown in the dropdown
const ALLOWED_CURRENCIES = [
  'USD',  // US Dollar
  'EUR',  // Euro
  'GBP',  // British Pound
  'AED',  // UAE Dirham
  'SAR',  // Saudi Riyal
  'PKR',  // Pakistani Rupee
  'INR',  // Indian Rupee
  'QAR',  // Qatari Riyal
  'AUD',  // Australian Dollar
  'CNY',  // Chinese Yuan
  'MXN',  // Mexican Peso
  'MYR',  // Malaysian Ringgit
  'PHP',  // Philippine Peso
  'RUB',  // Russian Ruble
  'TRY',  // Turkish Lira
]

// Popular currencies to show first (same as allowed for now)
const POPULAR_CURRENCIES = [
  'USD',  // US Dollar
  'EUR',  // Euro
  'GBP',  // British Pound
  'AED',  // UAE Dirham
  'SAR',  // Saudi Riyal
  'PKR',  // Pakistani Rupee
  'INR',  // Indian Rupee
  'QAR',  // Qatari Riyal
  'AUD',  // Australian Dollar
  'CNY',  // Chinese Yuan
  'MXN',  // Mexican Peso
  'MYR',  // Malaysian Ringgit
  'PHP',  // Philippine Peso
  'RUB',  // Russian Ruble
  'TRY',  // Turkish Lira
]

export const useCurrency = () => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.currencyApiUrl || 'https://v6.exchangerate-api.com/v6'
  const apiKey = config.public.currencyApiKey

  // Store currency in localStorage or cookie
  const selectedCurrency = useState<Currency>('selected-currency', () => {
    // Default to USD
    return {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar'
    }
  })

  const exchangeRates = useState<Record<string, number>>('exchange-rates', () => ({}))
  const availableCurrencies = useState<Currency[]>('available-currencies', () => [])
  const isLoading = ref(false)
  const lastFetched = ref<Date | null>(null)

  // Generate currency object from code
  const getCurrencyObject = (code: string): Currency => {
    return {
      code,
      symbol: CURRENCY_SYMBOLS[code] || '',
      name: CURRENCY_NAMES[code] || code
    }
  }

  // Fetch exchange rates from ExchangeRate-API
  const fetchExchangeRates = async () => {
    try {
      isLoading.value = true

      // Check if API key is configured
      if (!apiKey) {
        console.error('❌ Currency API key not configured!')
        console.error('Please add NUXT_PUBLIC_CURRENCY_API_KEY to your .env file')
        throw new Error('Currency API key not configured')
      }

      const url = `${apiUrl}/${apiKey}/latest/USD`
      console.log('🔗 Fetching exchange rates from:', url)

      const response = await fetch(url)

      console.log('📡 API Response status:', response.status, response.statusText)

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      console.log('📦 API Response data:', {
        result: data.result,
        base_code: data.base_code,
        rates_count: Object.keys(data.conversion_rates || {}).length
      })

      if (data.result !== 'success') {
        console.error('❌ API returned error:', data)
        throw new Error(data['error-type'] || 'API request failed')
      }

      // Store rates
      exchangeRates.value = {
        USD: 1,
        ...data.conversion_rates
      }

      // Generate available currencies - show all ALLOWED_CURRENCIES
      // Check which ones are available in the API response
      const sorted = ALLOWED_CURRENCIES
        .map(code => {
          // Log warning if currency is not in API response
          if (!exchangeRates.value[code] && code !== 'USD') {
            console.warn(`⚠️ Currency ${code} not found in API response - it may not be available for conversion`)
          }
          return getCurrencyObject(code)
        })

      // Filter to only show currencies that exist in API response (or USD)
      // This ensures we only show currencies that can actually be converted
      availableCurrencies.value = sorted.filter(currency =>
        exchangeRates.value[currency.code] !== undefined || currency.code === 'USD'
      )

      // Log which currencies are missing
      const missingCurrencies = ALLOWED_CURRENCIES.filter(code =>
        !exchangeRates.value[code] && code !== 'USD'
      )
      if (missingCurrencies.length > 0) {
        console.warn(`⚠️ The following currencies are not available in the API: ${missingCurrencies.join(', ')}`)
        console.warn('💡 These currencies will not appear in the dropdown until the API supports them')
      }

      lastFetched.value = new Date()

      console.log('✅ Exchange rates fetched successfully!')
      console.log('💱 Total currencies in API response:', Object.keys(exchangeRates.value).length)
      console.log('💱 Available currencies for dropdown:', availableCurrencies.value.length)

      // Log all requested currencies and their status
      console.log('📋 Requested currencies status:')
      ALLOWED_CURRENCIES.forEach(code => {
        const hasRate = exchangeRates.value[code] !== undefined || code === 'USD'
        const rate = exchangeRates.value[code] || (code === 'USD' ? 1 : 'N/A')
        console.log(`  ${hasRate ? '✅' : '❌'} ${code}: ${rate}`)
      })

      // Log which currencies are in the dropdown
      console.log('💰 Currencies in dropdown:', availableCurrencies.value.map(c => c.code).join(', '))

      // Log sample rates for verification
      console.log('💱 Sample rates:', {
        USD: exchangeRates.value.USD,
        PKR: exchangeRates.value.PKR,
        AED: exchangeRates.value.AED,
        SAR: exchangeRates.value.SAR,
        EUR: exchangeRates.value.EUR,
        GBP: exchangeRates.value.GBP,
        AUD: exchangeRates.value.AUD,
        CNY: exchangeRates.value.CNY,
        MXN: exchangeRates.value.MXN,
        MYR: exchangeRates.value.MYR,
        PHP: exchangeRates.value.PHP,
        RUB: exchangeRates.value.RUB,
        TRY: exchangeRates.value.TRY
      })

      // Log full API response for debugging
      console.log('📦 Full exchange rates object:', exchangeRates.value)

      // Store in localStorage for caching
      if (process.client) {
        localStorage.setItem('exchange-rates', JSON.stringify(exchangeRates.value))
        localStorage.setItem('available-currencies', JSON.stringify(availableCurrencies.value))
        localStorage.setItem('exchange-rates-timestamp', lastFetched.value.toISOString())
        localStorage.setItem('exchange-rates-version', '1.0')
        console.log('💾 Rates and currencies cached to localStorage')
      }

      return exchangeRates.value
    } catch (error) {
      console.error('❌ Error fetching exchange rates:', error)

      // Try to load from localStorage as fallback
      if (process.client) {
        const cached = localStorage.getItem('exchange-rates')
        const cachedCurrencies = localStorage.getItem('available-currencies')

        if (cached) {
          try {
            exchangeRates.value = JSON.parse(cached)

            if (cachedCurrencies) {
              const cached = JSON.parse(cachedCurrencies)
              // Filter to only allowed currencies
              availableCurrencies.value = cached
                .filter((currency: Currency) => ALLOWED_CURRENCIES.includes(currency.code))
                .sort((a: Currency, b: Currency) =>
                  ALLOWED_CURRENCIES.indexOf(a.code) - ALLOWED_CURRENCIES.indexOf(b.code)
                )
            }

            const timestamp = localStorage.getItem('exchange-rates-timestamp')
            if (timestamp) {
              lastFetched.value = new Date(timestamp)
            }
            console.log('✅ Using cached exchange rates from localStorage')
            console.log('📅 Cache date:', lastFetched.value?.toLocaleString())
            return exchangeRates.value
          } catch (parseError) {
            console.error('❌ Failed to parse cached rates:', parseError)
          }
        }
      }

      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Check if rates need refreshing (older than 1 hour)
  const shouldRefreshRates = () => {
    if (!lastFetched.value) return true

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    return lastFetched.value < oneHourAgo
  }

  // Country to Currency mapping (case-insensitive keys)
  const COUNTRY_TO_CURRENCY: Record<string, string> = {
    'PK': 'PKR', // Pakistan
    'PAK': 'PKR', // Pakistan (alternative)
    'PAKISTAN': 'PKR', // Pakistan (full name)
    'SA': 'SAR', // Saudi Arabia
    'SAU': 'SAR', // Saudi Arabia (ISO code)
    'SAUDI ARABIA': 'SAR', // Saudi Arabia (full name)
    // Add more mappings as needed
  }

  // Detect user's country and return currency code
  const detectCountryCurrency = async (): Promise<string> => {
    try {
      // Try primary API: ipapi.co
      let data: any = null
      try {
        const response = await fetch('https://ipapi.co/json/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        
        if (response.ok) {
          data = await response.json()
          console.log('🌍 Primary API (ipapi.co) response:', data)
        } else {
          throw new Error(`ipapi.co returned ${response.status}`)
        }
      } catch (primaryError) {
        console.warn('⚠️ Primary API failed, trying fallback...', primaryError)
        
        // Fallback API: ip-api.com
        try {
          const fallbackResponse = await fetch('http://ip-api.com/json/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          })
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json()
            // Map ip-api.com format to our expected format
            data = {
              country_code: fallbackData.countryCode,
              country: fallbackData.countryCode,
              country_name: fallbackData.country
            }
            console.log('🌍 Fallback API (ip-api.com) response:', data)
          } else {
            throw new Error(`ip-api.com returned ${fallbackResponse.status}`)
          }
        } catch (fallbackError) {
          console.warn('⚠️ Fallback API also failed:', fallbackError)
          throw new Error('All geolocation APIs failed')
        }
      }
      
      if (!data) {
        throw new Error('No data received from geolocation APIs')
      }
      
      const countryCode = (data.country_code || data.country || '').toUpperCase()
      const countryName = (data.country_name || '').toUpperCase()
      
      console.log('🌍 Detected country:', {
        countryCode,
        countryName,
        rawData: data
      })
      
      // Map country to currency (check both code and name, case-insensitive)
      let currencyCode = 'USD' // default
      
      if (countryCode && COUNTRY_TO_CURRENCY[countryCode]) {
        currencyCode = COUNTRY_TO_CURRENCY[countryCode]
        console.log('✅ Matched by country code:', countryCode, '→', currencyCode)
      } else if (countryName && COUNTRY_TO_CURRENCY[countryName]) {
        currencyCode = COUNTRY_TO_CURRENCY[countryName]
        console.log('✅ Matched by country name:', countryName, '→', currencyCode)
      } else {
        // Try to find by partial match
        const countryKey = Object.keys(COUNTRY_TO_CURRENCY).find(key => 
          countryCode.includes(key) || countryName.includes(key) ||
          key.includes(countryCode) || key.includes(countryName)
        )
        if (countryKey) {
          currencyCode = COUNTRY_TO_CURRENCY[countryKey]
          console.log('✅ Matched by partial key:', countryKey, '→', currencyCode)
        } else {
          console.log('⚠️ No currency mapping found for:', countryCode || countryName, '- defaulting to USD')
        }
      }
      
      console.log('💰 Final auto-detected currency:', currencyCode, 'for country:', countryCode || countryName)
      
      return currencyCode
    } catch (error) {
      console.warn('⚠️ Failed to detect country, defaulting to USD:', error)
      return 'USD'
    }
  }

  // Initialize rates
  const initializeRates = async () => {

    // Cache version - increment this when API structure changes
    const CACHE_VERSION = '1.0'

    // Try to load from localStorage first
    if (process.client) {
      const cached = localStorage.getItem('exchange-rates')
      const cachedCurrencies = localStorage.getItem('available-currencies')
      const timestamp = localStorage.getItem('exchange-rates-timestamp')
      const cacheVersion = localStorage.getItem('exchange-rates-version')

      // Check if cache is valid (has version and matches current version)
      if (cached && timestamp && cacheVersion === CACHE_VERSION) {
        try {
          const parsedRates = JSON.parse(cached)

          // Verify cache has sufficient data (should have 100+ currencies)
          if (Object.keys(parsedRates).length > 100) {
            exchangeRates.value = parsedRates

            // Load cached currencies and filter to only allowed ones
            if (cachedCurrencies) {
              const cached = JSON.parse(cachedCurrencies)
              // Filter to only allowed currencies
              availableCurrencies.value = cached
                .filter((currency: Currency) => ALLOWED_CURRENCIES.includes(currency.code))
                .sort((a: Currency, b: Currency) =>
                  ALLOWED_CURRENCIES.indexOf(a.code) - ALLOWED_CURRENCIES.indexOf(b.code)
                )
            }

            lastFetched.value = new Date(timestamp)
          } else {
            console.warn('⚠️ Cached data is incomplete, fetching fresh data...')
            localStorage.removeItem('exchange-rates')
            localStorage.removeItem('available-currencies')
            localStorage.removeItem('exchange-rates-timestamp')
            localStorage.removeItem('exchange-rates-version')
          }
        } catch (error) {
          console.error('❌ Failed to parse cached rates:', error)
          // Clear corrupted cache
          localStorage.removeItem('exchange-rates')
          localStorage.removeItem('available-currencies')
          localStorage.removeItem('exchange-rates-timestamp')
          localStorage.removeItem('exchange-rates-version')
        }
      } else {
        if (!cacheVersion || cacheVersion !== CACHE_VERSION) {
          console.log('🔄 Cache version mismatch or missing, clearing old cache...')
          localStorage.removeItem('exchange-rates')
          localStorage.removeItem('available-currencies')
          localStorage.removeItem('exchange-rates-timestamp')
          localStorage.removeItem('exchange-rates-version')
        }
      }

      // Load saved currency preference
      const savedCurrency = localStorage.getItem('selected-currency')
      const hasManualSelection = localStorage.getItem('currency-manually-selected') === 'true'
      
      if (savedCurrency && hasManualSelection) {
        // User has manually selected a currency, respect their choice
        try {
          selectedCurrency.value = JSON.parse(savedCurrency)
          console.log('💰 Restored manual currency preference:', selectedCurrency.value.code)
        } catch (e) {
          console.error('❌ Error parsing saved currency:', e)
          // If parsing fails, treat as no saved preference and auto-detect
          const detectedCurrencyCode = await detectCountryCurrency()
          const detectedCurrency = getCurrencyObject(detectedCurrencyCode)
          
          if (ALLOWED_CURRENCIES.includes(detectedCurrencyCode)) {
            selectedCurrency.value = detectedCurrency
            localStorage.setItem('selected-currency', JSON.stringify(detectedCurrency))
            localStorage.setItem('currency-manually-selected', 'false')
            console.log('✅ Auto-set currency after parse error:', detectedCurrencyCode)
          }
        }
      } else {
        // No saved preference, or saved but not manually selected - detect location and set currency
        console.log('🌍 No saved currency preference or auto-detection needed, detecting location...')
        const detectedCurrencyCode = await detectCountryCurrency()
        const detectedCurrency = getCurrencyObject(detectedCurrencyCode)
        
        // Only set if the detected currency is in our allowed list
        if (ALLOWED_CURRENCIES.includes(detectedCurrencyCode)) {
          selectedCurrency.value = detectedCurrency
          localStorage.setItem('selected-currency', JSON.stringify(detectedCurrency))
          localStorage.setItem('currency-manually-selected', 'false') // Mark as auto-detected
          console.log('✅ Auto-set currency based on location:', detectedCurrencyCode)
        } else {
          // Fallback to USD if detected currency is not in allowed list
          const usdCurrency = getCurrencyObject('USD')
          selectedCurrency.value = usdCurrency
          localStorage.setItem('selected-currency', JSON.stringify(usdCurrency))
          localStorage.setItem('currency-manually-selected', 'false')
          console.log('✅ Detected currency not in allowed list, defaulting to USD')
        }
      }
    }

    // Fetch new rates if needed
    if (shouldRefreshRates()) {
      console.log('🔄 Cache expired or empty, fetching fresh rates...')
      await fetchExchangeRates()
    } else {
    }
  }

  // Set selected currency
  const setCurrency = (currency: Currency) => {
    selectedCurrency.value = currency
    console.log('💱 Currency changed to:', currency.code)
    console.log('💱 Current rate:', exchangeRates.value[currency.code])

    // Save to localStorage and mark as manually selected
    if (process.client) {
      localStorage.setItem('selected-currency', JSON.stringify(currency))
      localStorage.setItem('currency-manually-selected', 'true') // Mark as manual selection
    }
  }

  // Convert amount from USD to selected currency
  const convertFromUSD = (amountInUSD: number): number => {
    const rate = exchangeRates.value[selectedCurrency.value.code]

    if (!rate) {
      console.warn(`⚠️ No exchange rate found for ${selectedCurrency.value.code}`)
      console.warn('Available currencies:', Object.keys(exchangeRates.value))
      return amountInUSD
    }

    return amountInUSD * rate
  }

  // Format price with currency symbol
  const formatPrice = (amountInUSD: number, showCurrencyCode: boolean = false): string => {
    const convertedAmount = convertFromUSD(amountInUSD)
    const formatted = convertedAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    if (showCurrencyCode) {
      return `${selectedCurrency.value.symbol}${formatted} ${selectedCurrency.value.code}`
    }

    return `${selectedCurrency.value.symbol}${formatted}`
  }

  // Get current exchange rate for selected currency
  const getCurrentRate = computed(() => {
    return exchangeRates.value[selectedCurrency.value.code] || 1
  })

  return {
    selectedCurrency,
    exchangeRates,
    availableCurrencies, // Now dynamically populated from API
    isLoading,
    fetchExchangeRates,
    initializeRates,
    setCurrency,
    convertFromUSD,
    formatPrice,
    getCurrentRate
  }
}