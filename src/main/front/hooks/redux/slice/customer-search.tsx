import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

export type CategoryType = 'none' |'sale' | 'purchase' | 'consumer' | 'subcontractor' | 'etc';
export type CustomerSearchTarget = 'all' | 'payment'
export type CustomerSearchInputTarget = 'customerName' | 'ceo';

type CustomerSearchConditionKeys = keyof CustomerSearchCondition;

export interface CustomerSearchCondition {
    category: CategoryType|null,
    cateId:string|null,
    searchTarget :CustomerSearchTarget,
    customerName: string|null,
    ceo:string|null,
} 

export interface CustomerSearch{
    postSearchInfo: CustomerSearchCondition,
    searchInputTarget:CustomerSearchInputTarget
    searchInput:string
    isSearch: boolean
    allView :boolean,
}


const initialState:CustomerSearch={
    postSearchInfo:{
        category: 'none',
        cateId:'none',
        searchTarget :'all',
        customerName: null,
        ceo:null,
    },
    searchInputTarget : 'customerName',
    searchInput : '',
    isSearch:false,
    allView :false,
}

const customerSearch = createSlice({
    name:'customerSearch',
    initialState,
    reducers:{
        updateSearchQuery: (state, action: PayloadAction<Partial<Record<CustomerSearchConditionKeys, CustomerSearchCondition[CustomerSearchConditionKeys]>>>)=>{
            Object.assign(state.postSearchInfo, action.payload);
        },
        updateSearchInputTarget: (state, action: PayloadAction<CustomerSearchInputTarget>)=>{
            state.searchInputTarget = action.payload
        },
        updateSearchInput: (state, action: PayloadAction<string>)=>{
            state.searchInput = action.payload
        },
        RequestCustomerData: (state, action:PayloadAction<boolean>)=>{
            state.isSearch = action.payload;
        },
        ResetSearchQuery: (state)=>{
            state.postSearchInfo = initialState.postSearchInfo;
            state.searchInput = initialState.searchInput;
            state.searchInputTarget = initialState.searchInputTarget;
        },
        RequestAllCustomerData: (state, action:PayloadAction<boolean>)=>{
            state.allView = action.payload;
        },
    }
})

export const {updateSearchQuery, updateSearchInputTarget, updateSearchInput, RequestCustomerData, ResetSearchQuery,RequestAllCustomerData} = customerSearch.actions;


export default customerSearch.reducer;