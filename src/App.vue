<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <button class="btn btn-accent btn-outline">Three</button>
    <div>
      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
