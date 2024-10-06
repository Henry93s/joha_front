import axios from "axios";

export const getOneClass = async (nanoid) => {
  try {
    const res = await axios.get(`/class/${nanoid}`);
    const data = res.data.data;
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};

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

/* 검색한 클래스 리스트 가져오기 */
export const fetchClass = async () => {
  try {
    const res = await axios("/class/search"); // 백엔드의 가게 정보 요청 API
    return res;
  } catch (error) {
    console.error("Failed to fetch places:", error);
    return;
  }
};
