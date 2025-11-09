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
          <h1 class="text-2xl font-semibold tracking-tight text-foreground font-geist text-[#27272B]">
            Security & Privacy
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

      <!-- Change Password Card -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-white">
        <div class="flex flex-col gap-6">
          <h2 class="text-lg font-semibold text-foreground font-geist">Change Password</h2>

          <!-- Password Field -->
          <div class="flex flex-col gap-2">
            <Label for="password" class="text-sm font-medium text-foreground font-inter">
              Password
            </Label>
            <div class="relative">
              <Input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="********"
                class="rounded-lg h-11 font-inter pr-10"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="showPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Repeat Password Field -->
          <div class="flex flex-col gap-2">
            <Label for="repeatPassword" class="text-sm font-medium text-foreground font-inter">
              Repeat Password
            </Label>
            <div class="relative">
              <Input
                id="repeatPassword"
                :type="showRepeatPassword ? 'text' : 'password'"
                v-model="repeatPassword"
                placeholder="********"
                class="rounded-lg h-11 font-inter pr-10"
              />
              <button
                type="button"
                @click="showRepeatPassword = !showRepeatPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="showRepeatPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
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
import { ChevronLeft, Eye, EyeOff } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card/Card.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'

const router = useRouter()
const password = ref('')
const repeatPassword = ref('')
const showPassword = ref(false)
const showRepeatPassword = ref(false)

const goBack = () => {
  router.back()
}
</script>