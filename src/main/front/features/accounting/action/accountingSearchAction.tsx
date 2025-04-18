import { getCardTransactionfApi, getExpenseProofApi, getProcurementApi, getPurchaseVatApi, getSalesVATApi } from "../api/accountingSearchApi";

export default async function accountingSearchAction(prevState, formData){
    const formState ={
        searchSDate: formData.get('searchSDate'),
        searchEDate: formData.get('searchEDate'),
        companyId: formData.get('companyId'),
        customerName: formData.get('customerName'),
    }

    const action = formData.get('action')
    let searchResult;
    if(action === 'pvat'){
        searchResult= await getPurchaseVatApi(formState)
    }else if(action === 'svat'){
        searchResult= await getSalesVATApi(formState)
    }else if(action === 'pset'){
        searchResult= await getProcurementApi(formState)
    }else if(action === 'card'){
        searchResult= await getCardTransactionfApi(formState)
    }else if(action === 'proof'){
        searchResult= await getExpenseProofApi(formState)
    }

    return {
        ...prevState,
        ...formState,
        searchResult
    }
}