import LedgerCustomerSearch from "@/components/main-view/ledger/ledger-customer/search";
import FilterButton from "@/components/share/filter";
import { CustomerCate} from "@/types/customer/cate/type";

export default async function LedgerCustomerPage(){
      
    const customerCate:CustomerCate[] = await fetch("http://localhost:8080/api/getCustomerCate",{
        next: {revalidate: 360000, tags: ['customersCate']} //1시간마다 재검증
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
            <LedgerCustomerSearch customerCate={customerCate}/>
            <FilterButton>
                <div>Filter</div>
            </FilterButton>
        </section>
    )
}