<script lang="ts" setup>
import { ref } from "vue";
import SendFriendRequestList from "@/components/friends/SendFriendRequestList.vue";
import { getUsers } from "@/services/user/userInteractor";
import { useAsyncRequest } from "@/helpers/asyncRequest";

const userName = ref("");
const { data, loading, execute } = useAsyncRequest(() => getUsers(userName.value));

async function handleSearchUsers() {
  if (!userName.value) {
    return;
  }
  await execute();
  console.log(data.value);
}
</script>

<template>
  <button
    class="btn btn-primary btn-square btn-sm"
    onclick="my_modal_5.showModal()"
    aria-label="Add friend"
    title="Add friend"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.75"
      stroke="currentColor"
      class="h-5 w-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
      />
    </svg>
  </button>
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="text-xl font-bold">Add a friend</h3>
      <p class="mt-1 text-sm text-base-content/60">Search by username and send a request.</p>
      <form class="join mt-4 w-full" @submit.prevent="handleSearchUsers">
        <label
          class="input join-item input-bordered flex w-full items-center gap-2 focus-within:border-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-4 w-4 opacity-50"
          >
            <path
              fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            v-model="userName"
            type="search"
            name="search"
            placeholder="Username..."
            autocomplete="off"
            spellcheck="false"
            class="grow"
          />
        </label>
        <button type="submit" class="btn btn-primary join-item" :disabled="loading">
          <span v-if="loading" class="loading loading-spinner loading-sm"></span>
          Search
        </button>
      </form>
      <SendFriendRequestList v-if="data" :users="data" />
      <p v-if="!data" class="empty-state mt-4">Enter a name and hit search.</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-ghost">Close</button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop"><button>close</button></form>
  </dialog>
</template>
