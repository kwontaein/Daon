import CompanyTable from "@/components/main-view/staff/company/company-table";
import { PageByProps } from "@/types/share/type";
import { ResponseCompany } from "@/types/staff/company/type";
import { Suspense } from "react";

export default async function CompanyPage({searchParams}:PageByProps){
    const page = (await searchParams).page ||1
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    const initialCompany:ResponseCompany[] = await fetch("http://localhost:8080/api/getCompany", {
        headers: {
            'Content-Type': 'application/json',
        },
        signal,
        cache:'no-store',
        // next: {revalidate: 360000, tags: ['company']} //1시간마다 재검증
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
    }).finally(() => clearTimeout(timeoutId));

    return(
        <section>
        <Suspense fallback={<div>loading...</div>}>
            <CompanyTable initialCompany={initialCompany} page={page}/>
        </Suspense>
    </section>
    )
}