export type Friend = {
  id: string;
  name: string;
  photo: string;
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
