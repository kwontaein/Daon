import LedgerCustomerSearch from "@/components/main/ledger/ledger-customer/search";
import { getAffiliation } from "@/features/customer/affiliation/api/server-api";
import { getStockCateApi } from "@/features/stock/category/api/server-api";
import {Affiliation} from "@/model/types/customer/affiliation/type";

export default async function LedgerCustomerPage(){
      
    const affiliations:Affiliation[] = await getAffiliation()
    const stockCates = await getStockCateApi()

    return(
        <section>
            <LedgerCustomerSearch affiliations={affiliations} stockCates={stockCates}/>
        </section>
    )
}