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
import { uploadFile } from "@/services/messages/messagesInteractor";
import { getErrorMessage } from "@helpers/auth";

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

function scrollToBottom(smooth = false) {
  nextTick(() => {
    const chat = document.querySelector(".users-chat");
    if (chat) {
      chat.scrollTo({ top: chat.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    }
  });
}

async function handleUploadFile(file: File) {
  try {
    const data = await uploadFile(file);
    useSocketStore().socket.emit("chatRoomChatMessage", {
      userToken: getCookie("access_token"),
      chatRoomId: props.roomId,
      senderPhoto: useUserStore().photo,
      message: data.fileUrl
    });
  } catch (error) {
    console.error(error);
    alert(getErrorMessage(error, "Could not upload the file"));
  }
}

onMounted(async () => {
  newMessages.value.push(...props.messages);
  useSocketStore().socket.emit("joinChatRoom", {
    userToken: getCookie("access_token"),
    chatRoomId: props.roomId
  });

  useSocketStore().socket.on("chatRoomChatMessage", (message) => {
    newMessages.value.push(message);
    scrollToBottom(true);
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
  <div class="flex h-full w-full flex-col">
    <FriendProfile
      :friend="selectedFriend"
      v-if="selectedFriend"
      @toggle-friend-profile-visibility="handleFriendProfileVisibility"
      class="fixed right-4 top-36 z-50"
    />
    <div class="users-chat min-h-0 flex-1 overflow-y-auto px-4 py-6">
      <ul v-if="userDetails && newMessages" class="mx-auto flex max-w-4xl flex-col gap-3">
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
        <li v-if="newMessages.length === 0" class="empty-state mt-10">
          This room is quiet. Start the conversation!
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
