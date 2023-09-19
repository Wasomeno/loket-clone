<script setup lang="ts">
import { EVENT_API_MAIN } from "~/lib/utils";
import axios from "axios";

const props = defineProps<{ ticketId: number }>();
const emits = defineEmits<{ "close-modal": [] }>();
const route = useRoute();

async function deleteTicketType() {
  await axios.delete(
    `${EVENT_API_MAIN}/events/${route.params.eventId}/tickets/${props.ticketId}`,
  );
}
</script>

<template>
  <Modal
    :close-modal="() => emits('close-modal')"
    class="fleoverflow-x-scroll flex h-2/6 flex-1 items-center justify-between gap-4 rounded-lg bg-white p-6 lg:h-72 lg:w-96"
  >
    <div class="flex flex-1 items-center">
      <span class="text-sm lg:text-base">
        Delete ticket type with an id of {{ ticketId }} ?
      </span>
    </div>
    <div class="flex items-center justify-center gap-4">
      <Button @click="deleteTicketType"> Delete </Button>
      <Button @click="emits('close-modal')" class="bg-red-800 hover:bg-red-700">
        Cancel
      </Button>
    </div>
  </Modal>
</template>
