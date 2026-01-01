<template>
  <div class="border-b flex overflow-x-auto" style="border-color: #e4e4e8">
    <button
      @click="$emit('update:activeTab', 'fields')"
      class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors"
      :class="
        activeTab === 'fields'
          ? 'border-[#1ECE84] text-[#1ECE84]'
          : 'border-transparent text-gray-600 hover:text-gray-900'
      "
    >
      <div class="flex items-center gap-2">
        <span>Visa Questions</span>
        <span
          v-if="fieldsComplete"
          class="w-4 h-4 rounded-full bg-[#1ECE84] flex items-center justify-center"
        >
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </span>
      </div>
    </button>
    <button
      v-if="requiresEmbassy"
      @click="$emit('update:activeTab', 'embassy')"
      class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors"
      :class="
        activeTab === 'embassy'
          ? 'border-[#1ECE84] text-[#1ECE84]'
          : 'border-transparent text-gray-600 hover:text-gray-900'
      "
    >
      <div class="flex items-center gap-2">
        <span>Embassy Selection</span>
        <span
          v-if="embassyComplete"
          class="w-4 h-4 rounded-full bg-[#1ECE84] flex items-center justify-center"
        >
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </span>
        <span
          v-else-if="!selectedEmbassyId"
          class="w-2 h-2 rounded-full bg-red-500"
        ></span>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeTab: 'fields' | 'embassy';
  fieldsComplete: boolean;
  embassyComplete: boolean;
  requiresEmbassy: boolean;
  selectedEmbassyId: number | null;
}>();

defineEmits<{
  'update:activeTab': [tab: 'fields' | 'embassy'];
}>();
</script>
