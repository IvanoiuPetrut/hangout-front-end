<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
}>();
</script>

<template>
  <main class="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
    <section
      class="relative hidden overflow-hidden border-r border-base-content/[0.06] bg-base-200 lg:flex lg:flex-col lg:justify-between lg:p-12"
    >
      <div
        class="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:22px_22px]"
      ></div>

      <div class="relative flex items-center gap-3">
        <span class="brand-mark h-10 w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z"
            />
            <path
              d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z"
            />
          </svg>
        </span>
        <span class="text-xl font-bold tracking-tight">Hangout</span>
      </div>

      <div class="relative max-w-md">
        <h2 class="text-4xl font-extrabold leading-tight tracking-tight">
          Chat, call and <span class="text-gradient">hang out</span> with the people you like.
        </h2>
        <ul class="mt-8 flex flex-col gap-3 text-base-content/70">
          <li class="flex items-center gap-3">
            <span class="badge badge-primary badge-xs"></span> Real-time rooms with markdown chat
          </li>
          <li class="flex items-center gap-3">
            <span class="badge badge-secondary badge-xs"></span> Voice and video, right in the
            browser
          </li>
          <li class="flex items-center gap-3">
            <span class="badge badge-accent badge-xs"></span> Share files and images instantly
          </li>
        </ul>
      </div>

      <p class="relative text-sm text-base-content/40">© Petrut-Dragos Ivanoiu</p>
    </section>

    <section class="flex items-center justify-center px-4 py-12 sm:px-6">
      <div class="w-full max-w-sm animate-fade-up">
        <h1 class="text-3xl font-extrabold tracking-tight">{{ title }}</h1>
        <p class="mb-8 mt-2 text-base-content/60">{{ subtitle }}</p>
        <slot />
      </div>
    </section>
  </main>
</template>
