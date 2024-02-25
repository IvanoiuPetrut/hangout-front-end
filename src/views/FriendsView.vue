<script setup lang="ts">
import { ref } from "vue";
import type { Friend } from "@/types/types.ts";

import FriendList from "@/components/friends/FriendList.vue";
import FriendsChat from "@/components/friends/FriendsChat.vue";

const selectedFriend = ref<Friend | null>(null);

const friendsDummy = [
  {
    id: "1",
    name: "John",
    photo: "https://randomuser.me/api/portraits/men/84.jpg"
  },
  {
    id: "2",
    name: "Jane",
    photo: "https://randomuser.me/api/portraits/women/82.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  }
];

function handleSelectFriend(friend: Friend): void {
  selectedFriend.value = friend;
}
</script>

<template>
  <div class="flex">
    <div class="h-[calc(100vh-4rem-2px)] flex flex-col gap-4 border-r-2 border-neutral bg-base-300">
      <FriendList
        :friends="friendsDummy"
        @select-friend="handleSelectFriend"
        class="p-2 overflow-y-auto"
      />
      <button class="btn btn-sm btn-neutral mt-auto mb-2 mx-4">
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
      <div class="w-full border-b-2 border-neutral py-1">
        <h3 v-if="selectedFriend" class="mx-auto text-center text-xl px-4 text-accent font-bold">
          {{ selectedFriend.name }}
        </h3>
        <h3 v-else class="flex gap-2 items-center mx-auto text-center text-xl px-4 font-bold">
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
      <FriendsChat v-if="selectedFriend" />
    </div>
  </div>
</template>
