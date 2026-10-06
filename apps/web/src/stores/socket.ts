import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { getCookie } from "@helpers/cookie";

export const useSocketStore = defineStore("socket", () => {
  // Same origin; /socket.io is proxied to the API by Vite in dev and nginx in production
  const socket = io({
    auth: {
      token: getCookie("access_token")
    }
  });

  return { socket };
});
