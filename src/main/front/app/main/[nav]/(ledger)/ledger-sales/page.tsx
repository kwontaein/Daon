import LedgerSaleReceiptSearch from "@/components/main/ledger/ledger-sales/search";
import { getAffiliation } from "@/features/customer/affiliation/api/server-api";
import { getStockCateApi } from "@/features/stock/category/api/server-api";
import { Affiliation } from "@/model/types/customer/affiliation/type";

export default async function LedgerSalesPage(){
    const affiliations:Affiliation[] = await getAffiliation()
    const stockCates = await getStockCateApi()

    return(
        <LedgerSaleReceiptSearch affiliations={affiliations} stockCates={stockCates}/>
    )
}