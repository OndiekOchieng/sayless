import { defineStore } from "pinia";

export interface TemplateFields {
  imgSrc?: string;
  username?: string;
  handle?: string;
  message: string;
}

export const useTemplateStore = defineStore("templateStore", {
  state: () => ({
    profileImage: "/images/logo.png",
    posterImage: "/images/logo.png",
    userName: "",
    handle: "",
    message: "",
    maxLength: 300,
  }),
  persist: true,
});
