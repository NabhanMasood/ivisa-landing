import { useApi, handleApiError, type ApiResponse } from './useApi'

/**
 * Card Info interface
 */
export interface CardInfo {
  id: number
  customerId: number
  cardholderName: string
  cardLast4: string
  cardBrand: string
  expiryMonth: string
  expiryYear: string
  isDefault: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Create Card DTO
 */
export interface CreateCardDto {
  cardholderName: string
  cardLast4: string
  cardBrand: string
  expiryMonth: string
  expiryYear: string
  paymentMethodId?: string
  isDefault?: boolean
}

/**
 * Update Card DTO
 */
export interface UpdateCardDto {
  cardholderName?: string
  expiryMonth?: string
  expiryYear?: string
  isDefault?: boolean
  isActive?: boolean
}

/**
 * Cards list response
 */
export interface CardsListResponse {
  status: boolean
  message: string
  data: CardInfo[]
}

/**
 * Single card response
 */
export interface CardResponse {
  status: boolean
  message: string
  data: CardInfo
}

/**
 * Card Info API Service
 */
export const useCardInfo = () => {
  const api = useApi()
  const { currentUser } = useAuthApi()

  /**
   * Get customer ID from current user
   */
  const getCustomerId = (): number | null => {
    if (process.server) return null
    
    const adminCookie = useCookie('admin_info')
    if (!adminCookie.value) return null
    
    try {
      const adminData = typeof adminCookie.value === 'string' 
        ? JSON.parse(adminCookie.value) 
        : adminCookie.value
      return adminData.id || null
    } catch {
      return null
    }
  }

  /**
   * Get all cards for current customer
   */
  const getCustomerCards = async (customerId?: number): Promise<ApiResponse<CardsListResponse>> => {
    console.log('🔵 useCardInfo.getCustomerCards called')
    
    try {
      const id = customerId || getCustomerId()
      if (!id) {
        throw new Error('Customer ID not found. Please log in.')
      }
      
      console.log('🌐 Fetching cards for customer:', id)
      
      const response = await api.get<CardsListResponse>(
        `/card-info/customer/${id}`
      )
      
      console.log('✅ Cards fetched:', response.data)
      
      return {
        data: response.data,
        message: response.data.message || 'Cards retrieved successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Get cards error:', error)
      const errorMessage = handleApiError(error)
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Get default card for current customer
   */
  const getDefaultCard = async (customerId?: number): Promise<ApiResponse<CardResponse>> => {
    console.log('🔵 useCardInfo.getDefaultCard called')
    
    try {
      const id = customerId || getCustomerId()
      if (!id) {
        throw new Error('Customer ID not found. Please log in.')
      }
      
      console.log('🌐 Fetching default card for customer:', id)
      
      const response = await api.get<CardResponse>(
        `/card-info/customer/${id}/default`
      )
      
      console.log('✅ Default card fetched:', response.data)
      
      return {
        data: response.data,
        message: response.data.message || 'Default card retrieved successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Get default card error:', error)
      const errorMessage = handleApiError(error)
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Get single card by ID
   */
  const getCardById = async (id: number): Promise<ApiResponse<CardResponse>> => {
    console.log('🔵 useCardInfo.getCardById called for:', id)
    
    try {
      const response = await api.get<CardResponse>(
        `/card-info/${id}`
      )
      
      console.log('✅ Card fetched:', response.data)
      
      return {
        data: response.data,
        message: response.data.message || 'Card retrieved successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Get card error:', error)
      const errorMessage = handleApiError(error)
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Add new card
   */
  const addCard = async (cardData: CreateCardDto): Promise<ApiResponse<CardResponse>> => {
    console.log('🔵 useCardInfo.addCard called')
    console.log('📦 Card data:', cardData)
    
    try {
      const customerId = getCustomerId()
      if (!customerId) {
        throw new Error('Customer ID not found. Please log in.')
      }
      
      // Include customerId in the payload
      const payload = {
        ...cardData,
        customerId
      }
      
      const response = await api.post<CardResponse>(
        '/card-info',
        payload
      )
      
      console.log('✅ Card added:', response.data)
      
      return {
        data: response.data,
        message: response.data.message || 'Card added successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Add card error:', error)
      const errorMessage = handleApiError(error)
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Update card
   */
  const updateCard = async (id: number, cardData: UpdateCardDto): Promise<ApiResponse<CardResponse>> => {
    console.log('🔵 useCardInfo.updateCard called for:', id)
    console.log('📦 Update data:', cardData)
    
    try {
      const response = await api.patch<CardResponse>(
        `/card-info/${id}`,
        cardData
      )
      
      console.log('✅ Card updated:', response.data)
      
      return {
        data: response.data,
        message: response.data.message || 'Card updated successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Update card error:', error)
      const errorMessage = handleApiError(error)
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Set card as default
   */
  const setDefaultCard = async (id: number): Promise<ApiResponse<CardResponse>> => {
    console.log('🔵 useCardInfo.setDefaultCard called for:', id)
    
    try {
      const response = await api.patch<CardResponse>(
        `/card-info/${id}/set-default`,
        {}
      )
      
      console.log('✅ Card set as default:', response.data)
      
      return {
        data: response.data,
        message: response.data.message || 'Card set as default successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Set default card error:', error)
      const errorMessage = handleApiError(error)
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Delete card
   */
  const deleteCard = async (id: number): Promise<ApiResponse<any>> => {
    console.log('🔵 useCardInfo.deleteCard called for:', id)
    
    try {
      const response = await api.delete<any>(
        `/card-info/${id}`
      )
      
      console.log('✅ Card deleted:', response.data)
      
      return {
        data: response.data,
        message: response.data?.message || 'Card deleted successfully',
        success: true,
      }
    } catch (error: any) {
      console.error('❌ Delete card error:', error)
      const errorMessage = handleApiError(error)
      return {
        data: null as any,
        message: errorMessage,
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Get card brand icon/name
   */
  const getCardBrandName = (brand: string): string => {
    const brandMap: Record<string, string> = {
      'visa': 'Visa',
      'mastercard': 'Mastercard',
      'amex': 'American Express',
      'discover': 'Discover',
      'jcb': 'JCB',
      'diners': 'Diners Club',
      'unionpay': 'UnionPay'
    }
    return brandMap[brand.toLowerCase()] || brand
  }

  /**
   * Format expiry date
   */
  const formatExpiryDate = (month: string, year: string): string => {
    return `${month.padStart(2, '0')}/${year.slice(-2)}`
  }

  return {
    getCustomerCards,
    getDefaultCard,
    getCardById,
    addCard,
    updateCard,
    setDefaultCard,
    deleteCard,
    getCardBrandName,
    formatExpiryDate,
    getCustomerId
  }
}

