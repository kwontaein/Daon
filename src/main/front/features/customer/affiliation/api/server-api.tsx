'use server';

import {AffiliationType} from "@/model/types/customer/affiliation/type";
import {cookies} from "next/headers";
import jwtFilter from "@/features/share/jwtFilter";



export const getAffiliation = async () => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try{
        const response = await fetch(`/api/getAffiliation`, {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            next: {revalidate: 3600, tags: ['affiliation']} //1시간마다 재검증
        })

        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);

    }catch (error) {
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

export const updateAffiliationApi = async (affiliation: AffiliationType[]) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`/api/updateAffiliation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(affiliation),
            cache: 'no-store'
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status

    }catch (error) {
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



export const saveAffiliationApi = async (customer: Pick<AffiliationType, 'affiliationName'>) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try{
        const response = await fetch(`/api/saveAffiliation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(customer),
            cache: 'no-store'
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
        return response.status
    }catch (error) {
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

  


