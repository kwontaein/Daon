'use server';

import { Official } from "@/model/types/receipt/type";
import { revalidateTag } from "next/cache";


export const updateOfficialApi = async (official: Official[]) => {
    return fetch("http://localhost:8080/api/updateOfficial", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(official),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("official");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}

export const saveOfficialApi = async (official: Official[]) => {
    return fetch("http://localhost:8080/api/saveOfficial", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(official),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("officialsCate");
        // revalidatePath("/main/official/official-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}


export const deleteOfficialApi =async (official: Official) => {
    return fetch("http://localhost:8080/api/deleteOfficial", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(official),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.status===500){
            window.alert('문제가 발생했습니다 관리자에게 문의해주세요.')
        }
        revalidateTag("officialsCate")
        // revalidatePath("/main/official/official-cate");
        return response.status
    }).catch((error) => {
        console.error('Error:', error)
    })
}