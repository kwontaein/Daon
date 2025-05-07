'use client'

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getLunar } from 'holiday-kr';
import { lunarHolidays, solarHolidays } from '@/model/constants/calendar/holiday';

interface Props {
  currentDate: Date;
  day: number;
  dayOfTheWeek: number;
}

export default function HolidayInfo({ currentDate, day, dayOfTheWeek }: Props) {
  const [lunarText, setLunarText] = useState('');

  useEffect(() => {
    const solar = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const lunar = getLunar(solar);
    const { year, month, day: lunarDay } = lunar;

    const lunarDate = dayjs(new Date(year, month - 1, lunarDay)).format('MM/DD');
    const solarDate = dayjs(solar).format('MM/DD');

    let result = '';

    if (lunarDate === '12/29') {
      const nextSolar = dayjs(solar).add(1, 'day').toDate();
      const nextLunar = getLunar(nextSolar);
      const nextLunarDate = dayjs(new Date(nextLunar.year, nextLunar.month - 1, nextLunar.day)).format('MM/DD');
      if (nextLunarDate === '01/01') {
        result = lunarHolidays['12/30'];
      }
    }

    if (solarHolidays[solarDate] && lunarHolidays[lunarDate]) {
      result = `${solarHolidays[solarDate]}\n${lunarHolidays[lunarDate]}`;
    } else if (solarHolidays[solarDate]) {
      result = solarHolidays[solarDate];
    } else if (lunarHolidays[lunarDate]) {
      result = lunarHolidays[lunarDate];
    } else if (dayOfTheWeek === 0) {
      result = `(${lunarDate})`;
    }

    setLunarText(result);
  }, [currentDate, day, dayOfTheWeek]);

  return (
    <p style={{ fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
      {lunarText}
    </p>
  );
}