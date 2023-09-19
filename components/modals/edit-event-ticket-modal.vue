<script setup lang="ts">
import { cilX } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventTicketDetails } from "~/types/event";
import axios from "axios";

const props = defineProps<{
  ticketDetails: EventTicketDetails;
}>();

const emits = defineEmits<{
  "close-modal": [];
  "refresh-event-data": [];
}>();

const activeTab = ref<"details" | "tickets">("details");

const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const ticketDetails = reactive<EventTicketDetails>({
  ...props.ticketDetails,
  sale_start: convertToDateTimeLocalString(
    new Date(props.ticketDetails.sale_start as string),
  ),
  sale_end: convertToDateTimeLocalString(
    new Date(props.ticketDetails.sale_end as string),
  ),
});

const route = useRoute();

async function updateTicket() {
  const { data } = await axios.put(
    `${EVENT_API_MAIN}/events/${route.params.eventId}/tickets/${ticketDetails.id}`,
    {
      ...ticketDetails,
      sale_start: new Date(ticketDetails.sale_start as string),
      sale_end: new Date(ticketDetails.sale_end as string),
    },
  );
  emits("refresh-event-data");
}
</script>

<template>
  <Modal class="flex flex-1 flex-col bg-white lg:h-5/6 lg:w-3/6">
    <div class="flex items-center justify-between border-b px-6 py-4">
      <h5 class="text-sm font-medium lg:text-base">Update Ticket</h5>
      <button @click="$emit('close-modal')" class="h-4 w-4 font-medium">
        <CIcon :icon="cilX" />
      </button>
    </div>

    <div class="flex flex-1 flex-col overflow-y-scroll">
      <form
        @submit="
          (event) => {
            event.preventDefault();
            updateTicket();
          }
        "
        class="flex flex-1 flex-col gap-4 px-6 py-4"
      >
        <div class="flex flex-col gap-2">
          <label class="text-xs lg:text-sm">Name</label>
          <input
            type="text"
            v-model="ticketDetails.name"
            class="rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs lg:text-sm">Amount</label>
          <input
            type="text"
            v-model="ticketDetails.amount"
            class="rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs lg:text-sm">Price</label>
          <input
            type="text"
            v-model="ticketDetails.price"
            class="rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs lg:text-sm">Description</label>
          <textarea
            v-model="ticketDetails.description"
            class="h-40 rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
          />
        </div>
        <div class="flex flex-1 flex-wrap items-center gap-4">
          <div class="flex w-full flex-1 flex-col gap-2">
            <label class="text-xs lg:text-sm">Sale Start Date & Time</label>
            <input
              type="datetime-local"
              v-model="ticketDetails.sale_start"
              class="rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
            />
          </div>
          <div class="flex w-full flex-1 flex-col gap-2">
            <label class="text-xs lg:text-sm">Sale End Date & Time</label>
            <input
              type="datetime-local"
              v-model="ticketDetails.sale_end"
              class="rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
            />
          </div>
        </div>
        <Button
          variant="defaultOutline"
          class="mt-4 w-full bg-blue-500 text-sm font-medium text-white hover:bg-blue-400"
        >
          Update
        </Button>
      </form>
    </div>
  </Modal>
</template>
