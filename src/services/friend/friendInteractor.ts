import { backendInstanceForInteractor } from "@/services/backendClient";
import type { FriendRequest, Friend } from "@/types/types.ts";

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

async function getPendingFriendRequests(): Promise<Array<FriendRequest>> {
  const friendRequests = await backendInstanceForInteractor.get("/friend/requests/pending");
  return friendRequests.data;
}

async function acceptFriendRequest(senderId: string): Promise<void> {
  const body = {
    senderId: senderId
  };
  const acceptFriendRequest = await backendInstanceForInteractor.post(
    "/friend/requests/accept",
    body
  );
  return acceptFriendRequest.data;
}

async function declineFriendRequest(senderId: string): Promise<void> {
  const body = {
    senderId: senderId
  };
  const declineFriendRequest = await backendInstanceForInteractor.post(
    "/friend/requests/decline",
    body
  );
  return declineFriendRequest.data;
}

async function getFriends(): Promise<Array<Friend>> {
  const friends = await backendInstanceForInteractor.get("/friend");
  return friends.data;
}

export {
  sendFriendRequest,
  getFriendRequests,
  getPendingFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getFriends
};
