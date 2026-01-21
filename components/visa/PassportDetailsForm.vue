<template>
<div class="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-[14px] items-start">    <!-- Left Side - Form -->
    <div
      class="flex-1 rounded-lg sm:rounded-xl"
      style="padding: 16px sm:20px md:24px"
    >
      <!-- Header -->
      <div class="mb-4 sm:mb-6">
        <h2
          class="text-base sm:text-lg leading-[22px] sm:leading-[24px]"
          style="
            font-family: Geist;
            font-weight: 600;
            color: #0b3947;
          "
        >
          Passport Details
        </h2>
        <p
          style="
            font-family: Manrope;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #6b7280;
          "
        >
          Enter the details as they appear on your passport.
        </p>
      </div>

      <!-- Single Traveler (No Dropdown) -->
      <div v-if="passportDetails.length === 1">
        <h3
          class="mb-5"
          style="
            font-family: Geist;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            color: #0b3947;
          "
        >
          Traveler 1
        </h3>

        <div class="space-y-5">
          <!-- Nationality on Passport -->
          <div>
            <Label
              htmlFor="nationality-0"
              style="
                font-family: Manrope;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                color: #0b3947;
              "
            >
              Nationality on Passport <span class="text-red-500">*</span>
            </Label>
            <div class="relative mt-2">
              <!-- Loading State -->
              <div
                v-if="isLoadingCountries"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <div
                  class="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"
                ></div>
                Loading countries...
              </div>

              <SearchableSelect
                v-else
                v-model="passportDetails[0].nationality"
                :countries="countries"
                :api-base="config.public.apiBase"
                value-key="countryName"
                placeholder="Select nationality"
                trigger-class="!h-[42px] sm:!h-[45px]"
              />
            </div>
          </div>

          <!-- Add Passport Details Later Checkbox -->
          <div>
            <div class="flex items-center gap-2">
              <Checkbox
                :checked="passportDetails[0].addPassportDetailsLater || false"
                @update:checked="(val: boolean) => handleAddPassportLaterToggle(0, val)"
              />
              <Label
                htmlFor="addPassportLater-0"
                style="
                  font-family: Manrope;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  color: #0b3947;
                  cursor: pointer;
                "
                @click="handleAddPassportLaterToggle(0, !passportDetails[0].addPassportDetailsLater)"
              >
                Add passport details later
              </Label>
            </div>
            <p
              v-if="passportDetails[0].addPassportDetailsLater"
              style="
                font-family: Manrope;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                color: #6b7280;
                margin-top: 4px;
                margin-left: 24px;
              "
            >
              You can provide passport details in the additional information form later.
            </p>
          </div>

          <!-- Passport Number -->
          <div v-show="!passportDetails[0].addPassportDetailsLater">
            <Label
              htmlFor="passportNumber-0"
              style="
                font-family: Manrope;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                color: #0b3947;
              "
            >
              Passport Number
            </Label>
            <Input
              id="passportNumber-0"
              v-model="passportDetails[0].passportNumber"
              placeholder="382764527389429843"
              class="mt-2"
            />
          </div>

          <!-- Passport Expiration Date -->
          <div v-show="!passportDetails[0].addPassportDetailsLater">
            <Label
              style="
                font-family: Manrope;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                color: #0b3947;
              "
            >
              Passport expiration date
            </Label>
            <div class="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-2">
              <Select v-model="passportDetails[0].expiryDate">
                <SelectTrigger
                  variant="form"
                  class="!h-[42px] sm:!h-[45px] !bg-white w-full px-2 sm:px-3 md:px-4"
                >
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent
                  class="max-h-[180px] overflow-y-auto"
                  position="popper"
                >
                  <SelectItem
                    v-for="day in 31"
                    :key="day"
                    :value="day.toString()"
                  >
                    {{ day }}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select v-model="passportDetails[0].expiryMonth">
                <SelectTrigger
                  variant="form"
                  class="!h-[42px] sm:!h-[45px] !bg-white w-full px-2 sm:px-3 md:px-4"
                >
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent
                  class="max-h-[250px] overflow-y-auto"
                  position="popper"
                >
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>

              <Select v-model="passportDetails[0].expiryYear">
                <SelectTrigger
                  variant="form"
                  class="!h-[42px] sm:!h-[45px] !bg-white w-full px-2 sm:px-3 md:px-4"
                >
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent
                  class="max-h-[300px] overflow-y-auto"
                  position="popper"
                >
                  <SelectItem
                    v-for="year in futureYears"
                    :key="year"
                    :value="year.toString()"
                  >
                    {{ year }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <!-- Residence Country -->
          <div v-show="!passportDetails[0].addPassportDetailsLater">
            <Label
              htmlFor="residenceCountry-0"
              style="
                font-family: Manrope;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                color: #0b3947;
              "
            >
              Residence Country
            </Label>
            <div class="relative mt-2">
              <!-- Loading State -->
              <div
                v-if="isLoadingCountries"
                class="flex items-center gap-2 text-sm text-gray-600"
              >
                <div
                  class="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"
                ></div>
                Loading countries...
              </div>

              <SearchableSelect
                v-else
                v-model="passportDetails[0].residenceCountry"
                :countries="countries"
                :api-base="config.public.apiBase"
                value-key="countryName"
                placeholder="Select country"
                trigger-class="!h-[42px] sm:!h-[45px]"
              />
            </div>
          </div>

          <!-- Schengen Visa Question -->
          <div v-show="!passportDetails[0].addPassportDetailsLater" style="gap: 8px; display: flex; flex-direction: column">
            <Label
              style="
                font-family: Manrope;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                color: #0b3947;
              "
            >
              Do you have a valid visa or residence permit from the Schengen
              Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand,
              Ireland, or Switzerland?
            </Label>
            <Select v-model="passportDetails[0].hasSchengenVisa">
              <SelectTrigger
                variant="form"
                class="!h-[45px] !bg-white w-full px-4"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <!-- Multiple Travelers (With Dropdown) -->
      <div v-else class="space-y-4">
        <div
          v-for="(traveler, index) in passportDetails"
          :key="index"
          class="border"
          style="
            height: auto;
            border-width: 1px;
            border-color: #e5e7eb;
            border-radius: 12px;
          "
        >
          <!-- Traveler Header - Clickable -->
          <button
            @click="toggleTraveler(index)"
            class="w-full flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            style="padding: 24px"
            type="button"
          >
            <h3
              style="
                font-family: Geist;
                font-weight: 600;
                font-size: 16px;
                line-height: 24px;
                color: #0b3947;
              "
            >
              Traveler {{ index + 1 }}
            </h3>
            <svg
              class="w-5 h-5 transition-transform"
              :class="{ 'rotate-180': expandedTravelers[index] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Passport Form - Collapsible -->
          <div
            v-show="expandedTravelers[index]"
            style="padding: 0 24px 24px 24px"
          >
            <div class="space-y-5">
              <!-- Nationality on Passport -->
              <div>
                <Label
                  :htmlFor="`nationality-${index}`"
                  style="
                    font-family: Manrope;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                >
                  Nationality on Passport <span class="text-red-500">*</span>
                </Label>
                <div class="relative mt-2">
                  <!-- Loading State -->
                  <div
                    v-if="isLoadingCountries"
                    class="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <div
                      class="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"
                    ></div>
                    Loading countries...
                  </div>

                  <SearchableSelect
                    v-else
                    v-model="traveler.nationality"
                    :countries="countries"
                    :api-base="config.public.apiBase"
                    value-key="countryName"
                    placeholder="Select nationality"
                    trigger-class="!h-[42px] sm:!h-[45px]"
                  />
                </div>
              </div>

              <!-- Add Passport Details Later Checkbox -->
              <div>
                <div class="flex items-center gap-2">
                  <Checkbox
                    :checked="traveler.addPassportDetailsLater || false"
                    @update:checked="(val: boolean) => handleAddPassportLaterToggle(index, val)"
                  />
                  <Label
                    :htmlFor="`addPassportLater-${index}`"
                    style="
                      font-family: Manrope;
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 20px;
                      color: #0b3947;
                      cursor: pointer;
                    "
                    @click="handleAddPassportLaterToggle(index, !traveler.addPassportDetailsLater)"
                  >
                    Add passport details later
                  </Label>
                </div>
                <p
                  v-if="traveler.addPassportDetailsLater"
                  style="
                    font-family: Manrope;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                    color: #6b7280;
                    margin-top: 4px;
                    margin-left: 24px;
                  "
                >
                  You can provide passport details in the additional information form later.
                </p>
              </div>

              <!-- Passport Number -->
              <div v-show="!traveler.addPassportDetailsLater">
                <Label
                  :htmlFor="`passportNumber-${index}`"
                  style="
                    font-family: Manrope;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                >
                  Passport Number
                </Label>
                <Input
                  :id="`passportNumber-${index}`"
                  v-model="traveler.passportNumber"
                  placeholder="382764527389429843"
                  class="mt-2"
                />
              </div>

              <!-- Passport Expiration Date -->
              <div v-show="!traveler.addPassportDetailsLater">
                <Label
                  style="
                    font-family: Manrope;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                >
                  Passport expiration date
                </Label>
                <div class="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-2">
                  <Select v-model="traveler.expiryDate">
                    <SelectTrigger
                      variant="form"
                      class="!h-[42px] sm:!h-[45px] !bg-white w-full px-2 sm:px-3 md:px-4"
                    >
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent
                      class="max-h-[180px] overflow-y-auto"
                      position="popper"
                    >
                      <SelectItem
                        v-for="day in 31"
                        :key="day"
                        :value="day.toString()"
                      >
                        {{ day }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select v-model="traveler.expiryMonth">
                    <SelectTrigger
                      variant="form"
                      class="!h-[42px] sm:!h-[45px] !bg-white w-full px-2 sm:px-3 md:px-4"
                    >
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent
                      class="max-h-[250px] overflow-y-auto"
                      position="popper"
                    >
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select v-model="traveler.expiryYear">
                    <SelectTrigger
                      variant="form"
                      class="!h-[42px] sm:!h-[45px] !bg-white w-full px-2 sm:px-3 md:px-4"
                    >
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent
                      class="max-h-[300px] overflow-y-auto"
                      position="popper"
                    >
                      <SelectItem
                        v-for="year in futureYears"
                        :key="year"
                        :value="year.toString()"
                      >
                        {{ year }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <!-- Residence Country -->
              <div v-show="!traveler.addPassportDetailsLater">
                <Label
                  :htmlFor="`residenceCountry-${index}`"
                  style="
                    font-family: Manrope;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                >
                  Residence Country
                </Label>
                <div class="relative mt-2">
                  <!-- Loading State -->
                  <div
                    v-if="isLoadingCountries"
                    class="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <div
                      class="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"
                    ></div>
                    Loading countries...
                  </div>

                  <SearchableSelect
                    v-else
                    v-model="traveler.residenceCountry"
                    :countries="countries"
                    :api-base="config.public.apiBase"
                    value-key="countryName"
                    placeholder="Select country"
                    trigger-class="!h-[42px] sm:!h-[45px]"
                  />
                </div>
              </div>

              <!-- Schengen Visa Question -->
              <div v-show="!traveler.addPassportDetailsLater" style="gap: 8px; display: flex; flex-direction: column">
                <Label
                  style="
                    font-family: Manrope;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                >
                  Do you have a valid visa or residence permit from the Schengen
                  Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand,
                  Ireland, or Switzerland?
                </Label>
                <Select v-model="traveler.hasSchengenVisa">
                  <SelectTrigger
                    variant="form"
                    class="!h-[42px] sm:!h-[45px] !bg-white w-full px-2 sm:px-3 md:px-4"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- Right Side - Summary Card -->
<div class="w-full lg:w-auto lg:flex-shrink-0 lg:sticky lg:top-24 h-fit">
  <PriceSummaryCard
    :destination="destination"
    :traveler-count="travelerCount"
    :product-details="productDetails"
    button-text="Save & Continue"
    @continue="handleSaveAndContinue"
  />
</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, onMounted, watch } from "vue";
import Button from "@/components/ui/button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SearchableSelect from "@/components/ui/SearchableSelect.vue";
import PriceSummaryCard from "@/components/visa/price-card.vue";
import Checkbox from "@/components/ui/Checkbox.vue";
import { useCountriesApi, type Country } from "@/composables/useCountries";
import { useRuntimeConfig } from "#app";

const props = defineProps<{
  destination: string;
  travelerCount: number;
  initialPassportData?: PassportDetail[];
  productDetails?: any;
}>();

const { productDetails, destination, travelerCount } = toRefs(props);

const emit = defineEmits<{
  next: [data: any];
  back: [];
  update: [data: any];
}>();

interface PassportDetail {
  nationality: string;
  passportNumber: string;
  expiryDate: string;
  expiryMonth: string;
  expiryYear: string;
  residenceCountry: string;
  hasSchengenVisa: string;
  addPassportDetailsLater?: boolean;
}

// API
const { getCountries } = useCountriesApi();
const config = useRuntimeConfig();

// State
const passportDetails = ref<PassportDetail[]>([]);
const expandedTravelers = ref<Record<number, boolean>>({});
const countries = ref<Country[]>([]);
const isLoadingCountries = ref(false);
const nationalitySearchQueries = ref<Record<number, string>>({});
const residenceCountrySearchQueries = ref<Record<number, string>>({});

// Generate future years for passport expiry (next 20 years)
const currentYear = new Date().getFullYear();
const futureYears = Array.from({ length: 20 }, (_, i) => currentYear + i);

// Helper functions
const handleFlagError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  console.error("❌ Flag failed to load:", img.src);
  img.style.display = "none";
};

const getFullLogoUrl = (logoUrl: string) => {
  if (!logoUrl) return "";

  // If already full URL (Cloudinary)
  if (logoUrl.startsWith("http://") || logoUrl.startsWith("https://")) {
    return logoUrl;
  }

  // Construct local URL
  const baseUrl = config.public.apiBase.replace(/\/+$/, "");
  const path = logoUrl.startsWith("/") ? logoUrl : `/${logoUrl}`;

  return `${baseUrl}${path}`;
};

const getSelectedCountry = (countryName: string) => {
  return countries.value.find((c) => c.countryName === countryName);
};

// ✅ Filtered countries based on search query for nationality - matches from start
const getFilteredNationalityCountries = (index: number) => {
  const query = nationalitySearchQueries.value[index] || '';
  if (!query.trim()) {
    return countries.value;
  }
  const searchTerm = query.toLowerCase().trim();
  return countries.value.filter((country) =>
    country.countryName.toLowerCase().startsWith(searchTerm)
  );
};

// ✅ Filtered countries based on search query for residence country - matches from start
const getFilteredResidenceCountries = (index: number) => {
  const query = residenceCountrySearchQueries.value[index] || '';
  if (!query.trim()) {
    return countries.value;
  }
  const searchTerm = query.toLowerCase().trim();
  return countries.value.filter((country) =>
    country.countryName.toLowerCase().startsWith(searchTerm)
  );
};

// Fetch countries from database
const fetchCountries = async () => {
  isLoadingCountries.value = true;
  try {
    const response = await getCountries();
    if (response.success && response.data) {
      countries.value = response.data.sort((a, b) => a.countryName.localeCompare(b.countryName));
      console.log(
        "✅ Loaded countries for passport form:",
        countries.value.length
      );
    }
  } catch (error) {
    console.error("Failed to fetch countries:", error);
  } finally {
    isLoadingCountries.value = false;
  }
};

// ✅ FIXED: Initialize passport details properly
const initializePassportDetails = () => {
  console.log("🔄 Initializing passport details:", {
    hasInitialData: !!props.initialPassportData,
    initialDataLength: props.initialPassportData?.length || 0,
    travelerCount: props.travelerCount,
  });

  // ✅ CASE 1: We have saved data
  if (props.initialPassportData && props.initialPassportData.length > 0) {
    passportDetails.value = [...props.initialPassportData];
    expandedTravelers.value = { 0: true };

    // ✅ CRITICAL FIX: If travelerCount is MORE than saved passport data, add empty forms
    if (props.travelerCount > passportDetails.value.length) {
      const toAdd = props.travelerCount - passportDetails.value.length;
      console.log(`➕ Adding ${toAdd} more passport forms for new travelers`);

      for (let i = 0; i < toAdd; i++) {
        const newIndex = passportDetails.value.length;
        passportDetails.value.push({
          nationality: "",
          passportNumber: "",
          expiryDate: "",
          expiryMonth: "",
          expiryYear: "",
          residenceCountry: "",
          hasSchengenVisa: "",
          addPassportDetailsLater: false,
        });
        expandedTravelers.value[newIndex] = true; // Expand newly added
      }

      console.log(
        "✅ Added new passport forms, total:",
        passportDetails.value.length
      );
    }

    return;
  }

  // ✅ CASE 2: No saved data, create fresh forms
  console.log(
    "🆕 Creating fresh passport forms for",
    props.travelerCount,
    "travelers"
  );
  passportDetails.value = Array.from({ length: props.travelerCount }, () => ({
    nationality: "",
    passportNumber: "",
    expiryDate: "",
    expiryMonth: "",
    expiryYear: "",
    residenceCountry: "",
    hasSchengenVisa: "",
    addPassportDetailsLater: false,
  }));

  expandedTravelers.value = { 0: true };
};

const toggleTraveler = (index: number) => {
  expandedTravelers.value[index] = !expandedTravelers.value[index];
};

// Handle "Add passport details later" checkbox toggle - preserve existing data
const handleAddPassportLaterToggle = (index: number, value: boolean) => {
  const traveler = passportDetails.value[index];
  if (!traveler) return;
  
  // Simply update the checkbox value without clearing any existing data
  // The data is preserved in the reactive object via v-model bindings
  // When fields are hidden with v-if, the data remains in the object
  // When fields are shown again, v-model will restore the values
  traveler.addPassportDetailsLater = value;
  
  // Explicitly ensure data is not cleared - preserve all existing values
  // This prevents any accidental clearing when the checkbox is toggled
};

const handleSaveAndContinue = () => {
  // Validate passport details
  // Nationality is always required
  // Other fields are only required if addPassportDetailsLater is false
  const isValid = passportDetails.value.every((p) => {
    // Nationality is always required
    if (!p.nationality) {
      return false;
    }

    // If addPassportDetailsLater is true, skip validation of other fields
    if (p.addPassportDetailsLater) {
      return true;
    }

    // Otherwise, all fields are required
    return (
      p.passportNumber &&
      p.expiryDate &&
      p.expiryMonth &&
      p.expiryYear &&
      p.residenceCountry &&
      p.hasSchengenVisa
    );
  });

  if (!isValid) {
    alert("Please fill in all required passport details for all travelers");
    return;
  }

  emit("next", { passportDetails: passportDetails.value });
};

// Initialize on mount
onMounted(() => {
  fetchCountries();
  initializePassportDetails();
});

// ✅ FIXED: Watch for traveler count changes more carefully
watch(
  () => props.travelerCount,
  (newCount, oldCount) => {
    console.log("👥 Traveler count changed:", {
      oldCount,
      newCount,
      currentPassportCount: passportDetails.value.length,
    });

    if (newCount && newCount !== oldCount) {
      if (newCount > passportDetails.value.length) {
        // User increased travelers - add more passport forms
        const toAdd = newCount - passportDetails.value.length;
        console.log(`➕ Adding ${toAdd} more passport forms`);

        for (let i = 0; i < toAdd; i++) {
          const newIndex = passportDetails.value.length;
          passportDetails.value.push({
            nationality: "",
            passportNumber: "",
            expiryDate: "",
            expiryMonth: "",
            expiryYear: "",
            residenceCountry: "",
            hasSchengenVisa: "",
          });
          expandedTravelers.value[newIndex] = true; // Expand newly added
        }

        console.log("✅ Passport forms now:", passportDetails.value.length);
      } else if (newCount < passportDetails.value.length) {
        // User decreased travelers - remove extra passport forms
        console.log(
          `➖ Removing ${
            passportDetails.value.length - newCount
          } passport forms`
        );
        passportDetails.value = passportDetails.value.slice(0, newCount);

        // Clean up expanded state
        const newExpanded: Record<number, boolean> = {};
        for (let i = 0; i < newCount; i++) {
          newExpanded[i] = expandedTravelers.value[i] || i === 0;
        }
        expandedTravelers.value = newExpanded;

        console.log("✅ Passport forms now:", passportDetails.value.length);
      }
    }
  }
);

// Watch for nationality changes to reset search queries
watch(
  () => passportDetails.value.map((p) => p.nationality),
  () => {
    passportDetails.value.forEach((passportDetail, index) => {
      if (passportDetail && passportDetail.nationality) {
        nationalitySearchQueries.value[index] = '';
      }
    });
  },
  { deep: true }
);

// Watch for residence country changes to reset search queries
watch(
  () => passportDetails.value.map((p) => p.residenceCountry),
  () => {
    passportDetails.value.forEach((passportDetail, index) => {
      if (passportDetail && passportDetail.residenceCountry) {
        residenceCountrySearchQueries.value[index] = '';
      }
    });
  },
  { deep: true }
);

// Auto-save passport details as user types
watch(
  () => passportDetails.value,
  (newPassportDetails) => {
    emit("update", { passportDetails: newPassportDetails });
  },
  { deep: true }
);
</script>
