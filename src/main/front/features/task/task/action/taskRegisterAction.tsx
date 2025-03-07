import {v4 as uuidv4} from "uuid";
import { saveTask } from "../api/taskApi";
import { revalidatePath } from "next/cache";

export default async function taskRegisterAction(prevState, formData){
    const TaskData ={
        taskType: formData.get('taskType'),
        customer: formData.get('customer'),
        requesterName: formData.get('requesterName'),
        requesterContact: formData.get('requesterContact'),
        requesterContact2: formData.get('requesterContact2'),
        model: formData.get('model'),
        assignedUser: formData.get('assignedUser'),
        details: formData.get('details'), //내용
        remarks: formData.get('remarks'), //비고
        customerId:formData.get('customerId') ?? prevState.customerId,
        action:formData.get('action')
    }
  
    
    if(TaskData.action ==='submit'){
        if(TaskData.assignedUser==='none'){
            return {
                ...prevState,
                ...TaskData,
                error:{
                    key:uuidv4(),
                    message:'담당자를 선택해주세요'
                }
            }
        }
        const postData = {...TaskData, customer: TaskData.customerId}
        delete postData.action
        delete postData.customerId

        const status = await saveTask(postData)
        if(status ===200){
            revalidatePath('/main/task/task');
        }
        return{
            ...prevState,
            ...TaskData,
            result: status
        }
    }

    return{
        ...prevState,
        ...TaskData,
    }
}