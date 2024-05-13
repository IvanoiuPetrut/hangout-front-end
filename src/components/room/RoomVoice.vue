<script setup lang="ts">
import { ref, onMounted } from "vue";
import RoomVoiceActions from "@/components/room/room_voice/RoomVoiceActions.vue";
import RoomVoiceConnectedUsers from "@/components/room/room_voice/RoomVoiceConnectedUsers.vue";
import { useUserStore } from "@/stores/user";
import LocalStream from "@/components/room/room_voice/LocalStream.vue";

const isUserInVoiceChannel = ref(false);
const localStream = ref<MediaStream>();

async function fetchUserMedia() {
  console.log("Fetching user media");
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  return stream;
}

async function createCall() {
  console.log("Creating call");
  localStream.value = await fetchUserMedia();
}

function joinVoiceChannel() {
  isUserInVoiceChannel.value = true;
}

function handleToggleAudio(value: boolean) {
  console.log("Toggling audio", value);
}

function handleToggleCamera(value: boolean) {
  if (localStream.value) {
    localStream.value.getVideoTracks().forEach((track) => {
      track.enabled = !value;
    });
  }
}

function handleToggleMic(value: boolean) {
  if (localStream.value) {
    localStream.value.getAudioTracks().forEach((track) => {
      track.enabled = !value;
    });
  }
}

onMounted(() => {
  createCall();
});
</script>

<template>
  <div v-if="!isUserInVoiceChannel" class="w-full h-full flex items-center justify-center">
    <button @click="joinVoiceChannel" class="btn btn-wide btn-primary">Join voice channel</button>
  </div>
  <div v-else class="w-full h-full flex flex-col max-w-3xl mx-auto pt-2">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
      <LocalStream :local-stream="localStream" />
    </div>

    <div class="mt-auto">
      <RoomVoiceConnectedUsers />
      <RoomVoiceActions
        @toggleAudio="handleToggleAudio"
        @toggleCamera="handleToggleCamera"
        @toggleMic="handleToggleMic"
      />
    </div>
  </div>
</template>
