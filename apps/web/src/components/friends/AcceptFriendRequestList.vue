<script setup lang="ts">
import { ref, onMounted } from "vue";
import BaseAlert from "@components/alert/BaseAlert.vue";
import {
  getPendingFriendRequests,
  acceptFriendRequest,
  declineFriendRequest
} from "@/services/friend/friendInteractor";
import { getMultipleUsersDetails } from "@/services/user/userInteractor";
import { useAsyncRequest } from "@/helpers/asyncRequest";

const { data: friendRequests, execute: executeGetPendingFriendRequests } =
  useAsyncRequest(getPendingFriendRequests);

const friendRequestsWithDetails = ref<
  Array<{ from: string; to: string; username: string; photo: string }>
>([]);
const alertText = ref("");
const numberOfFriendRequests = ref(0);

async function handlePendingFriendRequests() {
  friendRequestsWithDetails.value = [];
  await executeGetPendingFriendRequests();
  let userIds: string[] = [];
  if (friendRequests.value) {
    userIds = friendRequests.value?.map((request) => request.from);
  }
  const { data: UsersDetails, execute: executeGetMultipleUsersDetails } = useAsyncRequest(() =>
    getMultipleUsersDetails(userIds)
  );
  await executeGetMultipleUsersDetails();

  if (friendRequests.value) {
    for (const request of friendRequests.value) {
      const user = UsersDetails.value?.find((user) => user.id === request.from);
      if (user) {
        friendRequestsWithDetails.value.push({
          from: request.from,
          to: request.to,
          username: user.username,
          photo: user.photo
        });
      }
    }
  }

  numberOfFriendRequests.value = friendRequestsWithDetails.value.length;
}

async function handleAcceptFriendRequest(senderId: string) {
  const { execute: executeAcceptFriendRequest } = useAsyncRequest(() =>
    acceptFriendRequest(senderId)
  );
  await executeAcceptFriendRequest();
  alertText.value = "Friend request accepted successfully.";
  setTimeout(() => {
    alertText.value = "";
  }, 3500);
  await handlePendingFriendRequests();
}

async function handleDeclineFriendRequest(senderId: string) {
  const { execute: executeDeclineFriendRequest } = useAsyncRequest(() =>
    declineFriendRequest(senderId)
  );
  await executeDeclineFriendRequest();
  alertText.value = "Friend request declined successfully.";
  setTimeout(() => {
    alertText.value = "";
  }, 3500);
  await handlePendingFriendRequests();
}

onMounted(async () => {
  await handlePendingFriendRequests();
});
</script>

<template>
  <BaseAlert v-if="alertText" class="alert-success"> {{ alertText }} </BaseAlert>
  <div class="mb-4 flex items-center gap-2">
    <h3 class="text-lg font-semibold">Friend requests</h3>
    <span class="badge badge-primary badge-sm">{{ numberOfFriendRequests }}</span>
  </div>
  <ul class="flex flex-col gap-2" v-if="friendRequestsWithDetails.length > 0">
    <li
      v-for="request in friendRequestsWithDetails"
      :key="request.from"
      class="flex animate-fade-up items-center justify-between gap-4 rounded-btn bg-base-100/50 p-3 ring-1 ring-base-content/5"
    >
      <div class="flex min-w-0 items-center gap-3">
        <img
          :src="request.photo"
          alt="user photo"
          class="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-base-content/10"
        />
        <div class="min-w-0">
          <p class="truncate font-semibold">{{ request.username }}</p>
          <p class="text-sm text-base-content/60">wants to be your friend</p>
        </div>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <button
          @click="handleAcceptFriendRequest(request.from)"
          class="btn btn-success btn-sm gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-4 w-4"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="hidden sm:inline">Accept</span>
        </button>
        <button
          @click="handleDeclineFriendRequest(request.from)"
          class="btn btn-ghost btn-sm btn-square text-base-content/60 hover:bg-error/10 hover:text-error"
          aria-label="Decline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-4 w-4"
          >
            <path
              d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
            />
          </svg>
        </button>
      </div>
    </li>
  </ul>
  <p class="empty-state" v-else>No friend requests right now</p>
</template>
