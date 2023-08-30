<script setup lang="ts"></script>
<template>
  <main class="my-10 flex w-full flex-col items-center gap-10">
    <div class="h-72 w-5/6 rounded-lg bg-slate-500" />
    <div class="flex w-5/6 flex-col gap-10">
      <h2 class="text-xl font-semibold">Recommended Events</h2>
      <div class="grid grid-cols-4 gap-x-6">
        <EventItemCard v-for="n in 4" :key="n" :event-name="n.toString()" />
      </div>
    </div>
    <div class="flex w-full justify-center bg-blue-950 py-6">
      <div class="flex w-5/6 flex-col gap-4">
        <h2 class="text-xl font-semibold text-slate-50">Trending Events</h2>
        <div class="grid grid-cols-3 gap-x-8">
          <div class="col-span-1 h-40 rounded-lg bg-slate-50" />
          <div class="col-span-1 h-40 rounded-lg bg-slate-50" />
          <div class="col-span-1 h-40 rounded-lg bg-slate-50" />
        </div>
      </div>
    </div>
    <div class="flex w-5/6 flex-col gap-10">
      <h2 class="text-xl font-semibold">Music Events</h2>
      <div class="grid grid-cols-4 gap-6">
        <EventItemCard v-for="n in 12" :key="n" :event-name="n.toString()" />
      </div>
    </div>
  </main>
</template>
