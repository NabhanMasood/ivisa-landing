<template>
  <div>
    <!-- Payment Dialog - only show when NOT showing success -->
    <Dialog
      v-if="!showSuccessModal"
      :open="isOpen && !showSuccessModal"
      @update:open="handleOpenChange"
    >
      <DialogContent class="w-[440px]">
        <DialogHeader>
          <DialogTitle>Payment Method</DialogTitle>
          <DialogDescription>
            <span
              v-if="
                isAuthenticated &&
                savedCards.length > 0 &&
                paymentMethod === 'saved' &&
                !showOtherCards
              "
            >
              Your default card is selected
            </span>
            <span
              v-else-if="
                isAuthenticated &&
                savedCards.length > 0 &&
                paymentMethod === 'saved' &&
                showOtherCards
              "
            >
              Select a saved card
            </span>
            <span v-else> Enter your card details </span>
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="handlePayment" class="space-y-4">
          <!-- Loading State -->
          <div v-if="isAuthenticated && loadingCards" class="text-center py-4">
            <p class="text-sm text-gray-500">Loading saved cards...</p>
          </div>

          <!-- Default Card Display (when authenticated and has saved cards) -->
          <div
            v-if="
              isAuthenticated &&
              !loadingCards &&
              savedCards.length > 0 &&
              paymentMethod === 'saved' &&
              !showOtherCards
            "
            class="space-y-4"
          >
            <!-- Default/Selected Card Display -->
            <div
              class="p-4 border-2 rounded-lg"
              :style="{ borderColor: '#1ECE84' }"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold text-gray-700">
                    {{ getSelectedCard()?.cardBrand.toUpperCase() }} ••••
                    {{ getSelectedCard()?.cardLast4 }}
                  </span>
                  <span
                    v-if="getSelectedCard()?.isDefault"
                    class="px-2 py-0.5 text-xs font-medium rounded"
                    style="background-color: #1ece84; color: white"
                  >
                    Default
                  </span>
                </div>
              </div>
              <p class="text-xs text-gray-500">
                Expires
                {{
                  formatCardExpiryDisplay(
                    getSelectedCard()?.expiryMonth || "",
                    getSelectedCard()?.expiryYear || ""
                  )
                }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                {{ getSelectedCard()?.cardholderName }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                @click="showOtherCards = true"
                class="w-full"
                style="border-color: #1ece84; color: #1ece84"
              >
                Use another card
              </Button>
              <Button
                type="button"
                variant="outline"
                @click="
                  paymentMethod = 'new';
                  showOtherCards = false;
                "
                class="w-full"
                style="border-color: #1ece84; color: #1ece84"
              >
                Use a new card
              </Button>
            </div>
          </div>

          <!-- Other Cards Selection (when "Use another card" is clicked) -->
          <div
            v-if="
              isAuthenticated &&
              !loadingCards &&
              savedCards.length > 0 &&
              paymentMethod === 'saved' &&
              showOtherCards
            "
            class="space-y-4"
          >
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-semibold text-gray-700">Select a card</h3>
              <button
                type="button"
                @click="showOtherCards = false"
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>

            <div class="space-y-2 max-h-60 overflow-y-auto">
              <div
                v-for="card in otherCards"
                :key="card.id"
                @click="
                  selectedCardId = card.id;
                  showOtherCards = false;
                "
                class="p-3 border-2 rounded-lg cursor-pointer transition-colors"
                :class="
                  selectedCardId === card.id
                    ? 'bg-green-50'
                    : 'hover:bg-gray-50'
                "
                :style="{
                  borderColor:
                    selectedCardId === card.id ? '#1ECE84' : '#e5e7eb',
                }"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span
                      class="text-sm font-medium"
                      :class="
                        selectedCardId === card.id
                          ? 'text-gray-900'
                          : 'text-gray-700'
                      "
                    >
                      {{ card.cardBrand.toUpperCase() }} ••••
                      {{ card.cardLast4 }}
                    </span>
                    <span
                      v-if="card.isDefault"
                      class="px-2 py-0.5 text-xs font-medium rounded"
                      style="background-color: #1ece84; color: white"
                    >
                      Default
                    </span>
                    <span
                      v-if="selectedCardId === card.id"
                      class="px-2 py-0.5 text-xs font-medium rounded"
                      style="background-color: #1ece84; color: white"
                    >
                      Selected
                    </span>
                  </div>
                  <input
                    type="radio"
                    :checked="selectedCardId === card.id"
                    class="w-4 h-4"
                    style="accent-color: #1ece84"
                    @click.stop
                  />
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  Expires
                  {{
                    formatCardExpiryDisplay(card.expiryMonth, card.expiryYear)
                  }}
                  • {{ card.cardholderName }}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              @click="
                paymentMethod = 'new';
                showOtherCards = false;
              "
              class="w-full"
              style="border-color: #1ece84; color: #1ece84"
            >
              Use a new card
            </Button>
          </div>

          <!-- Card Details with Stripe Elements -->
          <div
            v-if="
              !loadingCards &&
              (paymentMethod === 'new' ||
                (isAuthenticated && savedCards.length === 0) ||
                !isAuthenticated ||
                (paymentMethod === 'saved' && savedCards.length > 0))
            "
            class="space-y-4"
          >
            <!-- Note for saved cards -->
            <div
              v-if="paymentMethod === 'saved' && savedCards.length > 0"
              class="p-3 bg-blue-50 border border-blue-200 rounded-md"
            >
              <p class="text-sm text-blue-800">
                <strong>Note:</strong> Please enter your card details below to
                complete the payment with Stripe.
              </p>
            </div>

            <!-- Cardholder Name with Payment Icons -->
            <div class="relative">
              <Input
                v-model="cardDetails.cardholderName"
                type="text"
                placeholder="Cardholder name"
                :required="
                  paymentMethod === 'new' ||
                  savedCards.length === 0 ||
                  paymentMethod === 'saved'
                "
                class="pr-20 h-12"
                style="border: 1px solid #1ece84"
              />
              <!-- Stripe Logo -->
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img
                  src="/svg/payment-strip.svg"
                  alt="Stripe"
                  class="h-6"
                  style="width: auto"
                />
              </div>
            </div>

            <!-- Stripe Card Element -->
            <div
              id="card-element"
              class="h-12 px-3 py-2 border rounded-md"
              style="border: 1px solid #1ece84"
            ></div>
            <div
              v-if="cardErrors"
              id="card-errors"
              role="alert"
              class="text-sm text-red-600 mt-1"
            >
              {{ cardErrors }}
            </div>
          </div>

          <!-- Pay Button -->
          <Button
            type="submit"
            class="w-full"
            style="
              height: 36px;
              border-radius: 6px;
              padding: 8px 24px;
              background-color: #1ece84;
            "
            :disabled="isProcessing || !isFormValid"
          >
            {{ isProcessing ? "Processing..." : `Pay ${formatPrice(amount)}` }}
          </Button>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Success Modal - Render independently -->
    <SuccessModal
      :is-open="showSuccessModal"
      :application-number="applicationNumber"
      :customer-id="customerId"
      :user-email="userEmail"
      :user-full-name="userFullName"
      @close="handleSuccessClose"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  nextTick,
  computed,
  watch,
  onMounted,
  onUnmounted,
} from "vue";
import { useRuntimeConfig } from "#app";
import Dialog from "@/components/ui/dialog/Dialog.vue";
import DialogContent from "@/components/ui/dialog/Dialogcontent.vue";
import DialogHeader from "@/components/ui/dialog/Dialogheader.vue";
import DialogTitle from "@/components/ui/dialog/Dialogtitle.vue";
import DialogDescription from "@/components/ui/dialog/Dialogdescription.vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/button.vue";
import SuccessModal from "@/components/visa/Successmodal.vue";
import { useCardInfo, type CardInfo } from "@/composables/useCardInfo";
import { useStripe, type StripeCardElement } from "@/composables/useStripe";

const props = defineProps<{
  isOpen: boolean;
  amount: number;
  applicationData: any;
}>();

const emit = defineEmits<{
  close: [];
  success: [result: any];
}>();

// Currency conversion
const { formatPrice } = useCurrency();

// Get current user to include customerId if logged in
const { currentUser, isAuthenticated, refreshUser } = useAuthApi();

// Card management
const { getCustomerCards, formatExpiryDate: formatCardExpiry } = useCardInfo();

const config = useRuntimeConfig();
const isProcessing = ref(false);
const showSuccessModal = ref(false);
const applicationNumber = ref("");
const customerId = ref<number>(0);
const userEmail = ref("");
const userFullName = ref("");
const hasSubmitted = ref(false); // Prevent duplicate submissions

// Payment method selection
const paymentMethod = ref<"saved" | "new">("new");
const savedCards = ref<CardInfo[]>([]);
const selectedCardId = ref<number | "">("");
const saveCard = ref(false);
const loadingCards = ref(false);
const showOtherCards = ref(false);

const cardDetails = reactive({
  cardholderName: "",
});

// Stripe integration
const { getStripe, getElements, createPaymentIntent, confirmPayment, resetElements } = useStripe()
const cardElement = ref<StripeCardElement | null>(null)
const cardErrors = ref<string>('')
const stripeInitialized = ref(false)
const isInitializing = ref(false) // Guard to prevent concurrent initializations

// Helper function to get customer ID from various sources
const getCustomerId = (): number | null => {
  // First try currentUser
  if (currentUser.value?.id) {
    return currentUser.value.id;
  }

  // Fallback: try to get from cookie directly
  if (process.client) {
    try {
      const adminCookie = useCookie("admin_info");
      if (adminCookie.value) {
        const adminData =
          typeof adminCookie.value === "string"
            ? JSON.parse(adminCookie.value)
            : adminCookie.value;
        if (adminData?.id) {
          console.log("✅ Got customer ID from cookie:", adminData.id);
          // Update currentUser for future use
          if (!currentUser.value) {
            refreshUser();
          }
          return adminData.id;
        }
      }
    } catch (error) {
      console.error("❌ Error reading cookie:", error);
    }
  }

  return null;
};

// Load saved cards
const loadSavedCards = async () => {
  if (!isAuthenticated.value) {
    console.log("⚠️ User not authenticated, skipping card load");
    savedCards.value = [];
    return;
  }

  // Get customer ID with fallback
  const customerId = getCustomerId();
  if (!customerId) {
    console.warn("⚠️ Customer ID not found in currentUser or cookie");
    savedCards.value = [];
    return;
  }

  loadingCards.value = true;
  try {
    console.log("🔄 Loading saved cards for customer:", customerId);
    const response = await getCustomerCards(customerId);
    console.log("📦 Card response:", response);
    console.log("📦 Response success:", response.success);
    console.log("📦 Response data:", response.data);
    console.log("📦 Response data.data:", response.data?.data);

    if (response.success && response.data?.data) {
      // Response structure: response.data is CardsListResponse, response.data.data is CardInfo[]
      const cards: CardInfo[] = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      console.log("💳 Cards found:", cards.length);
      console.log("💳 Cards data:", cards);

      // Filter active cards (include cards where isActive is not explicitly false)
      savedCards.value = cards.filter((card: CardInfo) => {
        // Include card if isActive is undefined, null, or true
        return card.isActive !== false;
      });
      console.log("✅ Active cards after filter:", savedCards.value.length);
      console.log("✅ Saved cards:", savedCards.value);
    } else {
      console.warn("⚠️ No cards found or response unsuccessful");
      console.warn("⚠️ Response details:", {
        success: response.success,
        hasData: !!response.data,
        hasNestedData: !!response.data?.data,
      });
      savedCards.value = [];
    }
  } catch (error) {
    console.error("❌ Error loading saved cards:", error);
    savedCards.value = [];
  } finally {
    loadingCards.value = false;
  }
};

// Function to initialize payment method based on saved cards
const initializePaymentMethod = async () => {
  console.log("🔄 PaymentModal: Initializing payment method...");
  console.log("👀 isOpen:", props.isOpen);
  console.log("👀 isAuthenticated:", isAuthenticated.value);
  console.log("👀 currentUser:", currentUser.value);
  console.log("👀 currentUser?.id:", currentUser.value?.id);

  if (!props.isOpen) {
    console.log("⏸️ Modal not open, skipping initialization");
    return;
  }

  if (isAuthenticated.value) {
    console.log("✅ User authenticated, loading cards...");
    await loadSavedCards();
    console.log("💳 Cards loaded, count:", savedCards.value.length);

    // Auto-select default card if available
    if (savedCards.value.length > 0) {
      console.log("✅ Cards available, selecting default or first card");
      const defaultCard = savedCards.value.find((c) => c.isDefault);
      if (defaultCard) {
        console.log("✅ Found default card:", defaultCard.id);
        paymentMethod.value = "saved";
        selectedCardId.value = defaultCard.id;
      } else {
        console.log(
          "✅ No default card, using first card:",
          savedCards.value[0].id
        );
        paymentMethod.value = "saved";
        selectedCardId.value = savedCards.value[0].id;
      }
      showOtherCards.value = false;
    } else {
      console.log("⚠️ No cards found, switching to new card mode");
      paymentMethod.value = "new";
      showOtherCards.value = false;
    }
  } else {
    console.log("⚠️ User not authenticated, showing new card form");
    paymentMethod.value = "new";
    showOtherCards.value = false;
  }
};

// Watch for modal opening to load cards and initialize Stripe
watch(
  () => props.isOpen,
  async (isOpen) => {
    console.log("👀 PaymentModal watch triggered, isOpen:", isOpen);
    if (isOpen) {
      await initializePaymentMethod();
      // Initialize Stripe Elements after a short delay to ensure DOM is ready
      await nextTick();
      setTimeout(() => {
        // Initialize for new cards or saved cards (saved cards need card element as fallback)
        if (
          paymentMethod.value === "new" ||
          (paymentMethod.value === "saved" && savedCards.value.length > 0) ||
          (isAuthenticated.value && savedCards.value.length === 0) ||
          !isAuthenticated.value
        ) {
          initializeStripeElements();
        }
      }, 100);
    } else {
      cleanupStripeElements();
    }
  },
  { immediate: true }
);

// Watch for payment method changes to initialize/cleanup Stripe Elements
watch(
  () => paymentMethod.value,
  async (newMethod) => {
    if (props.isOpen) {
      await nextTick();
      setTimeout(() => {
        // Initialize Stripe Elements for both 'new' and 'saved' methods
        // (saved cards currently require card element as fallback)
        if (
          newMethod === "new" ||
          (newMethod === "saved" && savedCards.value.length > 0)
        ) {
          initializeStripeElements();
        } else {
          cleanupStripeElements();
        }
      }, 100);
    } else {
      cleanupStripeElements();
    }
  }
);

// Also initialize on mount if modal is already open
onMounted(async () => {
  console.log("🚀 PaymentModal mounted");
  console.log("👀 Initial isOpen:", props.isOpen);
  if (props.isOpen) {
    await initializePaymentMethod();
    await nextTick();
    setTimeout(() => {
      // Initialize for new cards or saved cards (saved cards need card element as fallback)
      if (
        paymentMethod.value === "new" ||
        (paymentMethod.value === "saved" && savedCards.value.length > 0) ||
        (isAuthenticated.value && savedCards.value.length === 0) ||
        !isAuthenticated.value
      ) {
        initializeStripeElements();
      }
    }, 100);
  }
});

// Cleanup on unmount
onUnmounted(() => {
  cleanupStripeElements();
});

// Get selected card details
const getSelectedCard = (): CardInfo | null => {
  if (!selectedCardId.value || selectedCardId.value === "") return null;
  return savedCards.value.find((c) => c.id === selectedCardId.value) || null;
};

// Get all cards for selection (show all cards when viewing "other cards")
const otherCards = computed(() => {
  return savedCards.value;
});

// Format expiry date helper for display
const formatCardExpiryDisplay = (month: string, year: string): string => {
  return formatCardExpiry(month, year);
};

// Initialize Stripe Elements
const initializeStripeElements = async () => {
  if (!process.client) return

  // Prevent concurrent initializations
  if (isInitializing.value) {
    console.log('⚠️ Stripe initialization already in progress, skipping')
    return
  }

  // Check if already initialized
  if (stripeInitialized.value && cardElement.value) {
    console.log('⚠️ Stripe already initialized, skipping')
    return
  }

  isInitializing.value = true

  try {
    // Always cleanup first to prevent duplicate elements
    cleanupStripeElements()
    
    // Reset Elements instance to get a fresh one (this prevents "can only create one element" error)
    resetElements()
    
    // Wait a bit to ensure cleanup is complete
    await new Promise(resolve => setTimeout(resolve, 100))

    const stripe = await getStripe()
    // Get a fresh Elements instance (forceNew = true)
    const elements = await getElements(true)
    
    if (!stripe || !elements) {
      console.error('❌ Stripe not initialized')
      isInitializing.value = false
      return
    }

    // Check if card element container exists and is visible
    const cardElementContainer = document.getElementById('card-element')
    if (!cardElementContainer) {
      console.warn('⚠️ Card element container not found')
      isInitializing.value = false
      return
    }

    // Ensure container is empty
    if (cardElementContainer.querySelector('iframe') || cardElementContainer.children.length > 0) {
      console.warn('⚠️ Card element container not empty, clearing it')
      cardElementContainer.innerHTML = ''
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    // Create card element
    const cardElementOptions = {
      style: {
        base: {
          fontSize: "16px",
          color: "#32325d",
          "::placeholder": {
            color: "#aab7c4",
          },
          border: "1px solid #1ECE84",
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };

    cardElement.value = elements.create(
      "card",
      cardElementOptions
    ) as StripeCardElement;

    // Mount card element
    if (cardElement.value && cardElementContainer) {
      cardElement.value.mount(cardElementContainer)
      
      // Listen for errors
      cardElement.value.on("change", (event) => {
        if (event.error) {
          cardErrors.value = event.error.message;
        } else {
          cardErrors.value = "";
        }
      });

      stripeInitialized.value = true;
      console.log("✅ Stripe Elements initialized");
    }
  } catch (error) {
    console.error('❌ Error initializing Stripe Elements:', error)
    // Reset flag on error so it can be retried
    stripeInitialized.value = false
    cardElement.value = null
  } finally {
    // Always reset the initialization guard
    isInitializing.value = false
  }
};

// Cleanup Stripe Elements
const cleanupStripeElements = () => {
  if (cardElement.value) {
    try {
      cardElement.value.unmount()
      cardElement.value = null
    } catch (error) {
      console.error('❌ Error unmounting Stripe Elements:', error)
    }
  }
  
  // Always reset the flag and clear the container
  stripeInitialized.value = false
  
  // Clear the container DOM element if it exists
  if (process.client) {
    const cardElementContainer = document.getElementById('card-element')
    if (cardElementContainer) {
      // Remove any remaining iframes or children
      cardElementContainer.innerHTML = ''
    }
  }
  
  // Clear any errors
  cardErrors.value = ''
}

// Validate form
const isFormValid = computed(() => {
  if (paymentMethod.value === "saved" && savedCards.value.length > 0) {
    return selectedCardId.value !== "" && selectedCardId.value !== null;
  } else {
    return (
      cardDetails.cardholderName.trim() !== "" &&
      !cardErrors.value &&
      stripeInitialized.value
    );
  }
});

const handleOpenChange = (value: boolean) => {
  console.log("🔄 PaymentModal: handleOpenChange called with:", value);

  // Only allow closing if not processing and not showing success modal
  if (!value && !isProcessing.value && !showSuccessModal.value) {
    console.log("✅ Allowing payment modal to close");
    // Reset form when closing
    resetForm();
    emit("close");
  } else {
    console.log(
      "⛔ Preventing payment modal close - processing:",
      isProcessing.value,
      "showingSuccess:",
      showSuccessModal.value
    );
  }
};

// Reset form
const resetForm = () => {
  paymentMethod.value = "new";
  selectedCardId.value = "";
  saveCard.value = false;
  showOtherCards.value = false;
  cardDetails.cardholderName = "";
  cardErrors.value = "";
  hasSubmitted.value = false; // Reset submission flag
  cleanupStripeElements();
};

// Transform application data to match backend DTO
const transformApplicationData = (applicationData: any) => {
  console.log("🔄 Transforming application data...");
  console.log("📥 Raw data received:", applicationData);

  // Transform visa type: "Tourist Visa|single" -> "30-single"
  // Use duration from productDetails if available, otherwise try to extract from productName
  let visaType = "";
  if (applicationData.visaType && applicationData.visaType.includes("|")) {
    const [productName, entryType] = applicationData.visaType.split("|");
    
    // ✅ PRIORITY 1: Get duration from productDetails (most reliable)
    let duration = "";
    if (applicationData.productDetails && applicationData.productDetails.duration) {
      duration = String(applicationData.productDetails.duration);
      console.log("✅ Got duration from productDetails:", duration);
    } else {
      // FALLBACK: Try to extract from productName
      duration = productName.match(/\d+/)?.[0] || "";
      console.log("⚠️ Extracted duration from productName:", duration);
    }
    
    visaType = `${duration}-${entryType}`;
  }

  console.log("✅ Visa type:", visaType);

  // Use processing type as-is from backend (no transformation)
  const processingType = applicationData.processingType || "standard";

  console.log("✅ Processing type (from backend):", processingType);

  // Get travelers count
  const travelers = applicationData.travelers || [];
  const numberOfTravelers = travelers.length;

  // ✅ CRITICAL: Ensure phone field is explicitly included for all travelers
  const travelersWithPhone = travelers.map((t: any, index: number) => {
    const traveler = { ...t };
    // Ensure phone is always present, especially for first traveler
    if (index === 0 && !traveler.phone) {
      console.warn("⚠️ Phone missing for first traveler, checking email field");
    }
    // Explicitly ensure phone field exists (even if empty for additional travelers)
    if (!("phone" in traveler)) {
      traveler.phone = index === 0 ? traveler.phone || "" : "";
    }
    return traveler;
  });

  console.log("👥 Number of travelers:", numberOfTravelers);
  console.log(
    "📞 Travelers data with phone:",
    travelersWithPhone.map((t: any) => ({
      firstName: t.firstName,
      lastName: t.lastName,
      email: t.email,
      phone: t.phone,
      hasPhone: !!t.phone && t.phone.trim() !== "",
    }))
  );

  const govtFeePerTraveler = Number(applicationData.govtFee) || 0;
  const serviceFeePerTraveler = Number(applicationData.serviceFee) || 0;
  const processingFeePerTraveler = Number(applicationData.processingFee) || 0;

  // Calculate TOTALS by multiplying by number of travelers
  const totalGovtFee = govtFeePerTraveler * numberOfTravelers;
  const totalServiceFee = serviceFeePerTraveler * numberOfTravelers;
  const totalProcessingFee = processingFeePerTraveler * numberOfTravelers;
  const calculatedTotalAmount =
    totalGovtFee + totalServiceFee + totalProcessingFee;

  // ✅ Check if there's a discount applied
  const discountAmount = applicationData.discountAmount || 0;
  const couponCode = applicationData.couponCode || null;
  const originalAmount =
    applicationData.originalAmount || calculatedTotalAmount;
  const finalAmount = props.amount; // This is the discounted amount from ReviewOrder

  console.log("💰 Fee Calculation:", {
    numberOfTravelers,
    perTraveler: {
      govtFee: govtFeePerTraveler,
      serviceFee: serviceFeePerTraveler,
      processingFee: processingFeePerTraveler,
    },
    totals: {
      govtFee: totalGovtFee,
      serviceFee: totalServiceFee,
      processingFee: totalProcessingFee,
      calculatedTotal: calculatedTotalAmount,
    },
    discount: {
      discountAmount,
      couponCode,
      originalAmount,
      finalAmount: finalAmount,
    },
  });

  console.log("💰 Expected payment amount from props:", props.amount);
  console.log("💰 Calculated total (before discount):", calculatedTotalAmount);
  console.log("💰 Discount amount:", discountAmount);
  console.log("💰 Final amount (after discount):", finalAmount);

  // Use the discounted amount from props (which is the final amount after discount)
  const totalAmountToUse = finalAmount;

  if (
    Math.abs(calculatedTotalAmount - originalAmount) > 0.01 &&
    originalAmount !== calculatedTotalAmount
  ) {
    console.warn("⚠️ Original amount mismatch, using calculated total as base");
  }

  // Build the final payload with TOTAL amounts
  const payload: any = {
    visaProductId: applicationData.visaProductId || null,
    nationality: applicationData.nationality || "",
    destinationCountry: applicationData.destinationCountry || "",
    visaType: visaType,
    numberOfTravelers: numberOfTravelers,
    processingType: processingType, // ✅ Use as-is from backend
    processingTime: applicationData.processingTime || "",
    processingFee: totalProcessingFee, // ✅ TOTAL
    processingFeeId: applicationData.processingFeeId || null,
    govtFee: totalGovtFee, // ✅ TOTAL
    serviceFee: totalServiceFee, // ✅ TOTAL
    totalAmount: totalAmountToUse, // ✅ USE DISCOUNTED AMOUNT
    couponCode: couponCode, // ✅ Include coupon code if applied
    discountAmount: discountAmount > 0 ? discountAmount : undefined, // ✅ Include discount if applied
    travelers: travelersWithPhone, // ✅ Use travelers with explicitly included phone
    paymentMethod: "stripe",
    paymentStatus: "pending",
    notes: applicationData.notes || "",
  };

  // ✅ CRITICAL: Include customerId if user is logged in
  // This ensures the application is associated with the correct customer
  if (isAuthenticated.value && currentUser.value?.id) {
    payload.customerId = currentUser.value.id;
    console.log(
      "✅ Including customerId from logged-in user:",
      payload.customerId
    );
  } else {
    console.log(
      "⚠️ User not logged in, backend will create/find customer based on email"
    );
  }

  console.log("✅ Final payload:", payload);
  console.log(
    "📞 Phone numbers in payload travelers:",
    payload.travelers.map((t: any) => ({
      name: `${t.firstName} ${t.lastName}`,
      phone: t.phone,
      hasPhone: !!t.phone,
    }))
  );

  // Validate only the essential fields
  if (!payload.visaType || !payload.visaType.match(/^\d+-\w+$/)) {
    throw new Error(
      `Invalid visa type: "${payload.visaType}". Expected format: "30-single"`
    );
  }

  if (!payload.processingType || !payload.processingType.trim()) {
    throw new Error("Processing type is required");
  }

  if (payload.processingFee < 0 || isNaN(payload.processingFee)) {
    throw new Error(`Invalid processing fee: ${payload.processingFee}`);
  }

  if (payload.travelers.length === 0) {
    throw new Error("No travelers found");
  }

  // ✅ Validate phone number for first traveler
  if (payload.travelers.length > 0 && payload.travelers[0]) {
    const firstTraveler = payload.travelers[0];
    if (!firstTraveler.phone || firstTraveler.phone.trim() === "") {
      console.error("❌ Phone number is missing or empty for first traveler!");
      console.error(
        "First traveler data:",
        JSON.stringify(firstTraveler, null, 2)
      );
    } else {
      console.log(
        "✅ Phone number validated for first traveler:",
        firstTraveler.phone
      );
      console.log(
        "✅ Full first traveler object:",
        JSON.stringify(firstTraveler, null, 2)
      );
    }
  }

  return payload;
};

const handlePayment = async () => {
  console.log("💳 PaymentModal: Starting payment...");
  console.log("💳 Expected amount prop:", props.amount);
  console.log("💳 Application Data received:", props.applicationData);

  // Prevent duplicate submissions
  if (isProcessing.value || hasSubmitted.value) {
    console.warn("⚠️ Payment already in progress or submitted");
    return;
  }

  isProcessing.value = true;

  try {
    // Validate applicationData exists
    if (!props.applicationData) {
      throw new Error("Application data is missing");
    }

    // Transform the data first
    const transformedData = transformApplicationData(props.applicationData);

    // Convert amount to cents for Stripe (amount should be in smallest currency unit)
    // Assuming amount is in dollars, multiply by 100 for cents
    const amountInCents = Math.round(transformedData.totalAmount * 100);

    console.log(
      "💳 Creating payment intent for amount:",
      amountInCents,
      "cents (",
      transformedData.totalAmount,
      "dollars)"
    );

    // Create payment intent
    const { clientSecret } = await createPaymentIntent(amountInCents);

    if (!clientSecret) {
      throw new Error("Failed to create payment intent");
    }

    console.log("✅ Payment intent created, clientSecret received");

    // Prepare payment data based on selected method
    let paymentData: any = {
      paymentGateway: "stripe",
    };

    let paymentIntent: any = null;

    // If using a saved card
    if (
      paymentMethod.value === "saved" &&
      selectedCardId.value &&
      selectedCardId.value !== ""
    ) {
      const selectedCard = getSelectedCard();
      if (!selectedCard) {
        throw new Error("Selected card not found");
      }

      // For saved cards, we need to use the card element since saved cards
      // don't have Stripe payment method IDs stored yet
      // TODO: Update backend to store Stripe payment method IDs when saving cards
      paymentData.cardInfoId = selectedCard.id;

      // Use card element for saved cards (requires user to re-enter card details)
      // In the future, if saved cards have Stripe payment method IDs, we can use:
      // const result = await confirmPayment(clientSecret, null, selectedCard.stripePaymentMethodId)
      if (!cardElement.value) {
        throw new Error(
          "Card element not initialized. Please enter card details."
        );
      }

      const result = await confirmPayment(clientSecret, cardElement.value);
      if (!result.success) {
        throw new Error(result.error || "Payment failed");
      }
      paymentIntent = result.paymentIntent;
    } else {
      // Using a new card with Stripe Elements
      if (!cardElement.value) {
        throw new Error("Card element not initialized");
      }

      const result = await confirmPayment(clientSecret, cardElement.value);
      if (!result.success) {
        throw new Error(result.error || "Payment failed");
      }
      paymentIntent = result.paymentIntent;

      // Extract card info for saving
      // The payment intent contains the payment method ID
      // We'll send the payment method ID and let the backend retrieve card details if needed
      // Or we can get basic info from the card element if available
      if (paymentIntent.payment_method) {
        paymentData = {
          ...paymentData,
          cardholderName: cardDetails.cardholderName,
          stripePaymentMethodId: paymentIntent.payment_method as string,
          saveCard: saveCard.value,
        };

        // Note: Card details (last4, brand) will be retrieved by backend from Stripe
        // or we can add them here if the card element exposes them
        // For now, we'll let the backend handle it via the payment method ID
      }
    }

    // Add payment data to the payload
    // Make transaction ID unique by adding timestamp to prevent duplicate key errors
    const uniqueSuffix =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    paymentData.paymentIntentId = paymentIntent.id;
    paymentData.transactionId = `${paymentIntent.id}_${uniqueSuffix}`;
    paymentData.amount = transformedData.totalAmount;

    transformedData.payment = paymentData;

    console.log("🌐 Making API call to submit application...");
    console.log(
      "📤 Payload being sent to backend:",
      JSON.stringify(transformedData, null, 2)
    );
    console.log("💰 totalAmount in payload:", transformedData.totalAmount);
    console.log(
      "💰 payment.amount in payload:",
      transformedData.payment.amount
    );
    console.log(
      "💰 discountAmount in payload:",
      transformedData.discountAmount
    );
    console.log("💰 couponCode in payload:", transformedData.couponCode);

    // ✅ FINAL VERIFICATION: Check phone numbers before sending
    if (transformedData.travelers && transformedData.travelers.length > 0) {
      transformedData.travelers.forEach((t: any, index: number) => {
        console.log(`📞 Traveler ${index + 1} phone check:`, {
          firstName: t.firstName,
          lastName: t.lastName,
          phone: t.phone,
          phoneType: typeof t.phone,
          phoneExists: "phone" in t,
          phoneValue: t.phone,
        });
        if (index === 0 && (!t.phone || t.phone.trim() === "")) {
          console.error(
            "❌ CRITICAL: First traveler phone is missing or empty!"
          );
        }
      });
    }

    // Use runtime config for API base URL
    const baseUrl = (config.public.apiBase as string).replace(/\/$/, "");
    const response = await fetch(
      `${baseUrl}/visa-applications/submit-complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      }
    );

    console.log("📥 API Response status:", response.status);
    console.log("📥 API Response ok:", response.ok);

    const result = await response.json();
    console.log("📥 API Response data:", result);

    if (!response.ok || !result.status) {
      const errorMessages = Array.isArray(result.message)
        ? result.message.join(", ")
        : result.message || "Failed to submit application";
      throw new Error(errorMessages);
    }

    console.log("✅ Application submitted successfully:", result);

    // Clear localStorage after successful payment
    if (process.client) {
      try {
        // Generate storage key from application data (same format as visa-application.vue)
        const nationality = props.applicationData.nationality || "Pakistan";
        const destinationCountry =
          props.applicationData.destinationCountry || "Morocco";
        const storageKey = `visa_application_${nationality}_${destinationCountry}`;

        // Clear the localStorage
        localStorage.removeItem(storageKey);
        console.log("🗑️ Cleared localStorage for application:", storageKey);

        // Also clear any other potential storage keys that might exist
        // (in case the format was slightly different)
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("visa_application_")) {
            keysToRemove.push(key);
          }
        }

        // Remove all visa application storage keys
        keysToRemove.forEach((key) => {
          localStorage.removeItem(key);
          console.log("🗑️ Cleared additional localStorage key:", key);
        });
      } catch (error) {
        console.error("❌ Error clearing localStorage:", error);
        // Don't throw - payment was successful, clearing storage is just cleanup
      }
    }

    // Mark as submitted to prevent duplicate submissions
    hasSubmitted.value = true;

    // Store application details for success modal
    applicationNumber.value = result.data.application.applicationNumber;
    customerId.value = result.data.customerId;

    console.log("📋 Application Number:", applicationNumber.value);
    console.log("👤 Customer ID:", customerId.value);

    // Extract user info from first traveler
    if (
      props.applicationData.travelers &&
      props.applicationData.travelers.length > 0
    ) {
      const firstTraveler = props.applicationData.travelers[0];
      userEmail.value = firstTraveler.email;
      userFullName.value = `${firstTraveler.firstName} ${firstTraveler.lastName}`;
      console.log("👤 User info extracted:", {
        email: userEmail.value,
        name: userFullName.value,
      });
      
      // ✅ Email is automatically sent by backend with tracking link
      console.log("📧 Backend will automatically send application confirmation email to:", userEmail.value);
    }

    // Reset form
    cardDetails.cardholderName = "";
    cardErrors.value = "";

    console.log("✅ About to show success modal...");

    // Show success modal and emit success
    await nextTick();
    showSuccessModal.value = true;

    console.log("✅ Success modal state set to:", showSuccessModal.value);

    // Wait another tick for modal to render
    await nextTick();

    // Emit success to parent (but don't close anything)
    emit("success", result.data);
    console.log("✅ Emitted success event");
  } catch (error: any) {
    console.error("❌ Payment/Submission failed:", error);
    console.error("❌ Error details:", error.message, error);

    // Check if it's a duplicate key error
    if (error.message && error.message.includes("duplicate key")) {
      alert(
        "This payment has already been processed. Please check your orders or try again with a new application."
      );
    } else {
      alert(`Payment failed: ${error.message}`);
    }
  } finally {
    isProcessing.value = false;
    console.log("🏁 Payment processing finished");
  }
};

const handleSuccessClose = () => {
  console.log("✅ SuccessModal close triggered");
  console.log("🔄 Resetting modal states...");

  // Reset all states
  showSuccessModal.value = false;

  // Close the payment modal
  emit("close");

  console.log(
    "✅ PaymentModal closed, navigation should happen from SuccessModal"
  );
};
</script>
