<script setup lang="ts">
import { cilFlagAlt, cilHome, cilViewQuilt } from "@coreui/icons";
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
    <NuxtLink href="/dashboard" class="flex flex-1 flex-col items-center gap-1">
      <CIcon :icon="cilViewQuilt" class="h-4 w-4" />
      <span class="text-xs">Dashboard</span>
    </NuxtLink>
    <NuxtLink
      href="/dashboard/tickets"
      class="flex flex-1 flex-col items-center gap-1"
    >
      <CIcon :icon="cilHome" class="h-4 w-4" />
      <span class="text-xs">Tickets</span>
    </NuxtLink>
    <NuxtLink
      href="/dashboard/events"
      class="flex flex-1 flex-col items-center gap-1"
    >
      <CIcon :icon="cilFlagAlt" class="h-4 w-4" />
      <span class="text-xs">Events</span>
    </NuxtLink>
  </div>
</template>
