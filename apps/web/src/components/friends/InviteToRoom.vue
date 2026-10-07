<script setup lang="ts">
import { onMounted } from "vue";
import type { Friend } from "@/types/types";
import { useAsyncRequest } from "@/helpers/asyncRequest";
import {
  getRoomsWhereUserIsNotMember,
  sendInviteToChatRoom
} from "@/services/chatRoom/chatRoomInteractor";

const props = defineProps<{
  friend: Friend;
}>();

const { data: rooms, execute: executeGetRooms } = useAsyncRequest(() =>
  getRoomsWhereUserIsNotMember(props.friend.id)
);

async function handleInviteToRoom(roomId: string): Promise<void> {
  const { execute: executeSendInvite } = useAsyncRequest(() =>
    sendInviteToChatRoom(roomId, props.friend.id)
  );
  await executeSendInvite();
  await executeGetRooms();
}

onMounted(async () => {
  await executeGetRooms();
});
</script>

<template>
  <button class="btn btn-primary btn-sm w-full" onclick="modal_profile.showModal()">
    Invite to room
  </button>
  <dialog id="modal_profile" class="modal">
    <div class="modal-box">
      <h3 class="text-xl font-bold">Invite {{ props.friend.username }}</h3>
      <p class="mt-1 text-sm text-base-content/60">Rooms they're not part of yet.</p>
      <ul v-if="rooms && rooms.length > 0" class="mt-4 flex flex-col gap-2">
        <li
          v-for="room in rooms"
          :key="room.id"
          class="flex items-center justify-between gap-4 rounded-btn bg-base-200 p-2 pl-3 ring-1 ring-base-content/5"
        >
          <span class="flex min-w-0 items-center gap-3">
            <span
              class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/25 to-accent/25 text-xs font-bold uppercase"
            >
              {{ room.name.charAt(0) }}
            </span>
            <span class="truncate font-medium">{{ room.name }}</span>
          </span>
          <button class="btn btn-primary btn-sm" @click="handleInviteToRoom(room.id)">
            Invite
          </button>
        </li>
      </ul>
      <p v-else class="empty-state mt-4">
        No rooms available. They may already be in all of your rooms.
      </p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-ghost">Close</button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop"><button>close</button></form>
  </dialog>
</template>
