import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userName = ref<undefined | string>(undefined);
  const photo = ref<undefined | string>(undefined);

  function setUserDetails(name: string, photoUrl: string) {
    userName.value = name;
    photo.value = photoUrl;
  }

  function setUserName(name: string) {
    userName.value = name;
  }

  return { userName, photo, setUserDetails, setUserName };
});
