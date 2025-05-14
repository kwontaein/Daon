import {jwtFilter} from "@/features/login/api/loginApi";
import {ResponseBoard} from "@/model/types/board/type";
import {cookies} from "next/headers";

export async function getBoardApi(board: ResponseBoard) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getBoard`, {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(board),
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

export async function saveBoardApi(board: ResponseBoard) {
    const formData = new FormData();

    formData.append("title", board.title);
    formData.append("content", board.content);

    // 첨부파일 배열이 있다면
    if (board.files && board.files.length > 0) {
        board.files.forEach((file: File) => {
            formData.append("files", file); // 필드명 "files"는 백엔드 DTO와 일치해야 함
        });
    }
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveBoard`, {
            method: "POST",
            body: formData, // ✅ Content-Type 자동 설정됨
            credentials: 'include'
        });
    
        await jwtFilter(response.status.toString());
    
        const text = await response.text();
    
        if (!text) return null;
        return JSON.parse(text);
    }catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  
}


export async function updateBoardApi(board: ResponseBoard) {
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
            body: JSON.stringify(board),
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

export async function updateBoard(boardId: string) {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateViews`, {
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

