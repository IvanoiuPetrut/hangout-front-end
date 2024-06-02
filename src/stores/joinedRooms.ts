import { ref } from "vue";
import { defineStore } from "pinia";
import type { chatRoom } from "@/types/types";
import { useUserStore } from "./user";

export const useJoinedRoomsStore = defineStore("joinedRooms", () => {
  const joinedRooms = ref<Array<chatRoom>>([]);

  function setJoinedRooms(rooms: Array<chatRoom>) {
    joinedRooms.value = rooms;
  }

  function managingRoomsCount() {
    let joinedRoomsCount = 0;
    for (const room of joinedRooms.value) {
      if (room.ownerId === useUserStore().userId) {
        console.log("room.ownerId", room.ownerId);
        console.log("useUserStore().userId", useUserStore().userId);
        joinedRoomsCount++;
      }
    }
    return joinedRoomsCount;
  }

  return { joinedRooms, setJoinedRooms, managingRoomsCount };
});
