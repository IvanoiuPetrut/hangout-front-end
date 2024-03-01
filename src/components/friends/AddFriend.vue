<script lang="ts" setup>
import { ref } from "vue";
import SendFriendRequestList from "@/components/friends/SendFriendRequestList.vue";
import { getUsers } from "@/services/user/userInteractor";
import { useAsyncRequest } from "@/helpers/asyncRequest";

const userName = ref("");
const { data, loading, execute } = useAsyncRequest(() => getUsers(userName.value));

async function handleSearchUsers() {
  await execute();
  console.log(data.value);
}
</script>

<template>
  <button class="btn btn-sm btn-primary mx-4" onclick="my_modal_5.showModal()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
      />
    </svg>
    Add friend
  </button>
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Enter the name of the friend you want to add</h3>
      <label class="input input-bordered flex items-center gap-2 mt-4">
        <input
          v-model="userName"
          type="search"
          name="search"
          placeholder="User name..."
          autocomplete="off"
          spellcheck="false"
          class="grow input-sm bg-base-100"
        />

        <button @click="handleSearchUsers" class="btn btn-neutral btn-sm" :disabled="loading">
          <svg
            v-if="!loading"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd"
            />
          </svg>
          <span v-if="loading" class="loading loading-spinner loading-md"></span>
          Search
        </button>
      </label>
      <SendFriendRequestList v-if="data" :users="data" />
      <p v-if="!data" class="mt-2">Enter a name and hit search.</p>
      <p v-if="data && data.length === 0" class="mt-2">No results found.</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
