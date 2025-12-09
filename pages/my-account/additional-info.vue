<template>
  <div class="min-h-screen py-6 pb-24 px-4 sm:px-6 md:px-8 lg:px-52">
    <div class="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <!-- Header Section -->
      <div class="flex items-center justify-between">
        <h1
          class="text-xl sm:text-2xl font-semibold leading-8"
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
        v-else-if="!loading && (!fields || fields.length === 0 || sortedFields.length === 0)"
        class="bg-white rounded-xl shadow-sm p-6 sm:p-12 text-center border"
      >
        <div class="max-w-md mx-auto">
          <div
            class="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-8 h-8 sm:w-12 sm:h-12 text-gray-400"
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
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            No Additional Information Required
          </h3>
          <p class="text-sm sm:text-base text-gray-600 mb-6">
            There are no additional fields to fill for this application.
          </p>
          <!-- Debug info -->
          <div v-if="fields && fields.length > 0" class="text-xs text-gray-500 mt-4">
            Debug: {{ fields.length }} fields loaded, but {{ sortedFields.length }} visible for selected traveler
          </div>
        </div>
      </div>

      <!-- Multi-Traveler Form Interface -->
      <div v-else class="space-y-4 sm:space-y-6">
        <!-- Application Info -->
        <div
          v-if="application"
          class="bg-white rounded-xl border p-3 sm:p-4"
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
                {{ adminNoteToShow }}
              </p>
            </div>
          </div>
        </div>

        <!-- Main Tabs: Visa Questions and Embassy Selection -->
        <div class="bg-white rounded-xl border overflow-hidden" style="border-color: #e4e4e8">
          <!-- Main Tab Headers -->
          <div class="border-b flex overflow-x-auto" style="border-color: #e4e4e8">
            <button
              @click="activeMainTab = 'fields'"
              class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors"
              :class="
                activeMainTab === 'fields'
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
              @click="activeMainTab = 'embassy'"
              class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors"
              :class="
                activeMainTab === 'embassy'
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
                  v-else-if="requiresEmbassy && !selectedEmbassyId"
                  class="w-2 h-2 rounded-full bg-red-500"
                ></span>
              </div>
            </button>
          </div>

          <!-- Tab Content: Visa Questions -->
          <div v-if="activeMainTab === 'fields'" class="p-0">
            <!-- Traveler Tabs -->
        <div
          class="bg-white rounded-xl border overflow-hidden"
          style="border-color: #e4e4e8"
        >
          <!-- Tab Headers -->
          <div
            class="border-b flex overflow-x-auto"
            style="border-color: #e4e4e8; -webkit-overflow-scrolling: touch;"
          >
            <button
              v-for="(traveler, index) in allTravelers"
              :key="`traveler-${traveler.id || 'no-id'}-${index}-${traveler.firstName || ''}-${traveler.lastName || ''}`"
              @click="selectTraveler(traveler.id || null, index)"
              class="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors relative"
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
          <div class="p-4 sm:p-6">
            <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
              <!-- Current Traveler Info -->
              <div class="pb-3 sm:pb-4 border-b" style="border-color: #e4e4e8">
                <h3
                  class="text-base sm:text-lg font-semibold"
                  style="font-family: Geist; color: #020617"
                >
                  {{ getTravelerName(currentTraveler, selectedTravelerIndex) }}
                </h3>
                <p class="text-xs sm:text-sm text-gray-600 mt-1">
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
                  {{ getFieldLabel(field) }}
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
                  :placeholder="getFieldLabel(field)"
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
                  :placeholder="getFieldLabel(field)"
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
                  :placeholder="getFieldLabel(field)"
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
                  class="grid grid-cols-3 gap-2 sm:gap-4"
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
                    <SelectValue :placeholder="getFieldPlaceholder(field)" />
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
                    class="w-full h-9 border rounded-md px-3 sm:px-4 text-left text-xs sm:text-sm flex items-center justify-between transition-colors"
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
                  class="h-9 px-4 sm:px-6 rounded-md text-white font-medium text-xs sm:text-sm w-full sm:w-auto"
                  :style="
                    (isCurrentFormValid || isResubmissionActive)
                      ? 'background-color: #1ece84; font-family: Geist; min-width: 100px;'
                      : 'background-color: #9ca3af; font-family: Geist; min-width: 100px; cursor: not-allowed;'
                  "
                  :disabled="isSubmitting || loading || (!isCurrentFormValid && !isResubmissionActive)"
                >
                  {{ isSubmitting ? "Submitting..." : "Submit" }}
                </Button>
              </div>
            </form>
          </div>
        </div>
          </div>

          <!-- Tab Content: Embassy Selection -->
          <div v-if="activeMainTab === 'embassy' && requiresEmbassy" class="p-4 sm:p-6">
            <div class="mb-4 sm:mb-6">
              <h3 class="text-base sm:text-lg font-semibold" style="font-family: Geist; color: #020617">
                Select Embassy
              </h3>
              <p class="text-xs sm:text-sm text-gray-600 mt-1">
                Please select the embassy where you will submit your visa application.
              </p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoadingEmbassies" class="flex items-center justify-center py-8 sm:py-12">
              <div class="flex flex-col items-center gap-3">
                <div class="w-6 h-6 sm:w-8 sm:h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                <p class="text-xs sm:text-sm text-gray-600">Loading embassies...</p>
              </div>
            </div>

            <!-- Error State -->
            <div v-else-if="embassyError" class="py-8 sm:py-12 text-center">
              <p class="text-xs sm:text-sm text-red-600 mb-3 sm:mb-4 px-2">{{ embassyError }}</p>
              <Button
                @click="fetchEmbassies"
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
                @click="selectEmbassy(embassy)"
                type="button"
                class="text-left transition-all w-full"
                :style="{
                  minHeight: '60px',
                  gap: '8px',
                  borderRadius: '8px',
                  paddingTop: '12px',
                  paddingRight: '12px',
                  paddingBottom: '12px',
                  paddingLeft: '12px',
                  border: selectedEmbassyId === embassy.id ? '1px solid #1ECE84' : '1px solid #D4D4DA',
                  backgroundColor: selectedEmbassyId === embassy.id ? '#E8FFF6' : '#FFFFFF'
                }"
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
                @click="saveEmbassySelection"
                :disabled="!selectedEmbassyId || isSavingEmbassy"
                class="h-9 px-4 sm:px-6 rounded-md text-white font-medium text-xs sm:text-sm w-full sm:w-auto"
                :style="
                  selectedEmbassyId && !isSavingEmbassy
                    ? 'background-color: #1ece84; font-family: Geist; min-width: 100px;'
                    : 'background-color: #9ca3af; font-family: Geist; min-width: 100px; cursor: not-allowed;'
                "
              >
                {{ isSavingEmbassy ? 'Saving...' : 'Save Embassy Selection' }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onActivated, watch, nextTick } from "vue";
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
import { useEmbassiesApi, type Embassy } from "@/composables/useEmbassies";

const route = useRoute();
const router = useRouter();
const {
  getFieldsByApplication,
  submitFieldResponses,
  checkAllAdditionalInfoSubmitted,
} = useVisaProductFieldsApi();
const { getApplicationById, updateDraftApplication } = useVisaApplications();
const api = useApi();
const { getEmbassiesByCountries } = useEmbassiesApi();

const applicationId = computed(() => {
  const id = route.query.applicationId || route.params.applicationId;
  return id ? parseInt(String(id)) : null;
});

const loading = ref(false);
const error = ref("");
const isSubmitting = ref(false);
const isSaving = ref(false);
const isSubmittingAll = ref(false);
const fields = ref<VisaProductFieldWithResponse[]>([]);
const application = ref<any>(null);
const travelers = ref<Traveler[]>([]);
const fieldErrors = reactive<Record<number, string>>({});

// Main tab state (Visa Questions vs Embassy Selection)
const activeMainTab = ref<'fields' | 'embassy'>('fields' as 'fields' | 'embassy');

// Embassy selection state
const embassies = ref<Embassy[]>([]);
const selectedEmbassyId = ref<number | null>(null);
const isLoadingEmbassies = ref(false);
const embassyError = ref<string | null>(null);
const isSavingEmbassy = ref(false);

// Traveler selection state
const selectedTravelerId = ref<number | null>(null);
const selectedTravelerIndex = ref(0);

// File input refs
const fileInputRefs = ref<Record<number, HTMLInputElement | null>>({});

// Form responses state - keyed by field ID (can be number or string for passport fields)
const formResponses = reactive<
  Record<
    number | string,
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

// Track saved responses for each traveler (before final submission)
const savedTravelerResponses = reactive<
  Record<string, Record<number | string, any>>
>({});

// Track which travelers have completed their forms
const completedTravelers = reactive<Set<string>>(new Set());

// ✅ Local Storage Functions for Form Persistence
const getStorageKey = () => {
  if (!applicationId.value) return null;
  return `additional_info_form_${applicationId.value}`;
};

// Save form data to localStorage
const saveFormDataToStorage = () => {
  if (!process.client) return;
  const key = getStorageKey();
  if (!key) return;
  
  try {
    // Convert reactive objects to plain objects for storage
    const formResponsesData: Record<string, any> = {};
    Object.keys(formResponses).forEach((fieldId) => {
      const response = formResponses[fieldId as keyof typeof formResponses];
      if (response) {
        // Don't store File objects (can't be serialized)
        formResponsesData[fieldId] = {
          value: response.value,
          filePath: response.filePath,
          fileName: response.fileName,
          fileSize: response.fileSize,
          date: response.date ? { ...response.date } : undefined,
          isUploading: response.isUploading || false,
          isUploaded: response.isUploaded || false,
          uploadError: response.uploadError,
          // Note: file property is not saved (File objects can't be serialized)
        };
      }
    });
    
    const savedTravelerResponsesData: Record<string, Record<string, any>> = {};
    Object.keys(savedTravelerResponses).forEach((travelerKey) => {
      const travelerResponses = savedTravelerResponses[travelerKey];
      if (!travelerResponses) return;
      savedTravelerResponsesData[travelerKey] = {};
      Object.keys(travelerResponses).forEach((fieldId) => {
        const response = travelerResponses[fieldId];
        if (!response) return;
        if (!savedTravelerResponsesData[travelerKey]) {
          savedTravelerResponsesData[travelerKey] = {};
        }
        savedTravelerResponsesData[travelerKey][fieldId] = {
          value: response.value,
          filePath: response.filePath,
          fileName: response.fileName,
          fileSize: response.fileSize,
          date: response.date ? { ...response.date } : undefined,
          isUploading: response.isUploading || false,
          isUploaded: response.isUploaded || false,
          uploadError: response.uploadError,
        };
      });
    });
    
    const dataToSave = {
      formResponses: formResponsesData,
      savedTravelerResponses: savedTravelerResponsesData,
      selectedTravelerId: selectedTravelerId.value,
      selectedTravelerIndex: selectedTravelerIndex.value,
      timestamp: Date.now()
    };
    
    localStorage.setItem(key, JSON.stringify(dataToSave));
    console.log('💾 Form data saved to localStorage:', key);
  } catch (error) {
    console.error('❌ Failed to save form data to localStorage:', error);
  }
};

// Load form data from localStorage
const loadFormDataFromStorage = () => {
  if (!process.client) return false;
  const key = getStorageKey();
  if (!key) return false;
  
  try {
    const saved = localStorage.getItem(key);
    if (!saved) {
      console.log('ℹ️ No saved form data found in localStorage');
      return false;
    }
    
    const data = JSON.parse(saved);
    
    // Check if data is too old (24 hours)
    const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours
    if (data.timestamp && Date.now() - data.timestamp > MAX_AGE) {
      console.log('⚠️ Saved form data expired, clearing...');
      clearFormDataFromStorage();
      return false;
    }
    
    // Restore formResponses
    if (data.formResponses) {
      Object.keys(data.formResponses).forEach((fieldId) => {
        const savedResponse = data.formResponses[fieldId];
        formResponses[fieldId as keyof typeof formResponses] = {
          value: savedResponse.value,
          filePath: savedResponse.filePath,
          fileName: savedResponse.fileName,
          fileSize: savedResponse.fileSize,
          date: savedResponse.date ? { ...savedResponse.date } : undefined,
          isUploading: savedResponse.isUploading || false,
          isUploaded: savedResponse.isUploaded || false,
          uploadError: savedResponse.uploadError,
        };
      });
    }
    
    // Restore savedTravelerResponses
    if (data.savedTravelerResponses) {
      Object.keys(data.savedTravelerResponses).forEach((travelerKey) => {
        if (!savedTravelerResponses[travelerKey]) {
          savedTravelerResponses[travelerKey] = {};
        }
        const travelerData = data.savedTravelerResponses[travelerKey];
        if (!travelerData) return;
        Object.keys(travelerData).forEach((fieldId) => {
          const savedResponse = travelerData[fieldId];
          if (!savedResponse) return;
          if (!savedTravelerResponses[travelerKey]) {
            savedTravelerResponses[travelerKey] = {};
          }
          savedTravelerResponses[travelerKey][fieldId] = {
            value: savedResponse.value,
            filePath: savedResponse.filePath,
            fileName: savedResponse.fileName,
            fileSize: savedResponse.fileSize,
            date: savedResponse.date ? { ...savedResponse.date } : undefined,
            isUploading: savedResponse.isUploading || false,
            isUploaded: savedResponse.isUploaded || false,
            uploadError: savedResponse.uploadError,
          };
        });
      });
    }
    
    // Restore selected traveler
    if (data.selectedTravelerId !== undefined) {
      selectedTravelerId.value = data.selectedTravelerId;
    }
    if (data.selectedTravelerIndex !== undefined) {
      selectedTravelerIndex.value = data.selectedTravelerIndex;
    }
    
    console.log('✅ Form data restored from localStorage:', key);
    return true;
  } catch (error) {
    console.error('❌ Failed to load form data from localStorage:', error);
    return false;
  }
};

// Clear form data from localStorage
const clearFormDataFromStorage = () => {
  if (!process.client) return;
  const key = getStorageKey();
  if (!key) return;
  
  try {
    localStorage.removeItem(key);
    console.log('🗑️ Form data cleared from localStorage:', key);
  } catch (error) {
    console.error('❌ Failed to clear form data from localStorage:', error);
  }
};

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
  // ✅ CRITICAL: Get current application's traveler IDs to filter fields
  const currentApplicationTravelerIds = new Set(
    travelers.value
      .map((t: any) => t.id)
      .filter((id: any) => id !== undefined && id !== null)
  );
  currentApplicationTravelerIds.add(null);
  currentApplicationTravelerIds.add(undefined);
  
  // ✅ CRITICAL: Get field IDs from active resubmission requests
  // These fields MUST be shown even if they don't match normal filtering rules
  const app = application.value?.data || application.value;
  const resubmissionFieldIds = new Set<number | string>();
  const resubmissionNewFields = new Map<string, any>(); // Key: question+fieldType
  
  if (app?.resubmissionRequests && Array.isArray(app.resubmissionRequests)) {
    app.resubmissionRequests.forEach((req: any) => {
      // Skip fulfilled requests
      if (req.fulfilledAt) return;
      
      // Check if this request is for the current context
      const isFirstTraveler = selectedTravelerIndex.value === 0;
      const isForCurrentTraveler = req.target === "traveler" && req.travelerId === selectedTravelerId.value;
      const isApplicationLevel = req.target === "application" && isFirstTraveler;
      
      if (isForCurrentTraveler || isApplicationLevel) {
        // Add field IDs from this request
        if (Array.isArray(req.fieldIds)) {
          req.fieldIds.forEach((id: any) => resubmissionFieldIds.add(Number(id)));
        }
        
        // Add new fields from this request
        if (Array.isArray(req.newFields)) {
          req.newFields.forEach((newField: any) => {
            const key = `${newField.question}-${newField.fieldType}`;
            resubmissionNewFields.set(key, newField);
          });
        }
      }
    });
  }
  
  console.log('🔄 Resubmission fields to show:', {
    fieldIds: Array.from(resubmissionFieldIds),
    newFieldsCount: resubmissionNewFields.size,
    selectedTravelerId: selectedTravelerId.value,
    selectedTravelerIndex: selectedTravelerIndex.value
  });
  
  // Filter out fields without IDs, deduplicate by ID, filter by selected traveler, and sort by displayOrder
  // Note: Negative IDs are allowed (for admin-created custom fields)
  const seenIds = new Set<number | string>();
  const sorted = [...fields.value]
    .filter((field): field is VisaProductFieldWithResponse & { id: number | string } => {
      // Filter out fields without IDs
      if (field.id === undefined || field.id === null) {
        console.warn('⚠️ Field without ID found:', field.question);
        return false;
      }
      
      const fieldIdNum = Number(field.id);
      
      // ✅ CRITICAL: Always show fields that are in active resubmission requests
      if (resubmissionFieldIds.has(fieldIdNum)) {
        console.log('✅ Including field in resubmission request:', field.id, field.question);
        // Still check for duplicates
        if (seenIds.has(field.id)) {
          return false;
        }
        seenIds.add(field.id);
        return true;
      }
      
      // ✅ CRITICAL: Filter fields to only show those for the selected traveler
      // Type assertion to access travelerId (it exists on the field object from API)
      const fieldWithTravelerId = field as any;
      const fieldTravelerId = fieldWithTravelerId.travelerId;
      const isPassport = isPassportField(field);
      
      // ✅ CRITICAL: Handle negative field IDs (dynamic passport fields)
      // These are created for travelers who skipped passport details
      // They should always be shown to the traveler they were created for
      if (typeof field.id === 'number' && field.id < 0) {
        // Dynamic passport field - check if it was created for this traveler
        // Dynamic fields use baseId = -1000 - travelerId, so field.id should be in range
        // For now, allow all negative IDs if they're passport fields and we're on a traveler tab
        if (isPassport && selectedTravelerId.value !== null) {
          // This is a dynamic passport field - show it to the selected traveler
          // The field was created in fetchFields for this specific traveler
          return true;
        }
        // If not a passport field or not on a traveler tab, continue with normal filtering
      }
      
      // ✅ CRITICAL: Application-level fields (travelerId is null/undefined) handling:
      // - Regular additional info fields (non-passport): Show to ALL travelers (they're shared)
      // - Passport fields: Show to ALL travelers if they're in fields.value (they were included in fetchFields)
      //   This handles cases where passport fields are returned by API for travelers who skipped them
      if (fieldTravelerId === null || fieldTravelerId === undefined) {
        // Application-level field
        if (isPassport) {
          // Application-level passport field - show to ALL travelers
          // These are passport fields returned by API for travelers who skipped passport details
          // They're already in fields.value, so they should be shown
        } else {
          // Application-level regular field - show to ALL travelers
          // This is correct - regular additional info fields are shared across all travelers
        }
      } else if (fieldTravelerId === selectedTravelerId.value) {
        // Traveler-specific field for selected traveler - show it
      } else {
        // Field for different traveler - filter it out
        return false;
      }
      
      // ✅ CRITICAL: Ensure field belongs to this application
      if (fieldTravelerId !== null && fieldTravelerId !== undefined) {
        if (!currentApplicationTravelerIds.has(fieldTravelerId)) {
          // Field from different application - filter it out
          return false;
        }
      }
      
      // Deduplicate: only include first occurrence of each ID
      if (seenIds.has(field.id)) {
        // Silently skip duplicates - should already be filtered in fetchFields
        return false;
      }
      seenIds.add(field.id);
      return true;
    })
    .sort((a, b) => {
      // ✅ CRITICAL: Passport fields always come FIRST, then regular fields
      // Within each group, sort by displayOrder
      const aIsPassport = isPassportField(a);
      const bIsPassport = isPassportField(b);
      
      // If one is passport and other is not, passport comes first
      if (aIsPassport && !bIsPassport) {
        return -1; // a (passport) comes before b (regular)
      }
      if (!aIsPassport && bIsPassport) {
        return 1; // b (passport) comes before a (regular)
      }
      
      // Both are same type (both passport or both regular), sort by displayOrder
      const orderA = a.displayOrder ?? 0;
      const orderB = b.displayOrder ?? 0;
      return orderA - orderB;
    });
  
  // ✅ CRITICAL: Add newFields from resubmission requests if they're not already in fields
  // These are fields created by admin during resubmission that might not be in the API response yet
  // ⚠️ IMPORTANT: Use the actual field IDs from resubmissionRequests.fieldIds, not generated ones
  const existingFieldIds = new Set(sorted.map(f => Number(f.id)));
  const existingFieldKeys = new Set(sorted.map(f => `${f.question}-${f.fieldType}`));
  
  // ✅ CRITICAL: Map newFields to their corresponding fieldIds from the resubmission request
  // This ensures we use the correct negative IDs that match the stored responses
  if (app?.resubmissionRequests && Array.isArray(app.resubmissionRequests)) {
    app.resubmissionRequests.forEach((req: any) => {
      // Skip fulfilled requests
      if (req.fulfilledAt) return;
      
      // Check if this request is for the current context
      const isFirstTraveler = selectedTravelerIndex.value === 0;
      const isForCurrentTraveler = req.target === "traveler" && req.travelerId === selectedTravelerId.value;
      const isApplicationLevel = req.target === "application" && isFirstTraveler;
      
      if ((isForCurrentTraveler || isApplicationLevel) && req.newFields && req.fieldIds) {
        // Match newFields with their corresponding fieldIds
        req.newFields.forEach((newField: any, index: number) => {
          const key = `${newField.question}-${newField.fieldType}`;
          
          // Only add if not already present in fields
          if (!existingFieldKeys.has(key) && !existingFieldIds.has(Number(req.fieldIds[index]))) {
            // ✅ CRITICAL: Use the actual field ID from req.fieldIds, not a generated one
            // This ensures the field ID matches the stored response in the database
            const actualFieldId = req.fieldIds[index];
            
            if (actualFieldId !== undefined && actualFieldId !== null) {
              console.log('✅ Adding newField from resubmission request with actual field ID:', {
                fieldId: actualFieldId,
                question: newField.question,
                fieldType: newField.fieldType
              });
              
              // Create a field object for the newField using the actual field ID
              const newFieldObj: VisaProductFieldWithResponse & { id: number | string } = {
                id: Number(actualFieldId), // Use the actual negative ID from the request
                visaProductId: (app as any)?.visaProductId || 0,
                fieldType: newField.fieldType,
                question: newField.question,
                isRequired: newField.isRequired || false,
                displayOrder: sorted.length + 1000, // Put new fields at the end
                isActive: true,
                editable: true,
                response: null,
                options: newField.options,
                allowedFileTypes: Array.isArray(newField.allowedFileTypes) 
                  ? newField.allowedFileTypes 
                  : typeof newField.allowedFileTypes === 'string' 
                    ? newField.allowedFileTypes.split(',').map((s: string) => s.trim())
                    : undefined,
                minLength: newField.minLength,
                maxLength: newField.maxLength,
                maxFileSize: newField.maxFileSize
              };
              
              sorted.push(newFieldObj);
            } else {
              console.warn('⚠️ newField has no corresponding fieldId in resubmission request:', newField.question);
            }
          }
        });
      }
    });
  }
  
  // Debug: Log field order to help diagnose issues
  if (sorted.length > 0) {
    console.log('📋 Sorted fields for selected traveler:', {
      selectedTravelerId: selectedTravelerId.value,
      selectedTravelerIndex: selectedTravelerIndex.value,
      totalFields: sorted.length,
      resubmissionFields: resubmissionFieldIds.size + resubmissionNewFields.size,
      fields: sorted.map(f => ({
      id: f.id,
      displayOrder: f.displayOrder,
      question: f.question,
        fieldType: f.fieldType,
        travelerId: (f as any).travelerId,
        isPassportField: isPassportField(f),
        isResubmissionField: resubmissionFieldIds.has(Number(f.id)) || resubmissionNewFields.has(`${f.question}-${f.fieldType}`)
      }))
    });
  } else {
    console.warn('⚠️ No fields found to display for selected traveler:', {
      selectedTravelerId: selectedTravelerId.value,
      selectedTravelerIndex: selectedTravelerIndex.value,
      totalFieldsInFieldsValue: fields.value.length,
      resubmissionFieldIds: Array.from(resubmissionFieldIds),
      resubmissionNewFieldsCount: resubmissionNewFields.size
    });
  }
  
  return sorted;
});

// All travelers (removed application-level tab as it's duplicate of first traveler)
const allTravelers = computed(() => {
  // ✅ CRITICAL: Show ALL travelers, even if they don't have IDs
  // Travelers without IDs are still valid travelers (they just haven't been assigned IDs yet)
  // We'll use the index to identify them and fetch application-level fields
  
  // Deduplication: prefer travelers with IDs, but keep those without if no duplicate exists
  const seen = new Map<string, boolean>();
  const unique = travelers.value.filter((t: any, index: number) => {
    // Create a unique key from ID if available, otherwise use index + name
    const key = t.id !== undefined && t.id !== null 
      ? `id-${t.id}` 
      : `index-${index}-${t.firstName || ''}-${t.lastName || ''}-${t.email || ''}`;
    
    if (seen.has(key)) {
      console.warn('⚠️ Duplicate traveler in allTravelers computed:', t.id || `index-${index}`, t.firstName, t.lastName);
      return false;
    }
    seen.set(key, true);
    return true;
  });
  
  console.log('👥 allTravelers computed:', unique.map((t: any, idx: number) => ({
    id: t.id !== undefined && t.id !== null ? t.id : `index-${idx}`,
    name: `${t.firstName || ''} ${t.lastName || ''}`.trim() || `Traveler ${idx + 1}`,
    email: t.email,
    hasId: t.id !== undefined && t.id !== null
  })));
  
  return unique;
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

// Get the key for a traveler (for tracking completion)
const getTravelerKey = (travelerId: number | null, index: number): string => {
  return travelerId !== null ? `traveler-${travelerId}` : `traveler-index-${index}`;
};

// Check if there's a next traveler
const hasNextTraveler = computed(() => {
  return selectedTravelerIndex.value < allTravelers.value.length - 1;
});

// Check if current form has all required fields filled
// ✅ CRITICAL: Use sortedFields (visible/active fields) instead of fields.value
const isCurrentFormValid = computed(() => {
  // Use sortedFields which contains only the visible/active fields for the current traveler
  const activeFields = sortedFields.value;
  if (!activeFields || activeFields.length === 0) {
    console.log('⚠️ isCurrentFormValid: No active fields available');
    return false;
  }
  
  const requiredFields = activeFields.filter(f => f.isRequired);
  if (requiredFields.length === 0) {
    console.log('✅ isCurrentFormValid: No required fields, form is valid');
    return true; // No required fields means form is valid
  }
  
  const allValid = requiredFields.every((field) => {
    const fieldId = field.id;
    if (fieldId === undefined) {
      console.warn('⚠️ Field without ID found:', field.question);
      return false;
    }
    
    // ✅ CRITICAL: Check formResponses first (user's current input), then fallback to field.response (pre-filled data)
    const response = formResponses[fieldId];
    const preFilledResponse = field.response;
    
    // Use formResponses if available (user's input), otherwise use pre-filled data
    const currentValue = response?.value ?? preFilledResponse?.value ?? null;
    const currentFilePath = response?.filePath ?? preFilledResponse?.filePath ?? null;
    const currentDate = response?.date ?? (preFilledResponse?.value ? (() => {
      // Try to parse date from pre-filled value
      try {
        const date = new Date(preFilledResponse.value);
        if (!isNaN(date.getTime())) {
          return {
            day: String(date.getDate()),
            month: String(date.getMonth() + 1),
            year: String(date.getFullYear())
          };
        }
      } catch (e) {
        // Invalid date
      }
      return null;
    })() : null);
    
    // Check if value is filled (for text/number/textarea/dropdown/date)
    const hasValue = currentValue !== null && 
                    currentValue !== "" && 
                    currentValue !== undefined;
    
    // Check if file is uploaded (for upload fields)
    const hasFile = currentFilePath !== null && 
                   currentFilePath !== "" && 
                   currentFilePath !== undefined;
    
    // For date fields, check if all parts are filled
    if (field.fieldType === 'date') {
      if (currentDate) {
        const hasDate = currentDate.day && currentDate.month && currentDate.year;
        if (!hasDate) {
          console.log('⚠️ isCurrentFormValid: Date field incomplete:', field.question, 'Date:', currentDate);
        }
        return hasDate;
      } else {
        // Date field but no date object - check if value is set
        return hasValue;
      }
    }
    
    const isValid = hasValue || hasFile;
    if (!isValid) {
      console.log('⚠️ isCurrentFormValid: Required field not filled:', field.question, 'ID:', fieldId, 'Value:', currentValue, 'FilePath:', currentFilePath);
    }
    return isValid;
  });
  
  console.log('🔍 isCurrentFormValid check:', {
    totalFields: activeFields.length,
    requiredFields: requiredFields.length,
    allValid,
    selectedTravelerIndex: selectedTravelerIndex.value
  });
  
  return allValid;
});

// Check if all travelers have all required fields filled
const allTravelersFormsValid = computed(() => {
  if (allTravelers.value.length === 0) return false;
  
  // Check each traveler's saved responses
  for (let i = 0; i < allTravelers.value.length; i++) {
    const traveler = allTravelers.value[i];
    if (!traveler) continue;
    const travelerKey = getTravelerKey(traveler.id || null, i);
    const savedResponses = savedTravelerResponses[travelerKey];
    
    // If no saved responses for this traveler, check if they have any fields
    if (!savedResponses || Object.keys(savedResponses).length === 0) {
      // Need to check if this traveler has any required fields
      // For now, if they're in the list, they should have fields
      return false;
    }
    
    // Get fields for this traveler to check required fields
    // We'll need to check this when we switch to each traveler
    // For now, we'll use a simpler check: if all travelers have saved responses
  }
  
  // If we have saved responses for all travelers, check if current form is also valid
  return isCurrentFormValid.value && completedTravelers.size === allTravelers.value.length;
});

// Check if all travelers have completed their forms
// This checks if all travelers have valid saved responses with all required fields filled
const allTravelersCompleted = computed(() => {
  if (allTravelers.value.length === 0) {
    return false;
  }
  
  // If there's only one traveler, just check if current form is valid
  if (allTravelers.value.length === 1) {
    return isCurrentFormValid.value;
  }
  
  // For multiple travelers:
  // 1. Current traveler must have valid form
  if (!isCurrentFormValid.value) {
    return false;
  }
  
  // 2. Check all other travelers have saved responses with values
  // Note: Saved responses are created when switching travelers, so if a traveler hasn't been visited,
  // they won't have saved responses. In that case, we can't validate them, so we'll require
  // that all travelers have been visited (have saved responses) OR we're on the last traveler
  // and all previous travelers have saved responses
  
  // Count how many travelers have saved responses
  let travelersWithSavedResponses = 0;
  for (let i = 0; i < allTravelers.value.length; i++) {
    if (i === selectedTravelerIndex.value) {
      // Current traveler - count as having responses if form is valid
      if (isCurrentFormValid.value) {
        travelersWithSavedResponses++;
      }
      continue;
    }
    
    const traveler = allTravelers.value[i];
    if (!traveler) continue;
    
    const travelerKey = getTravelerKey(traveler.id || null, i);
    const savedResponses = savedTravelerResponses[travelerKey];
    
    // Check if this traveler has saved responses with values
    if (savedResponses && Object.keys(savedResponses).length > 0) {
      const hasAnyValue = Object.values(savedResponses).some((response: any) => {
        const hasValue = response.value !== null && response.value !== "" && response.value !== undefined;
        const hasFile = response.filePath !== null && response.filePath !== "" && response.filePath !== undefined;
        const hasDate = response.date && response.date.day && response.date.month && response.date.year;
        return hasValue || hasFile || hasDate;
      });
      
      if (hasAnyValue) {
        travelersWithSavedResponses++;
      }
    }
  }
  
  // All travelers must have valid responses (current form valid + all others have saved responses)
  return travelersWithSavedResponses === allTravelers.value.length;
});

// Helper to check if a field is a passport field
const isPassportField = (field: any): boolean => {
  if (!field.question) return false;
  const question = field.question.toLowerCase();
  // Check for exact key matches or variations
  return (
    question === '_passport_number' ||
    question.includes('_passport_number') ||
    question === 'passport number' ||
    question.includes('passport number') ||
    question === '_passport_expiry_date' ||
    question.includes('_passport_expiry_date') ||
    question === 'passport expiry date' ||
    question === 'passport expiry' ||
    question === 'passport expiration' ||
    question.includes('passport expiry') ||
    question.includes('passport expiration') ||
    question === '_residence_country' ||
    question.includes('_residence_country') ||
    question === 'residence country' ||
    question.includes('residence country') ||
    question === '_has_schengen_visa' ||
    question.includes('_has_schengen_visa') ||
    question === 'schengen visa' ||
    question.includes('schengen visa') ||
    question.includes('do you have a valid visa') ||
    question.includes('valid visa or residence permit')
  );
};

// Helper to get passport field type (for proper display)
const getPassportFieldType = (field: any): string | null => {
  if (!field.question) return null;
  const question = field.question.toLowerCase();
  
  if (question.includes('_passport_expiry_date') || question.includes('passport expiry') || question.includes('passport expiration')) {
    return 'date';
  }
  if (question.includes('_has_schengen_visa') || question.includes('schengen visa')) {
    return 'dropdown';
  }
  // ✅ Changed: Residence Country should be text field, not dropdown
  if (question.includes('_residence_country') || question.includes('residence country')) {
    return 'text';
  }
  return null;
};

// Helper to normalize field question text to display proper labels
const getFieldLabel = (field: any): string => {
  if (!field.question) return '';
  const question = field.question.trim();
  
  // Map technical IDs to human-readable labels
  if (question === '_passport_number' || question.toLowerCase() === '_passport_number') {
    return 'Passport Number';
  }
  if (question === '_passport_expiry_date' || question.toLowerCase() === '_passport_expiry_date') {
    return 'Passport Expiration Date';
  }
  if (question === '_residence_country' || question.toLowerCase() === '_residence_country') {
    return 'Residence Country';
  }
  if (question === '_has_schengen_visa' || question.toLowerCase() === '_has_schengen_visa') {
    return 'Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland?';
  }
  
  // Return original question if not a technical ID
  return question;
};

// Get placeholder text for fields (simpler than label for dropdowns)
const getFieldPlaceholder = (field: any): string => {
  if (!field.question) return '';
  const question = field.question.toLowerCase();

  // For Schengen visa question, use simple "yes" or "no" placeholder
  if (question === '_has_schengen_visa' || 
      question.includes('_has_schengen_visa') ||
      question.includes('schengen visa') ||
      question.includes('do you have a valid visa')) {
    return 'yes or no';
  }

  // For other fields, use the label
  return getFieldLabel(field);
};

// Helper to check if a field should be disabled
const isFieldDisabled = (field: any) => {
  // ✅ CRITICAL: If no active resubmission requests, ALL fields should be enabled
  // The editable property is used by the backend to mark submitted fields,
  // but for non-resubmission forms, users should be able to edit all fields
  if (!isResubmissionActive.value) {
    // Always enable fields when it's not a resubmission form
    return false; // Not disabled
  }

  // During resubmission, check if this field is requested
  const isRequested = shouldHighlightField(field);

  // If field is requested for resubmission, it should be editable
  if (isRequested) {
    return false; // Not disabled
  }

  // During resubmission, if field is not requested, disable it
  console.log('🔒 Field disabled (not in resubmission request):', field.question, 'ID:', field.id);
  return true; // Disabled
};

// Resubmission active helper
const isResubmissionActive = computed(() => {
  const app = application.value as any;
  if (!app) {
    console.log('🔍 isResubmissionActive: No application data');
    return false;
  }

  // Check if there are any active (unfulfilled) resubmission requests
  if (app.resubmissionRequests && Array.isArray(app.resubmissionRequests)) {
    const hasActive = app.resubmissionRequests.some((req: any) => !req.fulfilledAt);
    console.log('🔍 isResubmissionActive:', {
      hasResubmissionRequests: true,
      totalRequests: app.resubmissionRequests.length,
      activeRequests: app.resubmissionRequests.filter((req: any) => !req.fulfilledAt).length,
      isActive: hasActive
    });
    return hasActive;
  }

  console.log('🔍 isResubmissionActive: No resubmissionRequests array, returning false');
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

// Check if embassy selection is required (not an eVisa)
const requiresEmbassy = computed(() => {
  const app = application.value as any;
  if (!app) return false;
  
  // Use requiresEmbassy flag from API if available
  if (app.requiresEmbassy !== undefined) {
    return app.requiresEmbassy;
  }
  
  // Fallback: Check visa product name for eVisa keywords
  const productName = app.visaProductName || app.visaType || '';
  const isEVisa = /e[\s-]?visa/i.test(productName);
  
  return !isEVisa;
});

// Check if fields are complete
const fieldsComplete = computed(() => {
  // Check if all required fields have responses
  if (!fields.value || fields.value.length === 0) return true;
  
  return fields.value.every(field => {
    if (!field.isRequired) return true;
    if (field.editable === false) return true; // Skip non-editable fields
    
    const response = formResponses[field.id!];
    if (!response) return false;
    
    const hasValue = response.value !== null && response.value !== '' && response.value !== undefined;
    const hasFile = response.filePath !== null && response.filePath !== '' && response.filePath !== undefined;
    
    return hasValue || hasFile;
  });
});

// Check if embassy is selected
const embassyComplete = computed(() => {
  return selectedEmbassyId.value !== null && selectedEmbassyId.value !== undefined;
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
      
      // Load embassy ID if available
      if (appData.embassyId) {
        selectedEmbassyId.value = appData.embassyId;
      }
      
      // Load embassies if required (check after setting application.value so computed works)
      // Use nextTick to ensure computed property is updated
      await nextTick();
      if (requiresEmbassy.value && appData.destinationCountry && appData.nationality) {
        fetchEmbassies();
      }

      // Extract travelers from application and deduplicate
      if (appData.travelers && Array.isArray(appData.travelers)) {
        // Deduplicate travelers by ID, and also by name+email if no ID
        // BACKEND ISSUE: Some travelers have id: undefined - filter them out and use the one with ID
        const seenTravelerIds = new Set<number>();
        const seenTravelerKeys = new Set<string>();
        
        // First, separate travelers with IDs from those without
        const travelersWithIds = appData.travelers.filter((t: any) => t.id !== undefined && t.id !== null);
        const travelersWithoutIds = appData.travelers.filter((t: any) => t.id === undefined || t.id === null);
        
        if (travelersWithoutIds.length > 0) {
          console.warn('⚠️ Backend returned', travelersWithoutIds.length, 'travelers without IDs. These will be filtered out.');
        }
        
        travelers.value = appData.travelers.filter((t: any) => {
          // Skip travelers without IDs - they're likely duplicates or invalid
          if (t.id === undefined || t.id === null) {
            // Only keep travelers without IDs if there's no traveler with the same name+email that has an ID
            const nameKey = `${t.firstName || ''}-${t.lastName || ''}-${t.email || ''}`;
            const hasMatchingTravelerWithId = travelersWithIds.some((tw: any) => {
              const twKey = `${tw.firstName || ''}-${tw.lastName || ''}-${tw.email || ''}`;
              return twKey === nameKey;
            });
            
            if (hasMatchingTravelerWithId) {
              console.warn('⚠️ Filtering out traveler without ID (duplicate of traveler with ID):', t.firstName, t.lastName);
              return false;
            }
            
            // If no matching traveler with ID, check for duplicate name+email
            if (seenTravelerKeys.has(nameKey)) {
              console.warn('⚠️ Duplicate traveler detected (no ID, same name/email):', t.firstName, t.lastName, t.email);
              return false;
            }
            seenTravelerKeys.add(nameKey);
            return true;
          }
          
          // Traveler has ID - check for duplicate ID
          if (seenTravelerIds.has(t.id)) {
            console.warn('⚠️ Duplicate traveler detected with ID:', t.id, t.firstName, t.lastName);
            return false;
          }
          seenTravelerIds.add(t.id);
          return true;
        });
        // ✅ CRITICAL: Sort travelers to maintain original order
        // Try to match with draft data order first, then fall back to ID order
        const draftTravelers = (appData as any).draftData?.step2?.travelers || [];
        const draftTravelersMap = new Map<string, number>();
        
        // Create a map of draft travelers by name+email to their index
        draftTravelers.forEach((dt: any, idx: number) => {
          const key = `${dt.firstName || ''}-${dt.lastName || ''}-${dt.email || ''}`;
          draftTravelersMap.set(key, idx);
        });
        
        // Sort travelers: first by draft order, then by ID (for those not in draft)
        travelers.value.sort((a: any, b: any) => {
          const aKey = `${a.firstName || ''}-${a.lastName || ''}-${a.email || ''}`;
          const bKey = `${b.firstName || ''}-${b.lastName || ''}-${b.email || ''}`;
          
          const aDraftIndex = draftTravelersMap.get(aKey);
          const bDraftIndex = draftTravelersMap.get(bKey);
          
          // If both are in draft, sort by draft index
          if (aDraftIndex !== undefined && bDraftIndex !== undefined) {
            return aDraftIndex - bDraftIndex;
          }
          
          // If only one is in draft, prioritize it
          if (aDraftIndex !== undefined) return -1;
          if (bDraftIndex !== undefined) return 1;
          
          // If neither is in draft, sort by ID (lower ID = earlier)
          if (a.id !== undefined && a.id !== null && b.id !== undefined && b.id !== null) {
            return a.id - b.id;
          }
          
          // If one has ID and other doesn't, prioritize the one with ID
          if (a.id !== undefined && a.id !== null) return -1;
          if (b.id !== undefined && b.id !== null) return 1;
          
          // Otherwise maintain original order
          return 0;
        });
        
        console.log('👥 Loaded', travelers.value.length, 'unique travelers (filtered from', appData.travelers.length, 'total)');
        console.log('👥 Unique travelers details (sorted):', travelers.value.map((t: any, idx: number) => ({
          index: idx,
          id: t.id,
          name: `${t.firstName || ''} ${t.lastName || ''}`.trim() || `Traveler ${idx + 1}`,
          email: t.email,
          passportNumber: t.passportNumber || 'missing',
          addPassportDetailsLater: t.addPassportDetailsLater
        })));
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

      // ✅ CRITICAL: Check if traveler has skipped passport details
      // If passport fields are required but not filled, show "To Fill" instead of "In Progress"
      const traveler = travelers.value.find((t: any) => 
        travelerId ? t.id === travelerId : false
      ) as any;
      
      // Check if traveler has skipped passport details (either via flag or missing passport data)
      const hasSkippedPassportDetails = traveler?.addPassportDetailsLater === true ||
        (!traveler?.passportNumber || traveler.passportNumber === 'missing' || traveler.passportNumber === '');
      
      // Check if there are passport fields that are required but not filled
      const passportFields = fields.filter((field) => isPassportField(field));
      const hasUnfilledPassportFields = passportFields.some((field) => {
        if (!field.isRequired) return false;
        if (field.response === null || field.response === undefined) return true;
        const hasValue = field.response.value !== null && 
                        field.response.value !== "" && 
                        field.response.value !== undefined;
        const hasFile = field.response.filePath !== null && 
                       field.response.filePath !== "" && 
                       field.response.filePath !== undefined;
        return !hasValue && !hasFile;
      });

      // ✅ CRITICAL: Check if responses were actually submitted by the user (not pre-filled from application)
      // If passport fields have responses but the traveler already has passport data, these are pre-filled, not submitted
      // Also check if regular fields have responses - if only passport fields have responses and traveler has passport data,
      // it means the form wasn't actually submitted
      const hasPreFilledPassportData = passportFields.length > 0 && 
        passportFields.some((field) => field.response && field.response.value) &&
        !hasSkippedPassportDetails; // If traveler has passport data, responses are pre-filled
      
      const regularFields = fields.filter((field) => !isPassportField(field));
      const hasRegularFieldResponses = regularFields.some((field) => {
        if (field.response === null || field.response === undefined) return false;
        const hasValue = field.response.value !== null && 
                        field.response.value !== "" && 
                        field.response.value !== undefined;
        const hasFile = field.response.filePath !== null && 
                       field.response.filePath !== "" && 
                       field.response.filePath !== undefined;
        return hasValue || hasFile;
      });

      // Only mark as 'submitted' if ALL required fields are filled AND there are responses
      // AND either: (1) traveler has regular field responses (actually submitted), OR
      //            (2) traveler has passport responses AND skipped passport details (needs to fill them)
      // Don't mark as submitted if only passport fields have pre-filled data
      if (allRequiredFilled && hasResponses && fields.length > 0) {
        // Check if this is a real submission or just pre-filled passport data
        if (hasPreFilledPassportData && !hasRegularFieldResponses) {
          // Only pre-filled passport data, no regular field responses - not actually submitted
          submissionStatus[key] = "not_started";
        } else {
          // Has regular field responses or traveler needs to fill passport fields - actually submitted
        submissionStatus[key] = "submitted";
        }
      } else if (hasSkippedPassportDetails && hasUnfilledPassportFields) {
        // ✅ CRITICAL: If traveler skipped passport details and passport fields are still unfilled,
        // show "To Fill" instead of "In Progress"
        submissionStatus[key] = "not_started";
      } else if (hasResponses && !hasPreFilledPassportData) {
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
      // CRITICAL: Filter fields to ensure they belong to THIS application only
      // The backend should already filter by applicationId, but we add an extra safety check
      // Filter out any fields that don't match the current application's travelers
      const currentApplicationTravelerIds = new Set(
        travelers.value
          .map((t: any) => t.id)
          .filter((id: any) => id !== undefined && id !== null)
      );
      
      // Also include null/undefined for application-level fields
      currentApplicationTravelerIds.add(null);
      currentApplicationTravelerIds.add(undefined);
      
      // ✅ CRITICAL: Filter fields to only include those for THIS application's travelers
      // The backend should filter by applicationId, but we add extra validation
      // ⚠️ IMPORTANT: If travelers array is empty, don't filter - show all fields from API
      // This can happen if travelers haven't been loaded yet
      const fieldsForThisApplication = travelers.value.length > 0 
        ? response.data.filter((f: any) => {
            // Application-level fields (travelerId is null/undefined) are valid for this application
            if (!f.travelerId || f.travelerId === null || f.travelerId === undefined) {
              return true;
            }
            // Traveler-specific fields MUST belong to a traveler in THIS application
            // If travelerId doesn't match, it's from a different application - filter it out
            const belongsToThisApplication = currentApplicationTravelerIds.has(f.travelerId);
            if (!belongsToThisApplication) {
              console.warn('⚠️ Filtering out field from different application:', {
                fieldId: f.id,
                fieldQuestion: f.question,
                fieldTravelerId: f.travelerId,
                currentApplicationTravelerIds: Array.from(currentApplicationTravelerIds),
                applicationId: applicationId.value
              });
            }
            return belongsToThisApplication;
          })
        : response.data; // If no travelers loaded yet, show all fields (backend should filter by applicationId)
      
      console.log('📋 Fields filtered for application:', {
        totalFieldsFromAPI: response.data.length,
        fieldsForThisApplication: fieldsForThisApplication.length,
        travelersCount: travelers.value.length,
        currentApplicationTravelerIds: Array.from(currentApplicationTravelerIds),
        applicationId: applicationId.value,
        travelerId: travelerId
      });
      
      // Log all fields received from API for debugging
      console.log('📋 All fields received from API for travelerId:', travelerId, fieldsForThisApplication.map((f: any) => ({
        id: f.id,
        question: f.question,
        fieldType: f.fieldType,
        displayOrder: f.displayOrder,
        travelerId: f.travelerId,
        isPassportField: isPassportField(f)
      })));
      
      // Separate passport fields from regular fields (using filtered data)
      const passportFieldsInResponse = fieldsForThisApplication.filter((f: any) => isPassportField(f));
      const regularFieldsInResponse = fieldsForThisApplication.filter((f: any) => !isPassportField(f));
      
      console.log('🛂 Passport fields in response:', passportFieldsInResponse.length, passportFieldsInResponse.map((f: any) => ({
        id: f.id,
        question: f.question,
        travelerId: f.travelerId
      })));
      console.log('📝 Regular fields in response:', regularFieldsInResponse.length);
      
      // Strategy: For each traveler, show ONLY their specific fields
      // If travelerId is provided, only show fields for that traveler
      // Application-level fields (travelerId = null) should only appear for first traveler (index 0)
      // ✅ CRITICAL: Use filtered fields (fieldsForThisApplication) instead of raw response.data
      // This ensures we only process fields that belong to THIS application
      let fieldsToProcess = fieldsForThisApplication;
      
      if (travelerId !== null && travelerId !== undefined) {
        // For specific traveler (not first one), exclude application-level passport fields
        // Only show traveler-specific passport fields
        // ✅ CRITICAL: passportFieldsInResponse and regularFieldsInResponse are already filtered
        // from fieldsForThisApplication, so they only contain fields for this application
        const travelerSpecificPassportFields = passportFieldsInResponse.filter((f: any) => 
          f.travelerId === travelerId
        );
        const applicationLevelPassportFields = passportFieldsInResponse.filter((f: any) => 
          !f.travelerId || f.travelerId === null
        );
        
        // For first traveler (index 0), show both application-level and traveler-specific passport fields
        // For other travelers, show traveler-specific passport fields AND regular fields
        if (selectedTravelerIndex.value === 0) {
          // First traveler: show application-level + traveler-specific passport fields
          // ✅ CRITICAL: Passport fields FIRST, then regular fields
          const allPassportFields = [...new Set([...applicationLevelPassportFields, ...travelerSpecificPassportFields])];
          fieldsToProcess = [
            ...allPassportFields,
            ...regularFieldsInResponse
          ];
          console.log('✅ First traveler: showing passport fields FIRST, then regular fields', {
            applicationLevelPassportFields: applicationLevelPassportFields.length,
            travelerSpecificPassportFields: travelerSpecificPassportFields.length,
            totalPassportFields: allPassportFields.length,
            regularFields: regularFieldsInResponse.length
          });
        } else {
          // Other travelers: show traveler-specific passport fields AND regular fields
          // ✅ CRITICAL: Only show passport fields if the traveler actually needs them
          // Check if this traveler skipped passport details or is missing passport data
          const traveler = travelers.value.find((t: any) => t.id === travelerId) as any;
          const hasSkippedPassportDetails = traveler?.addPassportDetailsLater === true ||
            (!traveler?.passportNumber || traveler.passportNumber === 'missing' || traveler.passportNumber === '');
          
          const travelerRegularFields = regularFieldsInResponse.filter((f: any) => {
            // Show application-level fields (travelerId is null/undefined) OR fields for this traveler
            return !f.travelerId || f.travelerId === null || f.travelerId === undefined || f.travelerId === travelerId;
          });
          
          // ✅ CRITICAL: Only include passport fields if the traveler needs them (skipped or missing)
          // Don't show passport fields to travelers who already have passport data filled
          let allPassportFieldsForTraveler: any[] = [];
          if (hasSkippedPassportDetails) {
            // Traveler skipped passport details - show passport fields
            allPassportFieldsForTraveler = [
              ...travelerSpecificPassportFields,
              ...applicationLevelPassportFields
            ];
          } else {
            // Traveler already has passport data - don't show passport fields
            allPassportFieldsForTraveler = [...travelerSpecificPassportFields];
          }
          
          // ✅ CRITICAL: Passport fields FIRST, then regular fields
          fieldsToProcess = [
            ...allPassportFieldsForTraveler,
            ...travelerRegularFields
          ];
          
          console.log('✅ Traveler', travelerId, ': showing passport fields FIRST (including application-level), then regular fields', {
            travelerSpecificPassportFields: travelerSpecificPassportFields.length,
            applicationLevelPassportFields: applicationLevelPassportFields.length,
            totalPassportFields: allPassportFieldsForTraveler.length,
            regularFields: travelerRegularFields.length,
            totalFields: fieldsToProcess.length,
            hasSkippedPassportDetails,
            travelerPassportNumber: traveler?.passportNumber || 'missing'
          });
        }
      } else {
        // No travelerId provided (application-level) - show application-level fields
        // ✅ CRITICAL: This is typically for the first traveler (index 0) who might not have an ID yet
        // Only show passport fields if the first traveler skipped passport details
        const firstTraveler = travelers.value[0] as any;
        
        // ✅ CRITICAL: Check draft data for addPassportDetailsLater flag
        // The backend may not include this flag in the traveler object, so check draftData
        const app = application.value?.data || application.value;
        const firstPassportDetailFromDraft = app?.draftData?.step3?.passportDetails?.[0];
        const firstTravelerSkippedFromDraft = firstPassportDetailFromDraft?.addPassportDetailsLater === true;
        
        // ✅ CRITICAL: Prioritize draftData over traveler object
        // The traveler object might have incorrect passport data (e.g., 'sasa' from backend)
        // If draftData says addPassportDetailsLater is true, trust that over the traveler object
        let firstTravelerSkippedPassport = firstTravelerSkippedFromDraft;
        
        // If not found in draftData, check traveler object
        if (!firstTravelerSkippedPassport) {
          firstTravelerSkippedPassport = firstTraveler?.addPassportDetailsLater === true;
        }
        
        // Also check if passport data is missing (but only if draftData doesn't say otherwise)
        if (!firstTravelerSkippedPassport && !firstTravelerSkippedFromDraft) {
          firstTravelerSkippedPassport = !firstTraveler?.passportNumber || 
            firstTraveler.passportNumber === 'missing' || 
            firstTraveler.passportNumber === '';
        }
        
        const applicationLevelPassportFields = passportFieldsInResponse.filter((f: any) => 
          !f.travelerId || f.travelerId === null
        );
        
        // ✅ CRITICAL: Only show passport fields if the first traveler skipped them
        // Use draftData flag if available, otherwise fall back to traveler object check
        let allPassportFields: any[] = [];
        if (firstTravelerSkippedPassport && selectedTravelerIndex.value === 0) {
          // First traveler skipped passport details - show application-level passport fields
          allPassportFields = [...applicationLevelPassportFields];
          
          // Also include traveler-specific passport fields if available
          if (selectedTravelerId.value) {
            const travelerSpecificPassportFields = passportFieldsInResponse.filter((f: any) => 
              f.travelerId === selectedTravelerId.value
            );
            allPassportFields = [...new Set([...applicationLevelPassportFields, ...travelerSpecificPassportFields])];
          }
          
          console.log('✅ First traveler skipped passport (from draftData or traveler object), showing passport fields', {
            fromDraftData: firstTravelerSkippedFromDraft,
            fromTravelerObject: firstTravelerSkippedPassport,
            passportFieldsCount: allPassportFields.length
          });
        }
        
        // ✅ CRITICAL: Passport fields FIRST, then regular fields
        fieldsToProcess = [
          ...allPassportFields,
          ...regularFieldsInResponse
        ];
        console.log('✅ Application-level: showing passport fields FIRST, then regular fields', {
          applicationLevelPassportFields: applicationLevelPassportFields.length,
          totalPassportFields: allPassportFields.length,
          regularFields: regularFieldsInResponse.length,
          firstTravelerSkippedPassport,
          firstTravelerPassportNumber: firstTraveler?.passportNumber || 'missing',
          checkedDraftData: !!app?.draftData?.step3?.passportDetails
        });
      }
      
      // CRITICAL: Final filter to ensure fields belong to this application
      // Double-check that all fields are for travelers in this application
      const finalApplicationTravelerIds = new Set(
        travelers.value
          .map((t: any) => t.id)
          .filter((id: any) => id !== undefined && id !== null)
      );
      finalApplicationTravelerIds.add(null);
      finalApplicationTravelerIds.add(undefined);
      
      // Deduplicate fields by ID and ensure they belong to this application
      const seenIds = new Set<number | string>();
      const uniqueFields = fieldsToProcess.filter((field: any) => {
        // Filter out fields without IDs
        if (field.id === undefined && typeof field.id !== 'string') {
          console.warn('⚠️ Field without ID found:', field.question);
          return false;
        }
        
        // CRITICAL: Ensure field belongs to this application
        // For traveler-specific fields, verify travelerId matches a traveler in this application
        if (field.travelerId !== null && field.travelerId !== undefined) {
          if (!finalApplicationTravelerIds.has(field.travelerId)) {
            console.warn('⚠️ Filtering out field from different application:', {
              fieldId: field.id,
              fieldQuestion: field.question,
              fieldTravelerId: field.travelerId,
              currentApplicationTravelerIds: Array.from(finalApplicationTravelerIds),
              applicationId: applicationId.value
            });
            return false;
          }
        }
        
        // Deduplicate by ID
        const fieldId = field.id;
        if (seenIds.has(fieldId)) {
          // Silently skip duplicates - backend may return same field for application and traveler level
          console.warn('⚠️ Duplicate field ID detected:', fieldId, field.question);
          return false;
        }
        seenIds.add(fieldId);
        return true;
      });
      
      console.log('✅ Final filtered fields for application:', {
        uniqueFieldsCount: uniqueFields.length,
        applicationId: applicationId.value,
        travelerId: travelerId,
        applicationTravelerIds: Array.from(finalApplicationTravelerIds),
        filteredOutCount: fieldsToProcess.length - uniqueFields.length
      });
      
      // ✅ FINAL VALIDATION: Log any fields that might be from other applications
      const fieldsFromOtherApps = uniqueFields.filter((f: any) => {
        if (f.travelerId && f.travelerId !== null && f.travelerId !== undefined) {
          return !finalApplicationTravelerIds.has(f.travelerId);
        }
        return false;
      });
      
      if (fieldsFromOtherApps.length > 0) {
        console.error('❌ CRITICAL: Found fields from other applications:', fieldsFromOtherApps.map((f: any) => ({
          id: f.id,
          question: f.question,
          travelerId: f.travelerId
        })));
      }
      
      // Separate passport fields from regular additional info fields
      const passportFields = uniqueFields.filter((f: any) => isPassportField(f));
      const regularAdditionalInfoFields = uniqueFields.filter((f: any) => !isPassportField(f));
      
      console.log('📊 Field breakdown:', {
        total: uniqueFields.length,
        passportFields: passportFields.length,
        regularFields: regularAdditionalInfoFields.length
      });
      
      if (passportFields.length > 0) {
        console.log('🛂 Passport fields detected:', passportFields.map((f: any) => ({
          id: f.id,
          question: f.question,
          fieldType: f.fieldType
        })));
        // If passport fields already exist from backend, don't create dynamic ones
        console.log('✅ Using backend passport fields, skipping dynamic field creation');
      } else {
        console.log('⚠️ No passport fields found in response. Expected fields with keys: _passport_number, _passport_expiry_date, _residence_country, _has_schengen_visa');
        
        // ✅ CRITICAL: Create dynamic passport fields if backend didn't create them
        // Check draftData for first traveler who skipped passport details
        const app = application.value?.data || application.value;
        const firstPassportDetail = app?.draftData?.step3?.passportDetails?.[0];
        const firstTravelerSkippedFromDraft = firstPassportDetail?.addPassportDetailsLater === true;
        
        let shouldCreateDynamicFields = false;
        let needsPassportFields = false;
        
        if (travelerId === null && selectedTravelerIndex.value === 0 && firstTravelerSkippedFromDraft) {
          // First traveler without ID who skipped passport details - create all passport fields
          shouldCreateDynamicFields = true;
          needsPassportFields = true;
          console.log('✅ First traveler skipped passport details (from draftData), creating dynamic fields');
        } else if (travelerId !== null && application.value && currentTraveler.value) {
          // For travelers with IDs, check if they have missing passport fields
          const traveler = currentTraveler.value as any;
          const hasPassportNumber = traveler?.passportNumber && String(traveler.passportNumber).trim() !== '';
          const hasPassportExpiry = traveler?.passportExpiryDate && traveler.passportExpiryDate !== null;
          const hasResidenceCountry = traveler?.residenceCountry && String(traveler.residenceCountry).trim() !== '';
          const hasSchengenVisa = traveler?.hasSchengenVisa !== null && traveler?.hasSchengenVisa !== undefined;
          
          needsPassportFields = !hasPassportNumber || !hasPassportExpiry || !hasResidenceCountry || hasSchengenVisa === null || hasSchengenVisa === undefined;
          shouldCreateDynamicFields = needsPassportFields;
        }
        
        if (shouldCreateDynamicFields && needsPassportFields) {
          console.log('🛂 Traveler needs passport fields. Creating dynamic fields for traveler:', travelerId || 'first traveler (no ID)');
          
          // Check which specific passport fields are missing
          const dynamicPassportFields: VisaProductFieldWithResponse[] = [];
          // For first traveler without ID, use a special base ID
          let baseId = travelerId !== null ? -1000 - travelerId : -2000; // Use -2000 for first traveler without ID
          
          // For first traveler without ID, create all passport fields
          if (travelerId === null && selectedTravelerIndex.value === 0) {
              // Create all 4 passport fields for first traveler who skipped
              dynamicPassportFields.push({
                id: baseId--,
                visaProductId: app.visaProductId || 0,
                fieldType: 'text',
                question: 'Passport Number',
                isRequired: true,
                displayOrder: uniqueFields.length + dynamicPassportFields.length,
                isActive: true,
                editable: true,
                response: null
              });
              
              dynamicPassportFields.push({
                id: baseId--,
                visaProductId: app.visaProductId || 0,
                fieldType: 'date',
                question: 'Passport Expiration Date',
                isRequired: true,
                displayOrder: uniqueFields.length + dynamicPassportFields.length,
                isActive: true,
                editable: true,
                response: null
              });
              
              dynamicPassportFields.push({
                id: baseId--,
                visaProductId: app.visaProductId || 0,
                fieldType: 'text',
                question: 'Residence Country',
                isRequired: true,
                displayOrder: uniqueFields.length + dynamicPassportFields.length,
                isActive: true,
                editable: true,
                response: null
              });
              
              dynamicPassportFields.push({
                id: baseId--,
                visaProductId: app.visaProductId || 0,
                fieldType: 'dropdown',
                question: 'Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland?',
                isRequired: true,
                displayOrder: uniqueFields.length + dynamicPassportFields.length,
                isActive: true,
                editable: true,
                options: ['yes', 'no'],
                response: null
              });
            } else if (travelerId !== null) {
              // For travelers with IDs, check which specific fields are missing
              const traveler = currentTraveler.value as any;
              const hasPassportNumber = traveler?.passportNumber && String(traveler.passportNumber).trim() !== '';
              const hasPassportExpiry = traveler?.passportExpiryDate && traveler.passportExpiryDate !== null;
              const hasResidenceCountry = traveler?.residenceCountry && String(traveler.residenceCountry).trim() !== '';
              const hasSchengenVisa = traveler?.hasSchengenVisa !== null && traveler?.hasSchengenVisa !== undefined;
              
              if (!hasPassportNumber) {
                dynamicPassportFields.push({
                  id: baseId--,
                  visaProductId: app.visaProductId || 0,
                  fieldType: 'text',
                  question: 'Passport Number',
                  isRequired: true,
                  displayOrder: uniqueFields.length + dynamicPassportFields.length,
                  isActive: true,
                  editable: true,
                  response: null
                });
              }
              
              if (!hasPassportExpiry) {
                dynamicPassportFields.push({
                  id: baseId--,
                  visaProductId: app.visaProductId || 0,
                  fieldType: 'date',
                  question: 'Passport Expiration Date',
                  isRequired: true,
                  displayOrder: uniqueFields.length + dynamicPassportFields.length,
                  isActive: true,
                  editable: true,
                  response: null
                });
              }
              
              if (!hasResidenceCountry) {
                dynamicPassportFields.push({
                  id: baseId--,
                  visaProductId: app.visaProductId || 0,
                  fieldType: 'dropdown',
                  question: 'Residence Country',
                  isRequired: true,
                  displayOrder: uniqueFields.length + dynamicPassportFields.length,
                  isActive: true,
                  editable: true,
                  options: [], // Will be populated from countries list if available
                  response: null
                });
              }
              
              if (hasSchengenVisa === null || hasSchengenVisa === undefined) {
                dynamicPassportFields.push({
                  id: baseId--,
                  visaProductId: app.visaProductId || 0,
                  fieldType: 'dropdown',
                  question: 'Do you have a valid visa or residence permit from the Schengen Area, USA, Australia, Canada, UK, Japan, Norway, New Zealand, Ireland, or Switzerland?',
                  isRequired: true,
                  displayOrder: uniqueFields.length + dynamicPassportFields.length,
                  isActive: true,
                  editable: true,
                  options: ['yes', 'no'],
                  response: null
                });
              }
            }
            
            if (dynamicPassportFields.length > 0) {
              console.log('✅ Created', dynamicPassportFields.length, 'dynamic passport fields for traveler:', travelerId);
              // ✅ CRITICAL: Add dynamic passport fields at the BEGINNING to ensure they appear first
              uniqueFields.unshift(...dynamicPassportFields);
            }
          }
        }
      
      // ✅ CRITICAL: Override fieldType for Residence Country to always be 'text'
      // This ensures consistency across all travelers, even if backend returns it as dropdown
      uniqueFields.forEach((field: any) => {
        if (isPassportField(field) && 
            (field.question?.toLowerCase().includes('residence country') || 
             field.question?.toLowerCase().includes('_residence_country'))) {
          field.fieldType = 'text';
          // Remove options if it was a dropdown
          if (field.options) {
            delete field.options;
          }
        }
      });
      
      // ✅ CRITICAL: Ensure passport fields are always first, even after adding dynamic fields
      // Re-sort to put passport fields first
      const finalPassportFields = uniqueFields.filter((f: any) => isPassportField(f));
      const finalRegularFields = uniqueFields.filter((f: any) => !isPassportField(f));
      
      // Sort each group by displayOrder
      finalPassportFields.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
      finalRegularFields.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
      
      // Combine: passport fields first, then regular fields
      fields.value = [...finalPassportFields, ...finalRegularFields];
      
      console.log('✅ Final field order - Passport fields:', finalPassportFields.length, 'Regular fields:', finalRegularFields.length);

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
      console.error('❌ Failed to load fields:', {
        success: response.success,
        message: response.message,
        data: response.data
      });
      error.value = response.message || "Failed to load fields";
      // Clear fields if API call failed
      fields.value = [];
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
  // ✅ CRITICAL: Save current form responses before switching
  // Get the key for the currently selected traveler
  const currentTravelerKey = getTravelerKey(selectedTravelerId.value, selectedTravelerIndex.value);
  
  // Save current form responses if we have any
  if (Object.keys(formResponses).length > 0) {
    // Deep copy current form responses to save them
    const currentResponses: Record<number | string, any> = {};
    Object.keys(formResponses).forEach((key) => {
      // Handle both string and number keys
      const fieldId: number | string = isNaN(Number(key)) ? key : Number(key);
      const response = formResponses[fieldId];
      if (response) {
        // Deep copy the response object
        currentResponses[fieldId] = {
          value: response.value,
          filePath: response.filePath,
          fileName: response.fileName,
          fileSize: response.fileSize,
          date: response.date ? { ...response.date } : undefined,
          isUploading: response.isUploading,
          isUploaded: response.isUploaded,
          uploadError: response.uploadError,
          file: response.file // Keep file reference for negative IDs
        };
      }
    });
    
    // Save to savedTravelerResponses
    if (!savedTravelerResponses[currentTravelerKey]) {
      savedTravelerResponses[currentTravelerKey] = {};
    }
    Object.assign(savedTravelerResponses[currentTravelerKey], currentResponses);
    console.log('💾 Saved current form responses for traveler:', currentTravelerKey, 'Fields:', Object.keys(currentResponses).length);
  }

  // Now switch to the new traveler
  selectedTravelerId.value = travelerId;
  selectedTravelerIndex.value = index;

  // Check if we have saved responses for this traveler
  const travelerKey = getTravelerKey(travelerId, index);
  if (savedTravelerResponses[travelerKey]) {
    // Restore saved responses
    const savedResponses = savedTravelerResponses[travelerKey];
    
    // Clear current form responses first
    Object.keys(formResponses).forEach((key) => {
      delete formResponses[key as keyof typeof formResponses];
    });
    
    // Restore saved responses
    Object.keys(savedResponses).forEach((key) => {
      // Handle both string and number keys
      const fieldId: number | string = isNaN(Number(key)) ? key : Number(key);
      const savedResponse = savedResponses[fieldId];
      // Deep copy the saved response
      formResponses[fieldId] = {
        value: savedResponse.value,
        filePath: savedResponse.filePath,
        fileName: savedResponse.fileName,
        fileSize: savedResponse.fileSize,
        date: savedResponse.date ? { ...savedResponse.date } : undefined,
        isUploading: savedResponse.isUploading || false,
        isUploaded: savedResponse.isUploaded || false,
        uploadError: savedResponse.uploadError,
        file: savedResponse.file // Restore file reference for negative IDs
      };
    });
    console.log('✅ Restored saved responses for traveler:', travelerKey, 'Fields:', Object.keys(savedResponses).length);
  } else {
  // Clear form responses to load new ones
  Object.keys(formResponses).forEach((key) => {
      const fieldId: number | string = isNaN(Number(key)) ? key : Number(key);
      delete formResponses[fieldId];
  });
  }

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

  // Use sortedFields to find the field to ensure we get the correct field
  // This matches the order displayed in the form
  const field = sortedFields.value.find((f) => f.id === fieldId);
  if (!field) {
    console.error(`Field not found for fieldId: ${fieldId}`);
    return;
  }

  // Validate that this is actually an upload field
  if (field.fieldType !== "upload") {
    console.error(`Field ${fieldId} (${field.question}) is not an upload field. Field type: ${field.fieldType}`);
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

    // Debug: Log upload details
    console.log('📤 Uploading file:', {
      fieldId,
      fieldQuestion: field.question,
      fieldType: field.fieldType,
      displayOrder: field.displayOrder,
      fileName: file.name,
      fileSize: file.size
    });

    const formData = new FormData();
    formData.append("file", file);

    // Include applicationId and travelerId to help backend identify the correct field
    // This ensures the backend can verify the field in the correct context
    let uploadEndpoint = `/visa-product-fields/upload?fieldId=${fieldId}`;
    if (applicationId.value) {
      uploadEndpoint += `&applicationId=${applicationId.value}`;
    }
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
      let errorDetails: any = null;
      try {
        errorDetails = await response.json();
        errorMessage = errorDetails.message || errorDetails.error || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }
      
      // Log detailed error for debugging
      console.error('❌ Upload failed:', {
        fieldId,
        fieldQuestion: field.question,
        fieldType: field.fieldType,
        displayOrder: field.displayOrder,
        status: response.status,
        errorMessage,
        errorDetails
      });
      
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
// ✅ CRITICAL: This function now submits responses for ALL travelers, not just the current one
const handleSubmit = async () => {
  if (!applicationId.value) {
    error.value = "Application ID is required";
    return;
  }

  // Validate current form
  if (!validateForm()) {
    error.value = "Please fill all required fields";
    return;
  }

  isSubmitting.value = true;
  error.value = "";

  // ✅ CRITICAL: Save ALL travelers' current form responses before submitting
  // This ensures that even if a traveler's form was never "switched away from", their responses are saved
  for (let i = 0; i < allTravelers.value.length; i++) {
    const traveler = allTravelers.value[i];
    if (!traveler) continue;
    
    const travelerKey = getTravelerKey(traveler.id || null, i);
    
    // If this is the currently selected traveler, save from formResponses
    if (i === selectedTravelerIndex.value && 
        (traveler.id === selectedTravelerId.value || (traveler.id === null && selectedTravelerId.value === null))) {
      // Current traveler - save from formResponses
      if (Object.keys(formResponses).length > 0) {
        if (!savedTravelerResponses[travelerKey]) {
          savedTravelerResponses[travelerKey] = {};
        }
        // Deep copy current form responses
        Object.keys(formResponses).forEach((key) => {
          const fieldId: number | string = isNaN(Number(key)) ? key : Number(key);
          const response = formResponses[fieldId];
          if (response && savedTravelerResponses[travelerKey]) {
            savedTravelerResponses[travelerKey][fieldId] = {
              value: response.value,
              filePath: response.filePath,
              fileName: response.fileName,
              fileSize: response.fileSize,
              date: response.date ? { ...response.date } : undefined,
              isUploading: response.isUploading || false,
              isUploaded: response.isUploaded || false,
              uploadError: response.uploadError,
              file: response.file
            };
          }
        });
        console.log('💾 Saved current traveler responses before submission:', travelerKey, 'Fields:', Object.keys(savedTravelerResponses[travelerKey]).length, 'Keys:', Object.keys(savedTravelerResponses[travelerKey]));
      }
    }
    // Other travelers should already have their responses in savedTravelerResponses (saved when switching)
  }

  try {
    // First, upload files for negative field IDs (admin-created custom fields)
    // These need to be uploaded during submission since the upload endpoint doesn't support negative IDs
    // Use sortedFields to maintain the same order as displayed in the form
    const negativeFieldUploads = sortedFields.value
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

    // ✅ CRITICAL: Get field IDs from active resubmission requests
    // Negative field IDs are admin-requested fields that MUST be submitted
    const app = application.value?.data || application.value;
    const resubmissionFieldIds = new Set<number | string>();
    
    if (app?.resubmissionRequests && Array.isArray(app.resubmissionRequests)) {
      app.resubmissionRequests.forEach((req: any) => {
        // Skip fulfilled requests
        if (req.fulfilledAt) return;
        
        // Check if this request is for the current context
        const isFirstTraveler = selectedTravelerIndex.value === 0;
        const isForCurrentTraveler = req.target === "traveler" && req.travelerId === selectedTravelerId.value;
        const isApplicationLevel = req.target === "application" && isFirstTraveler;
        
        if (isForCurrentTraveler || isApplicationLevel) {
          // Add field IDs from this request (including negative IDs for admin-created fields)
          if (Array.isArray(req.fieldIds)) {
            req.fieldIds.forEach((id: any) => resubmissionFieldIds.add(Number(id)));
          }
        }
      });
    }
    
    console.log('🔄 Resubmission field IDs to submit:', Array.from(resubmissionFieldIds));

    // Now build responses with uploaded file paths
    // Use sortedFields to maintain the same order as displayed in the form
    // Handle both numeric IDs (regular fields) and string IDs (passport fields like '_passport_number')
    const responses = sortedFields.value
      .filter((field) => {
        // Filter out undefined/null IDs
        if (field.id === undefined || field.id === null) {
          return false;
        }
        
        // Allow string IDs (passport fields like '_passport_number', '_passport_expiry_date', etc.)
        const fieldId: string | number = field.id as string | number;
        if (typeof fieldId === 'string') {
          // Only allow passport field string IDs
          const isPassportStringId = fieldId.startsWith('_passport_') || 
                                     fieldId === '_residence_country' || 
                                     fieldId === '_has_schengen_visa';
          if (!isPassportStringId) {
            console.warn('⚠️ Skipping field with unexpected string ID:', fieldId, field.question);
            return false;
          }
          return true;
        }
        
        // ✅ CRITICAL: Allow negative numeric IDs if they're in active resubmission requests
        // These are admin-requested fields that the backend now supports
        if (typeof fieldId === 'number' && fieldId < 0) {
          if (resubmissionFieldIds.has(fieldId)) {
            console.log('✅ Including negative field ID in resubmission request:', fieldId, field.question);
            return true;
          } else {
            // Negative ID not in resubmission request - might be dynamically created passport field
            // Skip it as backend should create these fields
            console.warn('⚠️ Skipping negative field ID not in resubmission request:', fieldId, field.question);
            return false;
          }
        }
        
        // Allow positive numeric IDs (regular fields)
        return true;
      })
      .map((field) => {
        const response: any = {
          fieldId: field.id, // Can be string or number
        };

        // ✅ CRITICAL: For negative field IDs (admin-requested fields), include the question text
        // This ensures the backend can properly store and display the field label in the admin app
        if (typeof field.id === 'number' && field.id < 0) {
          response.question = field.question;
          console.log('✅ Including question text for negative field ID:', field.id, field.question);
        }

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

    // Log passport fields being submitted
    const passportResponses = responses.filter((r: any) => typeof r.fieldId === 'string');
    if (passportResponses.length > 0) {
      console.log('🛂 Submitting passport fields with string IDs:', passportResponses.map((r: any) => ({
        fieldId: r.fieldId,
        value: r.value,
        filePath: r.filePath,
        fileName: r.fileName
      })));
      
      // Log the full response structure for debugging
      console.log('📤 Full passport responses payload:', JSON.stringify(passportResponses, null, 2));
    }
    
    // Log all responses being submitted for debugging
    console.log('📋 All responses being submitted for current traveler:', responses.length, 'total responses');
    console.log('📋 Response breakdown:', {
      passportFields: passportResponses.length,
      regularFields: responses.length - passportResponses.length,
      allResponses: responses.map((r: any) => ({
        fieldId: r.fieldId,
        hasValue: !!r.value,
        hasFile: !!r.filePath
      }))
      });

    // ✅ CRITICAL: Submit responses for ALL travelers, not just the current one
    // Get all travelers for status check
    const allTravelersList = travelers.value.map((t) => ({ id: t.id }));

    // Collect all responses from all travelers
    const allResponsesToSubmit: Array<{ travelerId: number | null | undefined; responses: any[] }> = [];
    
    // Submit responses for each traveler
    for (let i = 0; i < allTravelers.value.length; i++) {
      const traveler = allTravelers.value[i];
      if (!traveler) continue;
      
      const travelerKey = getTravelerKey(traveler.id || null, i);
      const savedResponses = savedTravelerResponses[travelerKey];
      
      // Skip if no saved responses
      if (!savedResponses || Object.keys(savedResponses).length === 0) {
        console.warn('⚠️ No saved responses for traveler:', travelerKey, 'Skipping submission');
        continue;
      }
      
      // Fetch fields for this traveler to build proper response structure
      const fieldsResponse = await getFieldsByApplication(applicationId.value, traveler.id || undefined);
      if (!fieldsResponse.success || !fieldsResponse.data) {
        console.error('❌ Failed to fetch fields for traveler:', travelerKey);
        continue;
      }
      
      const travelerFields = fieldsResponse.data;
      
      // ✅ CRITICAL: For travelers without IDs (especially traveler 1), also check savedResponses
      // for passport fields with string IDs that might not be in the API response
      const passportFieldIds = ['_passport_number', '_passport_expiry_date', '_residence_country', '_has_schengen_visa'];
      const passportFieldsInSavedResponses: any[] = [];
      const negativePassportFields: any[] = [];
      
      // Map negative IDs to passport field string IDs (for traveler 1 without ID, baseId = -2000)
      const negativeIdToPassportFieldMap: Record<number, string> = {
        [-2000]: '_passport_number',
        [-2001]: '_passport_expiry_date',
        [-2002]: '_residence_country',
        [-2003]: '_has_schengen_visa'
      };
      
      // Debug: Log all saved response keys for this traveler
      const savedKeys = Object.keys(savedResponses);
      const savedKeysWithTypes = savedKeys.map(key => ({
        key: key,
        keyType: typeof key,
        isNumeric: !isNaN(Number(key)),
        isNegative: !isNaN(Number(key)) && Number(key) < 0,
        isPassportString: typeof key === 'string' && passportFieldIds.includes(key),
        value: savedResponses[key]?.value || savedResponses[key]?.filePath || 'no value',
        hasValue: savedResponses[key]?.value !== undefined && savedResponses[key]?.value !== null,
        hasFilePath: savedResponses[key]?.filePath !== undefined && savedResponses[key]?.filePath !== null
      }));
      console.log(`🔍 Checking savedResponses for traveler ${travelerKey}:`, {
        travelerId: traveler.id,
        travelerIndex: i,
        savedResponseKeys: savedKeys,
        savedResponseKeysWithDetails: savedKeysWithTypes,
        hasPassportFields: passportFieldIds.some(id => savedResponses[id] !== undefined),
        passportFieldChecks: passportFieldIds.map(id => ({
          fieldId: id,
          exists: savedResponses[id] !== undefined,
          value: savedResponses[id]?.value || savedResponses[id]?.filePath || null
        }))
      });
      
      // If traveler has no ID (traveler 1), check for passport fields in savedResponses
      if (traveler.id === null || traveler.id === undefined) {
        console.log(`🔍 Traveler ${travelerKey} has no ID, checking for passport fields in savedResponses...`);
        passportFieldIds.forEach((passportFieldId) => {
          if (savedResponses[passportFieldId] !== undefined) {
            const savedResponse = savedResponses[passportFieldId];
            console.log(`✅ Found passport field ${passportFieldId} in savedResponses:`, savedResponse);
            
            // Create a response object for this passport field
            const response: any = {
              fieldId: passportFieldId,
            };
            
            // Determine field type based on field ID
            if (passportFieldId === '_passport_expiry_date') {
              // Date field
              const date = savedResponse.date;
              if (date && date.day && date.month && date.year) {
                const year = date.year;
                const month = String(date.month).padStart(2, "0");
                const day = String(date.day).padStart(2, "0");
                response.value = `${year}-${month}-${day}`;
              } else if (savedResponse.value) {
                response.value = savedResponse.value;
              }
            } else {
              // Text/dropdown field
              response.value = savedResponse.value;
            }
            
            passportFieldsInSavedResponses.push(response);
            console.log(`✅ Added passport field ${passportFieldId} to submission for traveler ${travelerKey}:`, response);
          } else {
            console.log(`⚠️ Passport field ${passportFieldId} NOT found in savedResponses for traveler ${travelerKey}`);
          }
        });
        
        // ✅ CRITICAL: Also check for passport fields stored with negative IDs (from dynamic field creation)
        // These might be stored as negative numbers instead of string IDs
        // For traveler 1 without ID, baseId = -2000, and fields are created in order:
        // -2000 = _passport_number
        // -2001 = _passport_expiry_date
        // -2002 = _residence_country
        // -2003 = _has_schengen_visa
        const negativeIdToPassportFieldMap: Record<number, string> = {
          [-2000]: '_passport_number',
          [-2001]: '_passport_expiry_date',
          [-2002]: '_residence_country',
          [-2003]: '_has_schengen_visa'
        };
        
        savedKeys.forEach((key) => {
          const numKey = Number(key);
          // Check if this is a negative ID that maps to a passport field
          if (!isNaN(numKey) && numKey < 0 && numKey >= -2010) {
            const passportFieldId = negativeIdToPassportFieldMap[numKey];
            if (passportFieldId) {
              const savedResponse = savedResponses[key];
              const response: any = {
                fieldId: passportFieldId, // Use string ID instead of negative ID
              };
              
              if (passportFieldId === '_passport_expiry_date') {
                // Date field
                const date = savedResponse.date;
                if (date && date.day && date.month && date.year) {
                  const year = date.year;
                  const month = String(date.month).padStart(2, "0");
                  const day = String(date.day).padStart(2, "0");
                  response.value = `${year}-${month}-${day}`;
                } else if (savedResponse.value) {
                  response.value = savedResponse.value;
                }
              } else {
                // Text/dropdown field
                response.value = savedResponse.value;
              }
              
              passportFieldsInSavedResponses.push(response);
              negativePassportFields.push(response);
              console.log(`✅ Found passport field with negative ID ${numKey}, converted to ${passportFieldId} for traveler ${travelerKey}`);
            }
          }
        });
        
        // Add negative passport fields found above (they were already pushed to passportFieldsInSavedResponses)
        console.log(`📋 Total passport fields found for traveler ${travelerKey}:`, passportFieldsInSavedResponses.length);
      } else {
        // For travelers with IDs, ALWAYS check savedResponses for passport fields
        // Even if API returns them, we want to use the values from savedResponses (user's actual input)
        passportFieldIds.forEach((passportFieldId) => {
          if (savedResponses[passportFieldId] !== undefined) {
            const savedResponse = savedResponses[passportFieldId];
            // ✅ CRITICAL: Always include passport fields from savedResponses
            // The API might return them, but we filter them out from travelerResponses
            // So we need to include them here to ensure they're submitted
            const response: any = {
              fieldId: passportFieldId,
            };
            
            if (passportFieldId === '_passport_expiry_date') {
              const date = savedResponse.date;
              if (date && date.day && date.month && date.year) {
                const year = date.year;
                const month = String(date.month).padStart(2, "0");
                const day = String(date.day).padStart(2, "0");
                response.value = `${year}-${month}-${day}`;
              } else if (savedResponse.value) {
                response.value = savedResponse.value;
              }
            } else {
              response.value = savedResponse.value;
            }
            
            passportFieldsInSavedResponses.push(response);
            console.log(`✅ Found passport field ${passportFieldId} in savedResponses for traveler ${travelerKey}`);
          }
        });
      }
      
      // Build responses from API fields
      const travelerResponses = travelerFields
        .filter((field: any) => {
          // Only include fields that have saved responses
          const fieldId = field.id;
          if (fieldId === undefined || fieldId === null) return false;
          
          // ✅ CRITICAL: Skip passport fields with string IDs - they're already handled above
          if (typeof fieldId === 'string' && passportFieldIds.includes(fieldId)) {
            return false; // Skip, already handled in passportFieldsInSavedResponses
          }
          
          // ✅ CRITICAL: Skip negative IDs that are passport fields (-2000 to -2003) - they're already converted and added above
          if (typeof fieldId === 'number' && fieldId < 0 && fieldId >= -2003 && fieldId <= -2000) {
            return false; // Skip, already converted and added to passportFieldsInSavedResponses
          }
          
          return savedResponses[fieldId] !== undefined;
        })
        .map((field: any) => {
          const savedResponse = savedResponses[field.id];
          const response: any = {
            fieldId: field.id,
          };
          
          // Include question text for negative field IDs
          if (typeof field.id === 'number' && field.id < 0) {
            response.question = field.question;
          }
          
          if (field.fieldType === "upload") {
            response.filePath = savedResponse.filePath;
            response.fileName = savedResponse.fileName;
            response.fileSize = savedResponse.fileSize;
          } else if (field.fieldType === "date") {
            const date = savedResponse.date;
            if (date && date.day && date.month && date.year) {
              const year = date.year;
              const month = String(date.month).padStart(2, "0");
              const day = String(date.day).padStart(2, "0");
              response.value = `${year}-${month}-${day}`;
            }
          } else {
            response.value = savedResponse.value;
          }
          
          return response;
        });
      
      // ✅ CRITICAL: Combine passport fields (from savedResponses) with regular fields (from API)
      // Passport fields should come first
      // Note: negativePassportFields are already included in passportFieldsInSavedResponses (they were pushed there)
      const allResponses = [...passportFieldsInSavedResponses, ...travelerResponses];
      
      if (allResponses.length > 0) {
        const payload = {
          travelerId: traveler.id || null,
          responses: allResponses
        };
        allResponsesToSubmit.push(payload);
        const travelerName = traveler.firstName && traveler.lastName 
          ? `${traveler.firstName} ${traveler.lastName}` 
          : 'Unknown';
        console.log(`✅ Prepared ${allResponses.length} responses for traveler ${travelerKey} (${travelerName}) (${passportFieldsInSavedResponses.length} passport + ${travelerResponses.length} regular)`);
        
        // ✅ LOG: Detailed payload for this traveler
        console.log(`📤 PAYLOAD for traveler ${travelerKey} (${travelerName}):`, {
          travelerId: payload.travelerId,
          travelerName: travelerName,
        applicationId: applicationId.value,
          responsesCount: payload.responses.length,
          responses: payload.responses.map((r: any) => ({
            fieldId: r.fieldId,
            fieldIdType: typeof r.fieldId,
            value: r.value || null,
            filePath: r.filePath || null,
            fileName: r.fileName || null,
            fileSize: r.fileSize || null,
            question: r.question || null
          }))
        });
        console.log(`📤 FULL PAYLOAD JSON for traveler ${travelerKey}:`, JSON.stringify({
          applicationId: applicationId.value,
          travelerId: payload.travelerId || undefined,
          responses: payload.responses
        }, null, 2));
      }
    }
    
    // Submit responses for each traveler
    let allSubmissionsSuccessful = true;
    for (const submission of allResponsesToSubmit) {
      const payloadToSend = {
        applicationId: applicationId.value,
        travelerId: submission.travelerId || undefined,
        responses: submission.responses,
      };
      
      try {
        // ✅ LOG: Payload being sent to backend API
        console.log(`🚀 SENDING TO BACKEND - POST /visa-product-fields/responses`);
        console.log(`🚀 Payload for traveler ID ${submission.travelerId || 'null (application-level)'}:`, payloadToSend);
        console.log(`🚀 Payload JSON:`, JSON.stringify(payloadToSend, null, 2));
        
        const submitResponse = await submitFieldResponses(
          payloadToSend,
      allTravelersList
    );
        
        if (!submitResponse.success) {
          console.error('❌ Failed to submit responses for traveler:', submission.travelerId, submitResponse.message);
          console.error('❌ Failed payload was:', JSON.stringify(payloadToSend, null, 2));
          allSubmissionsSuccessful = false;
        } else {
          console.log(`✅ Successfully submitted ${submission.responses.length} responses for traveler:`, submission.travelerId);
          console.log(`✅ Backend response:`, submitResponse);
        }
      } catch (err: any) {
        console.error('❌ Error submitting responses for traveler:', submission.travelerId, err);
        console.error('❌ Error payload was:', JSON.stringify(payloadToSend, null, 2));
        console.error('❌ Error details:', err.message || err);
        allSubmissionsSuccessful = false;
      }
    }
    
    // Use the last submission response for status updates (they should all be similar)
    const submitResponse = allSubmissionsSuccessful 
      ? { success: true, message: 'All responses submitted successfully' }
      : { success: false, message: 'Some responses failed to submit' };

    if (submitResponse.success) {
      console.log('✅ Field responses submitted successfully for all travelers');
      
      // ✅ Clear form data from localStorage after successful submission
      clearFormDataFromStorage();
      console.log('🗑️ Cleared form data from localStorage after successful submission');
      
      // Update submission status for all travelers
      for (let i = 0; i < allTravelers.value.length; i++) {
        const traveler = allTravelers.value[i];
        if (!traveler) continue;
        
        const travelerKey = getTravelerKey(traveler.id || null, i);
        const savedResponses = savedTravelerResponses[travelerKey];
        
        // Only mark as submitted if they have saved responses
        if (savedResponses && Object.keys(savedResponses).length > 0) {
          const statusKey = traveler.id
            ? `traveler-${traveler.id}`
            : `traveler-index-${i}`;
          submissionStatus[statusKey] = "submitted";
          console.log(`✅ Marked traveler ${travelerKey} as submitted`);
        }
      }

      // Refresh fields to show updated responses
      await fetchFields(selectedTravelerId.value);
      
      // Verify that field responses were saved (check if responses are in the fetched fields)
      const passportFieldsWithResponses = fields.value.filter((f: any) => {
        const isPassport = isPassportField(f);
        const hasResponse = f.response && (
          (f.response.value !== null && f.response.value !== undefined && f.response.value !== '') ||
          (f.response.filePath !== null && f.response.filePath !== undefined && f.response.filePath !== '')
        );
        return isPassport && hasResponse;
      });
      
      console.log('📋 Passport field responses saved in database:', passportFieldsWithResponses.length, 'out of', passportResponses.length);
      
      // Debug: Check all passport fields and their responses
      const allPassportFields = fields.value.filter((f: any) => isPassportField(f));
      console.log('🔍 All passport fields after submission:', allPassportFields.map((f: any) => ({
        fieldId: f.id,
        question: f.question,
        hasResponse: !!f.response,
        responseValue: f.response?.value || null,
        responseFilePath: f.response?.filePath || null,
        responseId: f.response?.id || null
      })));
      
      if (passportFieldsWithResponses.length > 0) {
        console.log('✅ Field responses are saved:', passportFieldsWithResponses.map((f: any) => ({
          fieldId: f.id,
          question: f.question,
          responseValue: f.response?.value,
          responseFilePath: f.response?.filePath
        })));
      } else {
        console.error('❌ CRITICAL: Field responses with string IDs were NOT saved to database');
        console.error('❌ Backend is rejecting or ignoring field responses with string fieldIds');
        console.error('❌ Submitted passport fieldIds:', passportResponses.map((r: any) => r.fieldId));
        console.error('❌ Backend needs to accept string fieldIds for passport fields');
      }
      
      // Refresh application to reflect possible status change to "processing"
      await fetchApplication();
      
      // After refresh, check if passport data was updated in traveler record
      if (currentTraveler.value && passportResponses.length > 0) {
        const traveler = currentTraveler.value as any;
        console.log('🔍 Verifying passport data in traveler record after submission:', {
          passportNumber: traveler.passportNumber || 'NOT UPDATED',
          passportExpiryDate: traveler.passportExpiryDate || 'NOT UPDATED',
          residenceCountry: traveler.residenceCountry || 'NOT UPDATED',
          hasSchengenVisa: traveler.hasSchengenVisa !== undefined ? traveler.hasSchengenVisa : 'NOT UPDATED'
        });
        
        // Check if passport data is still missing
        const passportStillMissing = !traveler.passportNumber || 
                                     !traveler.passportExpiryDate || 
                                     !traveler.residenceCountry || 
                                     traveler.hasSchengenVisa === undefined || 
                                     traveler.hasSchengenVisa === null;
        
        if (passportStillMissing) {
          console.warn('⚠️ WARNING: Passport data was submitted but traveler record was NOT updated.');
          console.warn('⚠️ Backend should extract passport data from field responses and update the traveler record.');
          console.warn('⚠️ Field responses with string IDs (_passport_number, etc.) need to be processed by the backend.');
          console.warn('⚠️ BACKEND FIX REQUIRED:');
          console.warn('   When processing field responses with fieldId starting with "_passport_":');
          console.warn('   - Extract the value from the response');
          console.warn('   - Map it to the corresponding traveler field:');
          console.warn('     * "_passport_number" → traveler.passportNumber');
          console.warn('     * "_passport_expiry_date" → traveler.passportExpiryDate');
          console.warn('     * "_residence_country" → traveler.residenceCountry');
          console.warn('     * "_has_schengen_visa" → traveler.hasSchengenVisa (convert "yes"/"no" to boolean)');
          console.warn('   - Update the traveler record in the database');
        } else {
          console.log('✅ Passport data successfully updated in traveler record');
        }
      }

      // Check if all additional info is now complete
      const allSubmitted = await checkAllAdditionalInfoSubmitted(
        applicationId.value,
        allTravelersList
      );

      // ✅ CRITICAL: Only redirect if not submitting all travelers (handleSubmitAll will redirect)
      if (!isSubmittingAll.value) {
      if (allSubmitted) {
          // All travelers have submitted - show success message and redirect
        alert(
          "All additional information submitted successfully! Your application status has been updated."
        );
          // Redirect to orders page
        router.push("/my-account/my-orders");
      } else {
          // Some travelers still need to submit - show message and redirect anyway
        alert(
            "Additional information submitted successfully! You can complete the remaining forms later."
        );
          // ✅ Always redirect after submission, even if not all travelers are done
          router.push("/my-account/my-orders");
        }
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
    // ✅ Load saved form data from localStorage before fetching application
    const hasSavedData = loadFormDataFromStorage();
    if (hasSavedData) {
      console.log('✅ Restored form data from localStorage');
    }
    
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

    // Check status for all travelers (only those with valid IDs)
    for (const traveler of travelers.value) {
      if (traveler.id !== undefined && traveler.id !== null) {
        await checkSubmissionStatus(traveler.id);
      }
    }
    
    // ✅ CRITICAL: Auto-select first traveler (with or without ID)
    // If traveler has ID, use it; if not, use null to fetch application-level fields
    const validTravelers = allTravelers.value;
    let shouldFetchFields = true; // Flag to prevent duplicate fetchFields calls
    
    if (validTravelers.length > 0) {
      const firstTraveler = validTravelers[0];
      selectedTravelerIndex.value = 0;
      
      if (firstTraveler && firstTraveler.id !== undefined && firstTraveler.id !== null) {
        // Traveler has ID - use it
        selectedTravelerId.value = firstTraveler.id;
        console.log('✅ Auto-selecting first traveler with ID:', firstTraveler.id, 'at index 0');
        // Fetch fields for the first traveler - this will include passport fields
        await fetchFields(firstTraveler.id);
        shouldFetchFields = false; // Already fetched, don't fetch again
      } else {
        // Traveler doesn't have ID - fetch application-level fields
        selectedTravelerId.value = null;
        console.log('⚠️ First traveler has no ID, fetching application-level fields at index 0');
        // Fetch application-level fields (travelerId = null)
        await fetchFields(null);
        shouldFetchFields = false; // Already fetched, don't fetch again
      }
    }

    // Auto-select first person with active resubmission requests
    // Only run this if we haven't already fetched fields above
    if (shouldFetchFields && app && app.resubmissionRequests && Array.isArray(app.resubmissionRequests)) {
      const activeRequests = app.resubmissionRequests.filter(
        (req: any) => !req.fulfilledAt
      );

      if (activeRequests.length > 0) {
        // Find first active request
        const firstRequest = activeRequests[0];

        if (firstRequest.target === "application") {
          // Application-level request - map to first traveler (since we removed application tab)
          const validTravelers = allTravelers.value;
          if (validTravelers.length > 0) {
            const firstTraveler = validTravelers[0];
            selectedTravelerIndex.value = 0;
            if (firstTraveler && firstTraveler.id !== undefined && firstTraveler.id !== null) {
              selectedTravelerId.value = firstTraveler.id;
            await fetchFields(selectedTravelerId.value);
          } else {
            selectedTravelerId.value = null;
            await fetchFields(null);
          }
            shouldFetchFields = false;
          }
        } else if (firstRequest.target === "traveler" && firstRequest.travelerId) {
          // Traveler-specific request - select that traveler
          const validTravelers = allTravelers.value;
          const idx = validTravelers.findIndex(
            (t) => t.id === firstRequest.travelerId
          );
          if (idx !== -1) {
            selectedTravelerId.value = firstRequest.travelerId;
            selectedTravelerIndex.value = idx;
            await fetchFields(selectedTravelerId.value);
            shouldFetchFields = false;
          }
        }
      }
    }
    
    // ✅ CRITICAL: Final fallback - if we still haven't fetched fields, use first traveler
    // If traveler has ID, use it; if not, fetch application-level fields
    if (shouldFetchFields && validTravelers.length > 0) {
      const firstTraveler = validTravelers[0];
          selectedTravelerIndex.value = 0;
      if (firstTraveler && firstTraveler.id !== undefined && firstTraveler.id !== null) {
        selectedTravelerId.value = firstTraveler.id;
        console.log('✅ Final fallback: selecting first traveler with ID:', firstTraveler.id);
        await fetchFields(firstTraveler.id);
        } else {
          selectedTravelerId.value = null;
        console.log('⚠️ Final fallback: first traveler has no ID, fetching application-level fields');
          await fetchFields(null);
        }
    } else if (shouldFetchFields && validTravelers.length === 0) {
      // No travelers at all - fetch application-level fields
      console.log('⚠️ No travelers found, fetching application-level fields');
        selectedTravelerId.value = null;
        selectedTravelerIndex.value = 0;
        await fetchFields(null);
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

// ✅ Watch formResponses and savedTravelerResponses to auto-save to localStorage
// Use debounce to avoid saving too frequently
let saveTimeout: ReturnType<typeof setTimeout> | null = null;
const debouncedSave = () => {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveFormDataToStorage();
  }, 1000); // Save 1 second after last change
};

watch(formResponses, () => {
  debouncedSave();
}, { deep: true });

watch(savedTravelerResponses, () => {
  debouncedSave();
}, { deep: true });

// Embassy selection functions
const fetchEmbassies = async () => {
  const app = application.value as any;
  if (!app || !app.destinationCountry || !app.nationality) {
    console.warn('⚠️ Missing destination or nationality for embassy fetch');
    return;
  }

  isLoadingEmbassies.value = true;
  embassyError.value = null;

  try {
    console.log('🔍 Fetching embassies for:', {
      destination: app.destinationCountry,
      nationality: app.nationality
    });
    
    const response = await getEmbassiesByCountries(app.nationality, app.destinationCountry);
    
    if (response.success && response.data) {
      embassies.value = response.data;
      console.log('✅ Loaded embassies:', embassies.value.length);
      
      // Auto-select embassy if already selected in application
      if (selectedEmbassyId.value && embassies.value.length > 0) {
        const savedEmbassy = embassies.value.find(
          embassy => embassy.id === selectedEmbassyId.value
        );
        if (savedEmbassy) {
          console.log('✅ Restored selected embassy:', savedEmbassy.embassyName);
        }
      }
    } else {
      embassies.value = [];
      embassyError.value = response.message || 'Failed to load embassies';
    }
  } catch (err: any) {
    console.error('❌ Error fetching embassies:', err);
    embassyError.value = err.message || 'Failed to load embassies';
    embassies.value = [];
  } finally {
    isLoadingEmbassies.value = false;
  }
};

const selectEmbassy = (embassy: Embassy) => {
  selectedEmbassyId.value = embassy.id;
  console.log('✅ Embassy selected:', embassy.embassyName);
};

const saveEmbassySelection = async () => {
  if (!selectedEmbassyId.value || !applicationId.value) {
    return;
  }

  isSavingEmbassy.value = true;

  try {
    console.log('💾 Saving embassy selection:', selectedEmbassyId.value);
    
    const response = await updateDraftApplication(applicationId.value, {
      embassyId: selectedEmbassyId.value
    });

    if (response.success) {
      console.log('✅ Embassy selection saved successfully');
      // Update local application state
      if (application.value) {
        const app = application.value as any;
        app.embassyId = selectedEmbassyId.value;
      }
    } else {
      throw new Error(response.message || 'Failed to save embassy selection');
    }
  } catch (err: any) {
    console.error('❌ Error saving embassy selection:', err);
    embassyError.value = err.message || 'Failed to save embassy selection';
  } finally {
    isSavingEmbassy.value = false;
  }
};

watch([selectedTravelerId, selectedTravelerIndex], () => {
  debouncedSave();
});

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
