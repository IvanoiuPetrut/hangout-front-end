<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { login } from "@/services/user/auth";
import { completeLogin, getErrorMessage } from "@/helpers/auth";

const route = useRoute();
const username = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function handleLogin(): Promise<void> {
  error.value = "";
  loading.value = true;
  try {
    const accessToken = await login(username.value, password.value);
    completeLogin(accessToken, route.query.redirect as string | undefined);
  } catch (e) {
    error.value = getErrorMessage(e, "Could not log in");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div class="form-control mb-4">
      <label class="label" for="username"><span class="label-text">Username</span></label>
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="input input-bordered input-primary"
        autocomplete="username"
        required
        id="username"
      />
    </div>
    <div class="form-control">
      <label class="label" for="password"><span class="label-text">Password</span></label>
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input input-bordered input-primary"
        autocomplete="current-password"
        required
        id="password"
      />
    </div>
    <p v-if="error" class="text-error text-sm mt-4">{{ error }}</p>
    <div class="form-control mt-6">
      <button type="submit" class="btn btn-primary" :disabled="loading">Login</button>
    </div>
    <RouterLink :to="{ name: 'register' }" class="block mt-4">
      <span class="label-text-alt link link-hover text-sm"
        >Need account? <strong>Register</strong></span
      >
    </RouterLink>
  </form>
</template>
