
import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/components/main-view/customer/register/customer-form.scss'

import CustomerDetail from "@/components/main-view/customer/detail-view";
import CustomerForm from "@/components/main-view/customer/form/customer-form";
import { ResponseCustomer } from "@/types/customer/type";
import { DetailPageProps } from "@/types/share/type";



export default async function CustomerDetailPage({searchParams}:DetailPageProps){
    const customerId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const customer:ResponseCustomer = await fetch("http://localhost:8080/api/getCustomer", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({customerId}),
        next: {revalidate: 18000, tags: [`${customerId}`]} //30분마다 재검증
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

       
    const customerCate = await fetch("http://localhost:8080/api/getCustomerCate",{
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
        <>
        <header className="register-customer-header">
            <Image src={asideArrow} alt=">" />
                <h4>
                    {mode === 'detail' && '거래처 상세보기'}
                    {mode === 'edit' && '거래처 수정하기'}
                </h4>
            </header>
            {mode ==='detail' ?
             <CustomerDetail customer={customer}/>
             :
             <CustomerForm customerCate={customerCate} customer={customer}/>
            }
        </>
       
    )
}