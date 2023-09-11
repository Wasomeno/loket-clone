<script setup lang="ts">
import { EventType } from "~/types/event";

const props = defineProps<{ eventDetails: EventType }>();
const dateTimeStart = new Date(props.eventDetails?.date_time_start as string);
</script>

<template>
  <NuxtLink :to="`/event/${props.eventDetails.id}`">
    <div
      class="col-span-1 overflow-hidden rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      <div class="h-24 bg-slate-300 lg:h-36" />
      <div class="px-4">
        <div class="flex flex-col gap-2 py-4 lg:py-6">
          <span class="text-sm lg:text-base">{{ eventDetails.title }}</span>
          <span class="text-xs opacity-50 lg:text-base">{{
            dateTimeStart.toDateString()
          }}</span>
          <span class="text-sm font-semibold lg:text-base"
            >Rp {{ eventDetails.min_ticket_price?.toLocaleString("id") }}</span
          >
        </div>
        <div class="border-t border-t-slate-300 py-3 lg:py-4">
          <div class="flex items-center gap-4">
            <div class="h-7 w-7 rounded-full bg-blue-300" />
            <span class="text-xs font-medium opacity-50">{{
              eventDetails?.creator?.name
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style />
