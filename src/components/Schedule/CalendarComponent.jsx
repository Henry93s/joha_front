import styled from "styled-components";
import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Calendar, ConfigProvider } from 'antd';
import 'dayjs/locale/ko';
// antd 라이브러리 Calendar 에서 locale 속성을 import 하여 월, 요일 표시를 한국어로 변경하기 위함
import locale from 'antd/es/date-picker/locale/ko_KR';
import dayjs from "dayjs";
import ScheduleListModal from "./ScheduleListModal";
import { getScheduleListData } from "../../api/getScheduleListData";
import "swiper/css";

// pc 일 때는 하단 공백에 일정 리스트를 출력할 것임
// 모바일일 때는 일정 클릭 시 아래에서 올라오는 슬라이드 모달로 일정 리스트를 출력할 것임
const RelativeContainer = styled.div`
  width: 100%;
  max-width: 700px;
  height: calc(100vh - (60px + 67px));
  position: relative;
  overflow: hidden;
`
const CalendarContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  padding-top: 20px;
`
 // 달력의 headerRender props 코드 수정으로 기본 스타일을 변경시키는 스타일드 컴포넌트 정의
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
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

// 기본 antd 캘린더 커스터마이징 작업 
const HiddenDateStyleCalendar = styled.div`
  // 기본 antd 캘린더의 date 숫자는 숨기고 직접 커스터마이징한 date 숫자를 보이기 위함
  .ant-picker-calendar-date-value {
    display: none;
  }

  // 캘린더 내부 개별 날짜의 일정이 많을 때 스크롤바 출력 안함
  .ant-picker-calendar-date-content{
    // firefox
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera용 추가 */
    }
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
      $slideDirection === "left" ? "slide-left" : "none"} 0.3s ease-in-out;
  }
`;


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

  // 날짜 상태 관리
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 선택한 날짜 상태 관리

  // 창 상태에 따른 pc 모바일 화면 보기 자동 전환
  useEffect(() => {
    const handleResize = () => {
      setIsFullScreen(window.innerWidth >= 1000);
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);
  }, [window.innerWidth]);
        
  

  // 각 셀에 맞는 렌더링 방식을 결정하는 함수
  const cellRender = useCallback((current) => {
    const listData = getScheduleListData(current);

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

    // (mobile) 모바일일 때에는 공휴일 또는 일정을 화면 미관 상 최대 1개 뱃지만 출력되도록 하도록 하는 중복 색상 필터링
    const uniqueListData = listData.reduce((acc, currentItem) => {
      if (!acc.find((item) => item.color === currentItem.color)) {
        acc.push(currentItem);
      }
      return acc;
    }, []);

    return (
      <div onClick={onClickDate}>
        <DateP $isHoliday={isHoliday} $isSaturday={isSaturday && !isHoliday} $isNotNowMonth={isNotNowMonth}>
          {current.get('date')}
        </DateP>
        
        <Events>
            {isFullScreen &&
              listData.map((item, index) => (
              <div key={`${item.content} - ${index}`}> 
                <Badge color={item.color} text={item.content} />
              </div>
            ))
            ||
              uniqueListData.map((item, index) => (
              <div key={`${item.content} - ${index}`}> 
                <Badge color={item.color} />
              </div>
            ))
          }
        </Events>
      </div>
    )
  }, [months]);

    

  // 월을 변경하는 핸들러 함수들
  const onChangeMonthPrev = (current, onChange) => {
    // dayjs 라이브러리는 기본적으로 불변(immutable)이기 때문에, 객체의 값을 직접 수정하는 대신, 기존 객체를 복사한 후 변경 사항을 적용
    const newValue = current.clone().subtract(1, 'month');
    // antd 캘린더의 onChange 호출
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
    // dayjs 라이브러리는 기본적으로 불변(immutable)이기 때문에, 객체의 값을 직접 수정하는 대신, 기존 객체를 복사한 후 변경 사항을 적용
    const newValue = current.clone().add(1, 'month');
    // antd 캘린더의 onChange 호출
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

  // 날짜 클릭 시 호출되는 함수
  const onDateSelect = (date) => {
    setSelectedDate(date); // 클릭한 날짜로 상태 변경
  };

  

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
                  itemActiveBg: "#c7fafa",
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
              <Calendar
                cellRender={cellRender} 
                locale={locale} 
                // 날짜 선택 이벤트
                onSelect={onDateSelect}
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
        {/* ScheduleListModal import */}
        <ScheduleListModal selectedDate={selectedDate} isVisible={isVisible} setIsVisible={setIsVisible} />
      </RelativeContainer>
    </>
  );
};


export default CalendarComponent;