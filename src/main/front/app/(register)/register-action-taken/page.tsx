import ActionTaken from "@/components/main/sales/task/action-taken/action-taken";
import ActionTakenContent from "@/components/main/sales/task/action-taken/content";
import { getTaskApi } from "@/features/sales/task/api/taskApi";
import { ResponseTask } from "@/model/types/sales/task/type";
export default async function RegisterActionTaken({searchParams} : {
    searchParams: Promise < {
        taskId: string
    }>
}) {
    const taskId = (await searchParams).taskId;

    const task:ResponseTask = await getTaskApi(taskId)
    return(
        <ActionTaken taskId={taskId}>
            <ActionTakenContent details={task?.details} actionTaken={task?.actionTaken} mode='write'/>
        </ActionTaken>
    )
}