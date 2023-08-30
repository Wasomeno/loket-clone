<script setup lang="ts">
import { reactive } from "vue";

type ActiveTab = {
  activeTab: "description" | "ticket";
  isDescTab: boolean;
  isTicketTab: boolean;
};

const tabStates = reactive<ActiveTab>({
  activeTab: "description",
  isDescTab: true,
  isTicketTab: false,
});

function setActiveTab(tab: "description" | "ticket") {
  tabStates.activeTab = tab;
  tabStates.isDescTab = tab === "description";
  tabStates.isTicketTab = tab === "ticket";
}
</script>

<template>
  <main class="flex min-h-screen flex-col items-center gap-6 bg-slate-50">
    <div class="mt-6 w-5/6">
      <span class="text-sm"> Home </span>
    </div>
    <div class="flex w-5/6 items-center gap-6">
      <div
        class="h-80 w-full rounded-xl bg-blue-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      />
      <div
        class="flex h-80 w-96 flex-col justify-between rounded-xl px-6 pt-6 shadow-md"
      >
        <div>
          <h1 class="mb-4 text-xl font-semibold">Event Title</h1>
          <div class="flex flex-col gap-2">
            <span>03 September 2023</span>
            <span>19.00 - 22.00</span>
            <span>Grand Ballroom Kempinski</span>
          </div>
        </div>
        <RouterLink to="/creator/1">
          <div
            class="flex items-center gap-4 border-t border-dashed border-slate-300 py-4"
          >
            <div class="h-9 w-9 rounded-full bg-blue-300" />
            <span class="text-sm font-medium">Event Creator</span>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="flex w-5/6 items-start justify-center gap-6">
      <div class="w-full">
        <div class="flex items-start">
          <button
            @click="setActiveTab('description')"
            class="w-3/6 border-b-2 pb-2 text-center font-medium transition duration-200"
            :class="{ 'border-b-blue-900': tabStates.isDescTab }"
          >
            Description
          </button>
          <button
            @click="setActiveTab('ticket')"
            class="w-3/6 border-b-2 pb-2 text-center font-medium transition duration-200"
            :class="{ 'border-b-blue-900': tabStates.isTicketTab }"
          >
            Ticket
          </button>
        </div>
        <div class="py-6" v-if="tabStates.isDescTab">
          <p class="mb-6 leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div class="space-y-2">
            <h4 class="border-l-4 border-l-blue-800 pl-2 text-lg font-medium">
              Terms of Services
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div class="py-6" v-else>
          <h3 class="mb-2 text-lg font-semibold">Online Tickets</h3>
          <h4 class="mb-6">Price starts from Rp 500.000</h4>
          <div class="flex w-full flex-col gap-4">
            <BuyTicketCard />
          </div>
        </div>
      </div>
      <div class="flex h-20 w-96 items-center rounded-xl p-6 shadow-md">
        <button
          class="w-full rounded-lg bg-blue-800 p-2 font-medium text-white"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  </main>
</template>
