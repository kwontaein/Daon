import {create} from 'zustand'

import dayjs from 'dayjs'
import {v4 as uuidv4} from "uuid";


export type ReceiptSearchDate={
    date:string,
    date_id:string,
    updateSearchDate:(string)=>void,
    updateSearchDateId:()=>void,
}

export const useDailySummary = create<ReceiptSearchDate>(set =>({
    date: dayjs(new Date(Date.now())).format('YYYY-MM-DD'),
    date_id : '',
    updateSearchDate:(date)=> set({date}),
    updateSearchDateId:()=> set(()=>({date_id:uuidv4()}))
}))
