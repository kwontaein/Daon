import TaskForm from "@/components/main/sales/task/form/task-form";
import { getEmployeeApi } from "@/features/staff/employee/api/server-api";
import { ResponseEmployee } from "@/model/types/staff/employee/type";

export default async function RegisterTask(){
    const employees:ResponseEmployee[] = await getEmployeeApi()

    return(
        <TaskForm employees={employees} mode="write"/>
    )
}