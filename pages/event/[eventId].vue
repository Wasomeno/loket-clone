<script setup lang="ts">
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventType } from "~/types/event";

type ActiveTab = "description" | "ticket";

const route = useRoute();

const eventDetailsCache = useNuxtData(`/event/${route.params.eventId}`);

const { data: eventDetails } = await useFetch<EventType>(
  `${EVENT_API_MAIN}/events/${route.params.eventId}`,
  {
    key: `/event/${route.params.eventId}`,
    immediate: eventDetailsCache.data.value === null,
  },
);

useHead({ title: `${eventDetailsCache.data.value?.title} | Event` });

const activeTab = ref<ActiveTab>("description");
</script>

<template>
  <NuxtLayout>
    <main class="flex min-h-screen flex-col items-center gap-6 bg-slate-50">
      <div class="mt-6 w-5/6">
        <span class="text-sm"> Home </span>
      </div>
      <div class="flex w-5/6 items-center gap-6">
        <div
          class="h-80 w-full rounded-xl bg-blue-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        />
        <div
          class="flex h-80 w-96 flex-col justify-between rounded-xl px-6 pt-6 shadow-md"
        >
          <div>
            <h1 class="mb-4 text-xl font-semibold">
              {{ eventDetailsCache?.data.value.title }}
            </h1>
            <div class="flex flex-col gap-2">
              <span>{{
                new Date(
                  eventDetailsCache?.data.value.date_time_start,
                ).toDateString()
              }}</span>
              <span
                >{{
                  `${new Date(
                    eventDetailsCache?.data.value.date_time_start,
                  ).toLocaleTimeString()} - ${new Date(
                    eventDetailsCache?.data.value.date_time_end,
                  ).toLocaleTimeString()}`
                }}
              </span>
              <span>{{ eventDetailsCache?.data.value.place }}</span>
            </div>
          </div>
          <RouterLink
            :to="`/creator/${eventDetailsCache?.data.value.creator_id}`"
          >
            <div
              class="flex items-center gap-4 border-t border-dashed border-slate-300 py-4"
            >
              <div class="h-9 w-9 rounded-full bg-blue-300" />
              <span class="text-sm font-medium">{{
                eventDetailsCache?.data.value.creator.name
              }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
      <div class="flex w-5/6 items-start justify-center gap-6">
        <div class="w-full">
          <div class="flex items-start">
            <button
              @click="activeTab = 'description'"
              class="w-3/6 border-b-2 pb-2 text-center font-medium transition duration-200"
              :class="{ 'border-b-blue-900': activeTab === 'description' }"
            >
              Description
            </button>
            <button
              @click="activeTab = 'ticket'"
              class="w-3/6 border-b-2 pb-2 text-center font-medium transition duration-200"
              :class="{ 'border-b-blue-900': activeTab === 'ticket' }"
            >
              Ticket
            </button>
          </div>
          <div class="py-6" v-if="activeTab === 'description'">
            <p class="mb-6 leading-7">
              {{ eventDetailsCache?.data.value.description }}
            </p>
            <div class="space-y-2">
              <h4 class="border-l-4 border-l-blue-800 pl-2 text-lg font-medium">
                Terms of Services
              </h4>
              <p></p>
            </div>
          </div>
          <div class="py-6" v-else>
            <h3 class="mb-2 text-lg font-semibold">Online Tickets</h3>
            <h4 class="mb-6">Price starts from Rp 500.000</h4>
            <div class="flex w-full flex-col gap-4">
              <BuyTicketCard
                v-for="eventTicketDetails in eventDetailsCache?.data.value
                  .ticket_types"
                :ticket-details="eventTicketDetails"
              />
            </div>
          </div>
        </div>
        <div class="flex h-20 w-96 items-center rounded-xl p-6 shadow-md">
          <button
            class="w-full rounded-lg bg-blue-800 p-2 font-medium text-white"
          >
            Buy Ticket
          </button>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
