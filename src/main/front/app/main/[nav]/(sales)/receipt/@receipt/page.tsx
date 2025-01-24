import ReceiptSearch from "@/components/main-view/sales/receipt/search/search";
import RegisterButton from "@/components/main-view/sales/receipt/total-buttons";
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
                <RegisterButton/>
                <ReceiptTableContainer>
                    {newArr.length >0 &&
                    newArr.map((receipt, index)=>(
                        <ReceiptSearchResult receipt={receipt} index={(page-1)*10 +index} key={receipt.uuid}/>
                    ))}
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