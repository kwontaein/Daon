import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss'

import { EstimateRegisterProps, ResponseEstimate } from "@/model/types/task/estimate/type";
import { ResponseCompany } from "@/model/types/staff/company/type";
import { ResponseTask } from "@/model/types/task/task/type";
import getCompany from "@/features/staff/company/api/company-api";
import getTask from "@/features/task/task/api/taskApi";
import { getEstimateApi } from "@/features/task/estimate/api/estimateApi";
import RegisterEstimate from "@/components/main/task/estimate/form/register-estimate";

export default async function EstimateDetailPage({searchParams}:EstimateRegisterProps){
    const targetId = (await searchParams).taskId
    const estimateId = (await searchParams).target ||''
    const mode = (await searchParams).mode || 'detail'


    let estimate:ResponseEstimate = await getEstimateApi(estimateId);
    const companyList:ResponseCompany[] = await getCompany()
    const taskList:ResponseTask[] =await getTask()

    const task = taskList.find(({taskId})=>taskId ===targetId)
    
    return (
        <RegisterEstimate
            companyList={companyList}
            task={task}
            estimate={estimate}
            mode={mode}/>
    )
}