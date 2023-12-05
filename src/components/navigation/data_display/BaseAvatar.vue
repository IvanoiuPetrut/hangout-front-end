<script setup lang="ts">
defineProps<{
  userName: string
}>()
</script>

<template>
  <div class="flex gap-4">
    <div class="avatar online">
      <div class="w-12 rounded-full">
        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <p class="text-center font-bold">{{ userName }}</p>
  </div>
</template>
