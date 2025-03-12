import {v4 as uuidv4} from "uuid";
import { StockSearchCondition } from "@/model/types/stock/stock/types";
import { searchStockApi } from "../api/searchStockApi";


export const initialStockState = {
    category: 'none',
    remain: true,
    stockUseEa: true,
    name: '',
    condition:'none',
    stocks:[],
    initialStocks:[],
    searchKey:uuidv4(),
}


export async function stockSearchAction(prevState, formData){
    const searchData:StockSearchCondition = {
        category: formData.get('category'),
        remain: formData.get('remain'),
        stockUseEa: formData.get('stockUseEa'),
        condition: formData.get('condition'),
        name: formData.get('name'),
    }
    if(searchData.category==='none'){
        searchData.category = null;
    }
    searchData.condition= searchData.condition!=='none'
    searchData.remain = searchData.remain==='use'
    searchData.stockUseEa = searchData.stockUseEa==='use'

    const searchKey = uuidv4()

    const{category, condition, name} = searchData
    if(!category && !condition && !name){
        return {...prevState,...searchData, stocks : prevState.initialStocks, searchKey}
    }
    const stocks = await searchStockApi(searchData,false)
    return {...prevState,...searchData, stocks, searchKey}
}