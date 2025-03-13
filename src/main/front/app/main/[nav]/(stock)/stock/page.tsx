import StockSearch from "@/components/main/stock/stock/search";
import StockSearchResult from "@/components/main/stock/stock/search-result";
import { searchStockApi } from "@/features/stock/stock/api/searchStockApi";
import { ResponseStock, StockPageProps } from "@/model/types/stock/stock/types";
import { Suspense } from "react";

const allStockRequestBody ={
    stockUseEa: true,  // 재고 관리 여부
    remain: false,  // 재고 있는 품목만 검색할 때 사용 (검색 조건에 따라 달라짐)
    condition:false,
}

export default async function StockPage({searchParams}:StockPageProps){
    const page = (await searchParams).page || 1;

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
    const initialStocks:ResponseStock[] = await searchStockApi(allStockRequestBody)

    return(
        <section>
            <Suspense fallback={<div>loading...</div>}>
                <StockSearch stockCate={InitStockCate}  initialStocks={initialStocks} page={page}/>
            </Suspense>
        </section>
    )
}