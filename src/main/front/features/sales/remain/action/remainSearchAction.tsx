import { RequestRemain } from "@/model/types/sales/remain/type";
import { getNoPaidApi } from "../api/remainApi";

export default async function remainSearchAction(prevState,formData){
    const formState:RequestRemain ={
        customerCate: formData.get('customerCate'),
        customerName: formData.get('customerName'),
        customerId:formData.get('customerId'),
        searchSDate: new Date(formData.get('searchSDate')),
        searchEDate: new Date(formData.get('searchEDate')),
        condition:formData.get('condition'),
    }

    const action = formData.get('action')
    if(action==='submit'){
        const searchResult = await getNoPaidApi(formState)
        return{
            ...prevState,
            ...formState,
            searchResult,
            sortCondition: formData.get('sortCondition')
        }
    }

    return {
        ...prevState,
        ...formState,
        sortCondition: formData.get('sortCondition')
    }
}