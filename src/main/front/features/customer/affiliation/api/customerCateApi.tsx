'use server';

import {Affiliation} from "@/model/types/customer/affiliation/type";
import {revalidateTag} from "next/cache";
import {cookies} from "next/headers";
import jwtFilter from "@/features/share/jwtFilter";



export const getAffiliation = async () => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAffiliation`, {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            next: {revalidate: 3600, tags: ['affiliation']} //1시간마다 재검증
        })

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

export const updateAffiliationApi = async (affiliation: Affiliation[]) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateAffiliation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(affiliation),
            cache: 'no-store'
        })
        await jwtFilter(response.status.toString());
        return response.status

    }catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}



export const saveAffiliationApi = async (customer: Pick<Affiliation, 'affiliationName'>) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveAffiliation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(customer),
            cache: 'no-store'
        })
        await jwtFilter(response.status.toString());
        return response.status

    }catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}


export const deleteAffiliationApi = async (customer: Affiliation) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteAffiliation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie
            },
            credentials: 'include',
            body: JSON.stringify(customer),
            cache: 'no-store'
        })
        await jwtFilter(response.status.toString());
        return response.status

    }catch (error) {
        if (error instanceof Response) {
            const { message } = await error.json();
            throw new Error(message);
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
}