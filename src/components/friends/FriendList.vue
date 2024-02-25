<script setup lang="ts">
import type { Friend } from "@/types/types.ts";
defineProps<{
  friends: Array<Friend>;
}>();
</script>

<template>
  <div class="px-2 py-4 bg-base-300 w-48 h-full">
    <ul class="flex flex-col gap-2">
      <li
        v-for="friend in friends"
        :key="friend.id"
        class="flex gap-4 items-center p-2 rounded-lg bg-neutral border border-neutral hover:bg-base-100 cursor-pointer transition-all"
      >
        <div class="avatar">
          <div class="w-8 rounded-full">
            <img :src="friend.photo" :alt="friend.name" />
          </div>
        </div>
        <p>{{ friend.name }}</p>
      </li>
    </ul>
  </div>
</template>
