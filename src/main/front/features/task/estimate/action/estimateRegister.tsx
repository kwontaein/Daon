export default function estimateRegisterAction(prevState, formState){
    let estimateData ={
        companyId: formState.get('companyId'),
        customerName: formState.get('customerName'),
        assignedUser: formState.get('assignedUser'),
        createAt: formState.get('createAt')
    }
}