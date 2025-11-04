<!-- pages/newsletter.vue -->
<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <HeaderLoggedIn />

    <!-- Newsletter Section -->
    <div class="container mx-auto px-6 lg:px-8 py-12">
      <!-- Main Container: max-width: 1200px, gap: 121px -->
      <div class="max-w-[1200px] mx-auto flex flex-col gap-[121px]">
        
        <!-- First Container: Header Section -->
        <div class="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
          <!-- Left Side - Badge and Title -->
          <div class="flex flex-col gap-6">
            <!-- Badge: width: 175px, height: 34px, gap: 10px, border-radius: 100px, padding: 5px 15px -->
            <div class="inline-flex items-center gap-2.5 w-fit bg-[#F1F9FC] rounded-full px-[15px] py-[5px] h-[34px]">
              <span class="font-manrope font-medium text-sm text-gray-700 uppercase">GET VISA UPDATES</span>
            </div>
            
            <!-- Title: width: 558px, font-size: 48px, line-height: 64px, letter-spacing: -1.8px -->
            <h1 class="font-manrope font-bold text-[48px] leading-[64px] tracking-[-1.8px] text-[#0A3D3F] max-w-[558px]">
              Stay Ahead.<br />Travel with Confidence.
            </h1>
          </div>

          <!-- Right Side - Text, Input and Button -->
          <div class="flex flex-col gap-6 max-w-[642px] lg:mt-[58px]">
            <!-- Description Text: width: 642px, font-size: 16px, line-height: 28px, letter-spacing: -0.12px -->
            <p class="font-manrope font-normal text-base leading-7 tracking-[-0.12px] text-gray-600">
              Join thousands of travelers who rely on Visa123 for timely visa updates, practical travel advice, and exclusive offers delivered straight to your inbox.
            </p>

            <!-- Input and Button Container: width: 581px, height: 50px, gap: 20px -->
            <div class="flex flex-col sm:flex-row gap-5 max-w-[581px]">
              <!-- Input Field: width: 397px, height: 50px, border-radius: 10px -->
              <Input
                type="email"
                placeholder="Enter your email"
                v-model="email"
                :custom-class="'flex-1 h-[50px] rounded-[10px] font-manrope'"
              />
              
              <!-- Join Now Button: width: 164px, height: 50px, border-radius: 10px, bg: #02D275 -->
              <Button
                @click="handleJoinNow"
                :class="'w-full sm:w-[164px] h-[50px] rounded-[10px] !bg-[#02D275] hover:!bg-[#02D275]/90 !text-white font-manrope font-semibold'"
              >
                Join now
              </Button>
            </div>
          </div>
        </div>

        <!-- Cards Row: width: 1200px, height: 226px, gap: 24px -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <Card :class="'w-full h-auto lg:h-[226px] rounded-lg bg-[#F1F9FC] border-0'">
            <CardContent :class="'p-[35px] flex flex-col gap-4'">
              <!-- png Icon: width: 61.875px, height: 60px -->
              <div class="w-[61.875px] h-[60px]">
                <img 
                  src="/png/get-visa.png" 
                  alt="visa alert icon"
                  class="w-full h-full"
                />
              </div>

              <!-- Text Container: gap: 8px -->
              <div class="flex flex-col gap-2">
                <!-- Heading: font-size: 18px, line-height: 24px, letter-spacing: -0.24px -->
                <h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900">
                  Fresh visa alerts
                </h3>
                
                <!-- Subheading: font-size: 16px, line-height: 24px, letter-spacing: -0.08px -->
                <p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600">
                  Be notified instantly of important visa changes that could impact your journey.
                </p>
              </div>
            </CardContent>
          </Card>

          <!-- Card 2 -->
          <Card :class="'w-full h-auto lg:h-[226px] rounded-lg bg-[#F1F9FC] border-0'">
            <CardContent :class="'p-[35px] flex flex-col gap-4'">
              <!-- png Icon: width: 61.875px, height: 60px -->
              <div class="w-[61.875px] h-[60px]">
                <img 
                  src="/png/globe.png" 
                  alt="travel guidance icon"
                  class="w-full h-full"
                />
              </div>

              <!-- Text Container: gap: 8px -->
              <div class="flex flex-col gap-2">
                <!-- Heading: font-size: 18px, line-height: 24px, letter-spacing: -0.24px -->
                <h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900">
                  Smart travel guidance
                </h3>
                
                <!-- Subheading: font-size: 16px, line-height: 24px, letter-spacing: -0.08px -->
                <p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600">
                  Get insider tips that make your trips simpler, safer, and more enjoyable.
                </p>
              </div>
            </CardContent>
          </Card>

          <!-- Card 3 -->
          <Card :class="'w-full h-auto lg:h-[226px] rounded-lg bg-[#F1F9FC] border-0'">
            <CardContent :class="'p-[35px] flex flex-col gap-4'">
              <!-- png Icon: width: 61.875px, height: 60px -->
              <div class="w-[61.875px] h-[60px]">
                <img 
                  src="/png/deal.png" 
                  alt="special deals icon"
                  class="w-full h-full"
                />
              </div>

              <!-- Text Container: gap: 8px -->
              <div class="flex flex-col gap-2">
                <!-- Heading: font-size: 18px, line-height: 24px, letter-spacing: -0.24px -->
                <h3 class="font-manrope font-semibold text-lg leading-6 tracking-[-0.24px] text-gray-900">
                  Special deals
                </h3>
                
                <!-- Subheading: font-size: 16px, line-height: 24px, letter-spacing: -0.08px -->
                <p class="font-manrope font-normal text-base leading-6 tracking-[-0.08px] text-gray-600">
                  Enjoy access to unique discounts and limited-time savings on your travels.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Subscribe Now Button: width: 164px, height: 50px, border-radius: 10px, bg: #02D275 -->
        <div class="mt-[-100px]">
          <Button
            @click="handleSubscribe"
            :class="'w-full sm:w-[164px] h-[50px] rounded-[10px] !bg-[#02D275] hover:!bg-[#02D275]/90 !text-white font-manrope font-semibold'"
          >
            Subscribe Now
          </Button>
        </div>
      </div>
    </div>

    <!-- Spacing before footer: height 211px -->
    <div class="h-[211px]"></div>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Import components
import HeaderLoggedIn from '@/components/HeaderLoggedIn.vue'
import Footer from '@/components/Footer.vue'
import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'

// Email state
const email = ref('')

// Handle join now click
const handleJoinNow = () => {
  if (email.value) {
    console.log('Subscribing email:', email.value)
    alert('Thank you for subscribing! You will receive visa updates at ' + email.value)
    email.value = ''
  } else {
    alert('Please enter your email address')
  }
}

// Handle subscribe button click
const handleSubscribe = () => {
  alert('Subscribe button clicked! Please use the email form above to subscribe.')
}
</script>

<style scoped>
/* Import Manrope font */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

/* Apply Manrope font family globally for this component */
.font-manrope {
  font-family: 'Manrope', sans-serif;
}
</style>