<script setup lang="ts">
import { cilX } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { sortMap } from "~/lib/utils";

const emits = defineEmits<{
  "close-modal": [];
  "set-sort": [value: string];
}>();

const eventSorts = Array.from(sortMap, (item) => ({
  key: item[0],
  ...item[1],
}));
</script>

<template>
  <Teleport to="#modal-container">
    <div
      class="fixed bottom-0 z-30 h-screen w-screen bg-neutral-800 bg-opacity-50 backdrop-blur-[2px] lg:hidden"
      @click="$emit('close-modal')"
    />
    <div
      class="fixed inset-x-1/2 bottom-0 z-40 h-3/6 w-full -translate-x-1/2 flex-col rounded-none rounded-t-md bg-white shadow-md lg:hidden"
    >
      <div class="flex items-center justify-between border-b px-4 py-2">
        <span class="text-sm font-medium"> Sorts </span>
        <button @click="$emit('close-modal')">
          <CIcon :icon="cilX" class="h-4 w-4" />
        </button>
      </div>
      <div class="flex flex-col gap-2 px-4 py-2">
        <button
          v-for="sort in eventSorts"
          @click="$emit('set-sort', sort.key)"
          class="rounded-md border py-2 text-xs transition duration-200"
          :class="{
            'bg-blue-800 text-white': sort.key === $route.query.sort,
          }"
        >
          {{ sort.title }}
        </button>
      </div>
    </div>
  </Teleport>
</template>
