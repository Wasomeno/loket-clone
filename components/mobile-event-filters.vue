<script setup lang="ts">
import { cilLoopCircular, cilX } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { EVENT_API_MAIN, timeMap } from "~/lib/utils";
import { EventCategory } from "~/types/event";

const isFilterOpen = ref(false);

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
  <div class="lg:hidden">
    <button
      @click="isFilterOpen = !isFilterOpen"
      variant="defaultOutline"
      class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-start text-xs text-black hover:bg-slate-100 lg:text-sm"
    >
      Filter
    </button>
    <Modal
      v-if="isFilterOpen"
      :close-modal="() => (isFilterOpen = false)"
      class="flex h-5/6 flex-1 flex-col rounded-t-md bg-white"
    >
      <div class="flex-1">
        <div class="flex items-center justify-between border-b px-4 py-2">
          <h3 class="text-sm font-semibold tracking-wide">Filter</h3>
          <button @click="isFilterOpen = false">
            <CIcon :icon="cilX" class="h-4 w-4" />
          </button>
        </div>
        <div class="border-b px-4 py-2">
          <button class="mb-2 w-full text-start text-sm font-medium">
            Categories
          </button>
          <div class="flex flex-col">
            <button
              v-for="category in categories"
              @click="
                parseInt($route.query.categoryId as string) !== category.id
                  ? setFilter('categoryId', category.id.toString())
                  : removeFilter('categoryId')
              "
              class="p-2 text-start text-sm"
              :class="{
                'font-medium text-blue-700':
                  parseInt($route.query.categoryId as string) === category.id,
              }"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        <div class="border-b px-4 py-2">
          <button class="mb-2 w-full text-start text-sm font-medium">
            Time
          </button>
          <div class="flex flex-col">
            <button
              v-for="time in timeFilter"
              @click="
                $route.query.time !== time.key
                  ? setFilter('time', time.key)
                  : removeFilter('time')
              "
              class="p-2 text-start text-sm"
              :class="{
                'font-medium text-blue-700': $route.query.time === time.key,
              }"
            >
              {{ time.title }}
            </button>
          </div>
        </div>
      </div>
      <div class="px-4 py-2">
        <button
          @click="router.push(route.path)"
          class="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-900 text-white"
        >
          Reset
          <CIcon :icon="cilLoopCircular" class="h-4 w-4" />
        </button>
      </div>
    </Modal>
  </div>
</template>
