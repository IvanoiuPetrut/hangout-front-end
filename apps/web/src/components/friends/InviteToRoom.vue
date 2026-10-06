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
  <button class="btn btn-sm btn-primary mb-2" onclick="modal_profile.showModal()">
    Invite to room
  </button>
  <dialog id="modal_profile" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Rooms where the user can be invited:</h3>
      <label class="form-control w-full max-w-xs py-4">
        <ul v-if="rooms" class="flex flex-col gap-2">
          <li
            v-for="room in rooms"
            :key="room.id"
            class="flex items-center justify-between gap-4 bg-base-200 p-2 rounded-md border border-neutral"
          >
            <span>{{ room.name }}</span>
            <button class="btn btn-sm btn-neutral" @click="handleInviteToRoom(room.id)">
              Invite
            </button>
          </li>
        </ul>
        <p v-else>You have no rooms or is already part of your available rooms.</p>
      </label>
      <div class="modal-action mt-0">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
