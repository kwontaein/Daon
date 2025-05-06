import EmployeeTable from "@/components/main/staff/employee/employee-table";
import CustomLoading from "@/components/share/loading/loading";
import { getEmployeeApi } from "@/features/staff/employee/api/employeeApi";
import { PageByProps } from "@/model/types/share/type";
import { ResponseEmployee } from "@/model/types/staff/employee/type";
import { Suspense } from "react";


export default async function StaffPage({searchParams}:PageByProps){
    const page = (await searchParams).page ||1
    const controller = new AbortController();

    const initialEmployee:ResponseEmployee[] = await getEmployeeApi()
    return(
        <section>
            <Suspense fallback={<CustomLoading content="직원 정보를 불러오고 있습니다."/>}>
                <EmployeeTable initialEmployee={initialEmployee} page={page}/>
            </Suspense>
        </section>
    )
}