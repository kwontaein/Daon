
import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/main-view/register/register.scss'

import { DetailPageProps } from "@/model/types/share/type";
import { ResponseStaff } from "@/model/types/staff/staff/type";
import StaffDetailView from "@/components/main/staff/staff/detail-view";
import StaffForm from "@/components/main/staff/staff/form/staff-form";
import { Dept } from "@/model/types/staff/dept/type";



export default async function StaffDetailPage({searchParams}:DetailPageProps){
    const userId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const dept:Dept[] = await fetch("http://localhost:8080/api/getDept",
        {
            cache:'force-cache',
            next: { tags: ['dept']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

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
            <header className="register-header">
                <Image src={asideArrow} alt=">" />
                    <h4>
                        {mode === 'detail' && '사용자정보 상세보기'}
                        {mode === 'edit' && '사용자정보 수정하기'}
                    </h4>
            </header>
            {mode ==='detail' ?
             <StaffDetailView staff={staff}/>
             :
             <StaffForm staff={staff} dept={dept}/>
            }
        </>
       
    )
}