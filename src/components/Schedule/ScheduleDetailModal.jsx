import styled, { keyframes, css } from "styled-components";
import { useEffect, useState } from "react";
import { useScript } from "../../api/kakaoHooks";
// 이미지를 import 로 불러와서 상대 경로로 참조
import sun from "../../assets/icons/weather/sun.png";
import clouds from "../../assets/icons/weather/clouds.png";
import lowcloud from "../../assets/icons/weather/lowcloud.png";
import rain from "../../assets/icons/weather/rain.png";
import rainandsnow from "../../assets/icons/weather/rainandsnow.png";
import snow from "../../assets/icons/weather/snow.png";
import kakao from "../../assets/icons/kakao_btn.png";
import { getWeatherData } from "../../utils/getWeatherData";

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
const KakaoIcon = styled.div`
    width: 48px;
    height: 48px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(${ kakao });
    border-radius: 20px;
    cursor: pointer;
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
const DetailWeatherDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 200px;
    justify-content: center;
    align-items: center;

    @media (max-width: 1000px) {
        height: 130px;
        flex-direction: row;
        justify-content: space-around;
    }
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
    width: 106px;
    height: 96px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: ${({ $icon }) =>
        `url(${ imageMap[$icon] })`};
    
    @media (max-width: 1000px) {
        margin-bottom: 30px;
    }
`;
const WeatherTextDiv = styled.div`
    width: 106px;
    height: 100px;
    font-size: 28px;
    font-weight: bold;
    text-align: center;

    @media (max-width: 1000px) {
        font-size: 25px;
    }
`


const ScheduleDetailModal = ({detailData, isDetail, setIsDetail}) => {
    // 날씨 데이터를 저장할 상태
    const [weather, setWeather] = useState(["", ""]);
    const [weatherIcon, setWeatherIcon] = useState(null);

    // kakao SDK 스크립트 로드 상태 확인
    const status = useScript("https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js");

    // kakao sdk 초기화하기
    // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도합니다.
    useEffect(() => {
        if (status === "ready" && window.Kakao) {
            // 중복 initialization 방지
            if (!window.Kakao.isInitialized()) {
                // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
                window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
            }
        }
    }, [status]);	

    useEffect(() => {
        if(isDetail){
            getWeatherData(setWeather, setWeatherIcon);
        }
    }, [isDetail]); 

    // 주소 카카오톡에 공유
    const handleKakaoButton = (item) => {
        // 크롬 브라우저 > 개발자모드 > 모바일 설정 지원하지 않음
        if (window.Kakao && window.Kakao.Share) {
            window.Kakao.Share.createDefaultButton({
                container: '#kakaoShareBtn',
                objectType: 'feed',
                content: {
                title: "일정 공유",
                description: item.content + "\n" + item.time,
                imageUrl: weatherIcon,
                link: {
                    // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
                },
                buttons: [
                {
                    title: '보러가기',
                    link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                    }
                }
                ],
                // 카카오톡 미설치 시 카카오톡 설치 경로이동
                installTalk: true,
            });

            } else {
                console.error('Kakao SDK is not ready.');
            }
    };

    // 일정 Detail 컨텐츠 렌더링
    const DetailRender = () => {
        const item = detailData;
        return (
        <>
            <DetailContainer>
                <DetailTitleDiv>
                    {item.content}
                    <DetailIconDiv>
                        <KakaoIcon onClick={() => handleKakaoButton(item)} id="kakaoShareBtn" />
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