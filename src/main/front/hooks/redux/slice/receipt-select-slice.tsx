import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ReceiptSelect{
    receiptIds: string[];
    isSelected:boolean; 
}

const initialState: ReceiptSelect={
    receiptIds:[],
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
            state.receiptIds.push(action.payload);
        },
        removeReceiptId:(state, action:PayloadAction<string>)=>{
            state.receiptIds = state.receiptIds.filter(id=>id!==action.payload);
        },
        clearReceiptIds:(state)=>{
            state.receiptIds = [];
        },
    },
})

export const {toggleSelect, addReceiptId, removeReceiptId, clearReceiptIds} = receiptSelector.actions;
export default receiptSelector.reducer;