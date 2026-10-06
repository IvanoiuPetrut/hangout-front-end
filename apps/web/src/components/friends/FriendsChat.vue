<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick, computed } from "vue";
import { useUserStore } from "@/stores/user";

import MessageWritter from "@/components/messages/MessageWritter.vue";
import MessageBubble from "@components/messages/MessageBubble.vue";

import { getCookie } from "@helpers/cookie";
import { useAsyncRequest } from "@helpers/asyncRequest";
import { getMessagesFromFriendRoom } from "@services/messages/messagesInteractor";
import { getUserDetails } from "@/services/user/userInteractor";
import { uploadFile, summarizeMessages } from "@services/messages/messagesInteractor";
import { useSocketStore } from "@/stores/socket";
import type { Friend, message } from "@/types/types";

const props = defineProps<{
  friend: Friend;
}>();

const messageWritterWrapper = ref<HTMLDivElement | null>(null);
const messageWritterWrapperHeight = ref<number>(0);
const resizeObserver = ref<ResizeObserver | null>(null);
const aiModeState = ref(false);
const checkedMessagesForAi = ref<Array<string>>([]);
const loadingSummarization = ref(false);

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

function handleSetAiMode() {
  aiModeState.value = !aiModeState.value;
  if (!aiModeState.value) {
    checkedMessagesForAi.value = [];
  }
}

async function handleSummarizeMessages() {
  const formatedMessages: Array<{ name: string; content: string }> = checkedMessagesForAi.value.map(
    (message) => {
      let [name, content] = message.split(" and content: ");
      name = name.replace("Sender name: ", "");
      return { name, content };
    }
  );
  const { data: summarizedMessages, execute: executeSummarizeMessages } = useAsyncRequest(() =>
    summarizeMessages(formatedMessages)
  );
  loadingSummarization.value = true;
  await executeSummarizeMessages();
  loadingSummarization.value = false;
  const contentForMessage = summarizedMessages.value;
  messages.value.push({
    id: "ai",
    chatRoomId: "ai",
    senderName: "AI",
    senderId: "ai",
    receiverId: "ai",
    senderPhoto: "",
    content: contentForMessage as string,
    createdAt: new Date().toISOString()
  });
  scrollToBottom();
  aiModeState.value = !aiModeState.value;
  checkedMessagesForAi.value = [];
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
  <div class="flex flex-col w-full pt-4 relative">
    <div class="px-4 pb-4 overflow-y-auto users-chat" :style="chatSize">
      <ul v-if="userDetails && messages" class="flex flex-col gap-4">
        <li v-for="(message, index) in messages" :key="index">
          <div class="flex gap-2">
            <input
              v-if="aiModeState"
              type="checkbox"
              :value="`Sender name: ${message.senderName} and content: ${message.content}`"
              v-model="checkedMessagesForAi"
              class="checkbox mt-2"
            />

            <MessageBubble
              :message="message.content"
              :from-who="whoIsOwnerOfMessage(message.senderId, userDetails.id)"
              :photo-url="message.senderPhoto"
              :sender-name="message.senderName"
              :created-at="message.createdAt"
            />
          </div>
        </li>
      </ul>
    </div>
    <div
      v-if="aiModeState"
      class="flex flex-col items-center gap-4 absolute bot-0 right-1/2 transform translate-x-3/4 bg-base-200 p-4 rounded-lg shadow-lg border border-neutral"
    >
      <p class="">Check messages that you want to be summarize</p>
      <div v-if="!loadingSummarization" class="flex gap-8">
        <button @click="handleSummarizeMessages" class="btn btn-xs btn-primary">Summarize</button>
        <button @click="handleSetAiMode" class="btn btn-xs btn-error">Cancel</button>
      </div>
      <span v-else class="loading loading-spinner loading-md"></span>
    </div>
    <div class="px-4 mt-auto mb-2" ref="messageWritterWrapper">
      <MessageWritter
        @send-message="handleSendMessage"
        @upload-file="handleUploadFile"
        @set-ai-mode="handleSetAiMode"
      />
    </div>
  </div>
</template>
