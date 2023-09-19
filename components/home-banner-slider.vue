<script setup lang="ts">
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper as Slider, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Swiper } from "swiper/types";

const slides = ref<Swiper>();
const showNavigation = ref(false);
const onSwiper = (swiper: Swiper) => (slides.value = swiper);
</script>

<template>
  <div
    class="relative w-full px-4 lg:w-5/6 lg:px-0"
    @mouseover="showNavigation = true"
    @mouseout="showNavigation = false"
  >
    <slider
      :modules="[Navigation, Autoplay]"
      :autoplay="true"
      :loop="true"
      :navigation="true"
      :slides-per-view="1"
      :space-between="50"
      @swiper="onSwiper"
      class="h-32 rounded-lg lg:h-60"
    >
      <swiper-slide class="h-full">
        <img
          src="https://ymudtpspkdopgzrtzevt.supabase.co/storage/v1/object/sign/banner_images/1691575224_AGeMc8.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXJfaW1hZ2VzLzE2OTE1NzUyMjRfQUdlTWM4LmpwZyIsImlhdCI6MTY5NDg5MDA1OCwiZXhwIjoxNzI2NDI2MDU4fQ.cQotvL6lPoqIKYED87iRDQevWAyP07oCDfbG1MhaefU&t=2023-09-16T18%3A47%3A38.830Z"
          alt="banner-image"
          class="h-full w-full"
        />
      </swiper-slide>
      <swiper-slide class="h-full">
        <img
          src="https://ymudtpspkdopgzrtzevt.supabase.co/storage/v1/object/sign/banner_images/1690530867_sahQv9.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXJfaW1hZ2VzLzE2OTA1MzA4Njdfc2FoUXY5LmpwZyIsImlhdCI6MTY5NDg5MDEyNywiZXhwIjoxNzI2NDI2MTI3fQ.CF7e748yi05sPXV-UuSAQUL2whHfP5q9N-3BciXX3Dw&t=2023-09-16T18%3A48%3A47.662Z"
          alt="banner-image"
          class="h-full w-full"
        />
      </swiper-slide>
      <swiper-slide class="h-full">
        <img
          src="https://ymudtpspkdopgzrtzevt.supabase.co/storage/v1/object/sign/banner_images/1690260495_PraZyu.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXJfaW1hZ2VzLzE2OTAyNjA0OTVfUHJhWnl1LmpwZyIsImlhdCI6MTY5NDg5MDE0NiwiZXhwIjoxNzI2NDI2MTQ2fQ.ogFhij8uw2qFHhMXHQpzv-9mhHFvvTR_odFolsh9PXE&t=2023-09-16T18%3A49%3A06.281Z"
          alt="banner-image"
          class="h-full w-full"
        />
      </swiper-slide>
    </slider>
    <button
      v-show="showNavigation"
      class="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-slate-50 shadow-md lg:-left-2 lg:h-10 lg:w-10"
      @click="slides?.slidePrev()"
    >
      <IconsChevronLeft class="h-4 w-4" />
    </button>
    <button
      v-show="showNavigation"
      class="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-slate-50 shadow-md lg:-right-2 lg:h-10 lg:w-10"
      @click="slides?.slideNext()"
    >
      <IconsChevronRight />
    </button>
  </div>
</template>
