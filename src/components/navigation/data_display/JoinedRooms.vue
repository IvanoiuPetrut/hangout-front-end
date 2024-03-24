<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAsyncRequest } from "@/helpers/asyncRequest";
import { getJoinedChatRooms } from "@/services/chatRoom/chatRoomInteractor";

const isRoomListVisible = ref(false);
const { data: joinedRooms, execute: executeGetJoinedChatRooms } =
  useAsyncRequest(getJoinedChatRooms);

function toggleRoomListVisibility(): void {
  isRoomListVisible.value = !isRoomListVisible.value;
}

onMounted(() => {
  executeGetJoinedChatRooms();
});
</script>

<template>
  <button @click="toggleRoomListVisibility">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
      <path
        d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z"
      />
    </svg>
    Joined rooms
    <div class="swap swap-rotate">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4 swap"
        :class="{ 'swap-on': isRoomListVisible, 'swap-off': !isRoomListVisible }"
      >
        <path
          fill-rule="evenodd"
          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
          clip-rule="evenodd"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4"
        :class="{ 'swap-on': !isRoomListVisible, 'swap-off': isRoomListVisible }"
      >
        <path
          fill-rule="evenodd"
          d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </button>

  <ul
    v-if="!!joinedRooms"
    :class="{ 'scale-y-0': !isRoomListVisible }"
    class="menu bg-base-100 gap-4 transition-all rounded-md"
  >
    <li v-for="room in joinedRooms" :key="room.id">
      <RouterLink :to="{ name: 'chat-room', params: { roomId: room.id } }">
        {{ room.name }}
      </RouterLink>
    </li>
  </ul>
  <p v-else>No chat rooms joined</p>
</template>
