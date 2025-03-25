'use client'
import { initialReceiptSearch } from "@/features/sales/receipt/action/receiptSearchAction";
import { ResponseReceipt } from "@/model/types/receipt/type";
import { updateSearchDate } from "@/store/slice/receipt-search";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function useReceiptSearch(initialReceipts,page,action){
    const dispatch = useDispatch()
    const today =dayjs(new Date(Date.now())).format('YYYY-MM-DD')
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter();


    const [receiptList, setReceiptList] = useState<ResponseReceipt[]>(initialReceipts)    
    const pageByReceipt = useMemo(()=> receiptList.slice((page - 1) * 10, ((page - 1) * 10) + 10),[receiptList, page])



    //오늘일자보기
    const todayReceipt = ()=>{
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            Object.entries(initialReceiptSearch).forEach(([key,value])=>{
                formData.set(key, value.toString())
            })
            formData.set('action','submit')
            startTransition(() => {
                action(formData)
            })
        }

        dispatch(updateSearchDate(today))
        const params = new URLSearchParams(searchParams.toString()); 
        params.delete("page"); 
        router.push(`${pathname}?${params.toString()}`); 
    }
    //일일종합검색
    const dailySummary =()=>{
        const params = new URLSearchParams(searchParams.toString()); 
        router.push(`${pathname}/daily-summary?${params.toString()}`); 
    }

    const formRef = useRef(null)

   return{
    receiptList,
    pageByReceipt,
    formRef,
    todayReceipt,
    dailySummary,
    setReceiptList
   }
}