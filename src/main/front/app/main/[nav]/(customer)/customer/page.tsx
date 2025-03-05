import CustomerSearch from "@/components/main/customer/search";
import CustomerSearchResult from "@/components/main/customer/search-result";
import { CustomerSearchCondition } from "@/store/slice/customer-search";
import { CustomerCate } from "@/model/types/customer/cate/type";
import { RequestCustomer, ResponseCustomer } from "@/model/types/customer/customer/type";
import { PageByProps } from "@/model/types/share/type";
import { Suspense } from "react";




const allCustomerRequestBody:CustomerSearchCondition ={
    category: null,
    cateId:null,
    searchTarget :'all',
    customerName: null,
    ceo:null,
}
export default async function CustomerPage({searchParams}:PageByProps) {
    const page = (await searchParams).page || 1;

    const controller = new AbortController();
    const signal = controller.signal;//작업 취소 컨트롤
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    
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

    const initialCustomers:ResponseCustomer[] = await fetch("http://localhost:8080/api/getCustomers", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(allCustomerRequestBody),
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
        <section>
            <Suspense fallback={<div>loading..</div>}>
                <CustomerSearch customerCate={customerCate}  initialCustomers={initialCustomers} page={page}/>
            </Suspense>
        </section>
    )
}