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
  <ul class="mt-4 flex flex-col gap-2">
    <li
      v-for="user in availableRequests"
      :key="user.id"
      class="flex items-center gap-3 rounded-btn bg-base-200 p-2 pl-3 ring-1 ring-base-content/5"
    >
      <img :src="user.photo" class="h-9 w-9 rounded-full object-cover" />
      <span class="flex-1 truncate font-medium">{{ user.username }}</span>
      <button @click="handleSendFriendRequest(user.id)" class="btn btn-primary btn-sm">
        Send request
      </button>
    </li>
    <li
      v-for="user in pendingRequests"
      :key="user.id"
      class="flex items-center gap-3 rounded-btn bg-base-200 p-2 pl-3 ring-1 ring-base-content/5"
    >
      <img :src="user.photo" class="h-9 w-9 rounded-full object-cover" />
      <span class="flex-1 truncate font-medium">{{ user.username }}</span>
      <span class="badge badge-ghost gap-1 py-3">
        <span class="loading loading-dots loading-xs"></span>
        Pending
      </span>
    </li>
  </ul>
  <p v-if="availableRequests.length === 0 && pendingRequests.length === 0" class="empty-state">
    No results found.
  </p>
</template>
