import { Lunar, Solar } from "lunar-javascript";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// 설날과 추석 날짜를 계산하는 함수
export const getLunarHolidayData = (value) => {
    // value 를 dayjs 객체로 변환 후 year, month, date 함수 사용
    const date = dayjs(value);
    // dayjs의 year, month, date 값을 가져옴
    const year = date.year();
    const month = date.month() + 1; // dayjs에서는 month가 0부터 시작하므로 +1
    const day = date.date();

    const solar = Solar.fromYmd(year, month, day);

    const lunar = Lunar.fromSolar(solar);
    const lunarHolidays = {
      '01-01': '설날',
      '01-02': '설날 연휴',
      '08-15': '추석',
      '08-14': '추석 연휴',
      '08-16': '추석 연휴'
    };
    
    // 음력 월 - 음력 일 계산
    const monthDay = `${lunar.getMonth().toString().padStart(2, '0')}-${lunar.getDay().toString().padStart(2, '0')}`;

    // 설날 또는 추석 여부 반환
    return lunarHolidays[monthDay] || null;
  };