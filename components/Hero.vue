<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[calc(100vh-80px)] flex items-center justify-center w-full overflow-hidden">
      <!-- Background Image - Full width -->
      <div class="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg" 
          alt=""
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <!-- Very light overlay for better text readability -->
        <div class="absolute inset-0 bg-black/5"></div>
      </div>

      <!-- Content Container - Centered both vertically and horizontally -->
      <div class="relative z-20 container mx-auto max-w-6xl px-6 lg:px-8 text-center py-20">
        <!-- Hero Text -->
        <div class="mb-12">
          <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Your Visa. Our Priority.
          </h1>
          <p class="text-xl lg:text-2xl text-white/95 drop-shadow-lg">
            Let us handle your visa any country, anywhere in the world.
          </p>
        </div>

        <!-- Search Card with enhanced transparency -->
        <Card 
          class="!rounded-[24px] shadow-2xl max-w-4xl mx-auto" 
          style="background: rgba(231, 238, 233, 0.87); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border: 0;"
        >
          <CardContent class="p-8 lg:p-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <!-- From Select -->
              <div class="space-y-2 text-left">
                <Label htmlFor="from" class="text-gray-700 font-medium text-base">
                  Where am I from?
                </Label>
                <Select v-model="selectedFrom">
                  <SelectTrigger 
                    id="from" 
                    class="w-full !h-[52px] !bg-white/90 !rounded-[20px] !border-2 !border-gray-200 hover:!border-gray-300 transition-all"
                  >
                    <SelectValue>
                      <div class="flex items-center gap-3" v-if="selectedFrom">
                        <span class="text-2xl">{{ getCountryFlag(selectedFrom) }}</span>
                        <span class="text-base">{{ selectedFrom }}</span>
                      </div>
                      <span v-else class="text-gray-500">Select a country</span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent class="!rounded-[20px] !bg-white">
                    <SelectItem value="United Arab Emirates">
                      <div class="flex items-center gap-3">
                        <span class="text-2xl">🇦🇪</span>
                        <span>United Arab Emirates</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="United States">
                      <div class="flex items-center gap-3">
                        <span class="text-2xl">🇺🇸</span>
                        <span>United States</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Pakistan">
                      <div class="flex items-center gap-3">
                        <span class="text-2xl">🇵🇰</span>
                        <span>Pakistan</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <!-- To Select -->
              <div class="space-y-2 text-left">
                <Label htmlFor="to" class="text-gray-700 font-medium text-base">
                  Where am I going?
                </Label>
                <Select v-model="selectedTo">
                  <SelectTrigger 
                    id="to" 
                    class="w-full !h-[52px] !bg-white/90 !rounded-[20px] !border-2 !border-gray-200 hover:!border-gray-300 transition-all"
                  >
                    <SelectValue>
                      <div class="flex items-center gap-3" v-if="selectedTo">
                        <span class="text-2xl">{{ getCountryFlag(selectedTo) }}</span>
                        <span class="text-base">{{ selectedTo }}</span>
                      </div>
                      <span v-else class="text-gray-500">Select a country</span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent class="!rounded-[20px] !bg-white">
                    <SelectItem value="United Kingdom">
                      <div class="flex items-center gap-3">
                        <span class="text-2xl">🇬🇧</span>
                        <span>United Kingdom</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="United States">
                      <div class="flex items-center gap-3">
                        <span class="text-2xl">🇺🇸</span>
                        <span>United States</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Canada">
                      <div class="flex items-center gap-3">
                        <span class="text-2xl">🇨🇦</span>
                        <span>Canada</span>
                      </div>
                    </SelectItem>

                     <SelectItem value="Morocco">
                      <div class="flex items-center gap-3">
                        <span class="text-2xl">🇲🇦</span>
                        <span>Morocco</span>
                      </div>
                    </SelectItem>


                  </SelectContent>
                </Select>
              </div>

              <!-- Get Started Button -->
              <Button 
                size="lg"
                class="!bg-gradient-to-r !from-[#00C6A7] !to-[#26D07A] hover:!from-[#00B599] hover:!to-[#22BD6D] !text-white !h-[52px] !rounded-[20px] w-full !font-semibold !text-lg shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                @click="handleGetStarted"
              >
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-white py-12 lg:py-16 border-t border-gray-100">
      <div class="container mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <!-- Happy Customers -->
          <div class="text-center">
            <div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              180K
            </div>
            <div class="text-[13px] leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Happy Customers
            </div>
          </div>

          <!-- 24/7 Support -->
          <div class="text-center">
            <div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              24/7
            </div>
            <div class="text-[13px] leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Support
            </div>
          </div>

        <!-- Trustpilot -->
        <div class="text-center col-span-2 lg:col-span-1 flex items-center justify-center">
        
        <div>
            <img 
            src="/logos/trust-pilot.png"
            alt="Trustpilot"
            class="w-[104px] h-[30px] object-contain translate-y-2"
            />

        </div>
        </div>

          <!-- Years of Experience -->
          <div class="text-center">
            <div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              11
            </div>
            <div class="text-[13px] leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Years of Experience
            </div>
          </div>

          <!-- Visa Approval Rate -->
          <div class="text-center">
            <div class="text-[32px] leading-[40px] font-bold text-[#0B3947] mb-1" style="font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: 0;">
              98%
            </div>
            <div class="text-[13px] leading-[34px] text-[#0B3947]" style="font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; letter-spacing: 0;">
              Visa Approval Rate
            </div>
          </div>
        </div>
      </div>
      
      <!-- Sleek Divider Line -->
      <div class="container mx-auto max-w-7xl px-6 lg:px-8 mt-8 lg:mt-10">
        <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import Label from '@/components/ui/label/Label.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'

const selectedFrom = ref('United Arab Emirates')
const selectedTo = ref('United Kingdom')

const getCountryFlag = (country: string) => {
  const flags: Record<string, string> = {
    'United Arab Emirates': '🇦🇪',
    'United States': '🇺🇸',
    'Pakistan': '🇵🇰',
    'United Kingdom': '🇬🇧',
    'Canada': '🇨🇦'
  }
  return flags[country] || '🏳️'
}

const handleGetStarted = () => {
  console.log('From:', selectedFrom.value)
  console.log('To:', selectedTo.value)
  navigateTo(`/visa-application?from=${selectedFrom.value}&to=${selectedTo.value}`)
}
</script>