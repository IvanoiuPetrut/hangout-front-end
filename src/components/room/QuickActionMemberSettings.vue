<script setup lang="ts">
import { ref } from "vue";

const isMenuVisible = ref(false);

function toggleMenuVisibility() {
  isMenuVisible.value = !isMenuVisible.value;
}

function handleButtonClick() {
  console.log("do stuff");
  isMenuVisible.value = false;
}
</script>

<template>
  <div class="relative">
    <button @click="toggleMenuVisibility" class="btn btn-neutral btn-sm">Options</button>
    <div
      v-if="isMenuVisible"
      class="join join-vertical w-36 absolute top-10 -left-16 md:-left-8 z-50 shadow-md border border-neutral"
    >
      <button @click="handleButtonClick" class="btn join-item">Make moderator</button>
      <button @click="handleButtonClick" class="btn join-item">Add friend</button>
      <button @click="handleButtonClick" class="btn join-item">Kick</button>
    </div>
  </div>
</template>
