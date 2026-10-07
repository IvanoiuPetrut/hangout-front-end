<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "uploadFile", file: File): void;
}>();

const file = ref<File | null>(null);
const isDragging = ref(false);

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer!.dropEffect = "copy";
};

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = false;
  const droppedFile = event.dataTransfer!.files[0];
  handleFile(droppedFile);
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files![0];
  handleFile(selectedFile);
};

const handleFile = (selectedFile: File) => {
  if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
    file.value = selectedFile;
  } else {
    alert("File is too large. Maximum size is 10MB.");
  }
};

const openFileDialog = () => {
  (document.getElementById("fileInput") as HTMLInputElement).click();
};
</script>

<template>
  <div>
    <button
      class="btn btn-ghost btn-square btn-sm h-9 w-9 text-base-content/60 hover:text-base-content"
      onclick="my_modal_1.showModal()"
      aria-label="Attach file"
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
          d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
        />
      </svg>
    </button>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="text-xl font-bold">Upload a file</h3>
        <p class="mt-1 text-sm text-base-content/60">Images, videos or documents up to 10MB.</p>
        <div
          class="mt-4 flex h-52 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-box border-2 border-dashed p-4 text-center transition-colors"
          :class="
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-base-content/15 hover:border-primary/60 hover:bg-base-content/[0.02]'
          "
          @dragover.prevent="onDragOver"
          @dragenter.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="onDrop"
          @click="openFileDialog"
        >
          <span class="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </span>
          <p v-if="!file" class="text-sm text-base-content/70">
            <span class="font-semibold text-primary">Click to choose</span> or drag and drop
          </p>
          <p v-else class="max-w-full truncate text-sm font-medium">{{ file.name }}</p>
          <input type="file" id="fileInput" @change="onFileChange" style="display: none" />
        </div>
        <div class="modal-action">
          <form method="dialog" class="flex flex-row-reverse gap-2">
            <button @click="emit('uploadFile', file!)" class="btn btn-primary" :disabled="!file">
              Upload
            </button>
            <button class="btn btn-ghost">Cancel</button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop"><button>close</button></form>
    </dialog>
  </div>
</template>
