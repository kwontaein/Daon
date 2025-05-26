"use server"
import {RequestBoard} from "@/model/types/board/type";
import {saveBoardApi, updateBoardApi} from "@/features/board/api/server-api";

export default async function BoardAction(prevState, formData) {
    const action = formData.get('action')

    const formState: RequestBoard = {
        writer: formData.get('writer'),
        title: formData.get('title'),
        content: formData.get('content'),
        notice: formData.get('notice'),
        views: formData.get('views'),
        files: (action === 'write' && formData.getAll('files').length > 0) ? formData.getAll('files') as File[] : null,
        newFiles: (action === 'edit' && formData.getAll('files').length > 0) ? formData.getAll('files') as File[] : null,
        existingFileIds: action === 'edit' ? formData.getAll('existingFileIds') : null,
        boardId: action === 'edit' ? prevState.boardId : null
    }

    let status;

    if (action === 'write') {
        status = await saveBoardApi(formState)
    } else if (action === 'edit') {
        status = await updateBoardApi(formState)
    }
    return {
        ...prevState,
        ...formState,
        boardId: prevState.boardId,
        status
    }
}