<script setup lang="ts">
import { cilX } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventCategory } from "~/types/event";

const emits = defineEmits<{
  "close-modal": [];
  "update-category": [{ id: number; name: string }];
}>();

const { data } = useFetch<EventCategory[]>(`${EVENT_API_MAIN}/categories`);

const categories = toRaw(data);
</script>

<template>
  <Modal class="h-4/6 w-2/6 bg-white" :close-modal="() => $emit('close-modal')">
    <div class="flex items-center justify-between border-b px-6 py-4">
      <h5>Select a Category</h5>
      <button @click="$emit('close-modal')" class="h-5 w-5 font-medium">
        <CIcon :icon="cilX" />
      </button>
    </div>
    <div class="flex flex-col gap-2 px-6 py-4">
      <button
        v-if="data !== null"
        v-for="category in categories"
        @click="
          $emit('updateCategory', { id: category.id, name: category.name })
        "
        class="h-10 w-auto rounded-lg border text-sm font-medium"
      >
        {{ category.name }}
      </button>
      <div
        v-else
        v-for="category in 5"
        class="relative isolate h-10 w-full overflow-hidden rounded-lg border bg-gray-100 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-50 before:to-transparent"
      />
    </div>
  </Modal>
</template>
