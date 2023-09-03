<script setup lang="ts"></script>

<template>
  <div class="flex w-60 flex-col gap-4 border-r px-6 py-4">
    <div class="flex flex-col gap-2">
      <div class="border-b border-gray-300 py-1.5">
        <span class="mb-2 text-sm font-medium opacity-40">Main</span>
      </div>
      <NuxtLink to="/dashboard">
        <div
          class="rounded-md px-4 py-2 font-medium transition duration-200 hover:bg-blue-100"
        >
          Dashboard
        </div>
      </NuxtLink>
    </div>
    <div class="flex flex-col gap-2">
      <div class="border-b border-gray-300 py-1.5">
        <span class="mb-2 text-sm font-medium opacity-40">Event Creator</span>
      </div>
      <NuxtLink to="/dashboard/creator">
        <div
          class="rounded-md px-4 py-2 font-medium transition duration-200 hover:bg-blue-100"
        >
          Profile
        </div>
      </NuxtLink>
      <NuxtLink to="/">
        <div
          class="rounded-md px-4 py-2 font-medium transition duration-200 hover:bg-blue-100"
        >
          My Events
        </div>
      </NuxtLink>
      <NuxtLink to="/">
        <div
          class="rounded-md px-4 py-2 font-medium transition duration-200 hover:bg-blue-100"
        >
          Create Event
        </div>
      </NuxtLink>
    </div>
    <div class="flex flex-col gap-2">
      <div class="border-b border-gray-300 py-1.5">
        <span class="mb-2 text-sm font-medium opacity-40">Tickets</span>
      </div>
      <NuxtLink to="/">
        <div
          class="rounded-md px-4 py-2 font-medium transition duration-200 hover:bg-blue-100"
        >
          My Tickets
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
