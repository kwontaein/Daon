import {v4 as uuidv4} from "uuid";
import { RequestStock } from "@/model/types/stock/stock/types";
import { saveStockApi, updateStockApi } from "../api/form-server-api";


function isInvalidText(text:string) {
    return !text || text.trim() === '';
  }
export default async function stockFormAction(prevState,formData){
    const formState:Omit<RequestStock,'stockId'>= {
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

    const postData = Object.fromEntries(Object.entries(formState).map(([key,value])=>{
        if(value==='none' || isInvalidText(value+'')|| value===null){
            return [key, null]
        }
        if(key.includes('Price')|| key==='quantity'){
            return [key, (value as string).replace(/,/g, "")]
        }
        else return [key,value]
    })) as Omit<RequestStock,'stockId'>

    console.log(formState , action)
    if(action){
        let status;
        if(action==='write'){
            status = await saveStockApi(postData);
        }else{
            status = await updateStockApi({...postData, stockId:prevState.stockId})
        }
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