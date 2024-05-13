<script setup lang="ts">
import { ref } from "vue";

const isMicMuted = ref(false);
const isCameraOff = ref(false);
const isAudioMuted = ref(false);

const emit = defineEmits<{
  (e: "toggleMic", value: boolean): void;
  (e: "toggleCamera", value: boolean): void;
  (e: "toggleAudio", value: boolean): void;
}>();

function toggleMic() {
  isMicMuted.value = !isMicMuted.value;
  emit("toggleMic", isMicMuted.value);
}

function toggleCamera() {
  isCameraOff.value = !isCameraOff.value;
  emit("toggleCamera", isCameraOff.value);
}

function toggleAudio() {
  isAudioMuted.value = !isAudioMuted.value;
  emit("toggleAudio", isAudioMuted.value);
}
</script>

<template>
  <div class="w-56 md:w-72 mx-auto flex justify-between">
    <button class="btn btn-sm md:btn-md btn-circle btn-outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4 md:w-6 md:h-6"
      >
        <path
          fill-rule="evenodd"
          d="M3.5 2A1.5 1.5 0 0 0 2 3.5V5c0 1.149.15 2.263.43 3.326a13.022 13.022 0 0 0 9.244 9.244c1.063.28 2.177.43 3.326.43h1.5a1.5 1.5 0 0 0 1.5-1.5v-1.148a1.5 1.5 0 0 0-1.175-1.465l-3.223-.716a1.5 1.5 0 0 0-1.767 1.052l-.267.933c-.117.41-.555.643-.95.48a11.542 11.542 0 0 1-6.254-6.254c-.163-.395.07-.833.48-.95l.933-.267a1.5 1.5 0 0 0 1.052-1.767l-.716-3.223A1.5 1.5 0 0 0 4.648 2H3.5Zm9.78.22a.75.75 0 1 0-1.06 1.06L13.94 5l-1.72 1.72a.75.75 0 0 0 1.06 1.06L15 6.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L16.06 5l1.72-1.72a.75.75 0 0 0-1.06-1.06L15 3.94l-1.72-1.72Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <button
      class="btn btn-sm md:btn-md btn-circle btn-outline"
      :class="isMicMuted ? 'btn-error' : ''"
      @click="toggleMic"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4 md:w-6 md:h-6"
      >
        <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
        <path
          d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z"
        />
      </svg>
    </button>

    <button
      class="btn btn-sm md:btn-md btn-circle btn-outline"
      :class="isAudioMuted ? 'btn-error' : ''"
      @click="toggleAudio"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4 md:w-6 md:h-6"
      >
        <path
          d="M10.5 3.75a.75.75 0 0 0-1.264-.546L5.203 7H2.667a.75.75 0 0 0-.7.48A6.985 6.985 0 0 0 1.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 0 0 1.264-.546V3.75ZM16.45 5.05a.75.75 0 0 0-1.06 1.061 5.5 5.5 0 0 1 0 7.778.75.75 0 0 0 1.06 1.06 7 7 0 0 0 0-9.899Z"
        />
        <path
          d="M14.329 7.172a.75.75 0 0 0-1.061 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 0 0 1.06 1.06 4 4 0 0 0 0-5.656Z"
        />
      </svg>
    </button>

    <button
      class="btn btn-sm md:btn-md btn-circle btn-outline"
      :class="isCameraOff ? 'btn-error' : ''"
      @click="toggleCamera"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4 md:w-6 md:h-6"
      >
        <path
          d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z"
        />
      </svg>
    </button>
  </div>
</template>
