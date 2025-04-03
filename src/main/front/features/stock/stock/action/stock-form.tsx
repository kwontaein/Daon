import {v4 as uuidv4} from "uuid";
import { ResponseStock } from "@/model/types/stock/stock/types";
import { saveStockApi, updateStockApi } from "../api/stockFormApi";
import { text } from "@fortawesome/fontawesome-svg-core";


function isInvalidText(text) {
    return !text || text.trim() === '';
  }
export default async function stockFormAction(prevState,formData){
    const formState:Omit<ResponseStock,'stockId'>= {
        productName: formData.get('productName'),
        quantity: formData.get('quantity'),
        inPrice: formData.get('inPrice'),
        outPrice: formData.get('outPrice'),
        modelName: formData.get('modelName'),
        category:formData.get('category'),
        taxation: formData.get('taxation'), // 과세 기준
        note: formData.get('note'),//메모
        stockUseEa: formData.get('stockUseEa') ==='Y',//재고관리여부
        compatibleModel: formData.get('compatibleModel'),//호환기종
    }

    const errors =[]
    if(formState.category==='none'){
        errors.push(['category', '물품분류를 선택해주세요.'])
    }
    if(isInvalidText(formState.productName)){
        errors.push(['productName', '물품명을 입력해주세요.'])
    }
    if(isInvalidText(formState.modelName)){
        errors.push(['modelName', '규격을 입력해주세요.'])
    }
    if(!formState.outPrice){
        errors.push(['outPrice', '출고가를 입력해주세요.'])
    }
   

    if(errors.length>0){
      
        const formErrors = Object.fromEntries(errors)
        formErrors.errorKey = uuidv4()
        const state = {
            ...prevState,
            ...formState,
            formErrors
        } 
        return state ;
    }

    const action = formData.get('action')

    const postData = Object.fromEntries(Object.entries(formData).map(([key,value])=>{
        if(key.includes('Price')|| key==='quantity'){
            return [key, (value as string).replace(/,/g, "")]
        }
        if(value==='none' || isInvalidText(text)){
            return [key, null]
        }
        else return [key,value]
    })) as Omit<ResponseStock,'stockId'>

    if(action==='submit'){
        console.log(postData)
        let status;
        if(prevState.mode==='write'){
            status = await saveStockApi(postData);
        }else{
            status = await updateStockApi({...postData, stockId:prevState.stockId})
        }
        console.log(status)
        return{
            ...prevState,
            ...formState,
            status
        }
    }
    delete prevState.status;

    return{
        ...prevState,
        formState
    }
}