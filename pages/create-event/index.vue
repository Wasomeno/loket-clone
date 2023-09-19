<script setup lang="ts">
import {
  cilCalendar,
  cilClock,
  cilPen,
  cilPlus,
  cilTrash,
} from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { createClient } from "@supabase/supabase-js";
import CreateEventTicketsModal from "~/components/modals/create-event-tickets-modal.vue";
import EditEventTicketsModal from "~/components/modals/edit-event-tickets-modal.vue";
import SelectEventCategoryModal from "~/components/modals/select-event-category-modal.vue";
import SelectEventDateTimeModal from "~/components/modals/select-event-date-time-modal.vue";
import UserDetailsNotCreatedModal from "~/components/modals/user-details-not-created-modal.vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventType, User } from "~/types/event";
import axios from "axios";

type ActiveTab = "tickets" | "description";

definePageMeta({ middleware: "auth" });

useHead({ title: "Create Event | Loket" });

const eventDetails = reactive<EventType>({ ticket_types: [] });
const activeTab = ref<ActiveTab>("tickets");

const { data: session } = useAuth();

const { data: userDetails } = useFetch<User>(
  `${EVENT_API_MAIN}/users/${session.value?.user?.email}`,
);

const isCategoryModalOpen = ref(false);
const isDateTimeModalOpen = ref(false);
const isCreateTicketModalOpen = ref(false);
const isEditTicketModalOpen = ref(false);

const selectedTicketIndex = ref();

const imageFile = ref<{ path: string; file: File }>();

const isUserDetailsInvalid = userDetails === null;
const runtimeConfig = useRuntimeConfig();

const supabase = createClient(
  runtimeConfig.public.PROJECT_URL,
  runtimeConfig.public.PROJECT_API_KEY,
);

async function createEvent() {
  const imageUpload = await supabase.storage
    .from("event-images")
    .upload(`/${imageFile.value?.file.name}`, imageFile.value?.file as File);
  const response = await axios.post(`${EVENT_API_MAIN}/events`, {
    ...eventDetails,
    min_ticket_price: eventDetails.ticket_types.sort((a, b) => {
      return a.price - b.price;
    })[0].price,
    dateTimeStart: eventDetails.date_time_start,
    dateTimeEnd: eventDetails.date_time_end,
    creator_id: userDetails.value?.event_creator_id,
    category_id: eventDetails.category?.id,
    ticketTypes: eventDetails.ticket_types,
    imageURL: `https://npqvursxoqbyzwgksvio.supabase.co/storage/v1/object/public/event-images/${imageUpload.data?.path}`,
  });
}
</script>

<template>
  <main class="flex min-h-screen flex-1 flex-col bg-slate-100">
    <div
      class="flex w-full flex-1 flex-col items-center justify-center p-4 lg:py-8"
    >
      <div class="w-full rounded-lg border bg-white p-4 lg:w-4/6 lg:p-6">
        <div
          class="flex h-72 w-full items-center justify-center rounded-lg bg-blue-50"
        >
          <input
            type="file"
            @change="
              (event) =>
                (imageFile = {
                  path: event.target.value,
                  file: event.target.files[0],
                })
            "
          />
        </div>
        <div class="flex flex-col gap-2 px-2 py-4">
          <input
            type="string"
            v-model="eventDetails.title"
            class="bg-tranparent w-full rounded-lg py-2 text-base focus:outline-none lg:text-lg"
            placeholder="Set event name..."
          />
          <button
            @click="isCategoryModalOpen = true"
            class="w-72 rounded-lg border px-4 py-2 text-xs lg:text-sm"
          >
            {{ eventDetails.category?.name ?? "Select Category" }}
          </button>
        </div>
        <div class="flex w-full flex-col gap-4 px-2 py-4 lg:flex-row lg:gap-10">
          <div class="space-y-2 lg:space-y-4">
            <h5 class="text-sm font-semibold">Event Creator</h5>
            <div class="flex items-center gap-4">
              <div class="h-10 w-10 rounded-full bg-blue-300" />
              <span class="text-sm font-medium opacity-50">{{
                userDetails?.event_creator.name
              }}</span>
            </div>
          </div>
          <div class="flex gap-10">
            <div class="space-y-2 lg:space-y-4">
              <h5 class="text-sm font-semibold">Date & Time</h5>
              <button
                v-if="
                  !eventDetails.date_time_start || !eventDetails.date_time_end
                "
                @click="isDateTimeModalOpen = true"
                class="rounded-lg border px-4 py-2 text-xs lg:text-sm"
              >
                Select Date & Time
              </button>
              <div v-else class="space-y-2">
                <div class="flex items-center gap-3">
                  <CIcon :icon="cilCalendar" class="h-5 w-5 opacity-40" />
                  <span>{{
                    `${(
                      eventDetails?.date_time_start as Date
                    ).toDateString()} - ${(
                      eventDetails.date_time_end as Date
                    ).toDateString()}`
                  }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <CIcon :icon="cilClock" class="h-5 w-5 opacity-40" />
                  <span>{{
                    `${(
                      eventDetails?.date_time_start as Date
                    ).toLocaleTimeString()} - ${(
                      eventDetails.date_time_end as Date
                    ).toLocaleTimeString()}`
                  }}</span>
                </div>
              </div>
            </div>
            <div class="space-y-2 lg:space-y-4">
              <h5 class="text-sm font-semibold">Place</h5>
              <button
                disabled
                class="rounded-lg border px-4 py-2 text-xs opacity-50 lg:text-sm"
              >
                Default Place
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-4 flex w-full flex-col gap-2 rounded-lg border bg-white py-4 lg:w-4/6"
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
              class="text-xs font-medium opacity-50 lg:text-sm"
              >No created tickets</span
            >
            <div v-else>
              <div
                v-for="(ticket, index) in eventDetails.ticket_types"
                :key="ticket.id"
                class="flex w-96 flex-1 rounded-lg border bg-slate-50 px-4 py-3 shadow-sm"
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
                  <button
                    @click="
                      () => {
                        selectedTicketIndex = index;
                        isEditTicketModalOpen = true;
                      }
                    "
                    class="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-white"
                  >
                    <CIcon :icon="cilPen" class="h-4 w-4" />
                  </button>
                  <button
                    @click="
                      () =>
                        (eventDetails.ticket_types =
                          eventDetails.ticket_types.filter(
                            (ticket, ticketIndex) => ticketIndex !== index,
                          ))
                    "
                    class="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500 text-white"
                  >
                    <CIcon :icon="cilTrash" class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="defaultOutline"
            @click="isCreateTicketModalOpen = true"
            class="mt-4 space-x-2 border-blue-200 bg-blue-500 text-white hover:bg-blue-400"
          >
            <CIcon :icon="cilPlus" class="h-4 w-4" />
            <span class="text-xs lg:text-sm">Create Ticket</span>
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
      class="sticky bottom-0 z-20 flex h-14 w-full items-center justify-between border-t border-t-slate-300 bg-white p-4"
    >
      <div class="hidden text-center lg:block">
        <p class="text-sm">Create or save it to draft</p>
      </div>
      <div class="flex flex-1 gap-4 lg:w-auto lg:flex-none">
        <button
          class="flex-1 rounded-lg border bg-slate-50 px-4 py-2 text-xs lg:flex-none lg:text-sm"
        >
          Save to Draft
        </button>
        <Button
          variant="defaultOutline"
          @click="createEvent"
          class="flex-1 text-sm lg:flex-none"
        >
          Create
        </Button>
      </div>
    </div>
    <UserDetailsNotCreatedModal v-if="isUserDetailsInvalid" />
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
      v-if="isCreateTicketModalOpen"
      @close-modal="isCreateTicketModalOpen = false"
      @update-tickets="
        (newTicket) =>
          (eventDetails.ticket_types = [
            ...eventDetails.ticket_types,
            newTicket,
          ])
      "
    />
    <EditEventTicketsModal
      v-if="isEditTicketModalOpen"
      :ticket-details="eventDetails.ticket_types[selectedTicketIndex]"
      @close-modal="isEditTicketModalOpen = false"
      @update-tickets="
        (updatedTicket) =>
          (eventDetails.ticket_types[selectedTicketIndex] = updatedTicket)
      "
    />
  </main>
</template>
