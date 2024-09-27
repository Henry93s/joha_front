import { atom } from "recoil";

const loginState = atom({
  key: "user",
  default: {
    name: "",
    nickname: "",
    email: "",
    phone: "",
    is_admin: false,
    is_logined: false,
    photo: "",
  },
});

export default loginState;
