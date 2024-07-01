<script setup lang="ts">
import type { User } from "@/types/types";
import QuickActionMemberSettings from "@components/room/QuickActionMemberSettings.vue";
import { useUserStore } from "@/stores/user";

const props = defineProps<{
  members: Array<User>;
  ownerId: string;
  roomId: string;
}>();

const emit = defineEmits<{
  (e: "userKicked", userId: string): void;
}>();

function isUserOwner(ownerId: string, userId: string): boolean {
  return ownerId === userId;
}

function isTheLoggedUser(userId: string): boolean {
  const loggedUserId = useUserStore().userId;
  return loggedUserId === userId;
}
</script>

<template>
  <!-- <span class="badge badge-primary badge-sm">Owner</span>
  <span class="badge badge-neutral badge-sm">Member</span>
  <span class="badge badge-secondary badge-sm">Moderator</span> -->
  <ul class="flex flex-col gap-4">
    <li
      v-for="member in props.members"
      :key="member.id"
      class="flex gap-2 md:gap-12 items-center justify-between md:justify-normal"
    >
      <div class="flex gap-2 items-center md:gap-4">
        <div class="mask mask-circle w-8 h-8 md:w-12 md:h-12">
          <img :src="member.photo" alt="Avatar Tailwind CSS Component" />
        </div>
        <p class="font-bold text-sm md:text-lg">{{ member.username }}</p>
      </div>
      <span v-if="isUserOwner(props.ownerId, member.id)" class="badge badge-primary badge-sm"
        >Owner</span
      >
      <span v-else class="badge badge-neutral badge-sm">Member</span>

      <QuickActionMemberSettings
        :owner-id="props.ownerId"
        :user-id="member.id"
        :room-id="props.roomId"
        @user-kicked="emit('userKicked', $event)"
        v-if="!isUserOwner(props.ownerId, member.id) && !isTheLoggedUser(member.id)"
      />
    </li>
  </ul>
</template>
