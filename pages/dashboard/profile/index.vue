<script setup lang="ts">
import DashboardCreatorProfile from "~/components/dashboard/dashboard-creator-profile.vue";

type ActiveTab = "user" | "creator";

const activeTab = ref<ActiveTab>("user");

definePageMeta({
  layout: "user-dashboard-layout",
});
</script>

<template>
  <NuxtLayout>
    <div class="flex-1 space-y-4 px-6 py-4">
      <h1 class="text-xl font-medium">Profile</h1>
      <div class="flex items-center">
        <button
          @click="activeTab = 'user'"
          class="w-40 border-b-2 pb-1 text-sm"
          :class="{ 'border-b-blue-800': activeTab === 'user' }"
        >
          User
        </button>
        <button
          @click="activeTab = 'creator'"
          class="w-40 border-b-2 pb-1 text-sm"
          :class="{ 'border-b-blue-800': activeTab === 'creator' }"
        >
          Event Creator
        </button>
      </div>
      <DashboardCreatorProfile v-if="activeTab === 'creator'" />
    </div>
  </NuxtLayout>
</template>
