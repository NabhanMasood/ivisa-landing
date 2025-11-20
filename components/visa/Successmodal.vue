<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="w-[calc(100vw-2rem)] sm:w-[360px] max-w-[360px]">
      <div class="flex flex-col items-center text-center py-3 sm:py-4 px-2">
        
        <!-- Success Icon with circular background -->
        <div class="relative mb-4 sm:mb-6">
          <!-- Outer light circle -->
          <div class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center" style="background-color: #F0F0F0;">
            <!-- Inner white circle -->
            <div class="w-[72px] h-[72px] sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-white">
              <!-- Custom SVG Icon -->
              <img src="/svg/success.svg" alt="Success" class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            </div>
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-base sm:text-lg md:text-xl leading-[24px] sm:leading-[26px] md:leading-[28px] mb-2 sm:mb-3 px-2" style="font-family: Manrope; font-weight: 600; color: #0B3947;">
          Application Submitted Successfully!
        </h2>

        <!-- Application Number -->
        <p class="text-xs sm:text-sm leading-[18px] sm:leading-[20px] mb-2 sm:mb-3" style="font-family: Manrope; font-weight: 500; color: #1ECE84;">
          {{ applicationNumber || 'Processing...' }}
        </p>

        <!-- Email Confirmation Message -->
        <p class="text-xs leading-[16px] sm:leading-[18px] mb-4 sm:mb-6 px-2" style="font-family: Manrope; font-weight: 400; color: #6B7280;">
          📧 A tracking link has been sent to <strong class="break-all">{{ userEmail }}</strong>
        </p>

        <!-- OK Button -->
        <Button
          @click="handleClose"
          class="w-full h-11 sm:h-12 text-sm sm:text-base"
          style="border-radius: 6px; background-color: #1ECE84; color: white; font-family: Inter; font-weight: 500;"
        >
          Create Account to Track
        </Button>

      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { watch, onUnmounted, onMounted } from 'vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/Dialogcontent.vue' 
import Button from '@/components/ui/button.vue'

const props = defineProps<{
  isOpen: boolean
  applicationNumber?: string
  customerId?: number
  userEmail?: string
  userFullName?: string
}>()

const emit = defineEmits<{
  close: []
}>()

let redirectTimer: NodeJS.Timeout | null = null

// Debug when component mounts
onMounted(() => {
  console.log('✅ SuccessModal mounted')
  console.log('📦 Props:', {
    isOpen: props.isOpen,
    applicationNumber: props.applicationNumber,
    customerId: props.customerId,
    userEmail: props.userEmail,
    userFullName: props.userFullName
  })
})

// Watch for when the modal opens
watch(() => props.isOpen, (newValue) => {
  console.log('🔔 SuccessModal isOpen changed to:', newValue)
  
  if (newValue) {
    console.log('✅ Success modal is now open!')
    console.log('📋 Application Number:', props.applicationNumber)
    console.log('👤 Customer ID:', props.customerId)
    
    // Clear any existing timer
    if (redirectTimer) {
      clearTimeout(redirectTimer)
    }
    
    // Set a timer to redirect after 5 seconds (increased from 3)
    redirectTimer = setTimeout(() => {
      console.log('⏰ Auto-redirecting to signup...')
      navigateToSignup()
    }, 1000)
  } else {
    // Clear timer if modal closes
    if (redirectTimer) {
      clearTimeout(redirectTimer)
      redirectTimer = null
    }
  }
}, { immediate: true })

// Clean up timer on component unmount
onUnmounted(() => {
  console.log('🔴 SuccessModal unmounted')
  if (redirectTimer) {
    clearTimeout(redirectTimer)
  }
})

const handleOpenChange = (value: boolean) => {
  console.log('🔄 handleOpenChange called with:', value)
  if (!value) {
    emit('close')
  }
}

const navigateToSignup = () => {
  console.log('🚀 Navigating to signup with:', {
    applicationNumber: props.applicationNumber,
    customerId: props.customerId,
    email: props.userEmail,
    fullName: props.userFullName
  })
  
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
  console.log('👆 User clicked "Create Account to Track" button')
  // Navigate immediately when user clicks button
  navigateToSignup()
  emit('close')
}
</script>