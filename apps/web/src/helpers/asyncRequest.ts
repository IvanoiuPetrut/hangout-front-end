import { ref } from "vue";

function useAsyncRequest<T>(request: () => Promise<T>) {
  const data = ref<T | null>();
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

export { useAsyncRequest };
