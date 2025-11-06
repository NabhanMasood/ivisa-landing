<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="w-[360px]">
      <div class="flex flex-col items-center text-center py-4">
        
        <!-- Success Icon with circular background -->
        <div class="relative mb-6">
          <!-- Outer light circle -->
          <div class="w-32 h-32 rounded-full flex items-center justify-center" style="background-color: #F0F0F0;">
            <!-- Inner white circle -->
            <div class="w-24 h-24 rounded-full flex items-center justify-center bg-white">
              <!-- Custom SVG Icon -->
              <img src="/svg/success.svg" alt="Success" class="w-102 h-102" />
            </div>
          </div>
        </div>

        <!-- Title -->
        <h2 style="font-family: Manrope; font-weight: 600; font-size: 20px; line-height: 28px; color: #0B3947; margin-bottom: 24px;">
          Application Submitted
        </h2>

        <!-- OK Button -->
        <Button
          @click="handleClose"
          class="w-full"
          style="height: 48px; border-radius: 6px; background-color: #1ECE84; color: white; font-family: Inter; font-weight: 500; font-size: 16px;"
        >
          Ok
        </Button>

      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import Button from '@/components/ui/Button.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const handleOpenChange = (value: boolean) => {
  if (!value) {
    emit('close')
  }
}

const handleClose = () => {
  emit('close')
}
</script>