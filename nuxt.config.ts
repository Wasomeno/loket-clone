// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      NUXT_AUTH_SECRET: "EE2AAE7E145D6B452FF6995D739CA",
      GOOGLE_CLIENT_ID:
        "63216408228-82nlub8ge2pht65hc1ph20itkhphq45o.apps.googleusercontent.com",
      GOOGLE_SECRET: "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",
    },
  },
});
