<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "uploadFile", file: File): void;
}>();

const file = ref<File | null>(null);

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer!.dropEffect = "copy";
};

const onDrop = (event: DragEvent) => {
  event.preventDefault();
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
    <button class="btn btn-sm bg-base-100 border-0 btn-square" onclick="my_modal_1.showModal()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Upload your file:</h3>
        <div
          class="w-full h-52 border-2 border-dashed border-primary flex items-center justify-center text-center cursor-pointer"
          @dragover.prevent="onDragOver"
          @drop.prevent="onDrop"
          @click="openFileDialog"
        >
          <p v-if="!file">Drag and drop a file here, or click to select a file</p>
          <p v-else>{{ file.name }}</p>
          <input type="file" id="fileInput" @change="onFileChange" style="display: none" />
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button
              @click="emit('uploadFile', file!)"
              class="btn btn-primary mr-4"
              :disabled="!file"
            >
              Upload
            </button>
            <button class="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.drop-zone.drag-over {
  border-color: #333;
}
</style>
