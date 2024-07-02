import { backendInstanceForInteractor } from "@/services/backendClient";
import type { chatRoom, chatRoomDetails, chatRoomInvite } from "@/types/types";

async function getChatRoomDetails(roomId: string): Promise<chatRoomDetails> {
  const chatRoom = await backendInstanceForInteractor.get(`/chat-room/details/${roomId}`);
  return chatRoom.data;
}

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

async function getRoomsWhereUserIsNotMember(friendId: string): Promise<Array<chatRoom>> {
  const chatRooms = await backendInstanceForInteractor.get(
    `/chat-room/rooms-where-user-is-not-member/${friendId}`
  );
  return chatRooms.data;
}

async function sendInviteToChatRoom(roomId: string, friendId: string): Promise<any> {
  const body = {
    invitedUserId: friendId,
    chatRoomId: roomId
  };
  await backendInstanceForInteractor.post("/chat-room/send-invite", body);
}

async function getInvites(): Promise<Array<chatRoomInvite>> {
  const chatRooms = await backendInstanceForInteractor.get("/chat-room/invites");
  return chatRooms.data;
}

async function acceptInvite(inviteId: string): Promise<void> {
  await backendInstanceForInteractor.post(`/chat-room/accept-invite/${inviteId}`);
}

async function declineInvite(inviteId: string): Promise<void> {
  await backendInstanceForInteractor.post(`/chat-room/reject-invite/${inviteId}`);
}

async function kickUser(roomId: string, userId: string): Promise<void> {
  const body = {
    chatRoomId: roomId,
    userToKickId: userId
  };
  await backendInstanceForInteractor.post("/chat-room/kick-user", body);
}

async function editName(roomId: string, name: string): Promise<void> {
  const body = {
    chatRoomId: roomId,
    name: name
  };
  await backendInstanceForInteractor.post("/chat-room/edit-name", body);
}

async function editDescription(roomId: string, description: string): Promise<void> {
  const body = {
    chatRoomId: roomId,
    description: description
  };
  await backendInstanceForInteractor.post("/chat-room/edit-description", body);
}

export {
  getChatRoomDetails,
  createChatRoom,
  getJoinedChatRooms,
  getRoomsWhereUserIsNotMember,
  sendInviteToChatRoom,
  getInvites,
  acceptInvite,
  declineInvite,
  kickUser,
  editName,
  editDescription
};
