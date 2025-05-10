import { ResponseBoard } from "@/model/types/board/type";

export default async function BoardAction(prevState, formData){
    const formState:ResponseBoard={
        writer:formData.get('writer'),
        title:formData.get('title'),
        content:formData.get('content'),
        notice:formData.get('notice'),
        views:formData.get('views'),
        files:formData.get('files')
    }

    const action = formData.get('action')
    console.log(formState)
    let status;
    // if(action === 'write'){
    //     status = await saveBoardApi(formState)
    // }else if(action === 'edit'){
    //     status = await updateBoardApi(formState)
    // }
     return{
        ...prevState,
        ...formState,
     }
}