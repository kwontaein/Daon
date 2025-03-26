import '@/styles/_global.scss';

import { PageByProps } from "@/model/types/share/type";
import { ReceiptCategory } from "@/model/types/receipt/type";
import TaskEstimateSearch from "@/components/main/sales/estimate/search/estimate-search";

const allSearchConditions={
    category:ReceiptCategory.EX,
    searchSDate: null,
    searchEDate: null,
    customerId: null,
    stockId: null
}

export default async function TaskEstimatePage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;
    // const initialReceipt = await getReceiptListApi(allSearchConditions)

    return <TaskEstimateSearch initialEstimateItems={[]} page={page}/>
}