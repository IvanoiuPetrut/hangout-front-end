<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick, computed } from "vue";
import { useUserStore } from "@/stores/user";

import MessageWritter from "@/components/messages/MessageWritter.vue";
import MessageBubble from "@components/messages/MessageBubble.vue";

import { getCookie } from "@helpers/cookie";
import { useAsyncRequest } from "@helpers/asyncRequest";
import { getMessagesFromFriendRoom } from "@services/messages/messagesInteractor";
import { getUserDetails } from "@/services/user/userInteractor";
import { uploadFile } from "@services/messages/messagesInteractor";
import { useSocketStore } from "@/stores/socket";
import type { Friend, message } from "@/types/types";

const props = defineProps<{
  friend: Friend;
}>();

const messageWritterWrapper = ref<HTMLDivElement | null>(null);
const messageWritterWrapperHeight = ref<number>(0);
const resizeObserver = ref<ResizeObserver | null>(null);

const chatSize = computed(() => {
  return {
    maxHeight: `calc(100vh - ${messageWritterWrapperHeight.value - 50}px - 12rem)`
  };
});

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
  }
}

function scrollToBottom() {
  nextTick(() => {
    const chat = document.querySelector(".users-chat");
    console.log(chat);
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  });
}

function updateHeight() {
  if (messageWritterWrapper.value) {
    messageWritterWrapperHeight.value = messageWritterWrapper.value.offsetHeight;
  }
}

onMounted(async () => {
  useSocketStore().socket.emit("createFriendChat", {
    userToken: getCookie("access_token"),
    friendId: props.friend.id
  });

  useSocketStore().socket.on("friendChatMessage", (message) => {
    messages.value.push(message);
    scrollToBottom();
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
  updateHeight();
  resizeObserver.value = new ResizeObserver(updateHeight);
  resizeObserver.value.observe(messageWritterWrapper.value!);
});

onUnmounted(() => {
  useSocketStore().socket.emit("leaveFriendChat", {
    userToken: getCookie("access_token"),
    friendId: props.friend.id
  });

  useSocketStore().socket.off("friendChatMessage");

  if (resizeObserver.value) {
    resizeObserver.value.disconnect();
  }
});
</script>

<template>
  <div class="flex flex-col w-full pt-4">
    <div class="px-4 pb-4 overflow-y-auto users-chat" :style="chatSize">
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
    <div class="px-4 mt-auto mb-2" ref="messageWritterWrapper">
      <MessageWritter @send-message="handleSendMessage" @upload-file="handleUploadFile" />
    </div>
  </div>
</template>
