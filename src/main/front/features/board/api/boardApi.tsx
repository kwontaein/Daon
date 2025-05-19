"use server"
import jwtFilter from "@/features/share/jwtFilter";

import {RequestBoard} from "@/model/types/board/type";
import {cookies} from "next/headers";

export async function getBoardApi() {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getBoard`, {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            next: {revalidate: 3600, tags: ['board']}
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

export async function saveBoardApi(board: RequestBoard) {
    const formData = new FormData();

    const boardData = {
        writer: board.writer,
        title: board.title,
        content: board.content,
        notice: board.notice,
        views:board.views,
    };

    formData.append("board", JSON.stringify(boardData)); // "board"는 서버에서 받을 필드명

    // 첨부파일 배열이 있다면
    if (board.files && board.files.length > 0) {
        board.files.forEach((file: File) => {
            formData.append("files", file); // 필드명 "files"는 백엔드 DTO와 일치해야 함
        });
    }
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveBoard`, {
            method: "POST",
            headers: {
                Cookie: cookie
            },
            body: formData, // ✅ Content-Type 자동 설정됨
            credentials: 'include'
        });
    
        await jwtFilter(response.status.toString());
        return response.status
    }catch (error) {
        console.error(error)
        if (error instanceof Response) {
            const { message } = await error.json();
            // throw new Error(message);
        }
        // throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  
}


export async function updateBoardApi(board: RequestBoard) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
   
    const formData = new FormData();

    const boardData = {
        boardId:board.boardId,
        writer: board.writer,
        title: board.title,
        content: board.content,
        notice: board.notice,
        views:board.views,
        existingFileIds:board.existingFileIds
    };

    formData.append("board", JSON.stringify(boardData)); // "board"는 서버에서 받을 필드명

    // 첨부파일 배열이 있다면
    if (board.newFiles && board.newFiles.length > 0) {
        board.newFiles.forEach((file: File) => {
            formData.append("newFiles", file); // 필드명 "files"는 백엔드 DTO와 일치해야 함
        });
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateBoard`, {
            method: "POST",
            headers: {
                Cookie: cookie
            },
            body: formData, // ✅ Content-Type 자동 설정됨
            credentials: 'include',
        });
        await jwtFilter(response.status.toString());
        return response.status
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

export async function deleteBoardApi(boardId: string) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateBoard`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify({boardId}),
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

export async function updateViews(boardId: string) {
    console.log(boardId)
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateViews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie:cookie
            },
            credentials: 'include',
            body: JSON.stringify({boardId}),
        });
        await jwtFilter(response.status.toString());

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}

