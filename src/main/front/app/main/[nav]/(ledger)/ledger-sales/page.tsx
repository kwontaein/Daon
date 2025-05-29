import LedgerSaleReceiptSearch from "@/components/main/ledger/ledger-sales/search";
import { getAffiliation } from "@/features/customer/affiliation/api/server-api";
import { getStockCateApi } from "@/features/stock/category/api/server-api";
import { AffiliationType } from "@/model/types/customer/affiliation/type";

export default async function LedgerSalesPage(){
    const affiliations:AffiliationType[] = await getAffiliation()
    const stockCates = await getStockCateApi()

    return(
        <LedgerSaleReceiptSearch affiliations={affiliations} stockCates={stockCates}/>
    )
}