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
  <div class="h-full overflow-y-auto">
    <BaseAlert v-if="updateError" class="alert-error">
      {{ updateError }}
    </BaseAlert>
    <div class="mx-auto flex max-w-3xl flex-col gap-6 p-4 sm:p-6">
      <h2 class="text-lg font-semibold">Room settings</h2>

      <section class="surface divide-y divide-base-content/[0.06]">
        <div class="flex flex-col gap-2 p-5">
          <p class="section-title">Room name</p>
          <div class="flex items-center gap-3">
            <h1 v-if="!isNameEdit" class="flex-1 text-2xl font-bold tracking-tight">
              {{ roomName }}
            </h1>
            <input
              v-else
              v-model="newName"
              class="input input-bordered flex-1 focus:border-primary"
              @keyup.enter="handleAcceptNewName"
            />
            <button
              v-if="useUserStore().userId === props.ownerId && !isNameEdit"
              @click="isNameEdit = !isNameEdit"
              class="btn btn-ghost btn-sm gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.75"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit
            </button>
            <div v-else-if="useUserStore().userId === props.ownerId" class="flex gap-2">
              <button @click="handleCancelNewName" class="btn btn-ghost btn-sm">Cancel</button>
              <button @click="handleAcceptNewName" class="btn btn-primary btn-sm">Save</button>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2 p-5">
          <p class="section-title">Description</p>
          <div class="flex items-start gap-3">
            <p
              v-if="!isDescriptionEdit"
              class="flex-1 whitespace-pre-line text-base-content/70"
              :class="{ 'italic text-base-content/40': !roomDescription }"
            >
              {{ roomDescription || "No description yet." }}
            </p>
            <textarea
              v-else
              v-model="newDescription"
              class="textarea textarea-bordered h-32 flex-1 text-base focus:border-primary"
            ></textarea>
            <button
              v-if="useUserStore().userId === props.ownerId && !isDescriptionEdit"
              @click="isDescriptionEdit = !isDescriptionEdit"
              class="btn btn-ghost btn-sm gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.75"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit
            </button>
            <div v-else-if="useUserStore().userId === props.ownerId" class="flex gap-2">
              <button @click="handleCancelNewDescription" class="btn btn-ghost btn-sm">
                Cancel
              </button>
              <button @click="handleAcceptNewDescription" class="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        class="flex flex-col gap-4 rounded-box border border-error/25 bg-error/5 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div v-if="useUserStore().userId === props.ownerId">
          <h3 class="font-semibold text-error">Delete this room</h3>
          <p class="text-sm text-base-content/60">
            All messages and members will be removed. This can't be undone.
          </p>
        </div>
        <div v-else>
          <h3 class="font-semibold text-error">Leave this room</h3>
          <p class="text-sm text-base-content/60">You'll need a new invite to come back.</p>
        </div>
        <button
          v-if="useUserStore().userId === props.ownerId"
          class="btn btn-error btn-sm shrink-0"
          onclick="modal_delete_server.showModal()"
        >
          Delete room
        </button>
        <button
          v-if="useUserStore().userId !== props.ownerId"
          class="btn btn-error btn-outline btn-sm shrink-0"
          onclick="modal_leave_server.showModal()"
        >
          Leave room
        </button>
      </section>
    </div>

    <dialog id="modal_delete_server" class="modal">
      <div class="modal-box">
        <h3 class="flex items-center gap-3 text-lg font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-6 w-6 text-error"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clip-rule="evenodd"
            />
          </svg>
          Delete room?
        </h3>
        <p class="py-4 text-base-content/70">
          Do you really want to delete the chat room? This process cannot be undone.
        </p>
        <div class="modal-action">
          <form method="dialog" class="flex flex-row-reverse gap-2">
            <button @click="handleDeleteChatRoom" class="btn btn-error btn-sm">Delete</button>
            <button class="btn btn-ghost btn-sm">Cancel</button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop"><button>close</button></form>
    </dialog>

    <dialog id="modal_leave_server" class="modal">
      <div class="modal-box">
        <h3 class="flex items-center gap-3 text-lg font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-6 w-6 text-error"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clip-rule="evenodd"
            />
          </svg>
          Leave room?
        </h3>
        <p class="py-4 text-base-content/70">Do you really want to leave the chat room?</p>
        <div class="modal-action">
          <form method="dialog" class="flex flex-row-reverse gap-2">
            <button @click="handleLeaveChatRoom" class="btn btn-error btn-sm">Leave</button>
            <button class="btn btn-ghost btn-sm">Cancel</button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop"><button>close</button></form>
    </dialog>
  </div>
</template>
