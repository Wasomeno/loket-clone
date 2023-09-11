<script setup lang="ts">
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventType } from "~/types/event";

useHead({ title: "Loket | Create & Manager your own event" });

const { data } = await useFetch<EventType[]>(`${EVENT_API_MAIN}/events`);

const events = toRaw(data.value);
</script>
<template>
  <NuxtLayout>
    <main
      class="flex w-full flex-col items-center gap-4 overflow-hidden py-6 lg:gap-10"
    >
      <div class="h-36 w-11/12 rounded-lg bg-slate-500 lg:h-72 lg:w-5/6" />
      <div class="flex w-full flex-col gap-4 lg:w-5/6 lg:gap-4">
        <h2 class="px-4 text-sm font-semibold lg:text-xl">
          Recommended Events
        </h2>
        <div class="flex items-center overflow-x-scroll lg:overflow-x-visible">
          <div class="grid min-w-max grid-cols-4 gap-4 px-4 pb-4">
            <EventItemCard
              v-for="event in events"
              :key="event.id"
              :event-details="event"
            />
          </div>
        </div>
      </div>
      <div class="flex w-full justify-center bg-blue-950 py-4 lg:py-6">
        <div class="flex w-11/12 flex-col gap-4 lg:w-5/6">
          <h2 class="text-sm font-semibold text-slate-50 lg:text-xl">
            Trending Events
          </h2>
          <div class="grid grid-cols-3 gap-x-8 overflow-x-scroll">
            <div class="col-span-1 h-24 rounded-lg bg-slate-50 lg:h-40" />
            <div class="col-span-1 h-24 rounded-lg bg-slate-50 lg:h-40" />
            <div class="col-span-1 h-24 rounded-lg bg-slate-50 lg:h-40" />
          </div>
        </div>
      </div>
      <div class="flex w-full flex-col gap-4 lg:w-5/6 lg:gap-4">
        <h2 class="px-4 text-sm font-semibold lg:text-xl">Music Events</h2>
        <div class="flex items-center overflow-x-scroll lg:overflow-x-visible">
          <div class="grid min-w-max grid-cols-4 gap-4 px-4 pb-4">
            <EventItemCard
              v-for="event in events"
              :key="event.id"
              :event-details="event"
            />
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
