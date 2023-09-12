<script setup lang="ts">
import { cilFlagAlt, cilX, cilZoom } from "@coreui/icons";
import CIcon from "@coreui/icons-vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventCreator, EventType } from "~/types/event";

type SearchResults = {
  events: EventType[];
  eventCreators: EventCreator[];
};

const emits = defineEmits<{
  "close-modal": [];
}>();

const searchQuery = ref("");
const searchResults = await useFetch<SearchResults>(
  () => `${EVENT_API_MAIN}/search/${searchQuery.value}`,
  {
    watch: [searchQuery],
    immediate: searchQuery.value !== "",
    timeout: 3000,
  },
);
</script>

<template>
  <Modal
    :close-modal="() => $emit('close-modal')"
    class="flex h-screen flex-1 flex-col rounded-none bg-white"
  >
    <div class="flex items-center justify-between border-b px-4 py-2">
      <span class="text-sm font-medium">Search</span>
      <button @click="$emit('close-modal')">
        <CIcon :icon="cilX" class="h-4 w-4" />
      </button>
    </div>
    <div class="mb-2 px-4 py-2">
      <div
        class="flex w-full items-center overflow-hidden rounded-lg border border-slate-300"
      >
        <div class="p-2">
          <CIcon :icon="cilZoom" class="h-3.5 w-3.5 opacity-40" />
        </div>
        <input
          v-model="searchQuery"
          type="string"
          class="w-full py-2 text-xs focus:outline-0"
          placeholder="Search for events"
        />
      </div>
    </div>
    <div
      v-if="searchResults.status.value === 'pending'"
      class="flex flex-1 items-center justify-center"
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        version="1.1"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 animate-spin text-blue-800"
      >
        <path
          d="M6.5 14.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5zM0 8c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5zM13 8c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5zM1.904 3.404c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5zM11.096 12.596c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5zM1.904 12.596c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5zM11.096 3.404c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5z"
        ></path>
      </svg>
    </div>
    <div v-else class="flex flex-col gap-4 px-4">
      <div
        v-if="
          searchResults.status.value === 'success' &&
          (searchResults.data.value?.events.length as number) > 0
        "
      >
        <div class="mb-3 text-sm font-medium">Events</div>
        <div class="flex flex-col gap-2">
          <NuxtLink
            v-for="event in searchResults.data.value?.events"
            :key="event.id"
            :to="`/event/${event.id}`"
          >
            <div
              class="flex items-center gap-2 rounded-lg border px-4 py-2 shadow-sm"
            >
              <CIcon :icon="cilFlagAlt" class="h-4 w-4 opacity-50" />
              <span class="text-xs">{{ event.title }}</span>
            </div></NuxtLink
          >
        </div>
      </div>
      <div
        v-else-if="
          searchResults.status.value === 'success' &&
          (searchResults.data.value?.eventCreators.length as number) > 0
        "
      >
        <div class="mb-3 text-sm font-medium">Event Creators</div>
        <div class="flex flex-col gap-2">
          <NuxtLink
            v-for="eventCreator in searchResults.data.value?.eventCreators"
            :key="eventCreator.id"
            :to="`/creator/${eventCreator.id}`"
          >
            <div
              class="flex items-center gap-2 rounded-lg border px-4 py-2 shadow-sm"
            >
              <div class="h-8 w-8 rounded-full bg-gray-200" />
              <span class="text-xs">{{ eventCreator.name }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </Modal>
</template>
