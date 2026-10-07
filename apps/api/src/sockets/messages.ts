import { generateFriendsChatRoomId } from "../helpers/helpers.js";
import {
  createMessage,
  createChatRoomFriends,
} from "../controllers/messagesController.js";
import { getChatRoomMemberPersistence } from "../persistance/chatRoomPersistence.js";
import { areFriendsPersistence } from "../persistance/friendPersistence.js";
import { validateMessage } from "../validation/messages.js";
import { Socket, Server } from "socket.io";

// The sender is always the user authenticated in the socket handshake
// (socket.data.userId); ids and tokens sent in event payloads are not trusted.

type createFriendChatPayload = {
  friendId: string;
};

type friendChatMessagePayload = {
  friendId: string;
  message: string;
};

async function isFriend(userId: string, friendId: unknown): Promise<boolean> {
  if (typeof friendId !== "string") {
    return false;
  }
  return areFriendsPersistence({ userId, friendId });
}

async function isChatRoomMember(
  userId: string,
  chatRoomId: unknown
): Promise<boolean> {
  if (typeof chatRoomId !== "string") {
    return false;
  }
  return (await getChatRoomMemberPersistence({ chatRoomId, userId })) !== null;
}

async function handleCreateFriendChat(
  socket: Socket,
  payload: createFriendChatPayload
) {
  const senderId: string = socket.data.userId;
  const friendId = payload?.friendId;
  if (!(await isFriend(senderId, friendId))) {
    return;
  }
  const chatRoomId = generateFriendsChatRoomId(senderId, friendId);
  await createChatRoomFriends(chatRoomId, [senderId, friendId]);
  socket.join(chatRoomId);
}

async function leaveFriendChat(socket: Socket, payload: any) {
  const senderId: string = socket.data.userId;
  if (typeof payload?.friendId !== "string") {
    return;
  }
  const chatRoomId = generateFriendsChatRoomId(senderId, payload.friendId);
  socket.leave(chatRoomId);
}

async function handleFriendChatMessage(
  io: Server,
  socket: Socket,
  payload: friendChatMessagePayload
) {
  const senderId: string = socket.data.userId;
  const friendId = payload?.friendId;
  const content = payload?.message;
  if (!validateMessage(content) || !(await isFriend(senderId, friendId))) {
    return;
  }
  const chatRoomId = generateFriendsChatRoomId(senderId, friendId);

  const messagePersistance = await createMessage(
    senderId,
    friendId,
    chatRoomId,
    content
  );
  if (messagePersistance) {
    io.in(chatRoomId).emit("friendChatMessage", messagePersistance);
  }
}

async function joinChatRoomSocket(socket: Socket, payload: any) {
  const chatRoomId = payload?.chatRoomId;
  if (!(await isChatRoomMember(socket.data.userId, chatRoomId))) {
    return;
  }
  console.log("joinChatRoomSocket:", socket.id, chatRoomId);
  socket.join(chatRoomId);
}

async function leaveChatRoomSocket(socket: Socket, payload: any) {
  if (typeof payload?.chatRoomId !== "string") {
    return;
  }
  console.log("leaveChatRoomSocket:", socket.id, payload.chatRoomId);
  socket.leave(payload.chatRoomId);
}

async function handleChatRoomChatMessage(
  io: Server,
  socket: Socket,
  payload: any
) {
  const senderId: string = socket.data.userId;
  const chatRoomId = payload?.chatRoomId;
  const content = payload?.message;
  if (
    !validateMessage(content) ||
    !(await isChatRoomMember(senderId, chatRoomId))
  ) {
    return;
  }

  const messagePersistance = await createMessage(
    senderId,
    "none",
    chatRoomId,
    content
  );
  if (messagePersistance) {
    io.in(chatRoomId).emit("chatRoomChatMessage", messagePersistance);
  }
}

export {
  handleCreateFriendChat,
  leaveFriendChat,
  handleFriendChatMessage,
  createFriendChatPayload,
  friendChatMessagePayload,
  handleChatRoomChatMessage,
  joinChatRoomSocket,
  leaveChatRoomSocket,
};
