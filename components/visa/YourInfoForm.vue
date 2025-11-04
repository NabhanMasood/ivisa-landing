<template>
  <div class="flex gap-6">
    <!-- Left Side - Form -->
    <div class="flex-1">
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
          class="border"
          style="
            width: 656px;
            height: auto;
            border-width: 1px;
            border-color: #e5e7eb;
            border-radius: 12px;
            gap: 24px;
          "
        >
          <!-- Traveler Header - Clickable -->
          <button
            @click="toggleTraveler(index)"
            class="w-full flex items-center justify-between text-left hover:bg-gray-50"
            style="
              padding-top: 30px;
              padding-right: 10px;
              padding-bottom: 30px;
              padding-left: 10px;
            "
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

          <!-- Traveler Form - Collapsible -->
          <!-- Form container - width: 636px, padding: 0 24px -->
          <div
            v-show="expandedTravelers[index]"
            style="
              width: 636px;
              padding-right: 24px;
              padding-left: 24px;
              padding-bottom: 24px;
            "
          >
            <!-- Inner content - width: 588px, gap: 20px -->
            <div class="space-y-5" style="width: 588px; gap: 20px">
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
                    <SelectTrigger>
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent
                      class="max-h-[180px] overflow-y-auto"
                      position="popper"
                      :sideOffset="5"
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

                  <Select v-model="traveler.birthMonth">
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent
                      class="max-h-[250px] overflow-y-auto"
                      position="popper"
                      :sideOffset="5"
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

                  <Select v-model="traveler.birthYear">
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent
                      class="max-h-[300px] overflow-y-auto"
                      position="popper"
                      :sideOffset="5"
                    >
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

              <!-- Email Address -->
              <div>
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

              <!-- Remove Traveler Button - Only if more than 1 traveler -->
              <div v-if="travelers.length > 1">
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

    <!-- Right Side - Summary Card -->
    <div class="w-[400px] space-y-4">
      <!-- Price Summary Card -->
      <div class="border-2 rounded-xl p-6" style="border-color: #1ece84">
        <div class="space-y-4">
          <!-- Visa Info -->
          <div class="flex justify-between items-center">
            <span
              style="
                font-family: Geist;
                font-weight: 600;
                font-size: 16px;
                line-height: 24px;
                color: #0b3947;
              "
            >
              {{ destination }} Visa
            </span>
            <div class="flex justify-end">
              <span
                style="
                  font-family: Geist;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 20px;
                  color: #27272b;
                "
              >
                {{ travelers.length }} traveler{{
                  travelers.length > 1 ? "s" : ""
                }}
              </span>
            </div>
          </div>

          <!-- Government Fee -->
          <div class="flex justify-between items-center">
            <span
              style="
                font-family: Geist;
                font-weight: 600;
                font-size: 16px;
                line-height: 20px;
                color: #0b3947;
              "
            >
              Government Fee
            </span>
            <div class="flex justify-end">
              <span
                style="
                  font-family: Geist;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 20px;
                  color: #27272b;
                "
              >
                Rs {{ governmentFee.toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t" style="border-color: #e5e7eb"></div>

          <!-- Total -->
          <div class="flex justify-between items-center">
            <span
              style="
                font-family: Manrope;
                font-weight: 600;
                font-size: 16px;
                line-height: 24px;
                color: #0b3947;
              "
            >
              Total
            </span>
            <div class="flex justify-end">
              <span
                style="
                  font-family: geist;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  color: #27272b;
                "
              >
                Calculated at checkout
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Save & Continue Button -->
      <Button
        @click="handleSaveAndContinue"
        class="w-full h-12"
        style="
          background-color: #1ece84;
          color: white;
          border-radius: 6px;
          font-family: Geist;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
        "
      >
        Save & Countinue
      </Button>

      <!-- Security Message -->
      <div class="border rounded-xl p-4" style="border-color: #e5e7eb">
        <div class="flex items-start gap-3">
          <img
            src="/svg/Union.svg"
            alt="Max stay"
            style="width: 19.2px; height: 19.2px"
          />

          <p
            style="
              font-family: Geist;
              font-weight: 500;
              font-size: 16px;
              line-height: 20px;
              color: #3e3e3e;
            "
          >
            We take strong measures to protect your information
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "@/components/ui/button.vue";
import Input from "@/components/ui/input.vue";
import Label from "@/components/ui/label/Label.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import Checkbox from "@/components/ui/Checkbox.vue";

const props = defineProps<{
  destination: string;
  initialTravelerCount?: number;
  initialTravelersData?: Traveler[];
}>();

const emit = defineEmits<{
  next: [data: any];
  back: [];
}>();

interface Traveler {
  firstName: string;
  lastName: string;
  birthDate: string;
  birthMonth: string;
  birthYear: string;
  email: string;
  receiveUpdates: boolean;
}

const travelers = ref<Traveler[]>([]);
const expandedTravelers = ref<Record<number, boolean>>({});

// Initialize travelers based on count from step 1
const initializeTravelers = () => {
  // First check if we have saved data
  if (props.initialTravelersData && props.initialTravelersData.length > 0) {
    travelers.value = props.initialTravelersData;
    // Expand first traveler by default
    expandedTravelers.value = { 0: true };
    return;
  }

  // Otherwise create new travelers
  const count = props.initialTravelerCount || 1;
  travelers.value = Array.from({ length: count }, () => ({
    firstName: "",
    lastName: "",
    birthDate: "",
    birthMonth: "",
    birthYear: "",
    email: "",
    receiveUpdates: false,
  }));

  // Expand first traveler by default
  expandedTravelers.value = { 0: true };
};

initializeTravelers();

// Generate years for date picker (last 100 years)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const governmentFee = computed(() => {
  return travelers.value.length * 3667.16;
});

const toggleTraveler = (index: number) => {
  expandedTravelers.value[index] = !expandedTravelers.value[index];
};

const addTraveler = () => {
  const newIndex = travelers.value.length;
  travelers.value.push({
    firstName: "",
    lastName: "",
    birthDate: "",
    birthMonth: "",
    birthYear: "",
    email: "",
    receiveUpdates: false,
  });
  // Auto-expand newly added traveler
  expandedTravelers.value[newIndex] = true;
};

const removeTraveler = (index: number) => {
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
};

const handleSaveAndContinue = () => {
  // Validate all travelers have required info
  const isValid = travelers.value.every(
    (t) =>
      t.firstName &&
      t.lastName &&
      t.birthDate &&
      t.birthMonth &&
      t.birthYear &&
      t.email
  );

  if (!isValid) {
    alert("Please fill in all required fields for all travelers");
    return;
  }

  emit("next", { travelers: travelers.value });
};
</script>
