<script setup lang="ts">
import { ref } from "vue";
import SendFile from "@components/messages/SendFile.vue";

const message = ref("");
const rows = ref(1);

const emit = defineEmits<{
  (e: "uploadFile", file: File): void;
  (e: "sendMessage", message: string): void;
  (e: "setAiMode"): void;
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

function handleSetAiMode() {
  emit("setAiMode");
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
    <div class="flex gap-2 absolute right-2 top-2">
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
      <SendFile @upload-file="handleUploadFile" class="" />
      <button @click="handleSetAiMode" class="btn btn-sm bg-base-100 border-0 btn-square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
