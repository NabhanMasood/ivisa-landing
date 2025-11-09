<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="w-[360px]">
      <div class="flex flex-col items-center text-center py-4">
        
        <!-- Success Icon with circular background -->
        <div class="relative mb-6">
          <!-- Outer light circle -->
          <div class="w-32 h-32 rounded-full flex items-center justify-center" style="background-color: #F0F0F0;">
            <!-- Inner white circle -->
            <div class="w-24 h-24 rounded-full flex items-center justify-center bg-white">
              <!-- Custom SVG Icon -->
              <img src="/svg/success.svg" alt="Success" class="w-102 h-102" />
            </div>
          </div>
        </div>

        <!-- Title -->
        <h2 style="font-family: Manrope; font-weight: 600; font-size: 20px; line-height: 28px; color: #0B3947; margin-bottom: 8px;">
          Application Submitted Successfully!
        </h2>

        <!-- Application Number -->
        <p style="font-family: Manrope; font-weight: 500; font-size: 14px; line-height: 20px; color: #1ECE84; margin-bottom: 24px;">
          {{ applicationNumber }}
        </p>

        <!-- OK Button -->
        <Button
          @click="handleClose"
          class="w-full"
          style="height: 48px; border-radius: 6px; background-color: #1ECE84; color: white; font-family: Inter; font-weight: 500; font-size: 16px;"
        >
          Create Account to Track
        </Button>

      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/Dialogcontent.vue'
import Button from '@/components/ui/button.vue'

const props = defineProps<{
  isOpen: boolean
  applicationNumber?: string
  customerId?: number
  userEmail?: string       // ← ADD: Email from first traveler
  userFullName?: string    // ← ADD: Full name from first traveler
}>()

const emit = defineEmits<{
  close: []
}>()

let redirectTimer: NodeJS.Timeout | null = null

// Watch for when the modal opens
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    // Clear any existing timer
    if (redirectTimer) {
      clearTimeout(redirectTimer)
    }
    
    // Set a timer to redirect after 3 seconds
    redirectTimer = setTimeout(() => {
      navigateToSignup()
    }, 3000)
  } else {
    // Clear timer if modal closes
    if (redirectTimer) {
      clearTimeout(redirectTimer)
      redirectTimer = null
    }
  }
})

// Clean up timer on component unmount
onUnmounted(() => {
  if (redirectTimer) {
    clearTimeout(redirectTimer)
  }
})

const handleOpenChange = (value: boolean) => {
  if (!value) {
    emit('close')
  }
}

const navigateToSignup = () => {
  // Pass application details and user info to signup page
  navigateTo({
    path: '/sign-up',
    query: {
      applicationNumber: props.applicationNumber,
      customerId: props.customerId?.toString(),
      email: props.userEmail,         
      fullName: props.userFullName   
    }
  })
}

const handleClose = () => {
  // Navigate immediately when user clicks button
  navigateToSignup()
  emit('close')
}
</script>