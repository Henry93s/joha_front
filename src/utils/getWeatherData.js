import { getLocationXYData } from "./getLocationXYData";
import { getDateFormat } from "./getDateFormat";
import { getDayWeather } from "../api/getDayWeather";

export const getWeatherData = async (setWeather, setWeatherIcon) => {
    let lat = 0;
    let lon = 0;
    // 위치 정보를 한 번만 가져옴
    navigator.geolocation.getCurrentPosition(async (position) => {
        // 현재 위도와 경도를 가져옴
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        // 현재 위도와 경도를 기상청 예보 api 에 반영하기 위한 x,y 좌표를 구함
        // object rs {x : , y : } return 확인 완료
        const locationRs = getLocationXYData(lat, lon);

        // 현재 시간을 바탕으로 기상청 예보 api에 반영하기 위한 포멧팅된 시간을 구함
        const dates = new Date();
        const dateRs = getDateFormat(dates);

        // x, y 좌표 및 포멧팅된 시간 데이터를 바탕으로 기상청 단기 예보 데이터를 수집함
        const rsdata = await getDayWeather(locationRs, dateRs);

        if(rsdata.data && rsdata.data.response){
            // rsdata object 배열에서 마지막(가장 최신) object 중 category === TMP(온도) 만 추출
            const lastTMPObject = rsdata.data.response.body.items.item.filter(item => item.category === "TMP").slice(-1)[0];
            // rsdata object 배열에서 마지막(가장 최신) object 중 category === SKY(하늘 상태) 만 추출
            const lastSKYObject = rsdata.data.response.body.items.item.filter(item => item.category === "SKY").slice(-1)[0];
            // rsdata object 배열에서 마지막(가장 최신) object 중 category === PTY(강수 형태) 만 추출
            const lastPTYObject = rsdata.data.response.body.items.item.filter(item => item.category === "PTY").slice(-1)[0];

            // 날씨 데이터를 가져와 상태로 저장
            setWeather([lastTMPObject, lastSKYObject])

            // 날씨 상태에 따른 icon 부여
            // 맑음
            if(lastSKYObject.fcstValue === "1" || lastSKYObject.fcstValue === "2"){
                setWeather(["맑음", lastTMPObject.fcstValue]);
                setWeatherIcon("sun");
            }
            // 구름 많음 또는 흐림
            else if(lastSKYObject.fcstValue === "3" || lastSKYObject.fcstValue === "4"){
                // 강수 없음
                if(lastPTYObject.fcstValue === "0"){
                    if(lastSKYObject.fcstValue === "3"){
                        // clouds
                        setWeather(["구름 많음", lastTMPObject.fcstValue]);
                        setWeatherIcon("clouds");
                    } else {
                        // lowclouds
                        setWeather(["흐림", lastTMPObject.fcstValue]);
                        setWeatherIcon("lowcloud");
                    }
                }
                // 비 또는 소나기
                else if(lastPTYObject.fcstValue === "1" || lastPTYObject.fcstValue === "4"){
                    setWeather(["비", lastTMPObject.fcstValue]);
                    setWeatherIcon("rain");
                }
                // 비/눈
                else if(lastPTYObject.fcstValue === "2"){
                    setWeather(["비/눈", lastTMPObject.fcstValue]);
                    setWeatherIcon("rainandsnow");
                }
                // 눈
                else if(lastPTYObject.fcstValue === "3"){
                    setWeather(["눈", lastTMPObject.fcstValue]);
                    setWeatherIcon("snow");
                }
            }
        }
    });
}