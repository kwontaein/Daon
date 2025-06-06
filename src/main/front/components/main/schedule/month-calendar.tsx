'use client'
import './calendar.scss'


//이미지 관련
import { useCalendar } from '@/store/zustand/calendar';
import dayjs from 'dayjs';
import MonthCalendarChild from './month-calendar-child';

export default function MonthCalendar(){
    const {currentDate} = useCalendar()

    return(    
        <div className='grid-calendar-container'>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((_,i)=>(
                <MonthCalendarChild year={dayjs(currentDate).year()} month={i+1} key={i}/>
            ))}
        </div>
    )
}