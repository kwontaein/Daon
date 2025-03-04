import { TaskType } from "@/model/types/task/task/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type TaskSearchConditionKeys = keyof TaskSearchCondition;

export interface TaskSearchCondition {
    customer:string,
    taskType: TaskType|'none', //구분
    customerCate:string, //거래처구분
    assignedUser:string, //담당자
} 

export interface TaskSearch{
    postSearchInfo: TaskSearchCondition,
    isSearch: boolean
    allView :boolean,
}


const initialState:TaskSearch={
    postSearchInfo:{
        customer:'none',
        taskType: 'none', //구분
        customerCate:'none', //거래처구분
        assignedUser:'', //담당자
    },
    isSearch:false,
    allView :false,
}

const TaskSearch = createSlice({
    name:'TaskSearch',
    initialState,
    reducers:{
        updateTaskSearchQuery: (state, action: PayloadAction<Partial<Record<TaskSearchConditionKeys, TaskSearchCondition[TaskSearchConditionKeys]>>>)=>{
            Object.assign(state.postSearchInfo, action.payload);
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
        RequestAllTaskData: (state, action:PayloadAction<boolean>)=>{
            state.allView = action.payload;
        },
    }
})

export const {updateTaskSearchQuery, updateTaskSearchInput, RequestTaskData, ResetTaskSearchQuery,RequestAllTaskData} = TaskSearch.actions;


export default TaskSearch.reducer;