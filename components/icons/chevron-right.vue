<script setup lang="ts">
import { cn } from "~/lib/utils";
import { ClassValue } from "clsx";

const props = defineProps();
</script>
<template>
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    aria-hidden="true"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    :class="cn('h-5 w-5')"
  >
    <path
      fill-rule="evenodd"
      d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
      clip-rule="evenodd"
    ></path>
  </svg>
</template>
