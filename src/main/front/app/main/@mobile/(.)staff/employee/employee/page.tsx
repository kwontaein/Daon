import {DetailPageProps} from "@/model/types/share/type";
import {ResponseEmployee, UserRoleEnum} from "@/model/types/staff/employee/type";
import EmployeeForm from "@/components/main/staff/employee/form/employee-form";
import {Dept} from "@/model/types/staff/dept/type";
import { getEmployeeDetailApi } from "@/features/staff/employee/api/server-api";
import MobileModal from "@/components/share/mobile-modal/page";
import { getDeptApi } from "@/features/staff/dept/api/server-api";
import { getUserInfo } from "@/features/user/userApi";
import { notFound } from "next/navigation";


export default async function EmployeeDetailPage({searchParams}: DetailPageProps) {
    const userId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const dept: Dept[] = await getDeptApi()
    const employee: ResponseEmployee = await getEmployeeDetailApi(userId)
    const userInfo = await getUserInfo()

    if(UserRoleEnum[userInfo.userRole]!=='관리자' && userId!== userInfo.userId){
        notFound()
    }

    return (
        <MobileModal>
            <EmployeeForm employee={employee} dept={dept} userInfo={userInfo} mode={mode} isMobile={true}/>
        </MobileModal>

    )
}