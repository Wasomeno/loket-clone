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
import ChevronLeft from "~/components/icons/chevron-left.vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventType } from "~/types/event";

definePageMeta({ middleware: "auth" });

const route = useRoute();

const eventDetailsCache = useNuxtData(`eventDetails/${route.params.eventId}`);

const { data: eventDetails } = await useFetch<EventType>(
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

          <div class="flex items-center gap-2">
            <Button class="gap-3 text-sm">
              <CIcon :icon="cilPencil" class="h-3 w-3 lg:h-4 lg:w-4" />
              <span class="hidden lg:inline-block">Edit</span>
            </Button>
            <Button class="gap-3 bg-red-800 text-sm hover:bg-red-700">
              <CIcon :icon="cilTrash" class="h-3 w-3 lg:h-4 lg:w-4" />
              <span class="hidden lg:inline-block">Remove</span>
            </Button>
          </div>
        </div>
        <div class="flex-1 space-y-6 rounded-lg border bg-white p-4">
          <div>
            <h2 class="mb-2 font-medium">Event Details</h2>
            <div class="flex flex-1 flex-wrap gap-10">
              <div class="overflow-hidden rounded-lg border shadow-sm lg:w-96">
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
          <div>
            <h2 class="mb-2 font-medium">Ticket Sale Details</h2>
            <div class="grid flex-1 grid-cols-2 gap-4 lg:grid-cols-3">
              <div
                class="col-span-1 flex h-20 flex-col gap-2 rounded-lg border bg-white px-6 py-4 shadow-sm lg:h-28"
              >
                <span class="text-sm font-medium opacity-50 lg:text-base"
                  >Tickets Sold</span
                >
                <span class="text-end text-lg font-medium lg:text-2xl">0</span>
              </div>
              <div
                class="col-span-1 flex h-20 flex-col gap-2 rounded-lg border bg-white px-6 py-4 shadow-sm lg:h-28"
              >
                <span class="text-sm font-medium opacity-50 lg:text-base"
                  >Sales</span
                >
                <span class="text-end text-lg font-medium lg:text-2xl"
                  >Rp 0</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
