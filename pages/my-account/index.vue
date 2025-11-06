<template>
    <div class="flex justify-center pt-10 pb-20 min-h-screen">
    <div class="flex flex-col w-[1000px] gap-4">
      <!-- Page Title -->
      <h1 class="text-2xl font-semibold tracking-tight text-foreground">
        My Account
      </h1>

      <!-- Cards Grid -->
      <div class="grid grid-cols-3 gap-6">
        <!-- My Orders Card -->
        <Card 
          @click="navigateTo('/my-orders')"
          class="rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
        >
          <div class="flex flex-col gap-6">
            <img src="/svg/my-account/order.svg" alt="My Orders Icon" class="w-[39px] h-[39px]" />
            <div>
              <h3 class="text-xl font-semibold text-foreground">My Orders</h3>
              <p class="text-muted-foreground">
                View your order and travel documents
              </p>
            </div>
          </div>
        </Card>

        <!-- Payment Methods Card -->
        <Card 
          @click="navigateTo('/payment-methods')"
          class="rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
        >
          <div class="flex flex-col gap-6">
            <img src="/svg/my-account/card.svg" alt="Payment Methods Icon" class="w-[39px] h-[39px]"  />
            <div>
              <h3 class="text-xl font-semibold text-foreground">Payment Methods</h3>
              <p class="text-muted-foreground">
                Manage your account payment methods
              </p>
            </div>
          </div>
        </Card>

        <!-- Personal Details Card -->
        <Card 
          @click="navigateTo('/personal-details')"
          class="rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
        >
          <div class="flex flex-col gap-6">
            <img src="/svg/my-account/users.svg" alt="Personal Details Icon" class="w-[39px] h-[39px]" />
            <div>
              <h3 class="text-xl font-semibold text-foreground">Personal Details</h3>
              <p class="text-muted-foreground">
                Update your email and language settings
              </p>
            </div>
          </div>
        </Card>

        <!-- Security & Privacy Card -->
        <Card 
          @click="navigateTo('/security-privacy')"
          class="rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
        >
          <div class="flex flex-col gap-6">
            <img src="/svg/my-account/security.svg" alt="Security & Privacy Icon" class="w-[39px] h-[39px]" />
            <div>
              <h3 class="text-xl font-semibold text-foreground">Security & Privacy</h3>
              <p class="text-muted-foreground">
                Update your account email and password
              </p>
            </div>
          </div>
        </Card>

        <!-- Referrals Card -->
        <Card 
          @click="navigateTo('/referrals')"
          class="rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
        >
          <div class="flex flex-col gap-6">
            <img src="/svg/my-account/speaker.svg" alt="Referrals Icon" class="w-[39px] h-[39px]" />
            <div>
              <h3 class="text-xl font-semibold text-foreground">Referrals</h3>
              <p class="text-muted-foreground">
                Give discounts on referrals in your account
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Card from '@/components/ui/card/Card.vue'

const router = useRouter()

const navigateTo = (path) => {
  router.push(`/my-account${path}`)
}
</script>