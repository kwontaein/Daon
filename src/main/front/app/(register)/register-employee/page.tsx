import EmployeeForm from "@/components/main/staff/employee/form/employee-form";
import { getDeptApi } from "@/features/staff/dept/api/deptApi";
import { Dept } from "@/model/types/staff/dept/type";

export default async function RegisterStaff(){
    const dept:Dept[] = await getDeptApi()
    
    return(
        <EmployeeForm dept={dept}/>
    )
}