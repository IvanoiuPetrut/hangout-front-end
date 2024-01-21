<script setup lang="ts">
import type { AccessTokens } from "@/types/types.ts";

import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";

import BaseNavigation from "@components/navigation/BaseNavigation.vue";

import { getUserTokens } from "@services/user/auth";
import { setCookie, getCookie } from "@helpers/cookie";

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
      setCookie("access_token", tokens.accessToken, 1 / 24);
      setCookie("expires_in", tokens.idToken, 1 / 24);
      setCookie("refresh_token", tokens.refreshToken, 1);

      router.push({ path: router.currentRoute.value.path });
    } catch (error) {
      console.log(error);
    }
  } else {
    const accesCookie = getCookie("access_token");

    if (!accesCookie) {
      window.location.href = import.meta.env.VITE_COGNITO_LOGIN_URL as string;
    } else {
      const expiresCookie = getCookie("expires_in");
      const refreshTokenCookie = getCookie("refresh_token");
      //check if token is still valid -> yes -> continue to app

      //check if token is still valid -> no -> push him to login page
    }
  }
});
</script>

<template>
  <header>
    <BaseNavigation @toggle-menu-visibility="handleToggleMenuVisibility" />
  </header>
  <div :class="[shouldContentHavePadding ? 'pl-56' : 'pl-0']">
    <RouterView />
  </div>
</template>
