<script setup lang="ts">
import { cilCalendar, cilClock } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventType, User } from "~/types/event";

definePageMeta({
  layout: "user-dashboard-layout",
});

const session = useAuth();

const { data: userDetails } = await useFetch<User>(
  `${EVENT_API_MAIN}/users/${session.data.value?.user?.email}`,
);

const { data: events } = useFetch<EventType[]>(
  `${EVENT_API_MAIN}/creators/${userDetails.value?.event_creator_id}/events`,
);

console.log(events.value);
</script>

<template>
  <NuxtLayout>
    <div class="flex-1 space-y-4 px-6 py-4">
      <h1 class="text-xl font-medium">My Events</h1>
      <div class="grid grid-cols-5">
        <NuxtLink v-for="event in events" :to="`/dashboard/events/${event.id}`">
          <div
            class="col-span-1 overflow-hidden rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          >
            <img
              class="h-36 w-full"
              :src="event.banner_image"
              alt="event-banner-img "
            />
            <div class="px-4">
              <div class="flex flex-col gap-2 py-6">
                <span class="text-sm font-medium">{{ event.title }}</span>
                <div class="flex items-center gap-3 text-sm">
                  <CIcon :icon="cilCalendar" class="h-4 w-4" />
                  {{ new Date(event.date_time_start).toDateString() }}
                </div>
                <div class="flex items-center gap-3 text-sm">
                  <CIcon :icon="cilClock" class="h-4 w-4" />
                  {{ new Date(event.date_time_start).toLocaleTimeString() }}
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <!-- <div
        class="flex h-[700px] flex-1 flex-col items-center justify-center gap-2 rounded-lg border bg-white p-4"
      >
        <div>
          <span class="opacity-50">No active events</span>
          <NuxtLink to="/create-event">
            <Button class="text-xs text-white"> Create Here </Button>
          </NuxtLink>
        </div>
      </div> -->
    </div>
  </NuxtLayout>
</template>
