import { loadStripe } from '@stripe/stripe-js'

// Infer types from loadStripe return value
type Stripe = Awaited<ReturnType<typeof loadStripe>>
type StripeElements = ReturnType<NonNullable<Stripe>['elements']>
// StripeCardElement - the card element returned from elements.create('card')
// Using a more flexible type since the exact type is complex to infer
export type StripeCardElement = {
  mount: (element: string | HTMLElement) => void
  unmount: () => void
  on: (event: string, handler: (event: any) => void) => void
  [key: string]: any
}

let stripePromise: Promise<Stripe> | null = null
let stripeInstance: Stripe = null
let elementsInstance: StripeElements | null = null

/**
 * Initialize Stripe with publishable key
 */
export const useStripe = () => {
  const config = useRuntimeConfig()
  const publishableKey = config.public.stripePublishableKey as string

  if (!publishableKey) {
    console.error('❌ Stripe publishable key is not configured')
    return {
      stripe: null,
      elements: null,
      createPaymentIntent: async () => ({ clientSecret: null }),
      confirmPayment: async () => ({ success: false, error: 'Stripe not configured' })
    }
  }

  // Initialize Stripe (only once)
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey)
    stripePromise.then(stripe => {
      stripeInstance = stripe
    })
  }

  /**
   * Get Stripe instance
   */
  const getStripe = async (): Promise<Stripe | null> => {
    if (stripeInstance) return stripeInstance
    return await stripePromise
  }

  /**
   * Get or create Elements instance
   */
  const getElements = async (): Promise<StripeElements | null> => {
    const stripe = await getStripe()
    if (!stripe) return null

    if (!elementsInstance) {
      elementsInstance = stripe.elements()
    }
    return elementsInstance
  }

  /**
   * Create payment intent via backend
   */
  const createPaymentIntent = async (amount: number): Promise<{ clientSecret: string | null }> => {
    try {
      const { post } = useApi()
      const config = useRuntimeConfig()

      console.log('💳 Creating payment intent for amount:', amount)
      
      const response = await post<{ clientSecret: string }>(
        'stripe/create-payment-intent',
        { amount }
      )

      if (response.success && response.data?.clientSecret) {
        console.log('✅ Payment intent created successfully')
        return { clientSecret: response.data.clientSecret }
      } else {
        console.error('❌ Failed to create payment intent:', response)
        return { clientSecret: null }
      }
    } catch (error: any) {
      console.error('❌ Error creating payment intent:', error)
      return { clientSecret: null }
    }
  }

  /**
   * Confirm payment with Stripe
   */
  const confirmPayment = async (
    clientSecret: string,
    cardElement: StripeCardElement | null,
    paymentMethodId?: string
  ): Promise<{ success: boolean; paymentIntent?: any; error?: string }> => {
    try {
      const stripe = await getStripe()
      if (!stripe) {
        return { success: false, error: 'Stripe not initialized' }
      }

      let result

      if (paymentMethodId) {
        // Use saved payment method
        result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodId
        })
      } else if (cardElement) {
        // Use card element
        result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          }
        })
      } else {
        return { success: false, error: 'No payment method provided' }
      }

      if (result.error) {
        console.error('❌ Payment confirmation error:', result.error)
        return { success: false, error: result.error.message || 'Payment failed' }
      }

      if (result.paymentIntent?.status === 'succeeded') {
        console.log('✅ Payment confirmed successfully')
        return { success: true, paymentIntent: result.paymentIntent }
      }

      return { success: false, error: 'Payment not completed' }
    } catch (error: any) {
      console.error('❌ Error confirming payment:', error)
      return { success: false, error: error.message || 'Payment confirmation failed' }
    }
  }

  return {
    getStripe,
    getElements,
    createPaymentIntent,
    confirmPayment
  }
}

