<script setup lang="ts">
import QuickActionMemberSettings from "@components/room/QuickActionMemberSettings.vue";
</script>

<template>
  <ul class="flex flex-col gap-4">
    <li class="flex gap-2 md:gap-12 items-center justify-between md:justify-normal">
      <div class="flex gap-2 items-center md:gap-4">
        <div class="mask mask-circle w-8 h-8 md:w-12 md:h-12">
          <img
            src="https://www.gravatar.com/avatar/3b3be63a4c2asdas01asdasda02?d=identicon"
            alt="Avatar Tailwind CSS Component"
          />
        </div>
        <p class="font-bold text-sm md:text-lg">User name</p>
      </div>
      <span class="badge badge-primary badge-sm">Owner</span>
      <QuickActionMemberSettings />
    </li>

    <li class="flex gap-2 md:gap-12 items-center justify-between md:justify-normal">
      <div class="flex gap-2 items-center md:gap-4">
        <div class="mask mask-circle w-8 h-8 md:w-12 md:h-12">
          <img
            src="https://www.gravatar.com/avatar/3b3be63a4c2asdas01asdasda02?d=identicon"
            alt="Avatar Tailwind CSS Component"
          />
        </div>
        <p class="font-bold text-sm md:text-lg">User name</p>
      </div>
      <span class="badge badge-neutral badge-sm">Member</span>
      <QuickActionMemberSettings />
    </li>

    <li class="flex gap-2 md:gap-12 items-center justify-between md:justify-normal">
      <div class="flex gap-2 items-center md:gap-4">
        <div class="mask mask-circle w-8 h-8 md:w-12 md:h-12">
          <img
            src="https://www.gravatar.com/avatar/3b3be63a4c2asdas01asdasda02?d=identicon"
            alt="Avatar Tailwind CSS Component"
          />
        </div>
        <p class="font-bold text-sm md:text-lg">User name</p>
      </div>
      <span class="badge badge-secondary badge-sm">Moderator</span>
      <QuickActionMemberSettings />
    </li>
    <!-- <li class="flex gap-2 items-center">
      <div class="flex gap-4 items-center">
        <div class="mask mask-circle w-12 h-12">
          <img
            src="https://www.gravatar.com/avatar/3b3be63a4c2asdas01asdasda02?d=identicon"
            alt="Avatar Tailwind CSS Component"
          />
        </div>
        <p class="font-bold">User name</p>
      </div>
      <span class="badge badge-primary badge-sm">Owner</span>
      <QuickActionMemberSettings />
    </li>
    <li class="flex gap-12 items-center">
      <div class="flex gap-4 items-center">
        <div class="mask mask-circle w-12 h-12">
          <img
            src="https://www.gravatar.com/avatar/3b3be63a4c2asdas01asdasda02?d=identicon"
            alt="Avatar Tailwind CSS Component"
          />
        </div>
        <p class="font-bold">User name</p>
      </div>
      <span class="badge badge-secondary badge-sm">Moderator</span>
      <QuickActionMemberSettings />
    </li> -->
  </ul>
</template>
