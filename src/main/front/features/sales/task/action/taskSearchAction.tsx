import { TaskSearchCondition } from "@/model/types/sales/task/type"
import { fetchSearchTask } from "../api/taskApi";
import {v4 as uuidv4} from "uuid";


export const initialTaskState = {
    customer:'',
    taskType: 'none', //구분
    affiliation: 'none', //거래처구분
    assignedUser: 'none', //담당자
}

export async function taskSearchAction(prevState, formData){

    const formState = {
        customerName: formData.get('customerName'),
        taskType: formData.get('taskType'), //구분
        affiliation: formData.get('affiliation'), //거래처구분
        assignedUser: formData.get('assignedUser'), //담당자
    }
    const postData:TaskSearchCondition = Object.fromEntries(Object.entries(formState).filter(([key,value])=> value!=='none'))

    const action = formData.get('action')
    if(action ==='submit'){
        const searchResult = await fetchSearchTask(postData)
        return {...prevState,...formState, searchResult}
    }

    return {...prevState,...formState}
}