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
            Referrals
          </h1>
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

      <!-- Info Card about Referral Program -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-gradient-to-br from-[#1ECE84]/10 to-[#1AB876]/5">
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-3">
            <div class="rounded-full bg-[#1ECE84] p-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-semibold text-foreground font-geist mb-1">
                Refer a Friend & Earn Rewards
              </h2>
              <p class="text-sm text-muted-foreground font-inter">
                Send a referral invitation to your friends. When they sign up, you'll automatically receive a <strong class="text-[#1ECE84]">10% discount coupon</strong> that you can use on your next purchase!
              </p>
            </div>
          </div>
        </div>
      </Card>

      <!-- Send Referral Card -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-white">
        <div class="flex flex-col gap-6">
          <h2 class="text-lg font-semibold text-foreground font-geist">
            Send Referral Invitation
          </h2>

          <!-- Email Input Field -->
          <div class="flex flex-col gap-2">
            <Label
              for="referralEmail"
              class="text-sm font-medium text-foreground font-inter"
            >
              Friend's Email Address
            </Label>
            <div class="flex gap-2">
              <Input
                id="referralEmail"
                v-model="referralEmail"
                type="email"
                placeholder="friend@example.com"
                class="flex-1 rounded-lg h-11 font-inter"
                :class="{ 'border-red-500': errors.referralEmail }"
                :disabled="loading"
                @keyup.enter="handleSendReferral"
              />
              <Button
                @click="handleSendReferral"
                class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white h-11 px-6"
                :disabled="loading || !isFormValid"
              >
                <span v-if="loading">Sending...</span>
                <span v-else>Send</span>
              </Button>
            </div>
            <p v-if="errors.referralEmail" class="text-sm text-red-600">
              {{ errors.referralEmail }}
            </p>
            <p class="text-xs text-gray-500">
              We'll send an invitation email to your friend with a sign-up link
            </p>
          </div>
        </div>
      </Card>

      <!-- My Referrals List Card -->
      <Card class="rounded-xl border p-4 sm:p-6 bg-white">
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-foreground font-geist">
              My Referrals
            </h2>
            <Button
              @click="loadReferrals"
              variant="ghost"
              size="sm"
              class="text-sm"
              :disabled="loadingReferrals"
            >
              <svg v-if="loadingReferrals" class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else>Refresh</span>
            </Button>
          </div>

          <!-- Loading State -->
          <div v-if="loadingReferrals && referrals.length === 0" class="flex items-center justify-center py-8">
            <div class="flex flex-col items-center gap-2">
              <svg class="animate-spin h-6 w-6 text-[#1ECE84]" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-sm text-muted-foreground">Loading referrals...</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="referrals.length === 0" class="flex flex-col items-center justify-center py-8 text-center">
            <div class="rounded-full bg-gray-100 p-4 mb-3">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p class="text-sm font-medium text-foreground mb-1">No referrals yet</p>
            <p class="text-xs text-muted-foreground">Start referring friends to earn your 10% discount coupon!</p>
          </div>

          <!-- Referrals List -->
          <div v-else class="flex flex-col gap-3">
            <div
              v-for="referral in referrals"
              :key="referral.id"
              class="flex items-center justify-between p-4 rounded-lg border border-[#E4E4E8] hover:bg-gray-50 transition-colors"
            >
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                  <p class="text-sm font-medium text-foreground font-inter">
                    {{ referral.email || referral.referredEmail }}
                  </p>
                  <span
                    :class="{
                      'bg-yellow-100 text-yellow-800': referral.status === 'pending',
                      'bg-green-100 text-green-800': referral.status === 'signed_up',
                      'bg-gray-100 text-gray-800': referral.status === 'expired',
                    }"
                    class="px-2 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ getStatusLabel(referral.status) }}
                  </span>
                </div>
                <div class="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Sent: {{ formatDate(referral.createdAt) }}</span>
                  <span v-if="referral.signedUpAt">
                    • Signed up: {{ formatDate(referral.signedUpAt) }}
                  </span>
                  <span v-if="referral.expiresAt && referral.status === 'pending'">
                    • Expires: {{ formatDate(referral.expiresAt) }}
                  </span>
                </div>
                <div v-if="referral.status === 'signed_up' && referral.couponCode" class="mt-2">
                  <div class="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-xs font-medium text-green-800">
                      Your 10% discount coupon: <strong>{{ referral.couponCode }}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ChevronLeft } from "lucide-vue-next";
import Button from "@/components/ui/button.vue";
import Card from "@/components/ui/card/Card.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import { useReferralsApi, type Referral } from "@/composables/useReferrals";
import { useAuthApi } from "@/composables/useAuth";

const router = useRouter();
const { sendReferral, getMyReferrals } = useReferralsApi();
const { currentUser, refreshUser } = useAuthApi();

// Refresh user data on mount
onMounted(() => {
  refreshUser();
  loadReferrals();
});

// Form state
const referralEmail = ref("");
const referrals = ref<Referral[]>([]);

// UI state
const loading = ref(false);
const loadingReferrals = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

// Form errors
const errors = ref({
  referralEmail: "",
});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form validation
const isFormValid = computed(() => {
  return (
    referralEmail.value.trim() !== "" &&
    emailRegex.test(referralEmail.value.trim()) &&
    errors.value.referralEmail === ""
  );
});

// Validate form
const validateForm = () => {
  // Reset errors
  errors.value = {
    referralEmail: "",
  };

  let isValid = true;

  // Validate email
  if (!referralEmail.value.trim()) {
    errors.value.referralEmail = "Email address is required";
    isValid = false;
  } else if (!emailRegex.test(referralEmail.value.trim())) {
    errors.value.referralEmail = "Please enter a valid email address";
    isValid = false;
  }

  return isValid;
};

// Load referrals
const loadReferrals = async () => {
  loadingReferrals.value = true;
  errorMessage.value = "";

  try {
    const response = await getMyReferrals();
    if (response.success && response.data) {
      referrals.value = Array.isArray(response.data) ? response.data : [];
      // Sort by created date (newest first)
      referrals.value.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    }
  } catch (error: any) {
    console.error("Error loading referrals:", error);
    // Don't show error for empty list, just log it
    if (referrals.value.length === 0) {
      referrals.value = [];
    }
  } finally {
    loadingReferrals.value = false;
  }
};

// Handle send referral
const handleSendReferral = async () => {
  // Clear previous messages
  successMessage.value = "";
  errorMessage.value = "";

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Check if user is authenticated
  if (!currentUser.value || !currentUser.value.id) {
    errorMessage.value =
      "You must be logged in to send referrals. Please refresh the page and try again.";
    return;
  }

  loading.value = true;

  try {
    const response = await sendReferral({
      referredEmail: referralEmail.value.trim().toLowerCase(),
    });

    if (response.success) {
      successMessage.value =
        response.message || "Referral invitation sent successfully!";
      // Reset form
      referralEmail.value = "";
      errors.value = {
        referralEmail: "",
      };
      // Reload referrals list
      await loadReferrals();
      // Clear success message after 5 seconds
      setTimeout(() => {
        successMessage.value = "";
      }, 5000);
    } else {
      // Handle error response from sendReferral
      const errorMsg = response.message || response.error || "Failed to send referral invitation";
      errorMessage.value = errorMsg;
      
      // Check if it's a validation error for the email field
      if (errorMsg.toLowerCase().includes('email')) {
        errors.value.referralEmail = errorMsg;
      }
    }
  } catch (error: any) {
    console.error('Error in handleSendReferral:', error);
    let errorMsg = "An error occurred while sending the referral invitation";
    
    // Try to extract error message from various error formats
    if (error?.response?._data) {
      const errorData = error.response._data;
      if (errorData.message) {
        errorMsg = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
      } else if (errorData.error) {
        errorMsg = errorData.error;
      }
    } else if (error?.data?.message) {
      errorMsg = Array.isArray(error.data.message) ? error.data.message.join(', ') : error.data.message;
    } else if (error?.message) {
      errorMsg = error.message;
    }
    
    errorMessage.value = errorMsg;
    
    // Check if it's a validation error for the email field
    if (errorMsg.toLowerCase().includes('email')) {
      errors.value.referralEmail = errorMsg;
    }
  } finally {
    loading.value = false;
  }
};

// Get status label
const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "signed_up":
      return "Signed Up";
    case "expired":
      return "Expired";
    default:
      return status;
  }
};

// Format date
const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

// Go back
const goBack = () => {
  router.back();
};
</script>

