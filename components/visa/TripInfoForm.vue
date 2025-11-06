<template>
  <div class="border rounded-xl p-6" style="border-color: #E5E7EB;">
    <div class="mb-6">
      <p style="font-family: Geist; font-weight: 600; font-size: 14px; line-height: 22px; color: #0B3947;">
        The {{ destination }} Visa is mandatory for {{ nationality }} passport holders planning to enter {{ destination }}
      </p>
    </div>

    <div class="space-y-6">
      <!-- Nationality - Editable Select -->
      <div>
        <Label htmlFor="nationality" style="font-family: Manrope, sans-serif; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
          What's your nationality?
        </Label>
        <select 
          id="nationality" 
          v-model="formData.nationality"
          class="w-full mt-2 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style="font-family: Manrope, sans-serif; font-size: 14px;"
        >
          <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
          <option value="United States">🇺🇸 United States</option>
          <option value="India">🇮🇳 India</option>
          <option value="United Kingdom">🇬🇧 United Kingdom</option>
          <option value="Canada">🇨🇦 Canada</option>
          <option value="Pakistan">🇵🇰 Pakistan</option>
          <option value="Morocco">🇲🇦 Morocco</option>
        </select>
      </div>

      <!-- Visa Type -->
      <div>
        <Label htmlFor="visaType">
          <a href="#" style="color: #27272B; font-family: Manrope, sans-serif; font-weight: 500; font-size: 14px; line-height: 20px;" class="hover:underline">
            Applying for
          </a>
        </Label>
        <select 
          id="visaType" 
          v-model="formData.visaType"
          class="w-full mt-2 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style="font-family: Manrope, sans-serif; font-size: 14px;"
        >
          <option value="180-single">{{ destination }} Visa - 180 days, Single entry</option>
          <option value="180-multiple">{{ destination }} Visa - 180 days, Multiple entry</option>
          <option value="90-single">{{ destination }} Visa - 90 days, Single entry</option>
        </select>
      </div>

      <!-- Number of Applicants -->
      <div>
        <Label htmlFor="applicants" style="font-family: Manrope, sans-serif; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
          Number of applicants
        </Label>
        <Input 
          id="applicants" 
          v-model.number="formData.applicants"
          type="number"
          min="1"
          max="10"
          class="w-full mt-2"
          placeholder="Enter number of applicants"
        />
      </div>

      <Button 
        @click="handleNext"
        class="w-[143px] h-9"
        style="background-color: #1ECE84; color: white; border-radius: 6px; padding: 8px 16px; font-family: Geist, sans-serif; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center;"
      >
        Start Application
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from '@/components/ui/button.vue'
import Label from '@/components/ui/label.vue'
import Input from '@/components/ui/input.vue'

const props = defineProps<{
  nationality: string
  destination: string
}>()

const emit = defineEmits<{
  next: [data: any]
}>()

const formData = ref({
  nationality: props.nationality,
  visaType: '180-single',
  applicants: 1
})

// Watch for prop changes and update formData
watch(() => props.nationality, (newNationality) => {
  if (newNationality) {
    formData.value.nationality = newNationality
  }
}, { immediate: true })

const handleNext = () => {
  emit('next', {
    nationality: formData.value.nationality,
    visaType: formData.value.visaType,
    applicants: formData.value.applicants
  })
}
</script>
