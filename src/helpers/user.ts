import { getCookie } from "@/helpers/cookie";

function doesUserHaveAccessCookie(): boolean {
  const accessToken = getCookie("access_token");
  return accessToken !== null;
}

export { doesUserHaveAccessCookie };
