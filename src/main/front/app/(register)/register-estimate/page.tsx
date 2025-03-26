import RegisterEstimate from "@/components/main/sales/estimate/form/register-estimate"
import getCompany from "@/features/staff/company/api/company-api"
import {getEstimateApi} from "@/features/sales/task-estimate/api/estimateApi"
import getTask from "@/features/sales/task/api/taskApi"
import { ResponseCompany } from "@/model/types/staff/company/type"
import { EstimateRegisterProps, ResponseEstimate } from "@/model/types/task/estimate/type"
import { ResponseTask } from "@/model/types/task/task/type"

export default async function RegisterEstimatePage({searchParams}:EstimateRegisterProps){
    const targetId = (await searchParams).taskId

    const companyList:ResponseCompany[] = await getCompany()
    const taskList:ResponseTask[] =await getTask()

    const task = taskList.find(({taskId})=>taskId ===targetId)
    
    return(
    <RegisterEstimate
        companyList={companyList}
        task={task}
        mode={'write'}/>
    )
}