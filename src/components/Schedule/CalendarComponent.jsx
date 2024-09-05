import styled, { keyframes, css } from "styled-components";
import React, { Children, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Calendar, ConfigProvider } from 'antd';
import 'dayjs/locale/ko';
// antd 라이브러리 Calendar 에서 locale 속성을 import 하여 월, 요일 표시를 한국어로 변경하기 위함
import locale from 'antd/es/date-picker/locale/ko_KR';
import { Lunar, Solar } from "lunar-javascript";
import dayjs from "dayjs";

// pc 일 때는 하단 공백에 일정 리스트를 출력할 것임
// 모바일일 때는 일정 클릭 시 아래에서 올라오는 슬라이드 모달로 일정 리스트를 출력할 것임
const RelativeContainer = styled.div`
  width: 100%;
  max-width: 700px;
  height: 90vh;
  position: relative;
  overflow: hidden;
`
const CalendarContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  margin-top: 20px;
`
 // 달력의 headerRender props 코드 수정으로 기본 스타일을 변경시키는 스타일드 컴포넌트 정의
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`
const CalendarHeader = styled.p`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`
// CalendarHeader header control 방향 지시 버튼 정의
const CalendarHeaderControl = styled.button`
  font-size: 25px;
  background-color: white;
  color: #bbb;
  cursor: pointer;
  transition: color 0.5s;
  z-index: 1;
  

  &:hover {
    color: #000;
  }

  @media (max-width: 1000px) {
    font-size: 19px;
  }
`

// antd 라이브러리 중 Calendar 의 스타일을 적용한 컴포넌트
const Events = styled.ul`
  .ant-badge-status {
    width: 100%;
    overflow: hidden;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

// 공휴일 및 주말(토요일) 날짜 색을 구분하기 위한 스타일드 컴포넌트
const DateP = styled.p.attrs(props => ({
  style: {
    color: props.$isNotNowMonth ? "#d9d9d9" : props.$isHoliday ? "#FF040C" : props.$isSaturday ? "#4A45FF" : "#333"
  }
}))`
  text-align: right;
  padding-right: 3px;
`;

// 기본 antd 캘린더의 date 숫자는 숨기고 직접 커스터마이징한 date 숫자를 보이기 위한 스타일드 컴포넌트
const HiddenDateStyleCalendar = styled.div`
  .ant-picker-calendar-date-value {
    display: none;
  }

  // 월이 이동할 때 slide 효과 적용
  .ant-picker-body {
    @keyframes slide-right {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    @keyframes slide-left {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0%);
      }
    }
    
    animation: ${({ $slideDirection }) => 
      $slideDirection === "right" ? "slide-right" : 
      $slideDirection === "left" ? "slide-left" : "none"} 0.25s ease-in-out;
  }
`;


// 모달을 덮는 Overlay 스타일
const ModalOverlay = styled.div`
  position: absolute;
  width: 100vw;
  max-width: 700px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.001);  /* 반투명한 회색 배경 */
  z-index: 2;
  overflow: hidden;
  margin-bottom: calc(67px + 20px);
  // Tip: style 속성에 설정한 CSS(attrs) 는 인라인 스타일로 적용되며, 인라인 스타일에서는 CSS 트랜지션이 제대로 동작하지 않을 수 있음
  // => transform과 opacity를 스타일 템플릿 리터럴 내에서 동적으로 설정
  transform: ${({$isVisible}) => ($isVisible ? 'translateY(0%)' : 'translateY(100%)')};
  transition: transform 0.5s ease;
`;
// 일자 클릭 시 발생하는 슬라이더 모달 컨테이너
const MonthSlideContainer = styled.div`
  width: 100%;
  height: 50%;
  background-color: aqua;
  z-index: 3;

  // Tip: style 속성에 설정한 CSS(attrs) 는 인라인 스타일로 적용되며, 인라인 스타일에서는 CSS 트랜지션이 제대로 동작하지 않을 수 있음
  // => transform과 opacity를 스타일 템플릿 리터럴 내에서 동적으로 설정
  transform: ${({$isVisible}) => ($isVisible ? 'translateY(110%)' : 'translateY(200%)')};
  transition: transform 1s ease;
`
const ModalCloseDiv = styled.div`
  display: flex;
  justify-content: end;
  height: 30px;
`
const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  cursor: pointer;
  background-color: white;
  color: #BBBBBB;
`
const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;
  height: 50px;
  margin: 0 auto;
  background-color: red;
`


// 공휴일 데이터를 정의하는 함수
const getHolidayData = (value) => {
  const holidays = {
    '01-01': '신정',
    '03-01': '삼일절',
    '05-05': '어린이날',
    '06-06': '현충일',
    '08-15': '광복절',
    '10-03': '개천절',
    '10-09': '한글날',
    '12-25': '크리스마스',
    // 추석과 설날 등은 매년 날짜가 바뀌므로, lunar.js 같은 라이브러리를 활용하여 변환 필요
  };

  const monthDay = value.format('MM-DD');
  return holidays[monthDay] || null;
};
// 설날과 추석 날짜를 계산하는 함수
const getLunarHolidayData = (value) => {
  const solar = Solar.fromYmd(value.year(), value.month() + 1, value.date());
  const lunar = Lunar.fromSolar(solar);
  
  const lunarHolidays = {
    '01-01': '설날',
    '01-02': '설날 연휴',
    '08-15': '추석',
    '08-14': '추석 연휴',
    '08-16': '추석 연휴'
  };

  const monthDay = `${lunar.getMonth().toString().padStart(2, '0')}-${lunar.getDay().toString().padStart(2, '0')}`;
  return lunarHolidays[monthDay] || null;
};




const CalendarComponent = () => {
  // 화면 너비가 1000 이상일 때 fullscreen 캘린더 props 를 적용하기 위한 state
  const [isFullScreen, setIsFullScreen] = useState(window.innerWidth >= 1000);

  // N 월 state 정의
  const [months, setMonths] = useState(dayjs().startOf('month'));
  
  // 달력 slide 적용
  const [slideDirection, setslideDirection] = useState(null);
  // slide 동작 중 월 방향키 클릭 동작 x
  const [slideDisable, setSlideDisable] = useState(false);

  // slide 모달 창 display 상태 정의
  const [isVisible, setIsVisible] = useState(false);

  // 창 상태에 따른 pc 모바일 화면 보기 자동 전환
  useEffect(() => {
    const handleResize = () => {
      setIsFullScreen(window.innerWidth >= 1000);
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);
  }, [window.innerWidth]);
        
  // 특정 날짜에 대한 이벤트 데이터를 반환하는 함수
  const getListData = (value) => {
    const newListData = [];

    // 기본 공휴일과 추석, 설날 공휴일 변수 정의
    const holiday = getHolidayData(value);
    const lunarHoliday = getLunarHolidayData(value);

    // 기본 공휴일을 list 에 포함
    if (holiday) {
      newListData.push({
        type: 'error', // 공휴일 스타일을 'error'로 설정 => 빨간색
        content: holiday,
      });
    }
    // 매년 변하는 추석, 설날 공휴일을 list 에 포함 (lunar-javascript 라이브러리)
    if (lunarHoliday) {
      newListData.push({
        type: 'error', // 명절 스타일을 'error'로 설정 => 빨간색
        content: lunarHoliday,
      });
    }

    // 추가적인 이벤트 데이터 load api
    // ...

    return newListData;
  };

  // 각 셀에 맞는 렌더링 방식을 결정하는 함수
  const cellRender = useCallback((current) => {
    const listData = getListData(current);
    // 토요일 또는 공휴일(일욜 포함) 여부를 파악하여 글씨 색 변경 스타일 컴포넌트를 적용하기 위함
    const isSaturday = current.day() === 6;
    const isHoliday = listData.some(item => item.type === 'error') || current.day() === 0;
    /* 
      current의 연도(current.year())와 현재 연도(new Date().getFullYear())를 비교하고, 
      current의 월(current.month())과 현재 월(new Date().getMonth())을 비교
    */
    const isNotNowMonth = current.year() !== new Date().getFullYear() || current.month() !== new Date().getMonth();


    const onClickDate = () => {
      // 일자에 일정이 있을 경우에만 모달을 띄움
      if(listData.length > 0){
        setIsVisible(!isVisible);
      }
    }

    return (
      <div onClick={onClickDate}>
        <DateP $isHoliday={isHoliday} $isSaturday={isSaturday && !isHoliday} $isNotNowMonth={isNotNowMonth}>
          {current.get('date')}
        </DateP>
        
        <Events>
            {listData.map((item, index) => (
              <li key={`${item.content} - ${index}`} > 
                <Badge status={item.type} text={isFullScreen ? item.content : ''} />
              </li>
            ))}
        </Events>
      </div>
    )
  }, [months]);

  // 월을 변경하는 핸들러 함수들
  const onChangeMonthPrev = (current, onChange) => {
    const newValue = current.clone().subtract(1, 'month');
    onChange(newValue);
    // useEffect 에 의존성을 부여하기 위한 setMonth
    setMonths(newValue.startOf('month'));
    // 달력 slide 적용
    setslideDirection('left');
    setSlideDisable(true);
    setTimeout(() => {
      // slide 애니메이션 중 변경 x, 및 left direction 해제
      setslideDirection(null);
      setSlideDisable(false);
    }, 250);
  };

  const onChangeMonthNext = (current, onChange) => {
    const newValue = current.clone().add(1, 'month');
    onChange(newValue);
    // useEffect 에 의존성을 부여하기 위한 setMonth
    setMonths(newValue.startOf('month'));
    // 달력 slide 적용
    setslideDirection('right');
    setSlideDisable(true);
    setTimeout(() => {
      // slide 애니메이션 중 변경 x, 및 left direction 해제
      setslideDirection(null);
      setSlideDisable(false);
    }, 300);
  };

  // 모달 close
  const onClickCloseModal = () => {
    setIsVisible(!isVisible);
  }
  const onClickModalOutside = (e) => {
    if(e.target.id === 'overlay'){
      setIsVisible(false);
    }
  }

  // 일정 스케쥴 render
  const contentRender = () => {
    const current = dayjs();
    const listData = getListData(current);
    console.log(listData)
    
    return (
      <>
        {listData.map((item, index) => (
          <ModalContent key={index} > 
            {item.type}
            {isFullScreen ? item.content : ''}
          </ModalContent>
        ))}
      </>
    )
  }

  return (
    <>
      <RelativeContainer>
        <CalendarContainer>
          <ConfigProvider
            // antd 라이브러리 기본 값을 수정하기 위한 설정 provider, 컴포넌트 토큰 적용(가이드 문서 확인)
            theme={{
              token: {
                // antd 글로벌 컴포넌트 토큰 정의
                fontFamily: "Pretendard",
              },
              components: {
                Calendar: {
                  /* antd 캘린더 컴포넌트 토큰 정의 */
                  // 선택된 날짜 셀 배경
                  itemActiveBg: "#b5ebeb",
                  // hover된 날짜 셀 배경
                  controlItemBgHover: "#d2fafa",
                  // 선택된 날짜 셀 의 선 색
                  colorPrimary: "#51d6d6",
                },
                Badge: {
                  /* antd 캘린더 내부 일정 컴포넌트 토큰 정의 */
                  // 선택된 날짜 셀 의 글씨 색
                  colorText: "#5b5a5a",
                }
              },
            }}
          >
            <HiddenDateStyleCalendar $slideDirection={slideDirection}>
              <Calendar cellRender={cellRender} locale={locale} fullscreen={isFullScreen} 
              
              // headerRender props 코드 수정으로 기본 스타일을 변경시킴
              headerRender={({ value, onChange }) => {
                  const year = value.year();
                  const month = value.month();
                  return (
                    <HeaderContainer>
                      <CalendarHeaderControl disabled={slideDisable} onClick={() => onChangeMonthPrev(value, onChange)} >{"<"}</CalendarHeaderControl>
                        <CalendarHeader>
                          {year}년 {month + 1}월
                        </CalendarHeader>
                      <CalendarHeaderControl disabled={slideDisable} onClick={() => onChangeMonthNext(value, onChange)}>{">"}</CalendarHeaderControl>
                    </HeaderContainer>
                  );
                }}
              />
              
            </HiddenDateStyleCalendar>
          </ConfigProvider>
        </CalendarContainer>
        <ModalOverlay id="overlay" $isVisible={isVisible} onClick={onClickModalOutside}>
          <MonthSlideContainer $isVisible={isVisible}>
              <ModalCloseDiv>
                <CloseButton onClick={onClickCloseModal}>X</CloseButton>
              </ModalCloseDiv>
              {contentRender()}   
          </MonthSlideContainer>
        </ModalOverlay>
        
      </RelativeContainer>
    </>
  );
};


  export default CalendarComponent;