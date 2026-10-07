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
    message.value = "";
    rows.value = 1;
  }
}

function handleUploadFile(file: File) {
  emit("uploadFile", file);
}

function handleKeyUp(event: KeyboardEvent) {
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
  <div
    class="flex items-end gap-1 rounded-2xl border border-base-content/10 bg-base-200/80 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl transition-colors focus-within:border-primary/50"
  >
    <SendFile @upload-file="handleUploadFile" />
    <textarea
      v-model="message"
      @keyup.enter.exact="handleKeyUp"
      @keyup.shift.enter.stop
      @input="adjustRows"
      placeholder="Type a message..."
      class="textarea min-h-0 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-[0.95rem] leading-6 focus:outline-none"
      :rows="rows"
    ></textarea>
    <button
      @click="handleSendMessage"
      class="btn btn-primary btn-square btn-sm h-9 w-9 shrink-0 shadow-md shadow-primary/30 disabled:shadow-none"
      :disabled="!message.trim()"
      aria-label="Send message"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-4 w-4"
      >
        <path
          d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
        />
      </svg>
    </button>
  </div>
</template>
