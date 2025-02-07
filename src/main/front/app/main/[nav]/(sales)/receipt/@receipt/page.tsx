import ReceiptSearch from "@/components/main-view/sales/receipt/search/search";
import ReceiptButtons from "@/components/main-view/sales/receipt/total-buttons";
import ReceiptTableContainer from "@/components/main-view/sales/receipt/table/table-header";

import '@/styles/_global.scss';
import {ReceiptDummy} from "@/constants/receipt/receipt-dummy";
import ReceiptSearchResult from "@/components/main-view/sales/receipt/search/search-result";
import Pagination from "@/components/pagination";
import {ReceiptPageProps} from "@/types/receipt/type";
import axios from "axios";
import {randomUUID} from "node:crypto";


export default async function ReceiptPage({searchParams}: ReceiptPageProps) {
    const page = (await searchParams).page || 1;
    const newArr = ReceiptDummy.slice((page - 1) * 10, ((page - 1) * 10) + 10)

    /**
     * 테스트
     */
    /* const response = await axios.post("http://localhost:8080/api/saveReceipts", [{
         receiptId: null, // 전표 아이디
         estimateId: null, // 견적서 아이디
         timeStamp: "2025-02-03T10:30:00", // 전표 등록일
         category: "SALE", // 전표 분류 (ENUM 사용)
         customerId: "8c30114d-de15-11ef-9723-d8bbc19e908c", // 고객 아이디
         itemNumber: "7f1cfad5-de10-11ef-9723-d8bbc19e908c", // 품목 번호
         quantity: "1", // 사용 품목 수량
         totalPrice: "176000", // 품목 총 가격
         description: "테스트용", // 전표 설명 (적요)
     }]);
     console.log("서버 요청 결과:", response.data);*/


    /*  const response2 = await axios.post("http://localhost:8080/api/", {});
      console.log("서버 요청 결과:", response2.data);*/

    return (
        <div className="flex-row">
            <section className="full-screen">
                <ReceiptSearch/>
                <ReceiptButtons/>
                <ReceiptTableContainer>
                    {newArr.length > 0 &&
                        <ReceiptSearchResult receiptList={newArr} basicIndex={(page - 1) * 10}/>
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