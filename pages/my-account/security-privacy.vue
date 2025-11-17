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
            Security & Privacy
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

      <!-- Change Password Card -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-white">
        <div class="flex flex-col gap-6">
          <h2 class="text-lg font-semibold text-foreground font-geist">
            Change Password
          </h2>

          <!-- Current Password Field -->
          <div class="flex flex-col gap-2">
            <Label
              for="currentPassword"
              class="text-sm font-medium text-foreground font-inter"
            >
              Current Password
            </Label>
            <div class="relative">
              <Input
                id="currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                v-model="currentPassword"
                placeholder="Enter your current password"
                class="rounded-lg h-11 font-inter pr-10"
                :class="{ 'border-red-500': errors.currentPassword }"
              />
              <button
                type="button"
                @click="showCurrentPassword = !showCurrentPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="showCurrentPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.currentPassword" class="text-sm text-red-600">
              {{ errors.currentPassword }}
            </p>
          </div>

          <!-- New Password Field -->
          <div class="flex flex-col gap-2">
            <Label
              for="newPassword"
              class="text-sm font-medium text-foreground font-inter"
            >
              New Password
            </Label>
            <div class="relative">
              <Input
                id="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                v-model="newPassword"
                placeholder="Enter your new password"
                class="rounded-lg h-11 font-inter pr-10"
                :class="{ 'border-red-500': errors.newPassword }"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="showNewPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.newPassword" class="text-sm text-red-600">
              {{ errors.newPassword }}
            </p>
            <p class="text-xs text-gray-500">
              Password must be at least 6 characters long
            </p>
          </div>

          <!-- Repeat Password Field -->
          <div class="flex flex-col gap-2">
            <Label
              for="repeatPassword"
              class="text-sm font-medium text-foreground font-inter"
            >
              Repeat New Password
            </Label>
            <div class="relative">
              <Input
                id="repeatPassword"
                :type="showRepeatPassword ? 'text' : 'password'"
                v-model="repeatPassword"
                placeholder="Confirm your new password"
                class="rounded-lg h-11 font-inter pr-10"
                :class="{ 'border-red-500': errors.repeatPassword }"
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
            <p v-if="errors.repeatPassword" class="text-sm text-red-600">
              {{ errors.repeatPassword }}
            </p>
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
import Label from "@/components/ui/label.vue";
import { useAuthApi } from "@/composables/useAuth";

const router = useRouter();
const { changePassword, currentUser, refreshUser } = useAuthApi();

// Refresh user data on mount to ensure it's synced
onMounted(() => {
  console.log("🔵 Security-privacy page mounted");
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
const currentPassword = ref("");
const newPassword = ref("");
const repeatPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showRepeatPassword = ref(false);

// UI state
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

// Form errors
const errors = ref({
  currentPassword: "",
  newPassword: "",
  repeatPassword: "",
});

// Form validation
const isFormValid = computed(() => {
  return (
    currentPassword.value.trim() !== "" &&
    newPassword.value.trim() !== "" &&
    repeatPassword.value.trim() !== "" &&
    Object.values(errors.value).every((error) => error === "")
  );
});

// Validate form
const validateForm = () => {
  // Reset errors
  errors.value = {
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  };

  let isValid = true;

  // Validate current password
  if (!currentPassword.value.trim()) {
    errors.value.currentPassword = "Current password is required";
    isValid = false;
  }

  // Validate new password
  if (!newPassword.value.trim()) {
    errors.value.newPassword = "New password is required";
    isValid = false;
  } else if (newPassword.value.length < 6) {
    errors.value.newPassword = "Password must be at least 6 characters long";
    isValid = false;
  }

  // Validate repeat password
  if (!repeatPassword.value.trim()) {
    errors.value.repeatPassword = "Please confirm your new password";
    isValid = false;
  } else if (newPassword.value !== repeatPassword.value) {
    errors.value.repeatPassword = "Passwords do not match";
    isValid = false;
  }

  // Check if new password is same as current
  if (
    currentPassword.value &&
    newPassword.value &&
    currentPassword.value === newPassword.value
  ) {
    errors.value.newPassword =
      "New password must be different from current password";
    isValid = false;
  }

  return isValid;
};

// Watch for changes to validate in real-time
watch([currentPassword, newPassword, repeatPassword], () => {
  if (currentPassword.value || newPassword.value || repeatPassword.value) {
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
        "You must be logged in to change your password. Please refresh the page and try again.";
      return;
    }
  }

  console.log(
    "🔵 Attempting to change password for user:",
    currentUser.value.id
  );
  loading.value = true;

  try {
    const response = await changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    });

    console.log("🔵 Password change response:", response);

    if (response.success) {
      successMessage.value =
        response.message || "Password changed successfully";
      // Reset form
      currentPassword.value = "";
      newPassword.value = "";
      repeatPassword.value = "";
      errors.value = {
        currentPassword: "",
        newPassword: "",
        repeatPassword: "",
      };
      // Clear success message after 5 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 5000);
    } else {
      errorMessage.value = response.message || "Failed to change password";
    }
  } catch (error) {
    let errorMsg = "An error occurred while changing your password";
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
  currentPassword.value = "";
  newPassword.value = "";
  repeatPassword.value = "";
  errors.value = {
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  };
  successMessage.value = "";
  errorMessage.value = "";
};

// Go back
const goBack = () => {
  router.back();
};
</script>
