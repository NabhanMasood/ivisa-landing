<template>
  <div class="flex justify-center pt-10 pb-20 min-h-screen">
    <div class="flex flex-col w-[776px] gap-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Button 
            @click="goBack"
            variant="ghost" 
            size="icon" 
            class="rounded-md w-[42px] h-[36px] border border-[#E4E4E8]"
          >
            <ChevronLeft class="h-5 w-5" />
          </Button>
          <h1 class="text-2xl font-semibold tracking-tight text-foreground">
            Personal Details
          </h1>
        </div>
        <div class="flex gap-3">
          <Button variant="outline" class="rounded-lg">
            Discard
          </Button>
          <Button class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white">
            Save Changes
          </Button>
        </div>
      </div>

      <!-- Personal Details Card -->
      <Card class="rounded-xl border p-[30px_24px] bg-white">
        <div class="flex flex-col gap-6">
          <h2 class="text-lg font-semibold text-foreground">Personal Details</h2>
          
          <!-- Email Field -->
          <div class="flex flex-col gap-2">
            <Label for="email" class="text-sm font-medium text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@gmail.com"
              class="rounded-lg h-11"
            />
          </div>

          <!-- Language Field -->
          <div class="flex flex-col gap-2">
            <Label for="language" class="text-sm font-medium text-foreground">
              Language
            </Label>
            <Select>
              <SelectTrigger id="language" class="rounded-lg h-11 px-3">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent class="[&_[role=option]]:px-3">
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'
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

const goBack = () => {
  router.back()
}
</script>