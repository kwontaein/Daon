import EmployeeTable from "@/components/main/staff/employee/employee-table";
import { getEmployeeApi } from "@/features/staff/employee/api/employeeApi";
import { PageByProps } from "@/model/types/share/type";
import { ResponseEmployee } from "@/model/types/staff/employee/type";
import { Suspense } from "react";


export default async function StaffPage({searchParams}:PageByProps){
    const page = (await searchParams).page ||1
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    const initialEmployee:ResponseEmployee[] = await getEmployeeApi()
    return(
        <section>
            <Suspense fallback={<div>loading...</div>}>
                <EmployeeTable initialEmployee={initialEmployee} page={page}/>
            </Suspense>
        </section>
    )
}