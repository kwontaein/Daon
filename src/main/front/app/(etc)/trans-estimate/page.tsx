import TransEstimate from "@/components/main/sales/estimate/form/trans-estimate"
import { DetailPageProps } from "@/model/types/share/type"
import { notFound } from "next/navigation"

export default async function TransEstimatePage({searchParams} : DetailPageProps) {
    const estimateId = (await searchParams).target||''
    if(!estimateId){
        notFound()
    }

    return <TransEstimate estimateId={estimateId}/>
}
