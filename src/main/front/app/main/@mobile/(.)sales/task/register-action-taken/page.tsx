import ActionTaken from "@/components/main/sales/task/action-taken/action-taken";
import ActionTakenContent from "@/components/main/sales/task/action-taken/content";
import MobileModal from "@/components/share/mobile-modal/page";
import { getTaskApi } from "@/features/sales/task/api/taskApi";
import { ResponseTask } from "@/model/types/sales/task/type";
import { notFound } from "next/navigation";
export default async function RegisterActionTaken({searchParams} : {
    searchParams: Promise < {
        taskId: string
    }>
}) {
    const taskId = (await searchParams).taskId;

    if(!taskId){
        return notFound()
    }
    const task:ResponseTask = await getTaskApi(taskId)
    return(
        <MobileModal>
            <ActionTaken taskId={taskId} isMobile={true}>
                <ActionTakenContent details={task.details} actionTaken={task.actionTaken} mode='write'/>
            </ActionTaken>
        </MobileModal>
    )
}