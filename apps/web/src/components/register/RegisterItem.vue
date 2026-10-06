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
  <form @submit.prevent="handleRegister">
    <div class="form-control mb-4">
      <label class="label" for="username"><span class="label-text">Username</span></label>
      <input
        v-model="username"
        type="text"
        placeholder="Letters and numbers, 3-20 characters"
        class="input input-bordered input-primary"
        autocomplete="username"
        minlength="3"
        maxlength="20"
        pattern="[a-zA-Z0-9]+"
        required
        id="username"
      />
    </div>
    <div class="form-control">
      <label class="label" for="password"><span class="label-text">Password</span></label>
      <input
        v-model="password"
        type="password"
        placeholder="At least 8 characters"
        class="input input-bordered input-primary"
        autocomplete="new-password"
        minlength="8"
        maxlength="128"
        required
        id="password"
      />
    </div>
    <div class="form-control">
      <label class="label" for="confirm-password"
        ><span class="label-text">Confirm password</span></label
      >
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Re-enter password"
        class="input input-bordered input-primary"
        autocomplete="new-password"
        required
        id="confirm-password"
      />
    </div>
    <p v-if="error" class="text-error text-sm mt-4">{{ error }}</p>
    <div class="form-control mt-6">
      <button type="submit" class="btn btn-primary" :disabled="loading">Register</button>
    </div>
    <RouterLink :to="{ name: 'login' }" class="block mt-4">
      <span class="label-text-alt link link-hover text-sm"
        >Already have an account? <strong>Login</strong></span
      >
    </RouterLink>
  </form>
</template>
