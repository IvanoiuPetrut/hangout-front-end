<script setup lang="ts">
import moment from "moment";

const props = defineProps<{
  fromWho: "me" | "friend";
  message: string;
  photoUrl: string;
  senderName: string;
  createdAt: string;
}>();

const emit = defineEmits<{
  (e: "toggleSelectedFriend"): void;
}>();

function formatDate(isoString: string): string {
  return moment(isoString).format("DD/MM/YYYY HH:mm");
}

function isFileFromServer(message: string): boolean {
  return message.startsWith("https://images-hangout-app.s3.eu-central-1.amazonaws.com/");
}

function isPhoto(message: string): boolean {
  return (
    message.endsWith(".jpg") ||
    message.endsWith(".png") ||
    message.endsWith(".jpeg") ||
    message.endsWith(".gif") ||
    message.endsWith(".webp") ||
    message.endsWith(".svg")
  );
}

function isNormalUrl(message: string): boolean {
  return message.startsWith("http");
}

function getFileNameFromUrl(url: string): string {
  return url.split("/").pop()!;
}
</script>

<template>
  <div class="flex gap-4">
    <div class="chat-image avatar self-start hidden sm:block">
      <div class="w-10 rounded-full">
        <img v-if="photoUrl" alt="Profile photo" :src="props.photoUrl" />
        <img
          v-else
          alt="Profile photo"
          src="https://www.gravatar.com/avatar/3b3be63a4c2asdas01afdasda02?d=identicon"
        />
      </div>
    </div>
    <div>
      <div>
        <button
          @click="emit('toggleSelectedFriend')"
          class="font-bold mr-4 hover:underline hover:text-primary"
        >
          {{ senderName }}
        </button>
        <span class="text-xs opacity-70">{{ formatDate(props.createdAt) }}</span>
      </div>
      <a
        v-if="isPhoto(message) && isFileFromServer(message)"
        :href="message"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :src="message" alt="File from server" class="w-full h-full" />
      </a>
      <a
        v-else-if="isFileFromServer(message)"
        :href="message"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 bg-neutral p-1 md:p-4 rounded-lg mt-2 border border-primary hover:border-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        <span class="flex-1 break-words">
          {{ getFileNameFromUrl(message) }}
        </span>
      </a>
      <a
        v-else-if="isNormalUrl(message)"
        class="link"
        :href="message"
        target="_blank"
        rel="noopener noreferrer"
        >{{ message }}</a
      >
      <p v-else>{{ message }}</p>
    </div>
  </div>
</template>
