import { TaskSearchCondition } from "@/model/types/sales/task/type"
import { fetchSearchTask } from "../api/taskApi";
import {v4 as uuidv4} from "uuid";


export const initialTaskState = {
    customer:'',
    taskType: 'none', //구분
    affiliation: 'none', //거래처구분
    assignedUser: 'none', //담당자
    task:[],
    searchKey:uuidv4(),
}

export async function taskSearchAction(prevState, formData){

    const searchData:TaskSearchCondition = {
        customerName: formData.get('customerName'),
        taskType: formData.get('taskType'), //구분
        affiliation: formData.get('affiliation'), //거래처구분
        assignedUser: formData.get('assignedUser'), //담당자
    }
    if(searchData.taskType==='none'){
        searchData.taskType = null;
    }
    if(searchData.affiliation==='none'){
        searchData.affiliation =null;
    }
    if(searchData.assignedUser==='none'){
        searchData.assignedUser = null;
    }
    const searchKey = uuidv4()

    const{taskType, customerName, assignedUser, affiliation} = searchData
    if(!taskType && !customerName && !assignedUser && !affiliation){
        
        return {...prevState,...searchData,  task:prevState.initialTask ,searchKey}
    }
    console.log(searchData)
    const task = await fetchSearchTask(searchData)
    return {...prevState,...searchData, task, searchKey}
}