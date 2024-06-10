<script setup lang="ts">
import { ref } from "vue";
import SendFile from "@components/messages/SendFile.vue";

const message = ref("");
const rows = ref(1);

const emit = defineEmits<{
  (e: "uploadFile", file: File): void;
  (e: "sendMessage", message: string): void;
}>();

function handleSendMessage() {
  if (message.value.trim()) {
    emit("sendMessage", message.value);
    console.log("Message sent: ", message.value);
    message.value = "";
    rows.value = 1;
  }
}

function handleUploadFile(file: File) {
  emit("uploadFile", file);
}

function handleKeyUp(event: KeyboardEvent) {
  console.log("Key pressed: ", event.key);
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSendMessage();
  }
}

function adjustRows() {
  let lineCount = message.value.split("\n").length;
  lineCount = Math.min(lineCount, 6);
  rows.value = Math.max(lineCount, 1);
}
</script>

<template>
  <div class="relative">
    <textarea
      v-model="message"
      @keyup.enter.exact="handleKeyUp"
      @keyup.shift.enter.stop
      @input="adjustRows"
      placeholder="Type a message..."
      class="textarea textarea-bordered textarea-sm w-full pr-10"
      :rows="rows"
    ></textarea>
    <button
      @click="handleSendMessage"
      class="btn btn-sm bg-base-100 border-0 btn-square absolute right-2 top-2"
    >
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
    <SendFile @upload-file="handleUploadFile" class="absolute right-12 top-2" />
  </div>
</template>
