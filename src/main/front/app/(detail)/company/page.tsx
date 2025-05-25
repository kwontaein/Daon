
import Image from "next/image";
import asideArrow from '@/public/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss'

import { DetailPageProps } from "@/model/types/share/type";
import { ResponseCompany } from "@/model/types/staff/company/type";
import CompanyDetail from "@/components/main/staff/company/detail-view";
import CompanyForm from "@/components/main/staff/company/form/company-form";
import { notFound } from "next/navigation";
import { getCompanyDetail } from "@/features/staff/company/api/company-api";



export default async function CompanyDetailPage({searchParams}:DetailPageProps){
    const companyId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const company:ResponseCompany = await getCompanyDetail(companyId)
    if(!company){
        return notFound()
    }

    return(
        <>
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>
                    {mode === 'detail' && '회사정보 상세보기'}
                    {mode === 'edit' && '회사정보 수정하기'}
                </h4>
            </header>
            {mode ==='detail' ?
             <CompanyDetail company={company}/>
             :
             <CompanyForm company={company}/>
            }
        </>
       
    )
}