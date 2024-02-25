<script setup lang="ts">
import MessageWritter from "@/components/messages/MessageWritter.vue";
import MessageBubble from "@components/messages/MessageBubble.vue";
</script>

<template>
  <div class="flex flex-col w-full pt-4">
    <div class="px-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
    </div>
    <div class="px-4 mt-auto mb-2">
      <MessageWritter />
    </div>
  </div>
</template>
