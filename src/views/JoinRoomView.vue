<script setup lang="ts">
import { ref } from "vue";

const roomCode = ref("");
</script>

<template>
  <!-- ! invites list -->
  <div class="mx-4 mt-12 lg:mx-auto lg:w-3/5 xl:w-1/2">
    <h3 class="text-lg font-bold mb-2 lg:text-xl lg:mb-4 opacity-70">Room invites</h3>
    <div class="border-2 border-neutral rounded-md px-4 py-2">
      <ul class="flex flex-col gap-2">
        <li class="flex flex-col justify-between sm:flex-row sm:itens-center">
          <div>
            <strong class="badge badge-primary text-md">Camera fotbalistilor</strong> from
            <span class="font-bold">CristiFotbal</span>
          </div>
          <span class="self-end"
            ><button class="btn btn-sm btn-success mr-2">Accept</button
            ><button class="btn btn-sm btn-error">Decline</button>
          </span>
        </li>
        <li class="flex flex-col justify-between sm:flex-row sm:itens-center">
          <div>
            <strong class="badge badge-primary text-md">Camera fotbalistilor</strong> from
            <span class="font-bold">CristiFotbal</span>
          </div>
          <span class="self-end"
            ><button class="btn btn-sm btn-success mr-2">Accept</button
            ><button class="btn btn-sm btn-error">Decline</button>
          </span>
        </li>
        <li class="flex flex-col justify-between sm:flex-row sm:itens-center">
          <div>
            <strong class="badge badge-primary text-md">Camera fotbalistilor</strong> from
            <span class="font-bold">CristiFotbal</span>
          </div>
          <span class="self-end"
            ><button class="btn btn-sm btn-success mr-2">Accept</button
            ><button class="btn btn-sm btn-error">Decline</button>
          </span>
        </li>
      </ul>
    </div>
  </div>

  <!-- ! OR component -->
  <div class="flex flex-col w-full sm:w-96 md:flex-row md:w-fit border-opacity-50 mx-auto mt-24">
    <div class="grid place-items-center md:h-20">
      <button class="btn btn-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            clip-rule="evenodd"
          />
        </svg>
        Create a new room
      </button>
    </div>
    <div class="divider md:divider-horizontal">OR</div>
    <div class="grid place-items-center md:h-20">
      <div class="flex gap-4">
        <input
          v-model="roomCode"
          type="text"
          placeholder="Room code"
          class="input input-bordered w-full max-w-xs"
        />
        <button
          class="btn btn-neutral"
          :class="[roomCode.length === 6 ? '' : 'btn-disabled']"
          spellcheck="false"
        >
          Join
        </button>
      </div>
    </div>
  </div>

  <!-- ! art -->
  <img
    src="@/assets/img/remote_meeting.svg"
    alt="Remote meeting"
    class="hidden w-96 mx-auto mt-12 sm:block lg:w-1/4"
  />
</template>
