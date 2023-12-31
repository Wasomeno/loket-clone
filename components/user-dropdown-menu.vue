<script setup lang="ts">
import { cilAccountLogout } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";

type ActiveTab = "user" | "creator";

const emits = defineEmits<{
  "set-open-screen": [isOpen: boolean];
}>();

const isMenuOpen = ref(false);
const activeTab = ref<ActiveTab>("user");
const session = useAuth();
</script>

<template>
  <div class="hidden lg:block">
    <div
      v-if="session.status.value === 'authenticated'"
      @mouseenter="
        () => {
          isMenuOpen = true;
          $emit('set-open-screen', true);
        }
      "
      @mouseleave="
        () => {
          isMenuOpen = false;
          $emit('set-open-screen', false);
        }
      "
      class="relative hidden items-center lg:flex"
    >
      <div
        class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 bg-white shadow-sm lg:h-10 lg:w-10"
      >
        <img
          :src="session.data.value?.user?.image as string"
          alt="user-image"
          referrerpolicy="no-referrer"
        />
      </div>
      <div
        v-if="isMenuOpen"
        class="absolute right-0 top-12 z-30 flex h-96 w-80 flex-1 flex-col rounded-xl bg-white px-6 py-2 shadow-md"
      >
        <div class="flex items-center gap-4 py-4">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 shadow-sm"
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
        <div class="mb-2 flex items-center">
          <button
            @click="activeTab = 'user'"
            :class="{ 'border-blue-700': activeTab === 'user' }"
            class="w-full border-b-2 pb-1.5 text-xs font-medium"
          >
            User
          </button>
          <button
            @click="activeTab = 'creator'"
            :class="{ 'border-blue-700': activeTab === 'creator' }"
            class="w-full border-b-2 pb-1.5 text-xs font-medium"
          >
            Creator
          </button>
        </div>
        <div v-if="activeTab === 'creator'" class="flex flex-1 flex-col">
          <NuxtLink
            to="/my-events"
            class="rounded-lg px-4 py-2 transition duration-200 hover:bg-slate-100"
          >
            <span class="text-sm">My Events</span>
          </NuxtLink>

          <NuxtLink
            to="/create-event"
            class="rounded-lg px-4 py-2 transition duration-200 hover:bg-slate-100"
          >
            <span class="text-sm">Create Event</span>
          </NuxtLink>
          <NuxtLink
            to="/profile"
            class="rounded-lg px-4 py-2 transition duration-200 hover:bg-slate-100"
          >
            <span class="text-sm">Profile</span>
          </NuxtLink>
        </div>
        <div v-else="activeTab === 'user'" class="flex flex-1 flex-col gap-2">
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
    </div>
    <div v-else class="flex items-center gap-2 lg:gap-4">
      <NuxtLink
        to="/register"
        class="rounded-lg border border-slate-50 px-4 py-2 text-xs font-medium text-slate-50 lg:text-sm"
      >
        Register
      </NuxtLink>
      <NuxtLink
        to="/login"
        class="rounded-lg bg-blue-700 px-4 py-2 text-xs font-medium text-slate-50 lg:text-sm"
      >
        Login
      </NuxtLink>
    </div>
  </div>
</template>
