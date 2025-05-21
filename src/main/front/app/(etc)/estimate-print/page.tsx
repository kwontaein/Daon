import { getEstimateApi } from "@/features/sales/estimate/api/estimateApi"
import { getReceiptByIds } from "@/features/sales/receipt/api/receiptApi"

export default async function EstimatePrintPage({searchParams}:{searchParams:Promise<{
    estimateIds?:string[],
    receiptIds?:string[],
}>}){
    const estimateIds = (await searchParams)?.estimateIds
    const receiptIds = (await searchParams)?.receiptIds
    
    const receipts = await getReceiptByIds(receiptIds)
    // const estimate = await getEstimateApi()
    return <></>
}