<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat bubble with QR code - expands on hover, positioned diagonally top-left -->
    <div
      class="chat-bubble absolute bg-white text-gray-800 rounded-2xl shadow-lg text-base font-medium border border-gray-200 flex flex-col items-center cursor-pointer overflow-hidden transition-all duration-300 ease-in-out"
      :class="isHovered ? 'px-4 py-4 min-w-[140px] -top-28 -left-40' : 'px-4 py-2 -top-16 -left-40'"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <span class="whitespace-nowrap" :class="isHovered ? 'mb-3' : 'mb-0'">Let's chat!</span>

      <!-- Scan QR hint - shows when not hovered -->
      <div v-if="!isHovered" class="scan-hint flex items-center gap-1.5 mt-1.5 px-2 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
        <!-- Mini QR icon -->
        <div class="qr-icon relative">
          <svg class="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zm-6 4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm2 2h2v2h-2v-2zm0-4h2v2h-2v-2zm2-2h2v2h-2v-2zM3 21h8v-8H3v8zm2-6h4v4H5v-4z"/>
          </svg>
          <span class="pulse-ring"></span>
        </div>
        <span class="text-[10px] font-semibold text-green-700 uppercase tracking-wide">Scan</span>
      </div>

      <div
        class="transition-all duration-300 ease-in-out overflow-hidden"
        :class="isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'"
      >
        <img
          src="/Qr/qr.jpeg"
          alt="WhatsApp QR Code"
          class="w-28 h-28 rounded-lg object-contain"
        />
      </div>
    </div>

    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <!-- WhatsApp Icon SVG -->
      <svg
        class="w-8 h-8 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
        />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const phoneNumber = '+971585743188'
const isHovered = ref(false)

// WhatsApp URL format: https://wa.me/971585743188 (country code + number without + or spaces)
const whatsappUrl = computed(() => {
  const cleanNumber = phoneNumber.replace(/[\s\+]/g, '')
  return `https://wa.me/${cleanNumber}`
})
</script>

<style scoped>
.chat-bubble {
  animation: gentle-bounce 2s ease-in-out infinite;
}

@keyframes gentle-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

/* Scan hint animation */
.scan-hint {
  animation: hint-glow 2s ease-in-out infinite;
}

@keyframes hint-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  }
  50% {
    box-shadow: 0 0 8px 2px rgba(34, 197, 94, 0.3);
  }
}

/* Pulse ring around QR icon */
.qr-icon {
  position: relative;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(34, 197, 94, 0.6);
  animation: pulse-ring 1.5s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.8);
    opacity: 0;
  }
}
</style>
