<script setup lang="ts">
import { cilCompass, cilFlagAlt, cilHome } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import Ticket from "./icons/ticket.vue";
</script>

<template>
  <div
    class="sticky bottom-0 flex h-14 flex-1 items-center gap-4 border-t bg-white px-4 py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:hidden"
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
      <Ticket />
      <span class="text-xs">Tickets</span>
    </NuxtLink>
    <NuxtLink href="/my-events" class="flex flex-1 flex-col items-center gap-1">
      <CIcon :icon="cilFlagAlt" class="h-4 w-4" />
      <span class="text-xs">Events</span>
    </NuxtLink>
  </div>
</template>
