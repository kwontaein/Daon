'use server';

import {Affiliation} from "@/model/types/customer/affiliation/type";
import {revalidateTag} from "next/cache";
import {cookies} from "next/headers";
import {jwtFilter} from "@/features/login/api/loginApi";


export const getAffiliation = async () => {
    const cookieStore = cookies();
    const cookie = cookieStore.toString();
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAffiliation`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        next: {revalidate: 3600, tags: ['affiliation']} //1시간마다 재검증
    }).then(async (response) => {


        const text = await response.text();
        jwtFilter(text)

        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {
        console.error('Error:', error)
    })

}

export const updateAffiliationApi = async (affiliation: Affiliation[]) => {
    const cookieStore = cookies();
    const cookie = cookieStore.toString();
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


        const text = await response.text();
        jwtFilter(text)

        revalidateTag("affiliation");
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const saveAffiliationApi = async (customer: Pick<Affiliation, 'affiliationName'>) => {
    const cookieStore = cookies();
    const cookie = cookieStore.toString();
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


        const text = await response.text();
        jwtFilter(text)

        revalidateTag("affiliation");
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteAffiliationApi = async (customer: Affiliation) => {
    const cookieStore = cookies();
    const cookie = cookieStore.toString();
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


        const text = await response.text();
        jwtFilter(text)

        revalidateTag("affiliation")
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}