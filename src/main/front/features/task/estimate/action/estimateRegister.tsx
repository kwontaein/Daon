

//보내야 할 것 customerId companyId, items, userId

import { ResponseCompany } from "@/model/types/staff/company/type"
import { ResponseEstimate, ResponseEstimateItem } from "@/model/types/task/estimate/type"
import { ResponseTask } from "@/model/types/task/task/type"
import dayjs from "dayjs"
import { saveEstimate, updateEstimate } from "../api/estimateApi"

export const initialEstimate = (task:ResponseTask,companyList:ResponseCompany[],mode:string,estimate?:ResponseEstimate)=>{
    let view = mode;
    //estimate가 존재하면 write상태가 아닌 edit이어야함
    if(estimate && mode==='write'){
        view='edit'
    }
    return  {
    companyId:estimate ? estimate.companyId : companyList[0].companyId,
    estimateId: estimate ? estimate.estimateId : null,
    estimateDate:  dayjs(estimate ? estimate.estimateDate :task.createdAt).format('YYYY-MM-DD'),
    userId: estimate ? estimate.userId : task.assignedUser,
    totalAmount: estimate ? estimate.totalAmount : 0,
    customerId: estimate ? estimate.customerId : task.customer.customerId,
    customerName:estimate ? estimate.customerName : task.customer.customerName,
    items : estimate ? Object.fromEntries(estimate.items.map((item)=>{
        return [item.itemId, {...item}]
    })) : [],
    mode : view,
}
}

function isInvalidText(text) {
    return !text || text.trim() === '';
  }

const EstimateItemSequence = ['itemId','modelName', 'quantity', 'unitPrice', 'stockId', 'productName', 'hand']
export default async function estimateRegisterAction(prevState, formState){
    const arr = []
    arr.push(formState.getAll('itemId'))
    arr.push(formState.getAll('modelName'))
    arr.push(formState.getAll('quantity').map((item)=>Number(item.replaceAll(',',''))))
    arr.push(formState.getAll('unitPrice').map((item)=>Number(item.replaceAll(',',''))))
    arr.push( formState.getAll('stockId'))
    arr.push(formState.getAll('productName'))
    arr.push(formState.getAll('hand').map((item)=>Boolean(item)))

    const items = arr.reduce((prev,next,row)=>{
        next.forEach((item,column)=>{
            prev[column]={
                ...prev[column],
                [EstimateItemSequence[row]] : item
            }
        })
        return prev
    },Array.from({length:formState.getAll('productName').length}, (_,i)=>[]))

    let estimateData:Omit<ResponseEstimate,'customerName'> ={
        estimateId:prevState.estimateId,
        companyId: formState.get('companyId'),
        customerId: formState.get('customerId'),
        userId: formState.get('userId'),
        estimateDate: formState.get('estimateDate'),
        totalAmount : items.length>0 ? Number( formState.get('totalAmount').replaceAll(',','')) : 0,
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

    if(action ==='submit'){
        if(errors.length>0){
            const formErrors = Object.fromEntries(errors)
            return {...prevState,...estimateData, formErrors}
        }
        if(prevState.mode ==='write'){
            const status = await saveEstimate(estimateData)
        }else if(prevState.mode ==='edit'){
            const status = await updateEstimate(estimateData)
        }
        return {...prevState, ...estimateData}
    }else{
        delete prevState.formErrors
        return {...prevState, ...estimateData, customerName:formState.get('customerName')}
    }


}