<script setup lang="ts">
import { cilCompass, cilZoom } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";
import SearchModal from "./modals/search-modal.vue";
import UserMobileDropdownMenu from "./user-mobile-dropdown-menu.vue";

const isSearchModalOpen = ref(false);
const isScreenOpen = ref(false);

const searchQuery = ref("");
</script>

<template>
  <header
    class="sticky top-0 z-10 flex items-center justify-between bg-blue-950 px-4 py-3 shadow-md lg:px-6"
  >
    <div class="flex w-2/6 items-center gap-4 lg:gap-10">
      <NuxtLink to="/">
        <span
          class="text-lg font-semibold tracking-wider text-slate-50 lg:text-3xl"
          >Loket</span
        >
      </NuxtLink>
      <form
        @submit="
          (event) => {
            event.preventDefault();
            $router.push('/search?q=' + searchQuery);
            isScreenOpen = false;
          }
        "
        class="hidden lg:block"
      >
        <input
          @click="isScreenOpen = true"
          v-model="searchQuery"
          type="string"
          class="w-40 rounded-lg border border-slate-300 px-4 py-2 text-xs lg:w-96 lg:text-sm"
          placeholder="Search for events"
        />
      </form>
    </div>
    <div class="flex items-center gap-2 lg:gap-10">
      <button @click="isSearchModalOpen = true" class="inline-block lg:hidden">
        <CIcon :icon="cilZoom" class="h-5 w-5 text-white" />
      </button>
      <div class="flex items-center">
        <NuxtLink to="/discover">
          <div class="hidden items-center gap-2 lg:flex">
            <CIcon :icon="cilCompass" class="h-5 w-5 text-white" />
            <span class="hidden text-sm font-medium text-white lg:inline"
              >Discover</span
            >
          </div>
        </NuxtLink>
      </div>
      <UserDropdownMenu
        @set-open-screen="(isOpen) => (isScreenOpen = isOpen)"
      />
      <UserMobileDropdownMenu />
      <SearchModal
        v-if="isSearchModalOpen"
        @close-modal="isSearchModalOpen = false"
      />
    </div>
  </header>
  <div
    v-if="isScreenOpen"
    @click="isScreenOpen = false"
    class="fixed left-0 top-0 h-screen w-screen bg-neutral-900 opacity-75 transition duration-200"
  />
</template>
