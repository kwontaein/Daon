import ReceiptSearch from "@/components/main/sales/receipt/search/search";
import ReceiptButtons from "@/components/main/sales/receipt/total-buttons";
import ReceiptTableContainer from "@/components/main/sales/receipt/table/table-header";

import '@/styles/_global.scss';
import ReceiptSearchResult from "@/components/main/sales/receipt/search/search-result";
import Pagination from "@/components/share/pagination";
import { PageByProps } from "@/model/types/share/type";
import { getReceiptListApi } from "@/features/sales/receipt/api/receiptApi";
import { ReceiptCategory } from "@/model/types/receipt/type";

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
    const pageByReceipt = initialReceipt.slice((page - 1) * 10, ((page - 1) * 10) + 10)



    console.log(initialReceipt)
    return (
        <div className="flex-row">
            <section className="full-screen">
                <ReceiptSearch/>
                <ReceiptButtons/>
                <ReceiptTableContainer>
                    {pageByReceipt.length > 0 &&
                        <ReceiptSearchResult pageByReceipt={pageByReceipt} basicIndex={(page - 1) * 10}/>
                    }
                </ReceiptTableContainer>
                <Pagination
                    totalItems={initialReceipt.length}
                    itemCountPerPage={10}
                    pageCount={4}
                    currentPage={Number(page)}
                />
            </section>

        </div>
    );
}