<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import BaseFooter from "@/components/navigation/BaseFooter.vue";
import UserStats from "@/components/navigation/data_display/UserStats.vue";

const quickActions = [
  {
    to: { name: "friends" },
    title: "Message friends",
    description: "Pick up a conversation where you left off.",
    color: "from-primary/20 to-primary/0 text-primary",
    icon: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
  },
  {
    to: { name: "join-room" },
    title: "Start a room",
    description: "Create a space for chat, voice and video.",
    color: "from-secondary/20 to-secondary/0 text-secondary",
    icon: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
  },
  {
    to: { name: "notifications" },
    title: "Check your inbox",
    description: "Friend requests and room invites land here.",
    color: "from-accent/20 to-accent/0 text-accent",
    icon: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
  }
];
</script>

<template>
  <main class="flex min-h-[calc(100vh-4rem)] flex-col">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-16">
      <section class="animate-fade-up">
        <p class="section-title mb-3">Dashboard</p>
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Welcome back<template v-if="useUserStore().userName"
            >, <span class="text-gradient">{{ useUserStore().userName }}</span></template
          >
        </h1>
        <p class="mt-3 max-w-xl text-base-content/60">
          Here's what's happening across your friends and rooms.
        </p>
      </section>

      <UserStats class="animate-fade-up [animation-delay:60ms]" />

      <section class="animate-fade-up [animation-delay:120ms]">
        <p class="section-title mb-3">Quick actions</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <RouterLink
            v-for="action in quickActions"
            :key="action.title"
            :to="action.to"
            class="surface surface-hover group relative overflow-hidden p-5"
          >
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60"
              :class="action.color"
            ></div>
            <div class="relative flex flex-col gap-4">
              <span
                class="grid h-10 w-10 place-items-center rounded-xl bg-base-100/60 ring-1 ring-base-content/10"
                :class="action.color"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.75"
                  stroke="currentColor"
                  class="h-5 w-5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" :d="action.icon" />
                </svg>
              </span>
              <div>
                <h3 class="flex items-center gap-1 font-semibold">
                  {{ action.title }}
                  <span
                    class="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                    >→</span
                  >
                </h3>
                <p class="mt-1 text-sm text-base-content/60">{{ action.description }}</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
    <BaseFooter class="mt-auto" />
  </main>
</template>
