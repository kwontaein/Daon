'use client'
import Calendar from "@/components/main/sales/receipt/aside/calendar";
import DateSummary from "@/components/main/sales/receipt/aside/date-summary";
import '@/styles/_global.scss'
import '@/styles/main-view/daily-summary.scss'
import { useRouter } from "next/navigation";

export default function DailySummaryPage(){
    const router = useRouter();
    return(
        <section className="modal-background" style={{zIndex:'1002'}}>
            <div className="daily-summary-container">
                <div className="daily-summary-header">
                     <h2>일일종합검색</h2>
                </div>
                <div className="daily-summary-wrapper">
                    <Calendar/>
                    <DateSummary/>
                </div>
                <div className="summary-button-container">
                    <button>
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