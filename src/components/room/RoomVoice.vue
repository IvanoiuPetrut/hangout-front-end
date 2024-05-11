<script setup lang="ts">
import { ref, onMounted } from "vue";
import RoomVoiceActions from "@/components/room/room_voice/RoomVoiceActions.vue";
import RoomVoiceConnectedUsers from "@/components/room/room_voice/RoomVoiceConnectedUsers.vue";
import { useUserStore } from "@/stores/user";

const isUserInVoiceChannel = ref(false);
const localStream = ref<MediaStream | null>(null);

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
      <!-- <div class="avatar">
        <div class="w-24 md:w-36 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div class="avatar">
        <div class="w-24 md:w-36 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div class="avatar">
        <div class="w-24 md:w-36 rounded-full">
          <img :src="useUserStore().photo" />
        </div>
      </div> -->
      <video
        v-if="localStream"
        ref="localVideo"
        class="w-24 md:w-36 rounded-full"
        autoplay
        playsinline
        controls
      ></video>
    </div>
    <div class="mt-auto">
      <RoomVoiceConnectedUsers />
      <RoomVoiceActions />
    </div>
  </div>
</template>
