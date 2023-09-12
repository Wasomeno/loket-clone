<script setup lang="ts">
import { cilAccountLogout, cilHamburgerMenu, cilX } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";

const isMenuOpen = ref(false);
const session = useAuth();

const emits = defineEmits<{
  "show-user-menu": [];
  "hide-user-menu": [];
}>();
</script>

<template>
  <div class="relative block lg:hidden">
    <div class="flex items-center justify-center">
      <button @click="isMenuOpen = true">
        <CIcon :icon="cilHamburgerMenu" class="h-5 w-5 text-white" />
      </button>
    </div>
    <div
      v-if="isMenuOpen"
      class="fixed left-0 top-0 h-screen w-screen bg-white"
    >
      <div class="flex justify-between border-b bg-blue-950 px-4 py-3">
        <span class="text-sm font-medium text-white">Menu</span>
        <button @click="isMenuOpen = false">
          <CIcon :icon="cilX" class="h-4 w-4 text-white" />
        </button>
      </div>
      <div v-if="session.status.value === 'authenticated'">
        <div class="flex items-center gap-4 px-4 py-2">
          <div
            class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-200 shadow-sm"
          >
            <img
              :src="session.data.value?.user?.image as string"
              referrerpolicy="no-referrer"
              alt="user-image"
            />
          </div>
          <div>
            <h5>{{ session.data.value?.user?.name }}</h5>
            <span class="text-sm font-medium opacity-50">{{
              session.data.value?.user?.email
            }}</span>
          </div>
        </div>

        <div class="flex flex-col gap-2 border-b py-2">
          <NuxtLink
            to="/my-events"
            class="rounded-lg px-4 transition duration-200 hover:bg-slate-100"
          >
            <span class="text-sm">My Events</span>
          </NuxtLink>
          <NuxtLink
            to="/create-event"
            class="rounded-lg px-4 transition duration-200 hover:bg-slate-100"
          >
            <span class="text-sm">Create Event</span>
          </NuxtLink>
        </div>
        <div class="flex flex-col py-2">
          <NuxtLink
            to="/my-tickets"
            class="rounded-lg px-4 py-2 transition duration-200 hover:bg-slate-100"
          >
            <span class="text-sm">My Tickets</span>
          </NuxtLink>
        </div>
        <div class="border-t py-2">
          <button
            @click="session.signOut"
            class="flex items-center gap-4 px-4 py-2 text-sm text-red-700"
          >
            <CIcon :icon="cilAccountLogout" class="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
      <div v-else class="border-b py-2">
        <div class="px-4 py-2">
          <h5 class="mb-1 text-lg font-semibold">Sign in to your account</h5>
          <p class="text-sm tracking-wider">
            to use the full features of loket
          </p>
        </div>
        <div class="flex flex-1 items-center gap-2 px-4 py-2 lg:gap-6">
          <NuxtLink
            to="/register"
            class="flex-1 rounded-lg border border-blue-800 px-4 py-2 text-center text-sm font-medium text-blue-800"
          >
            Register
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="flex-1 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-slate-50"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
