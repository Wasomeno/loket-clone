import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from "#auth";

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: runtimeConfig.public.NUXT_AUTH_SECRET,
  providers: [
    GoogleProvider.default({
      id: "google",
      clientId: runtimeConfig.public.GOOGLE_CLIENT_ID,
      clientSecret: runtimeConfig.public.GOOGLE_SECRET,
    }),
  ],
});
