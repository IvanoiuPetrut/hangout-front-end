<script setup lang="ts">
import ThemeController from "@components/theme/ThemeController.vue";

const props = defineProps<{
  isMenuVisible?: boolean;
}>();

const emit = defineEmits<{
  (e: "toggleMenuVisibility"): void;
}>();

function handleToggleMenuVisibility() {
  emit("toggleMenuVisibility");
}
</script>

<template>
  <div
    class="flex h-16 items-center gap-2 border-b border-base-content/[0.06] bg-base-100/70 px-3 backdrop-blur-xl sm:px-4"
  >
    <button
      @click="handleToggleMenuVisibility"
      class="btn btn-ghost btn-square btn-sm swap swap-rotate"
      :class="{ 'swap-active': props.isMenuVisible }"
      aria-label="Toggle navigation"
      data-testid="toggle-navigation-button"
    >
      <svg
        class="swap-off h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h10.5"
        />
      </svg>
      <svg
        class="swap-on h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>

    <RouterLink :to="{ name: 'home' }" class="flex items-center gap-2.5">
      <span class="brand-mark h-8 w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-[18px] w-[18px]"
        >
          <path
            d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z"
          />
          <path
            d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z"
          />
        </svg>
      </span>
      <span class="hidden text-lg font-bold tracking-tight sm:block">Hangout</span>
    </RouterLink>

    <div class="ml-auto flex items-center gap-1">
      <RouterLink
        :to="{ name: 'notifications' }"
        class="btn btn-ghost btn-circle btn-sm"
        aria-label="Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.75"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
      </RouterLink>
      <ThemeController />
    </div>
  </div>
</template>
