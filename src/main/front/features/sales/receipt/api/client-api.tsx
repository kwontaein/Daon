'use client'

import jwtFilter from "@/features/share/jwtFilter";


export async function deleteReceiptApi(receiptIds: string[]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 10000);


    return await fetch(`/api/deleteReceipt`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({receiptIds}),
        signal,
    }).then(async (response) => {
        if(!response.ok){
            jwtFilter(response.status.toString());
        }else{
            window.alert('삭제가 완료되었습니다.')
        }
    }).catch (async (error)=> {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }).finally(() => clearTimeout(timeoutId));

}