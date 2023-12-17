<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import BaseNavigation from '@components/navigation/BaseNavigation.vue'

const shouldContentHavePadding = ref(false)

function handleToggleMenuVisibility(isMenuVisible: boolean): void {
  shouldContentHavePadding.value = isMenuVisible
}
</script>

<template>
  <header>
    <BaseNavigation @toggle-menu-visibility="handleToggleMenuVisibility" />
  </header>
  <div :class="[shouldContentHavePadding ? 'pl-56' : 'pl-0']">
    <RouterView />
  </div>
</template>
