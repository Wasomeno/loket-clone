<script setup lang="ts">
import { EventTicketDetails } from "~/types/event";

const props = defineProps<{
  ticketDetails: EventTicketDetails;
}>();
</script>

<template>
  <div
    class="flex w-full flex-col gap-4 rounded-lg border border-slate-300 bg-blue-50 p-4"
  >
    <div class="space-y-2">
      <div class="text-lg">{{ props.ticketDetails.name }}</div>
      <div class="text-sm tracking-wide">
        {{ props.ticketDetails.description }}
      </div>
      <div class="text-sm font-medium text-blue-600">
        {{
          `${new Date(
            props.ticketDetails.sale_end,
          ).toDateString()} at ${new Date(
            props.ticketDetails.sale_end,
          ).toLocaleTimeString()} `
        }}
      </div>
    </div>
    <hr class="w-full rounded-full border-t border-dashed border-slate-300" />
    <div class="flex items-center justify-between">
      <span class="text-lg font-medium">{{
        `Rp ${props.ticketDetails.price?.toLocaleString("id")}`
      }}</span>
      <button
        class="rounded-lg bg-blue-800 px-4 py-2 text-sm font-medium text-white"
      >
        Buy Ticket
      </button>
    </div>
  </div>
</template>
