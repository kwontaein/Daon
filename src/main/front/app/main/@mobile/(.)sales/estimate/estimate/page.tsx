import '@/styles/form-style/form.scss'

import { ResponseEstimate } from "@/model/types/sales/estimate/type";
import { ResponseCompany } from "@/model/types/staff/company/type";
import {getCompany} from "@/features/staff/company/api/server-api";
import { getEstimateApi } from "@/features/sales/estimate/api/server-api";
import EstimateHeader from "@/components/main/sales/estimate/form/estimate-header";
import { DetailPageProps } from "@/model/types/share/type";
import { notFound } from 'next/navigation';
import MobileModal from '@/components/share/mobile-modal/page';

export default async function EstimateDetailPage({searchParams}:DetailPageProps){
    const estimateId = (await searchParams).target ||''
    const mode = (await searchParams).mode || 'detail'

    let estimate:ResponseEstimate = await getEstimateApi(estimateId);
    const companyList:ResponseCompany[] = await getCompany()

    if(!['write', 'detail','edit'].includes(mode)){
        notFound()
    }
    
    return (
        <MobileModal height="550px" >
            <EstimateHeader
                companyList={companyList}
                estimate={estimate}
                mode={mode}
                isMobile={true}/>
        </MobileModal>
    )
}