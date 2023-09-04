<script setup lang="ts">
import { cilCalendar, cilClock, cilImagePlus, cilPlus } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import CreateEventTicketsModal from "~/components/modals/create-event-tickets-modal.vue";
import SelectEventCategoryModal from "~/components/modals/select-event-category-modal.vue";
import SelectEventDateTimeModal from "~/components/modals/select-event-date-time-modal.vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventType, User } from "~/types/event";
import axios from "axios";

type ActiveTab = "tickets" | "description";

const eventDetails = reactive<EventType>({ ticket_types: [] });
const activeTab = ref<ActiveTab>("tickets");

const { data: session } = useAuth();

const { data: userDetails } = useFetch<User>(
  `${EVENT_API_MAIN}/users/${session.value?.user?.email}`,
);

const isCategoryModalOpen = ref(false);
const isDateTimeModalOpen = ref(false);
const isPlaceModalOpen = ref(false);
const isTicketModalOpen = ref(false);

async function createEvent() {
  const { data } = await axios.post(`${EVENT_API_MAIN}/events`, {
    ...eventDetails,
    creator_id: userDetails.value?.event_creator_id,
    category_id: eventDetails.category?.id,
    ticketTypes: eventDetails.ticket_types,
  });
}
</script>

<template>
  <main
    class="flex min-h-screen w-full flex-1 flex-col items-center justify-center bg-slate-100"
  >
    <div class="flex w-full flex-1 flex-col items-center justify-center py-10">
      <div class="w-4/6 rounded-lg border bg-white p-6">
        <div
          class="flex h-72 w-full items-center justify-center rounded-lg bg-blue-50"
        >
          <CIcon :icon="cilImagePlus" class="h-6 w-6 opacity-40" />
        </div>
        <div class="flex flex-col gap-2 px-2 py-4">
          <input
            type="string"
            v-model="eventDetails.title"
            class="bg-tranparent w-96 rounded-lg py-2 text-lg focus:outline-none"
            placeholder="Event Name"
          />
          <button
            @click="isCategoryModalOpen = true"
            class="w-72 rounded-lg border px-4 py-2 text-sm"
          >
            {{ eventDetails.category?.name ?? "Select Category" }}
          </button>
        </div>
        <div class="flex w-full gap-x-10 px-2 py-4">
          <div class="space-y-4">
            <h5 class="text-sm font-semibold">Event Creator</h5>
            <div class="flex items-center gap-4">
              <div class="h-10 w-10 rounded-full bg-blue-300" />
              <span class="text-sm font-medium opacity-50">{{
                userDetails?.event_creator.name
              }}</span>
            </div>
          </div>
          <div class="space-y-4">
            <h5 class="text-sm font-semibold">Date & Time</h5>
            <button
              v-if="
                !eventDetails.date_time_start || !eventDetails.date_time_end
              "
              @click="isDateTimeModalOpen = true"
              class="rounded-lg border px-4 py-2 text-sm"
            >
              Select Date & Time
            </button>
            <div v-else class="space-y-2">
              <div class="flex items-center gap-3">
                <CIcon :icon="cilCalendar" class="h-5 w-5 opacity-40" />
                <span>{{
                  `${eventDetails?.date_time_start.toDateString()} - ${eventDetails.date_time_end.toDateString()}`
                }}</span>
              </div>
              <div class="flex items-center gap-3">
                <CIcon :icon="cilClock" class="h-5 w-5 opacity-40" />
                <span>{{
                  `${eventDetails?.date_time_start.toLocaleTimeString()} - ${eventDetails.date_time_end.toLocaleTimeString()}`
                }}</span>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <h5 class="text-sm font-semibold">Place</h5>
            <button
              disabled
              class="rounded-lg border px-4 py-2 text-sm opacity-50"
            >
              Default Place
            </button>
          </div>
        </div>
      </div>
      <div
        class="mt-4 flex w-4/6 flex-col gap-2 rounded-lg border bg-white py-4"
      >
        <div class="flex items-center px-6">
          <button
            @click="activeTab = 'tickets'"
            class="w-3/6 border-b-2 pb-2 text-sm font-semibold"
            :class="{ 'border-b-blue-700': activeTab === 'tickets' }"
          >
            Tickets Types
          </button>
          <button
            @click="activeTab = 'description'"
            class="w-3/6 border-b-2 pb-2 text-sm font-semibold"
            :class="{ 'border-b-blue-700': activeTab === 'description' }"
          >
            Description
          </button>
        </div>
        <div v-if="activeTab === 'tickets'" class="px-6">
          <div
            class="flex min-h-[20rem] flex-col items-center justify-center gap-2 rounded-lg border bg-slate-50/10"
          >
            <span
              v-if="eventDetails.ticket_types.length < 1"
              class="text-sm font-medium opacity-50"
              >No created tickets</span
            >
            <div v-else v-for="ticket in eventDetails.ticket_types">
              <div
                class="w-96 rounded-lg border bg-slate-50 px-4 py-2 shadow-sm"
              >
                <div class="flex flex-col gap-2">
                  <h5 class="font-medium">{{ ticket.name }}</h5>
                  <p class="text-sm">{{ ticket.description }}</p>
                  <span class="text-sm">{{
                    `${ticket.sale_start?.toDateString()} - ${ticket.sale_end?.toDateString()}`
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="defaultOutline"
            @click="isTicketModalOpen = true"
            class="mt-4 space-x-2 border-blue-200 bg-blue-500 text-white hover:bg-blue-400"
          >
            <CIcon :icon="cilPlus" class="h-4 w-4" />
            <span class="text-sm">Create Ticket</span>
          </Button>
        </div>
        <div v-else class="px-6 py-4">
          <textarea
            v-model="eventDetails.description"
            class="h-72 w-full rounded-lg border bg-slate-50 px-4 py-2 text-sm"
          />
        </div>
      </div>
    </div>
    <div
      class="sticky bottom-0 flex h-14 w-full items-center justify-between border-t border-t-slate-300 bg-white"
    >
      <div class="w-1/6 text-center">
        <p class="text-sm">Create or save it to draft</p>
      </div>
      <div class="flex w-1/6 gap-4">
        <button class="rounded-lg border bg-slate-50 px-4 py-2 text-sm">
          Save to Draft
        </button>
        <Button
          variant="defaultOutline"
          @click="createEvent"
          class="border-blue-200 bg-blue-300 text-sm"
        >
          Create
        </Button>
      </div>
    </div>
    <SelectEventCategoryModal
      v-if="isCategoryModalOpen"
      @close-modal="isCategoryModalOpen = false"
      @update-category="
        (category) => {
          eventDetails.category = category;
          isCategoryModalOpen = false;
        }
      "
    />
    <SelectEventDateTimeModal
      v-if="isDateTimeModalOpen"
      @close-modal="isDateTimeModalOpen = false"
      @update-date-time="
        (dateTimeStart, dateTimeEnd) => {
          eventDetails.date_time_start = dateTimeStart;
          eventDetails.date_time_end = dateTimeEnd;
          isDateTimeModalOpen = false;
        }
      "
    />
    <CreateEventTicketsModal
      v-if="isTicketModalOpen"
      @close-modal="isTicketModalOpen = false"
      @update-tickets="
        (newTicket) =>
          (eventDetails.ticket_types = [
            ...eventDetails.ticket_types,
            newTicket,
          ])
      "
    />
  </main>
</template>
