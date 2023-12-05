<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseNavigation from '@components/navigation/BaseNavigation.vue'
</script>

<template>
  <header>
    <BaseNavigation />
  </header>
  <!-- <RouterLink :to="{ name: 'home' }">Home</RouterLink> -->

  <RouterView />
</template>
