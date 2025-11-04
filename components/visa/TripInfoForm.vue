<template>
  <div class="border rounded-xl p-6" style="border-color: #E5E7EB;">
    <div class="mb-6">
      <p style="font-family: Geist; font-weight: 600; font-size: 14px; line-height: 22px; color: #0B3947;">
        The {{ destination }} Visa is mandatory for {{ nationality }} passport holders planning to enter {{ destination }}
      </p>
    </div>

    <div class="space-y-6">
      <div>
        <Label htmlFor="nationality" style="font-family: Manrope, sans-serif; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
          What's your nationality?
        </Label>
        <Select v-model="formData.nationality">
          <SelectTrigger id="nationality" class="w-full mt-2">
            <SelectValue>
              <span v-if="formData.nationality">{{ getCountryFlag(formData.nationality) }} {{ formData.nationality }}</span>
              <span v-else class="text-gray-500">Select a country</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem :value="nationality">{{ getCountryFlag(nationality) }} {{ nationality }}</SelectItem>
            <SelectItem value="United States">🇺🇸 United States</SelectItem>
            <SelectItem value="United Kingdom">🇬🇧 United Kingdom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="visaType">
          <a href="#" style="color: #27272B; font-family: Manrope, sans-serif; font-weight: 500; font-size: 14px; line-height: 20px;" class="hover:underline">
            Applying for
          </a>
        </Label>
        <Select v-model="formData.visaType">
          <SelectTrigger id="visaType" class="w-full mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="180-single">{{ destination }} Visa - 180 days, Single entry</SelectItem>
            <SelectItem value="180-multiple">{{ destination }} Visa - 180 days, Multiple entry</SelectItem>
            <SelectItem value="90-single">{{ destination }} Visa - 90 days, Single entry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="applicants" style="font-family: Manrope, sans-serif; font-weight: 500; font-size: 14px; line-height: 20px; color: #0B3947;">
          Number of applicants
        </Label>
        <Select v-model="formData.applicants">
          <SelectTrigger id="applicants" class="w-full mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
          </SelectContent>
        </Select>
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
import { ref, watch } from 'vue'  // Add watch
import Button from '@/components/ui/Button.vue'
import Label from '@/components/ui/label/Label.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'

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
  applicants: '1'
})

// Watch for prop changes and update formData
watch(() => props.nationality, (newNationality) => {
  if (newNationality) {
    formData.value.nationality = newNationality
  }
}, { immediate: true })

const getCountryFlag = (country: string) => {
  const flags: Record<string, string> = {
    'United Arab Emirates': '🇦🇪',
    'United States': '🇺🇸',
    'India': '🇮🇳',
    'United Kingdom': '🇬🇧',
    'Canada': '🇨🇦',
    'Pakistan': '🇵🇰',
    'Morocco': '🇲🇦'
  }
  return flags[country] || '🏳️'
}

const handleNext = () => {
  emit('next', {
    nationality: formData.value.nationality,
    visaType: formData.value.visaType,
    applicants: parseInt(formData.value.applicants)  // Convert to number
  })
}
</script>
