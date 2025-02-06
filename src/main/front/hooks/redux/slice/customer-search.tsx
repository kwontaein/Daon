import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

export type CategoryType = 'none' |'sale' | 'purchase' | 'consumer' | 'subcontractor' | 'etc';
export type SearchTarget = 'all' | 'payment'
export type SearchInputOption = 'customerName' | 'ceo';

type PostSearchInfoKeys = keyof PostSearchInfo;

export interface PostSearchInfo {
    category: CategoryType|null,
    cateId:string|null,
    searchTarget :SearchTarget,
    customerName: string|null,
    ceo:string|null,
} 

export interface CustomerSearch{
    postSearchInfo: PostSearchInfo,
    searchInputTarget:SearchInputOption
    searchInput:string
    isSearch: boolean
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
    isSearch:false
}

const customerSearch = createSlice({
    name:'customerSearch',
    initialState,
    reducers:{
        updateSearchQuery: (state, action: PayloadAction<Partial<Record<PostSearchInfoKeys, PostSearchInfo[PostSearchInfoKeys]>>>)=>{
            Object.assign(state.postSearchInfo, action.payload);
        },
        updateSearchInputTarget: (state, action: PayloadAction<SearchInputOption>)=>{
            state.searchInputTarget = action.payload
        },
        updateSearchInput: (state, action: PayloadAction<string>)=>{
            state.searchInput = action.payload
        },
        RequestCustomerData: (state, action:PayloadAction<boolean>)=>{
            state.isSearch = action.payload;
        },
        ResetSearchQuery: (state)=>{
            state = initialState;
        }
    }
})

export const {updateSearchQuery, updateSearchInputTarget, updateSearchInput, RequestCustomerData, ResetSearchQuery} = customerSearch.actions;


export default customerSearch.reducer;