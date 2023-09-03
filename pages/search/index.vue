<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <main
      class="flex min-h-screen w-full flex-col items-center gap-6 bg-slate-50 pb-6"
    >
      <div class="mt-6 w-5/6 space-y-6">
        <h2 class="text-xl font-semibold">
          Event with the word "{{ $route.query.q }}"
        </h2>
        <div class="grid grid-cols-4 gap-x-6">
          <EventItemCardSkeleton />
        </div>
      </div>
      <div class="mt-6 w-5/6 space-y-6">
        <h2 class="text-xl font-semibold">Event Creators</h2>
        <div class="grid grid-cols-6 gap-x-6">
          <EventCreatorCard />
          <EventCreatorCard />
          <EventCreatorCard />
          <EventCreatorCard />
          <EventCreatorCard />
          <EventCreatorCard />
        </div>
      </div>
      <div class="mt-6 w-5/6 space-y-6">
        <h2 class="text-xl font-semibold">Search Based on Cities</h2>
        <div class="grid grid-cols-10 gap-x-6">
          <div class="col-span-2 flex flex-col items-center gap-2">
            <div class="h-36 w-full rounded-xl bg-blue-200" />
            <span class="font-medium">City Name</span>
          </div>
          <div class="col-span-2 flex flex-col items-center gap-2">
            <div class="h-36 w-full rounded-xl bg-blue-200" />
            <span class="font-medium">City Name</span>
          </div>
          <div class="col-span-2 flex flex-col items-center gap-2">
            <div class="h-36 w-full rounded-xl bg-blue-200" />
            <span class="font-medium">City Name</span>
          </div>
          <div class="col-span-2 flex flex-col items-center gap-2">
            <div class="h-36 w-full rounded-xl bg-blue-200" />
            <span class="font-medium">City Name</span>
          </div>
          <div class="col-span-2 flex flex-col items-center gap-2">
            <div class="h-36 w-full rounded-xl bg-blue-200" />
            <span class="font-medium">City Name</span>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
