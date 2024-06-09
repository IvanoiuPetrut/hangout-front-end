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

export type ConnectedUser = {
  id: string;
  name: string;
  photo: string;
  mediaStream: MediaStream | null;
  peerConnection: RTCPeerConnection | null;
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

export type message = {
  id: string;
  chatRoomId: string;
  senderName: string;
  senderId: string;
  receiverId: string;
  senderPhoto: string;
  content: string;
  createdAt: string;
};

export type uploadFileReturn = {
  fileUrl: string;
};

export type chatRoomDetails = {
  id: string;
  name: string;
  owner: User;
  members: Array<User>;
  messages: Array<message>;
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
