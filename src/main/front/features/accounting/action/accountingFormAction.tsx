import { UnionAccountingType, VAT } from "@/model/types/accounting/type"
import { saveCardTransactionApi, saveExpenseProofApi, saveProcurementApi, savePurchaseVatApi, saveSalesVATApi } from "../api/accountingFormApi";

export default async function accountingFormAction(prevState, formData){

    const formState:UnionAccountingType ={
        categorySelection: formData.get('categorySelection'),
        date: formData.get('date'),
        customerId: formData.get('customerId'),
        businessNumber: formData.get('businessNumber'),
        customerName:formData.get('customerName'),
        amount: formData.get('amount'),
        vat: formData.get('vat'),
        total: formData.get('total'),
        note: formData.get('note'),
        memo: formData.get('memo'),
        paidDate: formData.get('paidDate'),
        cardCompany: formData.get('cardCompany'),
        paymentDetails:formData.get('paymentDetails'),
        modelName: formData.get('modelName'),   // 모델명
        vendor: formData.get('vendor'),   // 매입처
        quantity: formData.get('quantity'),    // 수량
        acceptance: formData.get('acceptance'),    // 인수
        installation: formData.get('installation'), // 설치
        payment: formData.get('payment'),   // 결재
    }

    const action = formData.get('action')
    let status;
    const postData = Object.fromEntries(Object.entries({...formState})
    .filter(([key,value])=> value!=='none' && value!==null)
    .map(([key,value])=>{
        if(['amount', 'vat', 'total', 'quantity'].includes(key) && value) {
            return [key, (value as string).replaceAll(',','').replace('원','')]
        }
        return [key,value]
    }))
    console.log(postData)
    if(action === 'pvat'){
        status = await savePurchaseVatApi(postData)
    }else if(action === 'svat'){
        status = await saveSalesVATApi(postData)
    }else if(action === 'pset'){
        status = await saveProcurementApi(postData)
    }else if(action === 'bills'){
        // status = await saveCardTransactionApi(postData)
    }else if(action === 'card'){
        status = await saveCardTransactionApi(postData)
    }else if(action === 'proof'){
        status = await saveExpenseProofApi(postData)
    }
    delete prevState.status;

    return {
        ...prevState,
        ...formState,
        status,
    }
}