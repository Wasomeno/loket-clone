<script setup lang="ts">
import { cn } from "~/lib/utils";
import type { ClassValue } from "clsx";

const props = defineProps<{
  class: ClassValue;
}>();
</script>

<template>
  <div
    :class="
      cn(
        'relative isolate overflow-hidden rounded-lg border bg-gray-300 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent',
        props.class,
      )
    "
  />
</template>
