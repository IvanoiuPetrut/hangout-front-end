import { backendInstanceForInteractor } from "@/services/backendClient";
import type { message } from "@/types/types";

async function getMessagesFromFriendRoom(friendId: string): Promise<Array<message>> {
  const response = await backendInstanceForInteractor.get(`/messages/friend/${friendId}`);
  return response.data;
}

export { getMessagesFromFriendRoom };
