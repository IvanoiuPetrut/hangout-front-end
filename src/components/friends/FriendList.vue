<script setup lang="ts">
import type { Friend } from "@/types/types.ts";
defineProps<{
  friends: Array<Friend>;
}>();

const emit = defineEmits<{
  (e: "selectFriend", friend: Friend): void;
}>();
</script>

<template>
  <div class="w-48">
    <ul class="flex flex-col gap-2">
      <li v-for="friend in friends" :key="friend.id">
        <button
          class="btn flex gap-4 justify-start p-2 bg-neutral w-full"
          @click="emit('selectFriend', friend)"
        >
          <div class="avatar">
            <div class="w-8 rounded-full">
              <img :src="friend.photo" :alt="friend.name" />
            </div>
          </div>
          <p>{{ friend.name }}</p>
        </button>
      </li>
    </ul>
  </div>
</template>
