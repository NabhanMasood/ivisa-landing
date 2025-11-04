<template>
  <div class="w-[1040px] h-[104px] border rounded-xl mb-6" style="border-color: #BDBDBD; border-width: 1px; gap: 24px; padding: 30px 20px;">
    <div class="w-[1000px] h-11 flex justify-between items-center">
      <h2 style="font-family: Manrope, sans-serif; font-weight: 700; font-size: 20px; line-height: 28px; color: #0B3947;">
        {{ destination }} Visa
      </h2>

      <div class="flex gap-5">
        <div class="flex gap-2 items-center">
          <div class="w-10 h-11 rounded-lg flex items-center justify-center" style="background-color: #383838;">
            <img src="/svg/gray-calendar.svg" alt="Valid for" style="width: 19.2px; height: 19.2px;" />
          </div>
          <div>
            <div style="font-family: Manrope, sans-serif; font-weight: 400; font-size: 12px; line-height: 20px; color: #6B7280;">Valid for</div>
            <div style="font-family: Manrope, sans-serif; font-weight: 400; font-size: 14px; line-height: 24px; color: #0B3947;">180 days after issued</div>
          </div>
        </div>

        <div class="flex gap-2 items-center">
          <div class="w-10 h-11 rounded-lg flex items-center justify-center" style="background-color: #383838;">
            <img src="/svg/land-plane.svg" alt="Entries" style="width: 19.2px; height: 19.2px;" />
          </div>
          <div>
            <div style="font-family: Manrope, sans-serif; font-weight: 400; font-size: 12px; line-height: 20px; color: #6B7280;">Number of entries</div>
            <div style="font-family: Manrope, sans-serif; font-weight: 400; font-size: 14px; line-height: 24px; color: #0B3947;">Single entry</div>
          </div>
        </div>

        <div class="flex gap-2 items-center">
          <div class="w-10 h-11 rounded-lg flex items-center justify-center" style="background-color: #383838;">
            <img src="/svg/calendar-check.svg" alt="Max stay" style="width: 19.2px; height: 19.2px;" />
          </div>
          <div>
            <div style="font-family: Manrope, sans-serif; font-weight: 400; font-size: 12px; line-height: 20px; color: #6B7280;">Max stay</div>
            <div style="font-family: Manrope, sans-serif; font-weight: 400; font-size: 14px; line-height: 24px; color: #0B3947;">30 days per entry</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  destination: string
}>()
</script>