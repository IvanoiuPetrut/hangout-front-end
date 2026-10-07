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
  <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
    <div class="form-control">
      <label class="label pt-0" for="username"
        ><span class="label-text font-medium">Username</span></label
      >
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="input input-bordered w-full bg-base-200/60 transition-colors focus:border-primary focus:bg-base-100"
        autocomplete="username"
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
        placeholder="Password"
        class="input input-bordered w-full bg-base-200/60 transition-colors focus:border-primary focus:bg-base-100"
        autocomplete="current-password"
        required
        id="password"
      />
    </div>
    <div v-if="error" role="alert" class="alert alert-error animate-pop-in py-2 text-sm">
      <span>{{ error }}</span>
    </div>
    <div class="form-control mt-2">
      <button type="submit" class="btn btn-primary shadow-lg shadow-primary/25" :disabled="loading">
        <span v-if="loading" class="loading loading-spinner loading-sm"></span>
        Log in
      </button>
    </div>
    <RouterLink :to="{ name: 'register' }" class="block text-center">
      <span class="text-sm text-base-content/60 hover:text-base-content"
        >Don't have an account? <strong class="text-primary">Register</strong></span
      >
    </RouterLink>
  </form>
</template>
