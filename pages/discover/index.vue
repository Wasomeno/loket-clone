<script setup lang="ts"></script>

<template>
  <main class="flex min-h-screen flex-1 bg-slate-50">
    <div class="w-3/12 border-r-2 px-10 py-6">
      <h3 class="border-b pb-2 text-xl font-semibold tracking-wide">Filter</h3>
    </div>
    <div class="w-5/6 px-4">
      <div class="my-6 flex items-center justify-between">
        <span class="text-sm">Showing 9 out of 69 Events</span>
        <button
          class="w-32 rounded-md border bg-white px-4 py-1.5 text-sm font-medium"
        >
          Sort
        </button>
      </div>
      <div class="grid grid-cols-4 gap-6">
        <EventItemCard />
        <EventItemCard />
        <EventItemCard />
        <EventItemCard />
        <EventItemCard />
        <EventItemCard />
        <EventItemCard />
        <EventItemCard />
      </div>
    </div>
  </main>
</template>