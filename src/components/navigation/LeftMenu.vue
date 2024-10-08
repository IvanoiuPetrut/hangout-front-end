<script setup lang="ts">
import BaseAvatar from "@components/navigation/data_display/BaseAvatar.vue";
import JoinedRooms from "@components/navigation/data_display/JoinedRooms.vue";
import { deleteCookie } from "@/helpers/cookie";
import { useUserStore } from "@/stores/user";

const emit = defineEmits<{
  (e: "toggleMenuVisibility"): void;
}>();

const logoutUrl = import.meta.env.VITE_COGNITO_LOGOUT_URL as string;

function handleToggleMenuVisibility(): void {
  const smallScreenWidth = 640;
  const smallScreen = window.innerWidth < smallScreenWidth;
  if (smallScreen) {
    emit("toggleMenuVisibility");
  }
}

function handleLogout(): void {
  useUserStore().logout();
  deleteCookie("access_token");
  deleteCookie("expires_in");
  deleteCookie("refresh_token");
  setTimeout(() => {
    window.location.href = logoutUrl;
  }, 200);
}
</script>

<template>
  <ul class="menu bg-base-200 w-56 gap-4">
    <li>
      <RouterLink :to="{ name: 'home' }" @click="handleToggleMenuVisibility">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
            clip-rule="evenodd"
          />
        </svg>
        Home
      </RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'friends' }" @click="handleToggleMenuVisibility">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z"
          />
        </svg>
        Friends
      </RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'join-room' }" @click="handleToggleMenuVisibility">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
            clip-rule="evenodd"
          />
        </svg>
        Join a room
      </RouterLink>
    </li>
    <li><JoinedRooms /></li>
    <li class="mt-auto">
      <button @click="handleLogout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>

        Logout
      </button>
    </li>
    <BaseAvatar />
  </ul>
</template>
