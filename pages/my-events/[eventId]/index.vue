<script setup lang="ts">
import {
  cilCalendar,
  cilClock,
  cilLocationPin,
  cilMusicNote,
  cilPen,
  cilPencil,
  cilTrash,
} from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import ChevronLeft from "~/components/icons/chevron-left.vue";
import DeleteEventModal from "~/components/modals/delete-event-modal.vue";
import DeleteEventTicketTypeModal from "~/components/modals/delete-event-ticket-type-modal.vue";
import EditEventModal from "~/components/modals/edit-event-modal.vue";
import EditEventTicketModal from "~/components/modals/edit-event-ticket-modal.vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventTicketDetails, EventType } from "~/types/event";

definePageMeta({ middleware: "auth" });

const route = useRoute();

const isEditDetailsModalOpen = ref(false);
const isEditTicketModalOpen = ref(false);
const isDeleteTicketModalOpen = ref(false);
const isDeleteEventModalOpen = ref(false);

const selectedTicket = ref();
const eventDetailsCache = useNuxtData(`eventDetails/${route.params.eventId}`);

const { data: eventDetails, refresh } = await useFetch<EventType>(
  `${EVENT_API_MAIN}/events/${route.params.eventId}`,
  {
    key: `eventDetails/${route.params.eventId}`,
    immediate: eventDetailsCache.data.value === null,
  },
);

useHead({
  title: `${
    eventDetailsCache.data.value.title ?? eventDetails.value?.title
  } | Loket`,
});
</script>

<template>
  <NuxtLayout>
    <main class="flex min-h-screen flex-1 bg-slate-50">
      <div class="flex flex-1 flex-col space-y-4 px-4 py-4 lg:px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <button @click="$router.back()" class="lg:hidden">
              <ChevronLeft />
            </button>
            <h1 class="text-base font-medium lg:text-xl">
              {{ eventDetailsCache?.data.value.title }}
            </h1>
          </div>
          <Button
            @click="isDeleteEventModalOpen = true"
            class="flex h-8 w-8 items-center justify-center gap-3 bg-red-800 p-0 text-sm hover:bg-red-700 lg:h-auto lg:w-auto lg:px-4 lg:py-2"
          >
            <CIcon :icon="cilTrash" class="h-3 w-3 lg:h-4 lg:w-4" />
            <span class="hidden lg:inline-block">Remove</span>
          </Button>
        </div>
        <div
          class="flex flex-1 flex-wrap gap-10 rounded-lg border bg-white p-4 lg:gap-20"
        >
          <div class="w-full lg:w-auto">
            <div class="mb-2 flex items-center justify-between">
              <h2 class="font-medium">Event Details</h2>
              <Button
                @click="isEditDetailsModalOpen = true"
                class="flex h-8 w-8 items-center justify-center gap-3 p-0 text-sm lg:h-auto lg:w-auto lg:px-4 lg:py-2"
              >
                <CIcon :icon="cilPencil" class="h-3 w-3 lg:h-4 lg:w-4" />
                <span class="hidden lg:inline-block">Edit</span>
              </Button>
            </div>
            <div class="flex flex-1 flex-wrap gap-10">
              <div
                class="w-full overflow-hidden rounded-lg border shadow-sm lg:w-96"
              >
                <NuxtImg
                  :src="eventDetailsCache?.data.value.banner_image"
                  class="w-full object-top lg:h-72 lg:w-96"
                  alt="event-banner-img"
                />
              </div>
              <div class="flex-1 space-y-6">
                <div class="flex flex-col gap-3">
                  <h5 class="font-medium">Event Date & Time</h5>
                  <div class="space-y-2">
                    <div class="flex items-center gap-3">
                      <CIcon :icon="cilCalendar" class="h-4 w-4 opacity-50" />
                      <span class="text-sm">{{
                        `${new Date(
                          eventDetailsCache?.data.value.date_time_start,
                        ).toDateString()} - 
              ${new Date(
                eventDetailsCache?.data.value.date_time_end,
              ).toDateString()}`
                      }}</span>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center gap-3">
                      <CIcon :icon="cilClock" class="h-4 w-4 opacity-50" />
                      <span class="text-sm">{{
                        `${new Date(
                          eventDetailsCache?.data.value.date_time_start,
                        ).toLocaleTimeString()} - 
              ${new Date(
                eventDetailsCache?.data.value.date_time_end,
              ).toLocaleTimeString()}`
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-3">
                  <h5 class="font-medium">Region & Place</h5>
                  <div class="space-y-2">
                    <div class="flex items-center gap-3">
                      <CIcon
                        :icon="cilLocationPin"
                        class="h-4 w-4 opacity-50"
                      />
                      <span class="text-sm">{{
                        `${eventDetailsCache?.data.value.place}, in ${eventDetailsCache?.data.value.region.name}`
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-3">
                  <h5 class="font-medium">Category</h5>
                  <div class="space-y-2">
                    <div class="flex items-center gap-3">
                      <CIcon :icon="cilMusicNote" class="h-4 w-4 opacity-50" />
                      <span class="text-sm">{{
                        eventDetailsCache?.data.value.category.name
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-auto">
            <h2 class="mb-2 font-medium">Ticket Types</h2>
            <div class="flex flex-1 flex-col gap-4">
              <div
                v-for="(ticket, index) in eventDetails?.ticket_types"
                :key="ticket.id"
                class="flex gap-4 rounded-lg border bg-slate-50 px-4 py-3 shadow-sm lg:w-96"
              >
                <div class="flex flex-1 flex-col gap-2">
                  <h5 class="font-medium">{{ ticket.name }}</h5>
                  <p class="text-sm">{{ ticket.description }}</p>
                  <span class="text-sm">{{
                    `${new Date(
                      ticket.sale_start as string,
                    ).toDateString()} - ${new Date(
                      ticket.sale_end as string,
                    ).toDateString()}`
                  }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Button
                    @click="
                      () => {
                        selectedTicket = index;
                        isEditTicketModalOpen = true;
                      }
                    "
                    class="flex h-8 w-8 items-center justify-center gap-3 p-0 text-sm"
                  >
                    <CIcon :icon="cilPen" class="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    @click="
                      () => {
                        selectedTicket = index;
                        isDeleteTicketModalOpen = true;
                      }
                    "
                    class="flex h-8 w-8 items-center justify-center gap-3 bg-red-800 p-0 text-sm hover:bg-red-700"
                  >
                    <CIcon :icon="cilTrash" class="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditEventModal
        v-if="isEditDetailsModalOpen"
        :event-details="eventDetails as EventType"
        @close-modal="isEditDetailsModalOpen = false"
        @refresh-event-data="() => refresh()"
      />
      <EditEventTicketModal
        v-if="isEditTicketModalOpen"
        :ticket-details="
          eventDetails?.ticket_types[selectedTicket] as EventTicketDetails
        "
        @close-modal="isEditTicketModalOpen = false"
        @refresh-event-data="() => refresh()"
      />
      <DeleteEventTicketTypeModal
        v-if="isDeleteTicketModalOpen"
        :ticket-id="eventDetails?.ticket_types[selectedTicket].id as number"
        @close-modal="isDeleteTicketModalOpen = false"
      />
      <DeleteEventModal
        v-if="isDeleteEventModalOpen"
        :event-id="eventDetails?.id as number"
        @close-modal="isDeleteEventModalOpen = false"
      />
    </main>
  </NuxtLayout>
</template>
