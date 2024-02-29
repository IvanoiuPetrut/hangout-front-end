<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { updateUserDetails, useAsyncRequest } from "@/services/user/userInteractor";

import BaseAlert from "@/components/alert/BaseAlert.vue";

const userName = ref("");
const password = ref("");
const photo = ref("");

const { data, error, loading, execute } = useAsyncRequest(() =>
  updateUserDetails(userName.value, password.value)
);

async function handleSaveSettings() {
  await execute();
  if (!error.value) {
    useUserStore().setUserName(userName.value);
  }
  setTimeout(() => {
    data.value = null;
    error.value = null;
  }, 3500);
}
</script>

<template>
  <BaseAlert v-if="data" class="alert-success">
    <span>Settings saved successfully.</span>
  </BaseAlert>
  <BaseAlert v-if="error" class="alert-error">
    <span>{{ error }}</span>
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
        <div>
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
      </div>
      <div class="flex flex-col items-center gap-6 order-first sm:order-last">
        <h3 class="text-md font-bold uppercase">Profile Photo</h3>
        <img class="mask mask-squircle w-32" :src="useUserStore().photo || ''" />
        <input type="file" class="file-input file-input-bordered file-input-xs w-full max-w-xs" />
      </div>
    </div>
    <button @click="handleSaveSettings" class="btn btn-primary btn-wide" :disabled="loading">
      <span v-if="loading" class="loading loading-spinner"></span>
      Save settings
    </button>
  </div>
</template>
