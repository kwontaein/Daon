'use client'
import useRouterPath from "@/hooks/share/useRouterPath";
import { ResponseReceipt } from "@/model/types/sales/receipt/type";
import { useDailySummary } from "@/store/zustand/receipt-search";
import dayjs from "dayjs";
import { startTransition, useMemo, useRef, useState } from "react";

export const todayReceiptSearch ={
    category:'EX',
    searchSDate: dayjs().format('YYYY-MM-DD'),
    searchEDate:dayjs().format('YYYY-MM-DD'),
    customerId: '',
    stockId: '',
    customerName: '',
    productName: '',
}

export default function useReceiptSearch(action){
    const today =dayjs(new Date(Date.now())).format('YYYY-MM-DD')
    const {updateSearchDate} = useDailySummary()

    const [receiptList, setReceiptList] = useState<ResponseReceipt[]>()    
    const redircet = useRouterPath()

    //오늘일자보기
    const todayReceipt = ()=>{
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            Object.entries(todayReceiptSearch).forEach(([key,value])=>{
                formData.set(key, value.toString())
            })
            formData.set('action','submit')
            startTransition(() => {
                action(formData)
            })
        }

        updateSearchDate(today)

    }
    //일일종합검색
    const dailySummary =()=>{
        redircet('/daily-summary')
    }

    const formRef = useRef(null)

   return{
    receiptList,
    formRef,
    todayReceipt,
    dailySummary,
    setReceiptList
   }
}