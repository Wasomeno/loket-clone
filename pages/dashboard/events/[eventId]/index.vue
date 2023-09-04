<script setup lang="ts">
import {
  cilCalendar,
  cilClock,
  cilLocationPin,
  cilMusicNote,
  cilPencil,
  cilTrash,
} from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventType } from "~/types/event";

definePageMeta({
  layout: "user-dashboard-layout",
});

const route = useRoute();

const eventDetailsCache = useNuxtData(`eventDetails/${route.params.eventId}`);

const { data: eventDetails } = await useFetch<EventType>(
  `${EVENT_API_MAIN}/events/${route.params.eventId}`,
  {
    key: `eventDetails/${route.params.eventId}`,
    immediate: eventDetailsCache.data.value === null,
  },
);
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-1 flex-col space-y-4 px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-medium">
          {{ eventDetailsCache?.data.value.title }}
        </h1>
        <div class="flex items-center gap-2">
          <Button class="gap-3 text-sm">
            <CIcon :icon="cilPencil" class="h-4 w-4" /> Edit
          </Button>
          <Button class="gap-3 bg-red-800 text-sm hover:bg-red-700">
            <CIcon :icon="cilTrash" class="h-4 w-4" /> Remove
          </Button>
        </div>
      </div>
      <div class="flex-1 space-y-6 rounded-lg border bg-white p-4">
        <div>
          <h2 class="mb-2 font-medium">Event Details</h2>
          <div class="flex flex-1 gap-10">
            <div class="w-96 overflow-hidden rounded-lg border shadow-sm">
              <img
                :src="eventDetailsCache?.data.value.banner_image"
                class="h-72 object-top"
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
                    <CIcon :icon="cilLocationPin" class="h-4 w-4 opacity-50" />
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
        <div>
          <h2 class="mb-2 font-medium">Ticket Sale Details</h2>
          <div class="grid flex-1 grid-cols-3 gap-4">
            <div
              class="col-span-1 flex h-28 flex-col gap-2 rounded-lg border bg-white px-6 py-4 shadow-sm"
            >
              <span class="font-medium opacity-50">Tickets Sold</span>
              <span class="text-end text-2xl font-medium">0</span>
            </div>
            <div
              class="col-span-1 flex h-28 flex-col gap-2 rounded-lg border bg-white px-6 py-4 shadow-sm"
            >
              <span class="font-medium opacity-50">Sales</span>
              <span class="text-end text-2xl font-medium">Rp 0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
