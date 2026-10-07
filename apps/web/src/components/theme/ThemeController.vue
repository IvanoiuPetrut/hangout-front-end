<script setup lang="ts">
import { ref, onMounted } from "vue";

const selectedTheme = ref<string>("");

const themes = [
  { dispalyName: "Hangout", value: "hangout" },
  { dispalyName: "Hangout Light", value: "hangout-light" },
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
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle btn-sm" aria-label="Theme">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.75"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
        />
      </svg>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content z-[60] mt-3 flex w-56 flex-col gap-1 rounded-box border border-base-content/10 bg-base-200 p-2 shadow-2xl"
    >
      <li class="section-title px-2 py-1">Theme</li>
      <li v-for="theme in themes" :key="theme.value">
        <button
          @click="handleThemeChange(theme.value)"
          class="flex w-full items-center gap-3 rounded-btn px-2 py-1.5 text-left text-sm transition-colors hover:bg-base-content/5"
          :class="{ 'bg-primary/10 text-primary': theme.value === selectedTheme }"
        >
          <span
            :data-theme="theme.value"
            class="grid shrink-0 grid-cols-2 gap-0.5 rounded-md bg-base-100 p-1 shadow-sm ring-1 ring-base-content/10"
          >
            <span class="h-2 w-2 rounded-full bg-primary"></span>
            <span class="h-2 w-2 rounded-full bg-secondary"></span>
            <span class="h-2 w-2 rounded-full bg-accent"></span>
            <span class="h-2 w-2 rounded-full bg-neutral"></span>
          </span>
          <span class="flex-1">{{ theme.dispalyName }}</span>
          <svg
            v-if="theme.value === selectedTheme"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-4 w-4"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>
