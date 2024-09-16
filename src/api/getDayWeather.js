import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getDayWeather = async (lat, lon) => {
    // lat : 경도, lon : 위도
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
 
      // 날씨 아이콘 가져오기
      const weatherRes = res.data;
      const weatherIcon = res.data.weather[0].icon;
      const weatherIconImg = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      const returnWeatherData = {
        res: weatherRes,
        icon: weatherIconImg
      };
 
      return returnWeatherData;
    } catch (err) {
      console.error(err);
    }
};