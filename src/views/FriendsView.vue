<script setup lang="ts">
import FriendList from "@/components/friends/FriendList.vue";
import FriendsChat from "@/components/friends/FriendsChat.vue";

const friendsDummy = [
  {
    id: "1",
    name: "John",
    photo: "https://randomuser.me/api/portraits/men/84.jpg"
  },
  {
    id: "2",
    name: "Jane",
    photo: "https://randomuser.me/api/portraits/women/82.jpg"
  },
  {
    id: "3",
    name: "Doe",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  }
];
</script>

<template>
  <div class="flex">
    <div class="h-[calc(100vh-4rem-2px)]">
      <FriendList :friends="friendsDummy" />
    </div>
    <!-- <FriendsChat /> -->
  </div>
</template>
