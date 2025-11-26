<template>
  <div class="flex justify-center pt-10 pb-20 min-h-screen px-4">
    <div class="flex flex-col w-full max-w-[776px] gap-6">
      <!-- Header -->
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

      <!-- Change Email Card -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-white">
        <div class="flex flex-col gap-6">
          <h3 class="text-lg font-semibold text-foreground font-geist">
            Change Email
          </h3>

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

          <!-- Password Field for Email Change -->
          <div class="flex flex-col gap-2">
            <Label
              for="emailPassword"
              class="text-sm font-medium text-foreground font-inter"
            >
              Current Password
            </Label>
            <div class="relative">
              <Input
                id="emailPassword"
                :type="showEmailPassword ? 'text' : 'password'"
                v-model="emailPassword"
                placeholder="Enter your current password"
                class="rounded-lg h-11 font-inter pr-10"
                :class="{ 'border-red-500': errors.emailPassword }"
              />
              <button
                type="button"
                @click="showEmailPassword = !showEmailPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="showEmailPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.emailPassword" class="text-sm text-red-600">
              {{ errors.emailPassword }}
            </p>
            <p class="text-xs text-gray-500">
              Enter your current password to confirm the email change
            </p>
          </div>

          <Button
            @click="handleChangeEmail"
            class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white w-full sm:w-auto"
            :disabled="loadingEmail || !isEmailFormValid"
          >
            <span v-if="loadingEmail">Saving...</span>
            <span v-else>Change Email</span>
          </Button>
        </div>
      </Card>

      <!-- Change Password Card -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-white">
        <div class="flex flex-col gap-6">
          <h3 class="text-lg font-semibold text-foreground font-geist">
            Change Password
          </h3>

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

          <Button
            @click="handleChangePassword"
            class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white w-full sm:w-auto"
            :disabled="loadingPassword || !isPasswordFormValid"
          >
            <span v-if="loadingPassword">Saving...</span>
            <span v-else>Change Password</span>
          </Button>
        </div>
      </Card>

      <!-- Delete Account Card -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-white border-red-200">
        <div class="flex flex-col gap-6">
          <div>
            <h3 class="text-lg font-semibold text-red-600 font-geist">
              Delete Account
            </h3>
            <p class="text-sm text-gray-600 mt-2">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>

          <!-- Password Field for Account Deletion -->
          <div class="flex flex-col gap-2">
            <Label
              for="deletePassword"
              class="text-sm font-medium text-foreground font-inter"
            >
              Current Password
            </Label>
            <div class="relative">
              <Input
                id="deletePassword"
                :type="showDeletePassword ? 'text' : 'password'"
                v-model="deletePassword"
                placeholder="Enter your current password to confirm"
                class="rounded-lg h-11 font-inter pr-10"
                :class="{ 'border-red-500': errors.deletePassword }"
              />
              <button
                type="button"
                @click="showDeletePassword = !showDeletePassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="showDeletePassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.deletePassword" class="text-sm text-red-600">
              {{ errors.deletePassword }}
            </p>
          </div>

          <Button
            @click="handleDeleteAccount"
            class="rounded-lg !bg-red-600 hover:!bg-red-700 !text-white w-full sm:w-auto"
            :disabled="loadingDelete || !deletePassword.trim()"
          >
            <span v-if="loadingDelete">Deleting...</span>
            <span v-else>Delete Account</span>
          </Button>
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
import { useAuthApi } from "@/composables/useAuth";

const router = useRouter();
const { changePassword, changeEmail, deleteAccount, currentUser, refreshUser } = useAuthApi();

// Refresh user on mount
onMounted(() => {
  refreshUser();
});

// Email change form state
const currentEmail = computed(() => currentUser.value?.email || "");
const newEmail = ref("");
const emailPassword = ref("");
const showEmailPassword = ref(false);
const loadingEmail = ref(false);

// Password change form state
const currentPassword = ref("");
const newPassword = ref("");
const repeatPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showRepeatPassword = ref(false);
const loadingPassword = ref(false);

// Account deletion form state
const deletePassword = ref("");
const showDeletePassword = ref(false);
const loadingDelete = ref(false);

// UI messages
const successMessage = ref("");
const errorMessage = ref("");

// Form errors
const errors = ref({
  newEmail: "",
  emailPassword: "",
  currentPassword: "",
  newPassword: "",
  repeatPassword: "",
  deletePassword: "",
});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form validation
const isEmailFormValid = computed(() => {
  const hasEmailChange =
    newEmail.value.trim() !== "" &&
    newEmail.value.trim().toLowerCase() !== currentEmail.value.toLowerCase();
  const hasPassword = emailPassword.value.trim() !== "";
  const noErrors = !errors.value.newEmail && !errors.value.emailPassword;
  return hasEmailChange && hasPassword && noErrors;
});

const isPasswordFormValid = computed(() => {
  return (
    currentPassword.value.trim() !== "" &&
    newPassword.value.trim() !== "" &&
    repeatPassword.value.trim() !== "" &&
    Object.values(errors.value).every((error) => error === "")
  );
});

// Validate email form
const validateEmailForm = () => {
  errors.value.newEmail = "";
  errors.value.emailPassword = "";

  if (!newEmail.value.trim()) {
    errors.value.newEmail = "New email is required";
  } else if (!emailRegex.test(newEmail.value.trim())) {
    errors.value.newEmail = "Please enter a valid email address";
  } else if (
    newEmail.value.trim().toLowerCase() === currentEmail.value.toLowerCase()
  ) {
    errors.value.newEmail = "New email must be different from current email";
  }

  if (!emailPassword.value.trim()) {
    errors.value.emailPassword = "Current password is required";
  }
};

// Validate password form
const validatePasswordForm = () => {
  errors.value.currentPassword = "";
  errors.value.newPassword = "";
  errors.value.repeatPassword = "";

  if (!currentPassword.value.trim()) {
    errors.value.currentPassword = "Current password is required";
  }

  if (!newPassword.value.trim()) {
    errors.value.newPassword = "New password is required";
  } else if (newPassword.value.length < 6) {
    errors.value.newPassword = "Password must be at least 6 characters long";
  }

  if (!repeatPassword.value.trim()) {
    errors.value.repeatPassword = "Please confirm your new password";
  } else if (newPassword.value !== repeatPassword.value) {
    errors.value.repeatPassword = "Passwords do not match";
  }

  if (
    currentPassword.value &&
    newPassword.value &&
    currentPassword.value === newPassword.value
  ) {
    errors.value.newPassword =
      "New password must be different from current password";
  }
};

// Watch for changes to validate in real-time
watch([newEmail, emailPassword], () => {
  if (newEmail.value || emailPassword.value) {
    validateEmailForm();
  }
});

watch([currentPassword, newPassword, repeatPassword], () => {
  if (currentPassword.value || newPassword.value || repeatPassword.value) {
    validatePasswordForm();
  }
});

// Handle change email
const handleChangeEmail = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  validateEmailForm();
  if (!isEmailFormValid.value) {
    return;
  }

  refreshUser();
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (!currentUser.value || !currentUser.value.id) {
    errorMessage.value =
      "You must be logged in to change your email. Please refresh the page and try again.";
    return;
  }

  loadingEmail.value = true;

  try {
    const response = await changeEmail({
      newEmail: newEmail.value.trim(),
      password: emailPassword.value,
    });

    if (response.success) {
      successMessage.value = response.message || "Email changed successfully";
      newEmail.value = "";
      emailPassword.value = "";
      errors.value.newEmail = "";
      errors.value.emailPassword = "";
      refreshUser();
      setTimeout(() => {
        successMessage.value = "";
      }, 5000);
    } else {
      errorMessage.value = response.message || "Failed to change email";
    }
  } catch (error) {
    errorMessage.value =
      error?.message || "An error occurred while changing your email";
  } finally {
    loadingEmail.value = false;
  }
};

// Handle change password
const handleChangePassword = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  validatePasswordForm();
  if (!isPasswordFormValid.value) {
    return;
  }

  refreshUser();
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (!currentUser.value || !currentUser.value.id) {
    errorMessage.value =
      "You must be logged in to change your password. Please refresh the page and try again.";
    return;
  }

  loadingPassword.value = true;

  try {
    const response = await changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    });

    if (response.success) {
      successMessage.value =
        response.message || "Password changed successfully";
      currentPassword.value = "";
      newPassword.value = "";
      repeatPassword.value = "";
      errors.value.currentPassword = "";
      errors.value.newPassword = "";
      errors.value.repeatPassword = "";
      setTimeout(() => {
        successMessage.value = "";
      }, 5000);
    } else {
      errorMessage.value = response.message || "Failed to change password";
    }
  } catch (error) {
    errorMessage.value =
      error?.message || "An error occurred while changing your password";
  } finally {
    loadingPassword.value = false;
  }
};

// Handle delete account
const handleDeleteAccount = async () => {
  if (!deletePassword.value.trim()) {
    errors.value.deletePassword = "Password is required to delete your account";
    return;
  }

  if (
    !confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
  ) {
    return;
  }

  successMessage.value = "";
  errorMessage.value = "";
  errors.value.deletePassword = "";

  refreshUser();
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (!currentUser.value || !currentUser.value.id) {
    errorMessage.value =
      "You must be logged in to delete your account. Please refresh the page and try again.";
    return;
  }

  loadingDelete.value = true;

  try {
    const response = await deleteAccount({
      password: deletePassword.value,
    });

    if (response.success) {
      // User will be logged out automatically by deleteAccount
      router.push("/");
    } else {
      errorMessage.value = response.message || "Failed to delete account";
      if (response.message?.toLowerCase().includes("password")) {
        errors.value.deletePassword = response.message;
      }
    }
  } catch (error) {
    errorMessage.value =
      error?.message || "An error occurred while deleting your account";
  } finally {
    loadingDelete.value = false;
  }
};

// Go back
const goBack = () => {
  router.back();
};
</script>
