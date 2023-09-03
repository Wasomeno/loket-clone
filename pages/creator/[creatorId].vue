<script setup lang="ts">
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventCreator } from "~/types/event";
import { reactive } from "vue";

type ActiveTab = {
  activeTab: "active" | "past";
  isActiveTab: boolean;
  isPastTab: boolean;
};

const tabStates = reactive<ActiveTab>({
  activeTab: "active",
  isActiveTab: true,
  isPastTab: false,
});

const route = useRoute();

const { data: eventCreatorDetails } = useFetch<EventCreator>(
  `${EVENT_API_MAIN}/creators/${route.params.creatorId}`,
);

useHead({ title: `${eventCreatorDetails.value?.name} | Event Creator` });

function setActiveTab(tab: "active" | "past") {
  tabStates.activeTab = tab;
  tabStates.isActiveTab = tab === "active";
  tabStates.isPastTab = tab === "past";
}
</script>

<template>
  <NuxtLayout
    ><main
      class="flex min-h-screen w-full flex-1 flex-col items-center gap-6 bg-slate-50"
    >
      <div class="w-5/6 flex-1 bg-white">
        <div class="h-60 bg-blue-100" />
        <div class="h-8 bg-white">
          <div class="flex w-72 items-center justify-center">
            <div class="-mt-40 h-52 w-52 rounded-full bg-gray-200" />
          </div>
        </div>
        <div class="flex h-24 items-center bg-white px-6">
          <h1 class="text-xl font-semibold">
            {{ eventCreatorDetails?.name }}
          </h1>
        </div>
        <div class="flex flex-col gap-6 bg-white px-6">
          <div class="flex items-center gap-6">
            <button
              @click="setActiveTab('active')"
              class="p-3"
              :class="{ 'border-b-2 border-b-blue-800': tabStates.isActiveTab }"
            >
              Active Events
            </button>
            <button
              @click="setActiveTab('past')"
              class="p-3"
              :class="{ 'border-b-2 border-b-blue-800': tabStates.isPastTab }"
            >
              Past Events
            </button>
          </div>
          <div v-if="tabStates.isActiveTab" class="grid grid-cols-4 gap-x-6">
            <EventItemCard
              v-for="event in eventCreatorDetails?.events_created"
              :event-details="event"
            />
          </div>

          <div v-else class="grid grid-cols-4 gap-x-6">
            <div class="col-span-4 flex h-72 items-center justify-center">
              <span class="font-medium opacity-50">No Past Events</span>
            </div>
          </div>
        </div>
      </div>
    </main></NuxtLayout
  >
</template>
