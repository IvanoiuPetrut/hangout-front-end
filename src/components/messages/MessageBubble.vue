<script setup lang="ts">
import moment from "moment";

const props = defineProps<{
  fromWho: "me" | "friend";
  message: string;
  photoUrl: string | undefined;
  senderName: string;
  createdAt: string;
}>();

function formatDate(isoString: string): string {
  return moment(isoString).format("DD/MM/YYYY HH:mm");
}
</script>

<template>
  <div class="flex gap-4">
    <div class="chat-image avatar self-center">
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
        <span class="font-bold mr-4">{{ props.senderName }}</span>
        <span class="text-xs opacity-70">{{ formatDate(props.createdAt) }}</span>
      </div>
      <div class="">{{ message }}</div>
    </div>
  </div>
</template>
