<script setup lang="ts">
import AcceptFriendRequestList from "@/components/friends/AcceptFriendRequestList.vue";
import AcceptRoomInviteList from "@/components/friends/AcceptRoomInviteList.vue";
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6">
    <header class="animate-fade-up">
      <p class="section-title mb-2">Inbox</p>
      <h1 class="text-3xl font-extrabold tracking-tight">Notifications</h1>
      <p class="mt-1 text-base-content/60">Requests and invites waiting for your answer.</p>
    </header>
    <section class="surface animate-fade-up p-5 [animation-delay:60ms]">
      <AcceptFriendRequestList />
    </section>
    <section class="surface animate-fade-up p-5 [animation-delay:120ms]">
      <AcceptRoomInviteList />
    </section>
  </div>
</template>
