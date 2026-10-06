<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { updateUserDetails, updateUserPicture } from "@/services/user/userInteractor";
import { useAsyncRequest } from "@/helpers/asyncRequest";

import BaseAlert from "@/components/alert/BaseAlert.vue";
import { getErrorMessage } from "@/helpers/auth";

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
      alert(getErrorMessage(error, "Could not save the photo"));
    }
  }
}
</script>

<template>
  <div>
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
      <span>Photo is too big. Maximum is 2MB</span>
    </BaseAlert>
    <div class="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6">
      <header class="animate-fade-up">
        <p class="section-title mb-2">Account</p>
        <h1 class="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p class="mt-1 text-base-content/60">Manage how others see you on Hangout.</p>
      </header>

      <section
        class="surface flex animate-fade-up flex-col gap-6 p-6 [animation-delay:60ms] sm:flex-row sm:items-center"
      >
        <div class="relative mx-auto shrink-0 sm:mx-0">
          <div
            class="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-accent opacity-70 blur-md"
          ></div>
          <img
            class="relative h-28 w-28 rounded-full object-cover ring-4 ring-base-200"
            alt="Your user profile picture"
            :src="photo || useUserStore().photo"
          />
        </div>
        <div class="flex flex-1 flex-col gap-3">
          <div>
            <h3 class="font-semibold">Profile photo</h3>
            <p class="text-sm text-base-content/60">PNG, JPG, GIF or WEBP. Up to 2MB.</p>
          </div>
          <input
            type="file"
            class="file-input file-input-bordered file-input-sm w-full bg-base-100/60"
            accept=".png,.jpg,.jpeg,.gif,.webp,.bmp"
            @change="handleFileChange"
          />
          <button
            @click="handleSavePhoto"
            class="btn btn-primary btn-sm w-fit"
            :disabled="!photo || loadingPhoto"
          >
            <span v-if="loadingPhoto" class="loading loading-spinner loading-xs"></span>
            Save photo
          </button>
        </div>
      </section>

      <section class="surface flex animate-fade-up flex-col gap-4 p-6 [animation-delay:120ms]">
        <div>
          <h3 class="font-semibold">Profile</h3>
          <p class="text-sm text-base-content/60">This is the name shown in chats and rooms.</p>
        </div>
        <label class="form-control w-full">
          <div class="label pt-0">
            <span class="label-text font-medium">Display name</span>
          </div>
          <input
            v-model="userName"
            type="text"
            :placeholder="useUserStore().userName || 'Enter your name'"
            class="input input-bordered w-full bg-base-100/60 focus:border-primary"
          />
        </label>
        <div v-if="false">
          <label class="form-control w-full">
            <div class="label pt-0">
              <span class="label-text font-medium">Password</span>
            </div>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••••••"
              class="input input-bordered w-full bg-base-100/60"
            />
          </label>
        </div>
        <div class="flex justify-end border-t border-base-content/[0.06] pt-4">
          <button
            @click="handleSaveSettings"
            class="btn btn-primary btn-sm"
            :disabled="loading || (!userName && !password)"
          >
            <span v-if="loading" class="loading loading-spinner loading-xs"></span>
            {{ saveSettingsText }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
