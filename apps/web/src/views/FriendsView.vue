<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Friend } from "@/types/types.ts";
import { getFriends } from "@/services/friend/friendInteractor";
import { useAsyncRequest } from "@/helpers/asyncRequest";

import FriendList from "@/components/friends/FriendList.vue";
import FriendsChat from "@/components/friends/FriendsChat.vue";
import AddFriend from "@/components/friends/AddFriend.vue";
import FriendProfile from "@/components/friends/FriendProfile.vue";

const selectedFriend = ref<Friend | null>(null);
const isFriendsMenuVisible = ref(false);
const isFriendProfileVisible = ref(false);

const { data: friends, execute: executeGetFriends } = useAsyncRequest(getFriends);

function handleSelectFriend(friend: Friend): void {
  selectedFriend.value = friend;
  isFriendProfileVisible.value = false;
  // On phones the list covers the chat, so collapse it once a friend is picked
  if (window.innerWidth < 640) {
    isFriendsMenuVisible.value = true;
  }
}

function toggleFriendsMenuVisibility(): void {
  isFriendsMenuVisible.value = !isFriendsMenuVisible.value;
}

function handleFriendProfileVisibility(): void {
  isFriendProfileVisible.value = !isFriendProfileVisible.value;
}

onMounted(() => {
  executeGetFriends();
});
</script>

<template>
  <div class="flex h-[calc(100vh-4rem)]">
    <aside
      class="w-full shrink-0 flex-col border-r border-base-content/[0.06] bg-base-200/40 sm:w-72"
      :class="isFriendsMenuVisible ? 'hidden' : 'flex'"
    >
      <div
        class="flex h-14 items-center justify-between gap-2 border-b border-base-content/[0.06] px-4"
      >
        <h2 class="font-semibold">Friends</h2>
        <div class="flex items-center gap-1">
          <AddFriend />
          <button
            @click="toggleFriendsMenuVisibility"
            class="btn btn-ghost btn-square btn-sm"
            aria-label="Hide friend list"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <FriendList
        v-if="friends"
        :friends="friends"
        :selected-friend-id="selectedFriend?.id"
        @select-friend="handleSelectFriend"
        class="min-h-0 flex-1 overflow-y-auto p-2"
      />
      <div v-else class="flex flex-1 items-center justify-center">
        <span class="loading loading-dots loading-md text-base-content/40"></span>
      </div>
    </aside>

    <section
      class="relative min-w-0 flex-1 flex-col"
      :class="isFriendsMenuVisible ? 'flex' : 'hidden sm:flex'"
    >
      <div class="flex h-14 shrink-0 items-center gap-3 border-b border-base-content/[0.06] px-4">
        <button
          v-if="isFriendsMenuVisible"
          @click="toggleFriendsMenuVisibility"
          class="btn btn-ghost btn-square btn-sm"
          aria-label="Show friend list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.75"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button
          v-if="selectedFriend"
          @click="handleFriendProfileVisibility"
          class="-ml-1 flex items-center gap-3 rounded-btn px-2 py-1 transition-colors hover:bg-base-content/5"
        >
          <div class="avatar">
            <div class="w-8 rounded-full ring-1 ring-base-content/10">
              <img :src="selectedFriend.photo" :alt="selectedFriend.username" />
            </div>
          </div>
          <span class="font-semibold">{{ selectedFriend.username }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-4 w-4 text-base-content/40"
          >
            <path
              fill-rule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <span v-else class="text-base-content/50">No conversation selected</span>
      </div>

      <FriendProfile
        v-if="isFriendProfileVisible && selectedFriend"
        :friend="selectedFriend"
        class="absolute left-4 top-16 z-30"
        @toggleFriendProfileVisibility="handleFriendProfileVisibility"
      />
      <FriendsChat
        v-if="selectedFriend"
        :key="selectedFriend.id"
        :friend="selectedFriend"
        class="min-h-0 flex-1"
      />
      <div v-else class="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <span class="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.75"
            stroke="currentColor"
            class="h-7 w-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </span>
        <h3 class="text-lg font-semibold">Your messages</h3>
        <p class="max-w-xs text-sm text-base-content/60">
          Pick a friend from the list to start chatting, or add someone new.
        </p>
      </div>
    </section>
  </div>
</template>
