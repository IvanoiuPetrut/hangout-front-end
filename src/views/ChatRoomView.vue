<script setup lang="ts">
import { ref } from "vue";
import { RoomContent } from "@/types/types";

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

function handleSelectRoomContent(content: RoomContent): void {
  selectedRoomContent.value = content;
}
</script>

<template>
  <!-- ! Header -->
  <BaseHeaderChatRoom :roomName="'CameraFotbalistilor'" />
  <div class="flex w-full">
    <QuickActionMenu
      @select-room-content="handleSelectRoomContent"
      :active-content="selectedRoomContent"
    />
    <div class="flex-1 p-4">
      <RoomMembers v-show="selectedRoomContent === RoomContent.Members" />
      <RoomChat v-show="selectedRoomContent === RoomContent.Chat" />
      <RoomSettings v-show="selectedRoomContent === RoomContent.Settings" />
      <RoomVoice v-show="selectedRoomContent === RoomContent.Voice" />
    </div>
  </div>
</template>
