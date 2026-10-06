<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";

import BaseNavigation from "@components/navigation/BaseNavigation.vue";
import { getCookie } from "@helpers/cookie";

import { getUserDetails } from "@services/user/userInteractor";

import { useUserStore } from "@stores/user";
import { logout } from "@helpers/auth";

const shouldContentHavePadding = ref(false);

function handleToggleMenuVisibility(isMenuVisible: boolean): void {
  shouldContentHavePadding.value = isMenuVisible;
}

onMounted(async () => {
  console.log("App mounted");
  const router = useRouter();
  await router.isReady();

  const publicRoutes = ["login", "register"];
  const isPublicRoute = publicRoutes.includes(router.currentRoute.value.name as string);

  if (!getCookie("access_token")) {
    if (!isPublicRoute) {
      router.replace({ name: "login" });
    }
    return;
  }

  try {
    const userDetails = await getUserDetails();
    useUserStore().setUserDetails(userDetails.username, userDetails.id, userDetails.photo);
  } catch (error: any) {
    // Expired or invalid token
    if (error?.response?.status === 401) {
      logout();
    }
  }
});
</script>

<template>
  <header>
    <BaseNavigation @toggle-menu-visibility="handleToggleMenuVisibility" />
  </header>
  <div :class="[shouldContentHavePadding ? 'sm:pl-56' : 'pl-0']">
    <RouterView />
  </div>
</template>
