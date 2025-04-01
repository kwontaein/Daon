import ReceiptSearch from "@/components/main/sales/receipt/search/search";

import '@/styles/_global.scss';

import { PageByProps } from "@/model/types/share/type";
import { getReceiptListApi } from "@/features/sales/receipt/api/receiptApi";
import { ReceiptCategory } from "@/model/types/sales/receipt/type";

const allSearchConditions={
    category:ReceiptCategory.EX,
    searchSDate: null,
    searchEDate: null,
    customerId: null,
    stockId: null
}

export default async function ReceiptPage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;
    const initialReceipt = await getReceiptListApi(allSearchConditions)

    return (
        <div className="flex-row">
            <section className="full-screen" key={initialReceipt}>
                <ReceiptSearch initialReceipts={initialReceipt} page={page}/>
            </section>
        </div>
    );
}