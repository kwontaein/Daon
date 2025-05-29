import '@/styles/form-style/form.scss'

import { DetailPageProps } from "@/model/types/share/type";
import { ResponseCompany } from "@/model/types/staff/company/type";
import CompanyForm from "@/components/main/staff/company/form/company-form";
import { notFound } from "next/navigation";
import { getCompanyDetail } from "@/features/staff/company/api/server-api";



export default async function CompanyDetailPage({searchParams}:DetailPageProps){
    const companyId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const company:ResponseCompany = await getCompanyDetail(companyId)
    if(!company){
        return notFound()
    }

    return <CompanyForm company={company} mode={mode}/>

}