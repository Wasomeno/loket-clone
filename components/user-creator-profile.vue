<script setup lang="ts">
import { cilPen } from "@coreui/icons";
import CIcon from "@coreui/icons-vue";
import { EVENT_API_MAIN } from "~/lib/utils";
import { EventCreator, User } from "~/types/event";
import axios from "axios";
import EditEventCreatorBanner from "./modals/edit-event-creator-banner.vue";
import EditEventCreatorLogo from "./modals/edit-event-creator-logo.vue";

const session = useAuth();

const eventCreatorDetailsCache = useNuxtData<EventCreator>("creatorDetails");

const userDetailsCache = useNuxtData<User>("userDetails");

const imageLogo = ref<{ path: string; file: File }>();
const imageBanner = ref<{ path: string; file: File }>();

const isEditLogoModalOpen = ref(false);
const isEditBannerModalOpen = ref(false);

const { data: userDetails } = await useFetch<User>(
  `${EVENT_API_MAIN}/users/${session.data.value?.user?.email}`,
  { key: "userDetails", immediate: userDetailsCache.data.value === null },
);

const { data: eventCreatorDetailsData, refresh } = await useFetch<EventCreator>(
  `${EVENT_API_MAIN}/creators/${userDetails.value?.event_creator_id}`,
  {
    key: "creatorDetails",
    immediate: eventCreatorDetailsCache.data.value === null,
  },
);

const eventCreatorDetails = reactive<EventCreator>(
  (eventCreatorDetailsCache.data.value ??
    eventCreatorDetailsData.value) as EventCreator,
);

async function saveEventCreatorData() {
  await axios.patch(
    `${EVENT_API_MAIN}/creators/${eventCreatorDetails.id}`,
    eventCreatorDetails,
  );
}
</script>

<template>
  <div class="space-y-6">
    <div class="w-full space-y-2">
      <h5 class="text-sm font-medium lg:text-base">Banner</h5>
      <div
        class="relative h-40 w-full overflow-hidden rounded-lg bg-gray-200 lg:h-72 lg:w-3/6"
      >
        <label
          for="bannerImage"
          class="absolute flex h-full w-full cursor-pointer items-center justify-center bg-slate-600 bg-opacity-50"
        >
          <input
            id="bannerImage"
            @change="
              (event) => {
                imageBanner = {
                  path: event.target.value,
                  file: event.target.files[0],
                };
                isEditBannerModalOpen = true;
              }
            "
            type="file"
            class="hidden"
          />
          <CIcon :icon="cilPen" class="h-6 w-6 text-white" />
        </label>
        <NuxtImg
          :src="eventCreatorDetails.image_banner"
          class="h-full w-full"
        />
      </div>
    </div>
    <div class="space-y-2">
      <h5 class="mb-4 text-sm font-medium lg:text-base">Creator Data</h5>
      <div class="space-y-2">
        <div
          class="flex flex-wrap items-center justify-center gap-6 lg:flex-nowrap lg:justify-normal lg:gap-10"
        >
          <div
            class="relative h-40 w-40 overflow-hidden rounded-full bg-slate-200"
          >
            <label
              for="logoImage"
              class="absolute flex h-full w-full cursor-pointer items-center justify-center bg-slate-600 bg-opacity-50"
            >
              <input
                id="logoImage"
                @change="
                  (event) => {
                    imageLogo = {
                      path: event.target.value,
                      file: event.target.files[0],
                    };
                    isEditLogoModalOpen = true;
                  }
                "
                type="file"
                class="hidden"
              />
              <CIcon :icon="cilPen" class="h-6 w-6 text-white" />
            </label>
            <NuxtImg :src="eventCreatorDetails.image_logo" />
          </div>
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
    <EditEventCreatorLogo
      v-if="isEditLogoModalOpen"
      :creator-id="eventCreatorDetails.id as number"
      :image="imageLogo?.file as File"
      @close-modal="isEditLogoModalOpen = false"
      @refresh-data="refresh"
    />
    <EditEventCreatorBanner
      v-if="isEditBannerModalOpen"
      :creator-id="eventCreatorDetails.id as number"
      :image="imageBanner?.file as File"
      @close-modal="isEditBannerModalOpen = false"
      @refresh-data="refresh"
    />
  </div>
</template>
