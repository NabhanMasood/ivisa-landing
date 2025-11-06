<template>
  <div class="flex justify-center pt-10 pb-20 min-h-screen px-4">
    <div class="flex flex-col w-full max-w-[776px] gap-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <Button 
            @click="goBack"
            variant="ghost" 
            size="icon" 
            class="rounded-md w-[42px] h-[36px] border border-[#E4E4E8]"
          >
            <ChevronLeft class="h-5 w-5" />
          </Button>
          <h1 class="text-2xl font-semibold tracking-tight text-foreground font-geist">
            Credit / debit card
          </h1>
        </div>
        <div class="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" class="rounded-lg flex-1 sm:flex-none !bg-[#EFEFEF] hover:!bg-[#E5E5E5] border-0">
            Discard
          </Button>
          <Button class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white flex-1 sm:flex-none">
            Save Changes
          </Button>
        </div>
      </div>

      <!-- Security Notice -->
      <div class="flex items-center gap-2">
        <Lock class="h-4 w-4" />
        <p class="text-sm text-foreground font-inter">
          All card information is fully encrypted and secure.
        </p>
      </div>

      <!-- Card Details Form -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-white">
        <div class="flex flex-col gap-6">
          <!-- Header with Payment Icons -->
          <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-foreground font-geist">Card Details</h2>
              <p class="text-sm text-muted-foreground font-inter">Add the card details below</p>
            </div>
            <!-- Single SVG Strip with border and rounded corners -->
            <div class="rounded-md p-1">
              <img src="/svg/payment-strip.svg" alt="Payment Methods" class="h-[32px]" />
            </div>
          </div>

          <!-- Name Field -->
          <div class="flex flex-col gap-2">
            <Label for="name" class="text-sm font-medium text-foreground font-inter">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="First Last"
              class="rounded-lg h-11 font-inter"
            />
          </div>

          <!-- Card Number Field -->
          <div class="flex flex-col gap-2">
            <Label for="cardNumber" class="text-sm font-medium text-foreground font-inter">
              Card Number
            </Label>
            <Input
              id="cardNumber"
              type="text"
              v-model="formattedCardNumber"
              @input="formatCardNumber"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              class="rounded-lg h-11 font-inter"
            />
          </div>

          <!-- Expires, Year, and CVC Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Expires -->
            <div class="flex flex-col gap-2">
              <Label for="expires" class="text-sm font-medium text-foreground font-inter">
                Expires
              </Label>
              <div class="relative">
                <Select>
                  <SelectTrigger id="expires" class="rounded-lg h-11 px-3 font-inter [&>svg]:hidden">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="08">08</SelectItem>
                    <SelectItem value="09">09</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
                <img 
                  src="/svg/arrow-down.svg" 
                  alt="" 
                  class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" 
                  style="width: 9.33px; height: 5.33px;"
                />
              </div>
            </div>

            <!-- Year -->
            <div class="flex flex-col gap-2">
              <Label for="year" class="text-sm font-medium text-foreground font-inter">
                Year
              </Label>
              <div class="relative">
                <Select>
                  <SelectTrigger id="year" class="rounded-lg h-11 px-3 font-inter [&>svg]:hidden">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                    <SelectItem value="2029">2029</SelectItem>
                    <SelectItem value="2030">2030</SelectItem>
                    <SelectItem value="2031">2031</SelectItem>
                    <SelectItem value="2032">2032</SelectItem>
                    <SelectItem value="2033">2033</SelectItem>
                    <SelectItem value="2034">2034</SelectItem>
                  </SelectContent>
                </Select>
                <img 
                  src="/svg/arrow-down.svg" 
                  alt="" 
                  class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" 
                  style="width: 9.33px; height: 5.33px;"
                />
              </div>
            </div>

            <!-- CVC -->
            <div class="flex flex-col gap-2">
              <Label for="cvc" class="text-sm font-medium text-foreground font-inter">
                CVC
              </Label>
              <Input
                id="cvc"
                type="text"
                placeholder="CVC"
                maxlength="4"
                class="rounded-lg h-11 font-inter"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, Lock } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card/Card.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'

const router = useRouter()
const formattedCardNumber = ref('')

const goBack = () => {
  router.back()
}

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '') // Remove all spaces
  value = value.replace(/\D/g, '') // Remove non-digits
  value = value.substring(0, 16) // Limit to 16 digits
  
  // Add space every 4 digits
  const formatted = value.match(/.{1,4}/g)?.join(' ') || value
  formattedCardNumber.value = formatted
}
</script>