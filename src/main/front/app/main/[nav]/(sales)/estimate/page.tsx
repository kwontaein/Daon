import '@/styles/_global.scss';

import { PageByProps } from "@/model/types/share/type";
import EstimateSearch from "@/components/main/sales/estimate/search/estimate-search";
import { ResponseCompany } from '@/model/types/staff/company/type';
import {getCompany} from '@/features/staff/company/api/server-api';
import { searchAllEstimateApi } from '@/features/sales/estimate/api/server-api';


export default async function TaskEstimatePage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;
    const initialEstimate = await searchAllEstimateApi(false)
    const companyList:ResponseCompany[] = await getCompany()

    return <EstimateSearch
                initialEstimate={initialEstimate}
                companyList={companyList}
                page={page}
                isTask={false}/>
}