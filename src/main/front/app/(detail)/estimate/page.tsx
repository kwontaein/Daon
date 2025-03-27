import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss'

import { EstimateRegisterProps, ResponseEstimate } from "@/model/types/sales/estimate/type";
import { ResponseCompany } from "@/model/types/staff/company/type";
import { ResponseTask } from "@/model/types/sales/task/type";
import getCompany from "@/features/staff/company/api/company-api";
import {getTaskApi} from "@/features/sales/task/api/taskApi";
import { getEstimateApi } from "@/features/sales/estimate/api/estimateApi";
import RegisterEstimate from "@/components/main/sales/estimate/form/register-estimate";

export default async function EstimateDetailPage({searchParams}:EstimateRegisterProps){
    const estimateId = (await searchParams).target ||''
    const mode = (await searchParams).mode || 'detail'

    let estimate:ResponseEstimate = await getEstimateApi(estimateId);
    const companyList:ResponseCompany[] = await getCompany()
    return (
        <RegisterEstimate
            companyList={companyList}
            estimate={estimate}
            mode={mode}
            key={JSON.stringify(estimate+mode)}/>
    )
}