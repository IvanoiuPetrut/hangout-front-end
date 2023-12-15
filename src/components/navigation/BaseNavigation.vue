<script setup lang="ts">
import { ref } from 'vue'
import TopNavigation from '@components/navigation/TopNavigation.vue'
import LeftMenu from '@components/navigation/LeftMenu.vue'

const emit = defineEmits<{
  (e: 'toggleMenuVisibility', isMenuVisible: boolean): void
}>()

const isMenuVisible = ref(false)

function handleToggleMenuVisibility(): void {
  isMenuVisible.value = !isMenuVisible.value
  emit('toggleMenuVisibility', isMenuVisible.value)
}
</script>

<template>
  <nav>
    <TopNavigation
      :friend-name="'Some random name'"
      @toggle-menu-visibility="handleToggleMenuVisibility"
      class="relative"
    />
  </nav>
  <LeftMenu
    class="z-50 absolute transition-all h-[calc(100%-4rem)]"
    :class="[isMenuVisible ? 'left-0' : '-left-full']"
  />
</template>
