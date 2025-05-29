import LedgerEtcSearch from "@/components/main/ledger/ledger-etc/search";
import { getAffiliation } from "@/features/customer/affiliation/api/server-api";
import { getStockCateApi } from "@/features/stock/category/api/server-api";
import {AffiliationType} from "@/model/types/customer/affiliation/type";

export default async function LedgerEtcPage(){
      
    const affiliations:AffiliationType[] = await getAffiliation()
    const stockCates = await getStockCateApi()

    return(
        <section>
            <LedgerEtcSearch affiliations={affiliations} stockCates={stockCates}/>
        </section>
    )
}