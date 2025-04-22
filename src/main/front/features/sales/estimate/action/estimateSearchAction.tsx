import dayjs from "dayjs"
import { searchEstimateConditionApi } from "../api/estimateApi"
import { EstimateCondition } from "@/model/types/sales/estimate/type"
import { ResponseCompany } from "@/model/types/staff/company/type"

export const initialEstimateSearch=(isTask:boolean)=>{
    return(
        {
            companyId:'none',
            searchSDate: dayjs().subtract(2, 'month').date(1).format('YYYY-MM-DD'),
            searchEDate:dayjs(new Date(Date.now())).endOf('month').format('YYYY-MM-DD'),
            customerId:'',
            stockId: '',
            customerName: '',
            productName: '',
            task:isTask
        }
    )
}

export default async function estimateSearchAction(prevState, formState){
    const searchCondition:EstimateCondition={
        condition: formState.get('condition'),
        companyId: formState.get('companyId'),
        searchSDate: formState.get('searchSDate'),
        searchEDate: formState.get('searchEDate'),
        customerId: formState.get('customerId')||null,
        stockId: formState.get('stockId')||null,
        task:!!prevState.task
    }
    const action = formState.get('action')

    const postData = Object.fromEntries(Object.entries(searchCondition).filter(([key,value])=>
        value !=='none' && value !==null
    )) as EstimateCondition

    if(action==='submit'){
        const searchEstimate = await searchEstimateConditionApi(postData)
        return {
            ...prevState,
            ...searchCondition,
            customerId:formState.get('customerId'),
            customerName: formState.get('customerName'),
            stockId:formState.get('stockId'),
            productName:formState.get('productName'),
            searchEstimate
        }
    }

    return{
        ...prevState,
        ...searchCondition,
        customerId:formState.get('customerId'),
        customerName: formState.get('customerName'),
        stockId:formState.get('stockId'),
        productName:formState.get('productName'),
    }
}