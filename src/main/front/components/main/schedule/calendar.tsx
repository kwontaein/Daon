'use client'
import './calendar.scss'

import dayjs from 'dayjs';
//이미지 관련
import Image from 'next/image';
import nextYearJPG from '@/public/assets/nextYear.gif';
import nextMonthJPG from '@/public/assets/nextMonth.gif';
import prevYearJPG from '@/public/assets/prevYear.gif';
import prevMonthJPG from '@/public/assets/prevMonth.gif';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import MonthCalendar from './month-calendar';
import HolidayInfo from './holidayInfo';
import useSchedule from '@/hooks/schedule/useSchedule';
import { UserInfo } from '@/store/zustand/userInfo';


export default function DaonCalendar({user}:{user:UserInfo}){
    const  { itemsRef, target, setTarget } = useItemSelection(true)
    const {
        scheduleStore,
        weeks,
        currentDate,
        mode,
        scheduleMemoHandler,
        saveUserSchedule,
        changeModeHandler,
        prevMonth,
        nextMonth, 
        prevYear, 
        nextYear
    } = useSchedule(user)

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
                {mode==='month' && <button onClick={saveUserSchedule}>저&nbsp;&nbsp;&nbsp;장</button>}
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
                    {week.map((calendar, dayIdx) => (
                        <td ref={(el)=>{itemsRef.current[calendar.day] = el}}
                            key={dayIdx}
                            className={`${calendar.isCurrentMonth ? '' : 'disabled'} 
                                ${dayjs(calendar.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 'today' : ''}`}
                            style={target===calendar.day ? {border:'2px solid black'}:{}}>
                            <div>
                                <div className='day-container'>
                                    <p style={{color: (calendar.dayOfTheWeek ===0||calendar.isHolidayFlag) ? 'red':( calendar.dayOfTheWeek=== 6 ? 'blue':undefined), fontWeight:550}}>
                                        {calendar.isCurrentMonth ? calendar.day : ''}
                                    </p>
                                    {calendar.isCurrentMonth && (
                                    <HolidayInfo
                                        currentDate={currentDate}
                                        day={calendar.day}
                                        dayOfTheWeek={calendar.dayOfTheWeek}
                                    />
                                    )}
                                </div>
                                {calendar.isCurrentMonth && 
                                    <textarea
                                        className='calendar-textarea'
                                        value={scheduleStore[calendar.date]?.memo??''}
                                        onChange={(e)=>scheduleMemoHandler(calendar.date,e.target.value)}
                                        spellCheck='false'
                                        onFocus={()=>setTarget(calendar.day)}/>                            
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