<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { message } from "@/types/types";
import { io } from "socket.io-client";
import { getCookie } from "@helpers/cookie";
import { useUserStore } from "@/stores/user";
import { useAsyncRequest } from "@helpers/asyncRequest";
import { getUserDetails } from "@/services/user/userInteractor";

import MessageWritter from "@/components/messages/MessageWritter.vue";
import MessageBubble from "@components/messages/MessageBubble.vue";

const props = defineProps<{
  messages: Array<message>;
  roomId: string;
}>();

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  auth: {
    token: getCookie("access_token")
  }
});

const newMessages = ref<Array<message>>([]);

const { data: userDetails, execute: executeGetUserDetails } = useAsyncRequest(() =>
  getUserDetails()
);

function whoIsOwnerOfMessage(senderId: string, userId: string) {
  return senderId === userId ? "me" : "friend";
}

socket.on("chatRoomChatMessage", (message) => {
  newMessages.value.push(message);
});

function handleSendMessage(message: string) {
  socket.emit("chatRoomChatMessage", {
    userToken: getCookie("access_token"),
    chatRoomId: props.roomId,
    senderPhoto: useUserStore().photo,
    message
  });
}
onMounted(async () => {
  newMessages.value.push(...props.messages);
  socket.emit("joinChatRoom", {
    userToken: getCookie("access_token"),
    chatRoomId: props.roomId
  });
  await executeGetUserDetails();
});

onUnmounted(() => {
  socket.emit("leaveChatRoom", {
    userToken: getCookie("access_token"),
    chatRoomId: props.roomId
  });
});
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="overflow-y-auto">
      <ul v-if="userDetails && newMessages">
        <li v-for="(message, index) in newMessages" :key="index">
          <MessageBubble
            :message="message.content"
            :from-who="whoIsOwnerOfMessage(message.senderId, userDetails.id)"
            :photo-url="message.senderPhoto"
          />
        </li>
      </ul>
    </div>
    <div class="mt-auto">
      <MessageWritter @send-message="handleSendMessage" />
    </div>
  </div>
</template>
