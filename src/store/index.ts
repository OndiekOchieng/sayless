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
    minimalMessage: "",
    twitterMessage: "",
    paperMessage: "",
    posterMessage: "",
    maxLength: 700,
  }),
  persist: true,
});
