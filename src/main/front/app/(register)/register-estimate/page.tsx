import EstimateHeader from "@/components/main/sales/estimate/form/estimate-header"
import {getCompany} from "@/features/staff/company/api/company-api"
import { getTaskApi } from "@/features/sales/task/api/taskApi"
import { ResponseCompany } from "@/model/types/staff/company/type"
import { EstimateRegisterProps } from "@/model/types/sales/estimate/type"
import { ResponseTask } from "@/model/types/sales/task/type"

export default async function RegisterEstimatePage({searchParams}:EstimateRegisterProps){
    const taskId = (await searchParams).taskId ||''

    const companyList:ResponseCompany[] = await getCompany()
    const task:ResponseTask =await getTaskApi(taskId)

    return(
        <EstimateHeader
            companyList={companyList}
            task={task}
            mode='write'/>
    )
}