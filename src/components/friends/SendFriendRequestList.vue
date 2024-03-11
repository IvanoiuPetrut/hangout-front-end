<script setup lang="ts">
import { onBeforeMount, computed } from "vue";
import type { User, FriendRequest } from "@/types/types.ts";
import { sendFriendRequest, getFriendRequests } from "@/services/friend/friendInteractor";
import { useAsyncRequest } from "@/helpers/asyncRequest";

const props = defineProps<{
  users: Array<User>;
}>();

const { data: friendRequests, execute: executeGetFriendRequests } =
  useAsyncRequest(getFriendRequests);

async function handleSendFriendRequest(receiverId: string) {
  const { execute: executeSendFriendRequest } = useAsyncRequest(() =>
    sendFriendRequest(receiverId)
  );
  await executeSendFriendRequest();
  await executeGetFriendRequests();
}

const pendingRequests = computed(() => {
  const pendingRequests: Array<User> = [];
  if (!friendRequests.value) {
    return pendingRequests;
  }
  for (const request of friendRequests.value) {
    if (request.status === "pending") {
      const user = props.users.find((user: User) => user.id === request.to);
      if (user) {
        pendingRequests.push(user);
      }
    }
  }
  return pendingRequests;
});

const availableRequests = computed(() => {
  const availableRequests: Array<User> = [];
  for (const user of props.users) {
    const isAlreadyCreated = friendRequests.value?.find(
      (request: FriendRequest) => request.to === user.id
    );
    if (!isAlreadyCreated) {
      availableRequests.push(user);
    }
  }
  return availableRequests;
});

onBeforeMount(async () => {
  await executeGetFriendRequests();
});
</script>

<template>
  <ul>
    <li class="flex items-center gap-2 mt-4" v-for="user in availableRequests" :key="user.id">
      <img :src="user.photo" class="mask mask-squircle w-8" />
      <span>{{ user.username }}</span>
      <button @click="handleSendFriendRequest(user.id)" class="btn btn-sm btn-primary">
        Send Request
      </button>
    </li>
  </ul>
  <ul>
    <li class="flex items-center gap-2 mt-4" v-for="user in pendingRequests" :key="user.id">
      <img :src="user.photo" class="mask mask-squircle w-8" />
      <span>{{ user.username }}</span>
      <button class="btn btn-sm btn-primary" disabled>Pending</button>
    </li>
  </ul>
  <p v-if="availableRequests.length === 0 && pendingRequests.length === 0" class="mt-2">
    No results found.
  </p>
</template>
