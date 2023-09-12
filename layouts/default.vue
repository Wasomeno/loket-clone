<script setup lang="ts"></script>

<template>
  <div>
    <UserNavigation />
    <slot />
    <div class="fixed" />
    <UserMobileNavigation />
    <Footer />
  </div>
</template>
