<script setup lang="ts">
import { deleteCookie } from "@helpers/cookie";

defineProps<{
  friendName: string;
}>();

const emit = defineEmits<{
  (e: "toggleMenuVisibility"): void;
}>();

function logOutUser() {
  deleteCookie("access_token");
  deleteCookie("expires_in");
  deleteCookie("refresh_token");
}
</script>

<template>
  <div class="navbar bg-base-300">
    <div class="flex-none">
      <button
        @click="emit('toggleMenuVisibility')"
        class="btn btn-square btn-ghost"
        data-testid="toggle-navigation-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
    <p class="ml-auto font-bold">{{ friendName }}</p>
  </div>
</template>
