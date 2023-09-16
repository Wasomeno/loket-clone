<script setup lang="ts">
import UserCreatorProfile from "~/components/user-creator-profile.vue";

type ActiveTab = "user" | "creator";

useHead({ title: "Profile | Loket" });

definePageMeta({ middleware: "auth" });

const activeTab = ref<ActiveTab>("user");
</script>

<template>
  <NuxtLayout>
    <main class="flex min-h-screen flex-1 bg-slate-50">
      <div class="flex-1 space-y-4 px-6 py-4">
        <h1 class="text-base font-medium lg:text-xl">Profile</h1>
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
        <UserCreatorProfile v-if="activeTab === 'creator'" />
      </div>
    </main>
  </NuxtLayout>
</template>
