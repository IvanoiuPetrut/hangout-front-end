import {
  backendInstanceForInteractor,
  backendInstanceForInteractorWithImages
} from "@/services/backendClient";
import type { message, uploadFileReturn } from "@/types/types";

async function getMessagesFromFriendRoom(friendId: string): Promise<Array<message>> {
  const response = await backendInstanceForInteractor.get(`/messages/friend/${friendId}`);
  return response.data;
}

async function uploadFile(file: File): Promise<uploadFileReturn> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await backendInstanceForInteractorWithImages.post(
    "/messages/upload-file",
    formData
  );
  return response.data;
}

export { getMessagesFromFriendRoom, uploadFile };
