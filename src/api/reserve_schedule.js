import axios from "axios";

// 스케쥴 데이터 전체 가져오기
export const fetchSchedule = async () => {
  try {
    const res = await axios.get(`http://localhost:3002/schedule/read`);
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