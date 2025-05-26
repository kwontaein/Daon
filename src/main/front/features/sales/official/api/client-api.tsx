'use client'

import jwtFilter from "@/features/share/jwtFilter"
import { ResponseOfficial } from "@/model/types/sales/official/type";


export const deleteOfficialApi = async (official: ResponseOfficial) => {

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteOfficial`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(official),
            cache: 'no-store'
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }else{
            window.alert('삭제가 완료되었습니다.')
        }
        return response.status
    } catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}