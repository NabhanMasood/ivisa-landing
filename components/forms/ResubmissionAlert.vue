<template>
  <div
    v-if="visible && note"
    class="rounded-xl border p-3 sm:p-4 bg-orange-50 border-orange-200 text-orange-900"
  >
    <div class="flex items-start gap-2 sm:gap-3">
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
          {{ note }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean;
  note: string;
}>();
</script>
