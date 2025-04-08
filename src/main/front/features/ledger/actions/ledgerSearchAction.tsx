import dayjs from "dayjs";
import { LedgerSearchCondition } from "@/model/types/ledger/type";
import { getExtraLedgerApi, getFeeReceiptAoi, getLedgerCustomerApi, getLedgerStockApi, getPurchaseReceiptApi, getSaleReceiptApi, getStockSurveyApi } from "../api/ledgerApi";

function isInvalidText(text) {
    return !text || text.trim() === '';
  }
export const initialLedgertState = {
    searchSDate: dayjs().subtract(2, 'month').date(1).format('YYYY-MM-DD'),
    searchEDate:dayjs(new Date(Date.now())).endOf('month').format('YYYY-MM-DD'),
    affiliationId:'none',//소속
    customerCate:'none', //구분
    stockCate:'none',
    officailId :'none', //관리비분류
    customerName: '',
    customerId:'',
    productName:'',
    stockId:'',
    
    sales: false,
    purchase: false,
    deposit: false,
    withdrawal: false,
    salesDiscount: false,
    purchaseDiscount: false,
    returnOut: false,
    returnIn: false,
    ledgerCustomer:[]
    
}

export async function ledgerSearchAction(prevState, formData){
    const receiptCates = formData.getAll('receiptCate')

    const searchData :LedgerSearchCondition= {
        searchSDate: formData.get('searchSDate'),
        searchEDate: formData.get('searchEDate'),
        customerCate: formData.get('customerCate'),
        affiliationId: formData.get('affiliationId'),
        customerId: formData.get('customerId'),
        customerIds: formData.get('customerIds') && JSON.parse(formData.get('customerIds')),
        stockId: formData.get('stockId'),
        officialId: formData.get('officialId'),

        sales:receiptCates.includes('sales'),//매출
        purchase: receiptCates.includes('purchase'),//매입
        deposit: receiptCates.includes('deposit'),//입금
        withdrawal: receiptCates.includes('withdrawal'),//출금
        salesDiscount: receiptCates.includes('salesDiscount'),//매출할인
        purchaseDiscount: receiptCates.includes('purchaseDiscount'), //매입할인
        returnOut: receiptCates.includes('returnOut'),//반품출고
        returnIn: receiptCates.includes('returnIn') //반품입고
    }
    const productName = formData.get('productName')
    const customerName = formData.get('customerName')
    const action = formData.get('action')

 
    if(action){
        const postData= Object.fromEntries(Object.entries(searchData).map(([key,value])=>{
            if(value==='none' || (typeof value ==='string' && isInvalidText(value))){
                return [key, null]
            }
            if(key.includes('Date')){
                return [key, new Date(value+'')]
            }
            return [key,value]
        })) as LedgerSearchCondition
        

        let searchResult;
        if(action.includes('customer')){
            searchResult = await getLedgerCustomerApi(postData)
        }else if(action ==='stock'){
            searchResult = await getLedgerStockApi(postData)
        }else if(action==='sales'){
            searchResult = await getSaleReceiptApi(postData)
        }else if(action==='purchase'){
            searchResult = await getPurchaseReceiptApi(postData)
        }else if(action==='official'){
            searchResult = await getFeeReceiptAoi(postData)
        }else if(action==='stock-count'){
            searchResult = await getStockSurveyApi(postData)
        }else if(action ==='etc'){
            searchResult = await getExtraLedgerApi(postData)
        }
    
  
        return{
            ...prevState,
            ...searchData,
            productName,
            customerName,
            searchResult:searchResult,

        }
    }

    return{
        ...prevState,
        ...searchData,
        productName,
        customerName
    }
}