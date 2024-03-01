import { backendInstanceForInteractor } from "@/services/backendClient";
import type { FriendRequest } from "@/types/types.ts";

async function sendFriendRequest(userId: string): Promise<void> {
  const body = {
    receiverId: userId
  };
  await backendInstanceForInteractor.post("/friend/send-request", body);
}

async function getFriendRequests(): Promise<Array<FriendRequest>> {
  const friendRequests = await backendInstanceForInteractor.get("/friend/requests");
  return friendRequests.data;
}

export { sendFriendRequest, getFriendRequests };
