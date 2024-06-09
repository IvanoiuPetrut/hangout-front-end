<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import type { message } from "@/types/types";
import { getCookie } from "@helpers/cookie";
import { useUserStore } from "@/stores/user";
import { useSocketStore } from "@/stores/socket";
import { useAsyncRequest } from "@helpers/asyncRequest";
import { getUserDetails } from "@/services/user/userInteractor";
import type { Friend } from "@/types/types";

import MessageWritter from "@/components/messages/MessageWritter.vue";
import MessageBubble from "@components/messages/MessageBubble.vue";
import FriendProfile from "@/components/friends/FriendProfile.vue";

const props = defineProps<{
  messages: Array<message>;
  roomId: string;
}>();

const selectedFriend = ref<Friend | null>(null);
const newMessages = ref<Array<message>>([]);

const { data: userDetails, execute: executeGetUserDetails } = useAsyncRequest(() =>
  getUserDetails()
);

function whoIsOwnerOfMessage(senderId: string, userId: string) {
  return senderId === userId ? "me" : "friend";
}

function handleSendMessage(message: string) {
  useSocketStore().socket.emit("chatRoomChatMessage", {
    userToken: getCookie("access_token"),
    chatRoomId: props.roomId,
    senderPhoto: useUserStore().photo,
    message
  });
}

function handleSelectFriend(senderId: string, senderName: string, senderPhoto: string) {
  if (senderName === useUserStore().userName) {
    return;
  }

  selectedFriend.value = {
    id: senderId,
    username: senderName,
    photo: senderPhoto
  };
}

function handleFriendProfileVisibility() {
  selectedFriend.value = null;
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

onMounted(async () => {
  newMessages.value.push(...props.messages);
  useSocketStore().socket.emit("joinChatRoom", {
    userToken: getCookie("access_token"),
    chatRoomId: props.roomId
  });

  useSocketStore().socket.on("chatRoomChatMessage", (message) => {
    newMessages.value.push(message);
    scrollToBottom();
  });
  await executeGetUserDetails();
  scrollToBottom();
});

onUnmounted(() => {
  useSocketStore().socket.emit("leaveChatRoom", {
    userToken: getCookie("access_token"),
    chatRoomId: props.roomId
  });

  useSocketStore().socket.off("chatRoomChatMessage");
});
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <FriendProfile
      :friend="selectedFriend"
      v-if="selectedFriend"
      @toggle-friend-profile-visibility="handleFriendProfileVisibility"
      class="fixed top-30 right-4 z-50"
    />
    <div class="px-4 pb-4 overflow-y-auto max-h-[calc(100vh-12rem)] users-chat">
      <ul v-if="userDetails && newMessages" class="flex flex-col gap-4">
        <li v-for="(message, index) in newMessages" :key="index">
          <MessageBubble
            :message="message.content"
            :from-who="whoIsOwnerOfMessage(message.senderId, userDetails.id)"
            :photo-url="message.senderPhoto"
            :sender-name="message.senderName"
            :created-at="message.createdAt"
            @toggle-selected-friend="
              handleSelectFriend(message.senderId, message.senderName, message.senderPhoto)
            "
          />
        </li>
      </ul>
    </div>
    <div class="mt-auto">
      <MessageWritter @send-message="handleSendMessage" />
    </div>
  </div>
</template>
