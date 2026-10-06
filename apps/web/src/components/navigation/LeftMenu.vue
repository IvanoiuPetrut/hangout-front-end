<script setup lang="ts">
import BaseAvatar from "@components/navigation/data_display/BaseAvatar.vue";
import JoinedRooms from "@components/navigation/data_display/JoinedRooms.vue";
import { logout } from "@/helpers/auth";
import { useUserStore } from "@/stores/user";

const emit = defineEmits<{
  (e: "toggleMenuVisibility"): void;
}>();

function handleToggleMenuVisibility(): void {
  const smallScreenWidth = 640;
  const smallScreen = window.innerWidth < smallScreenWidth;
  if (smallScreen) {
    emit("toggleMenuVisibility");
  }
}

function handleLogout(): void {
  useUserStore().logout();
  logout();
}
</script>

<template>
  <aside
    class="flex w-64 flex-col gap-6 border-r border-base-content/[0.06] bg-base-200/90 p-3 backdrop-blur-xl"
  >
    <div class="flex flex-col gap-1">
      <p class="section-title px-3 pb-1 pt-2">Menu</p>
      <RouterLink :to="{ name: 'home' }" class="nav-link" @click="handleToggleMenuVisibility">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.75"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        Home
      </RouterLink>
      <RouterLink :to="{ name: 'friends' }" class="nav-link" @click="handleToggleMenuVisibility">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.75"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
        Friends
      </RouterLink>
      <RouterLink
        :to="{ name: 'notifications' }"
        class="nav-link"
        @click="handleToggleMenuVisibility"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.75"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
          />
        </svg>
        Inbox
      </RouterLink>
      <RouterLink :to="{ name: 'join-room' }" class="nav-link" @click="handleToggleMenuVisibility">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.75"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        New room
      </RouterLink>
    </div>

    <div class="min-h-0 flex-1 overflow-y-auto">
      <JoinedRooms @navigate="handleToggleMenuVisibility" />
    </div>

    <div class="flex flex-col gap-2 border-t border-base-content/[0.06] pt-3">
      <BaseAvatar />
      <button
        @click="handleLogout"
        class="nav-link w-full text-error/80 hover:bg-error/10 hover:text-error"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.75"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H21"
          />
        </svg>
        Logout
      </button>
    </div>
  </aside>
</template>
