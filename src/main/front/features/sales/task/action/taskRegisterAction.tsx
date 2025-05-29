'use server'
import {v4 as uuidv4} from "uuid";
import { saveTask, updateTask } from "../api/server-api";
import { RequestTask, ResponseTask } from "@/model/types/sales/task/type";

export default async function taskRegisterAction(prevState, formData){
    const TaskData ={
        taskId: formData.get('taskId'),
        taskType: formData.get('taskType'),
        customer: formData.get('customer'),
        requesterName: formData.get('requesterName'),
        requesterContact: formData.get('requesterContact'),
        requesterContact2: formData.get('requesterContact2'),
        model: formData.get('model'),
        assignedUser: formData.get('assignedUser'),
        details: formData.get('details'), //내용
        remarks: formData.get('remarks'), //비고
        actionTaken: formData.get('ActionTaken'),
    }
    const action =formData.get('action')
    const customer= formData.get('customerId') ?? prevState.customerId
    
    const mode = prevState.mode;
    if(action ==='submit'){
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
        
        const postData:RequestTask = {...TaskData, customer}

        let status;
        if(mode ==='write'){
            status = await saveTask(postData)
        }else if(mode ==='edit'){
            status = await updateTask(postData)
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
        address1:formData.get('address1'),
        zipCode:formData.get('zipCode')
    }
}

