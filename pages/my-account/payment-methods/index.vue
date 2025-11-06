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
            Manage Payment Method
          </h1>
        </div>
        <Button 
          @click="navigateToAddCard"
          class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white"
        >
          Add Card
        </Button>
      </div>

      <!-- Alert Card -->
      <Card class="rounded-xl border border-[#DC7609] p-4">
        <div class="flex gap-3">
          <AlertCircle class="h-5 w-5 text-[#DC7609] flex-shrink-0 mt-0.5" />
          <div class="flex flex-col gap-1 font-inter">
            <h3 class="text-sm font-semibold text-[#DC7609]">
              A card is needed
            </h3>
            <p class="text-sm text-[#DC7609]">
              You need to add a debit or credit card.
            </p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ChevronLeft, AlertCircle } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card/Card.vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const navigateToAddCard = () => {
  router.push('/my-account/payment-methods/add-card')
}
</script>