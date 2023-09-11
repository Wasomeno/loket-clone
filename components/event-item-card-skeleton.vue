<template>
  <div
    class="col-span-1 overflow-hidden rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
  >
    <Skeleton class="h-36 w-full rounded-none" />
    <div class="px-4">
      <div class="flex flex-col gap-2 py-6">
        <Skeleton class="h-[18px] w-40 rounded-lg" />
        <Skeleton class="h-[18px] w-32 rounded-lg" />
        <Skeleton class="h-[18px] w-40 rounded-lg" />
      </div>
      <div class="border-t border-t-slate-300 py-4">
        <div class="flex items-center gap-4">
          <Skeleton class="h-7 w-7 rounded-full" />
          <Skeleton class="h-[16px] w-32" />
        </div>
      </div>
    </div>
  </div>
</template>

<style />
