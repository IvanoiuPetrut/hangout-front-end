<script setup lang="ts">
const props = defineProps<{
  localStream: MediaStream | null;
  userName: string;
  photo: string;
}>();
</script>

<template>
  <div
    class="group relative aspect-video w-full overflow-hidden rounded-2xl bg-base-300 ring-1 ring-base-content/10"
  >
    <video
      v-if="props.localStream"
      :srcObject="props.localStream"
      class="h-full w-full object-cover"
      autoplay
      playsinline
    ></video>
    <div
      v-else
      class="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 to-accent/10"
    >
      <img
        :src="props.photo"
        alt="Profile picture"
        class="h-20 w-20 rounded-full object-cover ring-4 ring-base-100/50"
      />
    </div>

    <span
      class="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur"
    >
      <span class="h-1.5 w-1.5 rounded-full bg-success"></span>
      {{ props.userName }}
    </span>
  </div>
</template>
