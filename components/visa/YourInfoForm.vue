<template>
  <div class="flex" style="gap: 14px">
    <!-- Left Side - Form -->
    <div class="flex-1 rounded-xl" style="border-color: #e5e7eb; padding: 24px">
      <!-- Header -->
      <div class="mb-6">
        <h2
          style="
            font-family: Geist;
            font-weight: 600;
            font-size: 18px;
            line-height: 24px;
            color: #0b3947;
          "
        >
          Your Personal Details
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

      <!-- Travelers List -->
      <div class="space-y-4">
        <div
          v-for="(traveler, index) in travelers"
          :key="index"
          :class="travelers.length > 1 ? 'border' : ''"
          style="border-color: #e5e7eb; border-radius: 12px"
        >
          <!-- Traveler Header - Only show if multiple travelers -->
          <button
            v-if="travelers.length > 1"
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

          <!-- Single Traveler Header (No Dropdown) -->
          <h3
            v-else
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

          <!-- Traveler Form - Collapsible for multiple, always visible for single -->
          <div
            v-show="travelers.length === 1 || expandedTravelers[index]"
            :style="travelers.length > 1 ? 'padding: 0 24px 24px 24px;' : ''"
          >
            <div class="space-y-5">
              <!-- First and Middle Name -->
              <div>
                <Label
                  :htmlFor="`firstName-${index}`"
                  style="
                    font-family: Manrope;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                >
                  First and Middle Name
                </Label>
                <Input
                  :id="`firstName-${index}`"
                  v-model="traveler.firstName"
                  placeholder="John"
                  class="mt-2"
                />
              </div>

              <!-- Last Name -->
              <div>
                <Label
                  :htmlFor="`lastName-${index}`"
                  style="
                    font-family: Manrope;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                >
                  Last Name
                </Label>
                <Input
                  :id="`lastName-${index}`"
                  v-model="traveler.lastName"
                  placeholder="Doe"
                  class="mt-2"
                />
              </div>

              <!-- Date of Birth -->
              <div>
                <Label
                  style="
                    font-family: Manrope;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                >
                  Date of Birth
                </Label>
                <div class="grid grid-cols-3 gap-4 mt-2">
                  <Select v-model="traveler.birthDate">
                    <SelectTrigger class="!h-[45px] !bg-white w-full px-4">
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[180px]" :side-offset="5">
                      <SelectItem
                        v-for="day in 31"
                        :key="day"
                        :value="day.toString()"
                      >
                        {{ day }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select v-model="traveler.birthMonth">
                    <SelectTrigger class="!h-[45px] !bg-white w-full px-4">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[250px]" :side-offset="5">
                      <SelectItem
                        v-for="(month, idx) in months"
                        :key="idx"
                        :value="(idx + 1).toString()"
                      >
                        {{ month }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select v-model="traveler.birthYear">
                    <SelectTrigger class="!h-[45px] !bg-white w-full px-4">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent class="max-h-[300px]" :side-offset="5">
                      <SelectItem
                        v-for="year in years"
                        :key="year"
                        :value="year.toString()"
                      >
                        {{ year }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <!-- Email Address - Only for first traveler -->
              <div v-if="index === 0">
                <Label
                  :htmlFor="`email-${index}`"
                  style="
                    font-family: Manrope;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                >
                  Email Address
                </Label>
                <Input
                  :id="`email-${index}`"
                  v-model="traveler.email"
                  type="email"
                  placeholder="johnd@gmail.com"
                  :readonly="isAuthenticated && currentUser?.email"
                  class="mt-2"
                />
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
                  Your approved {{ destination }} Visa will be sent to this
                  email address.
                </p>
              </div>

              <!-- Phone Number - Only for first traveler -->
              <div v-if="index === 0">
                <Label
                  :htmlFor="`phone-${index}`"
                  style="
                    font-family: Manrope;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                >
                  Phone Number
                </Label>
                <Input
                  :id="`phone-${index}`"
                  v-model="traveler.phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  class="mt-2"
                />
              </div>

              <!-- Newsletter Checkbox - Only for first traveler -->
              <div v-if="index === 0" class="flex items-start gap-2">
                <Checkbox
                  :id="`newsletter-${index}`"
                  v-model:checked="traveler.receiveUpdates"
                  class="mt-1"
                />
                <Label
                  :htmlFor="`newsletter-${index}`"
                  style="
                    font-family: Inter;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    color: #0b3947;
                  "
                  class="cursor-pointer"
                >
                  I want to receive VISA123'S updates, product launches and
                  personalized offers. I can opt out anytime. Terms and Privacy
                  Policy apply.
                </Label>
              </div>

              <!-- Remove Traveler Button - Only show if multiple travelers and not the first one -->
              <div v-if="travelers.length > 1 && index > 0">
                <Button
                  @click="removeTraveler(index)"
                  class="w-auto"
                  style="
                    background-color: #dc2626;
                    color: white;
                    border-radius: 6px;
                    padding: 8px 16px;
                    font-family: Geist;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                  "
                >
                  Remove Traveler
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Another Traveler Button -->
        <div class="mt-6">
          <Button
            @click="addTraveler"
            class="w-auto"
            style="
              background-color: #1ece84;
              color: white;
              border-radius: 6px;
              padding: 8px 16px;
              font-family: Geist;
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
            "
          >
            Add Another traveler
          </Button>
        </div>
      </div>
    </div>

    <!-- Right Side - Summary Card -->
    <PriceSummaryCard
      :destination="destination"
      :traveler-count="travelers.length"
      :product-details="props.productDetails"
      button-text="Save & Continue"
      @continue="handleSaveAndContinue"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Button from "@/components/ui/button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import Checkbox from "@/components/ui/Checkbox.vue";
import PriceSummaryCard from "@/components/visa/price-card.vue";
import { useAuthApi } from "@/composables/useAuth";

const props = defineProps<{
  destination: string;
  initialTravelerCount?: number;
  initialTravelersData?: Traveler[];
  productDetails?: any;
}>();

const emit = defineEmits<{
  next: [data: any];
  back: [];
  update: [data: any];
}>();

interface Traveler {
  firstName: string
  lastName: string
  birthDate: string
  birthMonth: string
  birthYear: string
  email: string
  phone: string
  receiveUpdates: boolean
}

const travelers = ref<Traveler[]>([]);
const expandedTravelers = ref<Record<number, boolean>>({});

// Auth composables
const { currentUser, isAuthenticated } = useAuthApi();



// Constants
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const GOVERNMENT_FEE_PER_TRAVELER = 3667.16;

watch(
  () => props.initialTravelerCount,
  (newCount, oldCount) => {
    if (newCount && newCount !== oldCount) {
      console.log("🔄 Traveler count changed:", {
        oldCount,
        newCount,
        currentCount: travelers.value.length,
      });

      if (newCount > travelers.value.length) {
        // User increased applicants - add more empty traveler forms
        const toAdd = newCount - travelers.value.length;
        console.log(`➕ Adding ${toAdd} more travelers`);

        for (let i = 0; i < toAdd; i++) {
          const newIndex = travelers.value.length;
          travelers.value.push(createEmptyTraveler());
          expandedTravelers.value[newIndex] = true; // Expand newly added
        }
      } else if (newCount < travelers.value.length) {
        // User decreased applicants - remove extra travelers
        // Keep existing data for remaining travelers
        console.log(
          `➖ Removing ${travelers.value.length - newCount} travelers`
        );
        travelers.value = travelers.value.slice(0, newCount);

        // Clean up expanded state
        const newExpanded: Record<number, boolean> = {};
        for (let i = 0; i < newCount; i++) {
          newExpanded[i] = expandedTravelers.value[i] || i === 0;
        }
        expandedTravelers.value = newExpanded;
      }

      // Ensure email is set to logged-in user's email after count change
      if (
        isAuthenticated.value &&
        currentUser.value?.email &&
        travelers.value.length > 0
      ) {
        travelers.value[0].email = currentUser.value.email;
      }
    }
    
    // Ensure email is set to logged-in user's email after count change
    if (isAuthenticated.value && currentUser.value?.email && travelers.value.length > 0) {
      travelers.value[0].email = currentUser.value.email
    }
  }
);

// Watch for initial travelers data changes (e.g., when navigating back)
watch(
  () => props.initialTravelersData,
  (newData) => {
    if (newData?.length && newData.length === travelers.value.length) {
      // Ensure email is always set to logged-in user's email if authenticated
      if (
        isAuthenticated.value &&
        currentUser.value?.email &&
        travelers.value.length > 0
      ) {
        travelers.value[0].email = currentUser.value.email;
        console.log(
          "✅ Overrode email with logged-in user email:",
          currentUser.value.email
        );
      }
    }
  },
  { deep: true }
);

// Initialize travelers
const initializeTravelers = () => {
  if (props.initialTravelersData?.length) {
    // Use existing traveler data (when going back with filled data)
    travelers.value = props.initialTravelersData;
    console.log("✅ Restored existing travelers:", travelers.value.length);
  } else {
    // Create new empty travelers (first time or no saved data)
    const count = props.initialTravelerCount || 1;
    travelers.value = Array.from({ length: count }, createEmptyTraveler);
    console.log("✅ Created new travelers:", count);
  }

  // Expand first traveler by default
  expandedTravelers.value = { 0: true };

  // Always set email to logged-in user's email if authenticated
  if (
    isAuthenticated.value &&
    currentUser.value?.email &&
    travelers.value.length > 0
  ) {
    travelers.value[0].email = currentUser.value.email;
    console.log("✅ Set email to logged-in user:", currentUser.value.email);
  }
};

// Auto-save as user types
watch(
  () => travelers.value,
  (newTravelers) => {
    emit("update", { travelers: newTravelers });
  },
  { deep: true }
);

// Auto-save when adding/removing travelers
watch(
  () => travelers.value.length,
  (newLength, oldLength) => {
    if (oldLength !== undefined) {
      console.log("👥 Travelers count changed:", newLength);
      emit("update", { travelers: travelers.value });
    }
  }
);

const createEmptyTraveler = (): Traveler => ({
  firstName: "",
  lastName: "",
  birthDate: "",
  birthMonth: "",
  birthYear: "",
  email: "",
  phone: "",
  receiveUpdates: false,
});

initializeTravelers();

// Watch for auth state changes and always set email to logged-in user's email
watch(
  [isAuthenticated, currentUser],
  ([authenticated, user]) => {
    if (authenticated && user?.email && travelers.value.length > 0) {
      travelers.value[0].email = user.email;
      console.log(
        "✅ Set email to logged-in user after auth change:",
        user.email
      );
    }
  },
  { immediate: false }
);

// Watch the email field to ensure it always matches logged-in user's email
watch(
  () => travelers.value[0]?.email,
  (newEmail) => {
    if (
      isAuthenticated.value &&
      currentUser.value?.email &&
      travelers.value.length > 0
    ) {
      // If user is logged in and email doesn't match, reset it
      if (newEmail !== currentUser.value.email) {
        travelers.value[0].email = currentUser.value.email;
        console.log(
          "✅ Reset email to logged-in user email:",
          currentUser.value.email
        );
      }
    }
  }
);

const governmentFee = computed(
  () => travelers.value.length * GOVERNMENT_FEE_PER_TRAVELER
);

const toggleTraveler = (index: number) => {
  expandedTravelers.value[index] = !expandedTravelers.value[index];
};

const addTraveler = () => {
  const newIndex = travelers.value.length;
  console.log("➕ Adding new traveler, new count:", newIndex + 1);

  travelers.value.push(createEmptyTraveler());
  expandedTravelers.value[newIndex] = true;

  console.log("💾 Emitting update with", travelers.value.length, "travelers");
  emit("update", { travelers: travelers.value });
};

const removeTraveler = (index: number) => {
  if (travelers.value.length > 1) {
    // ✅ Add safety check
    travelers.value.splice(index, 1);

    // Rebuild expanded state
    const newExpanded: Record<number, boolean> = {};
    Object.keys(expandedTravelers.value).forEach((key) => {
      const keyNum = parseInt(key);
      if (keyNum < index) {
        newExpanded[keyNum] = expandedTravelers.value[keyNum];
      } else if (keyNum > index) {
        newExpanded[keyNum - 1] = expandedTravelers.value[keyNum];
      }
    });
    expandedTravelers.value = newExpanded;

    // ✅ NEW: Explicitly emit update after removal
    console.log("👥 Traveler removed, new count:", travelers.value.length);
    emit("update", { travelers: travelers.value });
  }
};

const isFormValid = () => {
  for (let i = 0; i < travelers.value.length; i++) {
    const t = travelers.value[i];

    // Type guard
    if (!t) continue;

    // Check required fields for all travelers
    if (
      !t.firstName.trim() ||
      !t.lastName.trim() ||
      !t.birthDate ||
      !t.birthMonth ||
      !t.birthYear
    ) {
      return false;
    }

    // Only check email and phone for first traveler
    if (i === 0) {
      if (!t.email.trim() || !t.phone.trim()) {
        return false;
      }
    }
  }

  return true;
};

const handleSaveAndContinue = () => {
  if (!isFormValid()) {
    alert("Please fill in all required fields for all travelers");
    return;
  }

  emit("next", { travelers: travelers.value });
};
</script>
