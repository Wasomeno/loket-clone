<script setup lang="ts">
import { cn } from "~/lib/utils";

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
      d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
      clip-rule="evenodd"
    ></path>
  </svg>
</template>
