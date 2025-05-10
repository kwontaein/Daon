'use server';

import { jwtFilter } from "@/features/login/api/loginApi";
import {ResponseOfficial} from "@/model/types/sales/official/type";
import {cookies} from "next/headers";


export const getOfficialApi = async (officialName?: string) => {

    const accessToken = (await cookies()).get('accessToken').value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getOfficial`, {
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
    }).then(async (response) => {
        const text = await response.text();
        jwtFilter(text)

        return text ? JSON.parse(text) : [];
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const updateOfficialApi = async (official: ResponseOfficial[]) => {
    const accessToken = (await cookies()).get('accessToken').value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateOfficial`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(official),
        cache: 'no-store'
    }).then(async (response) => {


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const saveOfficialApi = async (officialName: Pick<ResponseOfficial, 'officialName'>) => {
    const accessToken = (await cookies()).get('accessToken').value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveOfficial`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(officialName),
        cache: 'no-store'
    }).then(async (response) => {


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteOfficialApi = async (official: ResponseOfficial) => {
    const accessToken = (await cookies()).get('accessToken').value
    const cookie = `accessToken=${accessToken}`

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteOfficial`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookie
        },
        credentials: 'include',
        body: JSON.stringify(official),
        cache: 'no-store'
    }).then(async (response) => {


        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}