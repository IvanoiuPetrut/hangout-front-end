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
  <h3 class="font-bold text-xl mb-2">Chat room requests - {{ chatRoomInvites?.length }}</h3>
  <ul class="flex flex-col gap-2" v-if="chatRoomInvites!.length > 0">
    <li
      v-for="request in chatRoomInvites"
      :key="request.id"
      class="flex items-center justify-between sm:justify-normal sm:gap-16 py-2"
    >
      <div class="flex items-center">
        <div class="ml-2">
          <p class="font-bold">{{ request.roomName }}</p>
          <p class="text-sm opacity-70">wants you to be part of it</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="handleAcceptChatRoomInvite(request.id)"
          class="btn btn-circle btn-sm btn-success"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          @click="handleDeclineChatRoomInvite(request.id)"
          class="btn btn-circle btn-sm btn-error"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
            />
          </svg>
        </button>
      </div>
    </li>
  </ul>
  <p class="opacity-70" v-else>No chat room requests</p>
</template>
