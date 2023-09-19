<script setup lang="ts">
import { cilCalendar, cilClock } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventType, User } from "~/types/event";

useHead({ title: "My Events | Loket" });
definePageMeta({ middleware: "auth" });

const session = useAuth();

const { data: userDetails } = await useFetch<User>(
  `${EVENT_API_MAIN}/users/${session.data.value?.user?.email}`,
);

const { data: events } = useFetch<EventType[]>(
  `${EVENT_API_MAIN}/creators/${userDetails.value?.event_creator_id}/events`,
);
</script>

<template>
  <NuxtLayout>
    <main class="flex min-h-screen flex-1 bg-slate-50">
      <div class="flex-1 space-y-4 px-6 py-4">
        <h1 class="text-base font-medium lg:text-xl">My Events</h1>
        <div
          v-if="events"
          class="flex flex-wrap items-center justify-center gap-4 lg:justify-normal"
        >
          <NuxtLink
            v-for="event in events"
            :key="event.id"
            :to="`/my-events/${event.id}`"
            class="w-full lg:w-72"
          >
            <div
              class="w-full overflow-hidden rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            >
              <img
                class="h-36 w-full"
                :src="event.banner_image"
                alt="event-banner-img "
              />
              <div class="px-4">
                <div class="flex flex-col gap-2 py-6">
                  <span class="line-clamp-1 text-sm font-medium">{{
                    event.title
                  }}</span>
                  <div class="flex items-center gap-3 text-sm">
                    <CIcon :icon="cilCalendar" class="h-4 w-4" />
                    {{
                      new Date(event.date_time_start as string).toDateString()
                    }}
                  </div>
                  <div class="flex items-center gap-3 text-sm">
                    <CIcon :icon="cilClock" class="h-4 w-4" />
                    {{
                      new Date(
                        event.date_time_start as string,
                      ).toLocaleTimeString()
                    }}
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-else="events" class="flex flex-wrap items-center gap-4">
          <div
            v-for="n in 3"
            class="w-full overflow-hidden rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:w-72"
          >
            <Skeleton class="h-36 w-full rounded-none" />
            <div class="px-4">
              <div class="flex flex-col gap-2 py-6">
                <Skeleton class="h-[18px] w-40 rounded-lg" />
                <Skeleton class="h-[18px] w-32 rounded-lg" />
                <Skeleton class="h-[18px] w-40 rounded-lg" />
              </div>
              <div class="border-t border-t-slate-300 py-4">
                <div class="flex items-center gap-4">
                  <Skeleton class="h-7 w-7 rounded-full" />
                  <Skeleton class="h-[16px] w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
