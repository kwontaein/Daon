import CustomerSearch from "@/components/main-view/customer/search";
import CustomerSearchResult from "@/components/main-view/customer/search-result";
import Pagination from "@/components/pagination";
import { RequestCustomer, ResponseCustomer, CustomerPageProps } from "@/types/customer/type";


const allRequestData:{params:RequestCustomer} = {params:{
    customerId: null, 
    customerName: null,
    contactInfo: null,
    category: null,
    phoneNumber: null,
    fax: null,
    userId: null,
    cateId: null}}

export default async function CustomerPage({searchParams}:CustomerPageProps) {
    const page = (await searchParams).page || 1;


    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(()=> controller.abort(), 10000)
    const customers:ResponseCustomer[] = await fetch("http://localhost:8080/api/getCustomers", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(allRequestData),
        signal,
        next: {revalidate: 36000, tags: ['customers']} //1시간마다 재검증
    }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).catch((error) => {
            if(error.name=== 'AbortError'){
                console.log('Fetch 요청이 시간초과되었습니다.')
            }
            console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));


    const pageByCustomers = customers.slice((page-1)*20, ((page-1)*20)+20)
    return (
        <section>
            <CustomerSearch/>
            <CustomerSearchResult customers={pageByCustomers}/>
            <Pagination
                       totalItems={customers.length}
                       itemCountPerPage={20} 
                       pageCount={5} 
                       currentPage={Number(page)}
                />
        </section>
    )
}