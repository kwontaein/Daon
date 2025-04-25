"use client";
import './calendar.scss'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useEffect, useRef, useState } from "react";
import dayjs from 'dayjs';
//이미지 관련
import Image from 'next/image';
import nextYear from '@/assets/nextYear.gif';
import nextMonth from '@/assets/nextMonth.gif';
import prevYear from '@/assets/prevYear.gif';
import prevMonth from '@/assets/prevMonth.gif';


import { getHolidays } from '@/model/constants/sales/receipt/holidays';


export default function DaonCalendar(){
    const calendarRef = useRef<FullCalendar | null>(null)
    const [currentDate, setCurrentDate] = useState<string>(dayjs(new Date()).format('YYYY년 M월'));
    const [holidays,setHolidays] = useState<string[]>([]);



    const calendarHandler = (compound:string)=>{
        if(!calendarRef.current) return
        if(compound==='next'){
            calendarRef.current?.getApi().next()
        }else if( compound ==='prev'){
            calendarRef.current?.getApi().prev()
        }else if(compound==='today'){
            calendarRef.current?.getApi().today()
        }else if(compound ==='prevYear'){
            calendarRef.current?.getApi().prevYear()
        }else if(compound==='nextYear'){
            calendarRef.current?.getApi().nextYear()
        }
        const calendarApi = calendarRef.current.getApi();
        const changeDate = calendarApi.getDate(); 
        setCurrentDate(dayjs(changeDate).format('YYYY년 M월'));
        setHolidays(getHolidays(changeDate.getFullYear))
    }



    return(
        <div className="daon-calendar-container">
        <div className='calendar-header'>
            <span>
                <Image src={prevYear} alt='<<' onClick={calendarHandler.bind(null,'prevYear')} style={{zoom:'120%'}}/>
                <Image src={prevMonth} alt='<' onClick={calendarHandler.bind(null,'prev')} style={{zoom:'120%'}}/>
            </span>
                <h3>{currentDate}</h3>
            <span>
                <Image src={nextMonth} alt='>' onClick={calendarHandler.bind(null,'next')} style={{zoom:'120%'}}/>
                <Image src={nextYear} alt='>>' onClick={calendarHandler.bind(null,'nextYear')} style={{zoom:'120%'}}/>
            </span>
        </div>
            
        <FullCalendar
            ref={calendarRef}
            fixedWeekCount={false} //5줄까지만 표기
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="ko"
            height="auto" // 높이 자동 조정
            aspectRatio={1} //정사각형
            headerToolbar={false} // 상단 툴바 제거
            nowIndicator={true}
            dayMaxEventRows={2}
            dayHeaderContent={(args)=>{
                const [sun,sat] = [args.date.getDay() === 0, args.date.getDay() === 6]
                return <b className={sun ? 'sun' : sat ? 'sat' :''}>{args.text}</b>
            }}
            dayCellContent={(args) => {
                const day = args.date.getDate(); // 날짜만 추출
                const [sun,sat] = [args.date.getDay() === 0, args.date.getDay() === 6]
                
                const formattedDate =dayjs(args.date).format('YYYY-MM-DD')
                const holiday = holidays.includes(formattedDate)

                //같은 달인지 체크 
                const date = dayjs(args.date);
                const currentMonth = dayjs(args.view.currentStart).month();
                const cellMonth = date.month();
                const isOtherMonth = currentMonth !== cellMonth;
                
                return (
                    <div className={`calendar-day ${sat ? 'sat' : (sun || holiday)? 'sun' :''} ${isOtherMonth ?'none':''}`}>
                        {day}
                        {!isOtherMonth && <textarea className='calendar-textarea' onClick={(e)=>e.currentTarget.focus()}/>}
                    </div>
                )
            }}

        />
        </div>
      
    )
}