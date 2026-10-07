<script setup lang="ts">
import type { Friend } from "@/types/types";
import InviteToRoom from "@/components/friends/InviteToRoom.vue";
import { removeFriend } from "@/services/friend/friendInteractor";

const props = defineProps<{
  friend: Friend;
}>();

const emit = defineEmits<{
  (e: "toggleFriendProfileVisibility"): void;
}>();

async function handleRemoveFriend() {
  await removeFriend(props.friend.id);
}
</script>

<template>
  <div
    class="w-64 animate-pop-in overflow-hidden rounded-box border border-base-content/10 bg-base-200 shadow-2xl"
  >
    <div class="relative h-20 bg-gradient-to-br from-primary/60 via-accent/40 to-secondary/40">
      <button
        @click="emit('toggleFriendProfileVisibility')"
        class="btn btn-circle btn-ghost btn-xs absolute right-2 top-2 bg-base-100/40 backdrop-blur"
        aria-label="Close profile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-3.5 w-3.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="flex flex-col items-center px-5 pb-5">
      <div class="avatar -mt-10 mb-3">
        <div class="w-20 rounded-full ring-4 ring-base-200">
          <img :src="props.friend.photo" :alt="props.friend.username" />
        </div>
      </div>
      <h4 class="mb-4 text-lg font-bold">
        {{ props.friend.username }}
      </h4>
      <div class="flex w-full flex-col gap-2">
        <InviteToRoom :friend="props.friend" />
        <button
          @click="handleRemoveFriend"
          class="btn btn-ghost btn-sm w-full text-error hover:bg-error/10"
        >
          Remove friend
        </button>
      </div>
    </div>
  </div>
</template>
