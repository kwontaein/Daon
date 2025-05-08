import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss'

import {DetailPageProps} from "@/model/types/share/type";
import {ResponseEmployee} from "@/model/types/staff/employee/type";
import EmployeeDetailView from "@/components/main/staff/employee/detail-view";
import EmployeeForm from "@/components/main/staff/employee/form/employee-form";
import {Dept} from "@/model/types/staff/dept/type";
import { getEmployeeDetailApi } from "@/features/staff/employee/api/employeeApi";
import MobileModal from "@/components/share/mobile-modal/page";
import { getDeptApi } from "@/features/staff/dept/api/deptApi";


export default async function EmployeeDetailPage({searchParams}: DetailPageProps) {
    const userId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const dept: Dept[] = await getDeptApi()
    const employee: ResponseEmployee = await getEmployeeDetailApi(userId)
    
    return (
        <MobileModal >
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>
                    {mode === 'detail' && '사용자정보 상세보기'}
                    {mode === 'edit' && '사용자정보 수정하기'}
                </h4>
            </header>
            {mode === 'detail' ?
                <EmployeeDetailView employee={employee} isMobile={true}/>
                :
                <EmployeeForm employee={employee} dept={dept} isMobile={true}/>
            }
        </MobileModal>

    )
}