<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isSearchInputActive = ref(false);
const isUserMenuActive = ref(false);
const searchQuery = ref("");

const router = useRouter();
</script>
<template>
  <header
    class="sticky top-0 z-10 flex items-center justify-between bg-blue-950 px-6 py-3"
  >
    <div class="flex w-2/6 items-center gap-10">
      <RouterLink to="/">
        <span class="text-3xl font-semibold tracking-wider text-slate-50"
          >Loket</span
        >
      </RouterLink>
      <form
        @submit="
          (event) => {
            event.preventDefault();
            router.push('/search?q=' + searchQuery);
            isSearchInputActive = false;
          }
        "
      >
        <input
          @click="isSearchInputActive = true"
          v-model="searchQuery"
          type="string"
          class="text- w-96 rounded-lg border border-slate-300 px-4 py-2 text-sm"
          placeholder="Search for events"
        />
      </form>
    </div>
    <div class="flex gap-10">
      <div class="flex items-center gap-6">
        <RouterLink to="/discover">
          <span class="text-sm font-medium text-white">Discover</span>
        </RouterLink>
        <RouterLink to="/tickets">
          <span class="text-sm font-medium text-white">My Tickets</span>
        </RouterLink>
      </div>
      <!-- <div
        @mouseenter="isUserMenuActive = true"
        @mouseleave="isUserMenuActive = false"
        class="relative flex items-center"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <span class="font-medium">T</span>
        </div>
        <div
          v-if="isUserMenuActive"
          class="absolute right-0 top-12 z-20 h-96 w-72 rounded-xl bg-white px-6 py-2 shadow-md"
        >
          <div class="flex items-center gap-4 py-4">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 shadow-sm"
            >
              <span class="font-medium">T</span>
            </div>
            <span class="text-sm font-medium">Change Account Type</span>
          </div>
          <div class="flex flex-col gap-3 border-t py-4">
            <RouterLink to="#">
              <span class="text-sm">My Events</span>
            </RouterLink>
            <RouterLink to="#">
              <span class="text-sm">Dashboard</span>
            </RouterLink>
          </div>
        </div>
      </div> -->
      <div class="flex items-center gap-6">
        <RouterLink
          to="/register"
          class="rounded-lg border border-slate-50 px-4 py-2 text-sm font-medium text-slate-50"
        >
          Register
        </RouterLink>
        <RouterLink
          to="/login"
          class="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-50"
        >
          Login
        </RouterLink>
      </div>
    </div>
  </header>
  <div
    v-if="isSearchInputActive || isUserMenuActive"
    @click="isSearchInputActive = false"
    class="fixed left-0 top-0 h-screen w-screen bg-neutral-900 opacity-75 transition duration-200"
  />
  <slot />
  <footer class="flex gap-20 bg-blue-950 p-10 text-slate-50">
    <div>
      <span class="text-lg font-semibold tracking-wider text-slate-50"
        >Loket</span
      >
    </div>
    <div class="grid w-3/6 grid-cols-4">
      <div>
        <h4 class="mb-4 font-medium">Footer 1</h4>
        <ul class="space-y-2">
          <li class="text-sm opacity-75">List item</li>
          <li class="text-sm opacity-75">List item</li>
          <li class="text-sm opacity-75">List item</li>
        </ul>
      </div>
      <div>
        <h4 class="mb-4 font-medium">Footer 1</h4>
        <ul class="space-y-2">
          <li class="text-sm opacity-75">List item</li>
          <li class="text-sm opacity-75">List item</li>
          <li class="text-sm opacity-75">List item</li>
        </ul>
      </div>
      <div>
        <h4 class="mb-4 font-medium">Footer 1</h4>
        <ul class="space-y-2">
          <li class="text-sm opacity-75">List item</li>
          <li class="text-sm opacity-75">List item</li>
          <li class="text-sm opacity-75">List item</li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<style></style>
