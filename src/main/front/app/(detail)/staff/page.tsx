
import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/components/main-view/customer/register/customer-form.scss'

import CustomerDetail from "@/components/main-view/customer/detail-view";
import CustomerForm from "@/components/main-view/customer/form/customer-form";
import { ResponseCustomer } from "@/types/customer/type";
import { DetailPageProps } from "@/types/share/type";
import { ResponseStaff } from "@/types/staff/type";
import StaffDetailView from "@/components/main-view/staff/detail-view";
import StaffForm from "@/components/main-view/staff/form/staff-form";



export default async function StaffDetailPage({searchParams}:DetailPageProps){
    const staffId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const staff:ResponseStaff = await fetch("http://localhost:8080/api/getEmployeeDetail", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({staffId}),
        next: {revalidate: 18000, tags: [`${staffId}`]} //30분마다 재검증
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
        <>
        <header className="register-customer-header">
            <Image src={asideArrow} alt=">" />
                <h4>
                    {mode === 'detail' && '거래처 상세보기'}
                    {mode === 'edit' && '거래처 수정하기'}
                </h4>
            </header>
            {mode ==='detail' ?
             <StaffDetailView staff={staff}/>
             :
             <StaffForm staff={staff}/>
            }
        </>
       
    )
}