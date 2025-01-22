"use client";
import './calendar.scss'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dayjs from 'dayjs';
//이미지 관련
import Image from 'next/image';
import nextYear from '@/assets/nextYear.gif';
import nextMonth from '@/assets/nextMonth.gif';
import prevYear from '@/assets/prevYear.gif';
import prevMonth from '@/assets/prevMonth.gif';


import { getHolidays } from '@/constants/receipt/holidays';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import { updateSearchDate } from '@/hooks/redux/slice/calendar-slice';


export default function Calendar(){
    const calendarEvent = useSelector((state:RootState)=> state.calendarDate); //외부에서도 컨트롤 할 수 있도록 상태관리
    const dispatch = useDispatch()
    const calendarRef = useRef<FullCalendar | null>(null)
    const [currentDate, setCurrentDate] = useState<string>("");
    const [holidays,setHolidays] = useState<string[]>([]);

    useEffect(()=>{
        setTimeout(() => {
            if (!calendarRef.current) return
            calendarRef.current?.getApi().gotoDate(calendarEvent.date)
            //title 갱신
            setCurrentDate(dayjs(calendarEvent.date).format('YYYY년 M월'));
        },0);
        
    },[calendarEvent.date_id])
    

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
        <div className="calendar-container">
        <div className='calendar-header'>
            <span>
                <Image src={prevYear} alt='<<' onClick={calendarHandler.bind(null,'prevYear')}/>
                <Image src={prevMonth} alt='<' onClick={calendarHandler.bind(null,'prev')}/>
            </span>
                <h3>{currentDate}</h3>
            <span>
                <Image src={nextMonth} alt='>' onClick={calendarHandler.bind(null,'next')}/>
                <Image src={nextYear} alt='>>' onClick={calendarHandler.bind(null,'nextYear')}/>
            </span>
        </div>
            
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="ko"
            height="auto" // 높이 자동 조정
            aspectRatio={1} //정사각형
            headerToolbar={false} // 상단 툴바 제거
            nowIndicator={true}
            dayMaxEventRows={2}
            dateClick={(args)=>{
                const payload =dayjs(args.date).format('YYYY-MM-DD')
                dispatch(updateSearchDate(payload))
            }}
            dayHeaderContent={(args)=>{
                const [sun,sta] = [args.date.getDay() === 0, args.date.getDay() === 6]
                return <b className={sun ? 'sun' : sta ? 'sta' :''}>{args.text}</b>
            }}
            dayCellContent={(args) => {
                const date = args.date.getDate(); // 날짜만 추출
                const [sun,sta] = [args.date.getDay() === 0, args.date.getDay() === 6]
                
                const formattedDate =dayjs(args.date).format('YYYY-MM-DD')
                const isSearch = calendarEvent.date === formattedDate
                const holiday = holidays.includes(formattedDate)
                
                return <div className={`calendar-day ${sta ? 'sta' : (sun || holiday)? 'sun' :''} ${isSearch && 'search'}`}>{date}</div>; // 날짜만 표시하고 "일"은 제거
            }}
        />
        </div>
      
    )
}