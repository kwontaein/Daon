import CustomerSearch from "@/components/main-view/customer/search";
import CustomerSearchResult from "@/components/main-view/customer/search-result";
import Pagination from "@/components/pagination";
import { PostSearchInfo } from "@/hooks/redux/slice/customer-search";
import { RequestCustomer, ResponseCustomer, CustomerPageProps } from "@/types/customer/type";


const allRequestData:RequestCustomer={
    customerId: null, 
    customerName: null,
    contactInfo: null,
    category: null,
    phoneNumber: null,
    fax: null,
    userId: null,
    cateId: null
}

const allRequestData2:PostSearchInfo ={
    category: null,
    cateId:null,
    searchTarget :'all',
    customerName: null,
    ceo:null,
}
export default async function CustomerPage({searchParams}:CustomerPageProps) {
    const page = (await searchParams).page || 1;
    const pageKey = JSON.stringify({ page }); //key값을 전달하여 리랜더 방지

    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    
    const customerCate = await fetch("http://localhost:8080/api/getCustomerCate",{
        next: {revalidate: 360000, tags: ['customers-cate']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {console.error('Error:', error)})

    const initialCustomers:ResponseCustomer[] = await fetch("http://localhost:8080/api/getCustomers", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(allRequestData),
        signal,
        next: {revalidate: 360000, tags: ['customers']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
            if(error.name=== 'AbortError'){
                console.log('Fetch 요청이 시간초과되었습니다.')
            }
            console.error('Error:', error)
    }).finally(() => clearTimeout(timeoutId));


    return (
        <section key={pageKey}>
            <CustomerSearch customerCate={customerCate}/>
            <CustomerSearchResult initialCustomers={initialCustomers} page={page}/>
        </section>
    )
}