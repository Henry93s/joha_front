import styled, { keyframes, css } from "styled-components";
import { useEffect, useState } from "react";
import { getLocationXYData } from "../../utils/getLocationXYData";
import { getDateFormat } from "../../utils/getDateFormat";
import { getDayWeather } from "../../api/getDayWeather";
// 이미지를 import 로 불러와서 상대 경로로 참조
import sun from "../../assets/icons/weather/sun.png";
import clouds from "../../assets/icons/weather/clouds.png";
import lowcloud from "../../assets/icons/weather/lowcloud.png";
import rain from "../../assets/icons/weather/rain.png";
import rainandsnow from "../../assets/icons/weather/rainandsnow.png";
import snow from "../../assets/icons/weather/snow.png";

// 리스트 항목 클릭 시 발생하는 슬라이더 항목 디테일 모달 컨테이너
const DetailSlideContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-top: 3px solid #F0F0F2;
    background-color: white;
    // listSlideContainer 보다 z-index 를 높여서 위로 보이도록 함
    z-index: 4;
    // closeDiv(fixed) height 만큼 padding 부여
    padding-top: 50px;

    /* 모달 내부에서만 스크롤 발생 */
    overflow-y: auto;
    // 스크롤은 동작 하나 스크롤바는 출력 하지 않도록 함
    // firefox
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera용 추가 */
    }

    // Tip: style 속성에 설정한 CSS(attrs) 는 인라인 스타일로 적용되며, 인라인 스타일에서는 CSS 트랜지션이 제대로 동작하지 않을 수 있음
    // => transform 를 스타일 템플릿 리터럴 내에서 동적으로 설정
    transform: ${({$isDetail}) => ($isDetail ? 'translateY(30%)' : 'translateY(100%)')};
    transition: all 0.4s ease-in-out;
`

const ModalCloseDiv = styled.div`
    // modal 상단 div 고정
    position: fixed;
    top: 0;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: start;
    height: 50px;
`
const CloseButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 30px;
    cursor: pointer;
    background-color: white;
    color: #BBBBBB;

    @media (max-width: 1000px) {
        font-size: 27px;
    }
`
// 특정 날짜의 특정 스케줄 detailContainer
const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 95%;
    height: 100%;
    margin: 0 auto;
`
const DetailTitleDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    font-size: 25px;
    font-weight: 600;

    @media (max-width: 1000px) {
        font-size: 22px;
    }
`
const DetailIconDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 15%;
    height: 100%;
`
const DetailIcon = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${({$type}) => ($type === "error" ? '#FE5054' : '#ADB4E0')};
    border-radius: 20px;
`
const DetailTimeDiv = styled.div`
    display: flex;
    width: 95%;
    height: 100px;
    font-size: 28px;
    font-weight: bold;
    justify-content: center;
    align-items: center;

    @media (max-width: 1000px) {
        font-size: 25px;
    }
`
const DetailDivLine = styled.div`
    width: 100%;
    height: 2px;
    border-top: 2.5px solid #F0F0F2;
`
// 이미지 매핑 객체 생성
// 문자열 키에 대한 타입 유효성 검사 생략 (as const - as keyof typeof imageMap~)
const imageMap = {
    "sun": sun,
    "clouds": clouds,
    "lowcloud": lowcloud,
    "rain": rain,
    "rainandsnow": rainandsnow,
    "snow": snow
  }
const IconImgDiv = styled.div`
  width: 96px;
  height: 96px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: ${({ $icon }) =>
    `url(${ imageMap[$icon] })`};
`;
const WeatherTextDiv = styled.div`
    width: 96px;
    height: 100px;
    font-size: 28px;
    font-weight: bold;
    text-align: center;

    @media (max-width: 1000px) {
        font-size: 25px;
    }
`
const DetailWeatherDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 200px;
    justify-content: center;
    align-items: center;
`


const ScheduleDetailModal = ({detailData, isDetail, setIsDetail}) => {
    // 날씨 데이터를 저장할 상태
    const [weather, setWeather] = useState(["", ""]);
    const [weatherIcon, setWeatherIcon] = useState(null);

    // 컴포넌트가 마운트될 때 한 번만 실행하도록 하기 위한 useEffect 사용
    useEffect(() => {
        if(isDetail){
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
    }, [isDetail]); 

    console.log(weather)

    // 일정 Detail 컨텐츠 렌더링
    const DetailRender = () => {
        const item = detailData;

        return (
        <>
            <DetailContainer>
                <DetailTitleDiv>
                    {item.content}
                    <DetailIconDiv>
                        <DetailIcon $type={item.type} />
                    </DetailIconDiv>
                </DetailTitleDiv>
                <DetailDivLine />
                <DetailTimeDiv>
                    {item.type === "error" &&
                        "지정 공휴일"
                    ||
                        item.time}
                </DetailTimeDiv>
                <DetailDivLine />
                {weatherIcon !== null &&
                    <>
                        <DetailWeatherDiv>
                            <WeatherTextDiv>
                                {weather[0] }
                                <br/>
                                {weather[1] + "°"}
                            </WeatherTextDiv>
                            <IconImgDiv $icon={weatherIcon} />
                            
                        </DetailWeatherDiv>
                        <DetailDivLine />
                    </>          
                }  
            </DetailContainer>
        </>
        )
    }

    // Detail 모달 close
    const onClickCloseDetail = () => {
        setIsDetail(!isDetail);
    };

    return (
        <DetailSlideContainer $isDetail={isDetail}>
            <ModalCloseDiv>
                <CloseButton onClick={onClickCloseDetail}>{"<"}</CloseButton>
            </ModalCloseDiv>
            {DetailRender()}
        </DetailSlideContainer>
    )
}

export default ScheduleDetailModal;