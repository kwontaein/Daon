import { TaskSearchCondition } from "@/model/types/task/task/type"
import { fetchSearchTask } from "../api/searchTaskApi";
import {v4 as uuidv4} from "uuid";


export const initialTaskState = {
    customer:'',
    taskType: 'none', //구분
    customerCate: 'none', //거래처구분
    assignedUser: 'none', //담당자
    task:[],
    searchKey:uuidv4(),
}

export async function taskSearchAction(prevState, formData){
    const searchData:TaskSearchCondition = {
        customer: formData.get('customer'),
        taskType: formData.get('taskType'), //구분
        customerCate: formData.get('customerCate'), //거래처구분
        assignedUser: formData.get('assignedUser'), //담당자
    }
    if(searchData.taskType==='none'){
        searchData.taskType = null;
    }
    if(searchData.customerCate==='none'){
        searchData.customerCate =null;
    }
    if(searchData.assignedUser==='none'){
        searchData.assignedUser = null;
    }
    const searchKey = uuidv4()

    const{taskType, customer, assignedUser,customerCate} = searchData
    if(!taskType && !customer && !assignedUser && !customerCate){
        return {...prevState,...searchData, searchKey}
    }
    const task = await fetchSearchTask(searchData)
    return {...prevState,...searchData, task, searchKey}
}