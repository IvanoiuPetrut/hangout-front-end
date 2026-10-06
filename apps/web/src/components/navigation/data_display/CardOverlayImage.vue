<script setup lang="ts">
const props = defineProps<{
  backgroundUrl: string;
}>();
</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl image-full">
    <figure>
      <img :src="props.backgroundUrl" alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-primary">
        <slot name="title">Card title</slot>
      </h2>
      <slot name="content">Card content</slot>
    </div>
  </div>
</template>
