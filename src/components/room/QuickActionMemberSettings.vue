<script setup lang="ts">
import { ref } from "vue";
import { kickUser } from "@/services/chatRoom/chatRoomInteractor";

const props = defineProps<{
  ownerId: string;
  userId: string;
  roomId: string;
}>();

const emit = defineEmits<{
  (e: "userKicked", userId: string): void;
}>();

const isMenuVisible = ref(false);

function toggleMenuVisibility() {
  isMenuVisible.value = !isMenuVisible.value;
}

function handleButtonClick() {
  console.log("do stuff");
  isMenuVisible.value = false;
}

async function handleKickUser() {
  try {
    await kickUser(props.roomId, props.userId);
    emit("userKicked", props.userId);
  } catch (error) {
    console.error(error);
  } finally {
    isMenuVisible.value = false;
  }
}
</script>

<template>
  <div class="relative">
    <button @click="toggleMenuVisibility" class="btn btn-neutral btn-sm">Options</button>
    <div
      v-if="isMenuVisible"
      class="join join-vertical w-36 absolute top-10 -left-16 md:-left-8 z-50 shadow-md border border-neutral"
    >
      <!-- <button v-if="true" @click="handleButtonClick" class="btn join-item">Make moderator</button>
      <button @click="handleButtonClick" class="btn join-item">Add friend</button> -->
      <button v-if="true" @click="handleKickUser" class="btn join-item">Kick user</button>
    </div>
  </div>
</template>
