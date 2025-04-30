'use client'
import { useCalendar } from '@/store/zustand/calendar';
import './calendar.scss'

import dayjs from 'dayjs';


export default function MonthCalendarChild({ year, month }: { year: number; month: number }) {
    const firstDay = dayjs(new Date(year, month-1, 1));
    const daysInMonth = dayjs(firstDay).daysInMonth(); //해당 달의 일수 (4월 =>30)
    const startDayOfWeek = dayjs(firstDay).startOf('month').day() //시작하는 요일
    const endDayOfWeek = dayjs(firstDay).endOf('month').day() // 끝나는 요일
    const {setDate,setMode} = useCalendar()

    const monthOfDays = Array.from({length:daysInMonth+startDayOfWeek+(6-endDayOfWeek)}, (_,idx)=>{
        const day = (idx+1) -startDayOfWeek //현재 일 (0 = 이전달의 마지막 일, 1 부터 이번달의 1일)
        const date = dayjs(firstDay).set('date', day);
        return{
            day:day, //일자
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
        <table className="month-calendar-table">
            <colgroup>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
                <col style={{width:'14.3%'}}/>
            </colgroup>

            <tbody>
                <tr className='none-height table-label'>
                    <td colSpan={7}>{year}년 {month}월</td>
                </tr>
                <tr className='none-height table-label'>
                   <td className='red'>일</td> 
                   <td>월</td> 
                   <td>화</td> 
                   <td>수</td> 
                   <td>목</td> 
                   <td>금</td> 
                   <td className='blue'>토</td> 
                </tr>
                {weeks.map((week, weekIdx) => (
                    <tr key={weekIdx} className='none-height'>
                    {week.map((date, dayIdx) => (
                        <td key={dayIdx}>                            
                            <a className={date.dayOfTheWeek ===0 ? 'red':( date.dayOfTheWeek=== 6 ? 'blue':undefined)} 
                               onClick={()=>{
                                setDate(new Date(year,month-1,date.day))
                                setMode('month')
                            }}>{date.isCurrentMonth ? date.day : ''}</a>
                        </td>
                    ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </>
        
    )
}