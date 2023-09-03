<script setup lang="ts">
import { type ClassValue } from "clsx";
import { cn } from "../lib/utils";

const props = defineProps<{
  class: ClassValue;
  closeModal?: () => void;
}>();
</script>

<template>
  <div
    class="bl fixed bottom-0 z-30 h-screen w-screen bg-neutral-800 bg-opacity-50 backdrop-blur-[2px]"
    @click="closeModal"
  />
  <div
    :class="
      cn(
        'fixed inset-x-1/2 bottom-0 z-40 h-[90%] w-full -translate-x-1/2 flex-col rounded-none rounded-t-2xl shadow-md lg:inset-y-1/2 lg:-translate-y-1/2 lg:rounded-lg',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
