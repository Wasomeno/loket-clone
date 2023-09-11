<script setup lang="ts">
import { sortMap } from "~/lib/utils";

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
      class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-start text-xs text-black hover:bg-slate-100 lg:text-sm"
    >
      {{ activeSort?.title ?? "Select sort" }}
    </button>
    <div
      v-if="isSorterOpen"
      class="absolute hidden w-full flex-col rounded-b-lg border bg-white lg:flex"
    >
      <button
        v-for="sort in eventSorts"
        @click="setSort('sort', sort.key)"
        class="border-b px-4 py-2 text-start text-sm"
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
