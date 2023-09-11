<script setup lang="ts">
import { EVENT_API_MAIN, sortMap, timeMap } from "~/lib/utils";
import { EventType } from "~/types/event";

useHead({ title: "Discover Events | Loket" });

const route = useRoute();

const activeSortKey = ref(route.query.sort);
const activeSort = ref(sortMap.get(route.query.sort as string)?.value);
const categoryFilter = ref(route.query.categoryId);
const timeFilterKey = ref(route.query.time);
const timeFilterDate = ref(
  timeMap.get(route.query.time as string)?.value.toDateString(),
);

const {
  pending,
  data: events,
  refresh,
} = await useFetch<EventType[]>(() => `${EVENT_API_MAIN}/events`, {
  query: {
    categoryId: categoryFilter,
    time: timeFilterDate,
    sort: activeSort,
  },
});

onBeforeRouteUpdate(({ query }) => {
  activeSortKey.value = query.sort;
  activeSort.value = sortMap.get(query.sort as string)?.value;
  categoryFilter.value = query.categoryId;
  timeFilterKey.value = query.time;
  timeFilterDate.value = timeMap
    .get(query.time as string)
    ?.value.toDateString();
});
</script>

<template>
  <NuxtLayout>
    <main class="flex min-h-screen flex-1 bg-slate-50 pb-4">
      <EventFilters
        @set-category-filter="(categoryId) => (categoryFilter = categoryId)"
        @set-time-filter="
          (timeKey, timeDate) => {
            timeFilterKey = timeKey;
            timeFilterDate = timeDate;
          }
        "
      />
      <div class="w-full px-4 lg:w-5/6">
        <div class="my-4 flex items-center justify-end gap-2">
          <MobileEventFilters />
          <EventSorter />
        </div>
        <div class="grid grid-cols-4 gap-6">
          <div
            v-if="!pending && (events?.length as number) < 1"
            class="col-span-4 flex h-96 flex-col items-center justify-center opacity-50"
          >
            <span>No active events</span>
          </div>
          <NuxtLink
            v-if="!pending && (events?.length as number) > 0"
            v-for="event in events"
            :to="`/event/${event.id}`"
            class="col-span-4 lg:col-span-1"
          >
            <div
              class="overflow-hidden rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            >
              <div class="h-24 bg-slate-300 lg:h-36" />
              <div class="px-4">
                <div class="flex flex-col gap-2 py-4 lg:py-6">
                  <span class="text-sm lg:text-base">{{ event.title }}</span>
                  <span class="text-xs opacity-50 lg:text-base">{{
                    new Date(event.date_time_start as string).toDateString()
                  }}</span>
                  <span class="text-sm font-semibold lg:text-base"
                    >Rp {{ event.min_ticket_price?.toLocaleString("id") }}</span
                  >
                </div>
                <div class="border-t border-t-slate-300 py-3 lg:py-4">
                  <div class="flex items-center gap-4">
                    <div class="h-7 w-7 rounded-full bg-blue-300" />
                    <span class="text-xs font-medium opacity-50">{{
                      event?.creator?.name
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
          <div
            v-if="pending"
            v-for="event in 3"
            class="col-span-4 overflow-hidden rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:col-span-1"
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
