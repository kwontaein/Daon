import CustomerForm from "@/components/main/customer/form/customer-form";
import { getAffiliation } from "@/features/customer/affiliation/api/server-api";
import { getEmployeeApi } from "@/features/staff/employee/api/server-api";
import { Affiliation } from "@/model/types/customer/affiliation/type";
import { ResponseEmployee } from "@/model/types/staff/employee/type";

export default async function RegisterCustomer(){
    
    const affiliation:Affiliation[] = await getAffiliation()
    const employees:ResponseEmployee[] = await getEmployeeApi()

    return(
        <CustomerForm affiliation={affiliation} employees={employees} mode='write'/>
    )
}