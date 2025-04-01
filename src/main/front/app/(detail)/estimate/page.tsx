import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss'

import { ResponseEstimate } from "@/model/types/sales/estimate/type";
import { ResponseCompany } from "@/model/types/staff/company/type";
import getCompany from "@/features/staff/company/api/company-api";
import { getEstimateApi } from "@/features/sales/estimate/api/estimateApi";
import RegisterEstimate from "@/components/main/sales/estimate/form/register-estimate";
import { DetailPageProps } from "@/model/types/share/type";

export default async function EstimateDetailPage({searchParams}:DetailPageProps){
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