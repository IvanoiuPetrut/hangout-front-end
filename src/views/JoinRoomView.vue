<script setup lang="ts">
import CreateOrJoinRoom from "@/components/join_room/CreateOrJoinRoom.vue";
import AcceptRoomInviteList from "@/components/friends/AcceptRoomInviteList.vue";
</script>

<template>
  <div class="flex flex-col py-6 h-[calc(100vh-4.1rem)] gap-32 sm:justify-between md:py-12">
    <div class="mx-auto text-center">
      <AcceptRoomInviteList />
    </div>
    <CreateOrJoinRoom />
    <img
      src="@/assets/img/remote_meeting.svg"
      alt="Remote meeting"
      class="hidden w-96 mx-auto sm:block lg:w-1/4"
    />
  </div>
</template>
