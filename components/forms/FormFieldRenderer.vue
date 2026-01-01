<template>
  <div class="space-y-2">
    <!-- Field Label -->
    <label
      class="block text-sm font-medium leading-5"
      :class="highlighted ? 'text-red-600' : ''"
      style="font-family: Inter; letter-spacing: -0.006em"
    >
      {{ label }}
      <span v-if="field.isRequired" class="text-red-500">*</span>
      <span v-if="highlighted" class="ml-2 text-xs font-medium text-red-600">Requested</span>
    </label>

    <!-- Text Input -->
    <Input
      v-if="field.fieldType === 'text'"
      :model-value="modelValue ?? ''"
      @update:model-value="$emit('update:modelValue', $event)"
      @blur="$emit('blur')"
      :placeholder="label"
      class="w-full h-9 border"
      :class="highlightClass"
      :required="field.isRequired"
      :minlength="field.minLength"
      :maxlength="field.maxLength"
      :disabled="disabled"
    />

    <!-- Number Input -->
    <Input
      v-else-if="field.fieldType === 'number'"
      :model-value="modelValue ?? ''"
      @update:model-value="$emit('update:modelValue', $event)"
      @blur="$emit('blur')"
      type="number"
      :placeholder="label"
      class="w-full h-9 border"
      :class="highlightClass"
      :required="field.isRequired"
      :min="field.minLength"
      :max="field.maxLength"
      :disabled="disabled"
    />

    <!-- Textarea -->
    <textarea
      v-else-if="field.fieldType === 'textarea'"
      :value="modelValue ?? ''"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @blur="$emit('blur')"
      :placeholder="label"
      class="w-full min-h-[100px] px-3 py-2 border rounded-md"
      :class="highlightClass"
      :required="field.isRequired"
      :minlength="field.minLength"
      :maxlength="field.maxLength"
      :disabled="disabled"
    />

    <!-- Date Input -->
    <div v-else-if="field.fieldType === 'date'" class="grid grid-cols-3 gap-2 sm:gap-4">
      <Select
        :model-value="dateValue?.day ?? ''"
        @update:model-value="updateDate('day', $event)"
        :disabled="disabled"
        :class="highlightClass"
      >
        <SelectTrigger variant="form">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="day in dayOptions" :key="day.value" :value="day.value">
            {{ day.label }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        :model-value="dateValue?.month ?? ''"
        @update:model-value="updateDate('month', $event)"
        :disabled="disabled"
        :class="highlightClass"
      >
        <SelectTrigger variant="form">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="month in monthOptions" :key="month.value" :value="month.value">
            {{ month.label }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        :model-value="dateValue?.year ?? ''"
        @update:model-value="updateDate('year', $event)"
        :disabled="disabled"
        :class="highlightClass"
      >
        <SelectTrigger variant="form">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="year in yearOptions" :key="year.value" :value="year.value">
            {{ year.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Dropdown -->
    <Select
      v-else-if="field.fieldType === 'dropdown'"
      :model-value="modelValue ?? ''"
      @update:model-value="(val: string) => { $emit('update:modelValue', val); $emit('blur'); }"
      :required="field.isRequired"
      :disabled="disabled"
      :class="highlightClass"
    >
      <SelectTrigger variant="form">
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="option in field.options" :key="option" :value="option">
          {{ option }}
        </SelectItem>
      </SelectContent>
    </Select>

    <!-- File Upload -->
    <div v-else-if="field.fieldType === 'upload'" class="relative">
      <input
        type="file"
        :id="`file-input-${field.id}`"
        ref="fileInput"
        @change="$emit('file-change', $event)"
        class="hidden"
        :accept="field.allowedFileTypes?.join(',')"
        :required="field.isRequired && !response?.filePath"
        :disabled="disabled"
      />
      <button
        type="button"
        @click="triggerFileUpload"
        :disabled="response?.isUploading || disabled"
        class="w-full h-9 border rounded-md px-3 sm:px-4 text-left text-xs sm:text-sm flex items-center justify-between transition-colors"
        :class="uploadButtonClass"
      >
        <div class="flex items-center gap-2">
          <!-- Loading Spinner -->
          <svg
            v-if="response?.isUploading"
            class="animate-spin h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <!-- Success Checkmark -->
          <svg v-else-if="response?.isUploaded" class="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <!-- Upload Icon -->
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.3333 5.33333L8 2L4.66667 5.33333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 2V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>
            <span v-if="response?.isUploading">Uploading...</span>
            <span v-else-if="(response?.isUploaded || response?.file) && response?.fileName">
              {{ response.fileName }}
              <span v-if="response.isUploaded"> - Uploaded</span>
              <span v-else-if="field.id < 0"> - Ready to upload</span>
            </span>
            <span v-else>Upload</span>
          </span>
        </div>
      </button>
      <!-- Success Message -->
      <p v-if="response?.isUploaded && !response?.uploadError" class="text-green-600 text-xs mt-1 flex items-center gap-1">
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        File uploaded successfully
      </p>
      <p v-if="response?.uploadError" class="text-red-500 text-xs mt-1">
        {{ response.uploadError }}
      </p>
      <p v-if="field.allowedFileTypes?.length" class="text-gray-500 text-xs mt-1">
        Allowed types: {{ field.allowedFileTypes.join(", ") }}
      </p>
      <p v-if="field.maxFileSize" class="text-gray-500 text-xs mt-1">
        Max size: {{ formatFileSize(field.maxFileSize) }}
      </p>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Input from '@/components/ui/Input.vue';
import Select from '@/components/ui/select/Select.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';

interface FieldResponse {
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

interface Field {
  id: number | string;
  fieldType: string;
  question: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: string[];
  allowedFileTypes?: string[];
  maxFileSize?: number;
}

const props = defineProps<{
  field: Field;
  response?: FieldResponse;
  modelValue?: string | null;
  dateValue?: { day: string; month: string; year: string };
  label: string;
  placeholder?: string;
  highlighted?: boolean;
  disabled?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'update:dateValue': [value: { day: string; month: string; year: string }];
  'blur': [];
  'file-change': [event: Event];
  'trigger-upload': [];
}>();

const fileInput = ref<HTMLInputElement | null>(null);

// Date options
const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

const monthOptions = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 121 }, (_, i) => ({
  value: String(currentYear + 20 - i),
  label: String(currentYear + 20 - i),
}));

const highlightClass = computed(() =>
  props.highlighted ? 'border-red-500 ring-1 ring-red-200 rounded-md' : ''
);

const uploadButtonClass = computed(() => {
  const classes = [];

  if (props.response?.isUploaded || (props.response?.file && Number(props.field.id) < 0)) {
    classes.push('bg-green-50 border-green-300 text-green-700 cursor-default');
  } else if (props.response?.isUploading) {
    classes.push('bg-gray-50 border-gray-300 text-gray-500 cursor-wait');
  } else if (props.disabled) {
    classes.push('text-gray-400 bg-gray-50 border-gray-300 cursor-not-allowed');
  } else {
    classes.push('text-gray-500 hover:bg-gray-50 cursor-pointer border-[#D4D4DA]');
  }

  if (props.highlighted) {
    classes.push('border-red-500 ring-1 ring-red-200');
  }

  return classes.join(' ');
});

const updateDate = (part: 'day' | 'month' | 'year', value: string) => {
  const current = props.dateValue || { day: '', month: '', year: '' };
  emit('update:dateValue', { ...current, [part]: value });
  emit('blur');
};

const triggerFileUpload = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
  emit('trigger-upload');
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Expose file input for parent to trigger
defineExpose({ fileInput, triggerFileUpload });
</script>
