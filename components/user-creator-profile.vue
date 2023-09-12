<script setup lang="ts">
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventCreator, User } from "~/types/event";
import axios from "axios";

const eventCreatorDetails = reactive<EventCreator>({
  name: "",
  address: "",
  description: "",
  user_id: 0,
  image_banner: "test_image",
  image_logo: "test_logo",
});

const userDetailsCache = useNuxtData<User>("userDetails");
const eventCreatorDetailsCache = useNuxtData<EventCreator>("creatorDetails");

const session = useAuth();

const { data: userDetails } = await useFetch<User>(
  `${EVENT_API_MAIN}/users/${session.data.value?.user?.email}`,
  { key: "userDetails", immediate: userDetailsCache.data.value === null },
);

const { data: eventCreatorDetailsData } = await useFetch<EventCreator>(
  `${EVENT_API_MAIN}/creators/${userDetails.value?.event_creator_id}`,
  {
    key: "creatorDetails",
    immediate: eventCreatorDetailsCache.data.value === null,
  },
);

onMounted(() => {
  eventCreatorDetails.name =
    (eventCreatorDetailsCache.data.value?.name as string) ??
    eventCreatorDetailsData.value?.name;
  eventCreatorDetails.address =
    (eventCreatorDetailsCache.data.value?.address as string) ??
    eventCreatorDetailsData.value?.address;
  eventCreatorDetails.description =
    (eventCreatorDetailsCache.data.value?.description as string) ??
    eventCreatorDetailsData.value?.description;
});

async function saveEventCreatorData() {
  await axios.post(`http://localhost:5000/users`, {
    name: session.data.value?.user?.name,
    email: session.data.value?.user?.email,
    event_creator: { ...eventCreatorDetails },
  });
}
</script>

<template>
  <div class="space-y-6">
    <div class="w-full space-y-2">
      <h5 class="text-sm font-medium lg:text-base">Banner</h5>
      <div class="h-32 w-full rounded-lg bg-gray-200 lg:h-72" />
    </div>
    <div class="space-y-2">
      <h5 class="mb-4 text-sm font-medium lg:text-base">Creator Data</h5>
      <div class="space-y-2">
        <div
          class="flex flex-wrap items-center justify-center gap-6 lg:flex-nowrap lg:justify-normal lg:gap-10"
        >
          <div class="h-40 w-40 rounded-full bg-slate-200" />
          <div class="w-full space-y-4 lg:w-auto">
            <div class="flex flex-col gap-2">
              <label class="text-xs font-medium lg:text-sm">Name</label>
              <input
                type="string"
                v-model="eventCreatorDetails.name"
                class="w-full rounded-lg border bg-white px-4 py-2 text-sm lg:w-72"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xs font-medium lg:text-sm">Address</label>
              <input
                type="string"
                v-model="eventCreatorDetails.address"
                class="w-full rounded-lg border bg-white px-4 py-2 text-sm lg:w-72"
              />
            </div>
          </div>
          <div class="w-full space-y-4 lg:w-auto">
            <div class="flex w-full flex-col gap-2">
              <label class="text-xs font-medium lg:text-sm">Description</label>
              <textarea
                v-model="eventCreatorDetails.description"
                class="h-32 w-full rounded-lg border bg-white px-4 py-2 text-sm leading-5 lg:w-96"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex h-20 flex-1 items-center justify-end rounded-lg border bg-white px-6 py-4"
    >
      <Button variant="default" @click="saveEventCreatorData">
        Save Data
      </Button>
    </div>
  </div>
</template>
