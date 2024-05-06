<script setup lang="ts">
import type { Friend } from "@/types/types";
import InviteToRoom from "@/components/friends/InviteToRoom.vue";

const props = defineProps<{
  friend: Friend;
}>();

const emit = defineEmits<{
  (e: "toggleFriendProfileVisibility"): void;
}>();
</script>

<template>
  <div class="flex flex-col items-center w-48 bg-base-200 px-4 py-5 rounded-xl shadow-2xl">
    <div class="flex items-center justify-between w-full mb-4">
      <h4 class="text-xl font-bold">
        {{ props.friend.username }}
      </h4>
      <button
        @click="emit('toggleFriendProfileVisibility')"
        class="btn btn-xs btn-circle btn-neutral"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="avatar mb-6">
      <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img :src="props.friend.photo" />
      </div>
    </div>
    <InviteToRoom :friend="props.friend" />
    <button class="btn btn-sm btn-neutral">Remove friend</button>
  </div>
</template>
