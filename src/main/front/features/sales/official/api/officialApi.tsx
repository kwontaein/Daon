'use server';

import { ResponseOfficial } from "@/model/types/sales/official/type";
import { cookies } from "next/headers";



export const getOfficialApi = async (officialName?: string) => {

    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getOfficial`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify({officialName}),
        next: {
            revalidate: 3600, 
            ...(officialName ? {} : {tags:['official']})
        }
    }).then(async (response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        return text ? JSON.parse(text) : [];
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const updateOfficialApi = async (official: ResponseOfficial[]) => {
    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateOfficial`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(official),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const saveOfficialApi = async (officialName: Pick<ResponseOfficial,'officialName'>) => {
    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveOfficial`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(officialName),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteOfficialApi =async (official: ResponseOfficial) => {
    const cookieStore = cookies();
    const cookie = cookieStore.toString(); 
    
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteOfficial`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(official),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}