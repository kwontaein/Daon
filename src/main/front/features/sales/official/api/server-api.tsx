'use server';

import jwtFilter from "@/features/share/jwtFilter";
import {ResponseOfficial} from "@/model/types/sales/official/type";
import {cookies} from "next/headers";


export const getOfficialApi = async (officialName?: string) => {

    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getOfficial`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify({officialName}),
            next: {
                revalidate: 3600,
                ...(officialName ? {} : {tags: ['official']})
            }
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }

        const text = await response.text();

        if (!text) return null;
        return JSON.parse(text);
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

export const updateOfficialApi = async (official: ResponseOfficial[]) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateOfficial`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(official),
            cache: 'no-store'
        })
        if(!response.ok){
            jwtFilter(response.status.toString());
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

export const saveOfficialApi = async (officialName: Pick<ResponseOfficial, 'officialName'>) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveOfficial`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(officialName),
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

