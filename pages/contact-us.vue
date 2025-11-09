<!-- pages/contact-us.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <HeaderLoggedIn />

    <!-- Contact Section -->
    <div class="container mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <!-- Section Header -->
      <div class="mb-12">
        <!-- CONTACT & LOCATION Badge -->
        <div class="inline-flex items-center gap-2.5 mb-6 bg-[#F1F9FC] rounded-full px-[15px] py-[5px] h-[34px]">
          <span class="font-manrope text-sm font-medium text-gray-600">CONTACT & LOCATION</span>
        </div>
        
        <!-- Title and Subtitle in same row -->
        <div class="flex items-center justify-between">
          <!-- Contact us title -->
          <h1 class="font-manrope font-bold text-[56px] leading-[56px] tracking-[-0.015em] max-w-[380px]">
            Contact us
          </h1>
          
          <!-- Contact our customer support text -->
          <p class="font-manrope font-normal text-lg leading-8 w-[253px] text-[#71717B] text-center">
            Contact our customer support
          </p>
        </div>
      </div>

      <!-- Two Column Layout with bottom alignment -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
        <!-- Left Column - Contact Form Container -->
        <div>
          <!-- Quick Info -->
          <div class="flex items-center gap-8 mb-8">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-600">
              <Clock class="h-4 w-4" />
              <span class="font-manrope">~2h responses</span>
            </div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-600">
              <Headphones class="h-4 w-4" />
              <span class="font-manrope">24/7 support</span>
            </div>
          </div>

          <!-- Contact Form Container -->
          <Card :class="'bg-[#F1F9FC] rounded-2xl border border-[#E5E7EB] w-full max-w-[590px] h-[656px]'">
            <CardContent :class="'p-[35px]'">
              <h3 class="font-manrope text-lg font-medium text-gray-900 mb-6">Send us a message.</h3>
              
              <form @submit.prevent="handleSubmit" class="space-y-6 max-w-[520px]">
                <!-- Full Name -->
                <div>
                  <label for="fullName" class="block font-manrope text-sm font-medium text-[#374151] mb-2">
                    Full Name<span class="text-red-500">*</span>
                  </label>
                  <Input
                    id="fullName"
                    v-model="formData.fullName"
                    type="text"
                    placeholder="Enter your name"
                    required
                    :custom-class="'w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent'"
                  />
                </div>

                <!-- Email Address -->
                <div>
                  <label for="email" class="block font-manrope text-sm font-medium text-[#374151] mb-2">
                    Email Address<span class="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    :custom-class="'w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent'"
                  />
                </div>

                <!-- Help Topic -->
                <div>
                  <label for="helpTopic" class="block font-manrope text-sm font-medium text-[#374151] mb-2">
                    What can we help you with?<span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <select
                      id="helpTopic"
                      v-model="formData.helpTopic"
                      required
                      class="w-full px-4 py-2.5 pr-10 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent transition-all"
                      :class="formData.helpTopic ? 'text-[#111827]' : 'text-[#71717B]'"
                    >
                      <option value="" disabled>Select...</option>
                      <option value="general">General Inquiry</option>
                      <option value="visa">Visa Application</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="block font-manrope text-sm font-medium text-[#374151] mb-2">
                    Message<span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    placeholder="Enter your message"
                    required
                    rows="5"
                    class="w-full px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-lg font-manrope font-normal text-sm leading-6 resize-none focus:outline-none focus:ring-2 focus:ring-[#1ECB84] focus:border-transparent transition-all placeholder:text-[#71717B]"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <Button
                  type="submit"
                  :class="'w-full h-[50px] !bg-[#1ECB84] hover:!bg-[#1AB876] !text-white font-manrope font-semibold rounded-lg'"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <!-- Right Column - Office Info & Map -->
        <div>
          <!-- Office Info Container -->
          <Card :class="'w-full max-w-[590px] h-[676px] rounded-2xl border border-[#D4D4D8]'">
            <CardContent :class="'p-6'">
              <div class="space-y-8 max-w-[542px]">
                <!-- Location Section -->
                <div>
                  <img 
                    src="/svg/pin.svg" 
                    alt="pin"
                    class="h-6 w-6 mb-4"
                  />
                  <h3 class="font-manrope font-semibold text-lg leading-8 mb-2">Dubai Office</h3>
                  <p class="font-manrope font-normal text-base leading-7 text-[#3F3F46]">
                    Visa 123 LLC Shams Business Centre Sharjah media City Free Zone Al Messaned Sharjah
                  </p>
                </div>

                <!-- Separator -->
                <div class="h-px bg-gray-200"></div>
                
                <!-- Contact Info -->
                <div>
                  <img 
                    src="/svg/calendar.svg" 
                    alt="calendar"
                    class="h-6 w-6 mb-4"
                  />
                  <h4 class="font-manrope font-semibold text-lg leading-8 mb-2">Contact</h4>
                  <div class="space-y-2">
                    <p class="font-manrope font-medium text-base leading-7 text-gray-700">
                      +971 585743188
                    </p>
                    <p class="font-manrope font-normal text-base leading-7 text-[#3F3F46]">
                      support@visa123.com
                    </p>
                  </div>
                </div>

                <!-- Contact Us Button -->
                <div>
                  <Button
                    @click="handleContactClick"
                    :class="'w-[173px] h-[46px] !bg-[#1ECB84] hover:!bg-[#1AB876] !text-white font-manrope font-semibold rounded-[10px]'"
                  >
                    Contact Us
                  </Button>
                </div>

                <!-- Map iframe -->
                <div class="w-full max-w-[542px] h-[246px] rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.3967074085084!2d55.372853!3d25.223533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShams%20Business%20Centre%2C%20Sharjah%20Media%20City%20Free%20Zone!5e0!3m2!1sen!2sae!4v1234567890"
                    width="100%"
                    height="70%"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

 
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Clock, Headphones, ChevronDown } from 'lucide-vue-next'

// Import components
import HeaderLoggedIn from '@/components/HeaderLoggedIn.vue'
import Footer from '@/components/Footer.vue'
import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'

// Form data
const formData = ref({
  fullName: '',
  email: '',
  helpTopic: '',
  message: ''
})

// Handle form submission
const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  
  // Show success message
  alert('Thank you for contacting us! We will respond within 2 hours.')
  
  // Reset form
  formData.value = {
    fullName: '',
    email: '',
    helpTopic: '',
    message: ''
  }
}

// Handle contact button click
const handleContactClick = () => {
  const formElement = document.querySelector('form')
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

.font-manrope {
  font-family: 'Manrope', sans-serif;
}
</style>