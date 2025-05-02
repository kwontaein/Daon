'use client'
import Calendar from "@/components/main/sales/receipt/aside/calendar";
import DateSummary from "@/components/main/sales/receipt/aside/date-summary";
import { getRecieptTotalApi } from "@/features/sales/receipt/api/receiptApi";
import { ResponseReceiptTotal } from "@/model/types/sales/receipt/type";

import { useDailySummary } from "@/store/zustand/receipt-search";
import '@/styles/_global.scss'
import '@/styles/main-view/daily-summary.scss'
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";


export default function DailySummaryPage(){
    const router = useRouter();

    const {date, updateSearchDateId} = useDailySummary()
    const [receiptTotal, setReceiptTotal] =useState<ResponseReceiptTotal>()

    const searchSummary = useCallback(()=>{
        getRecieptTotalApi(date).then((res)=>{
            setReceiptTotal(res)
            updateSearchDateId()
        })
    },[date])

    return(
        <section className="modal-background" style={{zIndex:'1002'}}>
            <div className="daily-summary-container">
                <div className="daily-summary-header">
                     <h3>일일종합검색</h3>
                </div>
                <div className="daily-summary-wrapper">
                    <Calendar/>
                    <DateSummary receiptTotal={receiptTotal}/>
                </div>
                <div className="summary-button-container">
                    <button onClick={searchSummary}>
                        조회
                    </button>
                    <button onClick={()=>router.back()}>
                        닫기
                    </button>
                </div>
            </div>
        </section>
    )
}