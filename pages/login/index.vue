<script setup lang="ts">
import { reactive } from "vue";

type ActiveTab = {
  activeTab: "phone" | "email";
  isPhoneTab: boolean;
  isEmailTab: boolean;
};

type SignInData = {
  email: string;
  password: string;
};

const signInInputStates = reactive<SignInData>({ email: "", password: "" });
const tabStates = reactive<ActiveTab>({
  activeTab: "phone",
  isPhoneTab: true,
  isEmailTab: false,
});

const router = useRouter();

console.log(router);
function setActiveTab(tab: "phone" | "email") {
  tabStates.activeTab = tab;
  tabStates.isEmailTab = tab === "email";
  tabStates.isPhoneTab = tab === "phone";
}

function tempAuth() {
  localStorage.setItem("signInData", JSON.stringify(signInInputStates));
  router.push("/");
}
</script>

<template>
  <main class="flex min-h-screen flex-1 flex-col gap-6 bg-slate-50">
    <div class="py-4 text-center">
      <RouterLink to="/" class="text-3xl font-semibold tracking-wider"
        >Loket</RouterLink
      >
    </div>
    <div class="flex flex-1 justify-evenly gap-4">
      <div class="flex w-3/12 flex-col items-center justify-start gap-6">
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
      <div class="flex w-3/12 flex-col items-center gap-4">
        <div class="space-y-3 text-center">
          <h5 class="text-xl font-semibold">Sign in to your account</h5>
          <span class="text-sm"
            >Don't have an account?
            <RouterLink to="/register"
              ><span class="font-semibold text-blue-800"
                >Register</span
              ></RouterLink
            ></span
          >
        </div>
        <form
          v-on:submit="
            (event) => {
              event.preventDefault();
              tempAuth();
            }
          "
          class="flex h-96 w-full flex-col rounded-xl bg-white p-6 shadow-md"
        >
          <div class="flex items-center justify-center">
            <button
              type="button"
              @click="setActiveTab('phone')"
              class="w-3/6 border-b-2 pb-2 text-center font-medium transition duration-200"
              :class="{ 'border-b-blue-900': tabStates.isPhoneTab }"
            >
              Phone Number
            </button>
            <button
              type="button"
              @click="setActiveTab('email')"
              class="w-3/6 border-b-2 pb-2 text-center font-medium transition duration-200"
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
                type="text"
                class="w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>
            <div class="space-y-2" v-else>
              <label class="text-sm font-medium opacity-50"> Email </label>
              <input
                type="text"
                v-model="signInInputStates.email"
                class="w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium opacity-50"> Password </label>
              <input
                v-model="signInInputStates.password"
                type="password"
                class="w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-800 p-2 font-medium text-white"
          >
            Sign in
          </button>
        </form>
        <div class="flex items-center gap-4">
          <button
            class="w-40 rounded-lg bg-blue-900 p-2 text-sm font-medium text-white"
          >
            Facebook
          </button>
          <button
            class="w-40 rounded-lg border bg-white p-2 text-sm font-medium"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
