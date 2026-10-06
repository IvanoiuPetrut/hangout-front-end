<script setup lang="ts">
import { ref } from "vue";
import { register } from "@/services/user/auth";
import { completeLogin, getErrorMessage } from "@/helpers/auth";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const loading = ref(false);

async function handleRegister(): Promise<void> {
  error.value = "";
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;
  try {
    const accessToken = await register(username.value, password.value);
    completeLogin(accessToken);
  } catch (e) {
    error.value = getErrorMessage(e, "Could not create account");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
    <div class="form-control">
      <label class="label pt-0" for="username"
        ><span class="label-text font-medium">Username</span></label
      >
      <input
        v-model="username"
        type="text"
        placeholder="Letters and numbers, 3-20 characters"
        class="input input-bordered w-full bg-base-200/60 transition-colors focus:border-primary focus:bg-base-100"
        autocomplete="username"
        minlength="3"
        maxlength="20"
        pattern="[a-zA-Z0-9]+"
        required
        id="username"
      />
    </div>
    <div class="form-control">
      <label class="label pt-0" for="password"
        ><span class="label-text font-medium">Password</span></label
      >
      <input
        v-model="password"
        type="password"
        placeholder="At least 8 characters"
        class="input input-bordered w-full bg-base-200/60 transition-colors focus:border-primary focus:bg-base-100"
        autocomplete="new-password"
        minlength="8"
        maxlength="128"
        required
        id="password"
      />
    </div>
    <div class="form-control">
      <label class="label pt-0" for="confirm-password"
        ><span class="label-text font-medium">Confirm password</span></label
      >
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Re-enter password"
        class="input input-bordered w-full bg-base-200/60 transition-colors focus:border-primary focus:bg-base-100"
        autocomplete="new-password"
        required
        id="confirm-password"
      />
    </div>
    <div v-if="error" role="alert" class="alert alert-error animate-pop-in py-2 text-sm">
      <span>{{ error }}</span>
    </div>
    <div class="form-control mt-2">
      <button type="submit" class="btn btn-primary shadow-lg shadow-primary/25" :disabled="loading">
        <span v-if="loading" class="loading loading-spinner loading-sm"></span>
        Create account
      </button>
    </div>
    <RouterLink :to="{ name: 'login' }" class="block text-center">
      <span class="text-sm text-base-content/60 hover:text-base-content"
        >Already have an account? <strong class="text-primary">Log in</strong></span
      >
    </RouterLink>
  </form>
</template>
