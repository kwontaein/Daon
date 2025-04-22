import { ReceiptCondition } from "@/model/types/sales/receipt/type"
import { getReceiptSearchListApi } from "../api/receiptApi"
import dayjs from "dayjs"

export const initialReceiptSearch ={
    category:'EX',
    searchSDate: dayjs().subtract(2, 'month').date(1).format('YYYY-MM-DD'),
    searchEDate:dayjs(new Date(Date.now())).endOf('month').format('YYYY-MM-DD'),
    customerId: '',
    stockId: '',
    customerName: '',
    productName: '',
}

export default async function receiptSearchAction(prevState, formState){
    const searchCondition:ReceiptCondition={
        category: formState.get('category'),
        searchSDate: formState.get('searchSDate'),
        searchEDate: formState.get('searchEDate'),
        customerId: formState.get('customerId') ||null,
        stockId: formState.get('stockId') ||null,
    }
    const action = formState.get('action')

    if(action==='submit'){
        const searchReceipt = await getReceiptSearchListApi(searchCondition)
        return {
            ...prevState,
            ...searchCondition,
            customerId:formState.get('customerId'),
            customerName: formState.get('customerName'),
            stockId:formState.get('stockId'),
            productName:formState.get('productName'),
            searchReceipt
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