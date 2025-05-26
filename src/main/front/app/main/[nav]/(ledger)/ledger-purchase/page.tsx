import LedgerPurchaseSearch from "@/components/main/ledger/ledger-purchase/search";
import { getStockCateApi } from "@/features/stock/category/api/server-api";

export default async function LedgerPurchasePage(){
      
    const stockCates = await getStockCateApi()

    return(
        <section>
            <LedgerPurchaseSearch stockCates={stockCates}/>
        </section>
    )
}