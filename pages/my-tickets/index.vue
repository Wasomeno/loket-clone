<script setup>
useHead({ title: "My Tickets | Loket" });
definePageMeta({ middleware: "auth" });
</script>

<template>
  <NuxtLayout>
    <main class="flex min-h-screen flex-1 bg-slate-50"></main>
  </NuxtLayout>
</template>
