import ReceiptSearch from "@/components/main-view/sales/receipt/search/search";
import ReceiptButtons from "@/components/main-view/sales/receipt/total-buttons";
import ReceiptTableContainer from "@/components/main-view/sales/receipt/table/table-header";

import '@/styles/_global.scss';
import { ReceiptDummy } from "@/constants/receipt/receipt-dummy";
import ReceiptSearchResult from "@/components/main-view/sales/receipt/search/search-result";
import Pagination from "@/components/pagination";

type ReceiptPageProps ={
    searchParams: Promise<{
        page :number |undefined,
    }>
}

export default async function ReceiptPage({searchParams}:ReceiptPageProps) {
    const page = (await searchParams).page || 1;
    const newArr = ReceiptDummy.slice((page-1)*10, ((page-1)*10)+10)

    return (
        <div className="flex-row">
            <section className="full-screen">
                <ReceiptSearch/>
                <ReceiptButtons/>
                <ReceiptTableContainer>
                    {newArr.length >0 &&
                        <ReceiptSearchResult receiptList={newArr} basicIndex={(page-1)*10}/>
                    }
                </ReceiptTableContainer>
                <Pagination
                       totalItems={ReceiptDummy.length}
                       itemCountPerPage={10} 
                       pageCount={4} 
                       currentPage={Number(page)}
                />
            </section>
          
        </div>
    );
}