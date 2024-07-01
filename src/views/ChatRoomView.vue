<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RoomContent } from "@/types/types";
import { getChatRoomDetails } from "@/services/chatRoom/chatRoomInteractor";
import { useAsyncRequest } from "@/helpers/asyncRequest";
import { onBeforeRouteUpdate } from "vue-router";
import { useSocketStore } from "@/stores/socket";
import { useUserStore } from "@/stores/user";

import QuickActionMenu from "@/components/room/QuickActionMenu.vue";
import BaseHeaderChatRoom from "@/components/room/BaseHeader.vue";
import RoomMembers from "@/components/room/RoomMembers.vue";
import RoomChat from "@/components/room/RoomChat.vue";
import RoomSettings from "@/components/room/RoomSettings.vue";
import RoomVoice from "@/components/room/RoomVoice.vue";

const props = defineProps<{
  roomId: string;
}>();

const selectedRoomContent = ref<RoomContent | null>(RoomContent.Chat);
const { data: chatRoomDetails, execute: executeGetChatRoomDetails } = useAsyncRequest(() =>
  getChatRoomDetails(props.roomId)
);

function handleSelectRoomContent(content: RoomContent): void {
  selectedRoomContent.value = content;
}

async function handleUserKicked(userId: string): Promise<void> {
  console.log("kicking user", userId);
  useSocketStore().socket.emit("kickUser", {
    chatRoomId: props.roomId,
    userId
  });
  await executeGetChatRoomDetails();
}

useSocketStore().socket.on("userKicked", async (payload) => {
  if (payload.userId === useUserStore().userId) {
    window.location.href = "/";
  } else {
    await executeGetChatRoomDetails();
  }
});

onBeforeRouteUpdate(async (to, from, next) => {
  if (to.params.roomId !== from.params.roomId) {
    await executeGetChatRoomDetails();
  }
  next();
});

onMounted(async () => {
  console.log("ChatRoomView mounted");
  await executeGetChatRoomDetails();
});
</script>

<template>
  <BaseHeaderChatRoom v-if="chatRoomDetails" :roomName="chatRoomDetails.name" />
  <div class="flex w-full">
    <QuickActionMenu
      @select-room-content="handleSelectRoomContent"
      :active-content="selectedRoomContent"
    />
    <div v-if="chatRoomDetails" class="flex-1 p-4">
      <RoomMembers
        v-show="selectedRoomContent === RoomContent.Members"
        :members="chatRoomDetails.members"
        :owner-id="chatRoomDetails.owner.id"
        :room-id="props.roomId"
        @user-kicked="handleUserKicked"
      />
      <RoomChat
        v-show="selectedRoomContent === RoomContent.Chat"
        :messages="chatRoomDetails.messages"
        :room-id="props.roomId"
      />
      <RoomSettings v-show="selectedRoomContent === RoomContent.Settings" />
      <RoomVoice v-show="selectedRoomContent === RoomContent.Voice" :room-id="props.roomId" />
    </div>
  </div>
</template>
