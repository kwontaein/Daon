import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        category: null,
        cateId:null,
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
        updateCustomerSearchQuery: (state, action: PayloadAction<Partial<Record<CustomerSearchConditionKeys, CustomerSearchCondition[CustomerSearchConditionKeys]>>>)=>{
            for(let [key,value] of Object.entries(action.payload)){
                if(value ==='none') value = null
                state.postSearchInfo[key] = value;
            }
        },
        updateCustomerSearchInputTarget: (state, action: PayloadAction<CustomerSearchInputTarget>)=>{
            state.searchInputTarget = action.payload
        },
        updateCustomerSearchInput: (state, action: PayloadAction<string>)=>{
            state.searchInput = action.payload
        },
        RequestCustomerData: (state, action:PayloadAction<boolean>)=>{
            state.isSearch = action.payload;
        },
        ResetCustomerSearchQuery: (state)=>{
            state.postSearchInfo = initialState.postSearchInfo;
            state.searchInput = initialState.searchInput;
            state.searchInputTarget = initialState.searchInputTarget;
        },
        RequestAllCustomerData: (state, action:PayloadAction<boolean>)=>{
            state.allView = action.payload;
        },
    }
})

export const {updateCustomerSearchQuery, updateCustomerSearchInputTarget, updateCustomerSearchInput, RequestCustomerData, ResetCustomerSearchQuery, RequestAllCustomerData} = customerSearch.actions;


export default customerSearch.reducer;