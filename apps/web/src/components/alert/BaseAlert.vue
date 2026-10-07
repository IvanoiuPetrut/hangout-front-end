<script setup lang="ts"></script>

<template>
  <div
    role="alert"
    class="alert fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm animate-fade-up border-0 shadow-2xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="h-6 w-6 shrink-0 stroke-current"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <slot>
      <span>Alert description.</span>
    </slot>
  </div>
</template>
