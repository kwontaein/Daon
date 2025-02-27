
import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/components/main-view/staff/staff/form/staff-form.scss'

import { DetailPageProps } from "@/types/share/type";
import { ResponseStaff } from "@/types/staff/type";
import StaffDetailView from "@/components/main-view/staff/staff/detail-view";
import StaffForm from "@/components/main-view/staff/staff/form/staff-form";



export default async function StaffDetailPage({searchParams}:DetailPageProps){
    const userId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    console.log(userId)
    const staff:ResponseStaff = await fetch("http://localhost:8080/api/getEmployeeDetail", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
        next: {revalidate: 18000, tags: [`${userId}`]} //30분마다 재검증
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
        <header className="register-staff-header">
            <Image src={asideArrow} alt=">" />
                <h4>
                    {mode === 'detail' && '사용자정보 상세보기'}
                    {mode === 'edit' && '사용자정보 수정하기'}
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