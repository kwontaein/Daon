import LedgerCustomerSearch from "@/components/main/ledger/ledger-customer/search";
import LedgerEtcSearch from "@/components/main/ledger/ledger-etc/search";
import { getAffiliation } from "@/features/customer/affiliation/api/customerCateApi";
import { getStockCateApi } from "@/features/stock/category/api/stockCateApi";
import {Affiliation} from "@/model/types/customer/affiliation/type";

export default async function LedgerEtcPage(){
      
    const affiliations:Affiliation[] = await getAffiliation()
    const stockCates = await getStockCateApi()

    return(
        <section>
            <LedgerEtcSearch affiliations={affiliations} stockCates={stockCates}/>
        </section>
    )
}