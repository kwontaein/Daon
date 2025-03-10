
import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss'

import { DetailPageProps } from "@/model/types/share/type";
import { ResponseEmployee } from "@/model/types/staff/employee/type";
import EmployeeDetailView from "@/components/main/staff/employee/detail-view";
import EmployeeForm from "@/components/main/staff/employee/form/employee-form";
import { Dept } from "@/model/types/staff/dept/type";



export default async function EmployeeDetailPage({searchParams}:DetailPageProps){
    const employeeId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const dept:Dept[] = await fetch("http://localhost:8080/api/getDept",
        {
            cache:'force-cache',
            next: { tags: ['dept']} 
        }
    )
    .then((response)=> response.json())
    .catch((error) => console.error('Error:', error));

    const employee:ResponseEmployee = await fetch("http://localhost:8080/api/getEmployeeDetail", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({employeeId}),
        next: {revalidate: 1800000, tags: [`${employeeId}`]} //30분마다 재검증
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
                <Image src={asideArrow} alt=">" width={15}/>
                    <h4>
                        {mode === 'detail' && '사용자정보 상세보기'}
                        {mode === 'edit' && '사용자정보 수정하기'}
                    </h4>
            </header>
            {mode ==='detail' ?
             <EmployeeDetailView employee={employee}/>
             :
             <EmployeeForm employee={employee} dept={dept}/>
            }
        </>
       
    )
}