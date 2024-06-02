<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useUserStore } from "@/stores/user";

import MessageWritter from "@/components/messages/MessageWritter.vue";
import MessageBubble from "@components/messages/MessageBubble.vue";

import { getCookie } from "@helpers/cookie";
import { useAsyncRequest } from "@helpers/asyncRequest";
import { getMessagesFromFriendRoom } from "@services/messages/messagesInteractor";
import { getUserDetails } from "@/services/user/userInteractor";
import { useSocketStore } from "@/stores/socket";
import type { Friend, message } from "@/types/types";

const props = defineProps<{
  friend: Friend;
}>();

const messages = ref<Array<message>>([]);
const { data: userDetails, execute: executeGetUserDetails } = useAsyncRequest(() =>
  getUserDetails()
);

function whoIsOwnerOfMessage(senderId: string, userId: string) {
  return senderId === userId ? "me" : "friend";
}

function handleSendMessage(message: string) {
  useSocketStore().socket.emit("friendChatMessage", {
    userToken: getCookie("access_token"),
    friendId: props.friend.id,
    senderPhoto: useUserStore().photo,
    message
  });
}

onMounted(async () => {
  useSocketStore().socket.emit("createFriendChat", {
    userToken: getCookie("access_token"),
    friendId: props.friend.id
  });

  useSocketStore().socket.on("friendChatMessage", (message) => {
    messages.value.push(message);
  });

  const { data: messagesFromServer, execute: executeGetMessagesForChat } = useAsyncRequest(() =>
    getMessagesFromFriendRoom(props.friend.id)
  );

  await executeGetMessagesForChat();
  if (messagesFromServer.value) {
    messages.value.push(...messagesFromServer.value);
  }

  await executeGetUserDetails();
});

onUnmounted(() => {
  useSocketStore().socket.emit("leaveFriendChat", {
    userToken: getCookie("access_token"),
    friendId: props.friend.id
  });

  useSocketStore().socket.off("friendChatMessage");
});
</script>

<template>
  <div class="flex flex-col w-full pt-4">
    <div class="px-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
      <ul v-if="userDetails && messages" class="flex flex-col gap-4">
        <li v-for="(message, index) in messages" :key="index">
          <MessageBubble
            :message="message.content"
            :from-who="whoIsOwnerOfMessage(message.senderId, userDetails.id)"
            :photo-url="message.senderPhoto"
            :sender-name="message.senderName"
            :created-at="message.createdAt"
          />
        </li>
      </ul>
    </div>
    <div class="px-4 mt-auto mb-2">
      <MessageWritter @send-message="handleSendMessage" />
    </div>
  </div>
</template>
