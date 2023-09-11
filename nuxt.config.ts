// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
  auth: { origin: "https://loket-clone.vercel.app/" },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      NUXT_AUTH_SECRET: process.env.NUXT_AUTH_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    },
  },
});
