<template>
  <div class="border rounded-xl p-6" style="border-color: #e5e7eb">
    <div class="mb-6">
      <p
        style="
          font-family: Geist;
          font-weight: 600;
          font-size: 14px;
          line-height: 22px;
          color: #0b3947;
        "
      >
        The {{ destination }} Visa is mandatory for {{ nationality }} passport
        holders planning to enter {{ destination }}
      </p>
    </div>

    <div class="space-y-6">
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
            <SelectItem
              v-for="country in nationalityOptions"
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
            class="w-full mt-2 h-10"
            style="
              font-family: Manrope, sans-serif;
              font-size: 14px;
              padding-left: 0.75rem !important;
              padding-right: 1rem !important;
            "
            :disabled="availableProducts.length === 0"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="product in availableProducts"
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

      <Button
        @click="handleNext"
        :disabled="
          !formData.visaType ||
          isLoadingProducts ||
          availableProducts.length === 0
        "
        class="w-[143px] h-9"
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
import Label from "@/components/ui/label.vue";
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

const props = defineProps<{
  nationality: string;
  destination: string;
  initialData?: any;
}>();

const emit = defineEmits<{
  next: [data: any];
}>();

// API composables
const { getNationalityDestinationProducts } = useNationalitiesApi();
const { getCountries } = useCountriesApi();
const { getVisaProductById } = useVisaProductsApi();
const { formatPrice, initializeRates, selectedCurrency, getCurrentRate } =
  useCurrency();

// State
const formData = ref({
  nationality: props.nationality,
  visaType: "",
  applicants: 1,
});

interface Country {
  id?: number | string;
  countryName: string;
  flag?: string;
  code?: string;
}

const nationalityOptions = ref<Country[]>([]);
const isLoadingCountries = ref(false);
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

// ✅ Computed property to get selected country with flag
const selectedCountry = computed(() => {
  return nationalityOptions.value.find(
    (c) => c.countryName === formData.value.nationality
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
  async ([nationality, destination]) => {
    if (nationality && destination) {
      await fetchVisaProducts(nationality as string, destination as string);
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
        return {
          ...product,
          processingFees: response.data.processingFees, // ✅ Add processing fees
          // Keep nationality-specific pricing if it exists
          govtFee: product.govtFee || response.data.govtFee,
          serviceFee: product.serviceFee || response.data.serviceFee,
          totalAmount: product.totalAmount || response.data.totalAmount,
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

const fetchVisaProducts = async (nationality: string, destination: string) => {
  isLoadingProducts.value = true;
  productError.value = null;
  availableProducts.value = [];

  // ✅ Save current visaType before resetting
  const previousVisaType = formData.value.visaType;
  formData.value.visaType = "";

  try {
    console.log("🔍 Fetching products for:", { nationality, destination });
    const response = await getNationalityDestinationProducts(
      nationality,
      destination
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

const handleNext = () => {
  console.log("➡️ Moving to next step with:", {
    nationality: formData.value.nationality,
    visaType: formData.value.visaType,
    applicants: formData.value.applicants,
    productDetails: selectedProduct.value
  })
  
  
  emit('next', {
    nationality: formData.value.nationality,
    visaType: formData.value.visaType,
    applicants: formData.value.applicants,
    productDetails: selectedProduct.value,
  });
};

onMounted(async () => {
  await initializeRates()
  
  // Debug: Check if rates are loaded
  const { exchangeRates, selectedCurrency } = useCurrency();
  console.log("💱 Exchange Rates:", exchangeRates.value);
  console.log("💰 Selected Currency:", selectedCurrency.value);

  fetchNationalityOptions();

  if (props.initialData) {
    // ✅ PRIORITY 1: If we have actual travelers data, use that count
    // This ensures when user goes back, the number reflects actual travelers added
    const actualTravelersCount =
      props.initialData.travelers?.length || props.initialData.applicants || 1;

    formData.value = {
      nationality: props.initialData.nationality || props.nationality,
      visaType: props.initialData.visaType || "",
      applicants: actualTravelersCount, // ✅ Use actual travelers count, not initially selected count
    };

    console.log("✅ Restored from initialData:", {
      nationality: formData.value.nationality,
      visaType: formData.value.visaType,
      applicants: formData.value.applicants,
      actualTravelersAdded: actualTravelersCount,
      hasTravelersData: !!props.initialData.travelers,
    });
  }
});
</script>
