<script setup lang="ts">
import { ref } from "vue";
import SendFile from "@components/messages/SendFile.vue";

const message = ref("");

const emit = defineEmits<{
  (e: "uploadFile", file: File): void;
  (e: "sendMessage", message: string): void;
}>();

function handleSendMessage() {
  if (!message.value) return;
  emit("sendMessage", message.value);
  message.value = "";
}

function handleUploadFile(file: File) {
  emit("uploadFile", file);
}
</script>

<template>
  <label class="input input-bordered flex items-center gap-2">
    <input
      v-model="message"
      v-on:keyup.enter="handleSendMessage"
      type="text"
      class="grow bg-base-100"
    />
    <button @click="handleSendMessage" class="btn btn-sm bg-base-100 border-0 btn-square">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
        />
      </svg>
    </button>
    <SendFile @upload-file="handleUploadFile" />
  </label>
</template>
