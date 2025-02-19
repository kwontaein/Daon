import CustomerDetail from "@/components/main-view/customer/detail-view";
import { ResponseCustomer } from "@/types/customer/type";

export default async function CustomerDetailPage({searchParams}){
    const customerId = await searchParams.target
    const customer:ResponseCustomer = await fetch("http://localhost:8080/api/getCustomer", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerId),
        cache:'no-store'
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
    })

    return(
        <CustomerDetail customer={customer}/>
    )
}