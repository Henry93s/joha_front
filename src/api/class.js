import axios from "axios";

// 클래스 전체 가져오기
export const fetchClass = async () => {
  try {
    const res = await axios.get(`http://localhost:3002/class/read/all`);
    if(res.data.code === 200){
      return res.data;
    } else {
      // res.code가 200이 아닐 때
      const error = new Error(`custom error code: ${res.data.code}`);
      console.log(error);
      return;  // undefined
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

// 클래스 상세정보 가져오기
export const getOneClass = async (nanoid) => {
  try {
    const res = await axios.get(`http://localhost:3002/class/read/${nanoid}`);
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
    const res = await axios.get("http://localhost:3002/wish");
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
    const res = await axios.get("http://localhost:3002/wish");
    return res;
  } catch (e) {
    alert(e.response?.data?.message);
    console.log(e);
    return;
  }
};

/* 검색한 클래스 리스트 가져오기 */
export const getSearchClass = async (title) => {
  try {
    const res = await axios.get("http://localhost:3002/class/search", {
      params: {
        title: title,
      },
    }); // 백엔드의 가게 정보 요청 API
    return res;
  } catch (error) {
    console.error("Failed to fetch places:", error);
    return;
  }
};
