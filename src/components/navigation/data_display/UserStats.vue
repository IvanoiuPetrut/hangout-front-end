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
  return percentage;
}

onMounted(() => {
  executeGetFriends();
});
</script>

<template>
  <div class="stats grid-rows-3 md:grid-rows-1 shadow-xl bg-base-200">
    <div class="stat">
      <div class="stat-figure text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="stat-title">Total Friends</div>
      <div class="stat-value text-primary">{{ friends?.length }}</div>
    </div>

    <div class="stat">
      <div class="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z"
          />
        </svg>
      </div>
      <div class="stat-title">Total rooms joined</div>
      <div class="stat-value text-secondary">{{ useJoinedRoomsStore().joinedRooms.length }}</div>
    </div>

    <div class="stat">
      <div class="stat-figure text-secondary">
        <div class="avatar online">
          <div class="w-16 rounded-full">
            <img :src="useUserStore().photo" />
          </div>
        </div>
      </div>
      <div class="stat-value">{{ calculateManagingRoomsPercentage() }}%</div>
      <div class="stat-title">Managing rooms</div>
      <div class="stat-desc text-secondary">
        {{ useJoinedRoomsStore().managingRoomsCount() }} out of
        {{ useJoinedRoomsStore().joinedRooms.length }}
      </div>
    </div>
  </div>
</template>
