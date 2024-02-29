import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userName = ref<null | string>(null);
  const photo = ref<null | string>(null);

  function setUserDetails(name: string, photoUrl: string) {
    userName.value = name;
    photo.value = photoUrl;
  }

  function setUserName(name: string) {
    userName.value = name;
  }

  return { userName, photo, setUserDetails, setUserName };
});
