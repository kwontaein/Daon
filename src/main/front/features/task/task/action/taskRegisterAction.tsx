export default function TaskRegisterAction(prevState, formData){
    const TaskData ={
        taskType: formData.get('taskType'),
        customer: formData.get('customer'),
        requesterName: formData.get('requesterName'),
        requesterContact: formData.get('requesterContact'),
        requesterContact2: formData.get('requesterContact2'),
        model: formData.get('model'),
        assignedUser: formData.get('assignedUser'),
        details: formData.get('details'), //내용
        remarks: formData.get('remarks'), //비고
    }
    
}