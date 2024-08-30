import styled from "styled-components";
import React from 'react';
import { Badge, Calendar } from 'antd';
import Header from "../components/layout/Header";
import FooterMenu from "../components/layout/FooterMenu";
import 'dayjs/locale/ko';
// antd 라이브러리 Calendar 에서 locale 속성을 import 하여 월, 요일 표시를 한국어로 변경하기 위함
import locale from 'antd/es/date-picker/locale/ko_KR';
import { Lunar, Solar } from "lunar-javascript";

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
const NotesMonth = styled.div`
  font-size: 28px;
  text-align: center;
  section {
    font-size: 28px;
  }
`;
// 공휴일(일요일 포함) 및 토요일 날짜 글씨 색 정의 스타일드 컴포넌트
const StyledDateCell = styled.div`
  .holidayStyled .ant-picker-cell-inner {
    color: red !important; // 공휴일 날짜 색상
  }

  .saturdayStyled .ant-picker-cell-inner {
    color: blue !important; // 주말 날짜 색상
  }
`;

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

// 특정 날짜에 대한 mockup 이벤트 데이터를 반환하는 함수
const getListData = (value) => {
  // 특정 날짜 리스트
  let listData = [];
  // 기본 공휴일과 추석, 설날 공휴일 변수 정의
  const holiday = getHolidayData(value);
  const lunarHoliday = getLunarHolidayData(value);

  // 기본 공휴일을 list 에 포함
  if (holiday) {
    listData.push({
      type: 'error', // 공휴일 스타일을 'error'로 설정 => 빨간색
      content: holiday,
    });
  }
  // 매년 변하는 추석, 설날 공휴일을 list 에 포함 (lunar-javascript 라이브러리)
  if (lunarHoliday) {
    listData.push({
      type: 'error', // 명절 스타일을 'error'로 설정 => 빨간색
      content: lunarHoliday,
    });
  }

  // 추가적인 이벤트 데이터
  // ...

  return listData;
};

// 특정 월에 대한 mockup 데이터를 반환하는 함수
const getMonthData = (value) => {
  if (value.month() === 7) {
    return "여름 방학?";
  }
};

const SchedulePage = () => {
  // 월별 데이터를 렌더링하는 함수
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <NotesMonth>
        <section>{num}</section>
        <span>해외 휴가</span>
      </NotesMonth>
    ) : null;
  };

  // 날짜별 데이터를 렌더링하는 함수
  const dateCellRender = (value) => {
    const listData = getListData(value);
    // 토요일 또는 공휴일(일욜 포함) 여부를 파악하여 글씨 색 변경 스타일 컴포넌트를 적용하기 위함(클래스 부여)
    // 토요일 부터 체크하여 공휴일도 포함될 경우 공휴일 색(빨간색) 으로 덮음.
    const isSaturday = value.day() === 6;
    const isHoliday = listData.some(item => item.type === 'error') || value.day() === 0;

    // 공휴일(일욜 포함) 또는 주말 인지 체크하기 위함.
    // let : 토요일 부터 체크하여 공휴일도 포함될 경우 공휴일 색(빨간색) 으로 덮기 위함(재정의 가능성)
    let fontClassName = '';
    if (isSaturday) {
      fontClassName = 'saturdayStyled';
    }
    if (isHoliday) {
      fontClassName = 'holidayStyled';
    }
    
    return (
      <StyledDateCell className={fontClassName}>
        <Events>
          {listData.map((item) => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </Events>
      </StyledDateCell>
    );
  };

  // 각 셀에 맞는 렌더링 방식을 결정하는 함수
  const cellRender = (current, info) => {
    // 날짜 셀
    if (info.type === 'date') return dateCellRender(current);
    // 월 셀
    if (info.type === 'month') return monthCellRender(current);
    // 기본 노드 반환
    return info.originNode;
  };
      
  // 스케줄 페이지 렌더링
  return (
      <>
          <Header />
          <Calendar cellRender={cellRender} locale={locale}/>
          <FooterMenu />
      </>
  )
};

export default SchedulePage;