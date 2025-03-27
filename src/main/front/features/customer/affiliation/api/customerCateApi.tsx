'use server';

import {Affiliation} from "@/model/types/customer/affiliation/type";
import {revalidateTag} from "next/cache";


export const getAffiliation = async()=>{
    return await fetch("http://localhost:8080/api/getAffiliation",{
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
    return await fetch("http://localhost:8080/api/updateAffiliation", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
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
    return await fetch("http://localhost:8080/api/saveAffiliation", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
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
    return fetch("http://localhost:8080/api/deleteAffiliation", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
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