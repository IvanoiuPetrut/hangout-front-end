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
    <button
      @click="toggleMenuVisibility"
      class="btn btn-ghost btn-square btn-sm text-base-content/60"
      aria-label="Member options"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5"
      >
        <path
          d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
        />
      </svg>
    </button>
    <div
      v-if="isMenuVisible"
      class="absolute right-0 top-10 z-50 w-40 animate-pop-in rounded-box border border-base-content/10 bg-base-200 p-1.5 shadow-2xl"
    >
      <!-- <button v-if="true" @click="handleButtonClick" class="btn join-item">Make moderator</button>
      <button @click="handleButtonClick" class="btn join-item">Add friend</button> -->
      <button
        v-if="true"
        @click="handleKickUser"
        class="flex w-full items-center gap-2 rounded-btn px-3 py-2 text-left text-sm text-error transition-colors hover:bg-error/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.75"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
        Kick user
      </button>
    </div>
  </div>
</template>
