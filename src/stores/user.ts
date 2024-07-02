import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userName = ref<undefined | string>(undefined);
  const userId = ref<undefined | string>(undefined);
  const photo = ref<undefined | string>(undefined);

  function setUserDetails(name: string, id: string, photoUrl: string) {
    userName.value = name;
    userId.value = id;
    photo.value = photoUrl;
  }

  function setUserName(name: string) {
    userName.value = name;
  }

  function setPhoto(photoUrl: string) {
    photo.value = photoUrl;
  }

  function logout() {
    userName.value = undefined;
    userId.value = undefined;
    photo.value = undefined;
  }

  return { userName, photo, setUserDetails, setUserName, userId, setPhoto, logout };
});
