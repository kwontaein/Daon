import CompanyTable from "@/components/main/staff/company/company-table";
import {getCompany} from "@/features/staff/company/api/company-api";
import { PageByProps } from "@/model/types/share/type";
import { ResponseCompany } from "@/model/types/staff/company/type";
import { Suspense } from "react";

export default async function CompanyPage({searchParams}:PageByProps){
    const page = (await searchParams).page ||1
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    const initialCompany:ResponseCompany[] = await getCompany()

    return(
        <section>
        <Suspense fallback={<div>loading...</div>}>
            <CompanyTable initialCompany={initialCompany} page={page}/>
        </Suspense>
    </section>
    )
}