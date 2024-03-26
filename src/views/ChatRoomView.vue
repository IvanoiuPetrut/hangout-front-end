<script setup lang="ts">
import { ref } from "vue";
import { RoomContent } from "@/types/types";

import QuickActionMenu from "@/components/room/QuickActionMenu.vue";
import BaseHeaderChatRoom from "@/components/room/BaseHeader.vue";

const props = defineProps<{
  roomId: string;
}>();

const selectedRoomContent = ref<RoomContent | null>(null);

function handleSelectRoomContent(content: RoomContent): void {
  selectedRoomContent.value = content;
}
</script>

<template>
  <!-- ! Header -->
  <BaseHeaderChatRoom :roomName="roomId" />
  <div class="flex w-full">
    <QuickActionMenu @select-room-content="handleSelectRoomContent" />
    <div class="flex-1">
      {{ selectedRoomContent }}
    </div>
  </div>
</template>
