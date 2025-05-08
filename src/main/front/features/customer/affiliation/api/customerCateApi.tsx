'use server';

import {Affiliation} from "@/model/types/customer/affiliation/type";
import {revalidateTag} from "next/cache";
import { cookies } from "next/headers";

const cookieStore = cookies()
const cookie =cookieStore.toString()

export const getAffiliation = async()=>{
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAffiliation`,{
        headers: {
            'Content-Type': 'application/json',
                Cookie:cookie
        },
        next: {revalidate: 3600, tags: ['affiliation']} //1시간마다 재검증
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        if (!text) return [];
        return JSON.parse(text);
    }).catch((error) => {console.error('Error:', error)})

}

export const updateAffiliationApi = async (affiliation: Affiliation[]) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateAffiliation`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
                Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(affiliation),
        cache: 'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 500) {
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("affiliation");
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const saveAffiliationApi = async (customer: Pick<Affiliation, 'affiliationName'>) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveAffiliation`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(customer),
        cache: 'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 500) {
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("affiliation");
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteAffiliationApi = async (customer: Affiliation) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteAffiliation`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Cookie:cookie
        },
        credentials:'include',
        body: JSON.stringify(customer),
        cache: 'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 500) {
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("affiliation")
        // revalidatePath("/main/customer/customer-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}