<script setup lang="ts">
const props = defineProps<{
  roomName: string;
}>();
</script>

<template>
  <div class="flex items-center justify-center gap-4 xw-full border-b-2 border-neutral py-2">
    <h3 class="text-xl px-4 text-accent font-bold">
      {{ props.roomName }}
    </h3>
  </div>
</template>
