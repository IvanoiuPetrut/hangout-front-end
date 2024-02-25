<script setup lang="ts">
import { useUserStore } from "@/stores/user";
</script>

<template>
  <div class="flex flex-col gap-8 items-center mt-8 px-4 sm:mt-32">
    <div
      class="flex flex-col sm:flex-row gap-8 sm:gap-24 w-fit p-4 border-2 border-neutral rounded-lg mx-auto"
    >
      <div class="flex flex-col gap-4">
        <div>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-bold uppercase">Dispaly name</span>
            </div>
            <input
              type="text"
              :placeholder="useUserStore().userName || 'Enter your name'"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </label>
        </div>
        <div>
          <label class="form-control w-full max-w-xs">
            <div class="label font-bold uppercase">
              <span class="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="••••••••••••"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </label>
        </div>
      </div>
      <div class="flex flex-col items-center gap-6 order-first sm:order-last">
        <h3 class="text-md font-bold uppercase">Profile Photo</h3>
        <img class="mask mask-squircle w-32" :src="useUserStore().photo || ''" />
        <input type="file" class="file-input file-input-bordered file-input-xs w-full max-w-xs" />
      </div>
    </div>
    <button class="btn btn-primary btn-wide">Save settings</button>
  </div>
</template>
