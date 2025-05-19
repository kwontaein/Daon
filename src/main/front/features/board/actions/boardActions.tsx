"use server"
import {RequestBoard} from "@/model/types/board/type";
import {saveBoardApi, updateBoardApi} from "@/features/board/api/boardApi";

export default async function BoardAction(prevState, formData) {
    const formState: RequestBoard = {
        writer: formData.get('writer'),
        title: formData.get('title'),
        content: formData.get('content'),
        notice: formData.get('notice'),
        views: formData.get('views'),
        files: formData.getAll('files') as File[],
    }

    const action = formData.get('action')
    let status;

    if (action === 'write') {
        status = await saveBoardApi(formState)
    } else if (action === 'edit') {
        status = await updateBoardApi(formState)
    }
    return {
        ...prevState,
        ...formState,
        status
    }
}