<script setup lang="ts">
import { cilX } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";

const emits = defineEmits<{
  "close-modal": [];
  "update-date-time": [dateTimeStart: Date, dateTimeEnd: Date];
}>();

const dateTimeStart = ref();
const dateTimeEnd = ref();
</script>

<template>
  <Modal
    class="flex h-4/6 w-2/6 flex-1 flex-col bg-white"
    :close-modal="() => $emit('close-modal')"
  >
    <div class="flex items-center justify-between border-b px-6 py-4">
      <h5>Set Date & Time</h5>
      <button @click="$emit('close-modal')" class="h-5 w-5 font-medium">
        <CIcon :icon="cilX" />
      </button>
    </div>
    <form
      @submit="
        {
          $event.preventDefault();
          $emit(
            'update-date-time',
            new Date(dateTimeStart),
            new Date(dateTimeEnd),
          );
        }
      "
      class="flex w-full flex-1 flex-col justify-between px-6 py-4"
    >
      <div class="space-y-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium"> Date & Time Start</label>
          <input
            type="datetime-local"
            v-model="dateTimeStart"
            class="rounded-lg border px-4 py-2 text-sm"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium"> Date & Time End</label>
          <input
            type="datetime-local"
            v-model="dateTimeEnd"
            class="rounded-lg border px-4 py-2 text-sm"
          />
        </div>
      </div>
      <Button
        variant="defaultOutline"
        :disabled="!dateTimeStart || !dateTimeEnd"
        class="w-full bg-blue-500 text-sm font-medium text-white hover:bg-blue-400"
      >
        Done
      </Button>
    </form>
  </Modal>
</template>
