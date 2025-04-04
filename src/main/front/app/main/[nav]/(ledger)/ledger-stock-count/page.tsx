import LedgerStockCountSearch from "@/components/main/ledger/ledger-stock-count/search";
import { getStockCateApi } from "@/features/stock/category/api/stockCateApi";

export default async function LedgerStockCountPage(){
    
    const stockCates = await getStockCateApi()

    return(
        <LedgerStockCountSearch stockCates={stockCates}/>
    )
}