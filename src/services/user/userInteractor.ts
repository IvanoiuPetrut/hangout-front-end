import type { User } from "@/types/types";
import { backendInstanceForInteractor } from "@/services/backendClient";

async function getUserDetails(): Promise<User> {
  const userDetails = await backendInstanceForInteractor.get("/user/details");
  return userDetails.data;
}

async function updateUserDetails(userName: string, password: string): Promise<User> {
  const body = {
    username: userName
  };
  const userDetails = await backendInstanceForInteractor.patch("/user/details", body);
  return userDetails.data;
}

async function getUsers(userName: string): Promise<Array<User>> {
  const userDetails = await backendInstanceForInteractor.get(`/user/users?name=${userName}`);
  return userDetails.data;
}

export { getUserDetails, updateUserDetails, getUsers };
