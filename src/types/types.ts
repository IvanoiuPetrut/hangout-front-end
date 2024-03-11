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
