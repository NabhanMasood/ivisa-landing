<template>
  <div class="flex justify-center pt-10 pb-20 min-h-screen px-4">
    <div class="flex flex-col w-full max-w-[776px] gap-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <Button 
            @click="goBack"
            variant="ghost" 
            size="icon" 
            class="rounded-md w-[42px] h-[36px] border border-[#E4E4E8]"
          >
            <ChevronLeft class="h-5 w-5" />
          </Button>
          <h1 class="text-2xl font-semibold tracking-tight text-foreground font-geist">
            Manage Payment Methods
          </h1>
        </div>
        <Button 
          @click="navigateToAddCard"
          class="rounded-lg !bg-[#1ECE84] hover:!bg-[#1AB876] !text-white"
        >
          Add Card
        </Button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ECE84]"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!cards || cards.length === 0" class="border rounded-xl border-[#DC7609] p-4">
        <div class="flex gap-3">
          <AlertCircle class="h-5 w-5 text-[#DC7609] flex-shrink-0 mt-0.5" />
          <div class="flex flex-col gap-1 font-inter">
            <h3 class="text-sm font-semibold text-[#DC7609]">
              No cards saved
            </h3>
            <p class="text-sm text-[#DC7609]">
              You need to add a debit or credit card.
            </p>
          </div>
        </div>
      </div>

      <!-- Cards List -->
      <div v-else class="flex flex-col gap-4">
        <div 
          v-for="card in cards" 
          :key="card.id"
          class="border rounded-xl p-6 bg-white"
          :class="card.isDefault ? 'border-[#1ECE84] border-2' : 'border-[#E5E7EB]'"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                  <CreditCard class="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-lg font-semibold text-foreground font-geist">
                      {{ card.cardBrand.toUpperCase() }} •••• {{ card.cardLast4 }}
                    </h3>
                    <span 
                      v-if="card.isDefault"
                      class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-[#1ECE84] text-white"
                    >
                      Default
                    </span>
                  </div>
                  <p class="text-sm text-muted-foreground font-inter">
                    {{ card.cardholderName }}
                  </p>
                  <p class="text-sm text-muted-foreground font-inter">
                    Expires {{ formatExpiryDate(card.expiryMonth, card.expiryYear) }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Button
                v-if="!card.isDefault"
                @click="handleSetDefault(card.id)"
                variant="outline"
                size="sm"
                class="rounded-lg"
              >
                Set as Default
              </Button>
              <Button
                @click="handleDelete(card.id)"
                variant="ghost"
                size="icon"
                class="h-8 w-8 rounded-md hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, AlertCircle, CreditCard, Trash2 } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import { useCardInfo, type CardInfo } from '@/composables/useCardInfo'

const router = useRouter()
const { getCustomerCards, setDefaultCard, deleteCard, formatExpiryDate } = useCardInfo()

const cards = ref<CardInfo[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  await fetchCards()
})

const fetchCards = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await getCustomerCards()
    
    if (response.success && response.data?.data) {
      cards.value = response.data.data.filter((card: CardInfo) => card.isActive)
    } else {
      error.value = response.message || 'Failed to load cards'
    }
  } catch (err: any) {
    console.error('Error fetching cards:', err)
    error.value = err.message || 'Failed to load cards'
  } finally {
    loading.value = false
  }
}

const handleSetDefault = async (cardId: number) => {
  try {
    const response = await setDefaultCard(cardId)
    
    if (response.success) {
      await fetchCards() // Refresh the list
    } else {
      alert(response.message || 'Failed to set default card')
    }
  } catch (err: any) {
    console.error('Error setting default card:', err)
    alert(err.message || 'Failed to set default card')
  }
}

const handleDelete = async (cardId: number) => {
  if (!confirm('Are you sure you want to delete this card?')) {
    return
  }
  
  try {
    const response = await deleteCard(cardId)
    
    if (response.success) {
      await fetchCards() // Refresh the list
    } else {
      alert(response.message || 'Failed to delete card')
    }
  } catch (err: any) {
    console.error('Error deleting card:', err)
    alert(err.message || 'Failed to delete card')
  }
}

const goBack = () => {
  router.back()
}

const navigateToAddCard = () => {
  router.push('/my-account/payment-methods/add-card')
}
</script>