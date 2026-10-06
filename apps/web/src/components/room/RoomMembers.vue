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
  <div class="h-full overflow-y-auto">
    <div class="mx-auto flex max-w-3xl flex-col gap-4 p-4 sm:p-6">
      <div class="flex items-center gap-2">
        <h2 class="text-lg font-semibold">Members</h2>
        <span class="badge badge-ghost badge-sm">{{ props.members.length }}</span>
      </div>
      <ul class="surface divide-y divide-base-content/[0.06] overflow-visible">
        <li
          v-for="member in props.members"
          :key="member.id"
          class="flex items-center gap-3 px-4 py-3"
        >
          <div class="avatar">
            <div class="w-10 rounded-full ring-1 ring-base-content/10">
              <img :src="member.photo" :alt="member.username" />
            </div>
          </div>
          <div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
            <p class="truncate font-medium">{{ member.username }}</p>
            <span v-if="isUserOwner(props.ownerId, member.id)" class="badge badge-primary badge-sm"
              >Owner</span
            >
            <span v-else class="badge badge-ghost badge-sm">Member</span>
            <span v-if="isTheLoggedUser(member.id)" class="text-xs text-base-content/40"
              >(you)</span
            >
          </div>

          <QuickActionMemberSettings
            :owner-id="props.ownerId"
            :user-id="member.id"
            :room-id="props.roomId"
            @user-kicked="emit('userKicked', $event)"
            v-if="!isUserOwner(props.ownerId, member.id) && !isTheLoggedUser(member.id)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
