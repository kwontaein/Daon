import { useCalendar } from '@/store/zustand/calendar';
import { useItemSelection } from '@/hooks/share/useItemSelection';
import { isHoliday } from 'holiday-kr';
import { useEffect, useMemo, useState } from 'react';
import { saveSchedules } from "@/features/schedule/api/scheduleApi";
import { useUserInformation } from "@/store/zustand/userInfo";
import dayjs from 'dayjs';
import { useFetchCalendar } from '@/store/react-query/page';
import { RequestSchedule, ScheduleDateOfKey } from '@/model/types/schedule/type';

export default function useSchedule(){
    const {currentDate ,prevMonth, nextMonth, prevYear, nextYear, mode, setMode} = useCalendar()
    const daysInMonth = dayjs(currentDate).daysInMonth(); //해당 달의 일수 (4월 =>30)
    const startDayOfWeek = dayjs(currentDate).startOf('month').day() //시작하는 요일
    const endDayOfWeek = dayjs(currentDate).endOf('month').day() // 끝나는 요일
    const {user} = useUserInformation()
    const {data, refetch} = useFetchCalendar( user.userId, currentDate.getFullYear())
    const [scheduleStore, setScheduleStore] = useState<ScheduleDateOfKey>({})
    
    const initialSchedule:ScheduleDateOfKey = useMemo(()=>(
        Object.fromEntries((data??[]).map(({date,memo,userId})=>{
            return [date,{memo,userId}]
        }))
    ),[data])

    useEffect(()=>{
        setScheduleStore(initialSchedule)
    },[data])

    const scheduleMemoHandler = (date,memo)=>{
        setScheduleStore((prev)=>{
            return {...prev, [date]:{memo,userId:user.userId}}
        })
    }

    const saveUserSchedule = async()=>{
        const diffingSchedule = 
            Object.entries(scheduleStore).filter(([key,value])=>{
                return !initialSchedule[key] ? true :  initialSchedule[key].memo!== value.memo
            }).map((schedule)=>{
                return {
                    date: new Date(schedule[0]),
                    memo: schedule[1].memo,
                    userId: schedule[1].userId
                }
            }) as RequestSchedule[]

        if(diffingSchedule.length>0){
            await saveSchedules(diffingSchedule).then((res)=>{
                window.alert('저장이 완료되었습니다.')
                refetch()
            })
        }else{
            window.alert('변경된 일정이 없습니다.')
        }
       
    }

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
            date:dayjs(currentDate).set('date',day).format('YYYY-MM-DD'),
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


    return{
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
    }
}