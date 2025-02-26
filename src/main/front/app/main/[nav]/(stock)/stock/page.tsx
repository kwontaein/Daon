import StockSearch from "@/components/main-view/stock/stock/search";
import StockSearchResult from "@/components/main-view/stock/stock/search-result";
import { ResponseStock, StockPageProps } from "@/types/stock/types";
import { Suspense } from "react";

const allStockRequestBody ={
    stockUseEa: true,  // 재고 관리 여부
    remain: false,  // 재고 있는 품목만 검색할 때 사용 (검색 조건에 따라 달라짐)
    receiptCategory: 'DEPOSIT',  // "관리비"에 해당하는 enum 또는 문자열
    condition:false,
}

export default async function StockPage({searchParams}:StockPageProps){
    const page = (await searchParams).page || 1;
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    //getStockCate
    const InitStockCate = await fetch("http://localhost:8080/api/getStockCateList",
        {
            cache:'force-cache',
            next: { tags: ['stocksCate']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    //getStocks
    const initialStocks:ResponseStock[] = await fetch("http://localhost:8080/api/getStockList", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(allStockRequestBody),
        signal,
        // cache:'no-store'
        next: {revalidate: 360000, tags: ['stock']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
            if(error.name=== 'AbortError'){
                console.log('Fetch 요청이 시간초과되었습니다.')
            }
            console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));

    return(
        <section>
            <StockSearch stockCate={InitStockCate}/>
            <Suspense fallback={<div>loading...</div>}>
                <StockSearchResult initialStocks={initialStocks} page={page}/>
            </Suspense>
        </section>
    )
}