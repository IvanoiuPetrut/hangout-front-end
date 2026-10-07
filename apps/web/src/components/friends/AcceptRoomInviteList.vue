<script setup lang="ts">
import { onMounted } from "vue";
import {
  getInvites,
  acceptInvite,
  declineInvite,
  getJoinedChatRooms
} from "@/services/chatRoom/chatRoomInteractor";
import { useJoinedRoomsStore } from "@/stores/joinedRooms";
import { useAsyncRequest } from "@/helpers/asyncRequest";

const { data: chatRoomInvites, execute: executeGetInvites } = useAsyncRequest(getInvites);
const { data: joinedRooms, execute: executeGetJoinedChatRooms } =
  useAsyncRequest(getJoinedChatRooms);

async function handleAcceptChatRoomInvite(inviteId: string): Promise<void> {
  const { execute: executeAcceptInvite } = useAsyncRequest(() => acceptInvite(inviteId));
  await executeAcceptInvite();
  await executeGetInvites();
  await executeGetJoinedChatRooms();
  if (joinedRooms.value) {
    useJoinedRoomsStore().setJoinedRooms(joinedRooms.value);
  }
}

async function handleDeclineChatRoomInvite(inviteId: string): Promise<void> {
  const { execute: executeDeclineInvite } = useAsyncRequest(() => declineInvite(inviteId));
  await executeDeclineInvite();
  await executeGetInvites();
}

onMounted(async () => {
  await executeGetInvites();
});
</script>

<template>
  <div class="mb-4 flex items-center gap-2">
    <h3 class="text-lg font-semibold">Room invites</h3>
    <span class="badge badge-secondary badge-sm">{{ chatRoomInvites?.length ?? 0 }}</span>
  </div>
  <ul class="flex flex-col gap-2" v-if="chatRoomInvites && chatRoomInvites.length > 0">
    <li
      v-for="request in chatRoomInvites"
      :key="request.id"
      class="flex animate-fade-up items-center justify-between gap-4 rounded-btn bg-base-100/50 p-3 text-left ring-1 ring-base-content/5"
    >
      <div class="flex min-w-0 items-center gap-3">
        <span
          class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-secondary/30 to-primary/30 font-bold uppercase"
        >
          {{ request.roomName.charAt(0) }}
        </span>
        <div class="min-w-0">
          <p class="truncate font-semibold">{{ request.roomName }}</p>
          <p class="text-sm text-base-content/60">invited you to join</p>
        </div>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <button
          @click="handleAcceptChatRoomInvite(request.id)"
          class="btn btn-success btn-sm gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-4 w-4"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="hidden sm:inline">Accept</span>
        </button>
        <button
          @click="handleDeclineChatRoomInvite(request.id)"
          class="btn btn-ghost btn-sm btn-square text-base-content/60 hover:bg-error/10 hover:text-error"
          aria-label="Decline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-4 w-4"
          >
            <path
              d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
            />
          </svg>
        </button>
      </div>
    </li>
  </ul>
  <p v-else class="empty-state">No room invites right now</p>
</template>
