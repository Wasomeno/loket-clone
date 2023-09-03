<template>
  <div>
    <UserNavigation />
    <main class="flex min-h-screen flex-1 bg-slate-50">
      <UserDashboardNavigation />
      <slot />
    </main>
    <Footer />
  </div>
</template>
