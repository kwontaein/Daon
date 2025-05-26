import EmployeeForm from "@/components/main/staff/employee/form/employee-form";
import { getDeptApi } from "@/features/staff/dept/api/server-api";
import { getUserInfo } from "@/features/user/userApi";
import { Dept } from "@/model/types/staff/dept/type";
import { UserRoleEnum } from "@/model/types/staff/employee/type";
import { notFound } from "next/navigation";

export default async function RegisterEmployee(){
    const dept:Dept[] = await getDeptApi()
    const userInfo = await getUserInfo()

    if(UserRoleEnum[userInfo.userRole]!=='관리자'){
        notFound()
    }
    return(
        <EmployeeForm dept={dept}/>
    )
}