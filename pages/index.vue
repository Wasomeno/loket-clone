<script setup lang="ts">
import HomeBannerSlider from "~/components/home-banner-slider.vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventType } from "~/types/event";

useHead({ title: "Loket | Create & Manager your own event" });

const { data: events } = await useFetch<EventType[]>(
  `${EVENT_API_MAIN}/events`,
);
</script>
<template>
  <NuxtLayout>
    <main
      class="flex w-full flex-col items-center gap-4 overflow-hidden py-6 lg:gap-10"
    >
      <HomeBannerSlider />
      <div class="flex w-full flex-col gap-4 lg:w-5/6 lg:gap-4">
        <h2 class="px-4 text-sm font-semibold lg:px-0 lg:text-xl">
          Recommended Events
        </h2>
        <div
          class="flex items-center gap-4 overflow-x-scroll px-4 pb-4 lg:overflow-x-visible lg:px-0 lg:pb-0"
        >
          <EventItemCard
            v-for="event in events"
            :key="event.id"
            :event-details="event"
          />
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
      <div class="flex w-full flex-col gap-4 lg:w-5/6">
        <h2 class="px-4 text-sm font-semibold lg:px-0 lg:text-xl">
          Music Events
        </h2>
        <div
          class="flex items-center gap-4 overflow-x-scroll px-4 pb-4 lg:overflow-x-visible lg:px-0 lg:pb-0"
        >
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
