<script setup lang="ts">
import { ref, onMounted } from "vue";

const selectedTheme = ref<string>("");

const themes = [
  { dispalyName: "Dark", value: "dark" },
  { dispalyName: "Forest", value: "forest" },
  { dispalyName: "Coffee", value: "coffee" },
  { dispalyName: "Aqua", value: "aqua" }
];

function handleThemeChange(theme: string): void {
  selectedTheme.value = theme;
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

onMounted(() => {
  selectedTheme.value = localStorage.getItem("theme") || themes[0].value;
  document.documentElement.setAttribute("data-theme", selectedTheme.value);
});
</script>

<template>
  <div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-sm btn-ghost">
      Theme
      <svg
        width="12px"
        height="12px"
        class="h-2 w-2 fill-current opacity-60 inline-block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048"
      >
        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
      </svg>
    </div>
    <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box">
      <li v-for="theme in themes" :key="theme.value" @click="handleThemeChange(theme.value)">
        <input
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          :aria-label="theme.dispalyName"
          :value="theme.value"
          :checked="theme.value === selectedTheme"
        />
      </li>
    </ul>
  </div>
</template>
