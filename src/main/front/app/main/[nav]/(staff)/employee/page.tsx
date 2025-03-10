import EmployeeTable from "@/components/main/staff/employee/employee-table";
import { PageByProps } from "@/model/types/share/type";
import { ResponseEmployee } from "@/model/types/staff/employee/type";
import { Suspense } from "react";


export default async function StaffPage({searchParams}:PageByProps){
    const page = (await searchParams).page ||1
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    const initialEmployee:ResponseEmployee[] = await fetch("http://localhost:8080/api/getEmployees", {
        headers: {
            'Content-Type': 'application/json',
        },
        signal,
        // cache:'no-store',
        next: {revalidate: 3600000, tags: ['employee']} //1시간마다 재검증
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
                <EmployeeTable initialEmployee={initialEmployee} page={page}/>
            </Suspense>
        </section>
    )
}