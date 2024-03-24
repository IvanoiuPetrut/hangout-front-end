<script setup lang="ts">
import { ref } from "vue";

import CreateRoomModal from "./CreateRoomModal.vue";

const roomCode = ref("");
</script>

<template>
  <div class="flex flex-col w-full sm:w-96 md:flex-row md:w-fit border-opacity-50 mx-auto">
    <div class="grid place-items-center md:h-20">
      <CreateRoomModal />
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
</template>
