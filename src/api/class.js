import axios from "axios";

/* 찜한 클래스 가져오기 */
export const getWishClass = async () => {
  try {
    const res = await axios.get("/wish");
    return res;
  } catch (e) {
    alert(e.response?.data?.message);
    console.log(e);
    return;
  }
};

/* 클래스 찜하기 */
export const addWishList = async () => {
  try {
    const res = await axios.get("/wish");
    return res;
  } catch (e) {
    alert(e.response?.data?.message);
    console.log(e);
    return;
  }
};
