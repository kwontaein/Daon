import LunarCalendar from "lunar-calendar"; // 수정: 기본 내보내기 사용

export const getHolidays = (year) => {
  // 음력 공휴일 (LunarCalendar 클래스의 인스턴스를 생성하여 양력으로 변환)
  // const lunarNewYear = new LunarCalendar.LunarCalendar(year, 1, 1).toSolar(); // 설날
  // const lunarNewYearEve = new LunarCalendar.LunarCalendar(year, 12, 30).toSolar(); // 설날 전날
  // const lunarNewYearNext = new LunarCalendar.LunarCalendar(year, 1, 2).toSolar(); // 설날 다음날
  // const chuseok = new LunarCalendar.LunarCalendar(year, 8, 15).toSolar(); // 추석
  // const chuseokEve = new LunarCalendar.LunarCalendar(year, 8, 14).toSolar(); // 추석 전날
  // const chuseokNext = new LunarCalendar.LunarCalendar(year, 8, 16).toSolar(); // 추석 다음날
  // const buddhaDay = new LunarCalendar.LunarCalendar(year, 4, 8).toSolar(); // 부처님 오신 날

  // 양력 공휴일
  const solarHolidays = [
    "2025-01-01", // 새해
    "2025-05-05", // 어린이날
    "2025-08-15", // 광복절
    "2025-10-03", // 개천절
    "2025-12-25", // 크리스마스
  ];

  // 음력 공휴일과 양력 공휴일을 병합
  return [
    // lunarNewYear.toISOString().split("T")[0], // 설날
    // lunarNewYearEve.toISOString().split("T")[0], // 설날 전날
    // lunarNewYearNext.toISOString().split("T")[0], // 설날 다음날
    // chuseok.toISOString().split("T")[0], // 추석
    // chuseokEve.toISOString().split("T")[0], // 추석 전날
    // chuseokNext.toISOString().split("T")[0], // 추석 다음날
    // buddhaDay.toISOString().split("T")[0], // 부처님 오신 날
    ...solarHolidays, // 양력 공휴일 추가
  ];
};
