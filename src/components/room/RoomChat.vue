<script setup lang="ts">
import MessageWritter from "@/components/messages/MessageWritter.vue";

function handleSendMessage(message: string) {
  console.log("Sending msg in chatRoom: ", message);
}
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="overflow-y-auto">
      <p>Messages</p>
      <p>Messages</p>
      <p>Messages</p>
      <!-- <ul> -->
      <!-- <li v-for="(message, index) in messages" :key="index"> -->
      <!-- <MessageBubble -->
      <!-- :message="message.message" -->
      <!-- :fromWho="message.fromWho" -->
      <!-- :me-photo-url="useUserStore().photo" -->
      <!-- :friend-photo-url="friend.photo" -->
      <!-- /> -->
      <!-- </li> -->
      <!-- </ul> -->
    </div>
    <div class="mt-auto">
      <MessageWritter @send-message="handleSendMessage" />
    </div>
  </div>
</template>
