<template>
 <div class="min-h-screen py-10 pb-32 px-52">

    <div class="max-w-3xl mx-auto space-y-6">
      
      <!-- Header Section with Title and Submit Button -->
      <div class="flex items-center justify-between">
       <h1 class="text-2xl font-semibold leading-8" style="font-family: Geist; color: #020617; letter-spacing: -0.006em;">
        Additional Information
        </h1>
     <Button
        @click="handleSubmit"
        class="h-9 px-4 rounded-md text-white font-medium text-sm"
        style="background-color: #1ECE84; font-family: Geist; width: 79px;"
        :disabled="isSubmitting"
        >
        {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </Button>
      </div>

      <!-- Form Container -->
      <form @submit.prevent="handleSubmit" class="border rounded-xl p-4 pt-8 pb-8 bg-white space-y-4" style="border-color: #E4E4E8;">
        
        <!-- Visa Type Title -->
        <div class="px-6">
        <h2 class="text-base font-semibold leading-4" style="font-family: Geist; color: #27272B;">
        Morocco Standard Visa
        </h2>
        </div>

        <!-- Planned Arrival Date -->
        <div class="px-6 space-y-4">
        <label class="block text-sm font-medium leading-5" style="font-family: Inter; color: #020617; letter-spacing: -0.006em;">
            Planned Arrival Date
            </label>
          <div class="grid grid-cols-3 gap-4">
            <Select v-model="formData.plannedArrival.day">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Day" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="day in dayOptions" :key="day.value" :value="day.value">
                  {{ day.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.plannedArrival.month">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Month" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="month in monthOptions" :key="month.value" :value="month.value">
                  {{ month.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.plannedArrival.year">
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
        </div>

        <!-- Planned Return Date -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Planned Return Date
          </label>
          <div class="grid grid-cols-3 gap-4">
            <Select v-model="formData.plannedReturn.day">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Day" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="day in dayOptions" :key="day.value" :value="day.value">
                  {{ day.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.plannedReturn.month">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Month" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="month in monthOptions" :key="month.value" :value="month.value">
                  {{ month.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.plannedReturn.year">
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
        </div>

        <!-- First Name -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            First Name
          </label>
          <Input
            v-model="formData.firstName"
            placeholder="Jon Doe"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Family Name -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Family Name
          </label>
          <Input
            v-model="formData.familyName"
            placeholder="Jon Doe"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Date of Birth -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Date of Birth
          </label>
          <div class="grid grid-cols-3 gap-4">
            <Select v-model="formData.dateOfBirth.day">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Day" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="day in dayOptions" :key="day.value" :value="day.value">
                  {{ day.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.dateOfBirth.month">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Month" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="month in monthOptions" :key="month.value" :value="month.value">
                  {{ month.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.dateOfBirth.year">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Year" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="year in birthYearOptions" :key="year.value" :value="year.value">
                  {{ year.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Residence Permit Number -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Residence Permit Number
          </label>
          <Input
            v-model="formData.residencePermitNumber"
            placeholder="289r4298409827349"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Country of Birth -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Country of Birth
          </label>
          <Select v-model="formData.countryOfBirth">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Select Country" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="country in countryOptions" :key="country.value" :value="country.value">
                {{ country.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Current Nationality -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Current Nationality
          </label>
          <Select v-model="formData.currentNationality">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Select Country" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="country in countryOptions" :key="country.value" :value="country.value">
                {{ country.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Original Nationality -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Original Nationality
          </label>
          <Select v-model="formData.originalNationality">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Select Country" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="country in countryOptions" :key="country.value" :value="country.value">
                {{ country.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Gender -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Gender
          </label>
          <Select v-model="formData.gender">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Male" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="gender in genderOptions" :key="gender.value" :value="gender.value">
                {{ gender.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Marital Status -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Marital Status
          </label>
          <Select v-model="formData.maritalStatus">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Single" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="status in maritalStatusOptions" :key="status.value" :value="status.value">
                {{ status.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Other Marital Status -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Other Marital Status
          </label>
          <Select v-model="formData.otherMaritalStatus">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Single" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="status in maritalStatusOptions" :key="status.value" :value="status.value">
                {{ status.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Profession -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Profession
          </label>
          <Select v-model="formData.profession">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Doctor" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="profession in professionOptions" :key="profession.value" :value="profession.value">
                {{ profession.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Father Name -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Father Name
          </label>
          <Input
            v-model="formData.fatherName"
            placeholder="Jon Doe"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Mother Name -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Mother name
          </label>
          <Input
            v-model="formData.motherName"
            placeholder="Jon Doe"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Passport Type -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Passport Type
          </label>
          <Select v-model="formData.passportType">
            <SelectTrigger variant="form">
              <SelectValue placeholder="diplomatic" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="type in passportTypeOptions" :key="type.value" :value="type.value">
                {{ type.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Other Passport Type -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Other Passport Type
          </label>
          <Select v-model="formData.otherPassportType">
            <SelectTrigger variant="form">
              <SelectValue placeholder="diplomatic" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="type in passportTypeOptions" :key="type.value" :value="type.value">
                {{ type.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Passport Number -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Passport Number
          </label>
          <Input
            v-model="formData.passportNumber"
            placeholder="92837498479217392"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Issued by -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Issued by
          </label>
          <Input
            v-model="formData.issuedBy"
            placeholder="----"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Serial Number -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Serial Number
          </label>
          <Input
            v-model="formData.serialNumber"
            placeholder="928372987920203"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Date of Issue -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Date of Issue
          </label>
          <div class="grid grid-cols-3 gap-4">
            <Select v-model="formData.dateOfIssue.day">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Day" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="day in dayOptions" :key="day.value" :value="day.value">
                  {{ day.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.dateOfIssue.month">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Month" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="month in monthOptions" :key="month.value" :value="month.value">
                  {{ month.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.dateOfIssue.year">
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
        </div>

        <!-- Date of Expiration -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Date of Expiration
          </label>
          <div class="grid grid-cols-3 gap-4">
            <Select v-model="formData.dateOfExpiration.day">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Day" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="day in dayOptions" :key="day.value" :value="day.value">
                  {{ day.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.dateOfExpiration.month">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Month" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="month in monthOptions" :key="month.value" :value="month.value">
                  {{ month.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.dateOfExpiration.year">
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
        </div>

        <!-- Purpose of travel -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Purpose of travel
          </label>
          <Select v-model="formData.purposeOfTravel">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Family visit" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="purpose in purposeOptions" :key="purpose.value" :value="purpose.value">
                {{ purpose.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Other Purpose of travel -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Other Purpose of travel
          </label>
          <Select v-model="formData.otherPurposeOfTravel">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Family visit" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="purpose in purposeOptions" :key="purpose.value" :value="purpose.value">
                {{ purpose.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Type of Visa -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Type of Visa
          </label>
          <Select v-model="formData.typeOfVisa">
            <SelectTrigger variant="form">
              <SelectValue placeholder="30 day" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="type in visaTypeOptions" :key="type.value" :value="type.value">
                {{ type.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Number of Entries -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Number of Entries
          </label>
          <Input
            v-model="formData.numberOfEntries"
            placeholder="200"
            type="number"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Duration of Stay -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Duration of Stay
          </label>
          <Select v-model="formData.durationOfStay">
            <SelectTrigger variant="form">
              <SelectValue placeholder="30 days" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="duration in durationOptions" :key="duration.value" :value="duration.value">
                {{ duration.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Arrival Date -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Arrival Date
          </label>
          <div class="grid grid-cols-3 gap-4">
            <Select v-model="formData.arrivalDate.day">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Day" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="day in dayOptions" :key="day.value" :value="day.value">
                  {{ day.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.arrivalDate.month">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Month" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="month in monthOptions" :key="month.value" :value="month.value">
                  {{ month.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.arrivalDate.year">
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
        </div>

        <!-- Border entry or transit route -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Border entry or transit route
          </label>
          <Select v-model="formData.borderEntry">
            <SelectTrigger variant="form">
              <SelectValue placeholder="xyz routee" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="route in borderRouteOptions" :key="route.value" :value="route.value">
                {{ route.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Mean of Transport -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Mean of Transport
          </label>
          <Select v-model="formData.meanOfTransport">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Car" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="transport in transportOptions" :key="transport.value" :value="transport.value">
                {{ transport.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Previous Visas -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Previous Visas
          </label>
          <Select v-model="formData.previousVisas">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Morocco" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="country in countryOptions" :key="country.value" :value="country.value">
                {{ country.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Previous Visa Date -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Previous Visa Date
          </label>
          <div class="grid grid-cols-3 gap-4">
            <Select v-model="formData.previousVisaDate.day">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Day" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="day in dayOptions" :key="day.value" :value="day.value">
                  {{ day.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.previousVisaDate.month">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Month" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="month in monthOptions" :key="month.value" :value="month.value">
                  {{ month.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.previousVisaDate.year">
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
        </div>

        <!-- Previous Visa number -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Previous Visa number
          </label>
          <Input
            v-model="formData.previousVisaNumber"
            placeholder="928372987920203"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Previous Visa Place of Issue -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Previous Visa Place of Issue
          </label>
          <Select v-model="formData.previousVisaPlaceOfIssue">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Pakistan" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="country in countryOptions" :key="country.value" :value="country.value">
                {{ country.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Previous Visa Duration -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Previous Visa Duration
          </label>
          <Select v-model="formData.previousVisaDuration">
            <SelectTrigger variant="form">
              <SelectValue placeholder="30 days" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="duration in durationOptions" :key="duration.value" :value="duration.value">
                {{ duration.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Entry Permit for final destination -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Entry Permit for final destination
          </label>
          <div class="relative">
            <Input
              type="file"
              @change="handleFileUpload"
              class="hidden"
              ref="fileInput"
            />
            <button
              type="button"
              @click="triggerFileUpload"
              class="w-full h-9 border rounded-md px-4 text-left text-sm text-gray-500 flex items-center justify-between"
              style="border-color: #D4D4DA;"
            >
              <span>Upload</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.3333 5.33333L8 2L4.66667 5.33333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 2V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Entry Permit Valid Until -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Entry Permit Valid Until
          </label>
          <div class="grid grid-cols-3 gap-4">
            <Select v-model="formData.entryPermitValidUntil.day">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Day" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="day in dayOptions" :key="day.value" :value="day.value">
                  {{ day.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.entryPermitValidUntil.month">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Month" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="month in monthOptions" :key="month.value" :value="month.value">
                  {{ month.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.entryPermitValidUntil.year">
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
        </div>

        <!-- Entry Permit Issued by -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Entry Permit Issued by
          </label>
          <Input
            v-model="formData.entryPermitIssuedBy"
            placeholder="----"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Country of Destination (If visa is for transit) -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Country of Destination (If visa is for transit)
          </label>
          <Select v-model="formData.countryOfDestination">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Morocco" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="country in countryOptions" :key="country.value" :value="country.value">
                {{ country.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Host/Company Name -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Host/Company Name
          </label>
          <Input
            v-model="formData.hostCompanyName"
            placeholder="XYZ LLC"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Host/Company Name Address -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Host/Company Name Address
          </label>
          <Input
            v-model="formData.hostCompanyAddress"
            placeholder="xyz street, 92 C Model town"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Host/Company Phone -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Host/Company Phone
          </label>
          <Input
            v-model="formData.hostCompanyPhone"
            placeholder="+1 289 293 293"
            type="tel"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Host/Company Fax -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Host/Company Fax
          </label>
          <Input
            v-model="formData.hostCompanyFax"
            placeholder="+1 289 293 293"
            type="tel"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Host/Company Email -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Host/Company Email
          </label>
          <Input
            v-model="formData.hostCompanyEmail"
            placeholder="jdoe@gmail.com"
            type="email"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Payer of Trip -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Payer of Trip
          </label>
          <Select v-model="formData.payerOfTrip">
            <SelectTrigger variant="form">
              <SelectValue placeholder="Self" />
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="payer in payerOptions" :key="payer.value" :value="payer.value">
                {{ payer.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Insurance Valid Until -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Insurance Valid Until
          </label>
          <div class="grid grid-cols-3 gap-4">
            <Select v-model="formData.insuranceValidUntil.day">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Day" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="day in dayOptions" :key="day.value" :value="day.value">
                  {{ day.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.insuranceValidUntil.month">
              <SelectTrigger variant="form">
                <SelectValue placeholder="Month" />
                
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="month in monthOptions" :key="month.value" :value="month.value">
                  {{ month.label }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select v-model="formData.insuranceValidUntil.year">
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
        </div>

        <!-- Children Details (if any) -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Children Details (if any)
          </label>
          <Input
            v-model="formData.childrenDetails"
            placeholder="xyz"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Applicant Address -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Applicant Address
          </label>
          <Input
            v-model="formData.applicantAddress"
            placeholder="xyz street, 92 C Model town"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Applicant Phone -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Applicant Phone
          </label>
          <Input
            v-model="formData.applicantPhone"
            placeholder="+1 289 293 293"
            type="tel"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

        <!-- Applicant Email -->
        <div class="px-6 space-y-4">
          <label class="block text-sm font-medium" style="font-family: Geist; color: #020617;">
            Applicant Email
          </label>
          <Input
            v-model="formData.applicantEmail"
            placeholder="jdoe@gmail.com"
            type="email"
            class="w-full h-9 border"
            style="border-color: #D4D4DA;"
          />
        </div>

      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'

const isSubmitting = ref(false)
const fileInput = ref<HTMLInputElement>()

const formData = reactive({
  plannedArrival: { day: '', month: '', year: '' },
  plannedReturn: { day: '', month: '', year: '' },
  firstName: '',
  familyName: '',
  dateOfBirth: { day: '', month: '', year: '' },
  residencePermitNumber: '',
  countryOfBirth: '',
  currentNationality: '',
  originalNationality: '',
  gender: '',
  maritalStatus: '',
  otherMaritalStatus: '',
  profession: '',
  fatherName: '',
  motherName: '',
  passportType: '',
  otherPassportType: '',
  passportNumber: '',
  issuedBy: '',
  serialNumber: '',
  dateOfIssue: { day: '', month: '', year: '' },
  dateOfExpiration: { day: '', month: '', year: '' },
  purposeOfTravel: '',
  otherPurposeOfTravel: '',
  typeOfVisa: '',
  numberOfEntries: '',
  durationOfStay: '',
  arrivalDate: { day: '', month: '', year: '' },
  borderEntry: '',
  meanOfTransport: '',
  previousVisas: '',
  previousVisaDate: { day: '', month: '', year: '' },
  previousVisaNumber: '',
  previousVisaPlaceOfIssue: '',
  previousVisaDuration: '',
  entryPermitFile: null as File | null,
  entryPermitValidUntil: { day: '', month: '', year: '' },
  entryPermitIssuedBy: '',
  countryOfDestination: '',
  hostCompanyName: '',
  hostCompanyAddress: '',
  hostCompanyPhone: '',
  hostCompanyFax: '',
  hostCompanyEmail: '',
  payerOfTrip: '',
  insuranceValidUntil: { day: '', month: '', year: '' },
  childrenDetails: '',
  applicantAddress: '',
  applicantPhone: '',
  applicantEmail: ''
})

// Options arrays
const dayOptions = Array.from({ length: 31 }, (_, i) => ({ 
  value: String(i + 1), 
  label: String(i + 1) 
}))

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
  { value: '12', label: 'December' }
]

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 10 }, (_, i) => ({ 
  value: String(currentYear + i), 
  label: String(currentYear + i) 
}))

const birthYearOptions = Array.from({ length: 100 }, (_, i) => ({ 
  value: String(currentYear - i), 
  label: String(currentYear - i) 
}))

const countryOptions = [
  { value: 'morocco', label: 'Morocco' },
  { value: 'pakistan', label: 'Pakistan' },
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'canada', label: 'Canada' }
]

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
]

const maritalStatusOptions = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' }
]

const professionOptions = [
  { value: 'doctor', label: 'Doctor' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'business', label: 'Business' },
  { value: 'other', label: 'Other' }
]

const passportTypeOptions = [
  { value: 'diplomatic', label: 'Diplomatic' },
  { value: 'official', label: 'Official' },
  { value: 'ordinary', label: 'Ordinary' }
]

const purposeOptions = [
  { value: 'family', label: 'Family visit' },
  { value: 'business', label: 'Business' },
  { value: 'tourism', label: 'Tourism' },
  { value: 'education', label: 'Education' }
]

const visaTypeOptions = [
  { value: '30', label: '30 day' },
  { value: '60', label: '60 day' },
  { value: '90', label: '90 day' }
]

const durationOptions = [
  { value: '30', label: '30 days' },
  { value: '60', label: '60 days' },
  { value: '90', label: '90 days' }
]

const borderRouteOptions = [
  { value: 'xyz', label: 'xyz routee' },
  { value: 'abc', label: 'abc route' }
]

const transportOptions = [
  { value: 'car', label: 'Car' },
  { value: 'plane', label: 'Plane' },
  { value: 'bus', label: 'Bus' },
  { value: 'train', label: 'Train' }
]

const payerOptions = [
  { value: 'self', label: 'Self' },
  { value: 'company', label: 'Company' },
  { value: 'sponsor', label: 'Sponsor' }
]

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    formData.entryPermitFile = target.files[0]
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', formData)
    alert('Form submitted successfully!')
    
  } catch (error) {
    console.error('Submission failed:', error)
    alert('Submission failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>