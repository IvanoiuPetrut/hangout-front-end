<script setup lang="ts">
import AcceptFriendRequestList from "@/components/friends/AcceptFriendRequestList.vue";
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="border-b-2 border-neutral pb-4">
      <AcceptFriendRequestList />
    </div>
    <div class="border-b-2 border-neutral pb-4">
      <h3 class="font-bold text-xl mb-2">Messages - 0</h3>
      <p class="opacity-70">No messages</p>
    </div>
    <div class="border-b-2 border-neutral pb-4">
      <h3 class="font-bold text-xl mb-2">Room Invites - 0</h3>
      <p class="opacity-70">No room invites</p>
    </div>
  </div>
</template>
