import TransPaid from "@/components/main/accounting/trans-paid"
import MobileModal from "@/components/share/mobile-modal/page"
import { AccountingDivision } from "@/model/types/accounting/type"
import { notFound } from "next/navigation"

export default async function TransEstimatePage({searchParams} : {
    searchParams:Promise<{
        division: keyof typeof AccountingDivision,
        target:string
    }>
}) {
    const division = (await searchParams).division||''
    const id = (await searchParams).target||''

    if(!id || !division){
        notFound()
    }

    return (
        <MobileModal>
            <TransPaid division={division} id={id} isMobile={true}/>    
        </MobileModal>
    )
}
