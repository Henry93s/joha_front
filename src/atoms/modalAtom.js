import { atom } from "recoil";

export const SlideModal = atom({
  key: "slideModal",
  default: {
    isOpen: false,
    title: '',
    text: ''
  },
});
