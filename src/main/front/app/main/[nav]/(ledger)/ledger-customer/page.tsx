import LedgerCustomerSearch from "@/components/main/ledger/ledger-customer/search";
import { getStockCateApi } from "@/features/stock/category/api/stockCateApi";
import {Affiliation} from "@/model/types/customer/affiliation/type";

export default async function LedgerCustomerPage(){
      
    const affiliations:Affiliation[] = await fetch("http://localhost:8080/api/getAffiliation",{
        next: {revalidate: 360000, tags: ['affiliation']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {console.error('Error:', error)})

    const stockCates = await getStockCateApi()

    return(
        <section>
            <LedgerCustomerSearch affiliations={affiliations} stockCates={stockCates}/>
        </section>
    )
}