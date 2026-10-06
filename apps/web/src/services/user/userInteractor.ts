import type { User } from "@/types/types";
import { getCookie } from "@/helpers/cookie";
import {
  backendInstanceForInteractor,
  backendInstanceForInteractorWithImages
} from "@/services/backendClient";

async function getUserDetails(): Promise<User> {
  const userDetails = await backendInstanceForInteractor.get("/user/details");
  console.log(getCookie("access_token"));
  return userDetails.data;
}

async function updateUserDetails(userName: string, password: string): Promise<User> {
  const body = {
    username: userName
  };
  const userDetails = await backendInstanceForInteractor.patch("/user/details", body);
  return userDetails.data;
}

async function updateUserPicture(file: File): Promise<User> {
  const formData = new FormData();
  formData.append("file", file);

  const userDetails = await backendInstanceForInteractorWithImages.post(
    "/user/profile-picture",
    formData
  );
  return userDetails.data;
}

async function getUsers(userName: string): Promise<Array<User>> {
  const userDetails = await backendInstanceForInteractor.get(`/user/users?name=${userName}`);
  return userDetails.data;
}

async function getMultipleUsersDetails(userIds: Array<string>): Promise<Array<User>> {
  const userDetailPromises = userIds.map((userId) =>
    backendInstanceForInteractor.get(`/user/details/${userId}`)
  );
  const userDetails = await Promise.all(userDetailPromises);
  return userDetails.map((userDetail) => userDetail.data);
}

export { getUserDetails, updateUserDetails, getUsers, getMultipleUsersDetails, updateUserPicture };
