export default defineNuxtRouteMiddleware((to) => {
  const session = useAuth();
  const isSessionValid = session.status.value === "authenticated";

  if (!isSessionValid) return "/login";
});
