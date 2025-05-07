'use client'
import './calendar.scss'

import dayjs from 'dayjs';
//이미지 관련
import Image from 'next/image';
import nextYearJPG from '@/assets/nextYear.gif';
import nextMonthJPG from '@/assets/nextMonth.gif';
import prevYearJPG from '@/assets/prevYear.gif';
import prevMonthJPG from '@/assets/prevMonth.gif';
import { useCalendar } from '@/store/zustand/calendar';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import MonthCalendar from './month-calendar';
import { isHoliday, getLunar } from 'holiday-kr';
import { lunarHolidays, solarHolidays } from '@/model/constants/calendar/holiday';
import { useEffect, useState } from 'react';
import HolidayInfo from './holidayInfo';


export default function DaonCalendar(){
    const {currentDate ,prevMonth, nextMonth, prevYear, nextYear, mode, setMode} = useCalendar()
    const daysInMonth = dayjs(currentDate).daysInMonth(); //해당 달의 일수 (4월 =>30)
    const startDayOfWeek = dayjs(currentDate).startOf('month').day() //시작하는 요일
    const endDayOfWeek = dayjs(currentDate).endOf('month').day() // 끝나는 요일
    const  { itemsRef, target, setTarget } = useItemSelection(true)

    //달력의 총 셀개수
    const totalCells = daysInMonth + startDayOfWeek + (6 - endDayOfWeek);

    const monthOfDays = Array.from({ length: totalCells }, (_, idx) => {
        const day = idx + 1 - startDayOfWeek; // 현재 셀에 해당하는 날짜
    
        const isCurrentMonth = day > 0 && day <= daysInMonth;
        const solar = isCurrentMonth
        ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        : null;
    
        const dayInfo = dayjs(currentDate).set('date', day);
        const dayOfTheWeek = dayInfo.day();
        const isHolidayFlag = isCurrentMonth && isHoliday(solar);

        return {
            day,                 // 일
            dayOfTheWeek,        // 요일 (0: 일요일 ~ 6: 토요일)
            isCurrentMonth,      // 이번 달 날짜인지 여부
            isHolidayFlag
        };
    });
    const weeks = monthOfDays.reduce((prev, day, idx) => {
        if (idx % 7 === 0) prev.push([]); // 한 주마다 새로운 배열 시작
        prev[prev.length - 1].push(day);
        return prev;
    }, []);
    

    const changeModeHandler =(mode)=>{
        setMode(mode)
    }

    

    return(
        <>
        <section style={{display:'flex', justifyContent:'space-between'}}>
            <div className='calendar-header'>
                <span>
                    <Image src={prevYearJPG} alt='<<' onClick={prevYear} style={{zoom:'120%'}}/>
                    {mode==='month' && <Image src={prevMonthJPG} alt='<' onClick={prevMonth} style={{zoom:'120%'}}/>}
                </span>
                    <h3>{mode==='month' ?  dayjs(currentDate).format('YYYY년 M월') : dayjs(currentDate).format('YYYY년')}</h3>
                <span>
                {mode==='month' && <Image src={nextMonthJPG} alt='>' onClick={nextMonth} style={{zoom:'120%'}}/>}
                    <Image src={nextYearJPG} alt='>>' onClick={nextYear} style={{zoom:'120%'}}/>
                </span>
            </div>
            <div className='calendar-button-container'>
                {mode==='month' && <button>저&nbsp;&nbsp;&nbsp;장</button>}
                <button onClick={changeModeHandler.bind(null,'month')}>월간일정</button>
                <button onClick={changeModeHandler.bind(null,'year')}>년&nbsp;&nbsp;&nbsp;력</button>
            </div>
        </section>
        {mode ==='month' ?
        <>

        <table className="calendar-table">
            <colgroup>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
            </colgroup>
            <thead>
                <tr>
                   <td className='sun'>일</td> 
                   <td>월</td> 
                   <td>화</td> 
                   <td>수</td> 
                   <td>목</td> 
                   <td>금</td> 
                   <td className='sat'>토</td> 
                </tr>
            </thead>
            <tbody>
                {weeks.map((week, weekIdx) => (
                    <tr key={weekIdx}>
                    {week.map((date, dayIdx) => (
                        <td ref={(el)=>{itemsRef.current[date.day] = el}}
                            key={dayIdx}
                            className={`${date.isCurrentMonth ? '' : 'disabled'} 
                                ${dayjs(currentDate).set('date', date.day).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 'today' : ''}`}
                            style={target===date.day ? {border:'2px solid black'}:{}}>
                            <div>
                                <div className='day-container'>
                                    <p style={{color: (date.dayOfTheWeek ===0||date.isHolidayFlag) ? 'red':( date.dayOfTheWeek=== 6 ? 'blue':undefined), fontWeight:550}}>
                                        {date.isCurrentMonth ? date.day : ''}
                                    </p>
                                    {date.isCurrentMonth && (
                                    <HolidayInfo
                                        currentDate={currentDate}
                                        day={date.day}
                                        dayOfTheWeek={date.dayOfTheWeek}
                                    />
                                    )}
                                </div>
                            {date.isCurrentMonth && 
                                <textarea className='calendar-textarea' spellCheck='false' onFocus={()=>setTarget(date.day)}/>
                            }
                            </div>                               
                        </td>
                    ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </>
        :
        <MonthCalendar/>
        }
        </>        
    )
}