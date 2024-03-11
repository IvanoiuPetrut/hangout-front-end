<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Friend } from "@/types/types.ts";
import { getFriends } from "@/services/friend/friendInteractor";
import { useAsyncRequest } from "@/helpers/asyncRequest";

import FriendList from "@/components/friends/FriendList.vue";
import FriendsChat from "@/components/friends/FriendsChat.vue";
import AddFriend from "@/components/friends/AddFriend.vue";

const selectedFriend = ref<Friend | null>(null);
const isFriendsMenuVisible = ref(false);

const { data: friends, execute: executeGetFriends } = useAsyncRequest(getFriends);

function handleSelectFriend(friend: Friend): void {
  selectedFriend.value = friend;
}

function toggleFriendsMenuVisibility(): void {
  isFriendsMenuVisible.value = !isFriendsMenuVisible.value;
}

onMounted(() => {
  executeGetFriends();
});
</script>

<template>
  <div class="flex">
    <div
      class="h-[calc(100vh-4rem-2px)] flex flex-col gap-4 z-10 border-r-2 border-neutral bg-base-300"
      :class="{ hidden: isFriendsMenuVisible }"
    >
      <FriendList
        v-if="friends"
        :friends="friends"
        @select-friend="handleSelectFriend"
        class="p-2 overflow-y-auto"
      />
      <AddFriend />
      <button @click="toggleFriendsMenuVisibility" class="btn btn-sm btn-neutral mb-2 mx-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
            clip-rule="evenodd"
          />
        </svg>
        Close
      </button>
    </div>
    <div class="w-full grid grid-rows-[auto,1fr]">
      <div class="w-full border-b-2 border-neutral py-2">
        <button
          v-if="isFriendsMenuVisible"
          @click="toggleFriendsMenuVisibility"
          class="btn btn-neutral btn-sm ml-2 absolute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
          Open
        </button>
        <h3 v-if="selectedFriend" class="mx-auto text-center text-xl px-4 text-accent font-bold">
          {{ selectedFriend.username }}
        </h3>
        <h3
          v-else
          class="flex gap-2 items-center mx-auto text-center text-xl px-4 font-bold"
          :class="{ 'ml-24': isFriendsMenuVisible }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <span> Select a friend </span>
        </h3>
      </div>
      <FriendsChat v-if="selectedFriend" class="absolute left-0 bottom-0 sm:static" />
    </div>
  </div>
</template>
