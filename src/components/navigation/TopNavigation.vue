<script setup lang="ts">
import { ref } from "vue";

const isMenuVisible = ref(false);

const emit = defineEmits<{
  (e: "toggleMenuVisibility"): void;
}>();

function handleToggleMenuVisibility() {
  emit("toggleMenuVisibility");
  isMenuVisible.value = !isMenuVisible.value;
}
</script>

<template>
  <div class="navbar bg-base-300">
    <div class="flex-none">
      <button
        @click="handleToggleMenuVisibility"
        class="btn btn-circle swap swap-rotate"
        :class="{ 'swap-active': isMenuVisible }"
        data-testid="toggle-navigation-button"
      >
        <svg
          class="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        <svg
          class="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
          />
        </svg>
      </button>
    </div>
    <!-- <p class="ml-auto font-bold text-xl text-accent">Hangout</p> -->
    <div class="ml-auto font-bold bg-primary-transparent text-primary text-md py-2 px-3 rounded-md">
      <h2 class="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z"
          />
          <path
            d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z"
          />
        </svg>
        <span> Hangout </span>
      </h2>
    </div>
  </div>
</template>
