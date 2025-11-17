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
    <div
      class="w-full lg:w-1/2 min-h-screen flex items-center justify-center bg-gray-50/50 shadow-sm p-6"
    >
      <!-- Content Container -->
      <div class="w-full max-w-md space-y-8">
        <!-- Logo -->
        <div>
          <img src="/logos/logo.png" alt="VISA123 Logo" class="h-12 w-auto" />
        </div>

        <!-- Text Section -->
        <div class="space-y-1.5 pt-5">
          <h1
            class="text-3xl font-semibold leading-none tracking-tight"
            style="
              font-family: Geist;
              color: #020617;
              letter-spacing: -0.0075em;
            "
          >
            Welcome Back
          </h1>
          <p
            class="text-base leading-6"
            style="font-family: Geist; color: #64748b"
          >
            Sign in to access your account
          </p>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="p-4 bg-red-50 border border-red-200 rounded-md"
        >
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="p-4 bg-green-50 border border-green-200 rounded-md"
        >
          <p class="text-sm text-green-600">{{ successMessage }}</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Inputs Container -->
          <div class="space-y-4">
            <!-- Email Input -->
            <div>
              <Input
                v-model="formData.email"
                type="email"
                placeholder="Email Address"
                required
                class="w-full h-12 border-gray-200"
                :disabled="isSubmitting"
              />
            </div>

            <!-- Password Input -->
            <div>
              <Input
                v-model="formData.password"
                type="password"
                placeholder="Password"
                required
                class="w-full h-12 border-gray-200"
                :disabled="isSubmitting"
              />
            </div>

            <!-- Forgot Password Link -->
            <div class="flex justify-end">
              <NuxtLink
                to="/forgot-password"
                class="text-sm text-[#1ECE84] hover:underline font-medium"
              >
                Forgot Password?
              </NuxtLink>
            </div>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :class="buttonClasses"
            style="background-color: #1ece84; font-family: Geist"
            :disabled="isSubmitting || !isFormValid"
          >
            {{ isSubmitting ? "Signing In..." : "Sign In" }}
          </Button>

          <!-- Sign Up Link -->
          <div class="text-center text-sm">
            <span class="text-gray-600">Don't have an account? </span>
            <NuxtLink
              to="/sign-up"
              class="text-[#1ECE84] hover:underline font-medium"
            >
              Sign Up
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/button.vue";

const { login } = useAuthApi();
const router = useRouter();
const route = useRoute();

const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const formData = reactive<LoginDto>({
  email: "",
  password: "",
});

const isFormValid = computed(() => {
  return formData.email.trim() !== "" && formData.password.trim() !== "";
});

const buttonClasses = computed(() => {
  const baseClasses =
    "w-full h-9 rounded-md px-4 text-white font-medium text-sm";
  const disabledClasses = !isFormValid.value
    ? " opacity-50 cursor-not-allowed"
    : "";
  return baseClasses + disabledClasses;
});

const handleLogin = async () => {
  isSubmitting.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    console.log("🔵 Starting login...");
    const response = await login(formData);
    console.log("🔵 Login response:", response);

    if (response.success) {
      console.log("✅ Login successful!");
      successMessage.value = response.message || "Login successful!";

      // Get redirect URL
      const redirectTo = (route.query.redirect as string) || "/my-account";
      console.log("🔵 Redirecting to:", redirectTo);

      // Try navigateTo instead of router.push
      await navigateTo(redirectTo);

      console.log("✅ Redirect complete");
    } else {
      console.log("❌ Login failed:", response.message);
      errorMessage.value = response.message || "Login failed";
    }
  } catch (error: any) {
    console.error("❌ Login error:", error);
    errorMessage.value = error.message || "Login failed. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>
