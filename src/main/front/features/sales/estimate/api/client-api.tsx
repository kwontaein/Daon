'use client'

import jwtFilter from "@/features/share/jwtFilter";


export async function deleteEstimate(estimateId) {

    return fetch(`/api/deleteEstimate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({estimateId}),
    }).then(async (response) => {        
        if(!response.ok){
            jwtFilter(response.status.toString());
        }else{
            window.alert('삭제가 완료되었습니다.')
        }
    }).catch(async (error) => {
        if (error.name === 'AbortError') {
            console.log('Fetch 요청이 시간초과되었습니다.')
        }else if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    })
}