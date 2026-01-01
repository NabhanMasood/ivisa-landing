<template>
  <div class="p-4 sm:p-6">
    <div class="mb-4 sm:mb-6">
      <h3 class="text-base sm:text-lg font-semibold" style="font-family: Geist; color: #020617">
        Select Embassy
      </h3>
      <p class="text-xs sm:text-sm text-gray-600 mt-1">
        Please select the embassy where you will submit your visa application.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-8 sm:py-12">
      <div class="flex flex-col items-center gap-3">
        <div class="w-6 h-6 sm:w-8 sm:h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p class="text-xs sm:text-sm text-gray-600">Loading embassies...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-8 sm:py-12 text-center">
      <p class="text-xs sm:text-sm text-red-600 mb-3 sm:mb-4 px-2">{{ error }}</p>
      <Button
        @click="$emit('retry')"
        class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-[6px] text-white"
        style="background-color: #1ece84;"
      >
        Try Again
      </Button>
    </div>

    <!-- No Embassies Available -->
    <div v-else-if="!embassies || embassies.length === 0" class="py-8 sm:py-12 text-center">
      <p class="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 px-2">No embassies available for the selected countries.</p>
    </div>

    <!-- Embassy Options -->
    <div v-else class="space-y-3 sm:space-y-4">
      <button
        v-for="embassy in embassies"
        :key="embassy.id"
        @click="$emit('select', embassy)"
        type="button"
        class="text-left transition-all w-full"
        :style="getEmbassyButtonStyle(embassy)"
      >
        <div class="flex flex-col gap-1">
          <h4 class="text-sm sm:text-base leading-[20px] sm:leading-[24px]" style="font-family: Geist; font-weight: 600; color: #0B3947;">
            {{ embassy.embassyName || 'Embassy' }}
          </h4>
          <p v-if="embassy.destinationCountry" class="text-xs sm:text-sm leading-[18px] sm:leading-[20px]" style="font-family: Manrope; font-weight: 400; color: #6B7280;">
            {{ embassy.destinationCountry }}
          </p>
          <p v-if="embassy.address || embassy.location" class="text-xs leading-[16px] sm:leading-[18px]" style="font-family: Manrope; font-weight: 400; color: #9CA3AF;">
            {{ embassy.address || embassy.location }}
          </p>
        </div>
      </button>
    </div>

    <!-- Save Button -->
    <div v-if="embassies && embassies.length > 0" class="mt-6 pt-6 border-t" style="border-color: #E5E7EB;">
      <Button
        @click="$emit('save')"
        :disabled="!selectedId || saving"
        class="h-9 px-4 sm:px-6 rounded-md text-white font-medium text-xs sm:text-sm w-full sm:w-auto"
        :style="getSaveButtonStyle()"
      >
        {{ saving ? 'Saving...' : 'Save Embassy Selection' }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button.vue';
import type { Embassy } from '@/composables/useEmbassies';

const props = defineProps<{
  embassies: Embassy[];
  selectedId: number | null;
  loading?: boolean;
  saving?: boolean;
  error?: string | null;
}>();

defineEmits<{
  select: [embassy: Embassy];
  save: [];
  retry: [];
}>();

const getEmbassyButtonStyle = (embassy: Embassy) => ({
  minHeight: '60px',
  gap: '8px',
  borderRadius: '8px',
  paddingTop: '12px',
  paddingRight: '12px',
  paddingBottom: '12px',
  paddingLeft: '12px',
  border: props.selectedId === embassy.id ? '1px solid #1ECE84' : '1px solid #D4D4DA',
  backgroundColor: props.selectedId === embassy.id ? '#E8FFF6' : '#FFFFFF'
});

const getSaveButtonStyle = () => {
  if (props.selectedId && !props.saving) {
    return 'background-color: #1ece84; font-family: Geist; min-width: 100px;';
  }
  return 'background-color: #9ca3af; font-family: Geist; min-width: 100px; cursor: not-allowed;';
};
</script>
