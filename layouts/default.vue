<script setup lang="ts">
import UserDetailsNotCreated from "~/components/modals/user-details-not-created-modal.vue";
import { EVENT_API_MAIN } from "~/lib/utils";

const session = useAuth();
const userDetails = useFetch(
  `${EVENT_API_MAIN}/users/${session.data.value?.user?.email}`,
);

const isUserDetailsInvalid = userDetails.data === null;
</script>

<template>
  <div>
    <UserNavigation />
    <UserDetailsNotCreated
      v-if="isUserDetailsInvalid && !$route.path.includes('/dashboard')"
    />
    <slot />
    <Footer />
  </div>
</template>
