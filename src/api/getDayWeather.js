import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getDayWeather = async (locationRs, dateRs) => {
    // locationRs : 경도와 위도를 x, y 좌표로 변환, dateRs : 현재 시간을 api 에 사용되는 포멧으로 변환
    try {
      // 기상청 단기 예보(dDay 부터 dDay + 2(모레) 오전 / 오후 기온, 상태(강수, 적설, 구름) 예보) 데이터 수집
      const res = await axios.get(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&numOfRows=50&dataType=JSON&pageNo=1&base_date=${dateRs.date}&base_time=${dateRs.time}&nx=${locationRs.x}&ny=${locationRs.y}`
      );
 
     // 날씨 아이콘 가져오기
      
 
      return res;
    } catch (err) {
      console.error(err);
    }
};