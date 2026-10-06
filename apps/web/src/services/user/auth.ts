import axios from "axios";

import type { AccessTokens } from "@/types/types.ts";

async function getUserTokens(code: string): Promise<AccessTokens> {
  const response = await axios.post(
    `${import.meta.env.VITE_COGNITO_URL}/oauth2/token`,
    `grant_type=authorization_code&client_id=${
      import.meta.env.VITE_COGNITO_CLIENT_ID
    }&code=${code}&redirect_uri=${import.meta.env.VITE_COGNITO_REDIRECT_URI}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );

  const {
    access_token: accessToken,
    id_token: idToken,
    refresh_token: refreshToken,
    expires_in: expiresIn
  } = response.data;

  return { accessToken, idToken, refreshToken, expiresIn };
}

export { getUserTokens };
