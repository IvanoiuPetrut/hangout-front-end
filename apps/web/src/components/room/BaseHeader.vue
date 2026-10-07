<script setup lang="ts">
const props = defineProps<{
  roomName: string;
  memberCount?: number;
}>();
</script>

<template>
  <div
    class="flex h-14 shrink-0 items-center gap-3 border-b border-base-content/[0.06] bg-base-100/40 px-4 backdrop-blur-xl"
  >
    <span
      class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold uppercase text-primary-content shadow-md shadow-primary/20"
    >
      {{ props.roomName.charAt(0) }}
    </span>
    <div class="min-w-0 leading-tight">
      <h3 class="truncate font-semibold">{{ props.roomName }}</h3>
      <p v-if="props.memberCount !== undefined" class="text-xs text-base-content/50">
        {{ props.memberCount }} {{ props.memberCount === 1 ? "member" : "members" }}
      </p>
    </div>
  </div>
</template>
