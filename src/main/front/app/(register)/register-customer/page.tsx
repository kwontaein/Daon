import CustomerForm from "@/components/main/customer/form/customer-form";
import { getAffiliation } from "@/features/customer/affiliation/api/customerCateApi";
import { getEmployeeApi } from "@/features/staff/employee/api/employeeApi";
import { Affiliation } from "@/model/types/customer/affiliation/type";
import { ResponseEmployee } from "@/model/types/staff/employee/type";

export default async function RegisterAffiliation(){
    
    const affiliation:Affiliation[] = await getAffiliation()
    const employees:ResponseEmployee[] = await getEmployeeApi()

    return(
        <CustomerForm affiliation={affiliation} employees={employees}/>
    )
}