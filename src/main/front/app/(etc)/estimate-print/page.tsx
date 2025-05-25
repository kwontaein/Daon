import EstimatePrintWrapper from "@/components/estimate-print/print-wrapper"
import { getEstimateApi } from "@/features/sales/estimate/api/estimateApi"
import { getReceiptByIds } from "@/features/sales/receipt/api/receiptApi"
import { getCompany } from "@/features/staff/company/api/company-api"


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