import { getHolidayData } from "../utils/getHolidayData";
import { getLunarHolidayData } from "../utils/getLunarHolidayData";

// 특정 날짜에 대한 이벤트 데이터를 반환하는 함수
export const getScheduleListData = (value) => {
    const newListData = [];

    // 기본 공휴일과 추석, 설날 공휴일 변수 정의
    const holiday = getHolidayData(value);
    const lunarHoliday = getLunarHolidayData(value);

    // 기본 공휴일을 list 에 포함
    if (holiday) {
      newListData.push({
        type: 'error', // 공휴일 스타일을 'error'로 설정 => 빨간색
        color: '#FE5054',
        content: holiday,
        timeStart: "Allday",
        time: "Allday"
      });
    }
    // 매년 변하는 추석, 설날 공휴일을 list 에 포함 (lunar-javascript 라이브러리)
    if (lunarHoliday) {
      newListData.push({
        type: 'error', // 명절 스타일을 'error'로 설정 => 빨간색
        color: '#FE5054',
        content: lunarHoliday,
        timeStart: "Allday",
        time: "Allday"
      });
    }

    // 추가적인 이벤트 데이터 load api
    // ...
    for(var i = 0; i < 20; i++){
      newListData.push({
        type: 'my',
        color: '#ADB4E0',
        content: "test" + i,
        timeStart: "8:00",
        time: "8:00 ~ 10:00"
      })
    }

    return newListData;
  };