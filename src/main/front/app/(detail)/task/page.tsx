import TaskForm from "@/components/main/sales/task/form/task-form";
import { getTaskApi } from "@/features/sales/task/api/server-api";
import { getEmployeeApi } from "@/features/staff/employee/api/server-api";
import { DetailPageProps } from "@/model/types/share/type";
import { notFound } from "next/navigation";

export default async function TaskPage({searchParams}:DetailPageProps){
    const taskId = (await searchParams).target||'';
    const mode = (await searchParams).mode|| 'detail'

    const task = await getTaskApi(taskId)
    const employee = await getEmployeeApi()

    if((mode !=='detail' && mode!=='edit') || !task){
        return notFound()
    }

    return(
        <TaskForm employees={employee} task={task} mode={mode}/>
    )
}