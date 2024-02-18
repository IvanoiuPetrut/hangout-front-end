import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import FriendsView from "@/views/FriendsView.vue";
import UserSettingsView from "@/views/UserSettingsView.vue";
import JoinRoomViewVue from "@/views/JoinRoomView.vue";
import CreateRoomViewVue from "@/views/CreateRoomView.vue";

import { doesUserHaveAccessCookie } from "@/helpers/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView
    },
    {
      path: "/friends/:friendId?",
      name: "friends",
      component: FriendsView,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: "/user-settings",
      name: "user-settings",
      component: UserSettingsView,
      meta: { requiresAuth: true }
    },
    {
      path: "/join-room",
      name: "join-room",
      component: JoinRoomViewVue,
      meta: { requiresAuth: true }
    },
    {
      path: "/create-room",
      name: "create-room",
      component: CreateRoomViewVue,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isLoggedIn = doesUserHaveAccessCookie();
    console.log("isLoggedIn", isLoggedIn);
    if (!isLoggedIn) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
