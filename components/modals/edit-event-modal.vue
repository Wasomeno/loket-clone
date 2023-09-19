<script setup lang="ts">
import { cilX } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventCategory, EventType } from "~/types/event";
import axios from "axios";

const props = defineProps<{
  eventDetails: EventType;
}>();

const emits = defineEmits<{
  "close-modal": [];
  "refresh-event-data": [];
}>();

const isCategoryListOpen = ref(false);

const { data: categories } = useFetch<EventCategory[]>(
  `${EVENT_API_MAIN}/categories`,
);

const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const eventDetails = reactive<EventType>({
  ...props.eventDetails,
  date_time_start: convertToDateTimeLocalString(
    new Date(props.eventDetails.date_time_start as string),
  ),
  date_time_end: convertToDateTimeLocalString(
    new Date(props.eventDetails.date_time_end as string),
  ),
});

const route = useRoute();

async function updateEvent() {
  const { data } = await axios.put(
    `${EVENT_API_MAIN}/events/${route.params.eventId}`,
    {
      ...eventDetails,
      date_time_start: new Date(eventDetails.date_time_start as string),
      date_time_end: new Date(eventDetails.date_time_end as string),
    },
  );
  emits("refresh-event-data");
}
</script>

<template>
  <Modal class="flex flex-1 flex-col bg-white lg:h-5/6 lg:w-3/6">
    <div class="flex items-center justify-between border-b px-6 py-4">
      <h5 class="text-sm font-medium lg:text-base">Update Event</h5>
      <button @click="$emit('close-modal')" class="h-4 w-4 font-medium">
        <CIcon :icon="cilX" />
      </button>
    </div>
    <div class="flex flex-1 flex-col overflow-y-scroll">
      <form
        @submit="
          (event) => {
            event.preventDefault();
            updateEvent();
          }
        "
        class="flex flex-1 flex-col px-6 py-4"
      >
        <div class="flex flex-1 flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-xs lg:text-sm">Banner Image</label>
            <img
              :src="eventDetails.banner_image"
              alt="event-banner-image"
              class="h-32 w-full rounded-lg lg:h-44"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs lg:text-sm">Name</label>
            <input
              type="text"
              v-model="eventDetails.title"
              class="rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs lg:text-sm">Category</label>
            <div class="relative w-72">
              <button
                @click="isCategoryListOpen = !isCategoryListOpen"
                type="button"
                class="flex w-full items-center justify-between rounded-lg border bg-slate-50 px-4 py-2 text-left text-sm"
              >
                {{ eventDetails.category?.name }}
                <ChevronRight class="h-3 w-3 opacity-40" />
              </button>
              <div
                v-if="isCategoryListOpen"
                class="absolute z-20 flex w-full flex-col overflow-hidden rounded-b-lg border"
              >
                <button
                  type="button"
                  v-for="category in categories"
                  @click="
                    () => {
                      eventDetails.category = category;
                      isCategoryListOpen = false;
                    }
                  "
                  class="border-b bg-white px-4 py-2 text-start text-sm hover:bg-slate-100"
                >
                  {{ category.name }}
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs lg:text-sm">Place</label>
            <input
              type="text"
              v-model="eventDetails.place"
              class="rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
            />
          </div>
          <div class="flex flex-1 flex-wrap items-center gap-4">
            <div class="flex flex-1 flex-col gap-2">
              <label class="text-xs lg:text-sm">Event Start Date & Time</label>
              <input
                type="datetime-local"
                v-model="eventDetails.date_time_start"
                class="rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
              />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <label class="text-xs lg:text-sm">Event End Date & Time</label>
              <input
                type="datetime-local"
                v-model="eventDetails.date_time_end"
                class="rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs lg:text-sm">Description</label>
            <textarea
              v-model="eventDetails.description"
              class="h-40 rounded-lg border bg-slate-50 px-4 py-2 text-sm focus:outline-none lg:text-base"
            />
          </div>
        </div>
        <Button
          variant="defaultOutline"
          class="mt-4 w-full bg-blue-500 text-sm font-medium text-white hover:bg-blue-400"
        >
          Update
        </Button>
      </form>
    </div>
  </Modal>
</template>
