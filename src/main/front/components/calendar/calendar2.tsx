'use client'
import './calendar2.scss'

import dayjs from 'dayjs';
//이미지 관련
import Image from 'next/image';
import nextYearJPG from '@/assets/nextYear.gif';
import nextMonthJPG from '@/assets/nextMonth.gif';
import prevYearJPG from '@/assets/prevYear.gif';
import prevMonthJPG from '@/assets/prevMonth.gif';
import { useCalendar } from '@/store/zustand/calendar';

export default function DaonCalendar2(){
    const {currentDate ,prevMonth, nextMonth, prevYear, nextYear} = useCalendar()
    const daysInMonth = dayjs(currentDate).daysInMonth(); //해당 달의 일수 (4월 =>30)
    const startDayOfWeek = dayjs(currentDate).startOf('month').day() //시작하는 요일
    const endDayOfWeek = dayjs(currentDate).endOf('month').day() // 끝나는 요일

    const monthOfDays = Array.from({length:daysInMonth+startDayOfWeek+(6-endDayOfWeek)}, (_,idx)=>{
        const day = (idx+1) -startDayOfWeek //현재 일 (0 = 이전달의 마지막 일, 1 부터 이번달의 1일)
        const date = dayjs(currentDate).set('date', day);
        return{
            day:day, //dlfwk
            dayOfTheWeek:date.day(),// 요일정보
            isCurrentMonth: day > 0 && day <= daysInMonth // 이번 달의 날짜인지 확인
        }
    })
    const weeks = monthOfDays.reduce((prev, day, idx) => {
        if (idx % 7 === 0) prev.push([]); // 한 주마다 새로운 배열 시작
        prev[prev.length - 1].push(day);
        return prev;
      }, []);
    
    return(
        <>
        <div className='calendar-header'>
            <span>
                <Image src={prevYearJPG} alt='<<' onClick={prevYear} style={{zoom:'120%'}}/>
                <Image src={prevMonthJPG} alt='<' onClick={prevMonth} style={{zoom:'120%'}}/>
            </span>
                <h3>{dayjs(currentDate).format('YYYY년 M월')}</h3>
            <span>
                <Image src={nextMonthJPG} alt='>' onClick={nextMonth} style={{zoom:'120%'}}/>
                <Image src={nextYearJPG} alt='>>' onClick={nextYear} style={{zoom:'120%'}}/>
            </span>
        </div>
        <table className="calendar-table">
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
                        <td
                            key={dayIdx}
                            className={`${date.isCurrentMonth ? '' : 'disabled'} 
                                ${dayjs(currentDate).set('date', date.day).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 'today' : ''}`}>                            
                            <div>
                                {date.isCurrentMonth ? date.day : ''}
                                {date.isCurrentMonth &&
                                    <textarea className='calendar-textarea' spellCheck='false'/>
                                }
                            </div>
                        </td>
                    ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </>
        
    )
}