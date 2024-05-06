import { ref } from "vue";
import { defineStore } from "pinia";
import type { chatRoom } from "@/types/types";

export const useJoinedRoomsStore = defineStore("joinedRooms", () => {
  const joinedRooms = ref<Array<chatRoom>>([]);

  function setJoinedRooms(rooms: Array<chatRoom>) {
    joinedRooms.value = rooms;
  }

  return { joinedRooms, setJoinedRooms };
});
