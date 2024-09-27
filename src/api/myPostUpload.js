import axios from "axios";

export const myPostUpload = async (formData) => {
  try {
    const res = await axios.post("/post/write", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // 쿠키를 포함시키기 위해 필요
    });
    return res;
  } catch (e) {
    alert(e.response?.data?.message);
    console.log(e);
    return;
  }
};
