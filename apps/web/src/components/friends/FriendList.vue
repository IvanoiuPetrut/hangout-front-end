<script setup lang="ts">
import type { Friend } from "@/types/types.ts";
defineProps<{
  friends: Array<Friend>;
  selectedFriendId?: string;
}>();

const emit = defineEmits<{
  (e: "selectFriend", friend: Friend): void;
}>();
</script>

<template>
  <div>
    <ul v-if="friends.length > 0" class="flex flex-col gap-0.5">
      <li v-for="friend in friends" :key="friend.id">
        <button
          class="flex w-full items-center gap-3 rounded-btn px-2.5 py-2 text-left transition-colors"
          :class="
            friend.id === selectedFriendId
              ? 'bg-primary/10 text-primary'
              : 'text-base-content/80 hover:bg-base-content/5 hover:text-base-content'
          "
          @click="emit('selectFriend', friend)"
        >
          <div class="avatar">
            <div class="w-9 rounded-full ring-1 ring-base-content/10">
              <img :src="friend.photo" :alt="friend.username" />
            </div>
          </div>
          <p class="truncate font-medium">{{ friend.username }}</p>
        </button>
      </li>
    </ul>
    <p v-else class="empty-state m-2">No friends yet. Use the + button to add some.</p>
  </div>
</template>
