<script setup lang="ts">
import { ref } from "vue";
import TopNavigation from "@components/navigation/TopNavigation.vue";
import LeftMenu from "@components/navigation/LeftMenu.vue";

const emit = defineEmits<{
  (e: "toggleMenuVisibility", isMenuVisible: boolean): void;
}>();

const isMenuVisible = ref(false);

function handleToggleMenuVisibility(): void {
  isMenuVisible.value = !isMenuVisible.value;
  emit("toggleMenuVisibility", isMenuVisible.value);
}
</script>

<template>
  <nav>
    <TopNavigation
      :is-menu-visible="isMenuVisible"
      @toggle-menu-visibility="handleToggleMenuVisibility"
    />
  </nav>
  <Transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
  >
    <div
      v-if="isMenuVisible"
      class="fixed inset-0 top-16 z-40 bg-base-100/60 backdrop-blur-sm sm:hidden"
      @click="handleToggleMenuVisibility"
    ></div>
  </Transition>
  <LeftMenu
    @toggle-menu-visibility="handleToggleMenuVisibility"
    class="fixed top-16 bottom-0 z-50 transition-all duration-300 ease-out"
    :class="[isMenuVisible ? 'left-0' : '-left-full']"
  />
</template>
