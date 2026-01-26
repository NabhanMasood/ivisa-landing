<template>
  <div class="relative" ref="containerRef">
    <!-- Input Field -->
    <div
      class="relative flex items-center cursor-pointer"
      :class="[
        triggerClass || 'h-[48px]',
        'bg-white rounded-md sm:rounded-lg lg:rounded-[10px] border transition-all',
        isOpen ? 'border-[#1ECB84] ring-1 sm:ring-2 ring-[#1ECB84]/20' : 'border-gray-200 hover:border-gray-300',
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      ]"
      @click="!disabled && toggleDropdown()"
    >
      <!-- Country Flag -->
      <div v-if="selectedCountry?.logoUrl" class="pl-1.5 sm:pl-2 lg:pl-3 flex-shrink-0">
        <img
          :src="getFullLogoUrl(selectedCountry.logoUrl)"
          :alt="selectedCountry.countryName"
          class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 object-cover rounded-full border border-gray-200"
          @error="handleLogoError"
        />
      </div>

      <!-- Input -->
      <input
        ref="inputRef"
        type="text"
        :value="isOpen ? searchQuery : (selectedCountry?.countryName || '')"
        :placeholder="placeholder"
        :disabled="disabled"
        class="flex-1 min-w-0 h-full px-1.5 sm:px-2 lg:px-3 text-[11px] sm:text-xs md:text-sm lg:text-[15px] text-gray-700 bg-transparent outline-none placeholder:text-gray-400 truncate"
        :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
        @input="handleInput"
        @focus="openDropdown"
        @keydown.down.prevent="navigateDown"
        @keydown.up.prevent="navigateUp"
        @keydown.enter.prevent="selectHighlighted"
        @keydown.escape="closeDropdown"
      />

      <!-- Chevron -->
      <div class="pr-1.5 sm:pr-2 lg:pr-3 flex-shrink-0">
        <svg
          class="w-2 h-1.5 sm:w-2.5 sm:h-2 lg:w-3 lg:h-2 text-gray-500 transition-transform duration-200"
          :class="isOpen ? 'rotate-180' : ''"
          viewBox="0 0 12 8"
          fill="none"
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[240px] overflow-y-auto"
      >
        <!-- No results -->
        <div v-if="filteredCountries.length === 0" class="px-4 py-3 text-sm text-gray-500 text-center">
          No countries found
        </div>

        <!-- Country Options -->
        <template v-for="(country, index) in filteredCountries" :key="country.id || country.countryName">
          <!-- Separator after priority countries -->
          <div
            v-if="separatorIndex === index && index > 0"
            class="border-t border-gray-200 my-2"
          />

          <div
            class="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors"
            :class="[
              highlightedIndex === index ? 'bg-[#E8FBF3]' : 'hover:bg-gray-50',
              getCountryValue(country) === modelValue ? 'bg-[#E8FBF3]' : ''
            ]"
            @click="selectCountry(country)"
            @mouseenter="highlightedIndex = index"
          >
            <!-- Flag -->
            <div class="w-6 h-6 flex-shrink-0">
              <img
                v-if="country.logoUrl"
                :src="getFullLogoUrl(country.logoUrl)"
                :alt="country.countryName"
                class="w-6 h-6 object-cover rounded-full border border-gray-200"
                @error="handleLogoError"
              />
              <div
                v-else
                class="w-6 h-6 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center"
              >
                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                </svg>
              </div>
            </div>

            <!-- Country Name -->
            <span class="text-[15px] text-gray-700">{{ country.countryName }}</span>
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface Country {
  id?: number | string
  countryName: string
  logoUrl?: string | null
}

const props = withDefaults(defineProps<{
  modelValue: string
  countries: Country[]
  placeholder?: string
  disabled?: boolean
  apiBase?: string
  valueKey?: 'id' | 'countryName' // Which field to use as value
  triggerClass?: string // Custom classes for trigger
  priorityCountries?: string[] // Country names to show at top
}>(), {
  placeholder: 'Select country',
  valueKey: 'id',
  triggerClass: '',
  priorityCountries: () => []
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const searchQuery = ref('')
const highlightedIndex = ref(0)

// Get value from country based on valueKey
const getCountryValue = (country: Country): string => {
  if (props.valueKey === 'countryName') {
    return country.countryName
  }
  return String(country.id || '')
}

// Get the currently selected country
const selectedCountry = computed(() => {
  if (props.valueKey === 'countryName') {
    return props.countries.find(c => c.countryName === props.modelValue)
  }
  return props.countries.find(c => String(c.id || '') === props.modelValue)
})

// Get priority countries list
const priorityCountriesList = computed(() => {
  if (!props.priorityCountries || props.priorityCountries.length === 0) {
    return []
  }

  const priorityList: Country[] = []
  props.priorityCountries.forEach(name => {
    const country = props.countries.find(c =>
      c.countryName.toLowerCase() === name.toLowerCase()
    )
    if (country) {
      priorityList.push(country)
    }
  })
  return priorityList
})

// Get non-priority countries (alphabetically sorted)
const regularCountriesList = computed(() => {
  if (!props.priorityCountries || props.priorityCountries.length === 0) {
    return props.countries
  }

  const priorityNames = props.priorityCountries.map(n => n.toLowerCase())
  return props.countries.filter(c =>
    !priorityNames.includes(c.countryName.toLowerCase())
  )
})

// Check if we should show priority section
const showPrioritySection = computed(() => {
  return !searchQuery.value.trim() && priorityCountriesList.value.length > 0
})

// Filter countries based on search query
const filteredCountries = computed(() => {
  if (!searchQuery.value.trim()) {
    // When not searching, return priority + regular (will be handled in template)
    return [...priorityCountriesList.value, ...regularCountriesList.value]
  }
  const query = searchQuery.value.toLowerCase().trim()
  return props.countries.filter(country =>
    country.countryName.toLowerCase().startsWith(query)
  )
})

// Get index where separator should appear (after priority countries)
const separatorIndex = computed(() => {
  if (!showPrioritySection.value) return -1
  return priorityCountriesList.value.length
})

// Get full logo URL
const getFullLogoUrl = (logoUrl: string): string => {
  if (!logoUrl) return ''
  if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
    return logoUrl
  }
  const baseUrl = props.apiBase || ''
  const path = logoUrl.startsWith('/') ? logoUrl : `/${logoUrl}`
  return `${baseUrl}${path}`
}

// Handle logo error
const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

// Toggle dropdown
const toggleDropdown = () => {
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

// Open dropdown
const openDropdown = () => {
  if (props.disabled) return
  isOpen.value = true
  searchQuery.value = ''
  highlightedIndex.value = 0
  // Focus input after opening
  setTimeout(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  }, 10)
}

// Close dropdown
const closeDropdown = () => {
  isOpen.value = false
  searchQuery.value = ''
}

// Handle input
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchQuery.value = target.value
  highlightedIndex.value = 0
  if (!isOpen.value) {
    isOpen.value = true
  }
}

// Select country
const selectCountry = (country: Country) => {
  emit('update:modelValue', getCountryValue(country))
  closeDropdown()
}

// Keyboard navigation
const navigateDown = () => {
  if (highlightedIndex.value < filteredCountries.value.length - 1) {
    highlightedIndex.value++
  }
}

const navigateUp = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
  }
}

const selectHighlighted = () => {
  if (filteredCountries.value[highlightedIndex.value]) {
    selectCountry(filteredCountries.value[highlightedIndex.value])
  }
}

// Click outside to close
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Reset highlighted index when filtered results change
watch(filteredCountries, () => {
  highlightedIndex.value = 0
})
</script>
