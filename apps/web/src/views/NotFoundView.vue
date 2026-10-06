<template>
  <div
    class="flex min-h-[calc(100vh-4rem)] animate-fade-up flex-col items-center justify-center gap-4 px-4 text-center"
  >
    <p class="text-gradient text-8xl font-extrabold tracking-tighter sm:text-9xl">404</p>
    <h2 class="text-2xl font-bold">Page not found</h2>
    <p class="max-w-sm text-base-content/60">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <RouterLink :to="{ name: 'home' }" class="btn btn-primary mt-4">Back to home</RouterLink>
  </div>
</template>
