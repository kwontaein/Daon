import StockSearch from "@/components/main/stock/stock/search";
import { getStockCateApi } from "@/features/stock/category/api/stockCateApi";
import { getStockListApi } from "@/features/stock/stock/api/searchStockApi";
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
    const InitStockCate = await getStockCateApi()
    //getStocks
    const initialStocks:ResponseStock[] = await getStockListApi(allStockRequestBody)


    return(
        <section>
            <Suspense fallback={<div>loading...</div>}>
                <StockSearch stockCate={InitStockCate}  initialStocks={initialStocks} page={page}/>
            </Suspense>
        </section>
    )
}