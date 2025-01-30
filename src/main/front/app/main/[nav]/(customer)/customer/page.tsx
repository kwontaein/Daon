import CustomerSearch from "@/components/main-view/customer/search";
import CustomerSearchResult from "@/components/main-view/customer/search-result";

export default function CustomerPage(){
    return(
        <section>
            <CustomerSearch/>
            <CustomerSearchResult/>
        </section>
    )
}