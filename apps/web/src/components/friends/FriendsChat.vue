<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import { useUserStore } from "@/stores/user";

import MessageWritter from "@/components/messages/MessageWritter.vue";
import MessageBubble from "@components/messages/MessageBubble.vue";

import { getCookie } from "@helpers/cookie";
import { useAsyncRequest } from "@helpers/asyncRequest";
import { getMessagesFromFriendRoom } from "@services/messages/messagesInteractor";
import { getUserDetails } from "@/services/user/userInteractor";
import { uploadFile } from "@services/messages/messagesInteractor";
import { getErrorMessage } from "@helpers/auth";
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

async function handleUploadFile(file: File) {
  try {
    const data = await uploadFile(file);
    useSocketStore().socket.emit("friendChatMessage", {
      userToken: getCookie("access_token"),
      friendId: props.friend.id,
      senderPhoto: useUserStore().photo,
      message: data.fileUrl
    });
  } catch (error) {
    console.error(error);
    alert(getErrorMessage(error, "Could not upload the file"));
  }
}

function scrollToBottom(smooth = false) {
  nextTick(() => {
    const chat = document.querySelector(".users-chat");
    if (chat) {
      chat.scrollTo({ top: chat.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    }
  });
}

onMounted(async () => {
  useSocketStore().socket.emit("createFriendChat", {
    userToken: getCookie("access_token"),
    friendId: props.friend.id
  });

  useSocketStore().socket.on("friendChatMessage", (message) => {
    messages.value.push(message);
    scrollToBottom(true);
  });

  const { data: messagesFromServer, execute: executeGetMessagesForChat } = useAsyncRequest(() =>
    getMessagesFromFriendRoom(props.friend.id)
  );

  await executeGetMessagesForChat();
  if (messagesFromServer.value) {
    messages.value.push(...messagesFromServer.value);
  }
  await executeGetUserDetails();
  scrollToBottom();
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
  <div class="flex flex-col">
    <div class="users-chat min-h-0 flex-1 overflow-y-auto px-4 py-6">
      <ul v-if="userDetails && messages" class="mx-auto flex max-w-4xl flex-col gap-3">
        <li v-for="(message, index) in messages" :key="index">
          <MessageBubble
            :message="message.content"
            :from-who="whoIsOwnerOfMessage(message.senderId, userDetails.id)"
            :photo-url="message.senderPhoto"
            :sender-name="message.senderName"
            :created-at="message.createdAt"
          />
        </li>
        <li v-if="messages.length === 0" class="empty-state mt-10">
          No messages yet. Say hi to {{ props.friend.username }} 👋
        </li>
      </ul>
      <div v-else class="flex h-full items-center justify-center">
        <span class="loading loading-dots loading-md text-base-content/40"></span>
      </div>
    </div>
    <div class="mx-auto w-full max-w-4xl px-4 pb-4">
      <MessageWritter @send-message="handleSendMessage" @upload-file="handleUploadFile" />
    </div>
  </div>
</template>
