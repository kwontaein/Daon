import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss'

import CustomerDetail from "@/components/main/customer/detail-view";
import CustomerForm from "@/components/main/customer/form/customer-form";
import {ResponseCustomer} from "@/model/types/customer/customer/type";
import {DetailPageProps} from "@/model/types/share/type";
import {ResponseEmployee} from "@/model/types/staff/employee/type";
import { getEmployeeApi } from "@/features/staff/employee/api/employeeApi";
import { getAffiliation } from "@/features/customer/affiliation/api/customerCateApi";
import { getCustomerAPi } from "@/features/customer/customer/api/searchCustomerApi";


export default async function CustomerDetailPage({searchParams}: DetailPageProps) {
    const customerId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const customer: ResponseCustomer = await getCustomerAPi(customerId)

    
    const affiliation = await getAffiliation()
    const employees: ResponseEmployee[] = await getEmployeeApi()


    return  <CustomerForm affiliation={affiliation} customer={customer} employees={employees} mode={mode}/>

}