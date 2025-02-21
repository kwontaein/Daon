import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type StockSearchConditionKeys = keyof stockSearchCondition;

export interface stockSearchCondition {
    category: string,
    isRemain: boolean, //true => 재고있는 품목만 검색
    isStockUseEa: boolean, //재고관리여부 
    searchInput:string,
    isConditionSearch:boolean, //조건부 검색여부
} 

export interface StockSearch{
    postSearchInfo: stockSearchCondition,
    isSearch: boolean
    allView :boolean,
}


const initialState:StockSearch={
    postSearchInfo:{
        category: 'none',
        isRemain :true,
        isStockUseEa: true,
        searchInput:'',
        isConditionSearch:false
    },
    isSearch:false,
    allView :false,
}

const stockSearch = createSlice({
    name:'stockSearch',
    initialState,
    reducers:{
        updateStockSearchQuery: (state, action: PayloadAction<Partial<Record<StockSearchConditionKeys, stockSearchCondition[StockSearchConditionKeys]>>>)=>{
            Object.assign(state.postSearchInfo, action.payload);
        },
        updateStockSearchInput: (state, action: PayloadAction<string>)=>{
            state.postSearchInfo.searchInput = action.payload
        },
        RequestStockData: (state, action:PayloadAction<boolean>)=>{
            state.isSearch = action.payload;
        },
        ResetStockSearchQuery: (state)=>{
            state.postSearchInfo = initialState.postSearchInfo;
        },
        RequestAllStockData: (state, action:PayloadAction<boolean>)=>{
            state.allView = action.payload;
        },
    }
})

export const {updateStockSearchQuery, updateStockSearchInput, RequestStockData, ResetStockSearchQuery,RequestAllStockData} = stockSearch.actions;


export default stockSearch.reducer;