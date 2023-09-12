<script setup lang="ts">
import { cilCompass, cilFlagAlt, cilHome } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
</script>

<template>
  <div
    class="sticky bottom-0 flex h-14 flex-1 items-center gap-4 border-t bg-white px-4 py-2 shadow-md lg:hidden"
  >
    <NuxtLink href="/" class="flex flex-1 flex-col items-center gap-1">
      <CIcon :icon="cilHome" class="h-4 w-4" />
      <span class="text-xs">Home</span>
    </NuxtLink>
    <NuxtLink href="/discover" class="flex flex-1 flex-col items-center gap-1">
      <CIcon :icon="cilCompass" class="h-4 w-4" />
      <span class="text-xs">Discover</span>
    </NuxtLink>
    <NuxtLink
      href="/my-tickets"
      class="flex flex-1 flex-col items-center gap-1"
    >
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
        ></path>
      </svg>
      <span class="text-xs">Tickets</span>
    </NuxtLink>
    <NuxtLink href="/my-events" class="flex flex-1 flex-col items-center gap-1">
      <CIcon :icon="cilFlagAlt" class="h-4 w-4" />
      <span class="text-xs">Events</span>
    </NuxtLink>
  </div>
</template>
