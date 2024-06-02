<script setup lang="ts">
import type { AccessTokens } from "@/types/types.ts";

import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";

import BaseNavigation from "@components/navigation/BaseNavigation.vue";
import { getUserTokens } from "@services/user/auth";
import { setCookie, getCookie } from "@helpers/cookie";

import { getUserDetails } from "@services/user/userInteractor";

import { useUserStore } from "@stores/user";

const shouldContentHavePadding = ref(false);

function handleToggleMenuVisibility(isMenuVisible: boolean): void {
  shouldContentHavePadding.value = isMenuVisible;
}

onMounted(async () => {
  const router = useRouter();
  await router.isReady();

  const code = router.currentRoute.value.query.code as string;

  if (code) {
    try {
      const tokens: AccessTokens = await getUserTokens(code);
      setCookie("access_token", tokens.accessToken, 1);
      setCookie("expires_in", tokens.idToken, 1);
      setCookie("refresh_token", tokens.refreshToken, 1);

      router.push({ path: router.currentRoute.value.path });
    } catch (error) {
      console.log(error);
    }
  } else {
    const accesCookie = getCookie("access_token");

    if (!accesCookie) {
      window.location.href = import.meta.env.VITE_COGNITO_LOGIN_URL as string;
    }
  }

  const userDetails = await getUserDetails();
  useUserStore().setUserDetails(userDetails.username, userDetails.id, userDetails.photo);
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
