import CustomerSearch from "@/components/main-view/customer/search";
import CustomerSearchResult from "@/components/main-view/customer/search-result";

export default async function CustomerPage() {
    const response = await fetch('http://localhost:8080/api/getCustomers', {
        cache: 'no-store',
    });

    console.log(response)
    return (
        <section>
            <CustomerSearch/>
            <CustomerSearchResult/>
        </section>
    )
}