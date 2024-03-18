<script setup lang="ts">
import BaseFooter from "@/components/navigation/BaseFooter.vue";
import UserStats from "@/components/navigation/data_display/UserStats.vue";
import CardOverlayImage from "@/components/navigation/data_display/CardOverlayImage.vue";
</script>

<template>
  <main class="flex flex-col h-[calc(100vh-4.4rem)] pt-12">
    <UserStats class="mx-auto" />

    <div class="flex flex-col md:flex-row gap-12 mx-auto mt-auto">
      <CardOverlayImage :background-url="'/src/assets/img/rooms.svg'">
        <template #title> Most frequent rooms </template>
        <template #content>
          <ul>
            <li>room 1</li>
            <li>room 1</li>
            <li>room 1</li>
            <li>room 1</li>
          </ul>
        </template>
      </CardOverlayImage>
      <div class="hidden md:block">
        <CardOverlayImage :background-url="'/src/assets/img/rooms.svg'">
          <template #title> Most frequent rooms </template>
          <template #content>
            <ul>
              <li>room 1</li>
              <li>room 1</li>
              <li>room 1</li>
              <li>room 1</li>
            </ul>
          </template>
        </CardOverlayImage>
      </div>
    </div>
    <BaseFooter class="mt-auto" />
  </main>
</template>
