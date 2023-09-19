<script setup lang="ts">
import { cn } from "~/lib/utils";
import { cva } from "class-variance-authority";
import { ClassValue } from "clsx";

const props = withDefaults(
  defineProps<{
    variant: "default" | "defaultOutline";
  }>(),
  {
    variant: "default",
  },
);

const buttonVariants = computed(() => {
  return cva(
    "flex items-center duration-200 lg:text-sm text-xs transition disabled:opacity-50 justify-center rounded-lg py-2 px-4",
    {
      variants: {
        intent: {
          default: "bg-blue-800 text-white hover:bg-blue-700",
          defaultOutline:
            "bg-blue-800 hover:bg-blue-700 border text-white border-blue-600",
        },
      },
    },
  )({ intent: props.variant });
});
</script>

<template>
  <button :class="cn(buttonVariants, $props.class as ClassValue[])">
    <slot />
  </button>
</template>
