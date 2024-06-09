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
  return message.endsWith(".jpg") || message.endsWith(".png") || message.endsWith(".jpeg");
}

function getFileNameFromUrl(url: string): string {
  return url.split("/").pop()!;
}
</script>

<template>
  <div class="flex gap-4">
    <div class="chat-image avatar self-start">
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
      <p v-if="!isFileFromServer(message)">{{ message }}</p>
      <div v-else-if="isPhoto(message)">
        <img :src="message" alt="File from server" class="w-96 h-full" />
      </div>
      <div v-else>
        <a :href="message" target="_blank" rel="noopener noreferrer">
          <div
            class="flex items-center gap-2 bg-neutral p-4 rounded-lg mt-2 border border-primary hover:border-accent"
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
            <p>
              {{ getFileNameFromUrl(message) }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
