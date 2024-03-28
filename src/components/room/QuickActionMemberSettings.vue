<script setup lang="ts">
import { ref } from "vue";

const isMenuVisible = ref(false);

function toggleMenuVisibility() {
  isMenuVisible.value = !isMenuVisible.value;
}
</script>

<template>
  <div class="relative">
    <button @click="toggleMenuVisibility" class="btn btn-neutral btn-sm">Click me</button>
    <div v-if="isMenuVisible" class="join join-vertical absolute top-10 left-1 z-50">
      <button class="btn join-item">Button</button>
      <button class="btn join-item">Button</button>
      <button class="btn join-item">Button</button>
    </div>
  </div>
</template>
