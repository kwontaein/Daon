import AccountingForm from "@/components/main/accounting/accounting-form";
import { getCategorySelectionApi } from "@/features/accounting/api/accountingApi";
import { AccountingDivision } from "@/model/types/accounting/type";
import { notFound } from "next/navigation";

export default async function RegisterAccountingPage({searchParams}:{
    searchParams:Promise<{
        division:string
    }>
}){
    const division = (await searchParams).division
    const categorySelections = await getCategorySelectionApi()

    if(!['bills','card','proof','pset','pvat','svat'].includes(division)){
        notFound()
    }
    return <AccountingForm mode="write" division={division as AccountingDivision} categorySelections={categorySelections}/>
}