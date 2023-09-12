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
      class="flex items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-start text-xs text-black hover:bg-slate-100 lg:w-52 lg:text-sm"
    >
      {{ activeSort?.title ?? "Select sort" }}
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
      >
        <path
          fill-rule="evenodd"
          d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <div
      v-if="isSorterOpen"
      class="absolute hidden w-52 flex-col overflow-hidden rounded-b-lg border bg-white lg:flex"
    >
      <button
        v-for="sort in eventSorts"
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
