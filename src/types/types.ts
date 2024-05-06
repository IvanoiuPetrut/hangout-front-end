export type Friend = {
  id: string;
  username: string;
  photo: string;
};

export type User = {
  id: string;
  username: string;
  photo: string;
};

export type FriendRequest = {
  from: string;
  to: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

export type AccessTokens = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type UserDetails = {
  username: string;
  photo: string;
};

export type chatRoom = {
  id: string;
  name: string;
  ownerId: string;
};

export type chatRoomInvite = {
  id: string;
  roomName: string;
  chatRoomId: string;
  toUserId: string;
  status: string;
  createdAt: string;
};

export enum RoomContent {
  Chat = "chat",
  Members = "members",
  Settings = "settings",
  Voice = "voice"
}
