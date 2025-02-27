import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReceiptSelect{
    selectList: string[];
    isSelected:boolean; 
}

const initialState: ReceiptSelect={
    selectList:[],
    isSelected:false,
}

const receiptSelector = createSlice({
    name:'receiptSelect',
    initialState,
    reducers:{
        toggleSelect:(state)=>{
            state.isSelected = !state.isSelected;
        },
        addReceiptId:(state, action:PayloadAction<string>)=>{
            state.selectList.push(action.payload);
        },
        removeReceiptId:(state, action:PayloadAction<string>)=>{
            state.selectList = state.selectList.filter(id=>id!==action.payload);
        },
        clearReceiptIds:(state)=>{
            state.selectList = [];
        },
    },
})

export const {toggleSelect, addReceiptId, removeReceiptId, clearReceiptIds} = receiptSelector.actions;
export default receiptSelector.reducer;