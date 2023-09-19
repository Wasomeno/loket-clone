<script setup lang="ts">
import { cilX } from "@coreui/icons";
import CIcon from "@coreui/icons-vue";
import { createClient } from "@supabase/supabase-js";
import { EVENT_API_MAIN } from "~/lib/utils";
import axios from "axios";

const props = defineProps<{ image: File; creatorId: number }>();

const emits = defineEmits<{ "close-modal": []; "refresh-data": [] }>();

const imageURL = URL.createObjectURL(props.image);

const runtimeConfig = useRuntimeConfig();

const supabase = createClient(
  runtimeConfig.public.PROJECT_URL,
  runtimeConfig.public.PROJECT_API_KEY,
);

async function updateLogo() {
  const imageLogoUpload = await supabase.storage
    .from("event-creator-images")
    .upload(`/${props.image.name}`, props.image);

  await axios.patch(`${EVENT_API_MAIN}/creators/${props.creatorId}/logo`, {
    imageURL: `https://npqvursxoqbyzwgksvio.supabase.co/storage/v1/object/public/event-creator-images/${imageLogoUpload.data?.path}`,
  });
  emits("refresh-data");
  emits("close-modal");
}
</script>

<template>
  <Modal
    :close-modal="() => emits('close-modal')"
    class="flex flex-1 flex-col items-center bg-white lg:h-4/6 lg:w-3/6"
  >
    <div class="flex w-full items-center justify-between border-b px-6 py-4">
      <h5 class="text-sm font-medium lg:text-base">Edit Logo</h5>
      <button @click="$emit('close-modal')" class="h-4 w-4 font-medium">
        <CIcon :icon="cilX" />
      </button>
    </div>
    <div class="flex flex-1 flex-col items-center justify-center">
      <div class="h-96 w-96 overflow-hidden rounded-full border-2 shadow-sm">
        <NuxtImg :src="imageURL" class="h-full w-full" />
      </div>
    </div>
    <div class="py-4">
      <Button @click="updateLogo"> Apply Image </Button>
    </div>
  </Modal>
</template>
