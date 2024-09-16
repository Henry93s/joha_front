import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// 공휴일 데이터를 정의하는 함수
export const getHolidayData = (value) => {
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

    // value 를 dayjs 객체로 변환 후 format 사용
    const date = dayjs(value);
    const monthDay = date.format('MM-DD');
    return holidays[monthDay] || null;
  };