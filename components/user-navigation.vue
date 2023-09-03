<script setup lang="ts">
import { cilCompass } from "@coreui/icons";
import { CIcon } from "@coreui/icons-vue";

const isSearchInputActive = ref(false);
const isShowUserMenu = ref(false);

const searchQuery = ref("");
</script>

<template>
  <header
    class="sticky top-0 z-10 flex items-center justify-between bg-blue-950 px-6 py-3 shadow-md"
  >
    <div class="flex w-2/6 items-center gap-10">
      <NuxtLink to="/">
        <span class="text-3xl font-semibold tracking-wider text-slate-50"
          >Loket</span
        >
      </NuxtLink>
      <form
        @submit="
          (event) => {
            event.preventDefault();
            $router.push('/search?q=' + searchQuery);
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
        <NuxtLink to="/discover">
          <div class="flex items-center gap-2">
            <CIcon :icon="cilCompass" class="h-5 w-5 text-white" />
            <span class="text-sm font-medium text-white">Discover</span>
          </div>
        </NuxtLink>
      </div>
      <UserDropdownMenu
        :is-show-user-menu="isShowUserMenu"
        @hide-user-menu="isShowUserMenu = false"
        @show-user-menu="isShowUserMenu = true"
      />
    </div>
  </header>
  <div
    v-if="isSearchInputActive || isShowUserMenu"
    @click="isSearchInputActive = false"
    class="fixed left-0 top-0 h-screen w-screen bg-neutral-900 opacity-75 transition duration-200"
  />
</template>
