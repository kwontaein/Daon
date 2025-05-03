
import Image from "next/image";
import asideArrow from '@/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss'

import { DetailPageProps } from "@/model/types/share/type";
import { ResponseCompany } from "@/model/types/staff/company/type";
import CompanyDetail from "@/components/main/staff/company/detail-view";
import CompanyForm from "@/components/main/staff/company/form/company-form";
import { notFound } from "next/navigation";
import MobileModal from "@/components/share/mobile-modal/page";



export default async function CompanyDetailPage({searchParams}:DetailPageProps){
    const companyId = (await searchParams).target || ''
    const mode = (await searchParams).mode || 'detail';

    const company:ResponseCompany = await fetch("http://localhost:8080/api/getCompanyDetail", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({companyId}),
        next: {revalidate: 1800, tags: [`${companyId}`]} //30분마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
            if(error.name=== 'AbortError'){
                console.log('Fetch 요청이 시간초과되었습니다.')
            }
            console.error('Error:', error)
    })
    if(!company){
        return notFound()
    }

    return(
        <MobileModal>
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
        </MobileModal>
       
    )
}