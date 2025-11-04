<template>
  <div class="flex gap-6">
    <!-- Left Side - Processing Time Selection -->
    <div class="flex-1">
      <!-- Header -->
      <div
        class="mb-6"
        style="
          width: 656px;
          height: 43px;
          gap: 7px;
          padding-right: 24px;
          padding-bottom: 6px;
        "
      >
        <h2
          style="
            font-family: Geist;
            font-weight: 600;
            font-size: 16px;
            line-height: 16px;
            color: #27272b;
          "
        >
          Choose your processing time
        </h2>
        <p
          style="
            font-family: Manrope;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #757579;
          "
        >
          Enter the details as they appear on your passport.
        </p>
      </div>

      <!-- Processing Options Card -->
      <div class="border rounded-xl p-6" style="border-color: #e5e7eb">
        <!-- Passport Details Header -->
        <div class="mb-6">
          <h3
            style="
              font-family: Geist;
              font-weight: 600;
              font-size: 16px;
              line-height: 24px;
              color: #0b3947;
            "
          >
            Passport Details
          </h3>
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

        <!-- Processing Time Options -->
        <div class="space-y-4">
          <!-- Standard Option -->
          <button
            @click="selectedProcessing = 'standard'"
            class="text-left transition-all"
            :style="{
              width: '588px',
              height: '70px',
              borderWidth: '1px',
              gap: '10px',
              borderRadius: '10px',
              paddingTop: '14px',
              paddingRight: '15px',
              paddingBottom: '14px',
              paddingLeft: '15px',
              border:
                selectedProcessing === 'standard'
                  ? '1px solid #1ECE84'
                  : '1px solid #D4D4DA',
              backgroundColor:
                selectedProcessing === 'standard' ? '#E8FFF6' : '#FFFFFF',
            }"
            type="button"
          >
            <div class="flex justify-between items-center">
              <div>
                <h4
                  style="
                    font-family: Geist;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 24px;
                    color: #0b3947;
                  "
                >
                  Standard
                </h4>
                <p
                  style="
                    font-family: Manrope;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    color: #6b7280;
                  "
                >
                  24 Hour Processing
                </p>
              </div>
              <span
                style="
                  font-family: Geist;
                  font-weight: 600;
                  font-size: 16px;
                  line-height: 24px;
                  color: #0b3947;
                "
              >
                +5,320 PKR
              </span>
            </div>
          </button>

          <!-- Rush Option -->
          <button
            @click="selectedProcessing = 'rush'"
            class="text-left transition-all"
            :style="{
              width: '588px',
              height: '70px',
              borderWidth: '1px',
              gap: '10px',
              borderRadius: '10px',
              paddingTop: '14px',
              paddingRight: '15px',
              paddingBottom: '14px',
              paddingLeft: '15px',
              border:
                selectedProcessing === 'rush'
                  ? '1px solid #1ECE84'
                  : '1px solid #D4D4DA',
              backgroundColor:
                selectedProcessing === 'rush' ? '#E8FFF6' : '#FFFFFF',
            }"
            type="button"
          >
            <div class="flex justify-between items-center">
              <div>
                <h4
                  style="
                    font-family: Geist;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 24px;
                    color: #0b3947;
                  "
                >
                  Rush
                </h4>
                <p
                  style="
                    font-family: Manrope;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    color: #6b7280;
                  "
                >
                  4 Hour Processing
                </p>
              </div>
              <span
                style="
                  font-family: Geist;
                  font-weight: 600;
                  font-size: 16px;
                  line-height: 24px;
                  color: #0b3947;
                "
              >
                +5,320 PKR
              </span>
            </div>
          </button>

          <!-- Super Rush Option -->
          <button
            @click="selectedProcessing = 'super-rush'"
            class="text-left transition-all"
            :style="{
              width: '588px',
              height: '70px',
              borderWidth: '1px',
              gap: '10px',
              borderRadius: '10px',
              paddingTop: '14px',
              paddingRight: '15px',
              paddingBottom: '14px',
              paddingLeft: '15px',
              border:
                selectedProcessing === 'super-rush'
                  ? '1px solid #1ECE84'
                  : '1px solid #D4D4DA',
              backgroundColor:
                selectedProcessing === 'super-rush' ? '#E8FFF6' : '#FFFFFF',
            }"
            type="button"
          >
            <div class="flex justify-between items-center">
              <div>
                <h4
                  style="
                    font-family: Geist;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 24px;
                    color: #0b3947;
                  "
                >
                  Super Rush
                </h4>
                <p
                  style="
                    font-family: Manrope;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    color: #6b7280;
                  "
                >
                  30 Minute Processing
                </p>
              </div>
              <span
                style="
                  font-family: Geist;
                  font-weight: 600;
                  font-size: 16px;
                  line-height: 24px;
                  color: #0b3947;
                "
              >
                +15,320 PKR
              </span>
            </div>
          </button>
        </div>
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
                {{ travelerCount }} traveler{{ travelerCount > 1 ? "s" : "" }}
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
        @click="handleContinue"
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
            alt="Security"
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
            We take strong measuresto protect your information
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "@/components/ui/Button.vue";

const props = defineProps<{
  destination: string;
  travelerCount: number;
  governmentFee: number;
}>();

const emit = defineEmits<{
  next: [data: any];
  back: [];
}>();

const selectedProcessing = ref<"standard" | "rush" | "super-rush">("standard");

const processingFees = {
  standard: 5320,
  rush: 5320,
  "super-rush": 15320,
};

const handleContinue = () => {
  if (!selectedProcessing.value) {
    alert("Please select a processing time");
    return;
  }

  emit("next", {
    processingType: selectedProcessing.value,
    processingFee: processingFees[selectedProcessing.value],
  });
};
</script>
