<script setup lang="ts">
import { cilX } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { EventTicketDetails } from "~/types/event";

const activeTab = ref<"ticket" | "dateTime">("ticket");
const ticketDetails = reactive<EventTicketDetails>({});

const dateTime = reactive<{ start?: string; end?: string }>({});

watchEffect(() => {
  const dateTimeStart = new Date(toRaw(dateTime.start as string));
  const dateTimeEnd = new Date(toRaw(dateTime.end as string));
  ticketDetails.sale_start = dateTimeStart;
  ticketDetails.sale_end = dateTimeEnd;
});

const emits = defineEmits<{
  "close-modal": [];
  "update-tickets": [ticketDetails: EventTicketDetails];
}>();
</script>

<template>
  <Modal class="flex h-5/6 w-3/6 flex-1 flex-col bg-white">
    <div class="flex items-center justify-between border-b px-6 py-4">
      <h5>Create Ticket</h5>
      <button @click="$emit('close-modal')" class="h-5 w-5 font-medium">
        <CIcon :icon="cilX" />
      </button>
    </div>
    <div class="flex items-center px-6 py-4">
      <button
        @click="activeTab = 'ticket'"
        class="w-3/6 border-b-2 pb-2 text-sm font-medium"
        :class="{ 'border-b-blue-700': activeTab === 'ticket' }"
      >
        Ticket Details
      </button>
      <button
        @click="activeTab = 'dateTime'"
        class="w-3/6 border-b-2 pb-2 text-sm font-medium"
        :class="{ 'border-b-blue-700': activeTab === 'dateTime' }"
      >
        Date & Time
      </button>
    </div>
    <form
      @submit="
        (event) => {
          event.preventDefault();
          $emit('update-tickets', {
            ...ticketDetails,
          });
          $emit('close-modal');
        }
      "
      class="flex flex-1 flex-col px-6 py-4"
    >
      <div v-if="activeTab === 'ticket'" class="flex flex-1 flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm">Ticket Name</label>
          <input
            type="text"
            v-model="ticketDetails.name"
            class="rounded-lg border bg-slate-50 px-4 py-2 focus:outline-none"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm">Amount</label>
          <input
            type="number"
            v-model="ticketDetails.amount"
            class="rounded-lg border bg-slate-50 px-4 py-2 focus:outline-none"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm">Price</label>
          <input
            type="number"
            v-model="ticketDetails.price"
            class="rounded-lg border bg-slate-50 px-4 py-2 focus:outline-none"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm">Description</label>
          <textarea
            v-model="ticketDetails.description"
            class="h-40 rounded-lg border bg-slate-50 px-4 py-2 text-sm leading-6 focus:outline-none"
          />
        </div>
      </div>
      <div v-else class="flex flex-1 flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium"> Date & Time Start</label>
          <input
            type="datetime-local"
            v-model="dateTime.start"
            class="rounded-lg border px-4 py-2 text-sm"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium"> Date & Time End</label>
          <input
            type="datetime-local"
            v-model="dateTime.end"
            class="rounded-lg border px-4 py-2 text-sm"
          />
        </div>
      </div>
      <Button
        variant="defaultOutline"
        :disabled="!ticketDetails || !dateTime.end || !dateTime.start"
        class="w-full bg-blue-500 text-sm font-medium text-white hover:bg-blue-400"
      >
        Create
      </Button>
    </form>
  </Modal>
</template>
