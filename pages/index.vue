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
      class="flex w-full flex-col items-center gap-10 overflow-hidden py-10"
    >
      <div class="h-72 w-5/6 rounded-lg bg-slate-500" />
      <div class="flex w-5/6 flex-col gap-10">
        <h2 class="text-xl font-semibold">Recommended Events</h2>
        <div class="grid grid-cols-4 gap-x-6">
          <EventItemCard
            v-if="data !== null"
            v-for="event in events"
            :key="event.id"
            :event-details="event"
          />
          <EventItemCardSkeleton v-else />
        </div>
      </div>
      <div class="flex w-full justify-center bg-blue-950 py-6">
        <div class="flex w-5/6 flex-col gap-4">
          <h2 class="text-xl font-semibold text-slate-50">Trending Events</h2>
          <div class="grid grid-cols-3 gap-x-8">
            <div class="col-span-1 h-40 rounded-lg bg-slate-50" />
            <div class="col-span-1 h-40 rounded-lg bg-slate-50" />
            <div class="col-span-1 h-40 rounded-lg bg-slate-50" />
          </div>
        </div>
      </div>
      <div class="flex w-5/6 flex-col gap-10">
        <h2 class="text-xl font-semibold">Music Events</h2>
        <div class="grid grid-cols-4 gap-6">
          <EventItemCard
            v-for="event in events"
            :key="event.id"
            :event-details="event"
          />
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
