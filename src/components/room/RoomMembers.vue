<script setup lang="ts">
import type { User } from "@/types/types";
import QuickActionMemberSettings from "@components/room/QuickActionMemberSettings.vue";

function isUserOwner(ownerId: string, userId: string): boolean {
  return ownerId === userId;
}

const props = defineProps<{
  members: Array<User>;
  ownerId: string;
}>();
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
        v-if="!isUserOwner(props.ownerId, member.id)"
      />
    </li>
  </ul>
</template>
