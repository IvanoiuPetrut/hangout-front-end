import { randomUUID } from "crypto";

function generateFriendsChatRoomId(senderId: string, receiverId: string) {
  const userIds = [senderId, receiverId].sort();
  return userIds.join("-");
}

function generateChatRoomId() {
  return randomUUID();
}

export { generateFriendsChatRoomId, generateChatRoomId };
