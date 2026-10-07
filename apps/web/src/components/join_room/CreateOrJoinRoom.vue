<script setup lang="ts">
import { ref } from "vue";

import CreateRoomModal from "./CreateRoomModal.vue";

const roomCode = ref("");
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="surface relative flex flex-col gap-4 overflow-hidden p-6">
      <div
        class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
      ></div>
      <div class="relative">
        <h3 class="text-lg font-semibold">Create a room</h3>
        <p class="mt-1 text-sm text-base-content/60">
          You'll be the owner and can invite friends right away.
        </p>
      </div>
      <CreateRoomModal />
    </div>
    <div class="surface relative flex flex-col gap-4 overflow-hidden p-6">
      <div
        class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl"
      ></div>
      <div class="relative">
        <h3 class="text-lg font-semibold">Join with a code</h3>
        <p class="mt-1 text-sm text-base-content/60">Got a 6 character code? Paste it below.</p>
      </div>
      <div class="join relative w-full">
        <input
          v-model="roomCode"
          type="text"
          placeholder="e.g. A1B2C3"
          maxlength="6"
          class="input join-item input-bordered w-full bg-base-100/60 font-mono uppercase tracking-widest placeholder:font-sans placeholder:normal-case placeholder:tracking-normal"
          spellcheck="false"
        />
        <button
          class="btn btn-secondary join-item"
          :class="[roomCode.length === 6 ? '' : 'btn-disabled']"
        >
          Join
        </button>
      </div>
    </div>
  </div>
</template>
