import PermissionManagementForm from "@/components/main/staff/employee/employee-permission-form";
import EmployeeTable from "@/components/main/staff/employee/employee-table";
import CustomLoading from "@/components/share/loading/loading";
import { getEmployeeApi } from "@/features/staff/employee/api/employeeApi";
import { PageByProps } from "@/model/types/share/type";
import { ResponseEmployee } from "@/model/types/staff/employee/type";
import { Suspense } from "react";


export default async function StaffPage({searchParams} : {
    searchParams:Promise<{
        page:number,
        permissionTarget?:string
    }>
}) {
    const page = (await searchParams).page ||1
    const permissionTarget= (await searchParams).permissionTarget

    const initialEmployee:ResponseEmployee[] = await getEmployeeApi()

    //permissionTarget이 존재하면 권한관리 창으로 전환
    if(permissionTarget!==undefined){
        const findEmployee = initialEmployee.find(({userId})=>userId===permissionTarget.trim())
        const {userId, name} = findEmployee
        if(userId && name){
            return <PermissionManagementForm userId={userId} userName={name}/>
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