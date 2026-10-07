<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useAsyncRequest } from "@/helpers/asyncRequest";
import { getFriends } from "@/services/friend/friendInteractor";
import { useJoinedRoomsStore } from "@/stores/joinedRooms";

const { data: friends, execute: executeGetFriends } = useAsyncRequest(() => getFriends());

function calculateManagingRoomsPercentage(): number {
  const percentage =
    (useJoinedRoomsStore().managingRoomsCount() / useJoinedRoomsStore().joinedRooms.length) * 100;
  if (isNaN(percentage)) {
    return 0;
  }
  return Math.round(percentage);
}

onMounted(() => {
  executeGetFriends();
});
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-3">
    <div class="surface flex items-center justify-between p-5">
      <div>
        <p class="text-sm text-base-content/60">Friends</p>
        <p class="mt-1 text-3xl font-bold tracking-tight">{{ friends?.length ?? 0 }}</p>
      </div>
      <span class="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.75"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </span>
    </div>

    <div class="surface flex items-center justify-between p-5">
      <div>
        <p class="text-sm text-base-content/60">Rooms joined</p>
        <p class="mt-1 text-3xl font-bold tracking-tight">
          {{ useJoinedRoomsStore().joinedRooms.length }}
        </p>
      </div>
      <span class="grid h-11 w-11 place-items-center rounded-xl bg-secondary/10 text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.75"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      </span>
    </div>

    <div class="surface flex items-center justify-between gap-4 p-5">
      <div class="min-w-0">
        <p class="text-sm text-base-content/60">Managing rooms</p>
        <p class="mt-1 text-3xl font-bold tracking-tight">
          {{ calculateManagingRoomsPercentage() }}%
        </p>
        <p class="text-xs text-base-content/50">
          {{ useJoinedRoomsStore().managingRoomsCount() }} of
          {{ useJoinedRoomsStore().joinedRooms.length }} rooms
        </p>
      </div>
      <div
        class="radial-progress shrink-0 text-accent"
        :style="{
          '--value': calculateManagingRoomsPercentage(),
          '--size': '3.25rem',
          '--thickness': '4px'
        }"
        role="progressbar"
      >
        <div class="avatar">
          <div class="w-9 rounded-full bg-base-300">
            <img v-if="useUserStore().photo" :src="useUserStore().photo" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
