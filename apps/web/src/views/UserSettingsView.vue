<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { updateUserDetails, updateUserPicture } from "@/services/user/userInteractor";
import { useAsyncRequest } from "@/helpers/asyncRequest";

import BaseAlert from "@/components/alert/BaseAlert.vue";

const userName = ref("");
const password = ref("");
const photo = ref("");
const photoFile = ref<File>();
const { data, error, loading, execute } = useAsyncRequest(() =>
  updateUserDetails(userName.value, password.value)
);
const loadingPhoto = ref(false);
const photoSuccess = ref(false);
const photoToBig = ref(false);

async function handleSaveSettings() {
  if (password.value) {
    console.log(password.value);
  }

  await execute();
  if (!error.value) {
    useUserStore().setUserName(userName.value);
  }
  setTimeout(() => {
    data.value = null;
    error.value = null;
  }, 3500);
}

const saveSettingsText = computed(() => {
  if (loading.value) {
    return "Saving...";
  }
  if (userName.value.length > 0 && password.value.length > 0) {
    return "Save settings for name and password";
  }
  if (password.value.length > 0) {
    return "Save settings for password";
  }
  if (userName.value.length > 0) {
    return "Save settings for name";
  }
  return "Save settings";
});

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  const spaceConstraint = 2;

  if (file) {
    const maxSizeInBytes = spaceConstraint * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      photoToBig.value = true;
      setTimeout(() => {
        photoToBig.value = false;
      }, 3500);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        photo.value = result;
      }
    };
    reader.readAsDataURL(file);
    photoFile.value = file;
  }
}

async function handleSavePhoto() {
  if (photoFile.value) {
    console.log(photoFile.value);
    try {
      const userDetails = await updateUserPicture(photoFile.value);
      useUserStore().setPhoto(userDetails.photo);
      photoSuccess.value = true;
      setTimeout(() => {
        photoSuccess.value = false;
      }, 3500);
    } catch (error) {
      console.error("Error saving photo", error);
    }
  }
}
</script>

<template>
  <BaseAlert v-if="data" class="alert-success">
    <span>Settings saved successfully.</span>
  </BaseAlert>
  <BaseAlert v-if="error" class="alert-error">
    <span>{{ error }}</span>
  </BaseAlert>
  <BaseAlert v-if="photoSuccess" class="alert-success">
    <span>Photo saved successfully.</span>
  </BaseAlert>
  <BaseAlert v-if="photoToBig" class="alert-error">
    <span>Photo is to big. Maximum is 2MB</span>
  </BaseAlert>
  <div class="flex flex-col gap-8 items-center mt-8 px-4 sm:mt-32">
    <div
      class="flex flex-col sm:flex-row gap-8 sm:gap-24 w-fit p-4 border-2 border-neutral rounded-lg mx-auto"
    >
      <div class="flex flex-col gap-4">
        <div>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-bold uppercase">Dispaly name</span>
            </div>
            <input
              v-model="userName"
              type="text"
              :placeholder="useUserStore().userName || 'Enter your name'"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </label>
        </div>
        <div v-if="false">
          <label class="form-control w-full max-w-xs">
            <div class="label font-bold uppercase">
              <span class="label-text">Password</span>
            </div>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••••••"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </label>
        </div>
        <button
          @click="handleSaveSettings"
          class="btn btn-primary btn-wide mt-auto"
          :disabled="loading || (!userName && !password)"
        >
          <span v-if="loading" class="loading loading-spinner"></span>
          {{ saveSettingsText }}
        </button>
      </div>
      <div class="flex flex-col items-center gap-6 order-first sm:order-last">
        <h3 class="text-md font-bold uppercase">Profile Photo</h3>
        <img
          class="w-32 h-32 object-cover mask mask-squircle"
          alt="Your user profile picture"
          :src="photo || useUserStore().photo"
        />
        <input
          type="file"
          class="file-input file-input-bordered file-input-xs w-full max-w-xs"
          accept=".png,.jpg,.jpeg,.gif,.webp,.bmp"
          @change="handleFileChange"
        />
        <button
          @click="handleSavePhoto"
          class="btn btn-primary btn-wide"
          :disabled="!photo || loadingPhoto"
        >
          <span v-if="loadingPhoto" class="loading loading-spinner"></span>
          Save photo
        </button>
      </div>
    </div>
  </div>
</template>
