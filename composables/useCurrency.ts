// composables/useCurrency.ts
import { ref, computed } from 'vue'

export interface Currency {
  code: string
  symbol: string
  name: string
}

// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  INR: '₹',
  PKR: 'Rs',
  AED: 'AED',
  SAR: 'SAR',
  QAR: 'QAR',
  OMR: 'OMR',
  KWD: 'KWD',
  BHD: 'BHD',
  CAD: 'C$',
  AUD: 'AUD',
  NZD: 'NZD',
  CHF: 'CHF',
  SEK: 'kr',
  NOK: 'NOK',
  DKK: 'DKK',
  RUB: '₽',
  TRY: '₺',
  BRL: 'R$',
  MXN: 'Mex$',
  ZAR: 'ZAR',
  KRW: 'KRW',
  THB: 'THB',
  SGD: 'SGD',
  MYR: 'MYR',
  IDR: 'IDR',
  PHP: 'PHP',
  VND: 'VND',
}

// Currency names
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

export const useCurrency = () => {
  // Store currency in state
  const selectedCurrency = useState<Currency>('selected-currency', () => {
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
      symbol: CURRENCY_SYMBOLS[code] || code,
      name: CURRENCY_NAMES[code] || code
    }
  }

  // Fetch exchange rates from Fawazahmed0 API (Free, supports PKR!)
  const fetchExchangeRates = async () => {
    try {
      isLoading.value = true

      // Using Fawazahmed0 API - free, no API key needed
      const url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json'
      console.log('🔗 Fetching exchange rates from Fawazahmed0 API:', url)

      const response = await fetch(url)

      console.log('📡 API Response status:', response.status, response.statusText)

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      console.log('📦 API Response data:', {
        date: data.date,
        rates_count: Object.keys(data.usd || {}).length
      })

      // Transform the data format
      // Fawazahmed0 returns: { date: "2024-12-09", usd: { pkr: 278.5, eur: 0.95, ... } }
      const rates = data.usd

      if (!rates) {
        throw new Error('No exchange rates found in API response')
      }

      // Convert to uppercase keys and add USD base
      exchangeRates.value = {
        USD: 1,
        ...Object.fromEntries(
          Object.entries(rates).map(([key, value]) => [
            key.toUpperCase(),
            value as number
          ])
        )
      }

      // Generate available currencies - only show ALLOWED_CURRENCIES
      const sorted = ALLOWED_CURRENCIES
        .map(code => {
          if (!exchangeRates.value[code] && code !== 'USD') {
            console.warn(`⚠️ Currency ${code} not found in API response`)
          }
          return getCurrencyObject(code)
        })

      // Filter to only show currencies that exist in API response
      availableCurrencies.value = sorted.filter(currency =>
        exchangeRates.value[currency.code] !== undefined || currency.code === 'USD'
      )

      // Log missing currencies
      const missingCurrencies = ALLOWED_CURRENCIES.filter(code =>
        !exchangeRates.value[code] && code !== 'USD'
      )
      if (missingCurrencies.length > 0) {
        console.warn(`⚠️ Missing currencies: ${missingCurrencies.join(', ')}`)
      }

      lastFetched.value = new Date()

      console.log('✅ Exchange rates fetched successfully!')
      console.log('💱 Total currencies in API response:', Object.keys(exchangeRates.value).length)
      console.log('💱 Available currencies for dropdown:', availableCurrencies.value.length)

      // Log requested currencies status
      console.log('📋 Requested currencies status:')
      ALLOWED_CURRENCIES.forEach(code => {
        const hasRate = exchangeRates.value[code] !== undefined || code === 'USD'
        const rate = exchangeRates.value[code] || (code === 'USD' ? 1 : 'N/A')
        console.log(`  ${hasRate ? '✅' : '❌'} ${code}: ${rate}`)
      })

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

      // Store in localStorage for caching
      if (process.client) {
        localStorage.setItem('exchange-rates', JSON.stringify(exchangeRates.value))
        localStorage.setItem('available-currencies', JSON.stringify(availableCurrencies.value))
        localStorage.setItem('exchange-rates-timestamp', lastFetched.value.toISOString())
        localStorage.setItem('exchange-rates-version', '2.0') // Updated version for new API
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
              const parsed = JSON.parse(cachedCurrencies)
              availableCurrencies.value = parsed
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

  // Check if rates need refreshing (older than 6 hours)
  const shouldRefreshRates = () => {
    if (!lastFetched.value) return true

    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000)
    return lastFetched.value < sixHoursAgo
  }

  // Country to Currency mapping
  const COUNTRY_TO_CURRENCY: Record<string, string> = {
    'PK': 'PKR',
    'PAK': 'PKR',
    'PAKISTAN': 'PKR',
    'SA': 'SAR',
    'SAU': 'SAR',
    'SAUDI ARABIA': 'SAR',
    'AE': 'AED',
    'UAE': 'AED',
    'UNITED ARAB EMIRATES': 'AED',
    'IN': 'INR',
    'IND': 'INR',
    'INDIA': 'INR',
    'QA': 'QAR',
    'QAT': 'QAR',
    'QATAR': 'QAR',
  }

  // Detect user's country and return currency code
  const detectCountryCurrency = async (): Promise<string> => {
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
            headers: { 'Accept': 'application/json' }
          })

          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json()
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

      console.log('🌍 Detected country:', { countryCode, countryName })

      // Map country to currency
      let currencyCode = 'USD'

      if (countryCode && COUNTRY_TO_CURRENCY[countryCode]) {
        currencyCode = COUNTRY_TO_CURRENCY[countryCode]
        console.log('✅ Matched by country code:', countryCode, '→', currencyCode)
      } else if (countryName && COUNTRY_TO_CURRENCY[countryName]) {
        currencyCode = COUNTRY_TO_CURRENCY[countryName]
        console.log('✅ Matched by country name:', countryName, '→', currencyCode)
      } else {
        console.log('⚠️ No currency mapping found, defaulting to USD')
      }

      console.log('💰 Final auto-detected currency:', currencyCode)

      return currencyCode
    } catch (error) {
      console.warn('⚠️ Failed to detect country, defaulting to USD:', error)
      return 'USD'
    }
  }

  // Initialize rates
  const initializeRates = async () => {
    const CACHE_VERSION = '2.0' // Updated for new API

    // Try to load from localStorage first
    if (process.client) {
      const cached = localStorage.getItem('exchange-rates')
      const cachedCurrencies = localStorage.getItem('available-currencies')
      const timestamp = localStorage.getItem('exchange-rates-timestamp')
      const cacheVersion = localStorage.getItem('exchange-rates-version')

      // Check if cache is valid
      if (cached && timestamp && cacheVersion === CACHE_VERSION) {
        try {
          const parsedRates = JSON.parse(cached)

          // Verify cache has sufficient data
          if (Object.keys(parsedRates).length > 100) {
            exchangeRates.value = parsedRates

            if (cachedCurrencies) {
              const parsed = JSON.parse(cachedCurrencies)
              availableCurrencies.value = parsed
                .filter((currency: Currency) => ALLOWED_CURRENCIES.includes(currency.code))
                .sort((a: Currency, b: Currency) =>
                  ALLOWED_CURRENCIES.indexOf(a.code) - ALLOWED_CURRENCIES.indexOf(b.code)
                )
            }

            lastFetched.value = new Date(timestamp)
            console.log('📦 Loaded cached rates from:', lastFetched.value.toLocaleString())
          } else {
            console.warn('⚠️ Cached data incomplete, will fetch fresh data')
            localStorage.removeItem('exchange-rates')
            localStorage.removeItem('available-currencies')
            localStorage.removeItem('exchange-rates-timestamp')
            localStorage.removeItem('exchange-rates-version')
          }
        } catch (error) {
          console.error('❌ Failed to parse cached rates:', error)
          localStorage.removeItem('exchange-rates')
          localStorage.removeItem('available-currencies')
          localStorage.removeItem('exchange-rates-timestamp')
          localStorage.removeItem('exchange-rates-version')
        }
      } else {
        if (!cacheVersion || cacheVersion !== CACHE_VERSION) {
          console.log('🔄 Cache version mismatch, clearing old cache...')
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
        try {
          selectedCurrency.value = JSON.parse(savedCurrency)
          console.log('💰 Restored manual currency preference:', selectedCurrency.value.code)
        } catch (e) {
          console.error('❌ Error parsing saved currency:', e)
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
        console.log('🌍 Detecting location for currency...')
        const detectedCurrencyCode = await detectCountryCurrency()
        const detectedCurrency = getCurrencyObject(detectedCurrencyCode)

        if (ALLOWED_CURRENCIES.includes(detectedCurrencyCode)) {
          selectedCurrency.value = detectedCurrency
          localStorage.setItem('selected-currency', JSON.stringify(detectedCurrency))
          localStorage.setItem('currency-manually-selected', 'false')
          console.log('✅ Auto-set currency based on location:', detectedCurrencyCode)
        } else {
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
    }
  }

  // Set selected currency
  const setCurrency = (currency: Currency) => {
    selectedCurrency.value = currency
    console.log('💱 Currency changed to:', currency.code)
    console.log('💱 Current rate:', exchangeRates.value[currency.code])

    if (process.client) {
      localStorage.setItem('selected-currency', JSON.stringify(currency))
      localStorage.setItem('currency-manually-selected', 'true')
    }
  }

  // Convert amount from USD to selected currency
  const convertFromUSD = (amountInUSD: number, isInCents: boolean = false): number => {
    const rate = exchangeRates.value[selectedCurrency.value.code]

    if (!rate) {
      console.warn(`⚠️ No exchange rate found for ${selectedCurrency.value.code}`)
      return amountInUSD
    }

    const amountInDollars = isInCents ? amountInUSD / 100 : amountInUSD
    return amountInDollars * rate
  }

  // Format price with currency symbol
  const formatPrice = (amountInUSD: number, showCurrencyCode: boolean = false, isInCents: boolean = false): string => {
    const convertedAmount = convertFromUSD(amountInUSD, isInCents)
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
    availableCurrencies,
    isLoading,
    fetchExchangeRates,
    initializeRates,
    setCurrency,
    convertFromUSD,
    formatPrice,
    getCurrentRate
  }
}