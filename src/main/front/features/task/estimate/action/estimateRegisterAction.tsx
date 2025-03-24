

//보내야 할 것 customerId companyId, items, userId

import { RequestEstimate, ResponseEstimate, ResponseEstimateItem } from "@/model/types/task/estimate/type"
import { saveEstimate, updateEstimate } from "../api/estimateApi"

<<<<<<< HEAD
=======
type InitialEstimateParams = {
  task: ResponseTask;
  companyList: ResponseCompany[];
  mode: string;
  estimate?: ResponseEstimate;
};

export const initialEstimate = ({ task, companyList, mode, estimate }: InitialEstimateParams) => {
  const estimateMode = estimate ? mode : 'write';

  return {
    taskId: task.taskId,
    companyId: estimate?.companyId ?? companyList[0].companyId,
    estimateId: estimate?.estimateId ?? null,
    estimateDate: dayjs(estimate?.estimateDate ?? task.createdAt).format("YYYY-MM-DD"),
    userId: estimate?.userId ?? task.assignedUser,
    totalAmount: estimate?.totalAmount ?? 0,
    customerId: estimate?.customerId ?? task.customer.customerId,
    customerName: estimate?.customerName ?? task.customer.customerName,
    items: estimate?.items ?? [],
    mode: estimateMode,
  };
};

>>>>>>> bbdf0e0f47721e64cf1be20fdce013b7086f7672

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
    arr.push(formState.getAll(EstimateItemSequence[6]).map((item)=>Boolean(item)))

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