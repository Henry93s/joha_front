import axios from "axios";

export const loginUserCheck = async () => {
  try {
    const res = await axios.get("http://localhost:3002/users/getuser", {
      withCredentials: true, // 쿠키 자동 포함
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};
