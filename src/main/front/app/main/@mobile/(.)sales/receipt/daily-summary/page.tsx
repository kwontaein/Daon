'use client'
import Calendar from "@/components/main/sales/receipt/aside/calendar";
import DateSummary from "@/components/main/sales/receipt/aside/date-summary";
import { getRecieptTotalApi } from "@/features/sales/receipt/api/client-api";
import { ResponseReceiptTotal } from "@/model/types/sales/receipt/type";

import { useDailySummary } from "@/store/zustand/receipt-search";
import '@/styles/_global.scss'
import '@/styles/main-view/daily-summary.scss'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";


export default function DailySummaryPage(){
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        const base = `/main/sales/receipt`;
        if(params.toString()){
            router.push(`${base}${params.toString()}`)
        }else{
            router.back()
        }
    };


    const {date, updateSearchDateId} = useDailySummary()
    const [receiptTotal, setReceiptTotal] =useState<ResponseReceiptTotal>()

    const searchSummary = async ()=>{
        await getRecieptTotalApi(date).then((res)=>{
            setReceiptTotal(()=>{
                return {
                    ...res,
                    date
                }
            })
            updateSearchDateId()
        })
    }

    return(
        <>
            {pathname.split('/')[4] ==='daily-summary' &&
             <section className="modal-background" style={{zIndex:'1005'}}>
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
                            <button onClick={closeModal}>
                                닫기
                            </button>
                        </div>
                    </div>
                </section>
            }
        </>
       
    )
}