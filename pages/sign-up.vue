<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    
    <!-- Left Side - Image -->
    <div class="w-full lg:w-1/2 h-64 lg:h-screen">
      <img 
        src="/png/brand.png" 
        alt="Visa Background" 
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Right Side - Form Section -->
    <div class="w-full lg:w-1/2 min-h-screen flex items-center justify-center bg-gray-50/50 shadow-sm p-6">
      
      <!-- Content Container -->
      <div class="w-full max-w-md space-y-8">
        
        <!-- Logo -->
        <div>
          <img 
            src="/logos/logo.png" 
            alt="VISA123 Logo" 
            class="h-12 w-auto"
          />
        </div>

        <!-- Text Section -->
        <div class="space-y-1.5 pt-5">
          <h1 class="text-3xl font-semibold leading-none tracking-tight" style="font-family: Geist; color: #020617; letter-spacing: -0.0075em;">
            Complete Account Creation
          </h1>
          <p class="text-base leading-6" style="font-family: Geist; color: #64748B;">
            Complete this to access your account
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSignUp" class="space-y-6">
          
          <!-- Inputs Container -->
          <div class="space-y-4">
            
            <!-- Email Input -->
            <Input
              v-model="formData.email"
              type="email"
              placeholder="Email Address"
              required
              class="w-full h-12 border-gray-200"
            />

            <!-- Password Input -->
            <Input
              v-model="formData.password"
              type="password"
              placeholder="Password"
              required
              class="w-full h-12 border-gray-200"
            />

          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            class="w-full h-9 rounded-md px-4 text-white font-medium text-sm"
            style="background-color: #1ECE84; font-family: Geist;"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Creating Account...' : 'Finish Sign Up' }}
          </Button>

        </form>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const isSubmitting = ref(false)

const formData = reactive({
  email: '',
  password: ''
})

const emit = defineEmits<{
  signUpComplete: [data: { email: string }]
}>()

const handleSignUp = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Emit success event
    emit('signUpComplete', { email: formData.email })
    
    // Reset form
    formData.email = ''
    formData.password = ''
    
  } catch (error) {
    console.error('Sign up failed:', error)
    alert('Sign up failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>