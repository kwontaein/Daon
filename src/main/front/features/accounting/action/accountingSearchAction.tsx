export default function accountingSearchAction(prevState, formData){
    const formState ={
        searchSDate: formData.get('searchSDate'),
        searchEDate: formData.get('searchEDate'),
        companyId: formData.get('companyId'),
        customerName: formData.get('customerName'),
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