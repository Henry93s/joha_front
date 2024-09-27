// Base_time 배열과 매핑된 문자열 객체 정의
// (기상청 예보 시간 반영, 1일 8회 한다고 함(api 문서 가이드 확인 완료))
const baseTimeMap = {
    200: "0200",
    500: "0500",
    800: "0800",
    1100: "1100",
    1400: "1400",
    1700: "1700",
    2000: "2000",
    2300: "2300",
};
// Base_time 배열 정의 
const baseTimes = Object.keys(baseTimeMap).map(Number);

export const getBaseTime = (formattedTime) => {
    // 현재 시간보다 작거나 같은 base_time 중에서 현재 시간보다 작거나 같은 값만 남기고 그 중 2 번째 큰 값 반환
    // ex : 현재 시간이 10:30 일 경우 0500 반환, 02:30 일 경우 2300 반환, 05:30 일 경우 0200 반환
    // 기상청 예보 시간이 각 base_time 10분 이후로 되어 있어서 간혹 제 시간에 예보 api 오류 동작 방지에 대응 차원으로 안전하게 이전 base_time 를 적용
    const previousBaseTime = baseTimes.filter(baseTime => baseTime <= formattedTime);
    previousBaseTime.pop();
    const returnBaseTime = previousBaseTime.pop();

    return baseTimeMap[returnBaseTime] || baseTimeMap[baseTimes[baseTimes.length - 1]];
}