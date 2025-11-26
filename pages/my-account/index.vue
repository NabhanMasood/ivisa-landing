<template>
  <div class="flex justify-center pt-10 pb-20 min-h-screen px-4">
    <div class="flex flex-col w-full max-w-[1000px] gap-4">
      <!-- Page Title -->
      <h1 class="text-2xl font-semibold tracking-tight text-foreground">
        My Account
      </h1>
      
      <!-- Alerts for Applications Requiring Additional Info -->
      <div v-if="applicationsNeedingInfo.length > 0" class="rounded-lg border border-orange-200 bg-orange-50 p-4 text-orange-900">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 mt-0.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5.07 19h13.86A2.07 2.07 0 0021 16.93L13.93 4.14a2.07 2.07 0 00-3.86 0L3 16.93A2.07 2.07 0 005.07 19z" />
          </svg>
          <div class="flex-1">
            <p class="font-medium font-geist">
              {{ applicationsNeedingInfo.length }} application{{ applicationsNeedingInfo.length > 1 ? 's' : '' }} need additional information
            </p>
            <div class="mt-2 flex flex-wrap gap-2">
              <Button 
                v-for="app in applicationsNeedingInfo.slice(0, 3)" 
                :key="app.id"
                @click="navigateToAdditionalInfo(app.id)"
                class="h-8 px-3 rounded-md text-white text-xs font-medium"
                style="background-color: #1ECE84;"
              >
                Fill Info • #{{ app.applicationNumber }}
              </Button>
              <span v-if="applicationsNeedingInfo.length > 3" class="text-xs text-orange-800 self-center">
                +{{ applicationsNeedingInfo.length - 3 }} more
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- My Orders Card -->
        <Card 
          @click="navigateTo('/my-orders')"
          class="rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
        >
          <div class="flex flex-col gap-6">
            <img src="/svg/my-account/order.svg" alt="My Orders Icon" class="w-[39px] h-[39px]" />
            <div>
              <h3 class="text-xl font-semibold text-foreground">My Orders</h3>
              <p class="text-muted-foreground">
                View your order and travel documents
              </p>
            </div>
          </div>
        </Card>

        <!-- Payment Methods Card -->
        <Card 
          @click="navigateTo('/payment-methods')"
          class="rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
        >
          <div class="flex flex-col gap-6">
            <img src="/svg/my-account/card.svg" alt="Payment Methods Icon" class="w-[39px] h-[39px]"  />
            <div>
              <h3 class="text-xl font-semibold text-foreground">Payment Methods</h3>
              <p class="text-muted-foreground">
                Manage your account payment methods
              </p>
            </div>
          </div>
        </Card>

        <!-- Personal Details Card -->
        <Card 
          @click="navigateTo('/personal-details')"
          class="rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
        >
          <div class="flex flex-col gap-6">
            <img src="/svg/my-account/users.svg" alt="Personal Details Icon" class="w-[39px] h-[39px]" />
            <div>
              <h3 class="text-xl font-semibold text-foreground">Personal Details</h3>
              <p class="text-muted-foreground">
                Update your language settings
              </p>
            </div>
          </div>
        </Card>

        <!-- Referrals Card -->
        <Card 
          @click="navigateTo('/referrals')"
          class="rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow bg-[#F8F9F9]"
        >
          <div class="flex flex-col gap-6">
            <img src="/svg/my-account/speaker.svg" alt="Referrals Icon" class="w-[39px] h-[39px]" />
            <div>
              <h3 class="text-xl font-semibold text-foreground">Referrals</h3>
              <p class="text-muted-foreground">
                Give discounts on referrals in your account
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Card from '@/components/ui/card/Card.vue'
import Button from '@/components/ui/button.vue'

const { currentUser, isAuthenticated } = useAuthApi()
const { getMyApplications, getApplicationById } = useVisaApplications()
const { getCustomerApplications } = useApplication()

const router = useRouter()

const navigateTo = (path) => {
  router.push(`/my-account${path}`)
}

const applications = ref([])
const resubmissionTarget = ref(null)

const extractFieldIdFromNote = (note) => {
  if (!note) return null
  const patterns = [
    /fieldId\s*[:#]\s*(\d+)/i,
    /field\s*id\s*[:#]\s*(\d+)/i,
    /field\s*#\s*(\d+)/i,
    /document\s*id\s*[:#]\s*(\d+)/i
  ]
  for (const re of patterns) {
    const m = note.match(re)
    if (m && m[1]) {
      const n = parseInt(m[1])
      if (!Number.isNaN(n)) return n
    }
  }
  return null
}

const extractTravelerIdFromNote = (note) => {
  if (!note) return null
  const patterns = [
    /travelerId\s*[:#]\s*(\d+)/i,
    /traveler\s*id\s*[:#]\s*(\d+)/i,
    /travellerId\s*[:#]\s*(\d+)/i,
    /traveller\s*id\s*[:#]\s*(\d+)/i
  ]
  for (const re of patterns) {
    const m = note.match(re)
    if (m && m[1]) {
      const n = parseInt(m[1])
      if (!Number.isNaN(n)) return n
    }
  }
  return null
}

const resubmissionTravelerName = computed(() => {
  const app = resubmissionTarget.value
  if (!app) return ''
  // Prefer explicit backend targeting
  if (app.resubmissionTarget === 'traveler' && app.resubmissionTravelerId) {
    const travelers = Array.isArray(app.travelers) ? app.travelers : []
    const t = travelers.find(tr => tr.id === app.resubmissionTravelerId)
    if (t && (t.firstName || t.lastName)) {
      return `${t.firstName || ''} ${t.lastName || ''}`.trim()
    }
    return `Traveler #${app.resubmissionTravelerId}`
  }
  // Fallback: attempt to parse traveler id from note
  const maybeId = extractTravelerIdFromNote(app.notes)
  if (maybeId) {
    const travelers = Array.isArray(app.travelers) ? app.travelers : []
    const t = travelers.find(tr => tr.id === maybeId)
    if (t && (t.firstName || t.lastName)) {
      return `${t.firstName || ''} ${t.lastName || ''}`.trim()
    }
    return `Traveler #${maybeId}`
  }
  // Heuristic: if any traveler has admin notes, assume resubmission is for them
  const travelersWithNotes = (Array.isArray(app.travelers) ? app.travelers : []).filter(tr => !!tr?.notes)
  if (travelersWithNotes.length > 0) {
    const t = travelersWithNotes[0]
    if (t && (t.firstName || t.lastName)) {
      return `${t.firstName || ''} ${t.lastName || ''}`.trim()
    }
    if (t && t.id) return `Traveler #${t.id}`
  }
  return ''
})

// Applications that currently require additional info
const applicationsNeedingInfo = computed(() => {
  return applications.value.filter(app => {
    const status = app.status
    return status === 'Additional Info required' || status === 'resubmission'
  })
})

const loadApplications = async () => {
  try {
    const resp = await getMyApplications()
    if (resp.success && resp.data) {
      // Handle different response structures
      let applicationsArray = resp.data.data
      
      if (!Array.isArray(applicationsArray)) {
        if (Array.isArray(resp.data)) {
          applicationsArray = resp.data
        } else if (resp.data && Array.isArray(resp.data.applications)) {
          applicationsArray = resp.data.applications
        } else {
          applicationsArray = []
        }
      }
      
      applications.value = applicationsArray || []
      
      // Keep legacy resubmissionTarget for backward compatibility if needed
      if (applications.value.length > 0) {
        const pending = applications.value.find(a => a.status === 'Additional Info required')
        const anyWithNote = pending || applications.value.find(a => a.notes)
        resubmissionTarget.value = anyWithNote || null
      }
    }
    // Fallback: try fetching by current user's id (customerId)
    else if (currentUser?.value?.id) {
      try {
        const apps2 = await getCustomerApplications(currentUser.value.id)
        if (Array.isArray(apps2)) {
          applications.value = apps2
          const pending2 = apps2.find(a => a.status === 'Additional Info required')
          const anyWithNote2 = pending2 || apps2.find(a => a.notes)
          resubmissionTarget.value = anyWithNote2 || null
        }
      } catch {}
    }
  } catch (e) {
    // ignore errors for banner
    console.error('Error loading applications:', e)
  }
}

onMounted(loadApplications)

const navigateToAdditionalInfo = (applicationId) => {
  router.push(`/my-account/additional-info?applicationId=${applicationId}`)
}

const goToAdditionalInfo = () => {
  if (!resubmissionTarget.value) return
  const maybeFieldId = extractFieldIdFromNote(resubmissionTarget.value.notes)
  const maybeTravelerId = extractTravelerIdFromNote(resubmissionTarget.value.notes)
  const params = new URLSearchParams({ applicationId: String(resubmissionTarget.value.id) })
  if (maybeFieldId) params.append('fieldId', String(maybeFieldId))
  if (maybeTravelerId) params.append('travelerId', String(maybeTravelerId))
  const url = `/my-account/additional-info?${params.toString()}`
  router.push(url)
}
</script>