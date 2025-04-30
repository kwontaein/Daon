'use client'
import './calendar.scss'


//이미지 관련
import Image from 'next/image';
import nextYearJPG from '@/assets/nextYear.gif';
import nextMonthJPG from '@/assets/nextMonth.gif';
import prevYearJPG from '@/assets/prevYear.gif';
import prevMonthJPG from '@/assets/prevMonth.gif';
import { useCalendar } from '@/store/zustand/calendar';
import dayjs from 'dayjs';
import MonthCalendarChild from './month-calendar-child';

export default function MonthCalendar(){
    const {currentDate, prevYear, nextYear} = useCalendar()

    return(    
        <div className='grid-calendar-container'>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((_,i)=>(
                <MonthCalendarChild year={dayjs(currentDate).year()} month={i+1} key={i}/>
            ))}
        </div>
    )
}