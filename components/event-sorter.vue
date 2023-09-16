<script setup lang="ts">
import { sortMap } from "~/lib/utils";
import ChevronRight from "./icons/chevron-right.vue";

const route = useRoute();
const router = useRouter();

const isSorterOpen = ref(false);
const activeSort = ref(sortMap.get(route.query.sort as string));

function setSort(key: string, value: string) {
  const filterParams = new URLSearchParams(
    route.query as Record<string, string>,
  );
  filterParams.set(key, value);
  router.push(`${route.path}?${filterParams.toString()}`);
  isSorterOpen.value = false;
}

const eventSorts = Array.from(sortMap, (item) => ({
  key: item[0],
  ...item[1],
}));

onBeforeRouteUpdate(({ query }) => {
  activeSort.value = sortMap.get(query.sort as string);
});
</script>

<template>
  <div class="lg:w-52">
    <button
      @click="isSorterOpen = !isSorterOpen"
      variant="defaultOutline"
      class="flex items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-start text-xs text-black hover:bg-slate-100 lg:w-52 lg:text-sm"
    >
      {{ activeSort?.title ?? "Select sort" }}
      <ChevronRight />
    </button>
    <div
      v-if="isSorterOpen"
      class="absolute hidden w-52 flex-col overflow-hidden rounded-b-lg border bg-white lg:flex"
    >
      <button
        v-for="sort in eventSorts"
        :key="sort.key"
        @click="setSort('sort', sort.key)"
        class="w-full border-b px-4 py-2 text-start text-sm transition duration-200 hover:bg-slate-100"
      >
        {{ sort.title }}
      </button>
    </div>
    <EventSorterModal
      v-if="isSorterOpen"
      @close-modal="isSorterOpen = false"
      @set-sort="(sortKey) => setSort('sort', sortKey)"
    />
  </div>
</template>
