<template>
  <div class="min-h-screen py-10 pb-32 px-52">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header Section -->
      <div class="flex items-center justify-between">
        <h1
          class="text-2xl font-semibold leading-8"
          style="font-family: Geist; color: #020617; letter-spacing: -0.006em"
        >
          Additional Information
        </h1>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ECE84]"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-4"
      >
        <p class="text-red-600">{{ error }}</p>
        <Button @click="initializeData" class="mt-4">Retry</Button>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!fields || fields.length === 0"
        class="bg-white rounded-xl shadow-sm p-12 text-center border"
      >
        <div class="max-w-md mx-auto">
          <div
            class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            No Additional Information Required
          </h3>
          <p class="text-gray-600 mb-6">
            There are no additional fields to fill for this application.
          </p>
        </div>
      </div>

      <!-- Multi-Traveler Form Interface -->
      <div v-else class="space-y-6">
        <!-- Application Info -->
        <div
          v-if="application"
          class="bg-white rounded-xl border p-4"
          style="border-color: #e4e4e8"
        >
          <h2
            class="text-base font-semibold leading-4"
            style="font-family: Geist; color: #27272b"
          >
            {{ application.destinationCountry || "Visa Application" }}
          </h2>
          <p class="text-sm text-gray-600 mt-1">
            Application #{{ application.applicationNumber }}
          </p>
        </div>

        <!-- Admin Note (when resubmission requested) -->
        <div
          v-if="isResubmissionActive && adminNoteToShow"
          class="rounded-xl border p-4 bg-orange-50 border-orange-200 text-orange-900"
        >
          <div class="flex items-start gap-3">
            <svg
              class="w-5 h-5 mt-0.5 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01M5.07 19h13.86A2.07 2.07 0 0021 16.93L13.93 4.14a2.07 2.07 0 00-3.86 0L3 16.93A2.07 2.07 0 005.07 19z"
              />
            </svg>
            <div>
              <p class="font-medium" style="font-family: Geist">
                Additional information requested
              </p>
              <p class="text-sm mt-1" style="font-family: Inter">
                {{ adminNoteToShow }}
              </p>
            </div>
          </div>
        </div>

        <!-- Traveler Tabs -->
        <div
          class="bg-white rounded-xl border overflow-hidden"
          style="border-color: #e4e4e8"
        >
          <!-- Tab Headers -->
          <div
            class="border-b flex overflow-x-auto"
            style="border-color: #e4e4e8"
          >
            <button
              v-for="(traveler, index) in allTravelers"
              :key="traveler.id || `traveler-${index}`"
              @click="selectTraveler(traveler.id || null, index)"
              class="px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors relative"
              :class="[
                selectedTravelerId === (traveler.id || null) &&
                selectedTravelerIndex === index
                  ? 'border-[#1ECE84] text-[#1ECE84]'
                  : 'border-transparent text-gray-600 hover:text-gray-900',
              ]"
            >
              <div class="flex items-center gap-2">
                <span>{{ getTravelerName(traveler, index) }}</span>
                <!-- Status Badge -->
                <span
                  class="px-2 py-0.5 text-xs rounded-full font-medium"
                  :class="getTravelerStatusClass(traveler.id || null, index)"
                >
                  {{ getTravelerStatus(traveler.id || null, index) }}
                </span>
              </div>
            </button>
          </div>

          <!-- Form Content -->
          <div class="p-6">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Current Traveler Info -->
              <div class="pb-4 border-b" style="border-color: #e4e4e8">
                <h3
                  class="text-lg font-semibold"
                  style="font-family: Geist; color: #020617"
                >
                  {{ getTravelerName(currentTraveler, selectedTravelerIndex) }}
                </h3>
                <p class="text-sm text-gray-600 mt-1">
                  Traveler Information
                </p>
              </div>

              <!-- Dynamic Fields -->
              <div
                v-for="field in sortedFields"
                :key="field.id"
                class="space-y-2"
              >
                <label
                  class="block text-sm font-medium leading-5"
                  :class="shouldHighlightField(field) ? 'text-red-600' : ''"
                  style="font-family: Inter; letter-spacing: -0.006em"
                >
                  {{ field.question }}
                  <span v-if="field.isRequired" class="text-red-500">*</span>
                  <span
                    v-if="shouldHighlightField(field)"
                    class="ml-2 text-xs font-medium text-red-600"
                    >Requested</span
                  >
                </label>

                <!-- Text Input -->
                <Input
                  v-if="field.fieldType === 'text'"
                  :model-value="formResponses[field.id]?.value ?? ''"
                  @update:model-value="(val: string) => { const resp = formResponses[field.id!]; if (resp) resp.value = val }"
                  :placeholder="field.question"
                  class="w-full h-9 border"
                  :class="
                    shouldHighlightField(field)
                      ? 'border-red-500 ring-1 ring-red-200'
                      : ''
                  "
                  :required="field.isRequired"
                  :minlength="field.minLength"
                  :maxlength="field.maxLength"
                  :disabled="isFieldDisabled(field)"
                />

                <!-- Number Input -->
                <Input
                  v-else-if="field.fieldType === 'number'"
                  :model-value="formResponses[field.id]?.value ?? ''"
                  @update:model-value="(val: string) => { const resp = formResponses[field.id!]; if (resp) resp.value = val }"
                  type="number"
                  :placeholder="field.question"
                  class="w-full h-9 border"
                  :class="
                    shouldHighlightField(field)
                      ? 'border-red-500 ring-1 ring-red-200'
                      : ''
                  "
                  :required="field.isRequired"
                  :min="field.minLength"
                  :max="field.maxLength"
                  :disabled="isFieldDisabled(field)"
                />

                <!-- Textarea -->
                <textarea
                  v-else-if="field.fieldType === 'textarea'"
                  :value="formResponses[field.id]?.value ?? ''"
                  @input="(e: Event) => { const resp = formResponses[field.id!]; if (resp) resp.value = (e.target as HTMLTextAreaElement).value }"
                  :placeholder="field.question"
                  class="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  :class="
                    shouldHighlightField(field)
                      ? 'border-red-500 ring-1 ring-red-200'
                      : ''
                  "
                  :required="field.isRequired"
                  :minlength="field.minLength"
                  :maxlength="field.maxLength"
                  :disabled="isFieldDisabled(field)"
                />

                <!-- Date Input -->
                <div
                  v-else-if="field.fieldType === 'date'"
                  class="grid grid-cols-3 gap-4"
                >
                  <Select
                    :model-value="formResponses[field.id]?.date?.day ?? ''"
                    @update:model-value="(val: string) => { const resp = formResponses[field.id!]; if (resp && resp.date) resp.date.day = val }"
                    :disabled="isFieldDisabled(field)"
                    :class="
                      shouldHighlightField(field)
                        ? 'border-red-500 ring-1 ring-red-200 rounded-md'
                        : ''
                    "
                  >
                    <SelectTrigger variant="form">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="day in dayOptions"
                        :key="day.value"
                        :value="day.value"
                      >
                        {{ day.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    :model-value="formResponses[field.id]?.date?.month ?? ''"
                    @update:model-value="(val: string) => { const resp = formResponses[field.id!]; if (resp && resp.date) resp.date.month = val }"
                    :disabled="isFieldDisabled(field)"
                    :class="
                      shouldHighlightField(field)
                        ? 'border-red-500 ring-1 ring-red-200 rounded-md'
                        : ''
                    "
                  >
                    <SelectTrigger variant="form">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="month in monthOptions"
                        :key="month.value"
                        :value="month.value"
                      >
                        {{ month.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    :model-value="formResponses[field.id]?.date?.year ?? ''"
                    @update:model-value="(val: string) => { const resp = formResponses[field.id!]; if (resp && resp.date) resp.date.year = val }"
                    :disabled="isFieldDisabled(field)"
                    :class="
                      shouldHighlightField(field)
                        ? 'border-red-500 ring-1 ring-red-200 rounded-md'
                        : ''
                    "
                  >
                    <SelectTrigger variant="form">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="year in yearOptions"
                        :key="year.value"
                        :value="year.value"
                      >
                        {{ year.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <!-- Dropdown -->
                <Select
                  v-else-if="field.fieldType === 'dropdown'"
                  :model-value="formResponses[field.id]?.value ?? ''"
                  @update:model-value="(val: string) => { const resp = formResponses[field.id!]; if (resp) resp.value = val }"
                  :required="field.isRequired"
                  :disabled="isFieldDisabled(field)"
                  :class="
                    shouldHighlightField(field)
                      ? 'border-red-500 ring-1 ring-red-200 rounded-md'
                      : ''
                  "
                >
                  <SelectTrigger variant="form">
                    <SelectValue :placeholder="field.question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="option in field.options"
                      :key="option"
                      :value="option"
                    >
                      {{ option }}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <!-- File Upload -->
                <div v-else-if="field.fieldType === 'upload'" class="relative">
                  <input
                    type="file"
                    :id="`file-input-${field.id}`"
                    :ref="
                      (el) => {
                        if (el) setFileInputRef(field.id, el);
                      }
                    "
                    @change="(e) => handleFileUpload(e, field.id)"
                    class="hidden"
                    :accept="field.allowedFileTypes?.join(',')"
                    :required="
                      field.isRequired && !formResponses[field.id]?.filePath
                    "
                    :disabled="isFieldDisabled(field)"
                  />
                  <button
                    type="button"
                    @click="triggerFileUpload(field.id)"
                    :disabled="
                      formResponses[field.id]?.isUploading ||
                      isFieldDisabled(field)
                    "
                    class="w-full h-9 border rounded-md px-4 text-left text-sm flex items-center justify-between transition-colors"
                    :class="[
                      (formResponses[field.id]?.isUploaded || (formResponses[field.id]?.file && field.id < 0))
                        ? 'bg-green-50 border-green-300 text-green-700 cursor-default'
                        : formResponses[field.id]?.isUploading
                        ? 'bg-gray-50 border-gray-300 text-gray-500 cursor-wait'
                        : isFieldDisabled(field)
                        ? 'text-gray-400 bg-gray-50 border-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50 cursor-pointer border-[#D4D4DA]',
                      shouldHighlightField(field)
                        ? 'border-red-500 ring-1 ring-red-200'
                        : '',
                    ]"
                  >
                    <div class="flex items-center gap-2">
                      <!-- Loading Spinner -->
                      <svg
                        v-if="formResponses[field.id]?.isUploading"
                        class="animate-spin h-4 w-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <!-- Success Checkmark -->
                      <svg
                        v-else-if="formResponses[field.id]?.isUploaded"
                        class="h-4 w-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <!-- Upload Icon -->
                      <svg
                        v-else
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.3333 5.33333L8 2L4.66667 5.33333"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8 2V10"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span>
                        <span v-if="formResponses[field.id]?.isUploading"
                          >Uploading...</span
                        >
                        <span
                          v-else-if="
                            (formResponses[field.id]?.isUploaded || formResponses[field.id]?.file) &&
                            formResponses[field.id]?.fileName
                          "
                        >
                          {{ formResponses[field.id]?.fileName }}
                          <span v-if="formResponses[field.id]?.isUploaded"> - Uploaded</span>
                          <span v-else-if="field.id < 0"> - Ready to upload</span>
                        </span>
                        <span v-else>Upload</span>
                      </span>
                    </div>
                  </button>
                  <!-- Success Message -->
                  <p
                    v-if="
                      formResponses[field.id]?.isUploaded &&
                      !formResponses[field.id]?.uploadError
                    "
                    class="text-green-600 text-xs mt-1 flex items-center gap-1"
                  >
                    <svg
                      class="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    File uploaded successfully
                  </p>
                  <p
                    v-if="formResponses[field.id]?.uploadError"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ formResponses[field.id]?.uploadError }}
                  </p>
                  <p
                    v-if="
                      field.allowedFileTypes &&
                      field.allowedFileTypes.length > 0
                    "
                    class="text-gray-500 text-xs mt-1"
                  >
                    Allowed types: {{ field.allowedFileTypes.join(", ") }}
                  </p>
                  <p
                    v-if="field.maxFileSize"
                    class="text-gray-500 text-xs mt-1"
                  >
                    Max size: {{ formatFileSize(field.maxFileSize) }}
                  </p>
                </div>

                <!-- Error Message -->
                <p v-if="fieldErrors[field.id]" class="text-red-500 text-xs">
                  {{ fieldErrors[field.id] }}
                </p>
              </div>

              <!-- Submit Button -->
              <div
                class="flex justify-end pt-4 border-t"
                style="border-color: #e4e4e8"
              >
                <Button
                  @click="handleSubmit"
                  class="h-9 px-4 rounded-md text-white font-medium text-sm"
                  style="
                    background-color: #1ece84;
                    font-family: Geist;
                    min-width: 100px;
                  "
                  :disabled="isSubmitting || loading"
                >
                  {{ isSubmitting ? "Submitting..." : "Submit" }}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onActivated, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/button.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import {
  useVisaProductFieldsApi,
  type VisaProductFieldWithResponse,
} from "@/composables/useVisaProductFields";
import {
  useVisaApplications,
  type Traveler,
} from "@/composables/useVisaApplications";
import { useApi } from "@/composables/useApi";

const route = useRoute();
const router = useRouter();
const {
  getFieldsByApplication,
  submitFieldResponses,
  checkAllAdditionalInfoSubmitted,
} = useVisaProductFieldsApi();
const { getApplicationById } = useVisaApplications();
const api = useApi();

const applicationId = computed(() => {
  const id = route.query.applicationId || route.params.applicationId;
  return id ? parseInt(String(id)) : null;
});

const loading = ref(false);
const error = ref("");
const isSubmitting = ref(false);
const fields = ref<VisaProductFieldWithResponse[]>([]);
const application = ref<any>(null);
const travelers = ref<Traveler[]>([]);
const fieldErrors = reactive<Record<number, string>>({});

// Traveler selection state
const selectedTravelerId = ref<number | null>(null);
const selectedTravelerIndex = ref(0);

// File input refs
const fileInputRefs = ref<Record<number, HTMLInputElement | null>>({});

// Form responses state - keyed by travelerId or 'application' for app-level
const formResponses = reactive<
  Record<
    number,
    {
      value: string | null;
      filePath: string | null;
      fileName: string | null;
      fileSize: number | null;
      date?: { day: string; month: string; year: string };
      uploadError?: string;
      file?: File;
      isUploading?: boolean;
      isUploaded?: boolean;
    }
  >
>({});

// Track submission status for each traveler
const submissionStatus = reactive<
  Record<string, "submitted" | "pending" | "not_started">
>({});

// Options arrays
const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

const monthOptions = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 100 }, (_, i) => ({
  value: String(currentYear - i),
  label: String(currentYear - i),
}));

// Computed properties
const sortedFields = computed(() => {
  // Filter out fields without IDs and sort by displayOrder
  return [...fields.value]
    .filter((field): field is VisaProductFieldWithResponse & { id: number } => field.id !== undefined)
    .sort((a, b) => a.displayOrder - b.displayOrder);
});

// All travelers (removed application-level tab as it's duplicate of first traveler)
const allTravelers = computed(() => {
  return [...travelers.value];
});

const currentTraveler = computed(() => {
  if (selectedTravelerId.value === null && travelers.value.length > 0) {
    // Default to first traveler if none selected
    return travelers.value[0];
  }
  return (
    travelers.value.find((t) => t.id === selectedTravelerId.value) ||
    travelers.value[0] ||
    {}
  );
});

// Helper to check if a field should be disabled
const isFieldDisabled = (field: any) => {
  // If no active resubmission requests, check field's editable property
  if (!isResubmissionActive.value) {
    return field.editable === false;
  }

  // During resubmission, check if this field is requested
  const isRequested = shouldHighlightField(field);

  // If field is requested for resubmission, it should be editable
  if (isRequested) {
    return false;
  }

  // Otherwise, disable it
  return true;
};

// Resubmission active helper
const isResubmissionActive = computed(() => {
  const app = application.value as any;
  if (!app) return false;

  // Check if there are any active (unfulfilled) resubmission requests
  if (app.resubmissionRequests && Array.isArray(app.resubmissionRequests)) {
    return app.resubmissionRequests.some((req: any) => !req.fulfilledAt);
  }

  return false;
});

const adminNoteToShow = computed(() => {
  const app = application.value as any;
  if (!app) return "";

  // Check for active resubmission requests
  if (app.resubmissionRequests && Array.isArray(app.resubmissionRequests)) {
    const activeRequests = app.resubmissionRequests.filter((req: any) => {
      if (req.fulfilledAt) return false;

      // Application-level requests are shown for the first traveler (index 0)
      const isFirstTraveler = selectedTravelerIndex.value === 0;
      
      if (req.target === "application" && isFirstTraveler) {
        return true;
      } else if (
        req.target === "traveler" &&
        req.travelerId === selectedTravelerId.value
      ) {
        return true;
      }
      return false;
    });

    // Combine all notes from active requests
    const notes = activeRequests
      .map((req: any) => req.note)
      .filter((note: string) => note && note.trim())
      .join(" | ");

    return notes;
  }

  return "";
});

const shouldHighlightField = (field: any) => {
  if (!application.value) return false;
  const app = application.value.data || application.value;

  // Check if there are active resubmission requests
  if (app.resubmissionRequests && Array.isArray(app.resubmissionRequests)) {
    const myRequests = app.resubmissionRequests.filter((req: any) => {
      // Skip fulfilled requests
      if (req.fulfilledAt) return false;

      // Check if this request is for the current context
      // Application-level requests are shown for the first traveler (index 0)
      const isFirstTraveler = selectedTravelerIndex.value === 0;
      
      if (req.target === "application" && isFirstTraveler) {
        // Application-level request shown on first traveler tab
        return true;
      } else if (
        req.target === "traveler" &&
        req.travelerId === selectedTravelerId.value
      ) {
        // Traveler-specific request
        return true;
      }
      return false;
    });

    // Check if this field is in any of the active requests
    return myRequests.some((req: any) => {
      const fieldIdNum = Number(field.id);
      
      // Check existing field IDs (supports negative IDs for admin-created fields)
      if (Array.isArray(req.fieldIds) && req.fieldIds.length > 0) {
        // Convert both to numbers for comparison (handles negative IDs)
        if (req.fieldIds.some((id: any) => Number(id) === fieldIdNum)) {
          return true;
        }
      }

      // Check if this field matches any of the newFields in the request
      // This handles cases where the field was created from newFields
      // New fields will have negative IDs assigned by the backend
      if (req.newFields && Array.isArray(req.newFields) && req.newFields.length > 0) {
        // If field has a negative ID, it's likely an admin-created field
        // Match by field properties (question, fieldType) to verify it's from newFields
        if (fieldIdNum < 0) {
          // Negative ID indicates admin-created field
          // Check if it matches any newField by comparing properties
          const matchesNewField = req.newFields.some((newField: any) => {
            return (
              newField.question === field.question &&
              newField.fieldType === field.fieldType
            );
          });
          if (matchesNewField) {
            return true;
          }
        }
        
        // Also check by properties even if ID is not negative yet
        // (fallback for edge cases where backend hasn't assigned ID yet)
        const matchesByProperties = req.newFields.some((newField: any) => {
          return (
            newField.question === field.question &&
            newField.fieldType === field.fieldType
          );
        });
        if (matchesByProperties) {
          return true;
        }
      }

      return false;
    });
  }

  return false;
};

// Helper functions
const getTravelerName = (traveler: any, index: number): string => {
  if (traveler.isApplication) {
    return "Application Information";
  }
  if (traveler.firstName || traveler.lastName) {
    return (
      `${traveler.firstName || ""} ${traveler.lastName || ""}`.trim() ||
      `Traveler ${index}`
    );
  }
  return `Traveler ${index}`;
};

const getTravelerStatus = (
  travelerId: number | null,
  index: number
): string => {
  const key = travelerId ? `traveler-${travelerId}` : `traveler-${index}`;
  const status = submissionStatus[key] || "not_started";

  if (status === "submitted") return "Submitted";
  if (status === "pending") return "In Progress";
  return "To Fill";
};

const getTravelerStatusClass = (
  travelerId: number | null,
  index: number
): string => {
  const key = travelerId ? `traveler-${travelerId}` : `traveler-${index}`;
  const status = submissionStatus[key] || "not_started";

  if (status === "submitted") return "bg-green-100 text-green-700";
  if (status === "pending") return "bg-yellow-100 text-yellow-700";
  return "bg-gray-100 text-gray-700";
};

// Format file size
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

// Fetch application details
const fetchApplication = async () => {
  if (!applicationId.value) return;

  try {
    const response = await getApplicationById(applicationId.value);
    if (response.success && response.data) {
      const appData = response.data.data || response.data;
      application.value = appData;

      // Extract travelers from application
      if (appData.travelers && Array.isArray(appData.travelers)) {
        travelers.value = appData.travelers;
      }
    }
  } catch (err) {
    console.error("Error fetching application:", err);
  }
};

// Check submission status for a traveler
// Note: We only mark as 'submitted' if ALL required fields are filled AND have valid values
// This is more conservative to avoid marking as submitted when form wasn't actually submitted
const checkSubmissionStatus = async (travelerId: number | null) => {
  if (!applicationId.value) return;

  try {
    const response = await getFieldsByApplication(
      applicationId.value,
      travelerId || undefined
    );

    if (response.success && response.data) {
      const fields = response.data;

      // Check if any field has a response
      const hasResponses = fields.some((field) => {
        if (field.response === null || field.response === undefined)
          return false;
        const hasValue =
          field.response.value !== null &&
          field.response.value !== "" &&
          field.response.value !== undefined;
        const hasFile =
          field.response.filePath !== null &&
          field.response.filePath !== "" &&
          field.response.filePath !== undefined;
        return hasValue || hasFile;
      });

      // Check if ALL required fields are filled with valid values
      const allRequiredFilled = fields.every((field) => {
        if (!field.isRequired) return true;

        // Field is required, check if it has a valid response
        if (field.response === null || field.response === undefined) {
          return false;
        }

        // Check if value is filled (for text/number/textarea/dropdown/date)
        const hasValue =
          field.response.value !== null &&
          field.response.value !== "" &&
          field.response.value !== undefined;

        // Check if file is uploaded (for upload fields)
        const hasFile =
          field.response.filePath !== null &&
          field.response.filePath !== "" &&
          field.response.filePath !== undefined;

        return hasValue || hasFile;
      });

      // Use traveler ID if available, otherwise use a fallback key
      // Note: Since we removed application tab, travelerId should always be set for travelers
      const key = travelerId ? `traveler-${travelerId}` : `traveler-null`;

      // Only mark as 'submitted' if ALL required fields are filled AND there are responses
      // This is more conservative - we assume if all required fields are filled, it was submitted
      // But we're being more strict about what counts as "filled"
      if (allRequiredFilled && hasResponses && fields.length > 0) {
        submissionStatus[key] = "submitted";
      } else if (hasResponses) {
        submissionStatus[key] = "pending";
      } else {
        submissionStatus[key] = "not_started";
      }
    }
  } catch (err) {
    console.error("Error checking submission status:", err);
  }
};

// Fetch fields for the selected traveler
const fetchFields = async (travelerId: number | null = null) => {
  if (!applicationId.value) {
    error.value = "Application ID is required";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const response = await getFieldsByApplication(
      applicationId.value,
      travelerId || undefined
    );

    if (response.success && response.data) {
      fields.value = response.data;

      // Initialize form responses with existing data or empty values
      fields.value.forEach((field) => {
        // Skip fields without IDs
        if (field.id === undefined) {
          return;
        }

        if (!formResponses[field.id]) {
          if (field.fieldType === "date") {
            // Parse existing date if available
            let day = "",
              month = "",
              year = "";
            if (field.response?.value) {
              try {
                const date = new Date(field.response.value);
                day = String(date.getDate());
                month = String(date.getMonth() + 1);
                year = String(date.getFullYear());
              } catch (e) {
                // Invalid date, leave empty
              }
            }
            formResponses[field.id] = {
              value: null,
              filePath: null,
              fileName: null,
              fileSize: null,
              date: { day, month, year },
              isUploading: false,
              isUploaded: false,
            };
          } else {
            formResponses[field.id] = {
              value: field.response?.value || null,
              filePath: field.response?.filePath || null,
              fileName: field.response?.fileName || null,
              fileSize: field.response?.fileSize || null,
              isUploaded: !!field.response?.filePath,
              isUploading: false,
            };
          }
        } else {
          // Update existing response if field has response data
          const existingResponse = formResponses[field.id];
          if (field.response && existingResponse) {
            if (field.fieldType === "date" && field.response.value) {
              try {
                const date = new Date(field.response.value);
                if (existingResponse.date) {
                  existingResponse.date = {
                    day: String(date.getDate()),
                    month: String(date.getMonth() + 1),
                    year: String(date.getFullYear()),
                  };
                }
              } catch (e) {
                // Invalid date
              }
            } else if (field.fieldType !== "date") {
              existingResponse.value = field.response.value || null;
              existingResponse.filePath = field.response.filePath || null;
              existingResponse.fileName = field.response.fileName || null;
              existingResponse.fileSize = field.response.fileSize || null;
              existingResponse.isUploaded = !!field.response.filePath;
            }
          }
        }
      });
    } else {
      error.value = response.message || "Failed to load fields";
    }
  } catch (err: any) {
    console.error("Error fetching fields:", err);
    error.value = err.message || "Failed to load fields";
  } finally {
    loading.value = false;
  }
};

// Select traveler
const selectTraveler = async (travelerId: number | null, index: number) => {
  selectedTravelerId.value = travelerId;
  selectedTravelerIndex.value = index;

  // Clear form responses to load new ones
  Object.keys(formResponses).forEach((key) => {
    delete formResponses[parseInt(key)];
  });

  // Fetch fields for selected traveler
  await fetchFields(travelerId);
};

// Set file input ref
const setFileInputRef = (fieldId: number, el: any) => {
  if (el && el instanceof HTMLInputElement) {
    fileInputRefs.value[fieldId] = el;
  } else if (!el) {
    delete fileInputRefs.value[fieldId];
  }
};

// Trigger file upload dialog
const triggerFileUpload = (fieldId: number) => {
  const fileInput = fileInputRefs.value[fieldId];
  if (fileInput) {
    fileInput.click();
  } else {
    const fallbackInput = document.getElementById(
      `file-input-${fieldId}`
    ) as HTMLInputElement;
    if (fallbackInput) {
      fallbackInput.click();
    } else {
      console.error("File input not found for field:", fieldId);
    }
  }
};

// Handle file upload
// Backend should upload to Cloudinary and return:
// {
//   status: true,
//   data: {
//     filePath: "https://res.cloudinary.com/...", // Cloudinary URL (full URL)
//     fileName: "document.pdf",
//     fileSize: 12345
//   }
// }
const handleFileUpload = async (event: Event, fieldId: number) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  const field = fields.value.find((f) => f.id === fieldId);
  if (!field) return;

  // Initialize formResponses entry if it doesn't exist (for negative IDs)
  if (!formResponses[fieldId]) {
    formResponses[fieldId] = {
      value: null,
      filePath: null,
      fileName: null,
      fileSize: null,
      isUploading: false,
      isUploaded: false,
    };
  }

  // Validate file type
  if (field.allowedFileTypes && field.allowedFileTypes.length > 0) {
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    
    // Normalize allowed extensions: ensure they all have dot prefix
    const allowedExtensions = field.allowedFileTypes.map((type) => {
      const normalized = type.toLowerCase().trim();
      return normalized.startsWith(".") ? normalized : `.${normalized}`;
    });
    
    // MIME type mapping for common file types
    const mimeTypeMap: Record<string, string[]> = {
      ".pdf": ["application/pdf"],
      ".jpg": ["image/jpeg", "image/jpg"],
      ".jpeg": ["image/jpeg", "image/jpg"],
      ".png": ["image/png"],
      ".gif": ["image/gif"],
      ".doc": ["application/msword"],
      ".docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      ".xls": ["application/vnd.ms-excel"],
      ".xlsx": ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    };
    
    // Check if file extension matches
    const extensionMatches = allowedExtensions.some(
      (ext) => fileExtension === ext
    );
    
    // Check if MIME type matches (handle jpg/jpeg variations)
    const mimeMatches = allowedExtensions.some((ext) => {
      const mimeTypes = mimeTypeMap[ext] || [];
      return mimeTypes.includes(file.type);
    });
    
    // Also handle jpg/jpeg equivalence
    const jpgJpegEquivalence = 
      (fileExtension === ".jpg" || fileExtension === ".jpeg") &&
      (allowedExtensions.includes(".jpg") || allowedExtensions.includes(".jpeg"));
    
    if (!extensionMatches && !mimeMatches && !jpgJpegEquivalence) {
      formResponses[
        fieldId
      ].uploadError = `File type not allowed. Allowed types: ${field.allowedFileTypes.join(
        ", "
      )}`;
      return;
    }
  }

  // Validate file size
  if (field.maxFileSize && file.size > field.maxFileSize) {
    // Initialize formResponses entry if it doesn't exist (for negative IDs)
    if (!formResponses[fieldId]) {
      formResponses[fieldId] = {
        value: null,
        filePath: null,
        fileName: null,
        fileSize: null,
        isUploading: false,
        isUploaded: false,
      };
    }
    formResponses[
      fieldId
    ].uploadError = `File size exceeds maximum allowed size of ${formatFileSize(
      field.maxFileSize
    )}`;
    return;
  }

  // Initialize formResponses entry if it doesn't exist (for negative IDs)
  if (!formResponses[fieldId]) {
    formResponses[fieldId] = {
      value: null,
      filePath: null,
      fileName: null,
      fileSize: null,
      isUploading: false,
      isUploaded: false,
    };
  }

  // Reset states
  formResponses[fieldId].uploadError = undefined;
  formResponses[fieldId].isUploading = true;
  formResponses[fieldId].isUploaded = false;
  formResponses[fieldId].file = file;
  formResponses[fieldId].fileName = file.name;
  formResponses[fieldId].fileSize = file.size;

  // For negative field IDs (admin-created custom fields), store file temporarily
  // and upload during form submission since the upload endpoint doesn't support negative IDs yet
  const isNegativeFieldId = fieldId < 0;
  
  if (isNegativeFieldId) {
    // Store file for upload during submission
    formResponses[fieldId].file = file;
    formResponses[fieldId].fileName = file.name;
    formResponses[fieldId].fileSize = file.size;
    formResponses[fieldId].isUploading = false;
    formResponses[fieldId].isUploaded = false; // Will be uploaded during submission
    formResponses[fieldId].uploadError = undefined;
    
    // Show success state even though we haven't uploaded yet
    // The actual upload will happen during form submission
    console.log('📎 File stored for negative field ID, will upload during submission:', {
      fieldId,
      fileName: file.name,
      fileSize: file.size
    });
    return; // Exit early, don't upload now
  }

  // Upload file to server (for positive field IDs)
  try {
    const config = useRuntimeConfig();
    const baseUrl = (config.public.apiBase as string).replace(/\/+$/, "");
    const token = getAuthToken();

    const formData = new FormData();
    formData.append("file", file);

    const uploadEndpoint = `/visa-product-fields/upload?fieldId=${fieldId}`;

    const response = await fetch(`${baseUrl}${uploadEndpoint}`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `Upload failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();

    if (!result.status || !result.data) {
      throw new Error(result.message || "Invalid response from server");
    }

    // Store Cloudinary URL (or local path if backend still returns it)
    const filePath = result.data.filePath || result.data.url || result.data.cloudinaryUrl;
    if (!filePath) {
      throw new Error("File upload succeeded but no file path/URL was returned");
    }

    formResponses[fieldId].filePath = filePath;
    formResponses[fieldId].fileName = result.data.fileName || file.name;
    formResponses[fieldId].fileSize = result.data.fileSize || file.size;

    formResponses[fieldId].isUploading = false;
    formResponses[fieldId].isUploaded = true;

    // Log for debugging
    console.log("✅ File uploaded successfully:", {
      fileName: formResponses[fieldId].fileName,
      filePath: filePath,
      isCloudinaryUrl: filePath.startsWith("http://") || filePath.startsWith("https://"),
    });
  } catch (err: any) {
    console.error("File upload error:", err);
    // Ensure formResponses entry exists before setting error
    if (!formResponses[fieldId]) {
      formResponses[fieldId] = {
        value: null,
        filePath: null,
        fileName: null,
        fileSize: null,
        isUploading: false,
        isUploaded: false,
      };
    }
    formResponses[fieldId].uploadError =
      err.message ||
      "File upload failed. Please check if the upload endpoint is configured correctly.";
    formResponses[fieldId].isUploading = false;
    formResponses[fieldId].isUploaded = false;
  }
};

// Get auth token
const getAuthToken = (): string | null => {
  if (process.server) return null;
  const tokenCookie = useCookie("auth_token");
  return tokenCookie.value || null;
};

// Validate form
const validateForm = (): boolean => {
  Object.keys(fieldErrors).forEach((key) => {
    delete fieldErrors[parseInt(key)];
  });

  let isValid = true;

  fields.value.forEach((field) => {
    // Skip fields without IDs
    if (field.id === undefined) {
      return;
    }

    if (isFieldDisabled(field)) {
      return;
    }
    if (field.isRequired) {
      if (field.fieldType === "upload") {
        if (
          !formResponses[field.id]?.filePath &&
          !formResponses[field.id]?.file
        ) {
          fieldErrors[field.id] = "This field is required";
          isValid = false;
        }
      } else if (field.fieldType === "date") {
        const date = formResponses[field.id]?.date;
        if (!date || !date.day || !date.month || !date.year) {
          fieldErrors[field.id] = "This field is required";
          isValid = false;
        }
      } else {
        const fieldResponse = formResponses[field.id];
        if (
          !fieldResponse?.value ||
          (typeof fieldResponse.value === 'string' && fieldResponse.value.trim() === "")
        ) {
          fieldErrors[field.id] = "This field is required";
          isValid = false;
        }
      }
    }

    if (
      field.fieldType === "dropdown" &&
      field.options
    ) {
      const fieldResponse = formResponses[field.id];
      if (fieldResponse?.value && !field.options.includes(fieldResponse.value)) {
        fieldErrors[field.id] = "Invalid option selected";
        isValid = false;
      }
    }
  });

  return isValid;
};

// Handle form submission
const handleSubmit = async () => {
  if (!applicationId.value) {
    error.value = "Application ID is required";
    return;
  }

  if (!validateForm()) {
    error.value = "Please fill all required fields";
    return;
  }

  isSubmitting.value = true;
  error.value = "";

  try {
    // First, upload files for negative field IDs (admin-created custom fields)
    // These need to be uploaded during submission since the upload endpoint doesn't support negative IDs
    const negativeFieldUploads = fields.value
      .filter((field): field is VisaProductFieldWithResponse & { id: number } => 
        field.id !== undefined && field.fieldType === "upload" && field.id < 0
      )
      .map(async (field) => {
        const fileData = formResponses[field.id];
        if (!fileData?.file && !fileData?.filePath) {
          // No file to upload
          return { fieldId: field.id, success: true };
        }

        // If already uploaded, skip
        if (fileData.filePath) {
          return { fieldId: field.id, success: true, filePath: fileData.filePath };
        }

        // Upload the file
        try {
          const config = useRuntimeConfig();
          const baseUrl = (config.public.apiBase as string).replace(/\/+$/, "");
          const token = getAuthToken();

          const formData = new FormData();
          formData.append("file", fileData.file!);

          // Include applicationId and travelerId for negative field IDs
          let uploadEndpoint = `/visa-product-fields/upload?fieldId=${field.id}&applicationId=${applicationId.value}`;
          if (selectedTravelerId.value) {
            uploadEndpoint += `&travelerId=${selectedTravelerId.value}`;
          }

          const response = await fetch(`${baseUrl}${uploadEndpoint}`, {
            method: "POST",
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: formData,
          });

          if (!response.ok) {
            let errorMessage = `Upload failed with status ${response.status}`;
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorData.error || errorMessage;
            } catch {
              errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
          }

          const result = await response.json();

          if (!result.status || !result.data) {
            throw new Error(result.message || "Invalid response from server");
          }

          const filePath = result.data.filePath || result.data.url || result.data.cloudinaryUrl;
          if (!filePath) {
            throw new Error("File upload succeeded but no file path/URL was returned");
          }

          // Update formResponses with the uploaded file path
          const fieldResponse = formResponses[field.id];
          if (fieldResponse) {
            fieldResponse.filePath = filePath;
            fieldResponse.fileName = result.data.fileName || fileData.fileName;
            fieldResponse.fileSize = result.data.fileSize || fileData.fileSize;
            fieldResponse.isUploaded = true;
          }

          return { fieldId: field.id, success: true, filePath };
        } catch (err: any) {
          console.error(`Error uploading file for field ${field.id}:`, err);
          throw new Error(`Failed to upload file for "${field.question}": ${err.message}`);
        }
      });

    // Wait for all negative field uploads to complete
    if (negativeFieldUploads.length > 0) {
      await Promise.all(negativeFieldUploads);
    }

    // Now build responses with uploaded file paths
    // Filter out fields without IDs
    const responses = fields.value
      .filter((field): field is VisaProductFieldWithResponse & { id: number } => field.id !== undefined)
      .map((field) => {
        const response: any = {
          fieldId: field.id,
        };

        if (field.fieldType === "upload") {
          const fileData = formResponses[field.id];
          if (fileData) {
            response.filePath = fileData.filePath;
            response.fileName = fileData.fileName;
            response.fileSize = fileData.fileSize;
          }
        } else if (field.fieldType === "date") {
          const fileData = formResponses[field.id];
          const date = fileData?.date;
          if (date && date.day && date.month && date.year) {
            const year = date.year;
            const month = String(date.month).padStart(2, "0");
            const day = String(date.day).padStart(2, "0");
            response.value = `${year}-${month}-${day}`;
          }
        } else {
          const fileData = formResponses[field.id];
          if (fileData) {
            response.value = fileData.value;
          }
        }

        return response;
      });

    // Get all travelers for status check
    const allTravelersList = travelers.value.map((t) => ({ id: t.id }));

    const submitResponse = await submitFieldResponses(
      {
        applicationId: applicationId.value,
        travelerId: selectedTravelerId.value || undefined,
        responses,
      },
      allTravelersList
    );

    if (submitResponse.success) {
      // Update submission status
      const key = selectedTravelerId.value
        ? `traveler-${selectedTravelerId.value}`
        : `traveler-${selectedTravelerIndex.value}`;
      submissionStatus[key] = "submitted";

      // Refresh fields to show updated responses
      await fetchFields(selectedTravelerId.value);
      // Refresh application to reflect possible status change to "processing"
      await fetchApplication();

      // Check if all additional info is now complete
      const allSubmitted = await checkAllAdditionalInfoSubmitted(
        applicationId.value,
        allTravelersList
      );

      if (allSubmitted) {
        alert(
          "All additional information submitted successfully! Your application status has been updated."
        );
        // Redirect after user clicks OK on alert
        router.push("/my-account/my-orders");
      } else {
        alert(
          "Additional information submitted successfully! Please complete the remaining forms."
        );
      }
    } else {
      throw new Error(submitResponse.message || "Failed to submit responses");
    }
  } catch (err: any) {
    console.error("Submission error:", err);
    error.value = err.message || "Failed to submit form. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};

// Initialize all data
const initializeData = async () => {
  if (!applicationId.value) {
    error.value =
      "Application ID is required. Please provide it in the URL query parameter.";
    return;
  }

  loading.value = true;

  try {
    await fetchApplication();

    // Check if there are any active resubmission requests
    // If not, redirect to my-orders page
    const app: any = application.value;
    if (app) {
      const hasActiveResubmission =
        app.resubmissionRequests &&
        Array.isArray(app.resubmissionRequests) &&
        app.resubmissionRequests.some((req: any) => !req.fulfilledAt);

      // Also check legacy status
      const hasLegacyResubmission =
        app.status === "resubmission" ||
        app.status === "Additional Info required";

      if (!hasActiveResubmission && !hasLegacyResubmission) {
        // No active resubmission - redirect to my-orders
        console.log(
          "⚠️ No active resubmission requests, redirecting to my-orders"
        );
        navigateTo(`/my-account/my-orders/${applicationId.value}`);
        return;
      }
    }

    // Check status for all travelers
    for (const traveler of travelers.value) {
      if (traveler.id) {
        await checkSubmissionStatus(traveler.id);
      }
    }

    // Auto-select first person with active resubmission requests
    // Reuse the app variable declared above
    if (
      app &&
      app.resubmissionRequests &&
      Array.isArray(app.resubmissionRequests)
    ) {
      const activeRequests = app.resubmissionRequests.filter(
        (req: any) => !req.fulfilledAt
      );

      if (activeRequests.length > 0) {
        // Find first active request
        const firstRequest = activeRequests[0];

        if (firstRequest.target === "application") {
          // Application-level request - map to first traveler (since we removed application tab)
          const firstTraveler = travelers.value[0];
          if (travelers.value.length > 0 && firstTraveler?.id) {
            selectedTravelerId.value = firstTraveler.id;
            selectedTravelerIndex.value = 0;
            await fetchFields(selectedTravelerId.value);
          } else {
            // No travelers available - default to first traveler index
            selectedTravelerId.value = null;
            selectedTravelerIndex.value = 0;
            await fetchFields(null);
          }
        } else if (
          firstRequest.target === "traveler" &&
          firstRequest.travelerId
        ) {
          // Traveler-specific request - select that traveler
          const idx = travelers.value.findIndex(
            (t) => t.id === firstRequest.travelerId
          );
          if (idx !== -1) {
            selectedTravelerId.value = firstRequest.travelerId;
            selectedTravelerIndex.value = idx;
            await fetchFields(selectedTravelerId.value);
          } else {
            // Fallback to first traveler if traveler not found
            const firstTraveler = travelers.value[0];
            if (travelers.value.length > 0 && firstTraveler?.id) {
              selectedTravelerId.value = firstTraveler.id;
              selectedTravelerIndex.value = 0;
              await fetchFields(selectedTravelerId.value);
            } else {
              selectedTravelerId.value = null;
              selectedTravelerIndex.value = 0;
              await fetchFields(null);
            }
          }
        } else {
          // Default to first traveler
          const firstTraveler = travelers.value[0];
          if (travelers.value.length > 0 && firstTraveler?.id) {
            selectedTravelerId.value = firstTraveler.id;
            selectedTravelerIndex.value = 0;
            await fetchFields(selectedTravelerId.value);
          } else {
            selectedTravelerId.value = null;
            selectedTravelerIndex.value = 0;
            await fetchFields(null);
          }
        }
      } else {
        // No active requests - default to first traveler
        const firstTraveler = travelers.value[0];
        if (travelers.value.length > 0 && firstTraveler?.id) {
          selectedTravelerId.value = firstTraveler.id;
          selectedTravelerIndex.value = 0;
          await fetchFields(selectedTravelerId.value);
        } else {
          selectedTravelerId.value = null;
          selectedTravelerIndex.value = 0;
          await fetchFields(null);
        }
      }
    } else {
      // No resubmission requests - default to first traveler
      const firstTraveler = travelers.value[0];
      if (travelers.value.length > 0 && firstTraveler?.id) {
        selectedTravelerId.value = firstTraveler.id;
        selectedTravelerIndex.value = 0;
        await fetchFields(selectedTravelerId.value);
      } else {
        selectedTravelerId.value = null;
        selectedTravelerIndex.value = 0;
        await fetchFields(null);
      }
    }
  } catch (err: any) {
    error.value = err.message || "Failed to initialize data";
  } finally {
    loading.value = false;
  }
};

// Watch for changes in resubmission status
// If resubmission becomes inactive (all fulfilled), redirect to my-orders
watch(
  isResubmissionActive,
  (isActive) => {
    if (!isActive && application.value) {
      const app: any = application.value;
      // Double-check: if status is not resubmission and no active requests, redirect
      const hasLegacyResubmission =
        app.status === "resubmission" ||
        app.status === "Additional Info required";

      if (!hasLegacyResubmission) {
        console.log(
          "⚠️ Resubmission no longer active, redirecting to my-orders"
        );
        navigateTo(`/my-account/my-orders/${applicationId.value}`);
      }
    }
  },
  { immediate: false }
);

// Watch route query parameter changes (e.g., browser back button)
// Re-check if resubmission is still active when navigating to this page
watch(
  () => route.query.applicationId,
  async (newApplicationId) => {
    if (
      newApplicationId &&
      String(newApplicationId) === String(applicationId.value)
    ) {
      // Same application, but user navigated back - re-check resubmission status
      await fetchApplication();
      await checkAndRedirectIfNeeded();
    }
  },
  { immediate: false }
);

// Helper function to check and redirect if no active resubmission
const checkAndRedirectIfNeeded = async () => {
  if (!application.value || !applicationId.value) return;

  const app: any = application.value;
  const hasActiveResubmission =
    app.resubmissionRequests &&
    Array.isArray(app.resubmissionRequests) &&
    app.resubmissionRequests.some((req: any) => !req.fulfilledAt);

  const hasLegacyResubmission =
    app.status === "resubmission" || app.status === "Additional Info required";

  if (!hasActiveResubmission && !hasLegacyResubmission) {
    console.log("⚠️ No active resubmission detected, redirecting to my-orders");
    navigateTo(`/my-account/my-orders/${applicationId.value}`);
    return true;
  }
  return false;
};

// Fetch data on mount
onMounted(async () => {
  await initializeData();
});

// Check when component is activated (e.g., browser back button)
onActivated(async () => {
  // Re-fetch application data to check current status
  if (applicationId.value && application.value) {
    await fetchApplication();
    await checkAndRedirectIfNeeded();
  }
});
</script>
