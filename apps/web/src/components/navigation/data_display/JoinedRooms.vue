<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAsyncRequest } from "@/helpers/asyncRequest";
import { getJoinedChatRooms } from "@/services/chatRoom/chatRoomInteractor";
import { useJoinedRoomsStore } from "@/stores/joinedRooms";

const emit = defineEmits<{
  (e: "navigate"): void;
}>();

const isRoomListVisible = ref(true);
const { data: joinedRooms, execute: executeGetJoinedChatRooms } =
  useAsyncRequest(getJoinedChatRooms);

function toggleRoomListVisibility(): void {
  isRoomListVisible.value = !isRoomListVisible.value;
}

onMounted(async () => {
  await executeGetJoinedChatRooms();
  if (joinedRooms.value) {
    useJoinedRoomsStore().setJoinedRooms(joinedRooms.value);
  }
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <button
      @click="toggleRoomListVisibility"
      class="flex items-center justify-between px-3 pb-1 pt-2 hover:text-base-content"
    >
      <span class="section-title">Rooms · {{ useJoinedRoomsStore().joinedRooms.length }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-4 w-4 text-base-content/50 transition-transform duration-200"
        :class="{ '-rotate-90': !isRoomListVisible }"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <template v-if="isRoomListVisible">
      <ul v-if="useJoinedRoomsStore().joinedRooms.length > 0" class="flex flex-col gap-0.5">
        <li v-for="room in useJoinedRoomsStore().joinedRooms" :key="room.id">
          <RouterLink
            :to="{ name: 'chat-room', params: { roomId: room.id } }"
            class="nav-link py-2"
            @click="emit('navigate')"
          >
            <span
              class="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/25 to-accent/25 text-xs font-bold uppercase text-base-content"
            >
              {{ room.name.charAt(0) }}
            </span>
            <span class="truncate">{{ room.name }}</span>
          </RouterLink>
        </li>
      </ul>
      <p v-else class="px-3 py-2 text-sm text-base-content/50">No chat rooms joined yet</p>
    </template>
  </div>
</template>
