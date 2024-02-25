<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  friendName: string;
}>();

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
    <p class="ml-auto font-bold">{{ friendName }}</p>
  </div>
</template>
