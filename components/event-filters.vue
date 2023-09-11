<script setup lang="ts">
import { cilLoopCircular } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { EVENT_API_MAIN, timeMap } from "~/lib/utils";
import { EventCategory } from "~/types/event";

const router = useRouter();
const route = useRoute();

function setFilter(key: string, value: string) {
  const filterParams = new URLSearchParams(
    route.query as Record<string, string>,
  );
  filterParams.set(key, value);
  router.push(`${route.path}?${filterParams.toString()}`);
}

function removeFilter(key: string) {
  const filterParams = new URLSearchParams(
    route.query as Record<string, string>,
  );
  filterParams.delete(key);
  router.push(`${route.path}?${filterParams.toString()}`);
}

const timeFilter = Array.from(timeMap, (item) => ({
  key: item[0],
  ...item[1],
}));

const { data: categories } = await useFetch<EventCategory[]>(
  `${EVENT_API_MAIN}/categories`,
);
</script>

<template>
  <div class="hidden w-3/12 space-y-4 border-r-2 px-6 py-4 lg:block">
    <div class="flex w-full items-center justify-between border-b pb-2">
      <h3 class="text-xl font-semibold tracking-wide">Filter</h3>
      <button @click="router.push(route.path)">
        <CIcon :icon="cilLoopCircular" class="h-5 w-5" />
      </button>
    </div>
    <div class="border-b pb-2">
      <button class="mb-2 w-full text-start font-medium">Categories</button>
      <div class="flex flex-col gap-2">
        <button
          v-for="category in categories"
          @click="
            parseInt($route.query.categoryId as string) !== category.id
              ? setFilter('categoryId', category.id.toString())
              : removeFilter('categoryId')
          "
          class="p-1 text-start text-sm"
          :class="{
            'font-medium text-blue-700':
              parseInt($route.query.categoryId as string) === category.id,
          }"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
    <div class="border-b pb-2">
      <button class="mb-2 w-full text-start font-medium">Time</button>
      <div class="flex flex-col gap-2">
        <button
          v-for="time in timeFilter"
          @click="
            $route.query.time !== time.key
              ? setFilter('time', time.key)
              : removeFilter('time')
          "
          class="p-1 text-start text-sm"
          :class="{
            'font-medium text-blue-700': $route.query.time === time.key,
          }"
        >
          {{ time.title }}
        </button>
      </div>
    </div>
  </div>
</template>
