import PermissionManagementForm from "@/components/main/staff/employee/employee-permission-form";
import EmployeeTable from "@/components/main/staff/employee/employee-table";
import CustomLoading from "@/components/share/loading/loading";
import { getEmployeeApi, getEnableUrl } from "@/features/staff/employee/api/server-api";
import { getUserInfo } from "@/features/user/userApi";
import { EmployeeClassEnum, ResponseEmployee, UserRoleEnum } from "@/model/types/staff/employee/type";
import { notFound } from "next/navigation";
import { Suspense } from "react";


export default async function EmployeePage({searchParams} : {
    searchParams:Promise<{
        page:number,
        permissionTarget?:string
    }>
}) {
    const page = (await searchParams).page ||1
    const permissionTarget= (await searchParams).permissionTarget

    const initialEmployee:ResponseEmployee[] = await getEmployeeApi()
    const userInfo = await getUserInfo()


    //permissionTarget이 존재하면 권한관리 창으로 전환
    if(permissionTarget!==undefined){
        //관리자나 매니저가 아니면 notFound
        if(!(UserRoleEnum[userInfo.userRole]==='관리자' || UserRoleEnum[userInfo.userRole]==='매니저')){
            notFound()
        }
        const findEmployee = initialEmployee.find(({userId})=>userId===permissionTarget.trim())
        const {userId, name} = findEmployee
        if(userId && name){
            const initialPermission = await getEnableUrl(userId)
            return <PermissionManagementForm userId={userId} userName={name} initialPermission={initialPermission}/>
        }
    }
    
    return(
        <section>
            <Suspense fallback={<CustomLoading content="직원 정보를 불러오고 있습니다."/>}>
                <EmployeeTable initialEmployee={initialEmployee} page={page}/>
            </Suspense>
        </section>
    )
}