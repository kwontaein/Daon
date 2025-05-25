import TransEstimate from "@/components/main/sales/estimate/form/trans-estimate"
import MobileModal from "@/components/share/mobile-modal/page"
import { DetailPageProps } from "@/model/types/share/type"
import { notFound } from "next/navigation"

export default async function TransEstimatePage({searchParams} : DetailPageProps) {
    const estimateId = (await searchParams).target||''
    if(!estimateId){
        notFound()
    }
    
    return (
        <MobileModal>
            <TransEstimate estimateId={estimateId} isMobile={true}/>
        </MobileModal>
    )
}
