import TaskForm from "@/components/main/sales/task/form/task-form";
import { getEmployeeApi } from "@/features/staff/employee/api/employeeApi";
import { ResponseEmployee } from "@/model/types/staff/employee/type";

export default async function RegisterTask(){
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(()=> controller.abort(), 10000)

    const employees:ResponseEmployee[] = await getEmployeeApi()

    return(
        <TaskForm employees={employees} mode="write"/>
    )
}