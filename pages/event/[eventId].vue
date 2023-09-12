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
    <main
      class="flex min-h-screen flex-col items-center gap-4 bg-slate-50 py-4 lg:gap-6 lg:py-6"
    >
      <div
        class="flex w-11/12 flex-col items-center gap-4 lg:w-5/6 lg:flex-row lg:gap-6"
      >
        <div
          class="h-40 w-full rounded-xl bg-blue-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:h-80"
        />
        <div
          class="flex w-full flex-col justify-between rounded-xl shadow-none lg:h-80 lg:w-96 lg:px-6 lg:pt-6 lg:shadow-md"
        >
          <div class="py-2">
            <h1 class="mb-2 text-base font-semibold lg:mb-4 lg:text-xl">
              {{ eventDetailsCache?.data.value.title }}
            </h1>
            <div class="flex flex-col gap-2">
              <span class="text-sm lg:text-base">{{
                new Date(
                  eventDetailsCache?.data.value.date_time_start,
                ).toDateString()
              }}</span>
              <span class="text-sm lg:text-base"
                >{{
                  `${new Date(
                    eventDetailsCache?.data.value.date_time_start,
                  ).toLocaleTimeString()} - ${new Date(
                    eventDetailsCache?.data.value.date_time_end,
                  ).toLocaleTimeString()}`
                }}
              </span>
              <span class="text-sm lg:text-base">{{
                eventDetailsCache?.data.value.place
              }}</span>
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
      <div
        class="flex w-11/12 flex-col items-center justify-center lg:w-5/6 lg:flex-row lg:items-start lg:gap-6"
      >
        <div class="w-full">
          <div class="flex items-start">
            <button
              @click="activeTab = 'description'"
              class="w-3/6 border-b-2 pb-2 text-center text-sm font-medium transition duration-200 lg:text-base"
              :class="{ 'border-b-blue-900': activeTab === 'description' }"
            >
              Description
            </button>
            <button
              @click="activeTab = 'ticket'"
              class="w-3/6 border-b-2 pb-2 text-center text-sm font-medium transition duration-200 lg:text-base"
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
              <h4
                class="border-l-4 border-l-blue-800 pl-2 text-sm font-medium lg:text-lg"
              >
                Terms of Services
              </h4>
              <p></p>
            </div>
          </div>
          <div class="py-6" v-else>
            <h3 class="mb-2 text-sm font-semibold lg:text-lg">
              Online Tickets
            </h3>
            <h4 class="mb-6 text-xs lg:text-base">
              Price starts from Rp 500.000
            </h4>
            <div class="flex w-full flex-col gap-4">
              <BuyTicketCard
                v-for="eventTicketDetails in eventDetailsCache?.data.value
                  .ticket_types"
                :key="eventDetails?.id"
                :ticket-details="eventTicketDetails"
              />
            </div>
          </div>
        </div>
        <div
          class="sticky bottom-0 flex h-20 w-96 items-center rounded-xl border-t bg-white p-6 shadow-md lg:border-none"
        >
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
