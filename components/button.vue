<script setup lang="ts">
import { cn } from "~/lib/utils";
import { cva } from "class-variance-authority";

const props = withDefaults(
  defineProps<{ variant: "default" | "defaultOutline" }>(),
  {
    variant: "default",
  },
);

const buttonVariants = computed(() => {
  return cva(
    "flex items-center duration-200 transition disabled:opacity-50 justify-center rounded-lg py-2 px-4",
    {
      variants: {
        intent: {
          default: "bg-slate-50 hover:bg-slate-100",
          defaultOutline:
            "bg-slate-50 hover:bg-slate-100 border border-slate-300",
        },
      },
    },
  )({ intent: props.variant });
});
</script>

<template>
  <button :class="cn(buttonVariants)">
    <slot />
  </button>
</template>
