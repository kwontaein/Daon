import DeptTable from "@/components/main/staff/dept/dept";
import { getDeptApi } from "@/features/staff/dept/api/server-api";
import { PageByProps } from "@/model/types/share/type";


export default async function DeptPage({searchParams}:PageByProps){

    const initDept = await getDeptApi()

    return <DeptTable InitDept={initDept}/>
 
}