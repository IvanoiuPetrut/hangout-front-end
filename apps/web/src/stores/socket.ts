import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { getCookie } from "@helpers/cookie";

export const useSocketStore = defineStore("socket", () => {
  const socket = io(import.meta.env.VITE_BACKEND_URL, {
    auth: {
      token: getCookie("access_token")
    }
  });

  return { socket };
});
