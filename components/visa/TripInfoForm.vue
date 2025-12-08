<template>
  <div class="rounded-lg sm:rounded-xl p-4 sm:p-6">
    <div class="mb-4 sm:mb-6">
      <p
        class="text-xs sm:text-sm leading-[18px] sm:leading-[22px]"
        style="
          font-family: Geist;
          font-weight: 600;
          color: #0b3947;
        "
      >
        The {{ destination }} Visa is mandatory for {{ formData.nationality || nationality }} passport
        holders planning to enter {{ destination }}
      </p>
    </div>

    <div class="space-y-4 sm:space-y-6">
      <!-- Nationality - Editable Select -->
      <div>
        <Label
          htmlFor="nationality"
          style="
            font-family: Manrope, sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #0b3947;
          "
        >
          What's your nationality?
        </Label>

        <!-- Loading State -->
        <div
          v-if="isLoadingCountries"
          class="mt-2 flex items-center gap-2 text-sm text-gray-600"
        >
          <div
            class="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"
          ></div>
          Loading countries...
        </div>

        <!-- Countries Dropdown -->
        <Select v-else v-model="formData.nationality">
          <SelectTrigger
            variant="form"
            class="w-full mt-2 h-10"
            style="
              font-family: Manrope, sans-serif;
              font-size: 14px;
              padding-left: 0.75rem !important;
              padding-right: 1rem !important;
            "
          >
            <SelectValue>
              <div v-if="selectedCountry" class="flex items-center gap-2">
                <img
                  v-if="selectedCountry.logoUrl"
                  :src="getFullLogoUrl(selectedCountry.logoUrl)"
                  :alt="selectedCountry.countryName"
                  class="w-5 h-4 object-cover rounded-sm"
                  @error="handleFlagError"
                />
                <span>{{ selectedCountry.countryName }}</span>
              </div>
              <span v-else>Select your nationality</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent class="max-h-[300px] overflow-y-auto">
            <!-- Search Input -->
            <div class="p-2 border-b sticky top-0 bg-white z-10">
              <input
                v-model="nationalitySearchQuery"
                type="text"
                placeholder="Search countries..."
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent"
                @click.stop
                @keydown.stop
              />
            </div>
            <SelectItem
              v-for="country in filteredNationalityOptions"
              :key="country.id"
              :value="country.countryName"
            >
              <div class="flex items-center gap-2">
                <img
                  v-if="country.logoUrl"
                  :src="getFullLogoUrl(country.logoUrl)"
                  :alt="country.countryName"
                  class="w-5 h-4 object-cover rounded-sm"
                  @error="handleFlagError"
                />
                <span>{{ country.countryName }}</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Visa Type - Dynamic from API -->
      <div>
        <Label htmlFor="visaType">
          <a
            href="#"
            style="
              color: #27272b;
              font-family: Manrope, sans-serif;
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
            "
            class="hover:underline"
          >
            Applying for
          </a>
        </Label>

        <!-- Loading State -->
        <div
          v-if="isLoadingProducts"
          class="mt-2 flex items-center gap-2 text-sm text-gray-600"
        >
          <div
            class="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"
          ></div>
          Loading visa products...
        </div>

        <!-- Error State -->
        <div v-else-if="productError" class="mt-2 text-sm text-red-600">
          {{ productError }}
        </div>

        <!-- Products Dropdown -->
        <Select v-else v-model="formData.visaType">
          <SelectTrigger
            variant="form"
            class="w-full mt-2 min-h-[60px] sm:min-h-[50px] h-auto py-2"
            style="
              font-family: Manrope, sans-serif;
              font-size: 14px;
              padding-left: 0.75rem !important;
              padding-right: 1rem !important;
            "
            :disabled="availableProducts.length === 0"
          >
            <SelectValue placeholder="Select visa type" class="text-left" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="product in (Array.isArray(availableProducts) ? availableProducts : [])"
              :key="`${product.productName}-${product.entryType}`"
              :value="`${product.productName}|${product.entryType}`"
            >
              {{ product.productName }} -
              {{ formatPrice(Number(product.totalAmount)) }} ({{
                product.entryType
              }}, {{ product.duration }} days, Valid
              {{ product.validity }} days)
            </SelectItem>
          </SelectContent>
        </Select>

        <!-- No products message -->
        <p
          v-if="
            !isLoadingProducts &&
            availableProducts.length === 0 &&
            !productError
          "
          class="mt-2 text-sm text-gray-500"
        >
          No visa products available for this nationality-destination
          combination
        </p>
      </div>

      <!-- Number of Applicants -->
      <div>
        <Label
          htmlFor="applicants"
          style="
            font-family: Manrope, sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #0b3947;
          "
        >
          Number of applicants
        </Label>
        <Input
          id="applicants"
          v-model.number="formData.applicants"
          type="number"
          min="1"
          max="10"
          class="w-full mt-2"
          placeholder="Enter number of applicants"
        />
      </div>

      <!-- Email Address - Capture on first step -->
      <div>
        <Label
          htmlFor="email"
          style="
            font-family: Manrope, sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #0b3947;
          "
        >
          Email Address <span style="color: #dc2626;">*</span>
        </Label>
        <Input
          id="email"
          v-model="formData.email"
          type="email"
          class="w-full mt-2"
          placeholder="your.email@example.com"
          :readonly="isAuthenticated && currentUser?.email"
          required
        />
        <p
          v-if="emailError"
          style="
            font-family: Manrope;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #dc2626;
          "
          class="mt-1"
        >
          {{ emailError }}
        </p>
        <p
          style="
            font-family: Manrope;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #6b7280;
          "
          class="mt-1"
        >
          We'll send your visa updates to this email address.
        </p>
      </div>

      <Button
        @click="handleNext"
        :disabled="
          !formData.visaType ||
          !formData.email ||
          emailError ||
          isLoadingProducts ||
          availableProducts.length === 0
        "
        class="w-full sm:w-[143px] h-9"
        style="
          background-color: #1ece84;
          color: white;
          border-radius: 6px;
          padding: 8px 16px;
          font-family: Geist, sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
        "
      >
        Start Application
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { useRuntimeConfig } from "#app";

import Button from "@/components/ui/button.vue";
import Label from "@/components/ui/label/Label.vue";
import Input from "@/components/ui/Input.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import { useNationalitiesApi } from "@/composables/useNationalities";
import { useCountriesApi } from "@/composables/useCountries";
import { useVisaProductsApi } from "@/composables/useVisaProducts";
import { useCurrency } from "@/composables/useCurrency";
import { useAuthApi } from "@/composables/useAuth";

const props = defineProps<{
  nationality: string;
  destination: string;
  initialData?: any;
}>();

const emit = defineEmits<{
  next: [data: any];
  update: [data: any];
}>();

// API composables
const { getNationalityDestinationProducts } = useNationalitiesApi();
const { getCountries } = useCountriesApi();
const { getVisaProductById } = useVisaProductsApi();
const { formatPrice, initializeRates, selectedCurrency, getCurrentRate } =
  useCurrency();
const { currentUser, isAuthenticated } = useAuthApi();

// State
const formData = ref({
  nationality: props.nationality,
  visaType: "",
  applicants: 1,
  email: "",
});

interface Country {
  id?: number | string;
  countryName: string;
  flag?: string;
  code?: string;
}

const nationalityOptions = ref<Country[]>([]);
const isLoadingCountries = ref(false);
const nationalitySearchQuery = ref('');
const availableProducts = ref<
  Array<{
    id?: number | string;
    productName: string;
    duration: number;
    validity: number;
    entryType: string;
    visaType: string;
    totalAmount: number | string;
    govtFee?: number | string;
    serviceFee?: number | string;
    processingFees?: any[]; // ✅ ADD THIS
  }>
>([]);
const isLoadingProducts = ref(false);
const productError = ref<string | null>(null);
const emailError = ref<string>("");

// ✅ Computed property to get selected country with flag
const selectedCountry = computed(() => {
  if (!Array.isArray(nationalityOptions.value)) {
    return undefined;
  }
  return nationalityOptions.value.find(
    (c) => c && c.countryName === formData.value.nationality
  );
});

// ✅ Filtered nationality options based on search query
const filteredNationalityOptions = computed(() => {
  // Ensure nationalityOptions is an array before filtering
  if (!nationalityOptions.value || !Array.isArray(nationalityOptions.value)) {
    return [];
  }
  if (!nationalitySearchQuery.value || !nationalitySearchQuery.value.trim()) {
    return nationalityOptions.value;
  }
  const query = nationalitySearchQuery.value.toLowerCase().trim();
  return nationalityOptions.value.filter((country) =>
    country && country.countryName && country.countryName.toLowerCase().includes(query)
  );
});

// ✅ Filtered nationality options based on search query
const filteredNationalityOptions = computed(() => {
  if (!nationalitySearchQuery.value.trim()) {
    return nationalityOptions.value;
  }
  const query = nationalitySearchQuery.value.toLowerCase().trim();
  return nationalityOptions.value.filter((country) =>
    country.countryName.toLowerCase().includes(query)
  );
});

// ✅ Handle flag loading errors
const handleFlagError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  console.error("❌ Flag failed to load:", img.src);
  img.style.display = "none";
};

// Watch for prop changes and update formData
watch(
  () => props.nationality,
  (newNationality) => {
    if (newNationality) {
      formData.value.nationality = newNationality;
    }
  },
  { immediate: true }
);

// Watch for nationality or destination changes to fetch products
watch(
  () => [formData.value.nationality, props.destination],
  async (newValues, oldValues) => {
    // Handle undefined values when immediate: true is used
    const [nationality, destination] = newValues || [undefined, undefined];
    const [oldNationality, oldDestination] = oldValues || [undefined, undefined];
    
    if (nationality && destination) {
      // Force refresh if nationality or destination changed to ensure fresh pricing
      // Handle undefined old values (when immediate: true is used)
      const shouldForceRefresh = oldNationality !== undefined && oldDestination !== undefined && 
                                 (oldNationality !== nationality || oldDestination !== destination)
      await fetchVisaProducts(nationality as string, destination as string, shouldForceRefresh);
    } else {
      availableProducts.value = [];
      formData.value.visaType = "";
    }
  },
  { immediate: true }
);

const fetchNationalityOptions = async () => {
  isLoadingCountries.value = true;
  try {
    const response = await getCountries();
    if (response.success && response.data) {
      nationalityOptions.value = response.data;
      console.log(
        "✅ Loaded database countries:",
        nationalityOptions.value.length
      );
    }
  } catch (error) {
    console.error("Failed to fetch nationality options:", error);
  } finally {
    isLoadingCountries.value = false;
  }
};

// ✅ NEW FUNCTION: Enrich product with processing fees
const enrichProductWithProcessingFees = async (product: any) => {
  try {
    // If product has a visaProductId, fetch the full details
    const productId = product.visaProductId || product.id;
    if (productId) {
      console.log(`🔍 Fetching full product details for ID: ${productId}`);
      const response = await getVisaProductById(productId);

      if (response.success && response.data && response.data.processingFees) {
        console.log(
          `✅ Found ${response.data.processingFees.length} processing fees for product ${productId}`
        );
        // Merge nationality product pricing with visa product details
        // ✅ Priority: Use visa product pricing (from DB) over nationality product pricing (may be cached)
        // This ensures we always use the latest prices from the visa product table
        return {
          ...product,
          processingFees: response.data.processingFees, // ✅ Add processing fees
          // ✅ Use visa product pricing as primary source (most up-to-date)
          govtFee: response.data.govtFee ?? product.govtFee,
          serviceFee: response.data.serviceFee ?? product.serviceFee,
          totalAmount: response.data.totalAmount ?? product.totalAmount,
        };
      }
    }
    console.log(`⚠️ No processing fees found for product ${productId}`);
    return product;
  } catch (error) {
    console.error("❌ Failed to enrich product with processing fees:", error);
    return product;
  }
};

const fetchVisaProducts = async (nationality: string, destination: string, forceRefresh: boolean = false) => {
  isLoadingProducts.value = true;
  productError.value = null;
  availableProducts.value = [];

  // ✅ Save current visaType before resetting
  const previousVisaType = formData.value.visaType;
  formData.value.visaType = "";

  try {
    console.log("🔍 Fetching products for:", { nationality, destination, forceRefresh });
    const response = await getNationalityDestinationProducts(
      nationality,
      destination,
      forceRefresh // Pass forceRefresh to bypass cache if needed
    );

    console.log("📦 Raw API Response:", response);

    if (response.success && response.data) {
      console.log("📊 Products received:", response.data.length);

      // ✅ Remove duplicates based on BOTH productName AND entryType
      const uniqueProducts = response.data.reduce((acc, product) => {
        const existing = acc.find(
          (p) =>
            p.productName === product.productName &&
            p.entryType === product.entryType
        );
        if (!existing) {
          acc.push(product);
        } else {
          console.log(
            "⚠️ Duplicate found, skipping:",
            product.productName,
            product.entryType
          );
        }
        return acc;
      }, [] as typeof response.data);

      // ✅ ENRICH PRODUCTS WITH PROCESSING FEES
      console.log("🔄 Enriching products with processing fees...");
      const enrichedProducts = await Promise.all(
        uniqueProducts.map((product) =>
          enrichProductWithProcessingFees(product)
        )
      );

      availableProducts.value = enrichedProducts;

      console.log(
        "✅ Products loaded with processing fees:",
        availableProducts.value.length
      );
      console.log(
        "📊 Product details:",
        enrichedProducts.map((p) => ({
          name: p.productName,
          entryType: p.entryType,
          duration: p.duration,
          processingFeesCount: p.processingFees?.length || 0,
        }))
      );

      // ✅ PRIORITY 1: Restore previous selection if it exists
      if (
        previousVisaType &&
        enrichedProducts.some(
          (p) => `${p.productName}|${p.entryType}` === previousVisaType
        )
      ) {
        formData.value.visaType = previousVisaType;
        console.log("✅ Restored previous selection:", previousVisaType);
      }
      // ✅ PRIORITY 2: Use initialData if going back
      else if (
        props.initialData?.visaType &&
        enrichedProducts.some(
          (p) =>
            `${p.productName}|${p.entryType}` === props.initialData.visaType
        )
      ) {
        formData.value.visaType = props.initialData.visaType;
        console.log(
          "✅ Restored from initialData:",
          props.initialData.visaType
        );
      }
      // ✅ PRIORITY 3: Auto-select first product only if no previous selection
      else if (availableProducts.value.length > 0) {
        formData.value.visaType = `${availableProducts.value[0].productName}|${availableProducts.value[0].entryType}`;
        console.log("✅ Auto-selected first product:", formData.value.visaType);
      } else {
        productError.value =
          "No visa products available for this nationality-destination combination";
      }
    } else {
      console.log("❌ API returned error:", response.message);
      productError.value = response.message || "Failed to load visa products";
    }
  } catch (error) {
    console.error("❌ Error fetching visa products:", error);
    productError.value = "Failed to load visa products. Please try again.";
  } finally {
    isLoadingProducts.value = false;
  }
};

const getFullLogoUrl = (logoUrl: string) => {
  if (!logoUrl) return "";

  // If already full URL (Cloudinary)
  if (logoUrl.startsWith("http://") || logoUrl.startsWith("https://")) {
    return logoUrl;
  }

  // Construct local URL
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase.replace(/\/+$/, "");
  const path = logoUrl.startsWith("/") ? logoUrl : `/${logoUrl}`;

  return `${baseUrl}${path}`;
};

// Get selected product details
const selectedProduct = computed(() => {
  if (!formData.value.visaType) return null;
  const [productName, entryType] = formData.value.visaType.split("|");
  return availableProducts.value.find(
    (p) => p.productName === productName && p.entryType === entryType
  );
});

// Watch for changes in selected product and emit updates in real-time
watch(selectedProduct, (newProduct) => {
  console.log("🔄 Selected product changed:", newProduct);
  
  // Only emit update if we have a valid product and visaType
  // This prevents emitting incomplete data when products are being cleared
  if (newProduct && formData.value.visaType) {
    console.log("✅ Emitting update with valid product data");
    emit('update', {
      nationality: formData.value.nationality,
      visaType: formData.value.visaType,
      applicants: formData.value.applicants,
      email: formData.value.email,
      productDetails: newProduct,
    });
  } else {
    console.log("⏭️ Skipping update - no valid product selected yet");
  }
});

// Validate email
const validateEmail = () => {
  const email = formData.value.email?.trim() || "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    emailError.value = "Email is required";
    return false;
  } else if (!emailRegex.test(email)) {
    emailError.value = "Please enter a valid email address";
    return false;
  } else {
    emailError.value = "";
    return true;
  }
};

// Watch email for real-time validation
watch(() => formData.value.email, () => {
  if (formData.value.email && emailError.value) {
    validateEmail();
  }
});

const handleNext = () => {
  // Validate email before proceeding
  if (!validateEmail()) {
    return;
  }

  console.log("➡️ Moving to next step with:", {
    nationality: formData.value.nationality,
    visaType: formData.value.visaType,
    applicants: formData.value.applicants,
    email: formData.value.email,
    productDetails: selectedProduct.value
  })
  
  
  emit('next', {
    nationality: formData.value.nationality,
    visaType: formData.value.visaType,
    applicants: formData.value.applicants,
    email: formData.value.email,
    productDetails: selectedProduct.value,
  });
};

// Watch for nationality changes to reset search query
watch(() => formData.value.nationality, () => {
  nationalitySearchQuery.value = '';
});

onMounted(async () => {
  await initializeRates()
  
  // Debug: Check if rates are loaded
  const { exchangeRates, selectedCurrency } = useCurrency();
  console.log("💱 Exchange Rates:", exchangeRates.value);
  console.log("💰 Selected Currency:", selectedCurrency.value);

  fetchNationalityOptions();

  // Pre-fill email from logged-in user if available
  if (isAuthenticated.value && currentUser.value?.email && !formData.value.email) {
    formData.value.email = currentUser.value.email;
    console.log("✅ Pre-filled email from logged-in user:", currentUser.value.email);
  }

  if (props.initialData) {
    // ✅ PRIORITY 1: If we have actual travelers data, use that count
    // This ensures when user goes back, the number reflects actual travelers added
    const actualTravelersCount =
      props.initialData.travelers?.length || props.initialData.applicants || 1;

    formData.value = {
      nationality: props.initialData.nationality || props.nationality,
      visaType: props.initialData.visaType || "",
      applicants: actualTravelersCount, // ✅ Use actual travelers count, not initially selected count
      email: props.initialData.email || formData.value.email || "",
    };

    console.log("✅ Restored from initialData:", {
      nationality: formData.value.nationality,
      visaType: formData.value.visaType,
      applicants: formData.value.applicants,
      email: formData.value.email,
      actualTravelersAdded: actualTravelersCount,
      hasTravelersData: !!props.initialData.travelers,
    });
  }
});
</script>
