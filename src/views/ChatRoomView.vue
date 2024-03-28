<script setup lang="ts">
import { ref } from "vue";
import { RoomContent } from "@/types/types";

import QuickActionMenu from "@/components/room/QuickActionMenu.vue";
import BaseHeaderChatRoom from "@/components/room/BaseHeader.vue";
import RoomMembers from "@/components/room/RoomMembers.vue";

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
  <BaseHeaderChatRoom :roomName="'a name'" />
  <div class="flex w-full">
    <QuickActionMenu
      @select-room-content="handleSelectRoomContent"
      :active-content="selectedRoomContent"
    />
    <div class="flex-1 p-4">
      <RoomMembers v-show="selectedRoomContent === RoomContent.Members" />
    </div>
  </div>
</template>
