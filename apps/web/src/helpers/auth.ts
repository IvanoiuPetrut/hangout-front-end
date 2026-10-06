import { setCookie, deleteCookie } from "@/helpers/cookie";

const ACCESS_TOKEN_HOURS = 7 * 24;

function getErrorMessage(error: any, fallback: string): string {
  return error?.response?.data?.message || error?.response?.data?.error || fallback;
}

// Full page loads so the API clients and the socket pick up the new token
function completeLogin(accessToken: string, redirect?: string): void {
  setCookie("access_token", accessToken, ACCESS_TOKEN_HOURS);
  window.location.href = redirect && redirect.startsWith("/") ? redirect : "/";
}

function logout(): void {
  deleteCookie("access_token");
  window.location.href = "/login";
}

export { getErrorMessage, completeLogin, logout };
