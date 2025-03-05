import { TaskType } from "@/model/types/task/task/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type TaskSearchConditionKeys = keyof TaskSearchCondition;

export interface TaskSearchCondition {
    customer:string,
    taskType: TaskType|null, //구분
    customerCate:string|null, //거래처구분
    assignedUser:string|null, //담당자
} 

export interface TaskSearch{
    postSearchInfo: TaskSearchCondition,
    isSearch: boolean
}


const initialState:TaskSearch={
    postSearchInfo:{
        customer: '',
        taskType: null, //구분
        customerCate: null, //거래처구분
        assignedUser:null, //담당자
    },
    isSearch:false,
}

const TaskSearch = createSlice({
    name:'TaskSearch',
    initialState,
    reducers:{
        updateTaskSearchQuery: (state, action: PayloadAction<Partial<Record<TaskSearchConditionKeys, TaskSearchCondition[TaskSearchConditionKeys]>>>)=>{
            for(let [key,value] of Object.entries(action.payload)){
                if(value ==='none') value = null
                state.postSearchInfo[key] = value;
            }
        },
        updateTaskSearchInput: (state, action: PayloadAction<string>)=>{
            state.postSearchInfo.assignedUser = action.payload
        },
        RequestTaskData: (state, action:PayloadAction<boolean>)=>{
            state.isSearch = action.payload;
        },
        ResetTaskSearchQuery: (state)=>{
            state.postSearchInfo = initialState.postSearchInfo;
        },
    }
})

export const {updateTaskSearchQuery, updateTaskSearchInput, RequestTaskData, ResetTaskSearchQuery} = TaskSearch.actions;


export default TaskSearch.reducer;