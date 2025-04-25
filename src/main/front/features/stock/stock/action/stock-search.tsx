import {v4 as uuidv4} from "uuid";
import { StockSearchCondition } from "@/model/types/stock/stock/types";
import { searchStockApi } from "../api/searchStockApi";


export const initialStockState = {
    category: 'none',
    remain: true,
    stockUseEa: true,
    productName: '',
    condition:'none',
    searchKey:uuidv4(),
}


export async function stockSearchAction(prevState, formData){
    const formState:StockSearchCondition = {
        category: formData.get('category'),
        remain: formData.get('remain')==='use',
        stockUseEa: formData.get('stockUseEa')==='use',
        condition: formData.get('condition')==='condition',
        productName: formData.get('productName'),
    }

    const action = formData.get('action')
    let searchResult;
    if(action==='submit'){
        const postData = {
            ...formState,
            category: formState.category === 'none'
                ? null
                : formState.category
        }    
        searchResult = await searchStockApi(postData)

    }

    return {...prevState,...formState, searchResult}
}