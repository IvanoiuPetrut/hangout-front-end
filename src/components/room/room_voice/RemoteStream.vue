<script setup lang="ts">
const props = defineProps<{
  localStream: MediaStream | null;
  userName: string;
  photo: string;
}>();
</script>

<template>
  <div class="relative group">
    <video
      v-if="props.localStream"
      :srcObject="props.localStream"
      class="w-36 md:w-64 rounded-md group-hover:opacity-75 transition-opacity border-2 border-neutral"
      autoplay
      playsinline
    ></video>
    <div v-else class="w-36 md:w-64 h-36 md:h-64 bg-base-200 border border-neutral rounded-md">
      <div class="flex items-center justify-center h-full">
        <img :src="props.photo" alt="Your profile picture" class="rounded-full" />
      </div>
    </div>

    <span
      class="font-bold absolute left-1/2 bottom-1 transform -translate-x-1/2 bg-base-200 px-2 py-1 rounded-md opacity-50 border border-neutral group-hover:opacity-100 transition-opacity"
    >
      {{ props.userName }}
    </span>
  </div>
</template>
