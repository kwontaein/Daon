import LedgerCustomerSearch from "@/components/main/ledger/ledger-customer/search";
import FilterButton from "@/components/share/filter/filter";
import { CustomerAffiliation} from "@/model/types/customer/affiliation/type";

export default async function LedgerCustomerPage(){
      
    const affiliations:CustomerAffiliation[] = await fetch("http://localhost:8080/api/getAffiliation",{
        next: {revalidate: 360000, tags: ['affiliation']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {console.error('Error:', error)})

    return(
        <section>
            <LedgerCustomerSearch affiliations={affiliations}/>
            <FilterButton>
                <div>Filter</div>
            </FilterButton>
        </section>
    )
}