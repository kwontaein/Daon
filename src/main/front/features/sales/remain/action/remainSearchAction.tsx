import { RequestRemain } from "@/model/types/sales/remain/type";
import { getNoPaidApi } from "../api/remainApi";

export default async function remainSearchAction(prevState,formData){
    const formState:RequestRemain ={
        customerCate: formData.get('customerCate'),
        customerName: formData.get('customerName'),
        customerId:formData.get('customerId'),
        searchSDate: formData.get('searchSDate'),
        searchEDate: formData.get('searchEDate'),
        condition:formData.get('condition'),
    }

    const action = formData.get('action')
    if(action==='submit'){
        const saerchResult = await getNoPaidApi(formState)
        return{
            ...prevState,
            ...formState,
            saerchResult
        }
    }

    return {
        ...prevState,
        ...formState
    }
}