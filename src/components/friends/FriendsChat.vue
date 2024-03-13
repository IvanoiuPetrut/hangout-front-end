<script setup lang="ts">
import { onMounted, ref } from "vue";

import MessageWritter from "@/components/messages/MessageWritter.vue";
import MessageBubble from "@components/messages/MessageBubble.vue";

import { io } from "socket.io-client";
import { getCookie } from "@helpers/cookie";
import { useAsyncRequest } from "@helpers/asyncRequest";
import { getMessagesFromFriendRoom } from "@services/messages/messagesInteractor";

const props = defineProps<{
  friendId: string;
}>();

type messageType = {
  fromWho: "me" | "friend";
  message: string;
};

const messages = ref<Array<messageType>>([]);

function sortMessagesFromServer(messages: Array<messageType>, messagesFromServer: any) {
  messagesFromServer.forEach((message: any) => {
    if (message.senderId === props.friendId) {
      messages.push({ fromWho: "friend", message: message.content });
    } else {
      messages.push({ fromWho: "me", message: message.content });
    }
  });
}

const socket = io("http://localhost:3000", {
  auth: {
    token: getCookie("access_token")
  }
});

socket.on("connect", () => {
  console.log("Connected to server", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server", socket.id);
});

socket.on("friendChatMessage", (message) => {
  console.log("Message received", message);
  messages.value.push({ fromWho: "friend", message: message });
});

function handleSendMessage(message: string) {
  messages.value.push({ fromWho: "me", message });

  socket.emit("friendChatMessage", {
    userToken: getCookie("access_token"),
    friendId: props.friendId,
    message
  });
}

onMounted(async () => {
  socket.emit("createFriendChat", {
    userToken: getCookie("access_token"),
    friendId: props.friendId
  });

  const { data: messagesFromServer, execute: executeGetMessagesForChat } = useAsyncRequest(() =>
    getMessagesFromFriendRoom(props.friendId)
  );
  await executeGetMessagesForChat();
  console.log("Messages", messagesFromServer.value);
  sortMessagesFromServer(messages.value, messagesFromServer.value);
});
</script>

<template>
  <div class="flex flex-col w-full pt-4">
    <div class="px-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
      <ul>
        <li v-for="(message, index) in messages" :key="index">
          <MessageBubble :message="message.message" :fromWho="message.fromWho" />
        </li>
      </ul>
    </div>
    <div class="px-4 mt-auto mb-2">
      <MessageWritter @send-message="handleSendMessage" />
    </div>
  </div>
</template>
