import { backendInstanceForInteractor } from "@/services/backendClient";

async function getMessagesFromFriendRoom(friendId: string): Promise<any> {
  const response = await backendInstanceForInteractor.get(`/messages/friend/${friendId}`);
  return response.data;
}

export { getMessagesFromFriendRoom };
