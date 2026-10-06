<script setup lang="ts">
import AuthLayout from "@/components/auth/AuthLayout.vue";
import LoginItem from "@/components/login/LoginItem.vue";
</script>

<template>
  <AuthLayout title="Welcome back" subtitle="Log in to jump back into your rooms.">
    <LoginItem />
  </AuthLayout>
</template>
