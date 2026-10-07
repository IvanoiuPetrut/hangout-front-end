<script setup lang="ts">
import CreateOrJoinRoom from "@/components/join_room/CreateOrJoinRoom.vue";
import AcceptRoomInviteList from "@/components/friends/AcceptRoomInviteList.vue";
</script>

<template>
  <div class="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
    <header class="flex animate-fade-up items-center justify-between gap-8">
      <div>
        <p class="section-title mb-2">Rooms</p>
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Find your <span class="text-gradient">people</span>
        </h1>
        <p class="mt-2 max-w-md text-base-content/60">
          Spin up a new room for your group, or hop into one you've been invited to.
        </p>
      </div>
      <img
        src="@/assets/img/remote_meeting.svg"
        alt="Remote meeting"
        class="hidden w-56 shrink-0 drop-shadow-xl md:block lg:w-64"
      />
    </header>
    <CreateOrJoinRoom class="animate-fade-up [animation-delay:60ms]" />
    <section class="surface animate-fade-up p-5 [animation-delay:120ms]">
      <AcceptRoomInviteList />
    </section>
  </div>
</template>
