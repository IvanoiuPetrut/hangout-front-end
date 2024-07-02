<script setup lang="ts">
import { ref } from "vue";
import BaseAlert from "../alert/BaseAlert.vue";
import { useUserStore } from "@/stores/user";
import {
  editName,
  editDescription,
  deleteChatRoom,
  leaveChatRoom
} from "@/services/chatRoom/chatRoomInteractor";

const props = defineProps<{
  roomId: string;
  roomName: string;
  roomDescription: string;
  ownerId: string;
}>();

const emit = defineEmits<{
  (e: "updateRoomName", newName: string): void;
}>();

const roomName = ref(props.roomName);
const newName = ref(props.roomName);

const roomDescription = ref(props.roomDescription);
const newDescription = ref(props.roomDescription);

const isNameEdit = ref(false);
const isDescriptionEdit = ref(false);

const updateError = ref<string | null>(null);

async function handleAcceptNewName() {
  try {
    await editName(props.roomId, newName.value);
    roomName.value = newName.value;
    isNameEdit.value = false;
    emit("updateRoomName", newName.value);
  } catch (error: any) {
    if (error.response && error.response.data) {
      updateError.value = error.response.data.message as string;
      setTimeout(() => {
        updateError.value = null;
      }, 3500);
    } else {
      updateError.value = error.message;
      setTimeout(() => {
        updateError.value = null;
      }, 3500);
    }
  }
}

function handleCancelNewName() {
  newName.value = roomName.value;
  isNameEdit.value = false;
}

async function handleAcceptNewDescription() {
  try {
    await editDescription(props.roomId, newDescription.value);
    roomDescription.value = newDescription.value;
    isDescriptionEdit.value = false;
  } catch (error: any) {
    if (error.response && error.response.data) {
      updateError.value = error.response.data.message;
      setTimeout(() => {
        updateError.value = null;
      }, 3500);
    } else {
      updateError.value = error.message;
      setTimeout(() => {
        updateError.value = null;
      }, 3500);
    }
  }
}

function handleCancelNewDescription() {
  newDescription.value = roomDescription.value;
  isDescriptionEdit.value = false;
}

async function handleDeleteChatRoom() {
  await deleteChatRoom(props.roomId);
  window.location.href = "/";
}

async function handleLeaveChatRoom() {
  await leaveChatRoom(props.roomId);
  window.location.href = "/";
}
</script>

<template>
  <div>
    <BaseAlert v-if="updateError" class="alert-error">
      {{ updateError }}
    </BaseAlert>
    <div class="mb-2 flex items-center gap-4">
      <h1 v-if="!isNameEdit" class="text-2xl font-bold">{{ roomName }}</h1>
      <div v-else>
        <input v-model="newName" class="input input-bordered w-full max-w-xs" />
      </div>
      <button
        v-if="useUserStore().userId === props.ownerId && !isNameEdit"
        @click="isNameEdit = !isNameEdit"
        class="btn btn-circle btn-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
          />
        </svg>
      </button>
      <div v-else-if="useUserStore().userId === props.ownerId">
        <div class="flex gap-2">
          <button @click="handleAcceptNewName" class="btn btn-circle btn-xs btn-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button @click="handleCancelNewName" class="btn btn-circle btn-xs btn-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="mb-6 flex gap-4">
      <p v-if="!isDescriptionEdit" class="text-base opacity-70 max-w-screen-sm">
        {{ roomDescription }}
      </p>
      <div v-else class="w-48 lg:w-96">
        <textarea
          v-model="newDescription"
          class="textarea textarea-bordered w-full text-xs md:text-md lg:text-lg h-32 lg:h-64"
        ></textarea>
      </div>
      <button
        v-if="useUserStore().userId === props.ownerId && !isDescriptionEdit"
        @click="isDescriptionEdit = !isDescriptionEdit"
        class="btn btn-circle btn-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
          />
        </svg>
      </button>
      <div v-else-if="useUserStore().userId === props.ownerId" class="flex gap-2">
        <button @click="handleAcceptNewDescription" class="btn btn-circle btn-xs btn-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button @click="handleCancelNewDescription" class="btn btn-circle btn-xs btn-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <button
      v-if="useUserStore().userId === props.ownerId"
      class="btn btn-error btn-sm"
      onclick="modal_delete_server.showModal()"
    >
      Delete server
    </button>
    <dialog id="modal_delete_server" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold flex gap-4 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clip-rule="evenodd"
            />
          </svg>
          Confirm delete
        </h3>
        <p class="py-4">
          Do you really want to delete the chat room? This process cannot be undone.
        </p>
        <div class="modal-action">
          <form method="dialog" class="flex gap-4">
            <button @click="handleDeleteChatRoom" class="btn btn-sm btn-error">Delete</button>
            <button class="btn btn-sm">Close</button>
          </form>
        </div>
      </div>
    </dialog>

    <button
      v-if="useUserStore().userId !== props.ownerId"
      class="btn btn-sm"
      onclick="modal_leave_server.showModal()"
    >
      Leave server
    </button>
    <dialog id="modal_leave_server" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold flex gap-4 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clip-rule="evenodd"
            />
          </svg>
          Confirm leave
        </h3>
        <p class="py-4">Do you really want to leave the chat room?</p>
        <div class="modal-action">
          <form method="dialog" class="flex gap-4">
            <button @click="handleLeaveChatRoom" class="btn btn-sm btn-error">Leave</button>
            <button class="btn btn-sm">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
