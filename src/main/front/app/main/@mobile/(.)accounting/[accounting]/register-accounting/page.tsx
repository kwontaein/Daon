'use client'
import AccountingForm from "@/components/main/accounting/accounting-form";
import MobileModal from "@/components/share/mobile-modal/page";
import { getCategorySelectionApi } from "@/features/accounting/api/accountingFormApi";
import { AccountingDivision } from "@/model/types/accounting/type";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterAccountingPage(){
    
    const searchParams = useSearchParams()
    const [categorySelections, setCategorySelections] = useState()
    const division =  searchParams.get('division')
    useEffect(()=>{
        const fetchCategory= async()=>{
            try{
                const response = await getCategorySelectionApi()
                setCategorySelections(response);
            }catch(error){
                console.error('API 오류:', error);
            }
        }
        fetchCategory()
    },[]) 

    if(!AccountingDivision[division]){
        notFound()
    }
    return (
        <MobileModal height={400}>
            {categorySelections  && <AccountingForm mode="write" division={division as keyof typeof AccountingDivision} categorySelections={categorySelections}/>}
        </MobileModal>
    )
}