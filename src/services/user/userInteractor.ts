import type { UserDetails } from "@/types/types.ts";

import { backendInstanceForInteractor } from "@/services/backendClient";

async function getUserDetails(): Promise<UserDetails> {
  const userDetails = await backendInstanceForInteractor.get("/user/details");
  return userDetails.data;
}

export { getUserDetails };
