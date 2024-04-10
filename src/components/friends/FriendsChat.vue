<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";

import MessageWritter from "@/components/messages/MessageWritter.vue";
import MessageBubble from "@components/messages/MessageBubble.vue";

import { io } from "socket.io-client";
import { getCookie } from "@helpers/cookie";
import { useAsyncRequest } from "@helpers/asyncRequest";
import { getMessagesFromFriendRoom } from "@services/messages/messagesInteractor";
import type { Friend } from "@/types/types";

const props = defineProps<{
  friend: Friend;
}>();

type messageType = {
  fromWho: "me" | "friend";
  message: string;
};

const messages = ref<Array<messageType>>([]);

function sortMessagesFromServer(messages: Array<messageType>, messagesFromServer: any) {
  messagesFromServer.forEach((message: any) => {
    if (message.senderId === props.friend.id) {
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

socket.on("friendChatMessage", (message) => {
  messages.value.push({ fromWho: "friend", message: message });
});

function handleSendMessage(message: string) {
  messages.value.push({ fromWho: "me", message });

  socket.emit("friendChatMessage", {
    userToken: getCookie("access_token"),
    friendId: props.friend.id,
    message
  });
}

onMounted(async () => {
  socket.emit("createFriendChat", {
    userToken: getCookie("access_token"),
    friendId: props.friend.id
  });

  const { data: messagesFromServer, execute: executeGetMessagesForChat } = useAsyncRequest(() =>
    getMessagesFromFriendRoom(props.friend.id)
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
          <MessageBubble
            :message="message.message"
            :fromWho="message.fromWho"
            :me-photo-url="useUserStore().photo"
            :friend-photo-url="friend.photo"
          />
        </li>
      </ul>
    </div>
    <div class="px-4 mt-auto mb-2">
      <MessageWritter @send-message="handleSendMessage" />
    </div>
  </div>
</template>
