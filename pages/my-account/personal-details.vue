<template>
  <div class="flex justify-center pt-10 pb-20 min-h-screen px-4">
    <div class="flex flex-col w-full max-w-[776px] gap-6">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div class="flex items-center gap-4">
          <Button
            @click="goBack"
            variant="ghost"
            size="icon"
            class="rounded-md w-[42px] h-[36px] border border-[#E4E4E8]"
          >
            <ChevronLeft class="h-5 w-5" />
          </Button>
          <h1
            class="text-2xl font-semibold tracking-tight text-foreground font-geist text-[#27272B]"
          >
            Personal Details
          </h1>
        </div>
        <div class="flex gap-3 w-full sm:w-auto">
          <Button
            @click="discardChanges"
            variant="outline"
            class="rounded-lg flex-1 sm:flex-none !bg-[#EFEFEF] hover:!bg-[#E5E5E5] border-0"
            :disabled="loading"
          >
            Discard
          </Button>
          <Button
            @click="handleSaveChanges"
            class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white flex-1 sm:flex-none"
            :disabled="loading || !isFormValid"
          >
            <span v-if="loading">Saving...</span>
            <span v-else>Save Changes</span>
          </Button>
        </div>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="rounded-lg p-4 bg-green-50 border border-green-200 text-green-800"
      >
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="rounded-lg p-4 bg-red-50 border border-red-200 text-red-800"
      >
        {{ errorMessage }}
      </div>

      <!-- Personal Details Card -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-white">
        <div class="flex flex-col gap-6">
          <h2 class="text-lg font-semibold text-foreground font-geist">
            Personal Details
          </h2>

          <!-- Current Email Display -->
          <div class="flex flex-col gap-2">
            <Label class="text-sm font-medium text-foreground font-inter">
              Current Email
            </Label>
            <Input
              :value="currentEmail"
              type="email"
              disabled
              class="rounded-lg h-11 font-inter bg-gray-50"
            />
          </div>

          <!-- New Email Field -->
          <div class="flex flex-col gap-2">
            <Label
              for="newEmail"
              class="text-sm font-medium text-foreground font-inter"
            >
              New Email
            </Label>
            <Input
              id="newEmail"
              v-model="newEmail"
              type="email"
              placeholder="newemail@example.com"
              class="rounded-lg h-11 font-inter"
              :class="{ 'border-red-500': errors.newEmail }"
            />
            <p v-if="errors.newEmail" class="text-sm text-red-600">
              {{ errors.newEmail }}
            </p>
          </div>

          <!-- Password Field -->
          <div class="flex flex-col gap-2">
            <Label
              for="password"
              class="text-sm font-medium text-foreground font-inter"
            >
              Current Password
            </Label>
            <div class="relative">
              <Input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Enter your current password"
                class="rounded-lg h-11 font-inter pr-10"
                :class="{ 'border-red-500': errors.password }"
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
            <p v-if="errors.password" class="text-sm text-red-600">
              {{ errors.password }}
            </p>
            <p class="text-xs text-gray-500">
              Enter your current password to confirm the email change
            </p>
          </div>

          <!-- Language Field -->
          <div class="flex flex-col gap-2">
            <Label
              for="language"
              class="text-sm font-medium text-foreground font-inter"
            >
              Language
            </Label>
            <Select v-model="language">
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
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ChevronLeft, Eye, EyeOff } from "lucide-vue-next";
import Button from "@/components/ui/button.vue";
import Card from "@/components/ui/card/Card.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import { useAuthApi } from "@/composables/useAuth";

const router = useRouter();
const { changeEmail, currentUser, refreshUser } = useAuthApi();

// Refresh user data on mount to ensure it's synced
onMounted(() => {
  console.log("🔵 Personal details page mounted");
  console.log("👤 Current user before refresh:", currentUser.value);
  refreshUser();
  console.log("👤 Current user after refresh:", currentUser.value);

  // If still null after refresh, wait a bit and try again (cookie might not be ready)
  if (!currentUser.value) {
    setTimeout(() => {
      console.log("🔄 Retrying user refresh...");
      refreshUser();
      console.log("👤 Current user after retry:", currentUser.value);
    }, 100);
  }
});

// Form state
const currentEmail = computed(() => currentUser.value?.email || "");
const newEmail = ref("");
const password = ref("");
const language = ref("english");
const showPassword = ref(false);

// UI state
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

// Form errors
const errors = ref({
  newEmail: "",
  password: "",
});

// Form validation
const isFormValid = computed(() => {
  const hasEmailChange =
    newEmail.value.trim() !== "" &&
    newEmail.value.trim().toLowerCase() !== currentEmail.value.toLowerCase();
  const hasPassword = password.value.trim() !== "";
  const noErrors = Object.values(errors.value).every((error) => error === "");

  return hasEmailChange && hasPassword && noErrors;
});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate form
const validateForm = () => {
  // Reset errors
  errors.value = {
    newEmail: "",
    password: "",
  };

  let isValid = true;

  // Validate new email
  if (!newEmail.value.trim()) {
    errors.value.newEmail = "New email is required";
    isValid = false;
  } else if (!emailRegex.test(newEmail.value.trim())) {
    errors.value.newEmail = "Please enter a valid email address";
    isValid = false;
  } else if (
    newEmail.value.trim().toLowerCase() === currentEmail.value.toLowerCase()
  ) {
    errors.value.newEmail = "New email must be different from current email";
    isValid = false;
  }

  // Validate password
  if (!password.value.trim()) {
    errors.value.password = "Current password is required";
    isValid = false;
  }

  return isValid;
};

// Watch for changes to validate in real-time
watch([newEmail, password], () => {
  if (newEmail.value || password.value) {
    validateForm();
  }
});

// Handle save changes
const handleSaveChanges = async () => {
  // Clear previous messages
  successMessage.value = "";
  errorMessage.value = "";

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Refresh user data before checking
  refreshUser();

  // Wait a moment for state to update if needed
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Check if user is authenticated
  if (!currentUser.value || !currentUser.value.id) {
    console.error("❌ User not authenticated:", {
      currentUser: currentUser.value,
      hasToken: !!useCookie("auth_token").value,
      hasAdminInfo: !!useCookie("admin_info").value,
    });

    // Try one more time to get user from cookie directly
    const adminCookie = useCookie("admin_info");
    if (adminCookie.value) {
      try {
        // Handle both string and object cases (Nuxt might auto-deserialize)
        let userFromCookie;
        if (typeof adminCookie.value === "string") {
          userFromCookie = JSON.parse(adminCookie.value);
        } else if (
          typeof adminCookie.value === "object" &&
          adminCookie.value !== null
        ) {
          userFromCookie = adminCookie.value;
        } else {
          throw new Error("Invalid cookie format");
        }
        console.log("✅ Found user in cookie, updating state:", userFromCookie);
        currentUser.value = userFromCookie;
      } catch (e) {
        console.error("❌ Failed to parse cookie:", e);
        console.error(
          "❌ Cookie value:",
          adminCookie.value,
          "Type:",
          typeof adminCookie.value
        );
      }
    }

    // Final check
    if (!currentUser.value || !currentUser.value.id) {
      errorMessage.value =
        "You must be logged in to change your email. Please refresh the page and try again.";
      return;
    }
  }

  console.log("🔵 Attempting to change email for user:", currentUser.value.id);
  loading.value = true;

  try {
    const response = await changeEmail({
      newEmail: newEmail.value.trim(),
      password: password.value,
    });

    console.log("🔵 Email change response:", response);

    if (response.success) {
      successMessage.value = response.message || "Email changed successfully";
      // Reset form
      newEmail.value = "";
      password.value = "";
      errors.value = {
        newEmail: "",
        password: "",
      };
      // Refresh user to get updated email
      refreshUser();
      // Clear success message after 5 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 5000);
    } else {
      errorMessage.value = response.message || "Failed to change email";
    }
  } catch (error) {
    let errorMsg = "An error occurred while changing your email";
    if (error && typeof error === "object" && "message" in error) {
      errorMsg = String(error.message) || errorMsg;
    }
    errorMessage.value = errorMsg;
  } finally {
    loading.value = false;
  }
};

// Handle discard changes
const discardChanges = () => {
  newEmail.value = "";
  password.value = "";
  errors.value = {
    newEmail: "",
    password: "",
  };
  successMessage.value = "";
  errorMessage.value = "";
};

// Go back
const goBack = () => {
  router.back();
};
</script>
