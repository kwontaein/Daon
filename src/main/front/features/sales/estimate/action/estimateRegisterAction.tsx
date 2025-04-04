

//보내야 할 것 customerId companyId, items, userId

import { RequestEstimate, ResponseEstimateItem } from "@/model/types/sales/estimate/type"
import { saveEstimate, updateEstimate } from "../api/estimateApi"

function isInvalidText(text) {
    return !text || text.trim() === '';
  }

const EstimateItemSequence = ['itemId','productName','modelName', 'quantity', 'unitPrice', 'stockId' , 'hand']
export default async function estimateRegisterAction(prevState, formState){
    const arr = []
    arr.push(formState.getAll(EstimateItemSequence[0]))
    arr.push(formState.getAll(EstimateItemSequence[1]))
    arr.push(formState.getAll(EstimateItemSequence[2]))
    arr.push(formState.getAll(EstimateItemSequence[3]).map((item)=>Number(item.replaceAll(',',''))))
    arr.push(formState.getAll(EstimateItemSequence[4]).map((item)=>Number(item.replaceAll(',',''))))
    arr.push(formState.getAll(EstimateItemSequence[5]))
    arr.push(formState.getAll(EstimateItemSequence[6]).map((item)=>item==='true'))

    const items = arr.reduce((prev,next,row)=>{
        next.forEach((item,column)=>{
            prev[column]={
                ...prev[column],
                [EstimateItemSequence[row]] : item
            }
        })
        return prev
    },Array.from({length:formState.getAll('productName').length}, (_,i)=>[]))

    let estimateData:RequestEstimate ={
        taskId:prevState.taskId,
        estimateId:prevState.estimateId,
        customerId: formState.get('customerId'),
        companyId: formState.get('companyId'),
        userId:formState.get('userId'),
        estimateDate: formState.get('estimateDate'),
        totalAmount : items.length>0 ? Number( formState.get('totalAmount').replaceAll(',','')) : 0,
        customerName:formState.get('customerName'),
        items
    }
    const action = formState.get('action')
    
    const errors=[]
    items.forEach((item:ResponseEstimateItem)=>{
        if((!item.hand && isInvalidText(item.stockId))
        || (item.hand && isInvalidText(item.productName))){
            errors.push(['message', '품명을 입력해주세요'])
        }
    })

    if(items.length===0 && prevState.mode==='write'){
        errors.push(['message', '품목을 하나이상 넣어주세요.'])
    }
    if(!estimateData.customerId){
        errors.push(['message', '업체를 선택해주세요.'])
    }

    if(action ==='submit'){
        let status;
        if(errors.length>0){
            const formErrors = Object.fromEntries(errors)
            return {...prevState,...estimateData, formErrors}
        }
        if(prevState.mode ==='write'){
            status = await saveEstimate(estimateData)
        }else if(prevState.mode ==='edit'){
            status = await updateEstimate(estimateData)
        }
        return {...prevState, ...estimateData, status}
    }else{
        delete prevState.status
        delete prevState.formErrors
        return {...prevState, ...estimateData}
    }


}