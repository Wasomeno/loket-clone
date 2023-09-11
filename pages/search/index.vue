<script setup lang="ts">
import { cilX } from "@coreui/icons";
import CIcon from "@coreui/icons-vue";
import { EVENT_API_LOCAL } from "~/lib/utils";
import { EventCreator, EventType } from "~/types/event";

const { query } = useRoute();
const searchResults = useFetch<{
  events: EventType[];
  regions: any[];
  eventCreators: EventCreator[];
}>(`${EVENT_API_LOCAL}/search/${query.q}`);

const events = searchResults.data.value?.events;
const regions = searchResults.data.value?.regions;
const eventCreators = searchResults.data.value?.eventCreators;
const isResultsExists =
  events?.length && eventCreators?.length && regions?.length;
</script>

<template>
  <NuxtLayout>
    <main
      class="flex min-h-screen w-full flex-1 flex-col items-center gap-6 bg-slate-50 pb-6"
    >
      <div v-if="events?.length" class="mt-6 w-5/6 space-y-6">
        <h2 class="text-xl font-semibold">
          Event with the word "{{ $route.query.q }}"
        </h2>
        <div class="grid grid-cols-4 gap-x-6">
          <EventItemCard v-for="event in events" :event-details="event" />
        </div>
      </div>
      <div v-if="eventCreators?.length" class="mt-6 w-5/6 space-y-6">
        <h2 class="text-xl font-semibold">Event Creators</h2>
        <div class="grid grid-cols-6 gap-x-6">
          <EventCreatorCard v-for="eventCreator in eventCreators" />
        </div>
      </div>
      <div v-if="regions?.length" class="mt-6 w-5/6 space-y-6">
        <h2 class="text-xl font-semibold">Search Based on Cities</h2>
        <div class="grid grid-cols-10 gap-x-6">
          <div
            v-for="region in regions"
            class="col-span-2 flex flex-col items-center gap-2"
          >
            <div class="h-36 w-full rounded-xl bg-blue-200" />
            <span class="font-medium">{{ region.name }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="!isResultsExists && !searchResults.pending.value"
        class="flex flex-1 flex-col items-center justify-center gap-2 opacity-50"
      >
        <span class="font-medium">No results</span>
        <CIcon :icon="cilX" class="h-6 w-6" />
      </div>
    </main>
  </NuxtLayout>
</template>
