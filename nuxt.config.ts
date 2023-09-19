// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth", "@nuxt/image"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    domains: ["npqvursxoqbyzwgksvio.supabase.co"],
  },
  runtimeConfig: {
    public: {
      NUXT_AUTH_SECRET: process.env.NUXT_AUTH_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_SECRET: process.env.GOOGLE_SECRET,
      PROJECT_URL: process.env.PROJECT_URL,
      PROJECT_API_KEY: process.env.PROJECT_API_KEY,
    },
  },
});
