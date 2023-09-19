<script setup lang="ts">
import { EventType } from "~/types/event";

const props = defineProps<{ eventDetails: EventType }>();
const dateTimeStart = new Date(props.eventDetails?.date_time_start as string);
</script>

<template>
  <NuxtLink :to="`/event/${props.eventDetails.id}`">
    <div
      class="w-64 overflow-hidden rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      <NuxtImg
        class="h-32 w-full bg-slate-300 lg:h-36"
        :src="eventDetails.banner_image"
        alt="event-image"
      />
      <div class="px-4">
        <div class="flex flex-col gap-2 py-4 lg:py-6">
          <h5 class="line-clamp-1 text-sm lg:text-base">
            {{ eventDetails.title }}
          </h5>
          <span class="text-xs opacity-50 lg:text-base">{{
            dateTimeStart.toDateString()
          }}</span>
          <span class="text-sm font-semibold lg:text-base"
            >Rp {{ eventDetails.min_ticket_price?.toLocaleString("id") }}</span
          >
        </div>
        <div class="border-t border-t-slate-300 py-3 lg:py-4">
          <div class="flex items-center gap-4">
            <div
              class="h-10 w-10 overflow-hidden rounded-full border-2 bg-blue-300"
            >
              <NuxtImg :src="eventDetails.creator?.image_logo" />
            </div>
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
