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
  PKR: '₨',
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

// Popular currencies to show first
const POPULAR_CURRENCIES = ['USD', 'EUR', 'GBP', 'AED', 'SAR', 'PKR', 'INR', 'QAR', 'OMR', 'KWD']

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

      // Generate available currencies from the API response
      const currencyCodes = Object.keys(exchangeRates.value)
      
      // Separate popular and other currencies
      const popular = currencyCodes
        .filter(code => POPULAR_CURRENCIES.includes(code))
        .sort((a, b) => POPULAR_CURRENCIES.indexOf(a) - POPULAR_CURRENCIES.indexOf(b))
        .map(getCurrencyObject)
      
      const others = currencyCodes
        .filter(code => !POPULAR_CURRENCIES.includes(code))
        .sort()
        .map(getCurrencyObject)
      
      // Combine: popular first, then alphabetical
      availableCurrencies.value = [...popular, ...others]
      
      lastFetched.value = new Date()
      
      console.log('✅ Exchange rates fetched successfully!')
      console.log('💱 Total currencies loaded:', Object.keys(exchangeRates.value).length)
      console.log('💱 Available currencies for dropdown:', availableCurrencies.value.length)
      console.log('💱 Sample rates:', {
        USD: exchangeRates.value.USD,
        PKR: exchangeRates.value.PKR,
        AED: exchangeRates.value.AED,
        SAR: exchangeRates.value.SAR,
        EUR: exchangeRates.value.EUR,
        GBP: exchangeRates.value.GBP
      })
      
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
              availableCurrencies.value = JSON.parse(cachedCurrencies)
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
            
            // Load cached currencies
            if (cachedCurrencies) {
              availableCurrencies.value = JSON.parse(cachedCurrencies)
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
      if (savedCurrency) {
        try {
          selectedCurrency.value = JSON.parse(savedCurrency)
          console.log('💰 Restored currency preference:', selectedCurrency.value.code)
        } catch (e) {
          console.error('❌ Error parsing saved currency:', e)
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
    
    // Save to localStorage
    if (process.client) {
      localStorage.setItem('selected-currency', JSON.stringify(currency))
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