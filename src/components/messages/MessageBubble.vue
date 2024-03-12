<script setup lang="ts">
const props = defineProps<{
  fromWho: "me" | "friend";
  message: string;
}>();
</script>

<template>
  <div class="chat" :class="[props.fromWho === 'me' ? 'chat-end' : 'chat-start']">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
    </div>
    <div class="chat-bubble">{{ message }}</div>
  </div>
</template>
