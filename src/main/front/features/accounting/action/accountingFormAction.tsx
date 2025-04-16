import { VAT } from "@/model/types/accounting/type"

export default function accountingFormAction(prevState, formData){
    const formState:VAT ={
        categorySelection: formData.get('categorySelection'),
        date: formData.get('date'),
        companyName: formData.get('companyName'),
        customerId: formData.get('customerId'),
        businessNumber: formData.get('businessNumber'),
        amount: formData.get('amount'),
        vat: formData.get('vat'),
        total: formData.get('total'),
        note: formData.get('note'),
        memo: formData.get('memo'),
    }

    const action = formData.get('action')
    if(action === 'pvat'){

    }else if(action === 'svat'){

    }else if(action === 'pset'){

    }else if(action === 'svat'){

    }else if(action === 'bills'){

    }else if(action === 'card'){

    }else if(action === 'proof'){

    }

    return {
        ...prevState,
        ...formState,
    }
}