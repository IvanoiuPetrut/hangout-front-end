import type { UserDetails } from "@/types/types.ts";
import { ref } from "vue";

import { backendInstanceForInteractor } from "@/services/backendClient";

function useAsyncRequest<T>(request: () => Promise<T>) {
  const data = ref<any>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  const execute = async () => {
    loading.value = true;
    try {
      data.value = await request();
    } catch (e: any) {
      error.value = e.response.data.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    execute
  };
}

async function getUserDetails(): Promise<UserDetails> {
  const userDetails = await backendInstanceForInteractor.get("/user/details");
  return userDetails.data;
}

async function updateUserDetails(userName: string, password: string): Promise<UserDetails> {
  const body = {
    username: userName
  };
  const userDetails = await backendInstanceForInteractor.patch("/user/details", body);
  return userDetails.data;
}

export { getUserDetails, updateUserDetails, useAsyncRequest };
