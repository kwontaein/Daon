import '@/styles/form-style/form.scss'

import CustomerForm from "@/components/main/customer/form/customer-form";
import {ResponseCustomer} from "@/model/types/customer/customer/type";
import {DetailPageProps} from "@/model/types/share/type";
import {ResponseEmployee} from "@/model/types/staff/employee/type";
import { getEmployeeApi } from "@/features/staff/employee/api/employeeApi";
import { getAffiliation } from "@/features/customer/affiliation/api/customerCateApi";
import { getCustomerAPi } from "@/features/customer/customer/api/searchCustomerApi";
import MobileModal from "@/components/share/mobile-modal/page";


export default async function CustomerDetailPage({searchParams}: DetailPageProps) {
    const customerId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const customer: ResponseCustomer = await getCustomerAPi(customerId)

    
    const affiliation = await getAffiliation()
    const employees: ResponseEmployee[] = await getEmployeeApi()


    return  (
        <MobileModal>
            <CustomerForm
                affiliation={affiliation}
                customer={customer}
                employees={employees}
                mode={mode}
                isMobile={true}/>        
        </MobileModal>
    )

}