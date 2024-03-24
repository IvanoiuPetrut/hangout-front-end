<script setup lang="ts">
const props = defineProps<{
  roomId: string;
}>();
</script>

<template>
  <h2>chatRoom {{ props.roomId }}</h2>
</template>
