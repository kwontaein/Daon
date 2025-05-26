import { TaskSearchCondition } from "@/model/types/sales/task/type"
import { fetchSearchTask } from "../api/server-api";
import {v4 as uuidv4} from "uuid";
import dayjs from "dayjs";


export const initialTaskState = {
    customer:'',
    taskType: 'none', //구분
    affiliation: 'none', //거래처구분
    assignedUser: 'none', //담당자
    searchSDate: dayjs().subtract(2, 'month').date(1).format('YYYY-MM-DD'),
    searchEDate:dayjs(new Date(Date.now())).endOf('month').format('YYYY-MM-DD'),
}

export async function taskSearchAction(prevState, formData){

    const formState = {
        searchSDate:formData.get('searchSDate'),
        searchEDate:formData.get('searchSDate'),
        customerName: formData.get('customerName'),
        customerId: formData.get('customerId'),
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