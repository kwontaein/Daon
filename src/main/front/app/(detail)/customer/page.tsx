
import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss'

import CustomerDetail from "@/components/main/customer/detail-view";
import CustomerForm from "@/components/main/customer/form/customer-form";
import { ResponseCustomer } from "@/model/types/customer/customer/type";
import { DetailPageProps } from "@/model/types/share/type";



export default async function CustomerDetailPage({searchParams}:DetailPageProps){
    const customerId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const customer:ResponseCustomer = await fetch("http://localhost:8080/api/getCustomer", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({customerId}),
        next: {revalidate: 1800000, tags: [`${customerId}`]} //30분마다 재검증
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
        <header className="register-header">
            <Image src={asideArrow} alt=">" width={15}/>
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