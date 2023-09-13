<script setup lang="ts">
import { cilArrowCircleRight } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";

const emits = defineEmits<{
  "close-modal": [];
}>();
</script>

<template>
  <Modal
    class="flex h-96 w-96 flex-1 flex-col border bg-white py-4"
    :close-modal="() => $emit('close-modal')"
  >
    <div class="flex w-full flex-1 flex-col items-center justify-center gap-2">
      <span class="text-lg font-medium"
        >You Haven't completed your details</span
      >
      <p class="text-sm">Complete your details first</p>
    </div>
    <div class="flex justify-center">
      <NuxtLink to="/profile">
        <div class="flex items-center gap-2 px-4 py-2 text-sm font-medium">
          Complete your details
          <CIcon :icon="cilArrowCircleRight" class="h-5 w-5" />
        </div>
      </NuxtLink>
    </div>
  </Modal>
</template>
