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
            {{ hasApplicationData ? 'Complete Account Creation' : 'Create Your Account' }}
          </h1>
          <p class="text-base leading-6" style="font-family: Geist; color: #64748B;">
            {{ hasApplicationData ? 'Complete this to track your application' : 'Sign up to access visa services' }}
          </p>
          
          <!-- Application Info -->
          <div v-if="applicationNumber" class="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-sm text-green-800">
              📋 Application: <span class="font-semibold">{{ applicationNumber }}</span>
            </p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-md">
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-md">
          <p class="text-sm text-green-600">{{ successMessage }}</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSignUp" class="space-y-6">
          
          <!-- Inputs Container -->
          <div class="space-y-4">

     

            <!-- Password Input -->
            <div>
              <Input
                v-model="formData.password"
                type="password"
                placeholder="Password"
                required
                class="w-full h-12 border-gray-200"
                :class="{ 'border-red-300': passwordTouched && !isPasswordValid }"
                @blur="passwordTouched = true"
              />
              
              <!-- Password Requirements -->
              <div v-if="passwordTouched || formData.password" class="mt-2 space-y-1">
                <p class="text-xs font-medium text-gray-700 mb-1.5">Password must contain:</p>
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span v-if="passwordChecks.minLength" class="text-green-600 text-xs">✓</span>
                    <span v-else class="text-gray-400 text-xs">○</span>
                    <span class="text-xs" :class="passwordChecks.minLength ? 'text-green-600' : 'text-gray-600'">
                      At least 8 characters
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="passwordChecks.hasUpperCase" class="text-green-600 text-xs">✓</span>
                    <span v-else class="text-gray-400 text-xs">○</span>
                    <span class="text-xs" :class="passwordChecks.hasUpperCase ? 'text-green-600' : 'text-gray-600'">
                      One uppercase letter
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="passwordChecks.hasLowerCase" class="text-green-600 text-xs">✓</span>
                    <span v-else class="text-gray-400 text-xs">○</span>
                    <span class="text-xs" :class="passwordChecks.hasLowerCase ? 'text-green-600' : 'text-gray-600'">
                      One lowercase letter
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="passwordChecks.hasNumber" class="text-green-600 text-xs">✓</span>
                    <span v-else class="text-gray-400 text-xs">○</span>
                    <span class="text-xs" :class="passwordChecks.hasNumber ? 'text-green-600' : 'text-gray-600'">
                      One number
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="passwordChecks.hasSpecialChar" class="text-green-600 text-xs">✓</span>
                    <span v-else class="text-gray-400 text-xs">○</span>
                    <span class="text-xs" :class="passwordChecks.hasSpecialChar ? 'text-green-600' : 'text-gray-600'">
                      One special character (!@#$%^&*(),.?":{}|&lt;&gt;)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Confirm Password Input -->
            <div>
              <Input
                v-model="formData.confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                class="w-full h-12 border-gray-200"
                :class="{ 'border-red-300': confirmPasswordTouched && !passwordsMatch }"
                @blur="confirmPasswordTouched = true"
              />
              <p v-if="confirmPasswordTouched && !passwordsMatch && formData.confirmPassword" 
                 class="text-xs text-red-600 mt-1.5">
                Passwords do not match
              </p>
              <p v-if="confirmPasswordTouched && passwordsMatch && formData.confirmPassword" 
                 class="text-xs text-green-600 mt-1.5">
                ✓ Passwords match
              </p>
            </div>

          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :class="buttonClasses"
            style="background-color: #1ECE84; font-family: Geist;"
            :disabled="isSubmitting || !isFormValid"
          >
            {{ isSubmitting ? 'Creating Account...' : (hasApplicationData ? 'Complete Account' : 'Create Account') }}
          </Button>

          <!-- Login Link -->
          <div class="text-center text-sm">
            <span class="text-gray-600">Already have an account? </span>
            <NuxtLink to="/login" class="text-[#1ECE84] hover:underline font-medium">
              Sign In
            </NuxtLink>
          </div>

        </form>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import Input from '@/components/ui/input.vue'
import Button from '@/components/ui/button.vue'

const { register, login } = useAuthApi()
const router = useRouter()
const route = useRoute()

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const passwordTouched = ref(false)
const confirmPasswordTouched = ref(false)
const applicationNumber = ref('')
const customerId = ref('')

const formData = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Check if this is from visa application
const hasApplicationData = computed(() => {
  return !!(route.query.email && route.query.fullName)
})

// Pre-fill from query params
onMounted(() => {
  if (route.query.email) {
    formData.email = route.query.email as string
  }
  if (route.query.fullName) {
    formData.fullName = route.query.fullName as string
  }
  if (route.query.applicationNumber) {
    applicationNumber.value = route.query.applicationNumber as string
  }
  if (route.query.customerId) {
    customerId.value = route.query.customerId as string
  }
  
  console.log('📋 Sign-up pre-filled with:', {
    email: formData.email,
    fullName: formData.fullName,
    applicationNumber: applicationNumber.value
  })
})

// Password validation checks
const passwordChecks = computed(() => ({
  minLength: formData.password.length >= 8,
  hasUpperCase: /[A-Z]/.test(formData.password),
  hasLowerCase: /[a-z]/.test(formData.password),
  hasNumber: /[0-9]/.test(formData.password),
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
}))

// Check if password meets all requirements
const isPasswordValid = computed(() => {
  return Object.values(passwordChecks.value).every(check => check === true)
})

// Check if passwords match
const passwordsMatch = computed(() => {
  return formData.password === formData.confirmPassword && formData.confirmPassword.length > 0
})

// Check if entire form is valid
const isFormValid = computed(() => {
  return (
    formData.fullName.trim() !== '' &&
    formData.email.trim() !== '' &&
    isPasswordValid.value &&
    passwordsMatch.value
  )
})

const buttonClasses = computed(() => {
  const baseClasses = 'w-full h-9 rounded-md px-4 text-white font-medium text-sm'
  const disabledClasses = !isFormValid.value ? ' opacity-50 cursor-not-allowed' : ''
  return baseClasses + disabledClasses
})

const handleSignUp = async () => {
  // Validate form before submission
  if (!isPasswordValid.value) {
    errorMessage.value = 'Password does not meet all requirements'
    return
  }

  if (!passwordsMatch.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Prepare registration data
    const registerData: RegisterDto = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    }

    console.log('📤 Registering user:', registerData)

    const response = await register(registerData)
    
    if (response.success) {
      successMessage.value = 'Account created successfully!'
      
      console.log('✅ Registration successful, auto-logging in...')
      
      // Auto-login after successful registration
      const loginResponse = await login({
        email: formData.email,
        password: formData.password
      })
      
      if (loginResponse.success) {
        console.log('✅ Auto-login successful')
        
        // Show success briefly then redirect
        setTimeout(() => {
          if (applicationNumber.value) {
            // Redirect to my-account with application info
            router.push({
              path: '/my-account',
              query: {
                new: 'true',
                app: applicationNumber.value
              }
            })
          } else {
            // Regular redirect to my-account
            router.push('/my-account')
          }
        }, 1500)
      } else {
        // If auto-login fails, redirect to login page
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } else {
      errorMessage.value = response.message || 'Registration failed'
    }
    
  } catch (error: any) {
    console.error('❌ Sign up failed:', error)
    errorMessage.value = error.message || 'Sign up failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>