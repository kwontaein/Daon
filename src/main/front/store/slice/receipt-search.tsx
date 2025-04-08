import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
import dayjs from "dayjs";

export interface ReceiptSearchDate{
    date:string;
    date_id:string
}

const initialState:ReceiptSearchDate={
    date: dayjs(new Date(Date.now())).format('YYYY-MM-DD'),
    date_id : ''
}

const receiptSearch = createSlice({
    name:'receiptSearch',
    initialState,
    reducers:{
        updateSearchDate :(state, action: PayloadAction<string>)=>{
            state.date = action.payload;
        },
        updateSearchDateId:(state)=>{
            state.date_id = uuidv4();
        },
    }
})

export const {updateSearchDate,updateSearchDateId} =receiptSearch.actions;

export default receiptSearch.reducer;