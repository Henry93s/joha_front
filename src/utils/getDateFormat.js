import { getBaseTime } from "./getBaseTime";

export const getDateFormat = (date) => {
    // 날짜를 'YYYYMMDD' 형식으로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0');

    // '20240924' 형식의 문자열
    const formattedDate = `${year}${month}${day}`;

    // 시간을 'HHMM' 형식으로 변환
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = '00'; // 분은 00으로 고정

    // '1000' 형식의 문자열
    const formattedTime = `${hours}${minutes}`;
    // basetime(기상청 예보 시간 배열) 을 뒤집고, 현재 시간('1000' 형식) 보다 작거나 같은 최신 base_time 반환 함수
    const returnFormattedTime = getBaseTime(formattedTime);

    const rs = {date: formattedDate, time: returnFormattedTime};
    return rs;
};


