import { backendInstanceForInteractor } from "@/services/backendClient";
import type { chatRoom } from "@/types/types";

async function createChatRoom(roomName: string): Promise<chatRoom> {
  const body = {
    roomName: roomName
  };
  const chatRoom = await backendInstanceForInteractor.post("/chat-room/create", body);
  return chatRoom.data;
}

async function getJoinedChatRooms(): Promise<Array<chatRoom>> {
  const chatRooms = await backendInstanceForInteractor.get("/chat-room/joined");
  return chatRooms.data;
}

export { createChatRoom, getJoinedChatRooms };
