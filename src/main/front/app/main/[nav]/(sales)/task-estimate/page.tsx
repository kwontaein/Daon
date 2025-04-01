import '@/styles/_global.scss';

import { PageByProps } from "@/model/types/share/type";
import EstimateSearch from "@/components/main/sales/estimate/search/estimate-search";
import { ResponseCompany } from '@/model/types/staff/company/type';
import getCompany from '@/features/staff/company/api/company-api';
import { searchAllEstimateApi } from '@/features/sales/estimate/api/estimateApi';


export default async function TaskEstimatePage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;

    const companyList:ResponseCompany[] = await getCompany()
    const initialEstimate = await searchAllEstimateApi(true)

    return<EstimateSearch
            initialEstimate={initialEstimate}
            companyList={companyList}
            page={page}
            isTask={true}/>
}