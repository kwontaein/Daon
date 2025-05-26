import EstimatePrintWrapper from "@/components/estimate-print/print-wrapper"
import { getEstimateApi } from "@/features/sales/estimate/api/server-api"
import { getReceiptByIds } from "@/features/sales/receipt/api/server-api"
import { getCompany } from "@/features/staff/company/api/server-api"


export default async function EstimatePrintPage({searchParams}:{searchParams:Promise<{
    estimateId?:string,
    receiptIds?:string,
}>}){
    const estimateId = (await searchParams)?.estimateId??''
    const receiptIds = JSON.parse((await searchParams)?.receiptIds??'[]')


    const receipts = await getReceiptByIds(receiptIds)
    const estimate = await getEstimateApi(estimateId)
    const company = await getCompany()


    return <EstimatePrintWrapper receipts={receipts} estimate={estimate} companyList={company}/>
}