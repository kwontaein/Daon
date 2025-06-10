'use client'

import jwtFilter from "@/features/share/jwtFilter"
import { BusinessError } from "@/model/constants/BusinessError";
import { ResponseOfficial } from "@/model/types/sales/official/type";


export const deleteOfficialApi = async (official: ResponseOfficial) => {

    try{
        const response = await fetch(`/api/deleteOfficial`, {
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
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}