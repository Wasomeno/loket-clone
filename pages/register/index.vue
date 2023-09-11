<script setup lang="ts">
import { reactive } from "vue";

type ActiveTab = {
  activeTab: "phone" | "email";
  isPhoneTab: boolean;
  isEmailTab: boolean;
};

const tabStates = reactive<ActiveTab>({
  activeTab: "email",
  isPhoneTab: false,
  isEmailTab: true,
});

function setActiveTab(tab: "phone" | "email") {
  tabStates.activeTab = tab;
  tabStates.isEmailTab = tab === "email";
  tabStates.isPhoneTab = tab === "phone";
}
</script>

<template>
  <main class="flex min-h-screen flex-1 flex-col gap-6 bg-slate-50">
    <div class="py-4 text-center">
      <RouterLink
        to="/"
        class="text-sm font-semibold tracking-wider lg:text-3xl"
        >Loket</RouterLink
      >
    </div>
    <div class="flex flex-1 justify-evenly gap-4">
      <div
        class="hidden w-3/12 flex-col items-center justify-start gap-6 lg:flex"
      >
        <img
          src="https://img.freepik.com/free-vector/flat-hand-drawn-young-people-using-smartphones_52683-56395.jpg?w=2000&t=st=1693225295~exp=1693225895~hmac=de61bf55b857ae6cec57ffac7ee98f218086bc5d568f580a9a662d6b05d9343a"
          class="w-96 rounded-xl shadow-sm"
        />
        <div class="w-80 space-y-3 text-center">
          <span class="text-lg font-medium"
            >No more missing your favorite events</span
          >
          <p class="text-sm">
            Join and experience the convenience of transacting and managing
            events at Loket
          </p>
        </div>
      </div>
      <div class="flex w-full flex-col items-center gap-4 p-4 lg:w-3/12">
        <div class="space-y-3 text-center">
          <h5 class="text-lg font-semibold lg:text-xl">
            Register your account
          </h5>
          <span class="text-xs lg:text-sm"
            >Already have an account?
            <RouterLink to="/login"
              ><span class="font-semibold text-blue-800"
                >Sign in</span
              ></RouterLink
            ></span
          >
        </div>
        <div
          class="flex h-60 w-full flex-col rounded-xl bg-white p-6 shadow-md"
        >
          <div class="flex items-center justify-center">
            <button
              :disabled="tabStates.isEmailTab"
              @click="setActiveTab('phone')"
              class="w-3/6 border-b-2 pb-2 text-center text-sm font-medium transition duration-200 disabled:opacity-50 lg:text-base"
              :class="{ 'border-b-blue-900': tabStates.isPhoneTab }"
            >
              Phone Number
            </button>
            <button
              @click="setActiveTab('email')"
              class="w-3/6 border-b-2 pb-2 text-center text-sm font-medium transition duration-200 lg:text-base"
              :class="{ 'border-b-blue-900': tabStates.isEmailTab }"
            >
              Email
            </button>
          </div>
          <div class="space-y-4 py-4">
            <div class="space-y-2" v-if="tabStates.activeTab === 'phone'">
              <label class="text-sm font-medium opacity-50">
                Phone Number
              </label>
              <input
                type="string"
                class="w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>
            <div class="space-y-2" v-else>
              <label class="text-sm font-medium opacity-50"> Email </label>
              <input
                type="string"
                class="w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>
          </div>
          <button
            class="w-full rounded-lg bg-blue-800 p-2 text-sm font-medium text-white lg:text-base"
          >
            Register
          </button>
        </div>
        <div class="flex items-center gap-4">
          <button
            disabled
            class="w-40 rounded-lg bg-blue-900 p-2 text-xs font-medium text-white disabled:opacity-50 lg:text-sm"
          >
            Facebook
          </button>
          <button
            class="w-40 rounded-lg border bg-white p-2 text-xs font-medium lg:text-sm"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
