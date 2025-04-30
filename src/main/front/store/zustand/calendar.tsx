import dayjs from "dayjs"
import { create } from "zustand"

export type CalendarType={
    currentDate:Date,
    prevMonth:()=>void,
    nextMonth:()=>void,
    nextYear:()=>void,
    prevYear:()=>void,
    setDate :(date:Date)=>void,
    setMode:(mode:'month'|'year')=>void,
    mode:'month'|'year'
}

export const useCalendar = create<CalendarType>(set=>({
    currentDate:new Date(Date.now()),
    prevMonth: () => {
        set((state) => ({
          currentDate: dayjs(state.currentDate).subtract(1, 'month').toDate(),
        }));
    },
    nextMonth: () => {
        set((state) => ({
          currentDate: dayjs(state.currentDate).add(1, 'month').toDate(),
        }));
    },
    prevYear: () => {
        set((state) => ({
            currentDate: dayjs(state.currentDate).subtract(1, 'year').toDate(),
        }));
    },    
    nextYear: () => {
        set((state) => ({
          currentDate: dayjs(state.currentDate).add(1, 'year').toDate(),
        }));
    },
    setDate: (date) =>{
        set(()=>({
            currentDate:date
        }))
    },
    setMode: (mode:'month'|'year')=>{
        if(mode!=='month' && mode!=='year') return
        set(()=>({
            mode:mode
        }))
    },

    mode:'month'
}))
