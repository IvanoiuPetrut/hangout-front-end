<script setup lang="ts">
import { ref, computed } from "vue";
import { useAsyncRequest } from "@/helpers/asyncRequest";
import { createChatRoom, getJoinedChatRooms } from "@/services/chatRoom/chatRoomInteractor";
import { useJoinedRoomsStore } from "@/stores/joinedRooms";

const roomName = ref("");
const { data: joinedRooms, execute: executeGetJoinedChatRooms } =
  useAsyncRequest(getJoinedChatRooms);

const isRoomNameLongEnough = computed(() => roomName.value.length > 3);
const isRoomNameMadeOfAlphaNumericCharacters = computed(() =>
  /^[a-zA-Z0-9]*$/.test(roomName.value)
);

async function handleCreateChatRoom() {
  const { data: chatRooms, execute } = useAsyncRequest(() => createChatRoom(roomName.value));
  if (isRoomNameLongEnough.value && isRoomNameMadeOfAlphaNumericCharacters.value) {
    await execute();
    await executeGetJoinedChatRooms();
    if (joinedRooms.value) {
      useJoinedRoomsStore().setJoinedRooms(joinedRooms.value);
    }
  }
}
</script>

<template>
  <button class="btn btn-primary" onclick="my_modal_1.showModal()">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path
        fill-rule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
        clip-rule="evenodd"
      />
    </svg>
    Create a new room
  </button>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Create a new room!</h3>
      <label class="form-control w-full max-w-xs py-4">
        <div class="label">
          <span class="label-text">What is the room name?</span>
        </div>
        <input
          v-model="roomName"
          type="text"
          placeholder="Awesome room name"
          class="input input-bordered input-primary w-full max-w-xs"
          spellcheck="false"
        />
        <div class="label flex flex-col items-start">
          <span v-if="!isRoomNameLongEnough" class="label-text-alt text-error"
            >Room name must be at least 4 characters long</span
          >
          <span v-if="!isRoomNameMadeOfAlphaNumericCharacters" class="label-text-alt text-error"
            >Room name must contain only alphanumeric characters</span
          >
        </div>
      </label>
      <div class="modal-action">
        <form method="dialog">
          <button
            @click="handleCreateChatRoom"
            class="btn btn-primary mr-4"
            :disabled="!isRoomNameLongEnough && !isRoomNameMadeOfAlphaNumericCharacters"
          >
            Create
          </button>
          <button class="btn">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
