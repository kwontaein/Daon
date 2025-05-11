'use server';

import {Affiliation} from "@/model/types/customer/affiliation/type";
import {revalidateTag} from "next/cache";
import {cookies} from "next/headers";
import {jwtFilter} from "@/features/login/api/loginApi";


export const getAffiliation = async () => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAffiliation`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        next: {revalidate: 3600, tags: ['affiliation']} //1시간마다 재검증
    }).then(async (response) => {
        await jwtFilter(response.status.toString());


        const text = await response.text();

        if (!text) return null;

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            return null;
        }
    }).catch((error) => {
        console.error('Error:', error)
    })

}

export const updateAffiliationApi = async (affiliation: Affiliation[]) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateAffiliation`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(affiliation),
        cache: 'no-store'
    }).then(async (response) => {
        await jwtFilter(response.status.toString());


        revalidateTag("affiliation");
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const saveAffiliationApi = async (customer: Pick<Affiliation, 'affiliationName'>) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveAffiliation`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(customer),
        cache: 'no-store'
    }).then(async (response) => {
        await jwtFilter(response.status.toString());


        revalidateTag("affiliation");
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteAffiliationApi = async (customer: Affiliation) => {
    const accessToken = (await cookies()).get('accessToken')?.value
    const cookie = `accessToken=${accessToken}`
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteAffiliation`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(customer),
        cache: 'no-store'
    }).then(async (response) => {
        await jwtFilter(response.status.toString());


        revalidateTag("affiliation")
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}