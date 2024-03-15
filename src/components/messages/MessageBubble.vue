<script setup lang="ts">
const props = defineProps<{
  fromWho: "me" | "friend";
  message: string;
  friendPhotoUrl: string | undefined;
  mePhotoUrl: string | undefined;
}>();
</script>

<template>
  <div class="chat" :class="[props.fromWho === 'me' ? 'chat-end' : 'chat-start']">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          v-if="friendPhotoUrl && mePhotoUrl"
          alt="Profile photo"
          :src="props.fromWho === 'me' ? props.mePhotoUrl : props.friendPhotoUrl"
        />
        <img
          v-else
          alt="Profile photo"
          src="https://www.gravatar.com/avatar/3b3be63a4c2asdas01afdasda02?d=identicon"
        />
      </div>
    </div>
    <div class="chat-bubble">{{ message }}</div>
  </div>
</template>
