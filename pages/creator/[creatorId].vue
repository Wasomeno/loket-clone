<script setup lang="ts">
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventCreator } from "~/types/event";

type ActiveTab = "active" | "past";

const activeTab = ref<ActiveTab>("active");
const route = useRoute();

const { data: eventCreatorDetails } = await useFetch<EventCreator>(
  `${EVENT_API_MAIN}/creators/${route.params.creatorId}`,
);

useHead({ title: `${eventCreatorDetails.value?.name} | Event Creator` });
</script>

<template>
  <NuxtLayout>
    <main
      class="flex min-h-screen w-full flex-1 flex-col items-center gap-6 bg-slate-50"
    >
      <div class="w-full flex-1 bg-white py-4 lg:w-5/6">
        <div class="flex h-16 items-center bg-white px-6">
          <h1 class="text-xl font-semibold">
            {{ eventCreatorDetails?.name }}
          </h1>
        </div>
        <div class="flex flex-col gap-6 bg-white px-6">
          <div class="flex items-center gap-6">
            <button
              @click="activeTab = 'active'"
              class="p-3 text-sm lg:text-base"
              :class="{
                'border-b-2 border-b-blue-800': activeTab === 'active',
              }"
            >
              Active Events
            </button>
            <button
              @click="activeTab = 'past'"
              class="p-3 text-sm lg:text-base"
              :class="{ 'border-b-2 border-b-blue-800': activeTab === 'past' }"
            >
              Past Events
            </button>
          </div>
          <div
            v-if="activeTab === 'active'"
            class="grid grid-cols-4 gap-4 lg:gap-6"
          >
            <NuxtLink
              v-for="event in eventCreatorDetails?.events_created"
              :key="event.id"
              :to="`/event/${event.id}`"
              class="col-span-4 lg:col-span-1"
            >
              <div
                class="overflow-hidden rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              >
                <div class="h-32 bg-slate-300 lg:h-36">
                  <NuxtImg :src="event.banner_image" class="h-full w-full" />
                </div>
                <div class="px-4">
                  <div class="flex flex-col gap-2 py-4 lg:py-6">
                    <span class="line-clamp-1 text-sm lg:text-base">{{
                      event.title
                    }}</span>
                    <span class="text-xs opacity-50 lg:text-base">{{
                      new Date(event.date_time_start as string).toDateString()
                    }}</span>
                    <span class="text-sm font-semibold lg:text-base"
                      >Rp
                      {{ event.min_ticket_price?.toLocaleString("id") }}</span
                    >
                  </div>
                  <div class="border-t border-t-slate-300 py-3 lg:py-4">
                    <div class="flex items-center gap-4">
                      <div
                        class="h-10 w-10 overflow-hidden rounded-full border-2 bg-blue-300"
                      >
                        <NuxtImg :src="event.creator?.image_logo" />
                      </div>
                      <span class="text-xs font-medium opacity-50">{{
                        event?.creator?.name
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div v-else class="grid grid-cols-4 gap-x-6">
            <div class="col-span-4 flex h-72 items-center justify-center">
              <span class="font-medium opacity-50">No Past Events</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
